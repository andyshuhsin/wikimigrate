import * as React from 'react'

import {
    EducationQuality,
    EducationStage,
    educationStageProfiles,
} from '../../../../definitions/Qualities/EducationExperience'
import { EducationSpecifierCallbacks } from './SpecifierPanel'
import { RegionId } from '../../../../definitions/auxiliary/Region'

import IconButton from './IconButton'

import inflect from '../../../utils/inflect'
import range from '../../../utils/range'
import text from '../../../utils/text'
import { duration } from '../../../../definitions/auxiliary/Duration'

import { data } from '../../../../data'
import { specifierSharedStyles } from './specifierSharedStyles'
import { activeRegionOptions } from '../../../data'
import DropdownGroup from './DropdownGroup'

const durationYearOptions: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

const thisYear = (new Date()).getFullYear()

const texts = {
    stage: {
        en: 'Stage',
        zh_hans: '阶段'
    },
    region: {
        en: 'Location',
        zh_hans: '地区'
    },
    duration: {
        en: 'Duration',
        zh_hans: '时长',
    },
    graduateDate: {
        en: 'Graduated',
        zh_hans: '毕业年份'
    }
}

interface EducationSpecifierBodyProps extends EducationSpecifierCallbacks {
    edu: EducationQuality,
    index: number,
}

function EducationSpecifierSegment(props: EducationSpecifierBodyProps) {
    return (
        <div style={specifierSharedStyles.containerStyles}>
            <IconButton
                icon='–'
                onClick={() => props.educationRemove(props.index)}
                additionalStyle={specifierSharedStyles.deleteButtonStyle}
            />

            <DropdownGroup
                title={text(texts.stage)}
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
            </DropdownGroup>

            <DropdownGroup
                title={text(texts.region)}
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
            </DropdownGroup>

            <DropdownGroup
                title={text(texts.duration)}
                value={props.edu.duration.value}
                onChange={event => props.educationDurationChange(
                    props.index,
                    duration(+event.target.value, 'year')
                )}
            >
                {durationYearOptions.map((year: number) =>
                    <option key={year} value={year}>
                        {year + ' ' + inflect(text({
                            en: 'year'
                        }), { number: year })}
                    </option>
                )}
            </DropdownGroup>

            <DropdownGroup
                title={text(texts.graduateDate)}
                value={props.edu.graduationDate.year}
                onChange={event => props.educationGraduationDateChange(
                    props.index,
                    +event.target.value
                )}
            >
                {range(1980, thisYear+1).map((year: number) =>
                    <option key={year} value={year}>
                        {year}
                    </option>
                )}
            </DropdownGroup>
        </div>
    )
}

export default EducationSpecifierSegment
