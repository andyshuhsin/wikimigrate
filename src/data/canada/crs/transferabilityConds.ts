// "Points for CLB 7 or more on all first official language abilities, with one or more under CLB 9"
import { allOf, identity, oneOf } from '../../../definitions/auxiliary/Combination'
import { LanguagePrereq } from '../../../definitions/Prerequisites/LanguagePrereq'
import { duration } from '../../../definitions/auxiliary/Duration'
import { WorkExperienceQuality } from '../../../definitions/Qualities/WorkExperience'
import { WorkExperiencePrereq } from '../../../definitions/Prerequisites/WorkExperiencePrereq'
import { ScoreCondition } from '../../../definitions/ScoreSystem'
import { Certification } from '../../../definitions/auxiliary/Certification'
import { CertificationPrereq } from '../../../definitions/Prerequisites/CertificationPrereq'
import { EducationPrereq } from '../../../definitions/Prerequisites/EducationPrereq'
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

export const transferabilityConditions: ScoreCondition[] = [

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
