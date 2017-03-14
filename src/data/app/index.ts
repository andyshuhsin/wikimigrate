import {
    MultiLang
} from "../common"

const lang = "zh-hans"

const brandName: MultiLang<string> = {
    en: "Move Easy",
    "zh-hans": "跑得快"
}

const app = {
    lang,
    brandName
}

export default app