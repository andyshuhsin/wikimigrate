import * as React from 'react'

interface TitleProps {
    text: string
}

const titleStyle = {
    padding: '0 0 0.5em',
    font: '1.2em sans-serif',
    flex: 0,
} as React.CSSProperties

const Title = (props: TitleProps) => (
    <div style={titleStyle}>
        {props.text}
    </div>
)

export default Title
