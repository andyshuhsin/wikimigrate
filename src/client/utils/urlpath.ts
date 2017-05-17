import {PathwayDescriptor} from "./definitions"
import {PATHWAY_KW_SIMPLE} from "../../data/constants"

export function formPath(pathway: PathwayDescriptor) {
    return `/${PATHWAY_KW_SIMPLE}/${pathway.transitionIds.join("+")}`
}
