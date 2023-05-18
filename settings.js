import {@SwitchProperty, @Vigilant} from 'Vigilance'

@Vigilant("BridgeChatTrigger")
class Settings {
    @SwitchProperty({
        name: "Resolve Rank",
        description: "Use external API calls to resolve ranks",
        category: "General"
    })
    resolveRank = true

    constructor() {
        this.initialize(this)
    }
}

const SETTINGS = new Settings();
const REPLY_INDICATOR = "⇾"

export {SETTINGS, REPLY_INDICATOR}
