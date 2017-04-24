import Transition from "../../../definitions/Transition"
import {allOf, identity} from "../../../definitions/auxillary/Combination"
import AgePrereq from "../../../definitions/Prerequisites/AgePrereq"

import {
    alien,
    globalImpactVisaHolder,
} from "../status"
import {duration} from "../../../definitions/auxillary/Duration"
import {FundPrereq} from "../../../definitions/Prerequisites/FundPrereq"
import {ehf} from "../ehf"

export const globalImpactVisa: Transition = {
    id: "new_zealand_global_impact_visa",
    regionId: "new_zealand",
    acquireBy: "application",
    name: {
        en: "Global Impact Visa",
        zh_hans: "全球影响力签证",
    },
    from: alien,
    to: globalImpactVisaHolder,
    prerequisiteList: allOf([
        identity([{
            prereqId: "fund",
            type: "admission",
            schemes: [{
                fund: null,
                condition: {
                    source: ehf
                }
            }]
        } as FundPrereq])
    ]),
    procedureList: [],
    referenceList: [
        {
            url: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/silver-fern-job-search-work-visa",
            title: {
                en: "Official Page",
                zh_hans: "官方页面"
            }
        }
    ]
}
