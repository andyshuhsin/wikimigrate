import { Person } from '../definitions/Person'
import { ScoreSystem } from '../definitions/ScoreSystem'
import { satisfyPrerequisiteCombination } from './prerequisiteOperations'

export interface BatchScores {
    [batch: string]: number
}

function sumBatchScores(batchScores: BatchScores) {
    let sum = 0
    for (const key in batchScores) {
        sum += batchScores[key]
    }
    return sum
}

export interface ScoreDetails {
    score: number
    groups: {
        [group: string]: {
            score: number,
            batches: BatchScores
        }
    }
}

// FIXME: Poor handling of multiple language tests
export function calcScore(person: Person, system: ScoreSystem): ScoreDetails {
    const details: ScoreDetails = {
        score: 0,
        groups: {}
    }

    let score = system.initialScore
    for (const key in system.conditionGroups) {
        const conditionGroup = system.conditionGroups[key]
        const batchScores: BatchScores = {}
        for (const condition of conditionGroup.conditions) {
            if (satisfyPrerequisiteCombination(person, condition.prerequisites, false)) {
                const batch = condition.batch
                const higherThanBatchHighest = condition.score > batchScores[batch]
                const newBatch = typeof batchScores[batch] === 'undefined'
                if (newBatch || higherThanBatchHighest) {
                    batchScores[batch] = condition.score
                }
            }
        }
        const groupScore = Math.min(sumBatchScores(batchScores), conditionGroup.maxScore)
        details.groups[key] = {
            score: groupScore,
            batches: batchScores
        }
        score += groupScore
    }

    details.score = score
    return details
}
