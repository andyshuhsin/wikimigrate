import { PathwayDescriptor } from './definitions'
import { data } from '../../data'
import { text } from './text'
import { LangId } from '../../definitions/auxiliary/MultiLang'

export function getDocumentTitle(
    pathwayOnDisplay: PathwayDescriptor | null,
    lang: LangId,
): string {
    const brandName = text(data.app.brandName, lang)
    if (!pathwayOnDisplay) {
        return brandName
    }
    const transition = data.allTransitions.find(
        transition => transition.id === pathwayOnDisplay.transitionIds[0],
    )
    if (transition) {
        const transitionName = text(transition.name, lang)
        const region = data.getRegionById(transition.regionId)
        if (region) {
            return `${transitionName} [${text(region.name)}] – ${brandName}`
        }
        else {
            return `${transitionName} – ${brandName}`
        }
    }
    else {
        return brandName
    }
}
