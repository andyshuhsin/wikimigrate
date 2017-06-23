import { ScoreCondition, ScoreSystem } from '../../definitions/ScoreSystem'
import AgePrereq from '../../definitions/Prerequisites/AgePrereq'
import { allOf, Combination, identity, oneOf } from '../../definitions/auxiliary/Combination'
import { UnionPrereq } from '../../definitions/Prerequisites/UnionPrereq'
import { duration, Duration } from '../../definitions/auxiliary/Duration'
import { EducationStage } from '../../definitions/Qualities/EducationExperience'
import { EducationPrereq } from '../../definitions/Prerequisites/EducationPrereq'
import { LanguagePrereq, zeroLanguagePrereqScores } from '../../definitions/Prerequisites/LanguagePrereq'
import { SpousePrereq } from '../../definitions/Prerequisites/SpousePrereq'
import { Interval } from '../../definitions/auxiliary/Operator'
import { WorkExperiencePrereq } from '../../definitions/Prerequisites/WorkExperiencePrereq'
import { CertificationPrereq } from '../../definitions/Prerequisites/CertificationPrereq'
import { OfferPrereq } from '../../definitions/Prerequisites/OfferPrereq'
import { noc0, noc00, nocA, nocB } from './jobClass/noc2016'
import { NominationPrereq } from '../../definitions/Prerequisites/NominationPrereq'
import { languageTestItemValues } from '../../definitions/auxiliary/LanguageTest'

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
        isMarried: boolean,
    ): ScoreCondition {
        return {
            score: score,
            batch: 'age',
            prerequisites: allOf([
                {
                    prereqId: 'union',
                    unionTypes: ['marriage', 'common-law-partnership'],
                    inUnion: isMarried,
                } as UnionPrereq,
                {
                    prereqId: 'age',
                    value: ['>=', duration(age, 'year')],
                } as AgePrereq,
                {
                    prereqId: 'age',
                    value: ['<', duration(age + 1, 'year')],
                } as AgePrereq,
            ]),
        }
    }

    const result: ScoreCondition[] = []
    for (const ageKey in table) {
        const age: number = Number(ageKey)
        const marriedScore = table[ageKey][0]
        const singleScore = table[ageKey][1]
        result.push(makeAgeCondition(marriedScore, age, true))
        result.push(makeAgeCondition(singleScore, age, false))
    }
    return result
}

type EducationTableEntry<T> = {
    stage: Interval<EducationStage>
    minDuration?: Duration
    // two degrees at the same time
    stageSecond?: Interval<EducationStage>
    minDurationSecond?: Duration

    scores: T
}

type EducationTable = EducationTableEntry<[MarriedScore, SingleScore]>[]
type EducationTableSpouseBonusTable = EducationTableEntry<SpouseBonusScore>[]

const educationTable: EducationTable = [
    {
        stage: ['=', 'secondary'],
        scores: [28, 30],
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(1, 'year'),
        scores: [84, 90],
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(2, 'year'),
        scores: [91, 98],
    },
    {
        stage: ['=', 'bachelor'],
        scores: [112, 120],
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(3, 'year'),
        scores: [112, 120],
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(3, 'year'),
        stageSecond: ['>', 'secondary'],
        minDurationSecond: undefined,
        scores: [119, 128],
    },
    {
        stage: ['=', 'master'],
        scores: [126, 135],
    },
    {
        stage: ['=', 'professional'],
        scores: [126, 135],
    },
    {
        stage: ['=', 'phd'],
        scores: [140, 150],
    },
]

const educationTableSpouseBonusTable: EducationTableSpouseBonusTable = [
    {
        stage: ['=', 'secondary'],
        scores: 2,
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(1, 'year'),
        scores: 6,
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(2, 'year'),
        scores: 6,
    },
    {
        stage: ['=', 'bachelor'],
        scores: 7,
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(3, 'year'),
        scores: 8,
    },
    {
        stage: ['>', 'secondary'],
        minDuration: duration(3, 'year'),
        stageSecond: ['>', 'secondary'],
        minDurationSecond: undefined,
        scores: 9,
    },
    {
        stage: ['=', 'master'],
        scores: 10,
    },
    {
        stage: ['=', 'professional'],
        scores: 10,
    },
    {
        stage: ['=', 'phd'],
        scores: 10,
    },

]

