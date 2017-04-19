import {Person} from "../../definitions/Person"
import {ScoreSystem} from "../../definitions/ScoreSystem"
import {satisfyPrerequisiteCombination} from "./calcSuitablePaths"

export function calcScore(person: Person, system: ScoreSystem): number {
    let score = system.initialScore
    for (const key in system.conditionGroups) {
        let subscore = 0
        const conditionGroup = system.conditionGroups[key]
        for (const condition of conditionGroup.conditions) {
            if (satisfyPrerequisiteCombination(person, condition.prerequisites)) {
                subscore += condition.score
            }
        }
        score += subscore < conditionGroup.maxScore ? subscore : conditionGroup.maxScore
    }
    return score
}

export default calcScore
