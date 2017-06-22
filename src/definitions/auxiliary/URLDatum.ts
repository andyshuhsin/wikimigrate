import { MultiLangStringSet } from './MultiLang'

// Really just URL, but the name `URL` seems pre-defined
export type URI = string

interface URLDatum {
    title?: MultiLangStringSet
    url: URI
}

export default URLDatum
