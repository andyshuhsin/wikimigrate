import {LangId} from "../../definitions/auxillary/MultiLang"
import {store} from "../web/main"

const DEFAULT_LANG: LangId = "en"

export type InflectionOption = {
    language: LangId,
    number: number,
}


function inflect(
    term: string,
    options: Partial<InflectionOption>
) {
    let lang: LangId
    if (options.language) {
        lang = options.language
    }
    else if (store) {
        lang = store.getState().ui.lang
    }
    else {
        return DEFAULT_LANG
    }

    switch (lang) {
        case "en": {
            let result = term
            if (options.number && options.number >= 2) {
                result += 's'
            }
            return result
        }
        default: {
            return term
        }
    }

}

export default inflect
