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
    visa186holder,
    visa457holder,
} from '../status'

const employerNominationGeneral: Transition = {
    id: "employer_nomination_general",
    acquireBy: "application",
    name: {
        en: "Employer Nomination Scheme (subclass 186)",
    },
    from: null,
    to: visa186holder,
    prerequisiteList: allOf([]),
    procedureList: [
        {
            name: {
                en: "Nomination by an approved Australian employer"
            }
        },
        {
            name: {
                en: "Apply"
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
            url: "http://www.border.gov.au/Trav/Visa-1/186-",
            title: {
                en: "Official Webpage"
            }
        }
    ]
}

const employerNominationTemporaryResidenceTransition: Transition =
    Object.assign(
        {}, 
        employerNominationGeneral,
        {
            id: "employer_nomination_temporary_residence_transition",
            name: {
                en: "Employer Nomination Scheme (subclass 186) - Temporary Residence Transition stream",
            },
            from: visa457holder
        }
    )

const employerNominationDirectEntry: Transition =
    Object.assign(
        {}, 
        employerNominationGeneral,
        {
            id: "employer_nomination_direct_entry",
            name: {
                en: "Employer Nomination Scheme (subclass 186) - Direct Entry stream",
            },
            from: alien
        }
    )

const employerNominationAgreement: Transition = 
    Object.assign(
        {}, 
        employerNominationGeneral,
        {
            id: "employer_nomination_agreement",
            name: {
                en: "Employer Nomination Scheme (subclass 186) - Agreement stream",
            },
            from: alien
        }
    )

export {
    employerNominationDirectEntry,
    employerNominationTemporaryResidenceTransition,
    employerNominationAgreement,
}