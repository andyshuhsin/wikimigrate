import {Person} from "../../definitions/Person"
import {Path} from "./definitions"
import {isPrerequisite, Prerequisite} from "../../definitions/Prerequisites/index"
import {Duration} from "../../definitions/auxillary/Duration"
import {Combination, isCombination} from "../../definitions/auxillary/Combination"
import Transition from "../../definitions/Transition"
import {RightPrereq} from "../../definitions/Prerequisites/RightPrereq"
import {
    isSingleScore, LanguageTestItem, LanguageTestItemValues, LanguageTestResult, LanguageTestScoreItemized,
    LanguageTestScoreSingle,
} from "../../definitions/auxillary/LanguageTest"
import {
    LanguagePrereq, LanguagePrereqResult, LanguagePrereqScoreItemized, LanguagePrereqScores,
    LanguagePrereqScoreSingle,
} from "../../definitions/Prerequisites/LanguagePrereq"
import {clone} from "./clone"

// Applicability of a program when user didn't specify a condition;
// Set to true for maximal coverage
const DEFAULT_RESULT = true

function getCriticalDate(duration: Duration, today = new Date()) {
    if (duration.unit === "year") {
        return new Date(today.setFullYear(today.getFullYear() - duration.value))
    }
    else if (duration.unit === "month") {
        return new Date(today.setMonth(today.getMonth() - duration.value))
    }
    else if (duration.unit === "week") {
        return new Date(today.setDate(today.getDate() - duration.value * 7))
    }
    else if (duration.unit === "day") {
        return new Date(today.setDate(today.getDate() - duration.value))
    }
    else if (duration.unit === "hour") {
        return new Date(today.setHours(today.getHours() - duration.value))
    }
    else {
        console.warn("Unimplemented date unit", duration.unit)
        return new Date()
    }
}

function satisfyLanguageResultRequirements(
    actualResults: LanguageTestResult[],
    expectedResult: LanguagePrereqResult
): boolean {
    for (const actualResult of actualResults) {
        if (actualResult.testId !== expectedResult.testId) {
            return false
        }
        else if (isSingleScore(actualResult) && isSingleScore(expectedResult)) {
            const actualScores = actualResult.scores as LanguageTestScoreSingle
            const expectedScores = expectedResult.scores as LanguagePrereqScoreSingle
            // TODO: Use overall[0] as operator, rather than hard-coding ">"
            return actualScores.overall > expectedScores.overall[1]
        }
        else if (!isSingleScore(actualResult) && !isSingleScore(expectedResult)) {
            const actualScores = actualResult.scores as LanguageTestScoreItemized
            const expectedScores = expectedResult.scores as LanguagePrereqScoreItemized
            for (const item of LanguageTestItemValues) {
                // TODO: Use item[0] as operator
                if (actualScores[item] < expectedScores[item][1]) {
                    return false
                }
            }
        }
        else {
            console.warn("Unimplemented: cannot compare overall and itemized scores in language tests:",
                actualResult, expectedResult)
        }
    }
    return DEFAULT_RESULT
}

function satisfyPrerequisite(person: Person, prereq: Prerequisite): boolean {

    switch (prereq.prereqId) {

        case "age": {
            const birthday = person.birth.date
            if (typeof birthday !== "undefined") {
                const criticalDate = getCriticalDate(prereq.value)
                switch (prereq.operator) {
                    case ">": {
                        return birthday > criticalDate
                    }
                    case ">=": {
                        return birthday >= criticalDate
                    }
                    case "<": {
                        return birthday < criticalDate
                    }
                    case "<=": {
                        return birthday <= criticalDate
                    }
                    default: {
                        console.warn("Unknown operator", prereq.operator, "found in", prereq)
                        return DEFAULT_RESULT
                    }
                }
            }
            return DEFAULT_RESULT
        }

        case "language_test": {
            if (typeof person.languageTests !== "undefined") {
                const actualResults = person.languageTests
                const expectedResult = prereq.result
                return satisfyLanguageResultRequirements(actualResults, expectedResult)
            } else {
                return DEFAULT_RESULT
            }
        }
        default: {
            console.warn("Unimplemented prereqId", prereq.prereqId, "found in", prereq)
            return DEFAULT_RESULT
        }
    }
}

