import * as React from 'react'

interface TitleProps {
    text: string
    filterText: string
    onFilterTextClick(): void
}

const titleStyle: React.CSSProperties = {
    padding: '0 0 0.5em',
    font: '1.2em sans-serif',
    flex: 0,
}

const anchorStyle: React.CSSProperties = {
    textDecoration: 'underline',
    float: 'right',
}

const Title = (props: TitleProps) => (
    <div style={titleStyle}>
        {props.text}
        <a style={anchorStyle} onClick={props.onFilterTextClick}>
            {props.filterText}
        </a>
    </div>
)

export default Title
