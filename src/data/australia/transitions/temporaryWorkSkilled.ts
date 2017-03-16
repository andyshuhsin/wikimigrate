import {
    Transition,
    AgePrereq,
    duration,
    oneOf,
    allOf,
    OfferPrereq,
    WorkExperiencePrereq
} from '../../common'

import {
    alien,
    visa457holder,
} from '../status'

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
            jobType: "required"
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
            url: "http://www.border.gov.au/Trav/Visa-1/188-",
            title: {
                en: "Official Webpage"
            }
        }
    ]
}

export default temporaryWorkSkilled