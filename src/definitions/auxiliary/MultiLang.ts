export type LangId =
    "en"
    | "zh_hans"
    | "zh_hant"
    | "fr"

export type MultiLangStringSet = {
    [lang in LangId]?: string
}
