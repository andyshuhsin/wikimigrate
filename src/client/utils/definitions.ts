import Transition from '../../definitions/Transition'

export interface Pathway {
    transitions: Transition[]
}

export interface PathwayDescriptor {
    transitionIds: string[]
}
