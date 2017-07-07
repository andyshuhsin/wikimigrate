import * as React from 'react'
import { text } from '../../../utils/text'
import { SpouseSpecifiersCallbacks } from './SpecifierPanel'

interface SpouseSpecifierBodyProps extends SpouseSpecifiersCallbacks {
    hasSpouseNow: boolean
}

const labelStyle: React.CSSProperties = {
    marginRight: '1em',
}

const radioStyle: React.CSSProperties = {
    marginRight: '0.5em'
}

const SpouseSpecifierBody = (props: SpouseSpecifierBodyProps) => (
    <div>
        <label
            style={labelStyle}
        >
            <input
                type='radio'
                name='has-spouse'
                onChange={() => props.spouseExistenceChange(true)}
                checked={props.hasSpouseNow}
                style={radioStyle}
            />
            {text({
                en: 'Has a spouse',
                zh_hans: '有配偶',
            })}
        </label>
        <label
            style={labelStyle}
        >
            <input
                type='radio'
                name='has-spouse'
                onChange={() => props.spouseExistenceChange(false)}
                checked={!props.hasSpouseNow}
                style={radioStyle}
            />
            {text({
                en: 'Not have a spouse',
                zh_hans: '无配偶',
            })}
        </label>
    </div>
)

export default SpouseSpecifierBody
