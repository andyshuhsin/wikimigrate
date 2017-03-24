import {
    Transition,
    allOf,
    oneOf,
    WorkExperiencePrereq,
    OfferPrereq,
} from '../../../../definitions'

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
            property: "work_experience",
            jobNature: oneOf([
                jobClass.jobGroups.nocC,
            ])
        } as WorkExperiencePrereq,
        {
            property: "offer",
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
