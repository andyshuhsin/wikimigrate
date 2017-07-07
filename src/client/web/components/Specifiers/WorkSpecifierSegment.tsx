import * as React from 'react'

import { WorkExperienceQuality } from '../../../../definitions/Qualities/WorkExperience'
import { WorkSpecifiersCallbacks } from './SpecifierPanel'
import { RegionId } from '../../../../definitions/auxiliary/Region'

import { IconButton } from './IconButton'

import { text } from '../../../utils/text'
import range from '../../../utils/range'
import inflect from '../../../utils/inflect'
import { duration } from '../../../../definitions/auxiliary/Duration'

import { activeRegionOptions } from '../../../data'
import { data } from '../../../../data'
import { specifierSharedStyles } from './specifierSharedStyles'

interface WorkExperienceSpecifierBodyProps extends WorkSpecifiersCallbacks {
    work: WorkExperienceQuality
    index: number
    workRemove(index: number): void
}

const selectorGroupStyle: React.CSSProperties = {
    display: 'block',
}

const domIds = {
    duration: 'work-duration',
    region: 'work-region'
}

const WorkSpecifierSegment = (props: WorkExperienceSpecifierBodyProps) => (
    <div style={specifierSharedStyles.containerStyles}>
        <IconButton
            icon='–'
            onClick={() => props.workRemove(props.index)}
            additionalStyle={specifierSharedStyles.deleteButtonStyle}
        />

        <label
            style={selectorGroupStyle}
            htmlFor={domIds.duration}
        >
            {
                text({
                    en: 'Duration',
                    zh_hans: '时长'
                })
            }
        </label>

        <select
            id={domIds.duration}
            value={props.work.duration.value}
            style={specifierSharedStyles.dropdownSelectStyle}
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
        </select>

        <label
            style={selectorGroupStyle}
            htmlFor={domIds.region}
        >
            {
                text({
                    en: 'Region',
                    zh_hans: '地区'
                })
            }
        </label>

        <select
            id={domIds.region}
            value={props.work.region}
            style={specifierSharedStyles.dropdownSelectStyle}
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
        </select>
    </div>
)

export default WorkSpecifierSegment
