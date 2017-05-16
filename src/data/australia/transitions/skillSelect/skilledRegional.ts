import Transition from "../../../../definitions/Transition"
import {allOf} from "../../../../definitions/auxiliary/Combination"
import {WorkExperiencePrereq} from "../../../../definitions/Prerequisites/WorkExperiencePrereq"

import {
    alien,
    visa189holder,
} from '../../status'

import {
    competentEnglish,
    below50,
} from './skillSelectCommon'

import jobClass from '../../jobClass'

const skilledRegional: Transition = {
    id: "skilled_regional",
    regionId: "australia",
    acquireBy: "application",
    name: {
        en: "Skilled Regional (Provisional) visa (subclass 489)",
        zh_hans: "偏远地区担保技术移民(189)"
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
                en: "Be nominated by an Australian State or Territory government agency or sponsored by an eligible relative living in a designated area"
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
            url: "https://www.border.gov.au/Trav/Visa-1/489-",
            title: {
                en: "Official Webpage"
            }
        }
    ]
}

export default skilledRegional
