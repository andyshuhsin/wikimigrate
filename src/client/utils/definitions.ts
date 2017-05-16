import Transition from "../../definitions/Transition"

export interface Path {
    transitions: Transition[]
}

export interface PathDescriptor {
    transitionIds: string[]
}
