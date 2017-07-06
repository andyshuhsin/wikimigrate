import * as React from 'react'
import { specifierSharedStyles } from './specifierSharedStyles'
import { WorkExperienceQuality } from '../../../../definitions/Qualities/WorkExperience'
import { IconButton } from './IconButton'
import { text } from '../../../utils/text'
import range from '../../../utils/range'
import inflect from '../../../utils/inflect'
import { WorkSpecifiersCallbacks } from './SpecifierPanel'
import { duration } from '../../../../definitions/auxiliary/Duration'

interface WorkExperienceSpecifierBodyProps extends WorkSpecifiersCallbacks {
    work: WorkExperienceQuality
    index: number
    workRemove(index: number): void
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

        <label>
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
    </div>
)

export default WorkExperienceSpecifierBody
