import Status from "../../definitions/Qualities/Status"
import {duration} from "../../definitions/auxillary/Duration"

export const citizenship: Status = {
    id: "citizen",
    regionId: "new_zealand",
    name: {
        en: "Citizenship"
    },
    rights: [
        "work"
    ]
}

export const silverFernHolder: Status = {
    id: "silver_fern",
    regionId: "new_zealand",
    name: {
        en: "Silver Fern",
        zh_hans: "银蕨",
    },
    rights: [
        "work"
    ],
    duration: duration(9, "month")
}

export const pr: Status = {
    id: "permanent",
    regionId: "new_zealand",
    name: {
        en: "Permanent Residence"
    },
    rights: [
        "work"
    ]
}

export const alien: Status = {
    id: "alien",
    regionId: "new_zealand",
    name: {
        en: "Alien"
    },
    rights: [],
}
