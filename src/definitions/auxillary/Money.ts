export type CurrencyId = "cad" | "usd" | "aud"

export type Money = {
    value: number
    currencyId: CurrencyId
}

export function money(value: number, currencyId: CurrencyId): Money {
    return {
        value,
        currencyId
    }
}

export default Money