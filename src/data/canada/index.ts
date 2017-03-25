import { Region } from '../../definitions'

import {
    citizenship,
    pr,
    touristVisaExempted,
    alien
} from './status'

// import visaExemption from './transitions/visaExemption'
import expressEntry from './transitions/express/expressEntry'
import federalSkilledWorker from './transitions/express/federalSkilledWorker'
import federalSkilledTrade from './transitions/express/federalSkilledTrade'
import canadianExperience from './transitions/express/canadianExperience'
import quebecSkilled from './transitions/quebecSkilled'
import startupVisa from './transitions/startupVisa'
import iivc from './transitions/iivc'
import selfEmployedVisa from './transitions/selfEmployedVisa'
import atlanticHighSkilled from './transitions/atlantic/atlanticHighSkilled'
import atlanticIntermediateSkilled from './transitions/atlantic/atlanticIntermediateSkilled'
import atlanticInternationalGraduate from './transitions/atlantic/atlanticInternationalGraduate'

//TODO: Include admissibility http://www.cic.gc.ca/english/information/inadmissibility/index.asp

const canada: Region =
        {
            id: "canada",
            statusList: [ 
                citizenship,
                pr,
                touristVisaExempted,
                alien,
            ],
            transitionList: [
                // visaExemption,
                // expressEntry,
                federalSkilledWorker,
                federalSkilledTrade,
                canadianExperience,
                // quebecSkilled,
                startupVisa,
                iivc,
                selfEmployedVisa,
                // atlanticHighSkilled,
                // atlanticIntermediateSkilled,
                // atlanticInternationalGraduate,
            ],
            referenceList: [
                {
                    url: "http://www.cic.gc.ca/english/immigrate/apply.asp",
                    title: {
                        en: "Apply to immigrate to Canada",
                        fr: "Présenter une demande d’immigration au Canada"
                    }
                }
            ]
        }

export default canada
