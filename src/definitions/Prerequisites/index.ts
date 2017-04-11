import AgePrereq from './AgePrereq'
import LanguagePrereq from "./LanguagePrereq"
import WorkExperiencePrereq from './WorkExperiencePrereq'
import EducationPrereq from './EducationPrereq'
import FundPrereq from './FundPrereq'
import BusinessPrereq from './BusinessPrereq'
import OfferPrereq from './OfferPrereq'
import RightPrereq from './RightPrereq'
import CertificationPrereq from './CertificationPrereq'
import ResidencePrereq from './ResidencePrereq'

export type Prerequisite =
    AgePrereq
    | LanguagePrereq
    | WorkExperiencePrereq
    | EducationPrereq
    | FundPrereq
    | BusinessPrereq
    | OfferPrereq
    | RightPrereq
    | CertificationPrereq
    | ResidencePrereq

export function isPrerequisite(arg: any): boolean {
    return !!arg["prereqId"]
}

export default Prerequisite
