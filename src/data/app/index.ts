import {LangId, MultiLangStringSet} from "../../definitions/auxillary/MultiLang"

const lang: LangId = "en"

const brandName: MultiLangStringSet = {
    en: "The Good Move",
    zh_hans: "跑得快"
}

const version: string = "0.61"

const app = {
    lang,
    brandName,
    version,
}

export default app
