import * as React from 'react'
import design from '../../design'

const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '1.2em',
    height: '1.2em',
    borderRadius: '3px',

    backgroundColor: design.colors.greyLight,
    lineHeight: '1.2em',
    fontSize: '1.5em',
    textAlign: 'center',
    cursor: 'pointer',
}

export const IconButton = (props: {
    icon: string,
    onClick: () => void
}) => (
    <span
        style={buttonStyle}
        onClick={props.onClick}
    >
        {props.icon}
    </span>
)