function getConditionsFromEducationTable(
    table: EducationTable,
    tableSpouse: EducationTableSpouseBonusTable,
): ScoreCondition[] {

    function makePrereq(educationStage: Interval<EducationStage>, minDuration?: Duration): EducationPrereq {
        return {
            prereqId: 'education',
            stage: educationStage,
            duration: minDuration && ['>=', minDuration],
            region: 'world',
        }
    }

    function singleOrDualDegreePrerequisites(
        educationStage: Interval<EducationStage>,
        minDuration?: Duration,
        educationStageSecond?: Interval<EducationStage>,
        minDurationSecond?: Duration,
    ): Combination<EducationPrereq> | EducationPrereq {
        return educationStageSecond
            ? allOf([
                makePrereq(educationStage, minDuration),
                makePrereq(educationStageSecond, minDurationSecond),
            ], {surjective: true})
            : makePrereq(educationStage, minDuration)
    }

    function makeCondition(
        score: number,
        isMarried: boolean,
        educationStage: Interval<EducationStage>,
        minDuration?: Duration,
        educationStageSecond?: Interval<EducationStage>,
        minDurationSecond?: Duration,
    ): ScoreCondition {
        return {
            score: score,
            batch: 'union',
            prerequisites: allOf([
                singleOrDualDegreePrerequisites(
                    educationStage, minDuration, educationStageSecond, minDurationSecond,
                ),
                {
                    prereqId: 'union',
                    unionTypes: ['marriage', 'common-law-partnership'],
                    inUnion: isMarried,
                } as UnionPrereq,
            ]),
        }
    }

    function makeSpouseBonusCondition(
        crsScore: number,
        applicantEducation: Interval<EducationStage>,
        spouseEducation: Interval<EducationStage>,
        minDurationApplicantEducation?: Duration,
        minDurationSpouseEducation?: Duration,
        applicantEducationSecond?: Interval<EducationStage>,
        spouseEducationSecond?: Interval<EducationStage>,
        minDurationApplicantEducationSecond?: Duration,
        minDurationSpouseEducationSecond?: Duration,
    ): ScoreCondition {
        return {
            score: crsScore,
            batch: 'spouse-bonus',
            prerequisites: allOf([
                singleOrDualDegreePrerequisites(
                    applicantEducation,
                    minDurationApplicantEducation,
                    applicantEducationSecond,
                    minDurationApplicantEducationSecond,
                ),
                {
                    prereqId: 'spouse',
                    spousePrerequisites: identity([
                        singleOrDualDegreePrerequisites(
                            spouseEducation,
                            minDurationSpouseEducation,
                            spouseEducationSecond,
                            minDurationSpouseEducationSecond,
                        ),
                    ]),
                } as SpousePrereq,
            ]),
        }
    }

    const result: ScoreCondition[] = []
    for (const entry of table) {
        result.push(makeCondition(
            entry.scores[0], true,
            entry.stage, entry.minDuration,
            entry.stageSecond, entry.minDurationSecond),
        )
        result.push(makeCondition(
            entry.scores[1], false,
            entry.stage, entry.minDuration,
            entry.stageSecond, entry.minDurationSecond),
        )
    }

    for (const applicantEntry of table) {
        for (const spouseEntry of tableSpouse) {
            result.push(makeSpouseBonusCondition(
                applicantEntry.scores[0] + spouseEntry.scores,
                applicantEntry.stage,
                spouseEntry.stage,
                applicantEntry.minDuration,
                spouseEntry.minDuration,
                applicantEntry.stageSecond,
                spouseEntry.stageSecond,
                applicantEntry.minDurationSecond,
                spouseEntry.minDurationSecond,
            ))
        }
    }

    return result
}

