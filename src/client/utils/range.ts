function range(begin: number, end: number, step = 1): number[] {
    const result: number[] = []
    for (let i = begin; i < end; i += step) {
        result.push(i)
    }
    return result
}

export default range
