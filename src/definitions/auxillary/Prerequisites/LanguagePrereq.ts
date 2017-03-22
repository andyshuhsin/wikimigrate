import { MultiLangStringSet } from '../MultiLang'
import BasePrereq from './BasePrereq'

export type LanguageTestItem = "listening" | "speaking" | "reading" | "writing" 

export type LanguageBenchmarkId = "clb" | "nclc" | "ielts" | "toefl" | "oet" | "pte-academic" | "cae"

export type LanguageBenchmarkProfile = {
    id: LanguageBenchmarkId
    title: MultiLangStringSet
}

export interface LanguagePrereq extends BasePrereq {
    property: "language_test"
    benchmark: LanguageBenchmarkId
    requirements: any[] //TODO: Use proper type
    // TODO: Add time limits
}

export default LanguagePrereq
