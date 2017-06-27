import { evaluate, Spec } from './evaluator'
import crs from '../../src/data/canada/crs'
import { getInitialStatus, Person } from '../../src/definitions/Person'
import { ScoreSystem } from '../../src/definitions/ScoreSystem'
import { calcScore } from '../../src/calculators/calcScore'
import { EducationQuality } from '../../src/definitions/Qualities/EducationExperience'
import { duration } from '../../src/definitions/auxiliary/Duration'
import { WorkExperienceQuality } from '../../src/definitions/Qualities/WorkExperience'

const john: Person = {
    birth: {
        date: {
            year: (new Date()).getFullYear() - 30,
        },
    },
    status: getInitialStatus('atlantis'),
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
        "Example 1",
        [
            john,
            crs
        ],
        361,
    ]
]

evaluate(spec, calcScore)
