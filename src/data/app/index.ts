import {LangId, MultiLangStringSet} from "../../definitions/auxillary/MultiLang"

const lang: LangId = "en"

const brandName: MultiLangStringSet = {
    en: "The Good Move",
    zh_hans: "The Good Move"
}

const version: string = "0.7"

const app = {
    lang,
    brandName,
    version,
}

export default app
