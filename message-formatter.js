export const REPLY_INDICATOR = "⇾"
const BridgeUrlIndicator = "bridge-url:"

function formatMessageContent(message) {
    const components = []

    const splits = message.split(" ")
    for (let i = 0; i < splits.length; i++) {
        let part = splits[i]
        if (part.startsWith(BridgeUrlIndicator)) {
            part = part.substring(BridgeUrlIndicator.length)
            part = part.replaceAll('%xx', '.')
        }

        if (part.startsWith("http://") || part.startsWith("https://"))
            components.push(new TextComponent(part).setClick("open_url", part).setHoverValue("&b" + part))
        else
            components.push(new TextComponent(part))


        if (i < splits.length - 1) components.push(new TextComponent(" "))
    }

    return components
}

export function formatChatEntry(originalSender, username, replyUsername, messageContent) {
    const result = "&2Guild > ✈ "
        + `&b[MVP&0+&b] ${username}`
        + (replyUsername ? `&8${REPLY_INDICATOR}&b${replyUsername}` : "")
        + ' &e[BDG]'
        + "&f: "


    const user = new TextComponent(result)
    user.setHoverValue(
        `&6&lOriginal Sender:&r&b ${originalSender}\n\n`
        + 'This message has probably been sent by a bridge\n'
        + 'that connects Hypixel server with other services such as Discord.\n\n'
        + 'This formatting service is done by &6BridgeChatTrigger&r.\n'
        + 'See: https://www.chattriggers.com/modules/v/BridgeChatTrigger'
    )

    return [user, ...formatMessageContent(messageContent)]
}
