import * as React from 'react'

import { WorkExperienceQuality } from '../../../../definitions/Qualities/WorkExperience'
import { WorkSpecifiersCallbacks } from './SpecifierPanel'
import { RegionId } from '../../../../definitions/auxiliary/Region'

import IconButton from './IconButton'

import { text } from '../../../utils/text'
import range from '../../../utils/range'
import inflect from '../../../utils/inflect'
import { duration } from '../../../../definitions/auxiliary/Duration'

import { activeRegionOptions } from '../../../data'
import { data } from '../../../../data'
import { specifierSharedStyles } from './specifierSharedStyles'
import DropdownGroup from './DropdownGroup'

interface WorkExperienceSpecifierBodyProps extends WorkSpecifiersCallbacks {
    work: WorkExperienceQuality
    index: number
    workRemove(index: number): void
}

const texts = {
    duration: {
        en: 'Duration',
        zh_hans: '时长'
    },
    region: {
        en: 'Region',
        zh_hans: '地区'
    }
}

const WorkSpecifierSegment = (props: WorkExperienceSpecifierBodyProps) => (
    <div style={specifierSharedStyles.containerStyles}>
        <IconButton
            icon='–'
            onClick={() => props.workRemove(props.index)}
            additionalStyle={specifierSharedStyles.deleteButtonStyle}
        />

        <DropdownGroup
            title={text(texts.duration)}
            value={props.work.duration.value}
            onChange={event => props.workDurationChange(
                props.index,
                duration(Number(event.target.value), 'year')
            )}
        >
            {
                range(1, 30).map(year =>
                    <option value={year} key={year}>
                        {year + ' ' + inflect(text({
                            en: 'year'
                        }), { number: year })}
                    </option>
                )
            }
        </DropdownGroup>

        <DropdownGroup
            title={text(texts.region)}
            value={props.work.region}
            onChange={event => props.workRegionChange(
                props.index,
                event.target.value as RegionId
            )}
        >
            {activeRegionOptions.map((region: RegionId) => {
                const regionObj = data.getRegionById(region)
                if (regionObj) {
                    return (
                        <option value={region} key={region}>
                            {text(regionObj.name)}
                        </option>
                    )
                }
                return null
            })}
            <option value={'world'}>
                {text({
                    en: 'Elsewhere',
                    zh_hans: '其他地区'
                })}
            </option>
        </DropdownGroup>

    </div>
)

export default WorkSpecifierSegment
