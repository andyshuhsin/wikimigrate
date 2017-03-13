import { 
    Status,
    duration
 } from '../common'

export const citizenship: Status = {
    id: "citizen",
    name: {
        en: "Citizenship"
    },
    rights: [
        "work"
    ]
}

export const pr: Status = {
    id: "permanent",
    name: {
        en: "Permanent Residence"
    },
    rights: [
        "work"
    ]
}

export const alien: Status = {
    id: "alien",
    name: {
        en: "Alien"
    },
    rights: [],
}