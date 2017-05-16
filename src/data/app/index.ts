import {LangId, MultiLangStringSet} from "../../definitions/auxillary/MultiLang"

const lang: LangId = "en"

const brandName: MultiLangStringSet = {
    en: "WikiMigrate",
    zh_hans: "维基迁徙"
}

const version: string = "0.8"

const app = {
    lang,
    brandName,
    version,
}

export default app
