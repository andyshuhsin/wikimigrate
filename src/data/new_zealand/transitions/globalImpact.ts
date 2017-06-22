import Transition from '../../../definitions/Transition'
import { allOf, identity } from '../../../definitions/auxiliary/Combination'

import { alien, globalImpactVisaHolder } from '../status'
import { FundPrereq } from '../../../definitions/Prerequisites/FundPrereq'
import { ehf } from '../ehf'

export const globalImpactVisa: Transition = {
    id: 'new_zealand_global_impact_visa',
    regionId: 'new_zealand',
    acquireBy: 'application',
    name: {
        en: 'Global Impact Visa',
        zh_hans: '全球影响力签证',
    },
    from: alien,
    to: globalImpactVisaHolder,
    prerequisiteList: allOf([
        identity([
            {
                prereqId: 'fund',
                type: 'admission',
                schemes: [
                    {
                        fund: null,
                        condition: {
                            source: ehf,
                        },
                    },
                ],
            } as FundPrereq,
        ]),
    ]),
    paperwork: {
        procedureList: [],
    },
    referenceList: [
        {
            url: 'https://www.immigration.govt.nz/new-zealand-visas/options/start-a-business-or-invest/i-want-to-invest-or-do-business-in-nz/the-global-impact-visa',
            title: {
                en: 'Official page',
                zh_hans: '官方页面',
            },
        },
    ],
}
