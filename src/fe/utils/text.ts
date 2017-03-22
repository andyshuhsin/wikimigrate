import { MultiLangStringSet } from '../../definitions'
import { app } from '../../data'

const fallbackLangList = ["en", "fr"]

function text(s: MultiLangStringSet,
           lang: string = app.lang,
           fallbackLangs = fallbackLangList): string {
       if (s[lang]) {
           return s[lang]
       } else {
           for (let lang of fallbackLangs) {
               if (s[lang]) {
                   return s[lang]
               }
           }
       }

        // Last resort
        const fallbackLang = Object.keys(s)[0]
        if (s[fallbackLang]) {
            return s[fallbackLang]
        } else {
            console.warn("Can not turn into text:", s)
            return ''
        }
}

export default text
