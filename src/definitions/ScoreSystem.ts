import {Combination} from "./auxillary/Combination"
import {Prerequisite} from "./Prerequisites/index"
import {MultiLangStringSet} from "./auxillary/MultiLang"
import URLDatum from "./auxillary/URLDatum"
export type ScoreSystemId = "crs"

export interface ScoreCondition {
    score: number
    prerequisites: Combination<Prerequisite>
    // Only the highest score among applicable conditions
    // of the same batch would be added
    batch: string
}

export interface ScoreSystem {
    scoreSystemId: ScoreSystemId
    name: MultiLangStringSet
    initialScore: number
    conditionGroups: {
        [key: string]: {
            maxScore: number
            conditions: ScoreCondition[]
        }
    }
    reference: URLDatum
}