type ClbScore = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
const clbScores: ClbScore[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

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


function getConditionsFromFirstLanguageTables(tableFirst: LanguageTable,): ScoreCondition[] {

    function makeSingleScoreConditions(
        clbScore: number,
        crsScore: number,
        isMarried: boolean,
    ): ScoreCondition[] {
        return languageTestItemValues.map(itemKey => ({
            score: crsScore,
            batch: itemKey + '-1',
            prerequisites: allOf([
                {
                    prereqId: 'language_test',
                    result: {
                        testId: 'clb',
                        scores: {
                            ...zeroLanguagePrereqScores,
                            [itemKey]: ['>=', clbScore],
                        },
                    },
                } as LanguagePrereq,
                {
                    prereqId: 'union',
                    unionTypes: ['marriage', 'common-law-partnership'],
                    inUnion: isMarried,
                } as UnionPrereq,
            ]),
        } as ScoreCondition))
    }

    const result: ScoreCondition[] = []
    // One language
    for (const firstScore of clbScores) {

        const scores = tableFirst[firstScore]
        if (scores) {
            result.push(...makeSingleScoreConditions(+firstScore, scores[0], false))
            result.push(...makeSingleScoreConditions(+firstScore, scores[1], true))
        }
    }

    return result
}

function getConditionsFromSecondLanguageTables(
    tableFirst: LanguageTable,
    tableSecond: LanguageTable,
): ScoreCondition[] {

    function makeDualScoresConditions(
        clbScore1: number,
        clbScore2: number,
        crsScore: number,
        isMarried: boolean,
    ): ScoreCondition[] {
        return languageTestItemValues.map(itemKey => ({
            score: crsScore,
            batch: itemKey + '-2',
            prerequisites: allOf([
                allOf([
                    {
                        prereqId: 'language_test',
                        result: {
                            testId: 'clb',
                            scores: {
                                ...zeroLanguagePrereqScores,
                                [itemKey]: ['>=', clbScore1],
                            },
                        },
                    } as LanguagePrereq,
                    {
                        prereqId: 'language_test',
                        result: {
                            testId: 'clb',
                            scores: {
                                ...zeroLanguagePrereqScores,
                                [itemKey]: ['>=', clbScore2],
                            },
                        },
                    } as LanguagePrereq,
                ], {surjective: true}),
                {
                    prereqId: 'union',
                    unionTypes: ['marriage', 'common-law-partnership'],
                    inUnion: isMarried,
                } as UnionPrereq,
            ]),
        }))
    }

    const result: ScoreCondition[] = []

    for (const firstScore of clbScores) {
        const scores = tableFirst[firstScore]
        if (scores) {
            for (const secondScore of clbScores) {
                const scores2 = tableSecond[secondScore]
                if (scores2) {
                    result.push(...makeDualScoresConditions(+firstScore, +secondScore, scores2[0], false))
                    result.push(...makeDualScoresConditions(+firstScore, +secondScore, scores2[1], true))
                }
            }
        }
    }
    return result
}


// "Points for CLB 7 or more on all first official language abilities, with one or more under CLB 9"
const langPrereq7_9 = oneOf([
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                listening: ['>=', 9],
                speaking: ['>=', 7],
                reading: ['>=', 7],
                writing: ['>=', 7],
            },
        },
    } as LanguagePrereq,
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                listening: ['>=', 7],
                speaking: ['>=', 9],
                reading: ['>=', 7],
                writing: ['>=', 7],
            },
        },
    } as LanguagePrereq,
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                listening: ['>=', 7],
                speaking: ['>=', 7],
                reading: ['>=', 9],
                writing: ['>=', 7],
            },
        },
    } as LanguagePrereq,
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                listening: ['>=', 7],
                speaking: ['>=', 7],
                reading: ['>=', 7],
                writing: ['>=', 9],
            },
        },
    } as LanguagePrereq,
])

// "Points for CLB 9 or more on all four first official language abilities"
const langPrereq9 = identity([
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                listening: ['>=', 9],
                speaking: ['>=', 9],
                reading: ['>=', 9],
                writing: ['>=', 9],
            },
        },
    } as LanguagePrereq,
])

const langPrereq5_7 = oneOf([
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                listening: ['>=', 7],
                speaking: ['>=', 5],
                reading: ['>=', 5],
                writing: ['>=', 5],
            },
        },
    } as LanguagePrereq,
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                listening: ['>=', 5],
                speaking: ['>=', 7],
                reading: ['>=', 5],
                writing: ['>=', 5],
            },
        },
    } as LanguagePrereq,
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                listening: ['>=', 5],
                speaking: ['>=', 5],
                reading: ['>=', 7],
                writing: ['>=', 5],
            },
        },
    } as LanguagePrereq,
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                listening: ['>=', 5],
                speaking: ['>=', 5],
                reading: ['>=', 5],
                writing: ['>=', 7],
            },
        },
    } as LanguagePrereq,
])

