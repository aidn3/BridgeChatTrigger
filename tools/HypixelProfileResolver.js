import axios from "axios"

const hypixelProfiles = {}

export function resolveHypixelProfileByUsername(username) {
    return axios.get("https://api.slothpixel.me/api/players/" + username)
        .then(res => res.data)
        .then((parsedData) => {
            const result = {
                uuid: parsedData["uuid"],
                formattedRank: parsedData["rank_formatted"]
            }
            hypixelProfiles[username] = result
            return result
        })
}

export function getHypixelProfileFromCacheByUsername(username) {
    return hypixelProfiles[username]
}
