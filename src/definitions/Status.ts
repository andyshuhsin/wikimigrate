import { Duration } from './auxillary/Duration'
import { MultiLangStringSet } from './auxillary/MultiLang'

interface Status {
    id: string
    regionId: string
    name: MultiLangStringSet
    rights: string[]
    duration?: Duration
}

export default Status
