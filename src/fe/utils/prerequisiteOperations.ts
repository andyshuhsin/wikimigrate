import {isPrerequisite, Prerequisite} from "../../definitions/Prerequisites/index"
import {Duration} from "../../definitions/auxillary/Duration"
import {Combination, isCombination} from "../../definitions/auxillary/Combination"
import {
    languageTestItemValues, LanguageTestResult, LanguageTestScoreSet,
} from "../../definitions/auxillary/LanguageTest"
import {
    LanguagePrereq,
    LanguagePrereqResult, LanguagePrereqScoreSet,
} from "../../definitions/Prerequisites/LanguagePrereq"
import {WorkExperienceQuality} from "../../definitions/Qualities/WorkExperience"
import {WorkExperiencePrereq} from "../../definitions/Prerequisites/WorkExperiencePrereq"
import {RegionId} from "../../definitions/auxillary/Region"
import {ArithmeticComparisonOperator, Interval} from "../../definitions/auxillary/Operator"
import {EducationQuality, getEducationStageRank} from "../../definitions/Qualities/EducationExperience"
import {EducationPrereq} from "../../definitions/Prerequisites/EducationPrereq"
import {Person} from "../../definitions/Person"
import {clone} from "./clone"

const DEFAULT_RESULT = true

const warningFlags: any = {}

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

function satisfyAllLanguageScoresRequirement(
    actualScores: LanguageTestScoreSet,
    expectedScores: LanguagePrereqScoreSet,
): boolean {
    for (const item of languageTestItemValues) {
        if (!compare(expectedScores[item][0], actualScores[item], expectedScores[item][1])) {
            return false
        }
    }
    return true
}

function satisfyLanguageResultRequirement(
    actualResults: LanguageTestResult[] | undefined,
    expectedResult: LanguagePrereqResult
): boolean {
    if (!actualResults) {
        return DEFAULT_RESULT
    }

    for (const actualResult of actualResults) {
        const actualScores = actualResult.scores
        const expectedScores = expectedResult.scores
        if (satisfyAllLanguageScoresRequirement(actualScores, expectedScores)) {
            return true
        }
    }
    return false
}

export function regionMatch(demand: RegionId, actual: RegionId | undefined): boolean {
    return (demand === "world") || (demand === actual)
}


export function compare<T extends number | Date>(
    operator: ArithmeticComparisonOperator,
    a: T,
    b: T,
): boolean {
    switch (operator) {
        case ">": {
            return a > b
        }
        case ">=": {
            return a >= b
        }
        case "<": {
            return a < b
        }
        case "<=": {
            return a <= b
        }
        case "=": {
            return a === b
        }
    }
}

export function durationMatch(demand: Interval<Duration>, actual: Duration): boolean {
    if (demand[1].unit === actual.unit) {
        return compare(demand[0], actual.value, demand[1].value)
    }
    else {
        console.warn("[Unimplemented: comparing different duration units")
        return false
    }
}

function satisfyWorkPrereq(
    work: WorkExperienceQuality,
    prereq: WorkExperiencePrereq
): boolean {

    // TODO: Implement other requirements
    if (prereq.jobNature) {
        if (warningFlags['jobNature']) {
            console.warn("[Unimplemented: prereq.jobNature")
            warningFlags['jobNature'] = true
        }
    }

    if (!regionMatch(prereq.region, work.regionId)) {
        return false
    }
    else if (prereq.regionExcept && regionMatch(prereq.regionExcept, work.regionId)) {
        return false
    }
    else if (!work.duration) {
        return DEFAULT_RESULT
    }
    else if (prereq.duration) {
        return durationMatch(prereq.duration, work.duration)
    }
    else {
        return DEFAULT_RESULT
    }
}

