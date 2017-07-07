import * as React from 'react'
import { specifierSharedStyles } from './specifierSharedStyles'
import range from '../../../utils/range'
import DropdownGroup from './DropdownGroup'

const thisYear = (new Date()).getFullYear()

const BirthYearSpecifiers = (props: {
    year: number,
    onChange(age: number): void
}) => (
    <DropdownGroup
        title=''
        value={props.year}
        onChange={event => props.onChange(Number(event.target.value))}
    >
        {
            range(1900, thisYear).map(year => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))
        }
    </DropdownGroup>
)

export default BirthYearSpecifiers
