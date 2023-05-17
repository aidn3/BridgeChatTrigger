import {@SwitchProperty, @Vigilant} from 'Vigilance'

@Vigilant("BridgeChatTrigger")
class Settings {
    @SwitchProperty({
        name: "Resolve Rank",
        description: "What guild ranks should be used.",
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
