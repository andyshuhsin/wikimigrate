import {
    Transition,
    allOf,
    oneOf,
    WorkExperiencePrereq,
    LanguageBenchamrkPrereq,
    duration,
} from '../../../common'

import {
    alien,
    expressEntryCandidate
} from '../../status'

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
                    property: "work_experience",
                    length: duration(12, "month"),
                    withinLast: duration(3, "year"),
                    workHoursPerWeek: duration(30, "hour"),
                    regionId: 'canada',
                    jobTypes: oneOf([
                        {
                            description: {
                                en: "Managerial jobs (NOC skill level 0)"
                            }
                        },
                        {
                            description: {
                                en: "Professional jobs (NOC skill type A)"
                            }
                        },
                    ])
                } as WorkExperiencePrereq,

                oneOf([
                    {
                        property: "language_test",
                        benchmark: "clb",
                        requirements: [
                            {value: 7}
                        ]
                    } as LanguageBenchamrkPrereq,
                    {
                        property: "language_test",
                        benchmark: "nclc",
                        requirements: [
                            {value: 7}
                        ]
                    } as LanguageBenchamrkPrereq
                ]),
            ]),

            //NOC B job
            allOf([
                {
                    property: "work_experience",
                    length: duration(12, "month"),
                    withinLast: duration(3, "year"),
                    workHoursPerWeek: duration(30, "hour"),
                    regionId: 'canada',
                    jobTypes: oneOf([
                        {
                            description: {
                                en: "Technical jobs and skilled trades (NOC skill type B)"
                            }
                        }
                    ])
                } as WorkExperiencePrereq,

                oneOf([
                    {
                        property: "language_test",
                        benchmark: "clb",
                        requirements: [
                            {value: 5}
                        ]
                    } as LanguageBenchamrkPrereq,
                    {
                        property: "language_test",
                        benchmark: "nclc",
                        requirements: [
                            {value: 5}
                        ]
                    } as LanguageBenchamrkPrereq
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