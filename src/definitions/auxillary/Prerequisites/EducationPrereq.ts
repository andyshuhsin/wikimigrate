import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../MultiLang'

export interface EducationPrereq extends BasePrereq {
    property: "education"
    stage: "primary" | "secondary" | "post-secondary"
    regionId: string | undefined
    description: MultiLangStringSet
    certification?: "eca"  //TODO: Elaborate on Educational Credential Assessment
}

export default EducationPrereq