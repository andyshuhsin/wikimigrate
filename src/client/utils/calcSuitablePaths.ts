import {Person} from "../../definitions/Person"
import {Pathway} from "./definitions"
import Transition from "../../definitions/Transition"
import {RightPrereq} from "../../definitions/Prerequisites/RightPrereq"
import {satisfyPrerequisiteCombination} from "./prerequisiteOperations"

// Applicability of a program when user didn't specify a condition;
// Set to true for maximal coverage
export function canApply(person: Person, transition: Transition): boolean {
    return satisfyPrerequisiteCombination(person, transition.prerequisiteList)
}

const suitabilityCache: any = {}

export function calcSuitability(person: Person, path: Pathway): number {
    // TODO: Proper logic
    const id = path.transitions[0].id
    if (suitabilityCache[id]) {
        return suitabilityCache[id]
    }
    else {
        const suitability = 1
        suitabilityCache[id] = suitability
        return suitability
    }
}


export function calcSuitablePaths(user: Person, allTransitions: Transition[]): Pathway[] {

    const applicableTransitions = allTransitions.filter(transition => canApply(user, transition))

    // TODO: Compute from 'person'
    const desiredRights: RightPrereq[] = [
        {
            prereqId: "right",
            regionId: "canada",
            rightId: "permanent"
        },
        {
            prereqId: "right",
            regionId: "australia",
            rightId: "permanent"
        },
    ]

    const paths: Pathway[] = applicableTransitions
        .map(transition => ({
            transitions: [transition],
        }))
        .sort((pathA, pathB) => calcSuitability(user, pathA) - calcSuitability(user, pathB))
    return paths
}

export default calcSuitablePaths