const langPrereq7 = identity([
    {
        prereqId: 'language_test',
        result: {
            testId: 'clb',
            scores: {
                listening: ['>=', 7],
                speaking: ['>=', 7],
                reading: ['>=', 7],
                writing: ['>=', 7],
            },
        },
    } as LanguagePrereq,
])

// "Post-secondary program credential of one year or longer"
const singleDegreePrereq = identity([
    {
        prereqId: 'education',
        stage: ['>=', 'secondary'],
        region: 'world',
        duration: ['>=', duration(1, 'year')],
    } as EducationPrereq,
])

// Two or more post-secondary program credentials
// AND at least one of these credentials was issued on
// completion of a post-secondary program of three years or longer
const dualDegreePrereq = allOf([
    {
        prereqId: 'education',
        stage: ['>=', 'secondary'],
        region: 'world',
        duration: ['>=', duration(3, 'year')],

    } as EducationPrereq,
    {
        prereqId: 'education',
        stage: ['>=', 'secondary'],
        region: 'world',
    } as EducationPrereq,
], {surjective: true})

const canadianWorkOneYear = identity([
    {
        prereqId: 'work_experience',
        duration: ['>=', duration(1, 'year')],
        region: 'canada',
    } as WorkExperiencePrereq,
])

const canadianWorkTwoYear = identity([
    {
        prereqId: 'work_experience',
        duration: ['>=', duration(2, 'year')],
        region: 'canada',
    } as WorkExperiencePrereq,
])

const foreignWorkOneOrTwoYears = allOf([
    {
        prereqId: 'work_experience',
        duration: ['>=', duration(1, 'year')],
        region: 'world',
        regionExcept: 'canada',
    } as WorkExperiencePrereq,
    {
        prereqId: 'work_experience',
        duration: ['<', duration(3, 'year')],
        region: 'world',
        regionExcept: 'canada',
    } as WorkExperiencePrereq,
])

const foreignWorkThreeYears = identity([
    {
        prereqId: 'work_experience',
        duration: ['>=', duration(3, 'year')],
        region: 'world',
        regionExcept: 'canada',
    } as WorkExperiencePrereq,
])

const tradeCertification = identity([
    {
        prereqId: 'certification',
        description: {
            en: 'Trade occupation',
        },
    } as CertificationPrereq,
])

const transferabilityConditions: ScoreCondition[] = [

    // Language + Education
    {
        score: 13,
        batch: 'transferability:language+education',
        prerequisites: allOf([
            langPrereq7_9,
            singleDegreePrereq,
        ]),
    },
    {
        score: 25,
        batch: 'transferability:language+education',
        prerequisites: allOf([
            langPrereq9,
            singleDegreePrereq,
        ]),
    },
    {
        score: 25,
        batch: 'transferability:language+education',
        prerequisites: allOf([
            langPrereq7_9,
            dualDegreePrereq,
        ]),
    },
    {
        score: 50,
        batch: 'transferability:language+education',
        prerequisites: allOf([
            langPrereq9,
            dualDegreePrereq,
        ]),
    },

    // Canada work experience + degree
    {
        score: 13,
        batch: 'transferability:canada_work+education',
        prerequisites: allOf([
            canadianWorkOneYear,
            singleDegreePrereq,
        ]),
    },
    {
        score: 25,
        batch: 'transferability:canada_work+education',
        prerequisites: allOf([
            canadianWorkTwoYear,
            singleDegreePrereq,
        ]),
    },
    {
        score: 25,
        batch: 'transferability:canada_work+education',
        prerequisites: allOf([
            canadianWorkOneYear,
            dualDegreePrereq,
        ]),
    },
    {
        score: 50,
        batch: 'transferability:canada_work+education',
        prerequisites: allOf([
            canadianWorkTwoYear,
            dualDegreePrereq,
        ]),
    },

    // Foreign work + language
    {
        score: 13,
        batch: 'transferability:work+education',
        prerequisites: allOf([
            foreignWorkOneOrTwoYears,
            langPrereq7_9,
        ]),
    },
    {
        score: 25,
        batch: 'transferability:work+education',
        prerequisites: allOf([
            foreignWorkOneOrTwoYears,
            langPrereq9,
        ]),
    },
    {
        score: 25,
        batch: 'transferability:work+education',
        prerequisites: allOf([
            foreignWorkThreeYears,
            langPrereq7_9,
        ]),
    },
    {
        score: 50,
        batch: 'transferability:work+education',
        prerequisites: allOf([
            foreignWorkThreeYears,
            langPrereq9,
        ]),
    },

    // Foreign work + Canadian experience
    {
        score: 13,
        batch: 'transferability:foreign_work+canada_work',
        prerequisites: allOf([
            foreignWorkOneOrTwoYears,
            canadianWorkOneYear,
        ]),
    },
    {
        score: 25,
        batch: 'transferability:foreign_work+canada_work',
        prerequisites: allOf([
            foreignWorkOneOrTwoYears,
            canadianWorkTwoYear,
        ]),
    },
    {
        score: 25,
        batch: 'transferability:foreign_work+canada_work',
        prerequisites: allOf([
            foreignWorkThreeYears,
            canadianWorkOneYear,
        ]),
    },
    {
        score: 50,
        batch: 'transferability:foreign_work+canada_work',
        prerequisites: allOf([
            foreignWorkThreeYears,
            canadianWorkTwoYear,
        ]),
    },

    // Language + Certification
    {
        score: 25,
        batch: 'transferability:language+certification',
        prerequisites: allOf([
            tradeCertification,
            langPrereq5_7,
        ]),
    },

    {
        score: 50,
        batch: 'transferability:language+certification',
        prerequisites: allOf([
            tradeCertification,
            langPrereq7,
        ]),
    },
]

