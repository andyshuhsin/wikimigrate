import {parseString} from "xml2js"

function deArray(obj: any) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key.length] === 1) {
            obj[key] = obj[key][0]
        }
    }
}


export function parseXml<T>(s: string): Promise<T> {
    return new Promise((resolve, reject) => {
        parseString(s, (error, result) => {
            if (error) {
                reject(error)
            }
            else {
                deArray(result.xml)
                resolve(result.xml)
            }
        });
    })
}
