import BaseQuality from "./BaseQuality"
import {Duration} from "../auxillary/Duration"
import {RegionId} from "../auxillary/Region"

export interface AgeQuality extends BaseQuality {
    age: Duration
    region: RegionId
}

export default AgeQuality