const additionalPointsTable: ScoreCondition[] = [
    {
        score: 15,
        batch: 'additional',
        prerequisites: allOf([
            {
                prereqId: 'education',
                stage: ['>', 'secondary'],
                region: 'canada',
                duration: ['>=', duration(1, 'year')],
            } as EducationPrereq,
            {
                prereqId: 'education',
                stage: ['>', 'secondary'],
                region: 'canada',
                duration: ['<', duration(3, 'year')],
            } as EducationPrereq,
        ]),
    },
    {
        score: 30,
        batch: 'additional',
        prerequisites: identity([
            {
                prereqId: 'education',
                stage: ['>', 'secondary'],
                region: 'canada',
                duration: ['>', duration(2, 'year')],
            } as EducationPrereq,
        ]),
    },
    {
        score: 200,
        batch: 'additional',
        prerequisites: identity([
            {
                prereqId: 'offer',
                employer: {
                    region: 'canada',
                },
                jobGroup: noc00,
            } as OfferPrereq,
        ]),
    },
    {
        score: 50,
        batch: 'additional',
        prerequisites: oneOf([
            {
                prereqId: 'offer',
                employer: {
                    region: 'canada',
                },
                jobGroup: noc0,
            } as OfferPrereq,
            {
                prereqId: 'offer',
                employer: {
                    region: 'canada',
                },
                jobGroup: nocA,
            } as OfferPrereq,
            {
                prereqId: 'offer',
                employer: {
                    region: 'canada',
                },
                jobGroup: nocB,
            } as OfferPrereq,
        ]),
    },
    {
        score: 600,
        batch: 'additional',
        prerequisites: identity([
            {
                prereqId: 'nomination',
                type: 'provincial',
                region: 'canada',
            } as NominationPrereq,
        ]),
    },
]

const crs: ScoreSystem = {
    scoreSystemId: 'crs',
    initialScore: 0,
    name: {
        en: 'Comprehensive Ranking System',
    },
    conditionGroups: {
        age: {
            maxScore: Infinity,
            conditions: getConditionsFromAgeTable(ageTable),
        },
        education: {
            maxScore: Infinity,
            conditions: getConditionsFromEducationTable(educationTable, educationTableSpouseBonusTable),
        },
        languageOne: {
            maxScore: Infinity,
            conditions: getConditionsFromFirstLanguageTables(languageTableFirst),
        },
        languageTwo: {
            maxScore: Infinity,
            conditions: getConditionsFromSecondLanguageTables(languageTableFirst, languageTableSecond),
        },
        transferable: {
            maxScore: 100,
            conditions: transferabilityConditions,
        },
        additions: {
            maxScore: 600,
            conditions: additionalPointsTable,
        },
    },
    history: [
        {
            lowestScore: 415,
            date: [2017, 5, 17],
        },
        {
            lowestScore: 423,
            date: [2017, 5, 4],
        },
        {
            lowestScore: 415,
            date: [2017, 4, 19],
        },
    ],
    reference: {
        url: 'http://www.cic.gc.ca/english/express-entry/grid-crs.asp',
    },
}

export default crs
