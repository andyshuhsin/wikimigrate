import { LangId, MultiLangStringSet } from './MultiLang'
import URLDatum from './URLDatum'

export type LanguageTestItem = 'listening' | 'speaking' | 'reading' | 'writing'
export const languageTestItemValues: LanguageTestItem[] = [
    'listening', 'speaking', 'reading', 'writing',
]

export type LanguageTestId =
    'clb'
    | 'celpip'
    | 'tef'
    | 'ielts'
    | 'toefl'
    | 'oet'
    | 'pte-academic'
    | 'cae'

type SourceScore = number
type TargetScore = number

export type EquivalencyTable = {
    [item in LanguageTestItem]: [SourceScore, TargetScore][]
}

export type LanguageTestProfile = {
    id: LanguageTestId
    title: MultiLangStringSet
    languages: LangId[]
    itemScoreFormat: [number /* lowest */, number /* highest */, number /* increment */]
    equivalency?: {
        [source in LanguageTestId]?: EquivalencyTable
    }
    reference: URLDatum
}

export type LanguageTestScoreSet = {
    [key in LanguageTestItem]: number
}

export interface LanguageTestResult {
    testId: LanguageTestId
    scores: LanguageTestScoreSet
    language?: LangId
}
