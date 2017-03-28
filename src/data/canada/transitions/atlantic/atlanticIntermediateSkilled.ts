import Transition from "../../../../definitions/Transition"
import {allOf, oneOf} from "../../../../definitions/auxillary/Combination"
import {WorkExperiencePrereq} from "../../../../definitions/Prerequisites/WorkExperiencePrereq"
import {OfferPrereq} from "../../../../definitions/Prerequisites/OfferPrereq"

import {
    atlanticJobOfferCommon,
    atlanticWorkersJob
} from './atlanticCommon'

import {
    alien,
    pr
} from '../../status'

import jobClass from '../../jobClass'

const atlanticIntermediateSkilled: Transition = {
    id: "atlantic_intermediate_skilled",
    regionId: "canada",
    acquireBy: "application",
    from: alien,
    to: pr,
    name: {
        en: "Atlantic Intermediate-Skilled Program"
    },
    prerequisiteList: allOf([
        atlanticJobOfferCommon,
        atlanticWorkersJob,
        {
            prereqId: "work_experience",
            jobNature: oneOf([
                jobClass.jobGroups.nocC,
            ])
        } as WorkExperiencePrereq,
        {
            prereqId: "offer",
            employer: {
                regionId: "canada"
            }
            // FIXME: Complete missing words
        } as OfferPrereq,
    ]),
    procedureList: [
        {
            "name": {
                "en": "Application"
            }
        }
    ]
}

export default atlanticIntermediateSkilled
