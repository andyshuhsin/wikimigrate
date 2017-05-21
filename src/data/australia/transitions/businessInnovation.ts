import Transition from '../../../definitions/Transition'
import { allOf } from '../../../definitions/auxiliary/Combination'
import { money } from '../../../definitions/auxiliary/Money'
import { FundPrereq } from '../../../definitions/Prerequisites/FundPrereq'
import { duration } from '../../../definitions/auxiliary/Duration'
import { BusinessPrereq } from '../../../definitions/Prerequisites/BusinessPrereq'

import { alien, visa188holder } from '../status'

const businessInnovation: Transition = {
    id: 'business_innovation',
    regionId: 'australia',
    acquireBy: 'application',
    name: {
        en: 'Business Innovation and Investment (Provisional) visa (subclass 188)',
        zh_hans: '商业移民(188)',
    },
    from: alien,
    to: visa188holder,
    prerequisiteList: allOf([

        // Significant Business History
        allOf([
            {
                prereqId: 'fund',
                type: 'possess',
                schemes: [
                    {
                        fund: money(1500000, 'aud'),
                    },
                ],
            } as FundPrereq,
            {
                prereqId: 'business',
                schemes: [
                    {
                        condition: {
                            turnover: money(3000000, 'aud'),
                            duration: duration(1, 'year'),
                        },
                    },
                ],
            } as BusinessPrereq,
        ]),

        // Venture Capital Entrepreneur
        {
            prereqId: 'fund',
            type: 'investee',
            schemes: [
                {
                    fund: money(1000000, 'aud'),
                },
            ],
        } as FundPrereq,

    ]),
    procedureList: [
        {
            name: {
                en: 'Nominated by a state or territory government or Australian agency',
            },
        },
        {
            name: {
                en: 'Submit Expression of Interest',
            },
        },
        {
            name: {
                en: 'Wait',
            },
        },
    ],
    referenceList: [
        {
            url: 'http://www.border.gov.au/Trav/Visa-1/188-',
            title: {
                en: 'Official Webpage',
            },
        },
    ],
}

export default businessInnovation
