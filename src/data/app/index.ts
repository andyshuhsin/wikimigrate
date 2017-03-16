import {
    MultiLang
} from "../common"

const lang = "en"

const brandName: MultiLang<string> = {
    en: "The Good Move",
    "zh-hans": "跑得快"
}

const version: string = "0.0.1"

const app = {
    lang,
    brandName,
    version,
}

export default app