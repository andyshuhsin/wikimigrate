import {LangId, MultiLangStringSet} from "../../definitions/auxillary/MultiLang"

const lang: LangId = "en"

const brandName: MultiLangStringSet = {
    en: "The Good Move",
    "zh-hans": "跑得快"
}

const version: string = "0.4"

const app = {
    lang,
    brandName,
    version,
}

export default app
