import {
    alien,
    expressEntryCandidate
} from '../../status'

import jobClass from '../../jobClass'
import Transition from "../../../../definitions/Transition";
import {allOf, identity, oneOf} from "../../../../definitions/auxillary/Combination"
import {duration} from "../../../../definitions/auxillary/Duration";
import {WorkExperiencePrereq} from "../../../../definitions/Prerequisites/WorkExperiencePrereq";
import {languagePrereqMinScore} from "../../../../definitions/Prerequisites/LanguagePrereq";
import {prereqTitleDict} from "../../../common/prereqTitleDict"

const canadianExperience: Transition = {
    id: "canadian_experience",
    regionId: "canada",
    acquireBy: "application",
    name: {
        en: "Canadian Experience Class",
        "zh-hans": "加拿大经验移民"
    },
    from: alien,
    to: expressEntryCandidate,
    prerequisiteList: allOf([

        // Language
        oneOf([

            // NOC 0 or A job
            allOf([
                identity([
                    languagePrereqMinScore("clb", {
                        listening: 7,
                        speaking: 7,
                        reading: 7,
                        writing: 7,
                    }),
                ]),

                {
                    prereqId: "work_experience",
                    length: [">=", duration(12, "month")],
                    withinLast: duration(3, "year"),
                    workHoursPerWeek: duration(30, "hour"),
                    region: 'canada',
                    jobNature: oneOf([
                        jobClass.jobGroups.noc0,
                        jobClass.jobGroups.nocA,
                    ])
                } as WorkExperiencePrereq,
            ], {
                title: {
                    en: "For NOC-0 & NOC-A Applicants"
                }
            }),

            //NOC B job
            allOf([
                identity([
                    languagePrereqMinScore("clb", {
                        listening: 7,
                        speaking: 7,
                        reading: 7,
                        writing: 7,
                    }),
                ]),

                {
                    prereqId: "work_experience",
                    length: [">=", duration(12, "month")],
                    withinLast: duration(3, "year"),
                    workHoursPerWeek: duration(30, "hour"),
                    region: 'canada',
                    jobNature: oneOf([
                        jobClass.jobGroups.nocB
                    ])
                } as WorkExperiencePrereq,
            ], {
                title: {
                    en: "For NOC-0 & NOC-A Applicants"
                }
            }),
        ], {
            title: prereqTitleDict.language_test
        })
    ]),
    procedureList: [
        {
            name: {
                en: "Check eligibility",
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
}

export default canadianExperience
