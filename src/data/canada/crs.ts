import {ScoreCondition, ScoreSystem} from "../../definitions/ScoreSystem"
import AgePrereq from "../../definitions/Prerequisites/AgePrereq"
import {allOf} from "../../definitions/auxillary/Combination"
import {UnionPrereq} from "../../definitions/Prerequisites/UnionPrereq"
import {duration, Duration} from "../../definitions/auxillary/Duration"
import {EducationStage} from "../../definitions/Qualities/EducationExperience"
import {EducationPrereq} from "../../definitions/Prerequisites/EducationPrereq"
import {LanguagePrereq} from "../../definitions/Prerequisites/LanguagePrereq"

type MarriedScore = number
type SingleScore = number
type SpouseBonusScore = number

type AgeTable = {
    [age: number]: [MarriedScore, SingleScore]
}

const ageTable: AgeTable = {
    18: [90, 99],
    19: [95, 105],
    20: [100, 110],
    21: [100, 110],
    22: [100, 110],
    23: [100, 110],
    24: [100, 110],
    25: [100, 110],
    26: [100, 110],
    27: [100, 110],
    28: [100, 110],
    29: [100, 110],
    30: [95, 105],
    31: [90, 99],
    32: [85, 94],
    33: [80, 88],
    34: [75, 83],
    35: [70, 77],
    36: [65, 72],
    37: [60, 66],
    38: [55, 61],
    39: [50, 55],
    40: [45, 50],
    41: [35, 39],
    42: [25, 28],
    43: [15, 17],
    44: [5, 6],
}

function getConditionsFromAgeTable(table: AgeTable): ScoreCondition[] {

    function makeAgeCondition(
        score: number,
        age: number,
        isMarried: boolean
    ): ScoreCondition {
        return {
            score: score,
            prerequisites: allOf([
                {
                    prereqId: "union",
                    unionTypes: ["marriage", "common-law-partnership"],
                    inUnion: isMarried,
                } as UnionPrereq,
                {
                    prereqId: "age",
                    value: duration(age, "year"),
                    operator: ">=",
                } as AgePrereq,
                {
                    prereqId: "age",
                    value: duration(age + 1, "year"),
                    operator: "<",
                } as AgePrereq,
            ])
        }
    }

    const result: ScoreCondition[] = []
    for (const ageKey in table) {
        const age: number = Number(ageKey)
        const marriedScore = table[ageKey][0]
        const singleScore = table[ageKey][1]
        result.push(makeAgeCondition(marriedScore, age, true))
        result.push(makeAgeCondition(singleScore, age, true))
    }
    return result
}

type EducationTableEntry = {
    stage: EducationStage
    minDuration?: Duration
    // two degrees at the same time
    stageSecond?: EducationStage
    minDurationSecond?: Duration

    scores: [MarriedScore, SingleScore, SpouseBonusScore]
}

type EducationTable = EducationTableEntry[]

const educationTable: EducationTable = [
    {
        stage: "secondary",
        scores: [28, 30, 2]
    },
    {
        stage: "post-secondary",
        minDuration: duration(1, "year"),
        scores: [84, 90, 6]
    },
    {
        stage: "post-secondary",
        minDuration: duration(2, "year"),
        scores: [91, 98, 6]
    },
    {
        stage: "bachelor",
        scores: [112, 120, 7]
    },
    {
        stage: "post-secondary",
        minDuration: duration(3, "year"),
        scores: [112, 120, 8]
    },
    {
        stage: "post-secondary",
        minDuration: duration(3, "year"),
        stageSecond: "post-secondary",
        minDurationSecond: undefined,
        scores: [119, 128, 9],
    },
    {
        stage: "master",
        scores: [126, 135, 10],
    },
    {
        stage: "professional",
        scores: [126, 135, 10],
    },
    {
        stage: "phd",
        scores: [140, 150, 10],
    }
]

