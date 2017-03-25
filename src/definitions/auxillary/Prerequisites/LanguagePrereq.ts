import { MultiLangStringSet } from '../MultiLang'
import BasePrereq from './BasePrereq'

export type LanguageBenchmarkId = "clb" | "nclc" | "ielts" | "toefl" | "oet" | "pte-academic" | "cae"

export type LanguageBenchmarkProfile = {
    id: LanguageBenchmarkId
    title: MultiLangStringSet
}

export type BenchmarkRequirementSimple = {
    score: number | string
}

export type LanguageTestItem = "listening" | "speaking" | "reading" | "writing"

export type BenchmarkRequirementItemized = {
    [key in LanguageTestItem]?: number
}

export type LanguageBenchmarkRequirement =
    BenchmarkRequirementSimple | BenchmarkRequirementItemized

export interface LanguagePrereq extends BasePrereq {
    property: "language_test"
    benchmark: LanguageBenchmarkId
    requirements: LanguageBenchmarkRequirement
    // TODO: Add time limits
}

export function languagePrereq( benchmark: LanguageBenchmarkId,
                                requirements: LanguageBenchmarkRequirement
                              ): LanguagePrereq {
    return {
        property: "language_test",
        benchmark,
        requirements
    }
}

export default LanguagePrereq
