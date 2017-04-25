import {LangId, MultiLangStringSet} from "../../definitions/auxillary/MultiLang"
import {store} from "../main"

const fallbackLangList: LangId[] = ["en", "fr", "zh_hans"]

export function text(
    s: MultiLangStringSet | string | null | undefined,
    lang: LangId = store.getState().ui.lang,
    fallbackLangs = fallbackLangList): string {
       if (s === null || typeof s === "undefined") {
           return ''
       }
       else if (typeof s === "string") {
           console.warn("Getting raw without multilang support:", s)
           return s
       }
       else {
           const translation = s[lang]
           if (translation) {
               return translation
           }
           else {
               for (let lang of fallbackLangs) {
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

export default text
