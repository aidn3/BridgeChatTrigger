console.log("LOADING BridgeChatTrigger")

import {formatChatEntry, REPLY_INDICATOR} from "./message-formatter"
import {getUniqueId} from "./unique-id"

register("chat", event => {
        const unformattedMessage = ChatLib.getChatMessage(event).replaceAll(/§\w/ig, '')
        const bridgeMessageRegex = /^Guild > (?:\[[A-Z+]{1,10}\] ){0,3}(\w{2,32})(?: \[\w{1,10}\]){0,3}: \.([\w⇾]{3,32}): (.{1,256})$/g
        const match = bridgeMessageRegex.exec(unformattedMessage)
        if (!match) return

        EventLib.cancel(event)

        const originalSender = match[1]
        const combinedUsername = match[2].split(REPLY_INDICATOR)
        const messageContent = match[3]
        const username = combinedUsername[0]
        const replyUsername = combinedUsername.length >= 2 ? combinedUsername[1] : null

        const messageId = getUniqueId()
        const components = formatChatEntry(originalSender, username, replyUsername, messageContent)
        new Message(components).setChatLineId(messageId).chat()
    }
)
