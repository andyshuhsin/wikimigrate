import {Region} from "../../definitions/auxillary/Region"

import {
    citizenship,
    pr,
    alien
} from "./status"
import {silverFern} from "./transitions/silverFern"

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
        silverFern,
    ],
    referenceList: [
        {
            url: "https://www.immigration.govt.nz/new-zealand-visas",
            title: {
                en: "New Zealand Visas",
                zh_hans: "新西兰签证"
            }
        }
    ],
}

export default new_zealand
