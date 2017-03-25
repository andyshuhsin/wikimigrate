import {
    languagePrereq,
    oneOf,
    RightPrereq,
    AgePrereq,
    duration,
} from '../../../../definitions'

// English requirements; see http://www.border.gov.au/Lega/Lega/Form/Immi-FAQs/how-can-i-prove-i-have-competent-english

export const competentEnglish =  oneOf([
    // Assumed native speaker
    oneOf([
        {
            property: "right",
            regionId: "uk",
            rightId: "citizen"
        } as RightPrereq,
        {
            property: "right",
            regionId: "usa",
            rightId: "citizen"
        } as RightPrereq,
        {
            property: "right",
            regionId: "canada",
            rightId: "citizen"
        } as RightPrereq,
        {
            property: "right",
            regionId: "new_zealand",
            rightId: "citizen"
        } as RightPrereq,
        {
            property: "right",
            regionId: "new_zealand",
            rightId: "ireland"
        } as RightPrereq,
    ]),

    languagePrereq("ielts", { score: 6 }),
    languagePrereq("oet", { score: "b" }),
    languagePrereq("toefl", {
        listening: 12,
        reading: 12,
        writing: 21,
        speaking: 18,
    }),
    languagePrereq("pte-academic", {
        listening: 50,
        reading: 50,
        writing: 50,
        speaking: 50,
    }),
    languagePrereq("cae", {
        listening: 169,
        reading: 169,
        writing: 169,
        speaking: 169,
    }),
])

export const below50 = {
            property: "age",
            operator: "<",
            value: duration(50, "year"),
} as AgePrereq