function getConditionsFromEducationTable(table: EducationTable): ScoreCondition[] {

    function makeCondition(
        score: number,
        isMarried: boolean,
        education: EducationStage,
        minDuration?: Duration,
    ): ScoreCondition {
        return {
            score: score,
            prerequisites: allOf([
                {
                    prereqId: "education",
                    education: {
                        stage: education
                    },
                    minDuration: minDuration
                } as EducationPrereq,
                {
                    prereqId: "union",
                    unionTypes: ["marriage", "common-law-partnership"],
                    inUnion: isMarried,
                } as UnionPrereq,
            ])
        }
    }

    const result: ScoreCondition[] = []
    for (const entry of table) {
        result.push(makeCondition(entry.scores[0], true, entry.stage, entry.minDuration))
        result.push(makeCondition(entry.scores[1], false, entry.stage, entry.minDuration))

        if (entry.stageSecond) {
            result.push(makeCondition(entry.scores[0], true, entry.stageSecond, entry.minDurationSecond))
            result.push(makeCondition(entry.scores[1], false, entry.stageSecond, entry.minDurationSecond))
        }
    }
    return result
}

type ClbScore = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"
const clbScores: ClbScore[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

type LanguageTable = {
    [clbScore in ClbScore]?: [MarriedScore, SingleScore]
}

const languageTableFirst: LanguageTable = {
    4: [6, 6],
    5: [6, 6],
    6: [8, 9],
    7: [16, 17],
    8: [22, 23],
    9: [29, 31],
    10: [32, 34],
    11: [32, 34],
    12: [32, 34],
}

const languageTableSecond: LanguageTable = {
    5: [1, 1],
    6: [1, 1],
    7: [3, 3],
    8: [3, 3],
    9: [6, 6],
    10: [6, 6],
    11: [6, 6],
    12: [6, 6],
}

function getConditionsFromLanguageTables(
    tableFirst: LanguageTable,
    tableSecond: LanguageTable
): ScoreCondition[] {

    function makeSingleScoreCondition(
        clbScore: number,
        crsScore: number,
        isMarried: boolean
    ): ScoreCondition {
        return {
            score: crsScore,
            prerequisites: allOf([
                {
                    prereqId: "language_test",
                    result: {
                        testId: "clb",
                        scores: {
                            overall: clbScore
                        }
                    }
                } as LanguagePrereq,
                {
                    prereqId: "union",
                        unionTypes: ["marriage", "common-law-partnership"],
                    inUnion: isMarried,
                } as UnionPrereq,
            ])
        }
    }

    function makeDualScoresCondition(
        clbScore1: number,
        clbScore2: number,
        crsScore: number,
        isMarried: boolean
    ): ScoreCondition {
        return {
            score: crsScore,
            prerequisites: allOf([
                {
                    prereqId: "language_test",
                    result: {
                        testId: "clb",
                        scores: {
                            overall: clbScore1
                        }
                    },
                    resultSecond: {
                        testId: "clb",
                        scores: {
                            overall: clbScore2
                        }
                    }
                } as LanguagePrereq,
                {
                    prereqId: "union",
                    unionTypes: ["marriage", "common-law-partnership"],
                    inUnion: isMarried,
                } as UnionPrereq,
            ])
        }
    }

    const result: ScoreCondition[] = []
    // One language
    for (const firstScore of clbScores) {

        const scores = tableFirst[firstScore]
        if (scores) {
            result.push(makeSingleScoreCondition(+firstScore, scores[0], false))
            result.push(makeSingleScoreCondition(+firstScore, scores[1], true))

            for (const secondScore of clbScores) {
                const scores2 = tableSecond[secondScore]
                if (scores2) {
                    result.push(makeDualScoresCondition(+firstScore, +secondScore, scores[0], false))
                    result.push(makeDualScoresCondition(+firstScore, +secondScore, scores[1], true))
                }
            }
        }
    }

    // Two languages

    return result
}

const crs: ScoreSystem = {
    scoreSystemId: "crs",
    name: {
        en: "Comprehensive Ranking System"
    },
    conditionGroups: {
        age: getConditionsFromAgeTable(ageTable),
        education: getConditionsFromEducationTable(educationTable),
        language: getConditionsFromLanguageTables(languageTableFirst, languageTableSecond),
    },
    reference: {
        url: "http://www.cic.gc.ca/english/express-entry/grid-crs.asp"
    }
}

console.log(crs)

export default crs
