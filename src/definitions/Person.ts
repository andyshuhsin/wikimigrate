import { RegionId } from './auxiliary/Region'

import { BirthQuality } from './Qualities/Birth'
import { LanguageTestResult } from './auxiliary/LanguageTest'
import { EducationQuality } from './Qualities/EducationExperience'
import { WorkExperienceQuality } from './Qualities/WorkExperience'
import { RightId } from './Prerequisites/RightPrereq'

export type StatusSet = {
    [key in RegionId]: RightId[]
}

export interface Person {
    status: StatusSet,
    birth: BirthQuality
    spouse?: Person | null
    education?: EducationQuality[],
    languageTests?: LanguageTestResult[]
    workExperiences?: WorkExperienceQuality[]
}

export function getInitialStatus(origin?: RegionId): StatusSet {
    const initial: StatusSet = {
        world: ['alien'],
        canada: ['alien'],
        australia: ['alien'],
        canada_atlantic_provinces: ['alien'],
        new_zealand: ['alien'],
        uk: ['alien'],
        ireland: ['alien'],
        usa: ['alien'],
        utopia: ['alien'],
    }

    if (origin) {
        initial[origin] = ['citizen']
        return initial
    }
    else {
        return initial
    }
}

export function getInitialPerson(age: number): Person {
    return {
        birth: {
            date: {
                year: new Date().getFullYear() - age,
            },
            region: undefined,
        },
        status: getInitialStatus(),
        education: undefined,
        languageTests: undefined,
        spouse: undefined,

    }
}

export default Person
