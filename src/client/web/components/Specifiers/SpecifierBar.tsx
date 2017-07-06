import * as React from 'react'
import { text } from '../../../utils/text'
import design from '../../design'

interface FilterBarProps {
    onClick: () => void
}

const SpecifierBar = (props: FilterBarProps) => (
    <div
        style={{
            fontSize: '1.3em',
            padding: '0.5em 0.7em',
            width: '100%',
            transition: `transform ${design.durations.slide}s`,
            background: 'white',
            cursor: 'pointer',
        } as React.CSSProperties}
        onClick={props.onClick}
    >
        {
            text({
                en: 'Specify conditions',
                zh_hans: '设置个人条件',
            })
        }
        <img
            style={{
                width: '1.3em',
                verticalAlign: 'middle',
            }}
            src={require('../../../assets/angle-down.svg')}
        />
    </div>
)

export default SpecifierBar
