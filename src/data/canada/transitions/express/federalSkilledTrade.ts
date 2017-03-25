import {
    Transition,
    duration,
    allOf,
    oneOf,
    LanguagePrereq,
    languagePrereq,
    WorkExperiencePrereq,
    OfferPrereq,
    CertificationPrereq,
} from '../../../../definitions'

import {
    alien,
    expressEntryCandidate
} from '../../status'

import jobClass from '../../jobClass'

const federalSkilledTrade: Transition = {
    id: "federal_skilled_trade",
    regionId: "canada",
    acquireBy: "application",
    name: {
        en: "Federal Skilled Trade Program",
        "zh-hans": "联邦技工移民(Federal Skilled Trade Program, FSTP)"
    },
    from: alien,
    to: expressEntryCandidate,
    prerequisiteList: allOf([

        // Language Requirements
        oneOf([
            languagePrereq("clb", {
                speaking: 5,
                listening: 5,
                reading: 4,
                writing: 4,
            }),
            languagePrereq("nclc", {
                speaking: 5,
                listening: 5,
                reading: 4,
                writing: 4,
            }),
        ]),

        // Work experience
        allOf([
            {
                property: "work_experience",
                length: duration(2, "year"),
                withinLast: duration(5, "year"),
                workHoursPerWeek: duration(30, "hour"),
                jobNature: oneOf([
                    jobClass.jobGroups.noc72,
                    jobClass.jobGroups.noc73,
                    jobClass.jobGroups.noc82,
                    jobClass.jobGroups.noc92,
                    jobClass.jobGroups.noc632,
                    jobClass.jobGroups.noc633,
                ])
            } as WorkExperiencePrereq
        ]),

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
