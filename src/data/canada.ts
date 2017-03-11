import { 
    CountryData,
    Status,
    Transition,
    allOf,
    oneOf,
    ns,
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
}

const expressEntry: Transition = {
    id: "express_entry",
    acquireBy: "application",
    name: {
        en: "Canada Express Entry"
    },
    from: ns("canada", "alien"),
    to: ns("canada", "permanent"),
    prerequisiteList: allOf([]),
    procedureList: [
        {
            name: {
                en: "Application",
                "zh-hans": "申请",
                "zh-hant": "申請"
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
        comment: {
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
                comment: {
                    en: "Have relevant experience in cultural activities or athletics",
                }
            },
            {
                comment: {
                    en: "Intend and be able to make a significant contribution to the cultural or athletic life of Canada"
                }
            }
        ]),
        allOf([
            {
                comment: {
                    en: "Have experience in farm management"
                }
            },
            {
                comment: {
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
                comment: {
                    en: "You are under 18"
                },
            },
            {
                comment: {
                    en: "You are orphaned"
                }
            },
            {
                comment: {
                    en: "You do not have a spouse common law partner or conjugal partner"
                }
            }
        ]),
        allOf([
            {
                comment: {
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

const provinceNomineeProgram = {
    id: "provincial_nominees",
    acquireBy: "by_application",
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
    references: {
        en: {
            Homepage: "http://www.cic.gc.ca/english/immigrate/provincial/index.asp"
        }
    }
}

// Atlantic Immigrant Programs

const atlanticJobOfferCommon = allOf([
    {
        comment: {
            en: "from a designated employer in an Atlantic province (New Brunswick, Newfoundland and Labrador, Nova Scotia, or Prince Edward Island)"
        }
    },
    {
        comment: {
            en: "full-time"
        }
    },
    {
        comment: {
            en: "non-seasonal"
        }
    },
    {
        comment: {
            en: "reviewed by the province (details on the endorsement process will be available in early March 2017)"
        }
    }
])

const atlanticWorkersJob = allOf([
    {
        comment: {
            en: "You must have worked at least one year (1,560 hours total or 30 hours per week) within the last three years.",
        }
    },
    {
        comment: {
            en: "The work must be in one occupation (but can be with different employers) and paid (volunteering or unpaid internships do not count)"
        }
    }
])

const atlanticWorkersEducation = oneOf([
    {
        comment: {
            en: "a Canadian secondary (high school) or post-secondary certificate, diploma or degree"
        }
    },
    {
        comment: {
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
            comment: {
                en: "Have work experience at NOC skill type/level 0 A or B.",
            }
        },
        {
            comment: {
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
            comment: {
                en: "Have work experience at NOC skill type/level C",  // TODO: Double check level
            }
        },
        {
            comment: {
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
            comment: {
                en: "a minimum 2 year degree, diploma, certificate, or trade or apprenticeship credential from a recognized publicly-funded institution in an Atlantic province",
            }
        },
        {
            comment: {
                en: "been a full-time student in Canada for at least two years",
            }
        },
        {
            comment: {
                en: "graduated in the last 12 months when you apply",
            }
        },
        {
            comment: {
                en: "lived in one of the Atlantic provinces for at least 16 months in the last 2 years before you graduated",
            }
        },
        {
            comment: {
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
                quebecSkilled,
                startupVisa,
                iivc,
                selfEmployedVisa,
                atlanticHighSkilledWorker,
                atlanticInternationalGraduate,
            ]
        }

export default canada