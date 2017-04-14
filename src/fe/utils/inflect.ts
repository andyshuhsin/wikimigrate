import {LangId} from "../../definitions/auxillary/MultiLang"

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
    else {
        lang = DEFAULT_LANG
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
