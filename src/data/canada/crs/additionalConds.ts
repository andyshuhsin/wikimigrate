import { ScoreCondition } from '../../../definitions/ScoreSystem'
import { allOf, identity, oneOf } from '../../../definitions/auxiliary/Combination'
import { ResidencePrereq } from '../../../definitions/Prerequisites/ResidencePrereq'
import { RightPrereq } from '../../../definitions/Prerequisites/RightPrereq'
import SiblingPrereq from '../../../definitions/Prerequisites/SiblingPrereq'
import { OfferPrereq } from '../../../definitions/Prerequisites/OfferPrereq'
import { noc0, noc00, nocA, nocB } from '../jobClass/noc2016'
import { NominationPrereq } from '../../../definitions/Prerequisites/NominationPrereq'
import { LanguagePrereq } from '../../../definitions/Prerequisites/LanguagePrereq'
import { duration } from '../../../definitions/auxiliary/Duration'
import { EducationPrereq } from '../../../definitions/Prerequisites/EducationPrereq'

export const additionalPointsConditions: ScoreCondition[] = [
    {
        score: 15,
        batch: 'additional:sibling',
        prerequisites: identity([
            {
                prereqId: 'sibling',
                siblingPrerequisites: allOf([
                    identity([
                        {
                            prereqId: 'residence',
                            regionId: 'canada',
                            currently: true,
                        } as ResidencePrereq
                    ]),
                    oneOf([
                        {
                            prereqId: 'right',
                            regionId: 'canada',
                            rightId: 'citizen',
                        } as RightPrereq,
                        {
                            prereqId: 'right',
                            regionId: 'canada',
                            rightId: 'permanent',
                        } as RightPrereq,
                    ])
                ])
            } as SiblingPrereq
        ])
    },
    {
        score: 15,
        batch: 'additional:french',
        prerequisites: identity([
            {
                prereqId: 'language_test',
                result: {
                    testId: 'clb',
                    language: 'fr',
                    scores: {
                        listening: ['>=', 7],
                        speaking: ['>=', 7],
                        reading: ['>=', 7],
                        writing: ['>=', 7],
                    }
                }
            } as LanguagePrereq
        ])
    },
    {
        score: 30,
        batch: 'additional:french',
        prerequisites: allOf([
            {
                prereqId: 'language_test',
                result: {
                    testId: 'clb',
                    language: 'fr',
                    scores: {
                        listening: ['>=', 7],
                        speaking: ['>=', 7],
                        reading: ['>=', 7],
                        writing: ['>=', 7],
                    }
                }
            } as LanguagePrereq,
            {
                prereqId: 'language_test',
                result: {
                    testId: 'clb',
                    language: 'en',
                    scores: {
                        listening: ['>=', 5],
                        speaking: ['>=', 5],
                        reading: ['>=', 5],
                        writing: ['>=', 5],
                    }
                }
            } as LanguagePrereq,
        ], {
            surjective: true
        })
    },
    {
        score: 15,
        batch: 'additional:canada-education',
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
        batch: 'additional:canada-education',
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
        batch: 'additional:job-offer',
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
        batch: 'additional:job-offer',
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
        batch: 'additional:provincial-nomination',
        prerequisites: identity([
            {
                prereqId: 'nomination',
                type: 'provincial',
                region: 'canada',
            } as NominationPrereq,
        ]),
    },
]
