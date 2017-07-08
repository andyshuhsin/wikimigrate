import { LanguageTestItem } from '../../definitions/auxiliary/LanguageTest'
import { MultiLangStringSet } from '../../definitions/auxiliary/MultiLang'

type LanguageTestItemNames = {
    [key in LanguageTestItem]: MultiLangStringSet
}

const languageTestItemNames: LanguageTestItemNames = {
    listening: {
        en: 'Listening',
        zh_hans: '听力',
    },
    speaking: {
        en: 'Speaking',
        zh_hans: '口语',
    },
    writing: {
        en: 'Writing',
        zh_hans: '写作',
    },
    reading: {
        en: 'Reading',
        zh_hans: '阅读'
    },
}

export default languageTestItemNames
