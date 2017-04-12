import {
    alien,
    visa189holder,
} from '../../status'

import {
    competentEnglish,
    below50,
} from './skillSelectCommon'

import jobClass from '../../jobClass'
import Transition from "../../../../definitions/Transition";
import {allOf} from "../../../../definitions/auxillary/Combination";
import {WorkExperiencePrereq} from "../../../../definitions/Prerequisites/WorkExperiencePrereq";

const skilledIndependent: Transition = {
    id: "skilled_independent",
    regionId: "australia",
    acquireBy: "application",
    name: {
        en: "Skilled Independent visa (subclass 189)",
        "zh-hans": "独立技术移民(189)"
    },
    from: alien,
    to: visa189holder,
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
            url: "https://www.border.gov.au/Trav/Visa-1/189-",
            title: {
                en: "Official Webpage"
            }
        }
    ]
}

export default skilledIndependent
