import { CountryData } from '../common'

import {
    citizenship,
    pr,
    alien
} from './status'

const australia: CountryData = {
    id: "australia",
    statusList: [
        citizenship,
        pr,
        alien
    ],
    referenceList: [
        {
            url: "http://www.australia.gov.au/information-and-services/immigration-and-visas",
            title: {
                en: "Immigration and Visas"
            }
        }
    ]
}

export default australia