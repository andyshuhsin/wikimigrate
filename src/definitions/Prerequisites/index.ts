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
import UnionPrereq from "./UnionPrereq"
import SpousePrereq from "./SpousePrereq"
import NominationPrereq from "./NominationPrereq"

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
    | UnionPrereq
    | SpousePrereq
    | NominationPrereq

export function isPrerequisite(arg: any): boolean {
    return !!arg["prereqId"]
}

export default Prerequisite
