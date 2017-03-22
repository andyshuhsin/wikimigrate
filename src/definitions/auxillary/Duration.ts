type DurationUnit = "year" | "month" | "week" | "day" | "hour"

type Duration = {
    unit: DurationUnit
    value: number
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
