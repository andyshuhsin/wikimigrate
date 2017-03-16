import {
    Transition,
    AgePrereq,
    duration,
    oneOf,
    allOf,
    BusinessPrereq,
    FundPrereq,
    money,
} from '../../../common'

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
                property: "fund",
                type: "possess",
                schemes: [
                    {
                        fund: money(1500000, "aud")
                    }
                ]
            } as FundPrereq,
            {
                property: "business",
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
            property: "fund",
            type: "venture",
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