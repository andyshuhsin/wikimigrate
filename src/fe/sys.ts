const userAgent = navigator.userAgent

const sys = {
    viewport: {
        width: window.innerWidth
    },
    ua: {
        ios_safari: (
            (/(iPad|iPhone|iPod)/gi).test(userAgent) &&
            !(/CriOS/).test(userAgent) &&
            !(/FxiOS/).test(userAgent) &&
            !(/OPiOS/).test(userAgent) &&
            !(/mercury/).test(userAgent)
        )
    }
}

export default sys
