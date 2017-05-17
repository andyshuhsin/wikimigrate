import {PathwayDescriptor} from "./definitions"
import {PATHWAY_KW_SINGLE} from "../../data/constants"

export function formPath(pathway: PathwayDescriptor) {
    return `/${PATHWAY_KW_SINGLE}/${pathway.transitionIds.join("+")}`
}
