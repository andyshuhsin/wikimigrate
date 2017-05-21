import { Region } from '../../definitions/auxiliary/Region'

import { alien, citizenship, pr } from './status'

import skilledIndependent from './transitions/skillSelect/skilledIndependent'
import skilledNominated from './transitions/skillSelect/skilledNominated'
import skilledRegional from './transitions/skillSelect/skilledRegional'

import jobClass from './jobClass'

const australia: Region = {
    id: 'australia',
    name: {
        en: 'Australia',
        zh_hans: '澳大利亚',
    },
    statusList: [
        citizenship,
        pr,
        alien,
    ],
    transitionList: [
        skilledIndependent,
        skilledNominated,
        skilledRegional,
        // businessTalent,
        // businessInnovation,

        // employerNominationDirectEntry,
        // employerNominationTemporaryResidenceTransition,
        // employerNominationAgreement,

        // temporaryWorkSkilled,
    ],
    referenceList: [
        {
            url: 'http://www.australia.gov.au/information-and-services/immigration-and-visas',
            title: {
                en: 'Immigration and Visas',
            },
        },
    ],
    jobClassification: jobClass,
}

export default australia
