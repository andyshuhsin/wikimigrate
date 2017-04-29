import Transition from "../../../definitions/Transition"
import {allOf, oneOf} from "../../../definitions/auxillary/Combination"

import {
    alien,
    pr
} from '../status'
import {prereqTitleDict} from "../../common/prereqTitleDict"
import {FundPrereq} from "../../../definitions/Prerequisites/FundPrereq"
import {money} from "../../../definitions/auxillary/Money"
import {
    designatedVentureCapitalFunds,
    designatedAngelInvestors,
    designatedBusinessIncubators,
} from "../fundSources"

const startupVisa: Transition = {
    id: "startup_visa",
    regionId: "canada",
    acquireBy: "application",
    name: {
        en: "Startup Visa",
        zh_hans: "创业签证",
        zh_hant: "創業簽證",
    },
    from: alien,
    to: pr,
    prerequisiteList: allOf([
        oneOf([
            {
                prereqId: "fund",
                type: "investee",
                schemes: [
                    {
                        fund: money(200000, "cad"),
                        condition: {
                            source: designatedVentureCapitalFunds
                        }
                    },
                ]
            } as FundPrereq,
            {
                prereqId: "fund",
                type: "investee",
                schemes: [
                    {
                        fund: money(75000, "cad"),
                        condition: {
                            source: designatedAngelInvestors
                        }
                    },
                ]
            } as FundPrereq,
            {
                prereqId: "fund",
                type: "admission",
                schemes: [
                    {
                        fund: null,
                        condition: {
                            source: designatedBusinessIncubators
                        }
                    }
                ]
            } as FundPrereq,
        ], {
            title: {
                en: "Venture investment"
            }
        })
    ]),
    procedureList: [
        {
            name: {
                en: "Apply"
            }
        }
    ],
    referenceList: [
        {
            title: {
                en: "Official page",
                zh_hans: "官方主页",
            },
            url: "http://www.cic.gc.ca/english/immigrate/business/start-up/",
        }
    ]
}

export default startupVisa
