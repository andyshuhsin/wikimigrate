import {
    Transition,
    AgePrereq,
    duration,
    oneOf,
    allOf,
    OfferPrereq,
    WorkExperiencePrereq
} from '../../../definitions'

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
            property: "offer",
            employer: {
                regionId: "australia",
                status: "approved"
            }
        } as OfferPrereq,
        {
            property: "work_experience",
            jobNature: jobClass.jobGroups.sol
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
                en: "Official Webpage"
            }
        }
    ]
}

export default temporaryWorkSkilled
