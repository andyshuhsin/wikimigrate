import app from './app'
import common from './common'
import { Region, RegionId } from '../definitions/auxiliary/Region'
import { eca } from './canada/certifications'

import canada from './canada'
import australia from './australia'
import new_zealand from './new_zealand'
import ireland from './ireland'
import usa from './usa'
import uk from './uk'

const regions = [
    canada,
    australia,
    new_zealand,
    uk,
    ireland,
    usa,
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
    eca: eca,
}

const allTransitions = regions.map((region: Region) => region.transitionList).reduce(
    (prev, nextArray) => prev.concat(nextArray),
    [],
)

export const data = {
    app,
    regions,
    allTransitions,
    getRegionById,
    common,
    certifications,
}

export default data
