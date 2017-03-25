import canada from './canada'
import australia from './australia'
import app from './app'
import common from './common'

import { Region, RegionId } from '../definitions'

const regions = [
    canada,
    australia,
]

function getRegionById(targetId: RegionId, regionList = regions): Region | null {
    for (let region of regionList) {
        if (region.id === targetId) {
            return region
        }
    }
    return null
}

const data = {
    app,
    regions,
    getRegionById,
    common,
}

export {
    app,
    regions,
    common,
}

export default data
