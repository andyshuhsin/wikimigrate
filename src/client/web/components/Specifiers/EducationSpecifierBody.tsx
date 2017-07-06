import * as React from 'react'
import {
    EducationQuality,
    EducationStage,
    educationStageProfiles,
} from '../../../../definitions/Qualities/EducationExperience'
import { text } from '../../../utils/text'
import { RegionId } from '../../../../definitions/auxiliary/Region'
import { data } from '../../../../data'
import { IconButton } from './IconButton'
import { specifierSharedStyles } from './specifierSharedStyles'
import { EducationSpecifierCallbacks } from './SpecifierPanel'
import inflect from '../../../utils/inflect'
import { duration } from '../../../../definitions/auxiliary/Duration'
import range from '../../../utils/range'

const activeRegionOptions: RegionId[] = [
    'australia',
    'canada',
    'new_zealand',
    'usa',
]

const durationYearOptions: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

const thisYear = (new Date()).getFullYear()

interface EducationSpecifierBodyProps extends EducationSpecifierCallbacks {
    edu: EducationQuality,
    index: number,
}

export function EducationSpecifierBody(props: EducationSpecifierBodyProps) {
    return (
        <div style={specifierSharedStyles.containerStyles}>
            <IconButton
                icon='–'
                onClick={() => props.educationRemove(props.index)}
                additionalStyle={specifierSharedStyles.deleteButtonStyle}
            />
            <table><tbody>
                <tr key='row-0'>
                    <td>
                        {text({
                            en: 'Stage',
                            zh_hans: '阶段'
                        })}
                    </td>
                    <td>
                        {
                            text({
                                en: 'Location',
                                zh_hans: '地区'
                            })
                        }
                    </td>
                </tr>

                <tr key='row-1'>
                    <td key='stage'>
                        <select
                            value={props.edu.stage}
                            onChange={event =>
                                props.educationStageChange(
                                    props.index,
                                    event.target.value as EducationStage
                                )
                            }
                            style={specifierSharedStyles.dropdownSelectStyle}
                        >
                            {Object.keys(educationStageProfiles).map((stage: EducationStage) =>
                                <option key={stage} value={stage}>
                                    {text(educationStageProfiles[stage].name)}
                                </option>
                            )}
                        </select>
                    </td>

                    <td key='region'>
                        <select
                            value={props.edu.region}
                            onChange={event => props.educationRegionChange(
                                props.index,
                                event.target.value as RegionId
                            )}
                            style={specifierSharedStyles.dropdownSelectStyle}
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
                    </td>
                </tr>

                <tr key='row-2'>
                    <td>
                        {text({
                            en: 'Duration',
                            zh_hans: '时长',
                        })}
                    </td>
                    <td>
                        {text({
                            en: 'Graduated',
                            zh_hans: '毕业时间',
                        })}
                    </td>
                </tr>

                <tr key='row-3'>
                    <td key='duration'>
                        <select
                            value={props.edu.duration.value}
                            onChange={event => props.educationDurationChange(
                                props.index,
                                duration(+event.target.value, 'year')
                            )}
                            style={specifierSharedStyles.dropdownSelectStyle}
                        >
                            {durationYearOptions.map((year: number) =>
                                <option key={year} value={year}>
                                    {year + ' ' + inflect(text({
                                        en: 'year'
                                    }), { number: year })}
                                </option>
                            )}
                        </select>
                    </td>

                    <td key='graduation'>
                        <select
                            value={props.edu.graduationDate.year}
                            onChange={event => props.educationGraduationDateChange(
                                props.index,
                                +event.target.value
                            )}
                            style={specifierSharedStyles.dropdownSelectStyle}
                        >
                            {range(1980, thisYear+1).map((year: number) =>
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            )}
                        </select>
                    </td>
                </tr>
            </tbody></table>
        </div>
    )
}
