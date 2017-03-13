import {
    LanguageBenchamrkPrereq,
    oneOf,
    rightPrereq,
    AgePrereq,
    duration,
} from '../../../common'

// English requirements; see http://www.border.gov.au/Lega/Lega/Form/Immi-FAQs/how-can-i-prove-i-have-competent-english

export const competentEnglish =  oneOf([
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

export const below50 = {
            property: "age",
            operator: "<",
            value: duration(50, "year"),
} as AgePrereq