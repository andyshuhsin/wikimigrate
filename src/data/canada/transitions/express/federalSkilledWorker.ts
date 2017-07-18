import { alien, expressEntryCandidate } from '../../status'

import jobClass from '../../jobClass'
import Transition from '../../../../definitions/Transition'
import { allOf, identity, oneOf } from '../../../../definitions/auxiliary/Combination'
import { languagePrereqMinScore } from '../../../../definitions/Prerequisites/LanguagePrereq'
import { duration } from '../../../../definitions/auxiliary/Duration'
import { WorkExperiencePrereq } from '../../../../definitions/Prerequisites/WorkExperiencePrereq'
import { EducationPrereq } from '../../../../definitions/Prerequisites/EducationPrereq'
import { money } from '../../../../definitions/auxiliary/Money'
import { FundPrereq } from '../../../../definitions/Prerequisites/FundPrereq'
import { RightPrereq } from '../../../../definitions/Prerequisites/RightPrereq'
import { OfferPrereq } from '../../../../definitions/Prerequisites/OfferPrereq'
import { prereqTitleDict } from '../../../common/prereqTitleDict'
import crs from '../../crs'
import { expressProcedures } from './expressProcedures'

const federalSkilledWorker: Transition = {
    id: 'federal_skilled_worker',
    regionId: 'canada',
    acquireBy: 'application',
    name: {
        en: 'Federal Skilled Worker Program',
        zh_hans: '联邦技术移民(Federal Skilled Worker Program, FSW)',
    },
    from: alien,
    to: expressEntryCandidate,
    scoreSystem: crs,
    prerequisiteList: allOf([

        oneOf([
            languagePrereqMinScore('clb', {
                listening: 7,
                speaking: 7,
                reading: 7,
                writing: 7,
            }),
        ], {
            title: prereqTitleDict.language_test,
        }),

        identity([
            {
                prereqId: 'work_experience',
                length: ['>=', duration(1, 'year')],
                withinLast: duration(10, 'year'),
                region: 'world',
                workHoursPerWeek: duration(30, 'hour'),
                jobNature: oneOf([
                    'noc2011-0',
                    'noc2011-A',
                    'noc2011-B',
                ]),
            } as WorkExperiencePrereq,
        ], {
            title: prereqTitleDict.work_experience,
        }),

        // Education
        oneOf(
            [

                {
                    prereqId: 'education',
                    stage: ['>=', 'secondary'],
                    region: 'canada',
                } as EducationPrereq,

                {
                    prereqId: 'education',
                    region: 'world',
                    stage: ['>=', 'secondary'],
                    certification: 'eca',
                } as EducationPrereq,

            ],
            {
                title: prereqTitleDict.education,
            }),

        // Fund
        oneOf(
            [
                {
                    prereqId: 'fund',
                    type: 'possess',
                    schemes: [
                        {
                            condition: {familyMember: 1},
                            fund: money(12300, 'cad'),
                        },
                        {
                            condition: {familyMember: 2},
                            fund: money(15312, 'cad'),
                        },
                        {
                            condition: {familyMember: 3},
                            fund: money(18825, 'cad'),
                        },
                        {
                            condition: {familyMember: 4},
                            fund: money(22856, 'cad'),
                        },
                        {
                            condition: {familyMember: 5},
                            fund: money(25923, 'cad'),
                        },
                        {
                            condition: {familyMember: 6},
                            fund: money(29236, 'cad'),
                        },
                        {
                            condition: {familyMember: 7},
                            fund: money(32550, 'cad'),
                        },
                    ],
                } as FundPrereq,

                // You don't need to prove fund if you can already work in Canada and has an offer
                allOf([
                    {
                        prereqId: 'right',
                        regionId: 'canada',
                        rightId: 'work',
                    } as RightPrereq,
                    {
                        prereqId: 'offer',
                        employer: {
                            region: 'canada',
                        },
                    } as OfferPrereq,
                ]),
            ],
            {
                title: prereqTitleDict.fund,
            }),
    ]),
    paperwork: {
        procedureList: expressProcedures,
    },
    referenceList: [
        {
            url: 'http://www.cic.gc.ca/english/immigrate/skilled/apply-who.asp',
            title: {
                en: 'Official Page',
            },
        },
    ],
}

export default federalSkilledWorker
