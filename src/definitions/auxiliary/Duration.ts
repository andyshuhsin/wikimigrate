import {MultiLangStringSet} from "./MultiLang"
export type DurationUnit = "year" | "month" | "week" | "day" | "hour"

type Duration = {
    unit: DurationUnit
    value: number
}

type Scenario = "normal" | "age"

interface DurationUnitProfile {
    name: {
      [key in Scenario]: MultiLangStringSet
    }
}

type DurationUnitProfiles = {
    [key in DurationUnit]: DurationUnitProfile
}

export const durationUnitProfiles: DurationUnitProfiles = {
    year: {
        name: {
            normal: {
                en: "year",
                zh_hans: "年",
            },
            age: {
                en: "year",
                zh_hans: "岁",
            }
        }
    },
    month: {
        name: {
            normal: {
                en: "month",
                zh_hans: "月",
            },
            age: {
                en: "month",
                zh_hans: "月",
            }
        }
    },
    week: {
        name: {
            normal: {
                en: "week",
                zh_hans: "周",
            },
            age: {
                en: "week",
                zh_hans: "周",
            }
        }
    },
    day: {
        name: {
            normal: {
                en: "day",
                zh_hans: "日",
            },
            age: {
                en: "day",
                zh_hans: "日",
            }
        }
    },
    hour: {
        name: {
            normal: {
                en: "hour",
                zh_hans: "小时",
            },
            age: {
                en: "hour",
                zh_hans: "小时",
            }
        }
    },
}

function duration(value: number, unit: DurationUnit): Duration {
    return {
        unit,
        value,
    }
}

export {
    Duration,
    duration
}

export default Duration
