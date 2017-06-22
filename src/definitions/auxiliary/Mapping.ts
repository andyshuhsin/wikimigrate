export type Mapping<A extends string, B> = {
    [key in A]: B
}
