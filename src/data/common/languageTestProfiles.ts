import { LanguageTestProfile } from '../../definitions/auxiliary/LanguageTest'

const languageTestProfiles: LanguageTestProfile[] = [
    {
        id: 'clb',
        title: {
            en: 'Canadian Language Benchmark',
            fr: 'Niveaux de compétence linguistique canadiens',
            zh_hans: '加拿大语言标准',
        },
        languages: ['en', 'fr'],
        equivalency: {
            /** @see http://www.cic.gc.ca/english/resources/tools/language/charts.asp */
            ielts: {
                reading: [
                    [8.0, 10],
                    [7.0, 9],
                    [6.5, 8],
                    [6.0, 7],
                    [5.0, 6],
                    [4.0, 5],
                    [3.5, 4],
                ],
                writing: [
                    [7.5, 10],
                    [7.0, 9],
                    [6.5, 8],
                    [6.0, 7],
                    [5.5, 6],
                    [5.0, 5],
                    [4.0, 4],
                ],
                listening: [
                    [8.5, 10],
                    [8.0, 9],
                    [7.5, 8],
                    [6.0, 7],
                    [5.5, 6],
                    [5.0, 5],
                    [4.5, 4],
                ],
                speaking: [
                    [7.5, 10],
                    [7.0, 9],
                    [6.5, 8],
                    [6.0, 7],
                    [5.5, 6],
                    [5.0, 5],
                    [4.0, 4],
                ]
            },
        },
        reference: {
            url: 'http://www.language.ca/index.cfm?Repertoire_No=2137991327',
        },
    },
    {
        id: 'ielts',
        title: {
            en: 'International English Language Testing System',
        },
        languages: ['en'],
        reference: {
            url: 'https://www.ielts.org/',
        },
    },
    {
        id: 'toefl',
        title: {
            en: 'Test of English as a Foreign Language',
        },
        languages: ['en'],
        reference: {
            url: 'https://www.ets.org/toefl',
        },
    },
    {
        id: 'pte-academic',
        title: {
            en: 'Pearson Test of English',
        },
        languages: ['en'],
        reference: {
            url: 'http://pearsonpte.com/',
        },
    },
    {
        id: 'cae',
        title: {
            en: 'Cambridge English: Advanced',
        },
        languages: ['en'],
        reference: {
            url: 'http://www.cambridgeenglish.org/exams/advanced/',
        },
    },
    {
        id: 'oet',
        title: {
            en: ' Occupational English Test',
        },
        languages: ['en'],
        reference: {
            url: 'https://www.occupationalenglishtest.org/',
        },
    },
]

export default languageTestProfiles
