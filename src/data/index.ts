import canada from './canada'
import australia from './australia'
import app from './app'
import common from './common'
import {Region, RegionId} from "../definitions/auxillary/Region"
import new_zealand from "./new_zealand/index"
import {eca} from "./canada/certifications"

const regions = [
    canada,
    australia,
    new_zealand,
]

function getRegionById(targetId: RegionId | null, regionList = regions): Region | null {
    for (let region of regionList) {
        if (region.id === targetId) {
            return region
        }
    }
    return null
}

export const certifications = {
    eca: eca
}

export const data = {
    app,
    regions,
    getRegionById,
    common,
    certifications,
}

export default data
