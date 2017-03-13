import {
    Transition,
    allOf,
} from '../../common'

import {
    alien,
    pr
} from '../status'

const iivc: Transition = {
    id: "iivc",
    name: {
        en: "Immigrant Investor Venture Capital Pilot Program"
    },
    from: alien,
    to: pr,
    acquireBy: "application",
    stage: {
        description: {
            en: "closed"
        }
    },
    prerequisiteList: allOf([]),
    procedureList: [],
}

export default iivc
