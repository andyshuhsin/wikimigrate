import * as React from 'react'
import { LangId } from '../../../definitions/auxiliary/MultiLang'
import { pathwayBoxStyle } from './PathwayBox'

const style = Object.assign({}, pathwayBoxStyle, {
    background: "none",
    border: "1px solid",
    cursor: "initial",
} as React.CSSProperties)

const anchorStyle = {
    display: "inline-block",
    padding: "0.2em",
    fontWeight: "bolder",
    textDecoration: "underline",
} as React.CSSProperties

export const Credits = (props: {lang: LangId}) => {
    switch (props.lang) {
        case "en": {
            return (
                <div style={style}>
                    The project is alive because of people like you. <br />
                    Please support us at
                    <a
                       style={anchorStyle}
                       href="https://www.patreon.com/wikimigrate"
                       target="_blank"
                    >
                        Patreon
                    </a>.
                </div>
            )
        }
        case "zh_hans": {
            return (
                <div style={style}>
                    本项目经费正在
                    <a
                        style={anchorStyle}
                        href="https://www.patreon.com/wikimigrate"
                        target="_blank"
                    >
                        Patreon
                    </a>上筹集，<br />请支持我们！谢谢！
                </div>
            )
        }
        default: {
            return <noscript />
        }
    }
}
