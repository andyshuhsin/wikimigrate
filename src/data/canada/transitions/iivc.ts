import {
    Transition,
    allOf,
} from '../../common'

import {
    alien,
    permanent
} from '../status'

const iivc: Transition = {
    id: "iivc",
    name: {
        en: "Immigrant Investor Venture Capital Pilot Program"
    },
    acquireBy: "application",
    stage: {
        description: {
            en: "closed"
        }
    },
    prerequisiteList: allOf([]),
    procedureList: [],
    from: alien,
    to: permanent,
}

export default iivc
