import {
    Transition,
    ns,
    oneOf,
    allOf,
} from '../../common'

const familySponsorship: Transition = {
    id: "family_sponsorship",
    acquireBy: "application",
    name: {
        en: "Family Sponsorship"
    },
    from: ns("canada", "alien"),
    to: ns("canada", "permanent"),
    prerequisiteList: oneOf([
        allOf([
            {
                description: {
                    en: "You are under 18"
                },
            },
            {
                description: {
                    en: "You are orphaned"
                }
            },
            {
                description: {
                    en: "You do not have a spouse common law partner or conjugal partner"
                }
            }
        ]),
        allOf([
            {
                description: {
                    en: "You are related by blood of adoption of a Canadian citizen or permanent residnet aged 18 or older"
                }
            }
        ])
    ]),
    procedureList: [
        {
            "name": {
                "en": "Application"
            }
        }
    ]
}

export default familySponsorship