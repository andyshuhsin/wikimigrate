import {PrereqId} from "../../definitions/Prerequisites/BasePrereq"
import {MultiLangStringSet} from "../../definitions/auxillary/MultiLang"

type PrereqTitleDict = {
    [id in PrereqId]: MultiLangStringSet
}

export const prereqTitleDict: PrereqTitleDict = {
    education: {
        en: "Education"
    },
    age: {
        en: "Age"
    },
    business: {
        en: "business"
    },
    language_test: {
        en: "Language"
    },
    right: {
        en: "Right"
    },
    residence: {
        en: "Residence"
    },
    work_experience: {
        en: "Work Experience"
    },
    fund: {
        en: "Fund"
    },
    certification: {
        en: "Certification"
    },
    offer: {
        en: "Offer"
    },
    union: {
        en: "Union"
    },
}

export default prereqTitleDict
