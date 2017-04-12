import {Person} from "../../definitions/Person"
import {Path} from "./definitions"
import {isPrerequisite, Prerequisite} from "../../definitions/Prerequisites/index"
import {Duration} from "../../definitions/auxillary/Duration"
import {Combination, isCombination} from "../../definitions/auxillary/Combination"
import Transition from "../../definitions/Transition"
import {RightPrereq} from "../../definitions/Prerequisites/RightPrereq"
import {
    isSingleScore, LanguageTestItem, LanguageTestItemValues, LanguageTestScoreItemized,
    LanguageTestScoreSingle
} from "../../definitions/auxillary/LanguageTest"

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
                for (const actualResult of person.languageTests) {
                    const expectedResult = prereq.result
                    if (actualResult.testId !== expectedResult.testId) {
                        return false
                    }
                    else if (isSingleScore(actualResult) && isSingleScore(expectedResult)) {
                        const actualScores = actualResult.scores as LanguageTestScoreSingle
                        const expectedScores = expectedResult.scores as LanguageTestScoreSingle
                        return actualScores.overall > expectedScores.overall
                    }
                    else if (!isSingleScore(actualResult) && !isSingleScore(expectedResult)) {
                        const actualScores = actualResult.scores as LanguageTestScoreItemized
                        const expectedScores = expectedResult.scores as LanguageTestScoreItemized
                        for (const item of LanguageTestItemValues) {
                            if (actualScores[item] < expectedScores[item]) {
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

function satisfyPrerequisiteCombination(
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
                return prereqCombo.operands.map(
                    operand => satisfyPrerequisiteCombination(person, operand)
                ).every(isTrue)
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

function canApply(person: Person, transition: Transition): boolean {
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
