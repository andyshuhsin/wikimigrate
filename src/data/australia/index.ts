import { CountryData } from "../common"

import {
    citizenship,
    pr,
    alien
} from "./status"

import skilledIndependent from "./transitions/skilledIndependent"
import skilledNominated from "./transitions/skilledNominated"

const australia: CountryData = {
    id: "australia",
    statusList: [
        citizenship,
        pr,
        alien
    ],
    transitionList: [
        skilledIndependent,
        skilledNominated,
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