function allDifferent(arg: any[]): boolean {
    for (const key1 in arg) {
        for (const key2 in arg) {
            if ((key1 !== key2) && arg[key1] === arg[key2]) {
                return false
            }
        }
    }
    return true
}

/**
 *  Input:  [[ 1, 2, 3 ], [ 4, 5 ], [ 6, 7 ]]
 *  Output: [[ 1, 4, 6 ],
 *           [ 1, 4, 7 ],
 *           [ 1, 5, 6 ],
 *           [ 1, 5, 7 ],
 *           [ 2, 4, 6 ],
 *           [ 2, 4, 7 ],
 *           [ 2, 5, 6 ],
 *           [ 2, 5, 7 ],
 *           [ 3, 4, 6 ],
 *           [ 3, 4, 7 ],
 *           [ 3, 5, 6 ],
 *           [ 3, 5, 7 ] ]
 */
function permutateFlatten(a: any[][]): any[] {
    if (typeof a[1] === "undefined") {
        return a[0].map(node => [node])
    }
    else {
        let result = []
        for (const key of a[0]) {
            for (const key2 of permutateFlatten(a.slice(1))) {
                result.push(
                    [key, ...key2]
                )
            }
        }
        return result
    }
}


/**
 *  Does any element in setA, a, has a unique counterpart in setB, b,
 *  which satisfy predicate(a, b)?
 */
function existSurjection(setA: any[], setB: any[], predicate: (a: any, b: any) => boolean): boolean {

    const validCounterpartTable: any[] = []
    for (const keyA in setA) {
        validCounterpartTable[keyA] = []
    }
    for (const keyA in setA) {
        for (const elementB of setB) {
            if (predicate(setA[keyA], elementB)) {
                validCounterpartTable[keyA].push(elementB)
            }
        }
    }

    const allValidMatchings = permutateFlatten(validCounterpartTable)
    console.info(allValidMatchings)
    for (const match of allValidMatchings) {
        if (allDifferent(match)) {
            return true
        }
    }
    return false
}

export function satisfyBijectivePrerequisiteCombination(
    person: Person,
    prequisites: Prerequisite[]
): boolean {
    switch (prequisites[0].prereqId) {
        case "language_test": {
            if (!person.languageTests) {
                console.warn("languageTests is empty")
                return DEFAULT_RESULT
            }
        }
        case "education": {
        }
        default: {
            console.warn("[Unimplmented] Cannot handle bijective prerequisites of type", prequisites[0].prereqId)
            return DEFAULT_RESULT
        }
    }
}

export function satisfyPrerequisiteCombination(
    person: Person,
    arg: Prerequisite | Combination<Prerequisite> ): boolean {

    if (isPrerequisite(arg)) {
        const prereq = arg as Prerequisite
        return satisfyPrerequisite(person, prereq)
    }
    else if (isCombination(arg)) {
        const prereqCombo = arg as Combination<Prerequisite>
        const isTrue = (x: any) => !!x
        switch (prereqCombo.combinator)  {
            case "and": {
                if (prereqCombo.meta && prereqCombo.meta.surjective) {
                    return satisfyBijectivePrerequisiteCombination(person, (prereqCombo.operands as Prerequisite[]))
                }
                else {
                    return prereqCombo.operands.map(
                        operand => satisfyPrerequisiteCombination(person, operand)
                    ).every(isTrue)
                }
            }
            case "or": {
                return prereqCombo.operands.map(
                    operand => satisfyPrerequisiteCombination(person, operand)
                ).some(isTrue)
            }
            default: {
                console.warn('Unknown combinator', prereqCombo.combinator, 'found in', prereqCombo)
                return false
            }
        }
    }
    else {
        console.warn("Expecting prerequisite or combination thereof, instead, got this:", arg)
        return false
    }
}

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
