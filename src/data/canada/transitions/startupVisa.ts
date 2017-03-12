import {
    Transition,
    allOf,
    ns,
} from '../../common'

const startupVisa: Transition = {
    id: "startup_visa",
    acquireBy: "application",
    name: {
        "en": "Startup Visa",
        "zh-hans": "创业签证",
        "zh-hant": "創業簽證"
    },
    from: ns("canada", "alien"),
    to: ns("canada", "permanent"),
    prerequisiteList: allOf([
    ]),
    procedureList: [
        {
            name: {
                en: "Apply"
            }
        }
    ]
}

export default startupVisa