import Transition from "../../../../definitions/Transition"
import {allOf} from "../../../../definitions/auxillary/Combination"
import {money} from "../../../../definitions/auxillary/Money"
import {FundPrereq} from "../../../../definitions/Prerequisites/FundPrereq"
import {duration} from "../../../../definitions/auxillary/Duration"
import {BusinessPrereq} from "../../../../definitions/Prerequisites/BusinessPrereq"

import {
    alien,
    visa132holder,
} from '../../status'

const businessTalent: Transition = {
    id: "business_tablen",
    regionId: "australia",
    acquireBy: "application",
    name: {
        en: "Business Talent (Permanent) visa (subclass 132)",
        "zh-hans": "商业移民(132)"
    },
    from: alien,
    to: visa132holder,
    prerequisiteList: allOf([

        // Significant Business History
        allOf([
            {
                prereqId: "fund",
                type: "possess",
                schemes: [
                    {
                        fund: money(1500000, "aud")
                    }
                ]
            } as FundPrereq,
            {
                prereqId: "business",
                schemes: [
                    {
                        condition: {
                            turnover: money(3000000, "aud"),
                            duration: duration(1, "year")
                        }
                    }
                ]
            } as BusinessPrereq
        ]),

        // Venture Capital Entrepreneur
        {
            prereqId: "fund",
            type: "investee",
            schemes: [
                {
                    fund: money(1000000, "aud")
                }
            ]
        } as FundPrereq

    ]),
    procedureList: [
        {
            name: {
                en: "Submit Expression of Interest"
            }
        },
        {
            name: {
                en: "Wait"
            }
        }
    ],
    referenceList: [
        {
            url: "https://www.border.gov.au/Trav/Visa-1/132-",
            title: {
                en: "Official Webpage"
            }
        }
    ]
}

export default businessTalent
