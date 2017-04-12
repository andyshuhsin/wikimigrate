import * as React from 'react'

const DEFAULT_DURATION = 0.2

interface ShadeProps {
    shouldShow: boolean
    duration?: number
    onClick?: () => void
}

const Shade = (props: ShadeProps) => (

    <div
        style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: props.shouldShow ? 0 : -1,

            opacity: props.shouldShow ? 1 : 0,
            transition: `opacity ${props.duration === undefined
                                   ? DEFAULT_DURATION
                                   : props.duration}s`,

            background: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={props.onClick}
    >

    </div>
)

export default Shade