function satisfyEducationPrereq(
    education: EducationQuality,
    prereq: EducationPrereq,
): boolean {
    if (prereq.stage && education.stage) {
        const rankActual = getEducationStageRank(education.stage)
        const rankExpected = getEducationStageRank(prereq.stage[1])
        if (!compare(prereq.stage[0], rankActual, rankExpected)) {
            return false
        }
    }
    else if (prereq.region && education.regionId) {
        if (!regionMatch(education.regionId, prereq.region)) {
            return false
        }
    }
    else if (prereq.duration && education.duration) {
        if (!durationMatch(prereq.duration, education.duration)) {
            return false
        }
    }
    else if (prereq.certification) {
        console.info("[Unimplemented] Checking prereq.certification")
    }
    return DEFAULT_RESULT
}

function satisfyPrerequisite(person: Person, prereq: Prerequisite): boolean {

    switch (prereq.prereqId) {

        case "age": {
            if (typeof person.birth.date !== "undefined") {
                const birthYear = person.birth.date.year
                const birthMonth = person.birth.date.month || 0
                const criticalDate = getCriticalDate(prereq.value)
                const date = new Date(birthYear, birthMonth)
                // Notice d1 < d2 means d1 happens before d2
                return compare(prereq.operator, criticalDate, date)
            }
            return DEFAULT_RESULT
        }

        case "language_test": {
            const actualResults = person.languageTests
            const expectedResult = prereq.result
            return satisfyLanguageResultRequirement(actualResults, expectedResult)
        }

        // TODO: Similar shape of code in work_experience and education
        case "work_experience": {
            const actualWorks = person.workExperiences
            if (typeof actualWorks === "undefined") {
                return DEFAULT_RESULT
            }
            else {
                for (const work of actualWorks) {
                    if (satisfyWorkPrereq(work, prereq)) {
                        return true
                    }
                }
            }
            return false
        }

        case "education": {
            if (typeof person.education === "undefined") {
                return DEFAULT_RESULT
            }
            for (const education of person.education) {
                if (satisfyEducationPrereq(education, prereq)) {
                    return true
                }
            }
            return false
        }

        case "union": {
            // Undefined union status is considered unmarried;
            // Otherwise, one can claim both single and married score
            // in systems
            return !!person.inUnion === prereq.inUnion
        }

        case "spouse": {
            if (!person.spouse) {
                return DEFAULT_RESULT
            }
            return satisfyPrerequisite(person.spouse, prereq)
        }

        case "offer": {
            // TODO: Implement offer
            return false
        }

        case "nomination": {
            // TODO: Implement nomination
            return false
        }

        default: {
            if (!warningFlags[prereq.prereqId]) {
                console.warn("Unimplemented prereqId", prereq.prereqId, "found in", prereq)
                warningFlags[prereq.prereqId] = true
            }
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
function existSurjection<A, B>(
    setA: A[],
    setB: B[],
    predicate: (a: A, b: B) => boolean
): boolean {

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
    for (const match of allValidMatchings) {
        if (allDifferent(match)) {
            return true
        }
    }
    return false
}

export function satisfyBijectivePrerequisiteCombination(
    person: Person,
    prerequisites: Prerequisite[]
): boolean {
    switch (prerequisites[0].prereqId) {
        case "language_test": {
            if (!person.languageTests) {
                if (!warningFlags['ltie']) {
                    console.warn("languageTests is empty")
                    warningFlags['ltie'] = true
                }
                return DEFAULT_RESULT
            }
            else {
                return existSurjection(
                    prerequisites,
                    person.languageTests,
                    (prerequisite: LanguagePrereq, languageTest: LanguageTestResult) => {
                        const hypotheticalPerson = clone(person)
                        hypotheticalPerson.languageTests = [languageTest]
                        return satisfyPrerequisite(hypotheticalPerson, prerequisite)
                    }
                )
            }
        }
        case "education": {
            if (!person.education) {
                return DEFAULT_RESULT
            }
            return existSurjection(
                prerequisites,
                person.education,
                (prerequisite: EducationPrereq, education: EducationQuality) => {
                    const hypotheticalPerson = clone(person)
                    hypotheticalPerson.education = [education]
                    return satisfyPrerequisite(hypotheticalPerson, prerequisite)
                }
            )
        }
        default: {
            console.warn("[Unimplmented] Cannot handle surjective prerequisites of type", prerequisites[0].prereqId)
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

