import {
    alien,
    expressEntryCandidate
} from '../../status'

import jobClass from '../../jobClass'
import Transition from "../../../../definitions/Transition";
import {allOf, oneOf} from "../../../../definitions/auxillary/Combination";
import {duration} from "../../../../definitions/auxillary/Duration";
import {WorkExperiencePrereq} from "../../../../definitions/Prerequisites/WorkExperiencePrereq";
import {languagePrereq} from "../../../../definitions/Prerequisites/LanguagePrereq";

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
                {
                    prereqId: "work_experience",
                    length: duration(12, "month"),
                    withinLast: duration(3, "year"),
                    workHoursPerWeek: duration(30, "hour"),
                    regionId: 'canada',
                    jobNature: oneOf([
                        jobClass.jobGroups.noc0,
                        jobClass.jobGroups.nocA,
                    ])
                } as WorkExperiencePrereq,

                oneOf([
                    languagePrereq("clb", { score: 7 }),
                    languagePrereq("nclc", { score: 7 }),
                ]),
            ]),

            //NOC B job
            allOf([
                {
                    prereqId: "work_experience",
                    length: duration(12, "month"),
                    withinLast: duration(3, "year"),
                    workHoursPerWeek: duration(30, "hour"),
                    regionId: 'canada',
                    jobNature: oneOf([
                        jobClass.jobGroups.nocB
                    ])
                } as WorkExperiencePrereq,

                oneOf([
                    languagePrereq("clb", { score: 5 }),
                    languagePrereq("nclc", { score: 5 }),
                ]),
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
}

export default canadianExperience
