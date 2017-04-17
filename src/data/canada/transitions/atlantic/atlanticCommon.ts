import {allOf, oneOf} from "../../../../definitions/auxillary/Combination";
import {OfferPrereq} from "../../../../definitions/Prerequisites/OfferPrereq";
import {WorkExperiencePrereq} from "../../../../definitions/Prerequisites/WorkExperiencePrereq";
import {EducationPrereq} from "../../../../definitions/Prerequisites/EducationPrereq";

const atlanticJobOfferCommon = allOf([
    {
        prereqId: "offer",
        employer: {
            regionId: "canada-atlantic-provinces"  // TODO: Implement this properly
        },
        fulltime: true,
        seasonal: false,
        descrption: {
            en: "reviewed by the province (details on the endorsement process will be available in early March 2017)"
        }
    } as OfferPrereq
])

const atlanticWorkersJob = allOf([
    {
        prereqId: "work_experience",
        jobNature: {
            en: "You must have worked at least one year (1,560 hours total or 30 hours per week) within the last three years.",
        }
    } as WorkExperiencePrereq,
    {
        prereqId: "work_experience",
        jobNature: {
            en: "The work must be in one occupation (but can be with different employers) and paid (volunteering or unpaid internships do not count)"
        }
    } as WorkExperiencePrereq,
])

const atlanticWorkersEducation = oneOf([
    {
        prereqId: "education",
        stage: [">=", "secondary"],
        region: "canada",
    } as EducationPrereq,
    {
        prereqId: "education",
        stage: [">=", "secondary"],
        region: "world",
        certification: "eca"
    } as EducationPrereq,
])

export {
    atlanticJobOfferCommon,
    atlanticWorkersJob,
    atlanticWorkersEducation,
}
