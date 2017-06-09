import * as React from 'react'
import { Combination } from '../../../../definitions/auxiliary/Combination'
import { text } from '../../../utils/text'
import design from '../../design'

const style: React.CSSProperties = {
    marginBottom: '0.4em',
    padding: '0.3em',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontWeight: 'bolder',
    background: design.colors.brandLighter,
}

const CombinationSubhead = (props: { combo: Combination<any> }) => (
    props.combo.meta && props.combo.meta.title
        ? <div style={style}>
              {text(props.combo.meta.title)}
          </div>
        : <noscript />
)

export default CombinationSubhead
