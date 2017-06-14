import { alien, visa190holder } from '../../status'

import { below50, competentEnglish } from './skillSelectCommon'

import jobClass from '../../jobClass'
import Transition from '../../../../definitions/Transition'
import { allOf } from '../../../../definitions/auxiliary/Combination'
import { WorkExperiencePrereq } from '../../../../definitions/Prerequisites/WorkExperiencePrereq'

const skilledNominated: Transition = {
    id: 'skilled_nominated',
    regionId: 'australia',
    acquireBy: 'application',
    name: {
        en: 'Skilled Nominated visa (subclass 190)',
        zh_hans: '州担保技术移民(190)',
    },
    from: alien,
    to: visa190holder,
    prerequisiteList: allOf([

        competentEnglish,
        below50,
        {
            prereqId: 'work_experience',
            jobNature: allOf([
                jobClass.jobGroups.sol,
            ]),
        } as WorkExperiencePrereq,
    ]),
    procedureList: [
        {
            id: 'nomination',
            name: {
                en: 'Be nominated by an Australian state or territory government agency',
            },
        },
        {
            id: 'skill_assessment',
            name: {
                en: 'Obtain a suitable skills assessment for that occupation',
            },
        },
        {
            id: 'apply',
            name: {
                en: 'Submit Expression of Interest',
            },
        },
        {
            id: 'wait',
            name: {
                en: 'Wait',
            },
        },
    ],
    referenceList: [
        {
            url: 'https://www.border.gov.au/Trav/Visa-1/190-',
            title: {
                en: 'Official page',
                zh_hans: '官方页面',
            },
        },
    ],
}

export default skilledNominated
