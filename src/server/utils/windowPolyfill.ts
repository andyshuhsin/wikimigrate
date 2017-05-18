const documentPoly: Partial<Document> = {
    title: ""
}

const navigatorPoly: Partial<Navigator> = {
    userAgent: "",
    language: ""
}

const locationPoly: any = {
    pathname: ""
}

const windowPoly: any = {
    navigator: navigatorPoly,
    document: documentPoly,
    location: locationPoly,

    innerWidth: 500,

    addEventListener(key: string, callback: Function) {
    }
}

Object.assign(global, {
    window: windowPoly,
})
Object.assign(global, window)
