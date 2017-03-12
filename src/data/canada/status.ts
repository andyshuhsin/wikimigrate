import { Status } from '../common'

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

export const touristVisaExempted: Status = {
    id: "tourist_visa_exempted",
    name: {
        en: "Visa Exemption"
    },
    rights: [
        "visit"
    ],
    duration: {
        "month": 6
    }
}

export const expressEntryCandidate: Status = {
    id: "express_entry_candidate",
    name: {
        en: "Express Entry Candidate"
    },
    rights: [],
}

export const alien: Status = {
    id: "alien",
    name: {
        en: "Alien"
    },
    rights: [],
}