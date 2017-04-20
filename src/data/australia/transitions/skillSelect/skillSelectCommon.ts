import {oneOf} from "../../../../definitions/auxillary/Combination"
import {RightPrereq} from "../../../../definitions/Prerequisites/RightPrereq"
import {languagePrereqMinScore} from "../../../../definitions/Prerequisites/LanguagePrereq"
import {duration} from "../../../../definitions/auxillary/Duration"
import AgePrereq from "../../../../definitions/Prerequisites/AgePrereq"

// English requirements; see http://www.border.gov.au/Lega/Lega/Form/Immi-FAQs/how-can-i-prove-i-have-competent-english

export const competentEnglish =  oneOf([
    // Assumed native speaker
    oneOf([
        {
            prereqId: "right",
            regionId: "uk",
            rightId: "citizen"
        } as RightPrereq,
        {
            prereqId: "right",
            regionId: "usa",
            rightId: "citizen"
        } as RightPrereq,
        {
            prereqId: "right",
            regionId: "canada",
            rightId: "citizen"
        } as RightPrereq,
        {
            prereqId: "right",
            regionId: "new_zealand",
            rightId: "citizen"
        } as RightPrereq,
        {
            prereqId: "right",
            regionId: "new_zealand",
            rightId: "ireland"
        } as RightPrereq,
    ]),

    languagePrereqMinScore("ielts", {
        listening: 6,
        reading: 6,
        writing: 6,
        speaking: 6,
    }),
    // TODO: Implement string-based scoring
    // languagePrereqMinScore("oet", { overall: "b" }),
    languagePrereqMinScore("toefl", {
        listening: 12,
        reading: 12,
        writing: 21,
        speaking: 18,
    }),
    languagePrereqMinScore("pte-academic", {
        listening: 50,
        reading: 50,
        writing: 50,
        speaking: 50,
    }),
    languagePrereqMinScore("cae", {
        listening: 169,
        reading: 169,
        writing: 169,
        speaking: 169,
    }),
])

export const below50 = {
            prereqId: "age",
            operator: "<",
            value: duration(50, "year"),
} as AgePrereq
