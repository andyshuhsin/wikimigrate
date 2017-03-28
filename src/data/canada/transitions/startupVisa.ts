import Transition from "../../../definitions/Transition"
import {allOf} from "../../../definitions/auxillary/Combination"

import {
    alien,
    pr
} from '../status'

const startupVisa: Transition = {
    id: "startup_visa",
    regionId: "canada",
    acquireBy: "application",
    name: {
        "en": "Startup Visa",
        "zh-hans": "创业签证",
        "zh-hant": "創業簽證"
    },
    from: alien,
    to: pr,
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
