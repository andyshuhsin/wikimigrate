import {RegionId} from "./auxillary/Region"

import {BirthQuality} from "./Qualities/Birth"
import {LanguageTestResult} from "./auxillary/LanguageTest"
import {EducationQuality} from "./Qualities/EducationExperience"
import {WorkExperienceQuality} from "./Qualities/WorkExperience"

export interface Person {
    status: {
        [key in RegionId]: string[]
    },
    birth: BirthQuality
    education?: EducationQuality[],
    languageTests?: LanguageTestResult[]
    workExperiences?: WorkExperienceQuality[]
}

export default Person
