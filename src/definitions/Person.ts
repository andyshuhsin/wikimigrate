import {RegionId} from "./auxillary/Region"
import {EducationQuality} from "./Qualities/EducationQuality"

export interface Person {
    status: {
        [key in RegionId]: string[]
        },
    education: EducationQuality[] | undefined,
}

export default Person
