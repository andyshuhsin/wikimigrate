data.region.push({
  "import": [
    "common"
  ],
  "id": "canada",
  "definitions": {
    "atlantic_job_offer_common": [
      "from a designated employer in an Atlantic province (New Brunswick, Newfoundland and Labrador, Nova Scotia, or Prince Edward Island)",
      "AND",
      "full-time",
      "AND",
      "non-seasonal",
      "AND",
      "reviewed by the province (details on the endorsement process will be available in early March 2017)"
    ],
    "atlantic_workers_job": [
      "You must have worked at least one year (1,560 hours total or 30 hours per week) within the last three years.",
      "AND",
      "The work must be in one occupation (but can be with different employers) and paid (volunteering or unpaid internships do not count)"
    ],
    "atlantic_workers_education": [
      "a Canadian secondary (high school) or post-secondary certificate, diploma or degree",
      "OR",
      "a foreign degree, diploma, certificate, or trade or apprenticeship education credential. You need an Educational Credential Assessment (ECA) report to make sure it is valid and equal to a Canadian credential"
    ]
  },
  "status": [
    {
      "id": "citizen",
      "name": {
        "en": "Citizenship"
      },
      "rights": [
        "work"
      ]
    },
    {
      "id": "permanent",
      "name": {
        "en": "Permanent Residence"
      },
      "rights": [
        "work"
      ]
    },
    {
      "id": "tourist_visa_exempted",
      "name": {
        "en": "Visa Exemption"
      },
      "rights": [
        "visit"
      ],
      "duration": {
        "month": 6
      }
    },
    {
      "id": "alien",
      "name": {
        "en": "Alien"
      },
      "rights": []
    }
  ],
  "transitions": [
    {
      "id": "visa_exemption",
      "type": "by_application",
      "name": {
        "en": "Canada Visa Exemption"
      },
      "from": {
        "status": [
          "usa citizen",
          "hong_kong permanent",
          "eu citizen",
          "taiwan citizen"
        ]
      },
      "exception": [
        "bulgaria citizen",
        "romania citizen"
      ],
      "to": "canada tourist_visa_exempted",
      "prerequisites": {
        "value": [
          "eTA"
        ],
        "exception": "usa citizen"
      }
    },
    {
      "id": "express_entry",
      "type": "by_application",
      "name": {
        "en": "Canada Express Entry"
      },
      "from": "canada alien",
      "to": "canada permanent",
      "prerequisites": [],
      "steps": [
        {
          "name": {
            "en": "Application"
          }
        }
      ],
      "url": {
        "en": {
          "Official Website": "http://www.cic.gc.ca/english/express-entry/"
        }
      }
    },
    {
      "id": "quebec_selected_skilled_workds",
      "type": "by_application",
      "name": {
        "en": "Quebec-selected Skilled Workers"
      },
      "prerequisites": [],
      "from": "canada alien",
      "to": "canada permanent",
      "steps": [
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
      "url": {
        "en": {
          "Official Website": "http://www.cic.gc.ca/english/immigrate/quebec/index.asp"
        }
      }
    },
    {
      "id": "startup_visa",
      "type": "by_application",
      "name": {
        "en": "Startup Visa",
        "zh-hans": "创业签证",
        "zh-hant": "創業簽證"
      },
      "from": "canada alien",
      "to": "canada permanent",
      "prerequisites": [],
      "steps": [
        {
          "name": {
            "en": "Apply"
          }
        }
      ]
    },
    {
      "id": "iivc",
      "type": "by_application",
      "situation": "closed",
      "name": {
        "en": "Immigrant Investor Venture Capital Pilot Program"
      },
      "prerequisites": [],
      "from": "canada alien",
      "to": "canada permanent"
    },
    {
      "id": "self_employed",
      "type": "by_application",
      "name": {
        "en": "Self Employed"
      },
      "from": "canada alien",
      "to": "canada permanent",
      "prerequisites": [
        [
          "Have relevant experience in cultural activities or athletics",
          "AND",
          "Intend and be able to make a significant contribution to the cultural or athletic life of Canada"
        ],
        "OR",
        [
          "Have experience in farm management",
          "AND",
          "Intend and be able to buy and manage a farm in Canada"
        ]
      ]
    },
    {
      "id": "family_sponsorship",
      "type": "by_application",
      "name": {
        "en": "Family Sponsorship"
      },
      "from": "canada alien",
      "to": "canada permanent",
      "prerequisites": [
        [
          "You are under 18",
          "AND",
          "You are orphaned",
          "AND",
          "You do not have a spouse",
          "common law partner",
          "or conjugal partner"
        ],
        "OR",
        [
          "You are related by blood of adoption of a Canadian citizen or permanent residnet aged 18 or older"
        ]
      ],
      "steps": [
        {
          "name": {
            "en": "Application"
          }
        }
      ]
    },
    {
      "id": "provincial_nominees",
      "type": "by_application",
      "name": {
        "en": "Provincial Nominee Program"
      },
      "steps": [
        {
          "name": {
            "en": "Apply to a province or territory for a nomination"
          }
        },
        {
          "name": {
            "en": "Apply to CIC to become a permanent resident"
          }
        }
      ],
      "url": {
        "en": {
          "Homepage": "http://www.cic.gc.ca/english/immigrate/provincial/index.asp"
        }
      }
    },
    {
      "id": "atlantic_high_skilled",
      "type": "by_application",
      "name": {
        "en": "Atlantic High-Skilled Program"
      },
      "prerequisites": [
        {
          "def": "atlantic_workers_job"
        },
        "AND",
        "Have work experience at NOC skill type/level 0",
        "A",
        "or B.",
        "AND",
        "Have a job offer that is",
        {
          "def": "atlantic_job_offer_common"
        }
      ],
      "steps": [
        {
          "id": "application",
          "name": {
            "en": "Application"
          }
        }
      ]
    },
    {
      "id": "atlantic_intermediate_skilled",
      "type": "by_application",
      "name": {
        "en": "Atlantic Intermediate-Skilled Program"
      },
      "prerequisites": [
        {
          "def": "atlantic_workers_job"
        },
        "AND",
        "Have work experience at NOC skill type/level C",
        "AND",
        "Have a job offer that is",
        {
          "def": "atlantic_job_offer_common"
        }
      ],
      "steps": [
        {
          "name": {
            "en": "Application"
          }
        }
      ]
    },
    {
      "atlantic_international_graduate": null,
      "type": "by_application",
      "name": {
        "en": "Atlantic International Graduate Program"
      },
      "prerequisites": [
        "a minimum 2 year degree, diploma, certificate, or trade or apprenticeship credential from a recognized publicly-funded institution in an Atlantic province",
        "AND",
        "been a full-time student in Canada for at least two years",
        "AND",
        "graduated in the last 12 months when you apply",
        "AND",
        "lived in one of the Atlantic provinces for at least 16 months in the last 2 years before you graduated",
        "AND",
        "had the visa or permit needed to work, study or train in Canada"
      ],
      "steps": [
        {
          "name": {
            "en": "Application"
          }
        }
      ]
    }
  ]
})
