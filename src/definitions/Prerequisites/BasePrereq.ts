import { MultiLangStringSet } from "../auxillary/MultiLang"

export type PrereqId =
    "education"
    | "age"
    | "business"
    | "language_test"
    | "right"
    | "work_experience"
    | "residence"
    | "fund"
    | "certification"
    | "offer"

interface BasePrereq {
    prereqId: PrereqId
    description?: MultiLangStringSet
}

export default BasePrereq
