import Transition from '../../../../definitions/Transition'
import { allOf, oneOf } from '../../../../definitions/auxiliary/Combination'
import { WorkExperiencePrereq } from '../../../../definitions/Prerequisites/WorkExperiencePrereq'
import { OfferPrereq } from '../../../../definitions/Prerequisites/OfferPrereq'

import { atlanticJobOfferCommon, atlanticWorkersJob } from './atlanticCommon'

import { alien, pr } from '../../status'

import jobClass from '../../jobClass'

const atlanticIntermediateSkilled: Transition = {
    id: 'atlantic_intermediate_skilled',
    regionId: 'canada',
    acquireBy: 'application',
    from: alien,
    to: pr,
    name: {
        en: 'Atlantic Intermediate-Skilled Program',
    },
    prerequisiteList: allOf([
        atlanticJobOfferCommon,
        atlanticWorkersJob,
        {
            prereqId: 'work_experience',
            jobGroups: oneOf([
                'noc2011-C',
            ]),
        } as WorkExperiencePrereq,
        {
            prereqId: 'offer',
            employer: {
                regionId: 'canada',
            },
            // FIXME: Complete missing words
        } as OfferPrereq,
    ]),
    paperwork: {
        procedureList: [
            {
                id: 'application',
                'name': {
                    'en': 'Application',
                },
            },
        ],
    }
}

export default atlanticIntermediateSkilled
