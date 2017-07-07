import * as React from 'react'
import design from '../../design'
import { text } from '../../../utils/text'
import { MultiLangStringSet } from '../../../../definitions/auxiliary/MultiLang'

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

const altText: MultiLangStringSet = {
    en: 'Remove condition',
    zh_hans: '删除条件'
}

const IconButton = (props: {
    icon: string,
    onClick: () => void
    additionalStyle?: React.CSSProperties
}) => (
    <a
        role='button'
        aria-label={text(altText)}
        style={
            props.additionalStyle
                ? Object.assign({}, buttonStyle, props.additionalStyle)
                : buttonStyle
        }
        onClick={props.onClick}
    >
        {props.icon}
    </a>
)

export default IconButton
