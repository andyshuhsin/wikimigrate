import {Region} from "../../definitions/auxillary/Region"

import {
    citizenship,
    pr,
    alien
} from "./status"

const new_zealand: Region = {
    id: "new_zealand",
    name: {
        en: "New Zealand",
    },
    statusList: [
        citizenship,
        pr,
        alien
    ],
    transitionList: [
    ],
    referenceList: [
        {
            url: "http://www.australia.gov.au/information-and-services/immigration-and-visas",
            title: {
                en: "Immigration and Visas"
            }
        }
    ],
}

export default new_zealand
