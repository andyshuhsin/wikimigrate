import {Person} from "../../definitions/Person"
import {ScoreSystem} from "../../definitions/ScoreSystem"
import {satisfyPrerequisiteCombination} from "./calcSuitablePaths"
import crs from "../../data/canada/crs"

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

// TEST & DEBUG

export function calcScoreTest() {
    const person: Person = {
        status: {
            canada: ["alien"],
            world: ["alien"],
            australia: ["alien"],
            canada_pacific_provinces: ["alien"],
        },
        birth: {
        },
        education: []
    }

    console.info(calcScore(person, crs))
}

export default calcScore
