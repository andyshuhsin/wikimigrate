import Status from '../Qualities/Status'

export interface Effect {
    property: string | 'DQ' // disqualified
    value: any
}

export interface Exception {
    appliedTo: Status[]
    effects: Effect[]
}

export default Exception
