import { LangId } from '../../definitions/auxiliary/MultiLang'
import { currentLang } from './text'

const DEFAULT_LANG: LangId = 'en'

export type InflectionOption = {
    language: LangId,
    number: number,
}


function inflect(
    term: string,
    options: Partial<InflectionOption>,
): string {
    let lang: LangId
    if (options.language) {
        lang = options.language
    }
    else if (currentLang) {
        lang = currentLang
    }
    else {
        lang = DEFAULT_LANG
    }

    switch (lang) {
        case 'en': {
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
