import {
    Transition,
    ns,
    money,
    allOf,
    oneOf,
    LanguageBenchamrkPrereq,
    WorkExperiencePrereq,
    EducationPrereq,
    FundPrereq,
    rightPrereq,
    OfferPrereq,
} from '../../../common'

const federalSkilledWorker: Transition = {
    id: "federal_skilled_worker",
    acquireBy: "application",
    name: {
        en: "Federal Skilled Worker Program",
        "zh-hans": "联邦技术移民(Federal Skilled Worker Program, FSW)"
    },
    from: ns("canada", "alien"),
    to: ns("canada", "express_entry_candidate"),
    prerequisiteList: allOf([

        // Language Requirement
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

        // Working Experience
        {
            property: "work_experience",
            length: { year: 1 },
            withinLast: { year: 10 },
            workHoursPerWeek: { hour: 30 },
            jobTypes: oneOf([{
                description: {
                    en: "at skill type 0, or skill levels A or B"
                }
            }]),
        } as WorkExperiencePrereq,

        // Education
        oneOf([

            // Canadian
            {
                property: "education",
                stage: "secondary",
                regionId: 'canada'
            } as EducationPrereq,
            {
                property: "education",
                stage: "post-secondary",
                regionId: 'canada'
            } as EducationPrereq,

            // Foreign, need Educational Credential Assessment
            {
                property: "education",
                stage: "secondary",
                regionId: undefined,
                certification: "eca"
            } as EducationPrereq,
            {
                property: "education",
                stage: "post-secondary",
                regionId: undefined,
                certification: "eca"
            } as EducationPrereq,
        ]),

        // Fund
        oneOf([
            {
                property: "fund",
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
                    property: "right",
                    regionId: "canada",
                    rightId: "work"
                } as rightPrereq,
                {
                    property: "offer",
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