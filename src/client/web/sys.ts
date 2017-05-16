const userAgent = navigator.userAgent

const sys = {
    viewport: {
        width: window.innerWidth
    },
    ua: {
        iosSafari: (
            (/(iPad|iPhone|iPod)/gi).test(userAgent) &&
            !(/CriOS/).test(userAgent) &&
            !(/FxiOS/).test(userAgent) &&
            !(/OPiOS/).test(userAgent) &&
            !(/mercury/).test(userAgent) &&
            !/micromessenger/i.test(userAgent)
        ),
        iosWechat: /micromessenger/i.test(userAgent),
    },
    dimensions: {
        iosSafariBottomBarHeight: 69
    }
}

export default sys
