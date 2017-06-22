import Transition from '../../../definitions/Transition'
import { allOf } from '../../../definitions/auxiliary/Combination'
import AgePrereq from '../../../definitions/Prerequisites/AgePrereq'

import { alien, silverFernHolder } from '../status'
import { duration } from '../../../definitions/auxiliary/Duration'

export const silverFern: Transition = {
    id: 'new_zealand_silver_fern',
    regionId: 'new_zealand',
    acquireBy: 'application',
    stage: {
        description: {
            en: 'Close till late 2017',
            zh_hans: '本期申请已结束，下期申请2017年下半年开放',
        },
    },
    name: {
        en: 'Silver Fern Job Search Work Visa',
        zh_hans: '银蕨求职签证',
    },
    from: alien,
    to: silverFernHolder,
    prerequisiteList: allOf([
        allOf([
            {
                prereqId: 'age',
                value: ['<=', duration(35, 'year')],
            } as AgePrereq,
            {
                prereqId: 'age',
                value: ['>=', duration(20, 'year')],
            } as AgePrereq,
        ]),
    ]),
    paperwork: {
        procedureList: [],
    },
    referenceList: [
        {
            url: 'https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/silver-fern-job-search-work-visa',
            title: {
                en: 'Official page',
                zh_hans: '官方页面',
            },
        },
    ],
}
