import {
    Transition
} from '../../../definitions'

const provinceNominee: Transition = {
    id: "provincial_nominees",
    regionId: "canada",
    acquireBy: "application",
    name: {
        en: "Provincial Nominee Program"
    },
    procedureList: [
        {
            name: {
                en: "Apply to a province or territory for a nomination"
            }
        },
        {
            name: {
                en: "Apply to CIC to become a permanent resident"
            }
        }
    ],
    referenceList: {
        en: {
            Homepage: "http://www.cic.gc.ca/english/immigrate/provincial/index.asp"
        }
    }
}

export default provinceNominee
