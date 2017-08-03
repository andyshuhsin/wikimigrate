import { Region } from '../../definitions/auxiliary/Region'

import { alien, citizenship, pr, touristVisaExempted } from './status'
// import visaExemption from './transitions/visaExemption'
import federalSkilledWorker from './transitions/express/federalSkilledWorker'
import federalSkilledTrade from './transitions/express/federalSkilledTrade'
import startupVisa from './transitions/startupVisa'

import noc2011 from './jobClass'
import { designatedAngelInvestors, designatedBusinessIncubators, designatedVentureCapitalFunds } from './fundSources'
import crs from './crs'

//TODO: Include admissibility http://www.cic.gc.ca/english/information/inadmissibility/index.asp

const canada: Region = {
    id: 'canada',
    name: {
        en: 'Canada',
        zh_hans: '加拿大',
    },
    statusList: [
        citizenship,
        pr,
        touristVisaExempted,
        alien,
    ],
    transitionList: [
        // visaExemption,
        federalSkilledWorker,
        federalSkilledTrade,
        // canadianExperience,
        // quebecSkilled,
        startupVisa,
        // iivc,
        // selfEmployedVisa,
        // atlanticHighSkilled,
        // atlanticIntermediateSkilled,
        // atlanticInternationalGraduate,
    ],
    referenceList: [
        {
            url: 'http://www.cic.gc.ca/english/immigrate/apply.asp',
            title: {
                en: 'Apply to immigrate to Canada',
                fr: 'Présenter une demande d’immigration au Canada',
            },
        },
    ],
    jobClassification: noc2011,
    fundSourceGroupList: [
        designatedVentureCapitalFunds,
        designatedAngelInvestors,
        designatedBusinessIncubators,
    ],
    scoreSystems: [
        crs,
    ],
}

export default canada
