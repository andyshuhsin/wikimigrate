import Status from "../../definitions/Qualities/Status"
import {duration} from "../../definitions/auxiliary/Duration"

export const citizenship: Status = {
    id: "citizen",
    regionId: "canada",
    name: {
        en: "Citizenship"
    },
    rights: [
        "work"
    ]
}

export const pr: Status = {
    id: "permanent",
    regionId: "canada",
    name: {
        en: "Permanent Residence"
    },
    rights: [
        "work"
    ]
}

export const touristVisaExempted: Status = {
    id: "tourist_visa_exempted",
    regionId: "canada",
    name: {
        en: "Visa Exemption"
    },
    rights: [
        "visit"
    ],
    duration: duration(6, "month")
}

export const expressEntryCandidate: Status = {
    id: "express_entry_candidate",
    regionId: "canada",
    name: {
        en: "Express Entry Candidate"
    },
    rights: [],
}

export const alien: Status = {
    id: "alien",
    regionId: "canada",
    name: {
        en: "Alien"
    },
    rights: [],
}
