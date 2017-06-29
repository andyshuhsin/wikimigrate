import { Combination } from './auxiliary/Combination'
import { Prerequisite } from './Prerequisites'
import { MultiLangStringSet } from './auxiliary/MultiLang'
import URLDatum from './auxiliary/URLDatum'
import { SafeDate } from './auxiliary/SafeDate'
export type ScoreSystemId = 'crs'

export interface ScoreHistoryEntry {
    lowestScore: number
    date: SafeDate
}

export type ScoreHistory = ScoreHistoryEntry[]

export interface ScoreCondition {
    score: number
    prerequisites: Combination<Prerequisite>
    // Only the highest score among applicable conditions
    // of the same batch would be added
    batch: string
}

export type ConditionGroupSet = {
    [key: string]: {
        maxScore: number
        conditions: ScoreCondition[]
    }
}

export interface ScoreSystem {
    scoreSystemId: ScoreSystemId
    name: MultiLangStringSet
    initialScore: number
    conditionGroups: ConditionGroupSet
    history: ScoreHistory
    reference: URLDatum
}
