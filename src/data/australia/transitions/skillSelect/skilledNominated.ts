import {
    alien,
    visa190holder,
} from '../../status'

import {
    competentEnglish,
    below50,
} from './skillSelectCommon'

import jobClass from '../../jobClass'
import Transition from "../../../../definitions/Transition"
import {allOf} from "../../../../definitions/auxillary/Combination"
import {WorkExperiencePrereq} from "../../../../definitions/Prerequisites/WorkExperiencePrereq"

const skilledNominated: Transition = {
    id: "skilled_nominated",
    regionId: "australia",
    acquireBy: "application",
    name: {
        en: "Skilled Nominated visa (subclass 190)",
        "zh-hans": "州担保技术移民(190)"
    },
    from: alien,
    to: visa190holder,
    prerequisiteList: allOf([

        competentEnglish,
        below50,
        {
            prereqId: "work_experience",
            jobNature: allOf([
                jobClass.jobGroups.sol
            ])
        } as WorkExperiencePrereq,
    ]),
    procedureList: [
        {
            name: {
                en: "Be nominated by an Australian state or territory government agency"
            }
        },
        {
            name: {
                en: "Obtain a suitable skills assessment for that occupation"
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
            url: "https://www.border.gov.au/Trav/Visa-1/190-",
            title: {
                en: "Official Webpage"
            }
        }
    ]
}

export default skilledNominated
