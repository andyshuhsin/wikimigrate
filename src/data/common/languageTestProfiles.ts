import {LanguageTestProfile} from "../../definitions/auxiliary/LanguageTest"

const languageTestProfiles: LanguageTestProfile[] = [
    {
        id: "clb",
        title: {
            en: "Canadian Language Benchmark",
            fr: "Niveaux de compétence linguistique canadiens",
            zh_hans: "加拿大语言标准",
        },
        languages: ["en", "fr"],
        reference: {
            url: "http://www.language.ca/index.cfm?Repertoire_No=2137991327",
        },
    },
    {
        id: "ielts",
        title: {
            en: "International English Language Testing System"
        },
        languages: ["en"],
        reference: {
            url: "https://www.ielts.org/",
        }
    },
    {
        id: "toefl",
        title: {
            en: "Test of English as a Foreign Language"
        },
        languages: ["en"],
        reference: {
            url: "https://www.ets.org/toefl",
        },
    },
    {
        id: "pte-academic",
        title: {
            en: "Pearson Test of English"
        },
        languages: ["en"],
        reference: {
            url: "http://pearsonpte.com/",
        },
    },
    {
        id: "cae",
        title: {
            en: "Cambridge English: Advanced"
        },
        languages: ["en"],
        reference: {
            url: "http://www.cambridgeenglish.org/exams/advanced/",
        },
    },
    {
        id: "oet",
        title: {
            en: " Occupational English Test"
        },
        languages: ["en"],
        reference: {
            url: "https://www.occupationalenglishtest.org/",
        }
    }
]

export default languageTestProfiles
