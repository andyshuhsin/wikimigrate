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
    visa188holder,
} from '../../status'

const businessInnovation: Transition = {
    id: "business_innovation",
    acquireBy: "application",
    name: {
        en: "Business Innovation and Investment (Provisional) visa (subclass 188)",
        "zh-hans": "商业移民(188)"
    },
    from: alien,
    to: visa188holder,
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
                en: "Nominated by a state or territory government or Australian agency"
            }
        },
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
            url: "http://www.border.gov.au/Trav/Visa-1/188-",
            title: {
                en: "Official Webpage"
            }
        }
    ]
}

export default businessInnovation