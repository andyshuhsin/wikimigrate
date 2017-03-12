import {
    Transition,
    allOf,
    ns,
} from '../../common'

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
    from: ns("canada", "alien"),
    to: ns("canada", "permanent")
}

export default iivc
