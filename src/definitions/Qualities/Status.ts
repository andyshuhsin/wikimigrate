import { Duration } from '../auxiliary/Duration'
import { MultiLangStringSet } from '../auxiliary/MultiLang'

interface Status {
    id: string
    regionId: string
    name: MultiLangStringSet
    rights: string[]
    duration?: Duration
}

export default Status
