import {LanguageTestProfile} from "../../definitions/auxillary/LanguageTest"

const languageTestProfiles: LanguageTestProfile[] = [
    {
        id: "clb",
        title: {
            en: "Canadian Language Benchmark"
        },
        reference: {
            url: "http://www.language.ca/index.cfm?Repertoire_No=2137991327",
        },
    },
    {
        id: "nclc",
        title: {
            fr: "Niveaux de compétence linguistique canadiens"
        },
        reference: {
            url: "http://www.language.ca/index.cfm?Repertoire_No=2137991326",
        },
    },
    {
        id: "ielts",
        title: {
            en: "International English Language Testing System"
        },
        reference: {
            url: "https://www.ielts.org/",
        }
    },
    {
        id: "toefl",
        title: {
            en: "Test of English as a Foreign Language"
        },
        reference: {
            url: "https://www.ets.org/toefl",
        },
    },
    {
        id: "pte-academic",
        title: {
            en: "Pearson Test of English"
        },
        reference: {
            url: "http://pearsonpte.com/",
        },
    },
    {
        id: "cae",
        title: {
            en: "Cambridge English: Advanced"
        },
        reference: {
            url: "http://www.cambridgeenglish.org/exams/advanced/",
        },
    },
    {
        id: "oet",
        title: {
            en: " Occupational English Test"
        },
        reference: {
            url: "https://www.occupationalenglishtest.org/",
        }
    }
]

export default languageTestProfiles
