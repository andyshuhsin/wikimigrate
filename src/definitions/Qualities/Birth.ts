import {RegionId} from "../auxillary/Region"

export interface BirthQuality {
    // Cannot be Date because it cannot be safely saved in JSON
    date?: {
        year: number
        month?: number
        day?: number
    }
    region?: RegionId
}

export default BirthQuality
