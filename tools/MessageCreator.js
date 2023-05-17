import {REPLY_INDICATOR} from "../settings"

function formatMessageContent(message) {
    const components = []

    const splits = message.split(" ")
    for (let i = 0; i < splits.length; i++) {
        let part = splits[i]

        if (part.startsWith("http://") || part.startsWith("https://"))
            components.push(new TextComponent(part).setClick("open_url", part).setHoverValue("&b" + part))
        else
            components.push(new TextComponent(part))


        if (i < splits.length - 1) components.push(new TextComponent(" "))
    }

    return components
}

export function formatChatEntry(username, messageContent, hypixelRank = null, guildRank = null, replyUsername = null) {
    const components = []

    components.push(new TextComponent("&2Guild > ✈"))

    components.push(null)
    editHypixelRank(components, username, replyUsername, hypixelRank)

    components.push(null)
    editGuildRank(components, guildRank)

    components.push(new TextComponent("&f: "))

    return [...components, ...formatMessageContent(messageContent)]
}

export function editHypixelRank(components = [], username, replyUsername, hypixelRank) {
    const formattedName = " " + username + (replyUsername ? `&8${REPLY_INDICATOR}` : "")
    components[1] = new TextComponent((hypixelRank ? ` ${hypixelRank}` : "&b") + formattedName)
}

export function editGuildRank(components = [], guildRank) {
    components[2] = new TextComponent(guildRank ? ` &e[${guildRank}]` : '')
}
