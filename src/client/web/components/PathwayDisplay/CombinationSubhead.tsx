import * as React from 'react'
import { Combination } from '../../../../definitions/auxiliary/Combination'
import { text } from '../../../utils/text'
import design from '../../design'

const topLevelStyle: React.CSSProperties = {
    marginBottom: '0.4em',
    padding: '0.3em',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontWeight: 'bolder',
    background: design.colors.brandLighter,
}

const subLevelStyle: React.CSSProperties = {
    ...topLevelStyle,
    background: design.colors.brandLightest,
}

const CombinationSubhead = (props: { combo: Combination<any>, level: number }) => (
    props.combo.meta && props.combo.meta.title
        ? <div style={props.level <= 1 ? topLevelStyle : subLevelStyle}>
              {text(props.combo.meta.title)}
          </div>
        : <noscript />
)

export default CombinationSubhead
