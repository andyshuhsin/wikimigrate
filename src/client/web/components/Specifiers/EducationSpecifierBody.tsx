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

const activeRegionOptions: RegionId[] = [
    'australia',
    'canada',
    'new_zealand',
    'usa',
]

interface EducationSpecifierBodyProps extends EducationSpecifierCallbacks {
    edu: EducationQuality,
    index: number,
}

export function EducationSpecifierBody(props: EducationSpecifierBodyProps) {
    return (
        <div style={specifierSharedStyles.containerStyles}>
            {JSON.stringify(props.edu)}
            <IconButton
                icon='–'
                onClick={() => props.educationRemove(props.index)}
                additionalStyle={specifierSharedStyles.deleteButtonStyle}
            />
            <table>
                <thead><tr>
                    <td>
                        Stage
                    </td>
                    <td>
                        Region
                    </td>
                </tr></thead>

                <tbody><tr>

                    <td>
                        <select
                            value={props.edu.stage}
                            onChange={event =>
                                props.educationStageChange(
                                    props.index,
                                    event.target.value as EducationStage
                                )
                            }
                        >
                            {Object.keys(educationStageProfiles).map((stage: EducationStage) =>
                                <option key={stage} value={stage}>
                                    {text(educationStageProfiles[stage].name)}
                                </option>
                            )}
                        </select>
                    </td>

                    <td>
                        <select
                            value={props.edu.region}
                            onChange={event => props.educationRegionChange(
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
                    </td>
                </tr></tbody>
            </table>
        </div>
    )
}