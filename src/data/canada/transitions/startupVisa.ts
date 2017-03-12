import {
    Transition,
    allOf
} from '../../common'

const startupVisa: Transition = {
    id: "startup_visa",
    acquireBy: "application",
    name: {
        "en": "Startup Visa",
        "zh-hans": "创业签证",
        "zh-hant": "創業簽證"
    },
    from: {countryId: "canada", statusId: "alien"},
    to: {countryId: "canada", statusId: "permanent"},
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