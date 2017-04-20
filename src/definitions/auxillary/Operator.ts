export type ArithmeticComparisonOperator = "<" | "<=" | ">" | ">=" | "="

export type Interval<T> = [ArithmeticComparisonOperator, T]
