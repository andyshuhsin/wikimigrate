import Transition from '../../../definitions/Transition'
import { allOf } from '../../../definitions/auxiliary/Combination'

import { alien, pr } from '../status'

const iivc: Transition = {
    id: 'iivc',
    regionId: 'canada',
    name: {
        en: 'Immigrant Investor Venture Capital Pilot Program',
    },
    from: alien,
    to: pr,
    acquireBy: 'application',
    stage: {
        description: {
            en: 'closed',
        },
    },
    prerequisiteList: allOf([]),
    procedureList: [],
}

export default iivc
