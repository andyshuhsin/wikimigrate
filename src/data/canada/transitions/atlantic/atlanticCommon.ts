import {
    allOf,
    oneOf,
} from '../../../common'

const atlanticJobOfferCommon = allOf([
    {
        description: {
            en: "from a designated employer in an Atlantic province (New Brunswick, Newfoundland and Labrador, Nova Scotia, or Prince Edward Island)"
        }
    },
    {
        description: {
            en: "full-time"
        }
    },
    {
        description: {
            en: "non-seasonal"
        }
    },
    {
        description: {
            en: "reviewed by the province (details on the endorsement process will be available in early March 2017)"
        }
    }
])

const atlanticWorkersJob = allOf([
    {
        description: {
            en: "You must have worked at least one year (1,560 hours total or 30 hours per week) within the last three years.",
        }
    },
    {
        description: {
            en: "The work must be in one occupation (but can be with different employers) and paid (volunteering or unpaid internships do not count)"
        }
    }
])

const atlanticWorkersEducation = oneOf([
    {
        description: {
            en: "a Canadian secondary (high school) or post-secondary certificate, diploma or degree"
        }
    },
    {
        description: {
            en: "a foreign degree, diploma, certificate, or trade or apprenticeship education credential. You need an Educational Credential Assessment (ECA) report to make sure it is valid and equal to a Canadian credential"
        }
    }
])

export {
    atlanticJobOfferCommon,
    atlanticWorkersJob,
    atlanticWorkersEducation,
}