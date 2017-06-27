import { evaluate, Spec } from './evaluator'
import crs from '../../src/data/canada/crs'
import { getInitialStatus, Person } from '../../src/definitions/Person'
import { ScoreSystem } from '../../src/definitions/ScoreSystem'
import { calcScore } from '../../src/calculators/calcScore'
import { EducationQuality } from '../../src/definitions/Qualities/EducationExperience'
import { duration } from '../../src/definitions/auxiliary/Duration'
import { WorkExperienceQuality } from '../../src/definitions/Qualities/WorkExperience'
import { convertLanguageTestScores } from '../../src/calculators/prerequisiteOperations'
import languageTestProfiles from '../../src/data/common/languageTestProfiles'

const alice: Person = {
    birth: {
        date: {
            year: (new Date()).getFullYear() - 22,
        },
    },
    status: getInitialStatus('usa'),
    spouse: null,
    education: [
        {
            qualityId: 'education',
            stage: 'bachelor',
            duration: duration(4, 'year'),
            regionId: 'canada',
        } as EducationQuality
    ],
    languageTests: [
        {
            testId: 'ielts',
            scores: {
                speaking: 7,
                listening: 7,
                reading: 7,
                writing: 7,
            },
        },
    ],
    workExperiences: [
        {
            qualityId: 'work_experience',
            regionId: 'canada',
            duration: duration(2, 'year')
        } as WorkExperienceQuality
    ]
}

const bob: Person = {
    birth: {
        date: {
            year: (new Date()).getFullYear() - 32,
        },
    },
    status: getInitialStatus('uk'),
    spouse: alice,
    education: [
        {
            qualityId: 'education',
            stage: 'bachelor',
            duration: duration(4, 'year'),
            regionId: 'australia',
        } as EducationQuality,
        {
            qualityId: 'education',
            stage: 'phd',
            duration: duration(5, 'year'),
            regionId: 'australia',
        } as EducationQuality,
    ],
    languageTests: [
        {
            testId: 'tef',
            scores: {
                speaking: 256,
                listening: 300,
                reading: 280,
                writing: 400,
            },
        },
        {
            testId: 'celpip',
            scores: {
                speaking: 10,
                listening: 10,
                reading: 0,
                writing: 0,
            },
        },
    ],
    workExperiences: []
}

const ulysses: Person = {
    birth: {
        date: {
            year: (new Date()).getFullYear() - 30,
        },
    },
    status: getInitialStatus('utopia'),
    spouse: null,
    education: [
        {
            qualityId: 'education',
            stage: 'bachelor',
            duration: duration(4, 'year'),
            regionId: 'uk',
        } as EducationQuality
    ],
    languageTests: [
        {
            testId: 'ielts',
            scores: {
                speaking: 7,
                listening: 7,
                reading: 7,
                writing: 7,
            },
        },
    ],
    workExperiences: [
        {
            qualityId: 'work_experience',
            regionId: 'usa',
            duration: duration(1, 'year')
        } as WorkExperienceQuality
    ]
}


const spec: Spec<[Person, ScoreSystem], number>[] = [
    [
        "bob",
        [
            bob,
            crs
        ],
        361,
    ],
    [
        "ulysses",
        [
            ulysses,
            crs
        ],
        361,
    ],
]

evaluate(spec, calcScore)
