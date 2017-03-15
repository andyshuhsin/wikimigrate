import {
    Transition,
    duration,
    allOf,
    oneOf,
    LanguageBenchamrkPrereq,
    WorkExperiencePrereq,
    OfferPrereq,
    CertificationPrereq,
} from '../../../common'

import {
    alien,
    expressEntryCandidate
} from '../../status'

const federalSkilledTrade: Transition = {
    id: "federal_skilled_trade",
    acquireBy: "application",
    name: {
        en: "Federal Skilled Trade Program",
        "zh-hans": "联邦技工移民(Federal Skilled Trade Program, FSTP)"
    },
    from: alien,
    to: expressEntryCandidate,
    prerequisiteList: allOf([

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
            length: duration(2, "year"),
            withinLast: duration(5, "year"),
            workHoursPerWeek: duration(30, "hour"),
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

    ]),

    procedureList: [
        {
            name: {
                en: "Check eligiblility",
                "zh-hans": "确认有权申请"
            },
            description: {
                en: "Go to http://www.cic.gc.ca/ctc-vac/ee-start.asp and check your eligibility",
                "zh-hans": "访问http://www.cic.gc.ca/ctc-vac/ee-start.asp，确认您有权申请"
            }
        },
        {
            name: {
                en: "Create Express Entry Profile",
                "zh-hans": "设立Express Entry档案"
            },
        },
        {
            name: {
                en: "Wait for invitation",
                "zh-hans": "等待邀请"
            }
        }
    ]
}

export default federalSkilledTrade