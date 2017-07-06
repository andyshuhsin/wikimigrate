import { RegionId } from '../auxiliary/Region'
import { SafeDate } from '../auxiliary/SafeDate'

export interface BirthQuality {
    // Cannot be Date because it cannot be safely saved in JSON
    date: SafeDate
    region?: RegionId
}

export default BirthQuality
