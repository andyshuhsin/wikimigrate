import AgePrereq from './AgePrereq'
import LanguagePrereq, { languagePrereq } from './LanguagePrereq'
import WorkExperiencePrereq from './WorkExperiencePrereq'
import EducationPrereq from './EducationPrereq'
import FundPrereq from './FundPrereq'
import BusinessPrereq from './BusinessPrereq'
import OfferPrereq from './OfferPrereq'
import RightPrereq from './RightPrereq'
import CertificationPrereq from './CertificationPrereq'
import ResidencePrereq from './ResidencePrereq'

type Prerequisite =
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

export default Prerequisite
