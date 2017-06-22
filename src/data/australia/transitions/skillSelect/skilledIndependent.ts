import { alien, visa189holder } from '../../status'

import { below50, competentEnglish } from './skillSelectCommon'

import jobClass from '../../jobClass'
import Transition from '../../../../definitions/Transition'
import { allOf, identity } from '../../../../definitions/auxiliary/Combination'
import { WorkExperiencePrereq } from '../../../../definitions/Prerequisites/WorkExperiencePrereq'
import { prereqTitleDict } from '../../../common/prereqTitleDict'
import { duration } from '../../../../definitions/auxiliary/Duration'

const skilledIndependent: Transition = {
    id: 'skilled_independent',
    regionId: 'australia',
    acquireBy: 'application',
    name: {
        en: 'Skilled Independent visa (subclass 189)',
        zh_hans: '独立技术移民(189)',
    },
    from: alien,
    to: visa189holder,
    prerequisiteList: allOf([
        competentEnglish,
        below50,
        identity([
            {
                prereqId: 'work_experience',
                jobNature: allOf([
                    jobClass.jobGroups.sol,
                ]),
            } as WorkExperiencePrereq,
        ], {
            title: prereqTitleDict.work_experience
        })
    ]),
    paperwork: {
        processingTime: [
            {
                percentage: 75,
                duration: duration(4, 'month')
            },
            {
                percentage: 90,
                duration: duration(7, 'month')
            }
        ],
        procedureList: [
            {
                id: 'skill_assessment',
                name: {
                    en: 'Obtain a suitable skills assessment for that occupation',
                },
            },
            {
                id: 'eoi',
                name: {
                    en: 'Submit Expression of Interest',
                },
            },
            {
                id: 'wait',
                name: {
                    en: 'Wait for invitation',
                },
            },
            {
                id: 'document',
                name: {
                    en: 'Prepare documents'
                }
            },
            {
                id: 'apply',
                name: {
                    en: 'Apply for visa'
                }
            }
        ],
    },
    referenceList: [
        {
            url: 'https://www.border.gov.au/Trav/Visa-1/189-',
            title: {
                en: 'Official page',
                zh_hans: '官方页面',
            },
        },
    ],
}

export default skilledIndependent
