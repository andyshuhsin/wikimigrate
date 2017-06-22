import { LangId, MultiLangStringSet } from '../../definitions/auxiliary/MultiLang'
import { Duration, durationUnitProfiles } from '../../definitions/auxiliary/Duration'
import inflect from './inflect'

export let currentLang: LangId = 'en'

const fallbackLangList: LangId[] = ['en', 'fr', 'zh_hans']

export function text(s?: MultiLangStringSet | string | null, langArg = currentLang): string {

    if (s === null || typeof s === 'undefined') {
        return ''
    }
    else if (typeof s === 'string') {
        console.warn('Getting raw without multilang support:', s)
        return s
    }
    else {
        const translation = s[langArg]
        if (typeof translation === 'string') {
            return translation
        }
        else {
            for (let lang of fallbackLangList) {
                let translation = s[lang]
                if (typeof translation === 'string') {
                    return translation
                }
            }
        }
    }
    console.warn('Cannot convert to text: ', s)
    return ''
}

export function textDuration(duration: Duration): string {
    const value = duration.value
    const unit = inflect(text(durationUnitProfiles[duration.unit].name.normal), {
        number: value,
        language: currentLang,
    })
    return `${value} ${unit}`
}

export function setTextLang(langArg: LangId) {
    currentLang = langArg
}

export default text
