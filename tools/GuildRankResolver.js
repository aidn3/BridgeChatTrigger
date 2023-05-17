const guildRanks = new Map()

export function resolveGuildRankByPlayerUuid(uuid) {
    if (guildRanks.get(uuid)) return guildRanks.get(uuid)

    const guildData = JSON.parse(FileLib.getUrlContent(`https://api.slothpixel.me/api/guilds/${uuid}`))
    const ranksTags = new Map()
    guildData["ranks"].forEach(rank => ranksTags.set(rank["name"], rank["tag"]))

    for (const memberData of guildData["members"]) {
        guildRanks.set(memberData["uuid"], ranksTags.get(memberData["rank"]))
    }

    return guildRanks.get(uuid)
}

export function getGuildRankFromCacheByPlayerUuid(uuid) {
    return guildRanks[uuid]
}
