import { 
    CountryData,
    Status,
    Transition,
    allOf,
    oneOf,
    ns,
    money,
    Combination,
    LanguageBenchamrkPrereq,
    WorkExperiencePrereq,
    EducationPrereq,
    FundPrereq,
    offerPrereq,
    rightPrereq,
 } from './common'

// Status

const citizenship: Status = {
    id: "citizen",
    name: {
        en: "Citizenship"
    },
    rights: [
        "work"
    ]
}

const pr: Status = {
    id: "permanent",
    name: {
        en: "Permanent Residence"
    },
    rights: [
        "work"
    ]
}

const touristVisaExempted: Status = {
    id: "tourist_visa_exempted",
    name: {
        en: "Visa Exemption"
    },
    rights: [
        "visit"
    ],
    duration: {
        "month": 6
    }
}

const expressEntryCandidate: Status = {
    id: "express_entry_candidate",
    name: {
        en: "Express Entry Candidate"
    },
    rights: [],
}

const alien: Status = {
    id: "alien",
    name: {
        en: "Alien"
    },
    rights: [],
}

// Transitions

const visaExemption: Transition = {
    id: "visa_exemption",
    name: {
        en: "Canada Visa Exemption",
    },
    acquireBy: "application",
    from: [
        ns("usa", "citizen"),
        ns("usa", "permanent"),
        ns("eu", "citizen"),
        ns("taiwan", "citizen"),
    ],
    to: ns("canada", "tourist_visa_exempted"),
    prerequisiteList: allOf([
        {
            id: "eta"
        }
    ]),
    procedureList: [
        {
            name: {
                en: "Apply at Border",
            }
        }
    ],
    exceptionList: [
        {
            // Bulgarians and Romanians need visa despite being EU citizens
            appliedTo: [
                ns("bulgaria", "citizen"),
                ns("romania", "citizen"),
            ],
            effects: [
                {
                    property: 'DQ',
                    value: null,
                }
            ]
        },
        {
            // US citizens don't need eTA
            appliedTo: [
                ns("usa", "citizen")
            ],
            effects: [
                {
                    property: 'prerequisiteList',  // FIXME: Could break on key rename
                    value: []
                }
            ]
        }
    ],
    referenceList: [
        {
            url: "http://www.cic.gc.ca/english/visit/visas.asp",
            title: {
                en: "Find out if you need an Electronic Travel Authorization (eTA) or a visitor visa"
            }
        }
    ]
}

// Express Entry programms

