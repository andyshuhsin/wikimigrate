import * as React from 'react'

interface TitleProps {
    text: string
}

const titleStyle = {
    padding: "0.3em 0",
    font: "1.8em sans-serif",
    textAlign: "center",
    flex: 0,
} as React.CSSProperties

const Title = (props: TitleProps) => (
    <div style={titleStyle}>
        {props.text}
    </div>
)

export default Title
