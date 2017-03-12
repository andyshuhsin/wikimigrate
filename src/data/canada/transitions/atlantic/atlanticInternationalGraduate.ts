import {
    Transition,
    ns,
    allOf,
} from '../../../common'

const atlanticInternationalGraduate: Transition = {
    id: "atlantic_international_graduate",
    acquireBy: "application",
    from: ns("canada", "alien"),
    to: ns("canada", "permanent"),
    name: {
        en: "Atlantic International Graduate Program"
    },
    prerequisiteList: allOf([
        {
            description: {
                en: "a minimum 2 year degree, diploma, certificate, or trade or apprenticeship credential from a recognized publicly-funded institution in an Atlantic province",
            }
        },
        {
            description: {
                en: "been a full-time student in Canada for at least two years",
            }
        },
        {
            description: {
                en: "graduated in the last 12 months when you apply",
            }
        },
        {
            description: {
                en: "lived in one of the Atlantic provinces for at least 16 months in the last 2 years before you graduated",
            }
        },
        {
            description: {
                en: "had the visa or permit needed to work, study or train in Canada"
            }
        }
    ]),
    procedureList: [
        {
            "name": {
                "en": "Application"
            }
        }
    ]
}

export default atlanticInternationalGraduate