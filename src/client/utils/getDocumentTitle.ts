import {PathwayDescriptor} from "./definitions"
import {data} from "../../data/index"
import {text} from "./text"
import {LangId} from "../../definitions/auxiliary/MultiLang"

export function getDocumentTitle(
    pathwayOnDisplay: PathwayDescriptor | null,
    lang: LangId,
): string {
    if (!pathwayOnDisplay) {
        return text(data.app.brandName, lang)
    }
    const transition = data.allTransitions.find(
        transition => transition.id === pathwayOnDisplay.transitionIds[0]
    )
    if (transition) {
        return `${text(transition.name, lang)} – ${text(data.app.brandName, lang)}`
    }
    else {
        return text(data.app.brandName, lang)
    }
}
