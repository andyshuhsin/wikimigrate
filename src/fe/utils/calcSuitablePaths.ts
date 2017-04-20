import {Person} from "../../definitions/Person"
import {Path} from "./definitions"
import Transition from "../../definitions/Transition"
import {RightPrereq} from "../../definitions/Prerequisites/RightPrereq"
import {satisfyPrerequisiteCombination} from "./prerequisiteOperations"

// Applicability of a program when user didn't specify a condition;
// Set to true for maximal coverage
export function canApply(person: Person, transition: Transition): boolean {
    return satisfyPrerequisiteCombination(person, transition.prerequisiteList)
}


export function calcSuitablePaths(user: Person, allTransitions: Transition[]): Path[] {

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

    const paths: Path[] = applicableTransitions.map(
        transition => ({
            transitions: [transition],
        })
    )
    return paths
}

export default calcSuitablePaths
