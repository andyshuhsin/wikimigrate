import Transition from "../../../definitions/Transition";
import {allOf, identity} from "../../../definitions/auxiliary/Combination";
import {OfferPrereq} from "../../../definitions/Prerequisites/OfferPrereq";
import {WorkExperiencePrereq} from "../../../definitions/Prerequisites/WorkExperiencePrereq";

import {
    alien,
    visa457holder,
} from '../status'

import jobClass from '../jobClass'

const temporaryWorkSkilled: Transition = {
    id: "temporary_work_skilled",
    regionId: "australia",
    acquireBy: "application",
    name: {
        en: "Temporary Work (Skilled) visa (subclass 457)",
    },
    from: alien,
    to: visa457holder,
    prerequisiteList: allOf([
        {
            prereqId: "offer",
            employer: {
                regionId: "australia",
                status: "approved"
            }
        } as OfferPrereq,
        {
            prereqId: "work_experience",
            jobNature: identity([jobClass.jobGroups.sol])
        } as WorkExperiencePrereq
    ]),
    procedureList: [
        {
            name: {
                en: "Nominated by a state or territory government or Australian agency"
            }
        },
        {
            name: {
                en: "Submit Expression of Interest"
            }
        },
        {
            name: {
                en: "Wait"
            }
        }
    ],
    referenceList: [
        {
            url: "http://www.border.gov.au/Trav/Visa-1/457-",
            title: {
                en: "Official page",
                zh_hans: "官方页面",
            }
        }
    ]
}

export default temporaryWorkSkilled
