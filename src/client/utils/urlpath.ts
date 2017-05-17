import {PathDescriptor} from "./definitions"
import {PATH_KEYWORD} from "../../data/constants"

export function formPath(path: PathDescriptor) {
    return `/${PATH_KEYWORD}/${path.transitionIds.join("+")}`
}
