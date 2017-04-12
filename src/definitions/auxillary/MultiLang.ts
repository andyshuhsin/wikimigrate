export type LangId =
    "en"
    | "zh-hans"
    | "zh-hant"
    | "fr"

export type MultiLangStringSet = {
    [lang in LangId]?: string
}
