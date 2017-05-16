import {RegionId} from "./auxiliary/Region"

import {BirthQuality} from "./Qualities/Birth"
import {LanguageTestResult} from "./auxiliary/LanguageTest"
import {EducationQuality} from "./Qualities/EducationExperience"
import {WorkExperienceQuality} from "./Qualities/WorkExperience"

export interface Person {
    status: {
        [key in RegionId]: string[]
    },
    birth: BirthQuality
    inUnion?: boolean
    spouse?: Person
    education?: EducationQuality[],
    languageTests?: LanguageTestResult[]
    workExperiences?: WorkExperienceQuality[]
}

export function getInitialPerson(age: number): Person {
    return {
        birth: {
            date: {
                year: new Date().getFullYear() - age
            },
            region: undefined,
        },
        status: {
            // TODO: Should this part be automated?
            world: ["alien"],
            canada: ["alien"],
            australia: ["alien"],
            canada_atlantic_provinces: ["alien"],
            new_zealand: ["alien"],
        },
        education: undefined,
        languageTests: undefined,
        inUnion: undefined,
        spouse: undefined,

    }
}

export default Person
