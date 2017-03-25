import { Region } from "../../definitions"

import {
    citizenship,
    pr,
    alien
} from "./status"

import skilledIndependent from "./transitions/skillSelect/skilledIndependent"
import skilledNominated from "./transitions/skillSelect/skilledNominated"
import skilledRegional from "./transitions/skillSelect/skilledRegional"
import businessInnovation from './transitions/businessInnovation'
import {
    employerNominationDirectEntry,
    employerNominationTemporaryResidenceTransition,
    employerNominationAgreement,
} from './transitions/employerNomination'
import temporaryWorkSkilled from './transitions/temporaryWorkSkilled'
import businessTalent from './transitions/skillSelect/businessTalent'

const australia: Region = {
    id: "australia",
    name: {
        en: "Australia"
    },
    statusList: [
        citizenship,
        pr,
        alien
    ],
    transitionList: [
        skilledIndependent,
        skilledNominated,
        skilledRegional,
        businessTalent,

        employerNominationDirectEntry,
        employerNominationTemporaryResidenceTransition,
        employerNominationAgreement,

        temporaryWorkSkilled,
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
