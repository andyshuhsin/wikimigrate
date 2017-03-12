import {
    Transition,
    ns,
    allOf,
    oneOf,
    WorkExperiencePrereq,
    LanguageBenchamrkPrereq,
} from '../../../common'

const canadianExperience: Transition = {
    id: "canadian_experience",
    acquireBy: "application",
    name: {
        en: "Canadian Experience Class",
        "zh-hans": "加拿大经验移民"
    },
    from: ns("canada", "alien"),
    to: ns("canada", "express_entry_candidate"),
    prerequisiteList: allOf([

        // Language
        oneOf([

            // NOC 0 or A job
            allOf([
                {
                    property: "work_experience",
                    length: {month: 12},
                    withinLast: {year: 3},
                    workHoursPerWeek: {hours: 30},
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
                    length: {month: 12},
                    withinLast: {year: 3},
                    workHoursPerWeek: {hours: 30},
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
                "zh-hans": "Á°ÆËÆ§ÊúâÊùÉÁî≥ËØ∑"
            },
            description: {
                en: "Go to http://www.cic.gc.ca/ctc-vac/ee-start.asp and check your eligibility",
                "zh-hans": "ËÆøÈóÆhttp://www.cic.gc.ca/ctc-vac/ee-start.aspÔºåÁ°ÆËÆ§ÊÇ®ÊúâÊùÉÁî≥ËØ∑"
            }
        },
        {
            name: {
                en: "Create Express Entry Profile",
                "zh-hans": "ËÆæÁ´ãExpress EntryÊ°£Ê°à"
            },
        },
        {
            name: {
                en: "Wait for invitation",
                "zh-hans": "Á≠âÂæÖÈÇÄËØ∑"
            }
        }
    ],
}

export default canadianExperience