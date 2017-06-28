import { ScoreSystem } from '../../../definitions/ScoreSystem'
import { ageConditions } from './ageConds'
import { educationConditions } from './educationConds'
import { languageConditions } from './languageConds'
import { transferabilityConditions } from './transferabilityConds'
import { additionalPointsConditions } from './additionalConds'
import { canadaWorkConditions } from './canadaWorkConds'

const crs: ScoreSystem = {
    scoreSystemId: 'crs',
    initialScore: 0,
    name: {
        en: 'Comprehensive Ranking System',
    },
    conditionGroups: {
        age: {
            maxScore: Infinity,
            conditions: ageConditions,
        },
        education: {
            maxScore: Infinity,
            conditions: educationConditions,
        },
        language: {
            maxScore: Infinity,
            conditions: languageConditions,
        },
        canadaWork: {
            maxScore: Infinity,
            conditions: canadaWorkConditions,
        },
        transferable: {
            maxScore: 100,
            conditions: transferabilityConditions,
        },
        additions: {
            maxScore: 600,
            conditions: additionalPointsConditions,
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
