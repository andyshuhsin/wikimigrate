import {LangId, MultiLangStringSet} from "../../definitions/auxillary/MultiLang"

let currentLang: LangId = "en"

const fallbackLangList: LangId[] = ["en", "fr", "zh_hans"]

export function text(s?: MultiLangStringSet | string | null, langArg = currentLang): string {

       if (s === null || typeof s === "undefined") {
           return ''
       }
       else if (typeof s === "string") {
           console.warn("Getting raw without multilang support:", s)
           return s
       }
       else {
           const translation = s[langArg]
           if (translation) {
               return translation
           }
           else {
               for (let lang of fallbackLangList) {
                   let translation = s[lang]
                   if (translation) {
                       return translation
                   }
                }
           }
       }
       console.warn("Cannot convert to text: ", s)
       return ''
}

export function setTextLang(langArg: LangId) {
    currentLang = langArg
}

export default text
