import * as React from 'react'

interface TitleProps {
    text: string
}

const titleStyle = {
    margin: "1em",
    fontWeight: "bolder",
    textAlign: "center",
} as React.CSSProperties

const Title = (props: TitleProps) => (
    <div style={titleStyle}>
        {props.text}
    </div>
)

export default Title