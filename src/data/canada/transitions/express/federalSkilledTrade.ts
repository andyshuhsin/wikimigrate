import {
    Transition,
    ns,
    allOf,
    oneOf,
    LanguageBenchamrkPrereq,
    WorkExperiencePrereq,
    OfferPrereq,
    CertificationPrereq,
} from '../../../common'

const federalSkilledTrade: Transition = {
    id: "federal_skilled_trade",
    acquireBy: "application",
    name: {
        en: "Federal Skilled Trade Program",
        "zh-hans": "联邦技工移民(Federal Skilled Trade Program, FSTP)"
    },
    from: ns("canada", "alien"),
    to: ns("canada", "express_entry_candidate"),
    prerequisiteList: [

        // Language Requirements
        allOf([
            oneOf([
                {
                    property: "language_test",
                    benchmark: "clb",
                    requirements: [
                        {speaking: 5},
                        {listening: 5},
                        {reading: 4},
                        {writing: 4},
                    ]
                } as LanguageBenchamrkPrereq,
                {
                    property: "language_test",
                    benchmark: "nclc",
                    requirements: [
                        {speaking: 5},
                        {listening: 5},
                        {reading: 4},
                        {writing: 4},
                    ]
                } as LanguageBenchamrkPrereq
            ]),
        ]),

        // Work experience
        {
            property: "work_experience",
            length: {
                year: 2
            },
            withinLast: {
                year: 5
            },
            workHoursPerWeek: {hour: 30},
            jobTypes: oneOf([
                {
                    description: {
                        en: "Major Group 72, industrial, electrical and construction trades"
                    }
                },
                {
                    description: {
                        en: "Major Group 73, maintenance and equipment operation trades"
                    }
                },
                {
                    description: {
                        en: "Major Group 82, supervisors and technical jobs in natural resources, agriculture and related production"
                    }
                },
                {
                    description: {
                        en: "Major Group 92, processing, manufacturing and utilities supervisors and central control operators"
                    }
                },
                {
                    description: {
                        en: "Minor Group 632, chefs and cooks"
                    }
                },
                {
                    description: {
                        en: "Minor Group 633, butchers and bakers"
                    }
                },
            ])
        } as WorkExperiencePrereq,

        oneOf([
            {
                property: "offer",
                employer: {
                    regionId: "canada"
                },
            } as OfferPrereq,
            {
                property: "certification",
                description: {
                    en: "a certificate of qualification in that skilled trade issued by a Canadian provincial or territorial authority"
                }
            } as CertificationPrereq
        ])

    ],

    procedureList: [

    ]
}

export default federalSkilledTrade