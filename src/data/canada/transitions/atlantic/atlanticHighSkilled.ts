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