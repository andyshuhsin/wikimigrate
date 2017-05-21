// If this files grows too big, consider
// https://github.com/sindresorhus/query-string

interface Query {
    [key: string]: string
}

export function parseQueryString(query: string): Query {
    return query.replace('?', '')
                .split('&')
                .reduce((result: Query, next: string) => {
                    if (next.indexOf('=')) {
                        const [key, value] = next.split('=')
                        result[key] = value
                    }
                    else {
                        result[next] = ''
                    }
                    return result
                }, {})
}
