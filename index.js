console.log("LOADING BridgeChatTrigger")

import {REPLY_INDICATOR, SETTINGS} from "./settings"
import {getHypixelProfileFromCacheByUsername, resolveHypixelProfileByUsername} from "./tools/HypixelProfileResolver"
import {getGuildRankFromCacheByPlayerUuid, resolveGuildRankByPlayerUuid} from "./tools/GuildRankResolver"
import {editGuildRank, editHypixelRank, formatChatEntry} from "./tools/MessageCreator"
import {getUniqueId} from "./tools/UniqueId"

register("command", () => SETTINGS.openGUI()).setName("bridge")

function asyncEdit(components, messageId, username, replyUsername, hypixelProfile, guildRank) {
    if (!hypixelProfile) {

        resolveHypixelProfileByUsername(username)
            .then(hypixelProfile => {
                editHypixelRank(components, username, replyUsername, hypixelProfile.formattedRank)

                guildRank = resolveGuildRankByPlayerUuid(hypixelProfile.uuid)
                editGuildRank(components, guildRank)

                ChatLib.editChat(messageId, new Message(components))

            })
            .catch((e) => {
                if (e.message.includes("SSLHandshakeException")) {
                    new Message(`&c&lBridgeChatTrigger: Java version is too old. Can't resolve ranks.`).chat()
                    new Message(`&cResolving ranks will be turned off.`).chat()
                    new Message(`&cIt can be re-enabled from &f/bridge`).chat()
                    SETTINGS.resolveRank = false
                    SETTINGS.save()
                }
            })


    } else if (!guildRank) {
        new Thread(() => {
            guildRank = resolveGuildRankByPlayerUuid(hypixelProfile.uuid)
            editGuildRank(components, guildRank)
            ChatLib.editChat(messageId, new Message(components))
        }).start()
    }
}

register("chat", event => {
        const unformattedMessage = ChatLib.getChatMessage(event).replaceAll(/§\w/ig, '')
        const bridgeMessageRegex = /^Guild > (?:\[[A-Z+]{1,10}\] ){0,3}\w{3,32}(?: \[\w{1,10}\]){0,3}: \.([\w⇾]{3,32}): (.{1,256})$/g
        const match = bridgeMessageRegex.exec(unformattedMessage)
        if (!match) return

        EventLib.cancel(event)

        const combinedUsername = match[1].split(REPLY_INDICATOR)
        const messageContent = match[2]
        const username = combinedUsername[0]
        const replyUsername = combinedUsername.length >= 2 ? combinedUsername[1] : null

        let hypixelProfile = null
        let guildRank = "BDG"
        let hypixelRank = "&b[MVP&0+&b]"
        if (SETTINGS.resolveRank) {
            hypixelProfile = getHypixelProfileFromCacheByUsername(username)
            if (hypixelProfile) {
                hypixelRank = hypixelProfile ? hypixelProfile["formattedRank"] : null
                guildRank = getGuildRankFromCacheByPlayerUuid(hypixelProfile.uuid)
            }
        }

        const messageId = getUniqueId()
        const components = formatChatEntry(username, messageContent, hypixelRank, guildRank, replyUsername)
        new Message(components).setChatLineId(messageId).chat()

        if (SETTINGS.resolveRank) {
            asyncEdit(components, messageId, username, replyUsername, hypixelProfile, guildRank)
        }
    }
)
