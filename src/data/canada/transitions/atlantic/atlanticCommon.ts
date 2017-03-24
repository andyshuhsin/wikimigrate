import {
    allOf,
    oneOf,
    WorkExperiencePrereq,
    EducationPrereq,
    OfferPrereq,
} from '../../../../definitions'

const atlanticJobOfferCommon = allOf([
    {
        property: "offer",
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
        property: "work_experience",
        jobNature: {
            en: "You must have worked at least one year (1,560 hours total or 30 hours per week) within the last three years.",
        }
    } as WorkExperiencePrereq,
    {
        property: "work_experience",
        jobNature: {
            en: "The work must be in one occupation (but can be with different employers) and paid (volunteering or unpaid internships do not count)"
        }
    } as WorkExperiencePrereq,
])

const atlanticWorkersEducation = oneOf([
    {
        property: "education",
        stage: "secondary",
        regionId: "canada",
    } as EducationPrereq,
    {
        property: "education",
        stage: "post-secondary",
        regionId: "canada",
    } as EducationPrereq,
    {
        property: "education",
        stage: "secondary",
        regionId: undefined,
        certification: "eca"
    } as EducationPrereq,
])

export {
    atlanticJobOfferCommon,
    atlanticWorkersJob,
    atlanticWorkersEducation,
}
