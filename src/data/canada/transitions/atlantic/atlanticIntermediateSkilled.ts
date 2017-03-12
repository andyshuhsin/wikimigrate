import {
    Transition,
    ns,
    allOf
} from '../../../common'

import {
    atlanticJobOfferCommon,
    atlanticWorkersJob
} from './atlanticCommon'


const atlanticIntermediateSkilled: Transition = {
    id: "atlantic_intermediate_skilled",
    acquireBy: "application",
    from: ns("canada", "alien"),
    to: ns("canada", "permanent"),
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