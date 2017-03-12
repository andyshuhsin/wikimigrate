import {
    Transition,
    ns,
    allOf
} from '../../../common'

import {
    atlanticJobOfferCommon,
    atlanticWorkersJob
} from './atlanticCommon'

const atlanticHighSkilled: Transition = {
    id: "atlantic_high_skilled",
    acquireBy: "application",
    name: {
        en: "Atlantic High-Skilled Program"
    },
    from: ns("canada", "alien"),
    to: ns("canada", "permanent"),
    prerequisiteList: allOf([
        atlanticJobOfferCommon,
        atlanticWorkersJob,
        {
            description: {
                en: "Have work experience at NOC skill type/level 0 A or B.",
            }
        },
        {
            description: {
                en: "Have a job offer that is"
            }
        },
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