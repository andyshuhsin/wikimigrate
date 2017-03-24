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

const atlanticHighSkilled: Transition = {
    id: "atlantic_high_skilled",
    regionId: "canada",
    acquireBy: "application",
    name: {
        en: "Atlantic High-Skilled Program"
    },
    from: alien,
    to: pr,
    prerequisiteList: allOf([
        atlanticJobOfferCommon,
        atlanticWorkersJob,
        {
            property: "work_experience",
            jobNature: oneOf([
                jobClass.jobGroups.noc0,
                jobClass.jobGroups.nocA,
                jobClass.jobGroups.nocB,
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
            name: {
                en: "Application"
            }
        }
    ]
}

export default atlanticHighSkilled
