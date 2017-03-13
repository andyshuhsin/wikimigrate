import {
    Transition,
    WorkExperiencePrereq,
    AgePrereq,
    duration,
    oneOf,
    allOf,
    LanguageBenchamrkPrereq,
    rightPrereq,
} from '../../common'

import {
    alien,
    visa189holder,
} from '../status'

const skilledIndependent: Transition = {
    id: "skilled_independent",
    acquireBy: "application",
    name: {
        en: "Skilled Independent visa (subclass 189)",
        "zh-hans": "独立技术移民(189)"
    },
    from: alien,
    to: visa189holder,
    prerequisiteList: [
        {
            property: "work_experience",
            jobTypes: allOf([
                {
                    description: {
                        en: "Skilled Occupation List"
                    }
                }
            ])
        } as WorkExperiencePrereq,
        {
            property: "age",
            operator: "<",
            value: duration(50, "year"),
        } as AgePrereq,

        // English requirements; see http://www.border.gov.au/Lega/Lega/Form/Immi-FAQs/how-can-i-prove-i-have-competent-english
        oneOf([

            // Assumed native speaker
            oneOf([
                {
                    property: "right",
                    regionId: "uk",
                    rightId: "citizen"
                } as rightPrereq,
                {
                    property: "right",
                    regionId: "usa",
                    rightId: "citizen"
                } as rightPrereq,
                {
                    property: "right",
                    regionId: "canada",
                    rightId: "citizen"
                } as rightPrereq,
                {
                    property: "right",
                    regionId: "new_zealand",
                    rightId: "citizen"
                } as rightPrereq,
                {
                    property: "right",
                    regionId: "new_zealand",
                    rightId: "ireland"
                } as rightPrereq,
            ]),

            {
                property: "language_test",
                benchmark: "ielts",
                requirements: [
                    {
                        value: 6
                    }
                ]

            } as LanguageBenchamrkPrereq,

            {
                property: "language_test",
                benchmark: "oet",
                requirements: [
                    {
                        value: 'b'
                    }
                ]
            } as LanguageBenchamrkPrereq,

            {
                property: "language_test",
                benchmark: "toefl",
                requirements: [
                    { listening: 12 },
                    { reading: 12 },
                    { writing: 21 },
                    { speaking: 18 },
                ]
            } as LanguageBenchamrkPrereq,

            {
                property: "language_test",
                benchmark: "pte-academic",
                requirements: [
                    { listening: 50 },
                    { reading: 50 },
                    { writing: 50 },
                    { speaking: 50 },
                ]
            } as LanguageBenchamrkPrereq,

            {
                property: "language_test",
                benchmark: "cae",
                requirements: [
                    { listening: 169 },
                    { reading: 169 },
                    { writing: 169 },
                    { speaking: 169 },
                ]
            } as LanguageBenchamrkPrereq,

        ])
    ],
    procedureList: [
        {
            name: {
                en: "Obtain a suitable skills assessment for that occupation"
            }
        },
        {
            name: {
                en: "Submit Expression of Interest"
            }
        },
        {
            name: {
                en: "Wait"
            }
        }
    ],
    referenceList: [
        {
            url: "https://www.border.gov.au/Trav/Visa-1/189-",
            title: {
                en: "Official Webpage"
            }
        }
    ]
}

export default skilledIndependent