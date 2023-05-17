const hypixelProfiles = {}

export function resolveHypixelProfileByUsername(username) {
    if (hypixelProfiles[username]) return hypixelProfiles[username]

    let parsedData = JSON.parse(FileLib.getUrlContent("https://api.slothpixel.me/api/players/" + username))
    const result = {
        uuid: parsedData["uuid"],
        formattedRank: parsedData["rank_formatted"]
    }

    return hypixelProfiles[username] = result
}

export function getHypixelProfileFromCacheByUsername(username) {
    return hypixelProfiles[username]
}
