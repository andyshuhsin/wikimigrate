import { 
    Status,
    duration
 } from '../common'

export const citizenship: Status = {
    id: "citizen",
    regionId: "australia",
    name: {
        en: "Citizenship"
    },
    rights: [
        "work"
    ]
}

export const visa189holder: Status = {
    id: "189",
    regionId: "australia",
    name: {
        en: "Permanent Residence(189)"
    },
    rights: [
        "work",
        "study",
        "medicare",
    ],
    duration: duration(5, "year"),
}

export const visa190holder: Status = {
    id: "190",
    regionId: "australia",
    name: {
        en: "Permanent Residence(190)"
    },
    rights: [
        "work",
        "study",
        "medicare",
    ],
    duration: duration(5, "year"),
}

export const visa489holder: Status = {
    id: "489",
    regionId: "australia",
    name: {
        en: "Visa 489 Holder"
    },
    rights: [
        "work",
        "study",
        "medicare",
    ],
    duration: duration(4, "year"),

}

export const visa132holder: Status = {
    id: "132",
    regionId: "australia",
    name: {
        en: "Visa 132 Holder"
    },
    rights: [
        "work",
        "study",
        "medicare",
    ],
    duration: duration(5, "year"),

}

export const visa188holder: Status = {
    id: "188",
    regionId: "australia",
    name: {
        en: "Visa 188 Holder"
    },
    rights: [
        "entry",
        "business",
    ]
}

export const visa457holder: Status = {
    id: "457",
    regionId: "australia",
    name: {
        en: "Visa 457 Holder"
    },
    rights: [
        "entry",
        "work"
    ],
    duration: duration(2, "year"),
}


export const pr: Status = {
    id: "permanent",
    regionId: "australia",
    name: {
        en: "Permanent Residence"
    },
    rights: [
        "work"
    ]
}

export const alien: Status = {
    id: "alien",
    regionId: "australia",
    name: {
        en: "Alien"
    },
    rights: [],
}