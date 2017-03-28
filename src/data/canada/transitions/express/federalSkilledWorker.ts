import {
    alien,
    expressEntryCandidate
} from '../../status'

import jobClass from '../../jobClass'
import Transition from "../../../../definitions/Transition";
import {allOf, oneOf} from "../../../../definitions/auxillary/Combination";
import {languagePrereq} from "../../../../definitions/Prerequisites/LanguagePrereq";
import {duration} from "../../../../definitions/auxillary/Duration";
import {WorkExperiencePrereq} from "../../../../definitions/Prerequisites/WorkExperiencePrereq";
import {EducationPrereq} from "../../../../definitions/Prerequisites/EducationPrereq";
import {money} from "../../../../definitions/auxillary/Money";
import {FundPrereq} from "../../../../definitions/Prerequisites/FundPrereq";
import {RightPrereq} from "../../../../definitions/Prerequisites/RightPrereq";
import {OfferPrereq} from "../../../../definitions/Prerequisites/OfferPrereq";

const federalSkilledWorker: Transition = {
    id: "federal_skilled_worker",
    regionId: "canada",
    acquireBy: "application",
    name: {
        en: "Federal Skilled Worker Program",
        "zh-hans": "联邦技术移民(Federal Skilled Worker Program, FSW)"
    },
    from: alien,
    to: expressEntryCandidate,
    prerequisiteList: allOf([

        // Language Requirement
        oneOf([
            languagePrereq("clb", {score: 7}),
            languagePrereq("nclc", {score: 7}),
        ]),

        // Working Experience
        oneOf([
            {
                prereqId: "work_experience",
                length: duration(1, "year"),
                withinLast: duration(10, "year"),
                workHoursPerWeek: duration(30, "hour"),
                jobNature: oneOf([
                    jobClass.jobGroups.noc0,
                    jobClass.jobGroups.nocA,
                    jobClass.jobGroups.nocB,
                ]),
            } as WorkExperiencePrereq
        ]),

        // Education
        oneOf([

            // Canadian
            {
                prereqId: "education",
                education: {
                    stage: "secondary",
                    regionId: "canada"
                }
            } as EducationPrereq,

            {
                prereqId: "education",
                education: {
                    stage: "post-secondary",
                    regionId: "canada"
                }
            } as EducationPrereq,

            // Foreign, need Educational Credential Assessment
            {
                prereqId: "education",
                education: {
                    regionId: "world",
                    stage: "secondary",
                },
                certification: "eca"
            } as EducationPrereq,
            {
                prereqId: "education",
                education: {
                    regionId: "world",
                    stage: "post-secondary",
                },
                certification: "eca"
            } as EducationPrereq,
        ]),

        // Fund
        oneOf([
            {
                prereqId: "fund",
                type: "possess",
                schemes: [
                    { 
                        condition: { familyMember: 1 },
                        fund: money(12300, "cad")
                    },
                    { 
                        condition: { familyMember: 2 },
                        fund: money(15312, "cad")
                    },
                    { 
                        condition: { familyMember: 3 },
                        fund: money(18825, "cad")
                    },
                    { 
                        condition: { familyMember: 4 },
                        fund: money(22856, "cad")
                    },
                    { 
                        condition: { familyMember: 5 },
                        fund: money(25923, "cad")
                    },
                    { 
                        condition: { familyMember: 6 },
                        fund: money(29236, "cad")
                    },
                    { 
                        condition: { familyMember: 7 },
                        fund: money(32550, "cad")
                    },
                ]
            } as FundPrereq,

            // You don't need to prove fund if you can already work in Canada and has an offer
            allOf([
                {
                    prereqId: "right",
                    regionId: "canada",
                    rightId: "work"
                } as RightPrereq,
                {
                    prereqId: "offer",
                    employer: {
                        regionId: "canada"
                    }
                } as OfferPrereq,
            ])
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
    ],
    referenceList: [
        {
            url: "http://www.cic.gc.ca/english/immigrate/skilled/apply-who.asp",
            title: {
                en: "Determine your eligibility – Federal skilled workers"
            }
        }
    ]
}

export default federalSkilledWorker
