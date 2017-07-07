import * as React from 'react'
import { specifierSharedStyles } from './specifierSharedStyles'
import { WorkExperienceQuality } from '../../../../definitions/Qualities/WorkExperience'
import { IconButton } from './IconButton'
import { text } from '../../../utils/text'
import range from '../../../utils/range'
import inflect from '../../../utils/inflect'
import { WorkSpecifiersCallbacks } from './SpecifierPanel'
import { duration } from '../../../../definitions/auxiliary/Duration'
import { activeRegionOptions } from '../../../data'
import { data } from '../../../../data'
import { RegionId } from '../../../../definitions/auxiliary/Region'

interface WorkExperienceSpecifierBodyProps extends WorkSpecifiersCallbacks {
    work: WorkExperienceQuality
    index: number
    workRemove(index: number): void
}

const selectorGroupStyle: React.CSSProperties = {
    display: 'block',
}

const WorkExperienceSpecifierBody = (props: WorkExperienceSpecifierBodyProps) => (
    <div style={specifierSharedStyles.containerStyles}>
        <IconButton
            icon='–'
            onClick={() => props.workRemove(props.index)}
            additionalStyle={specifierSharedStyles.deleteButtonStyle}
        />

        <pre>
            {JSON.stringify(props.work, null , 4)}
        </pre>

        <label style={selectorGroupStyle}>
            {
                text({
                    en: 'Duration',
                    zh_hans: '时长'
                })
            }
            <select
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
        </label>

        <label style={selectorGroupStyle}>
            {
                text({
                    en: 'Region',
                    zh_hans: '地区'
                })
            }
            <select
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
        </label>
    </div>
)

export default WorkExperienceSpecifierBody
