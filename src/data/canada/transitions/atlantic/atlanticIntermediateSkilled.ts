import {
    Transition,
    allOf
} from '../../../common'

import {
    atlanticJobOfferCommon,
    atlanticWorkersJob
} from './atlanticCommon'

import {
    alien,
    pr
} from '../../status'


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
            description: {
                en: "Have work experience at NOC skill type/level C",  // TODO: Double check level
            }
        },
        {
            description: {
                en: "Have a job offer that is",
            }
        }
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