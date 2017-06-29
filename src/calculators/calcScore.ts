import { Person } from '../definitions/Person'
import { ScoreSystem } from '../definitions/ScoreSystem'
import { satisfyPrerequisiteCombination } from './prerequisiteOperations'

interface BatchScores {
    [key: string]: number
}

function sumBatchScores(batchScores: BatchScores) {
    let sum = 0
    for (const key in batchScores) {
        sum += batchScores[key]
    }
    return sum
}

// FIXME: Poor handling of multiple language tests
export function calcScore(person: Person, system: ScoreSystem): number {
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
        // console.info(key, batchScores, `total:${sumBatchScores(batchScores)}`)
        score += Math.min(sumBatchScores(batchScores), conditionGroup.maxScore)
    }
    return score
}

export default calcScore