const expressEntry: Transition = {
    id: "express_entry",
    acquireBy: "invitation",
    name: {
        en: "Express Entry",
        'zh-hans': "快速移民通道——Express Entry(EE)"
    },
    from: ns("canada", "express_entry_candidate"),
    to: ns("canada", "permanent"),
    prerequisiteList: oneOf([

    ]),
    procedureList: [
        {
            name: {
                en: "Application",
                "zh-hans": "填表申请",
            }
        }
    ],
    referenceList: [
        {
            url: "http://www.cic.gc.ca/english/express-entry/",
            title: {
                en: "Official Website"
            }
        }
    ]
}

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
            jobType: {
                description: {
                    en: "at skill type 0, or skill levels A or B"
                }
            }
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
                } as offerPrereq,
            ])
        ])
    ]),
    procedureList: [

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

const quebecSkilled: Transition = {
    id: "quebec_selected_skilled_workds",
    acquireBy: "application",
    name: {
        en: "Quebec-selected Skilled Workers"
    },
    prerequisiteList: allOf([]),
    from: {countryId: "canada", statusId: "alien"},
    to: {countryId: "canada", statusId: "permanent"},
    procedureList: [
        {
            "name": {
                "en": "Apply to Quebec government"
            }
        },
        {
            "name": {
                "en": "Apply to CIC"
            }
        }
    ],
    referenceList: [
        {
            url: "http://www.cic.gc.ca/english/immigrate/quebec/index.asp",
            title: {
                en: "Official Website"
            }
        }
    ]
}

const startupVisa: Transition = {
    id: "startup_visa",
    acquireBy: "application",
    name: {
        "en": "Startup Visa",
        "zh-hans": "创业签证",
        "zh-hant": "創業簽證"
    },
    from: {countryId: "canada", statusId: "alien"},
    to: {countryId: "canada", statusId: "permanent"},
    prerequisiteList: allOf([
    ]),
    procedureList: [
        {
            name: {
                en: "Apply"
            }
        }
    ]
}

const iivc: Transition = {
    id: "iivc",
    name: {
        en: "Immigrant Investor Venture Capital Pilot Program"
    },
    acquireBy: "application",
    stage: {
        description: {
            en: "closed"
        }
    },
    prerequisiteList: allOf([]),
    procedureList: [],
    from: ns("canada", "alien"),
    to: ns("canada", "permanent")
}

const selfEmployedVisa: Transition = {
    id: "self_employed",
    acquireBy: "application",
    name: {
        en: "Self Employed"
    },
    from: ns("canada", "alien"),
    to: ns("canada", "permanent"),
    prerequisiteList: oneOf([
        allOf([
            {
                description: {
                    en: "Have relevant experience in cultural activities or athletics",
                }
            },
            {
                description: {
                    en: "Intend and be able to make a significant contribution to the cultural or athletic life of Canada"
                }
            }
        ]),
        allOf([
            {
                description: {
                    en: "Have experience in farm management"
                }
            },
            {
                description: {
                    en: "Intend and be able to buy and manage a farm in Canada"
                }
            }
        ])
    ]),
    procedureList: [],
}

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

const provinceNomineeProgram: Transition = {
    id: "provincial_nominees",
    acquireBy: "application",
    name: {
        en: "Provincial Nominee Program"
    },
    procedureList: [
        {
            name: {
                en: "Apply to a province or territory for a nomination"
            }
        },
        {
            name: {
                en: "Apply to CIC to become a permanent resident"
            }
        }
    ],
    referenceList: {
        en: {
            Homepage: "http://www.cic.gc.ca/english/immigrate/provincial/index.asp"
        }
    }
}

// Atlantic Immigrant Programs

const atlanticJobOfferCommon = allOf([
    {
        description: {
            en: "from a designated employer in an Atlantic province (New Brunswick, Newfoundland and Labrador, Nova Scotia, or Prince Edward Island)"
        }
    },
    {
        description: {
            en: "full-time"
        }
    },
    {
        description: {
            en: "non-seasonal"
        }
    },
    {
        description: {
            en: "reviewed by the province (details on the endorsement process will be available in early March 2017)"
        }
    }
])

const atlanticWorkersJob = allOf([
    {
        description: {
            en: "You must have worked at least one year (1,560 hours total or 30 hours per week) within the last three years.",
        }
    },
    {
        description: {
            en: "The work must be in one occupation (but can be with different employers) and paid (volunteering or unpaid internships do not count)"
        }
    }
])

const atlanticWorkersEducation = oneOf([
    {
        description: {
            en: "a Canadian secondary (high school) or post-secondary certificate, diploma or degree"
        }
    },
    {
        description: {
            en: "a foreign degree, diploma, certificate, or trade or apprenticeship education credential. You need an Educational Credential Assessment (ECA) report to make sure it is valid and equal to a Canadian credential"
        }
    }
])

const atlanticHighSkilledWorker: Transition = {
    id: "atlantic_high_skilled",
    acquireBy: "application",
    name: {
        en: "Atlantic High-Skilled Program"
    },
    from: ns("canada", "alien"),
    to: ns("canada", "permanent"),
    prerequisiteList: allOf([
        atlanticJobOfferCommon,
        atlanticWorkersJob,
        {
            description: {
                en: "Have work experience at NOC skill type/level 0 A or B.",
            }
        },
        {
            description: {
                en: "Have a job offer that is"
            }
        },
    ]),
    procedureList: [
        {
            name: {
                en: "Application"
            }
        }
    ]
}

const atlanticIntermediateSkilledWorker: Transition = {
    id: "atlantic_intermediate_skilled",
    acquireBy: "application",
    from: ns("canada", "alien"),
    to: ns("canada", "permanent"),
    name: {
        en: "Atlantic Intermediate-Skilled Program"
    },
    prerequisiteList: allOf([
        atlanticJobOfferCommon,
        atlanticWorkersJob,
        {
            description: {
                en: "Have work experience at NOC skill type/level C",  // TODO: Double check level
            }
        },
        {
            description: {
                en: "Have a job offer that is",
            }
        }
    ]),
    procedureList: [
        {
            "name": {
                "en": "Application"
            }
        }
    ]
}

const atlanticInternationalGraduate: Transition = {
    id: "atlantic_international_graduate",
    acquireBy: "application",
    from: ns("canada", "alien"),
    to: ns("canada", "permanent"),
    name: {
        en: "Atlantic International Graduate Program"
    },
    prerequisiteList: allOf([
        {
            description: {
                en: "a minimum 2 year degree, diploma, certificate, or trade or apprenticeship credential from a recognized publicly-funded institution in an Atlantic province",
            }
        },
        {
            description: {
                en: "been a full-time student in Canada for at least two years",
            }
        },
        {
            description: {
                en: "graduated in the last 12 months when you apply",
            }
        },
        {
            description: {
                en: "lived in one of the Atlantic provinces for at least 16 months in the last 2 years before you graduated",
            }
        },
        {
            description: {
                en: "had the visa or permit needed to work, study or train in Canada"
            }
        }
    ]),
    procedureList: [
        {
            "name": {
                "en": "Application"
            }
        }
    ]
}

const canada: CountryData =
        {
            id: "canada",
            statusList: [ 
                citizenship,
                pr,
                touristVisaExempted,
                alien,
            ],
            transitionList: [
                visaExemption,
                expressEntry,
                federalSkilledWorker,
                quebecSkilled,
                startupVisa,
                iivc,
                selfEmployedVisa,
                atlanticHighSkilledWorker,
                atlanticInternationalGraduate,
            ],
            referenceList: [
                {
                    url: "http://www.cic.gc.ca/english/immigrate/apply.asp",
                    title: {
                        en: "Apply to immigrate to Canada",
                        fr: "Présenter une demande d’immigration au Canada"
                    }
                }
            ]
        }

export default canada

//TODO: Include admissibility http://www.cic.gc.ca/english/information/inadmissibility/index.asp