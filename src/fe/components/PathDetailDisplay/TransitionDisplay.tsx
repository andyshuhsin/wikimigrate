import * as React from 'react'
import text from "../../utils/text"

import CombinationBox from './CombinationBox'
import ProcedureBox from './ProcedureBox'
import ReferenceBox from './ReferenceBox'
import ScoreBox from './ScoreBox'
import Transition from "../../../definitions/Transition";
import {RegionId} from "../../../definitions/auxillary/Region"
import {calcScore} from "../../utils/calcScore"
import {Person} from "../../../definitions/Person"
import {LangId} from "../../../definitions/auxillary/MultiLang"

const transitionNameStyle = {
    margin: 0,
}

const sectionTitleStyle = {
    margin: "0.5em",
    marginLeft: 0,

    fontWeight: "lighter",
    fontSize: "1.4em",
} as React.CSSProperties

const flagStyle = {
    marginLeft: "0.3em",
    maxWidth: "1.2em",
} as React.CSSProperties

type Package = any

// Should flags live in /data dir?
const flagSources: {[key in RegionId]: Package | null} = {
    canada: require('../../assets/flags/canada.svg'),
    australia: require('../../assets/flags/australia.svg'),
    new_zealand: require('../../assets/flags/new_zealand.svg'),
    world: null,
    canada_pacific_provinces: null,
}

interface Props {
    transition: Transition
    user: Person
    lang: LangId,
}

class TransitionDisplay extends React.PureComponent<Props, {}> {
    render() {
        const {
            transition, lang
        } = this.props
        return (
            <div>
                <h1 style={transitionNameStyle}>
                    {text(transition.name)}
                    <img
                        style={flagStyle}
                        src={flagSources[transition.regionId]}
                    />
                </h1>
                {/*<h2 style={h2Style}>
                    To {transition.to.name["en"]},
                    for rights of {transition.to.rights}
                </h2>*/}

                <section>
                    <h3 style={sectionTitleStyle}>
                        {
                            text({
                                en: "Prerequisites",
                                zh_hans: "申请条件",
                            })
                        }
                    </h3>
                    {
                        <CombinationBox
                            combo={transition.prerequisiteList}
                            level={0}
                            lang={lang}
                        />
                    }
                </section>

                {
                    transition.scoreSystem &&
                    <section>
                        <h3 style={sectionTitleStyle}>Scoring (Experimental)</h3>
                        <ScoreBox
                            score={calcScore(this.props.user, transition.scoreSystem)}
                            history={transition.scoreSystem.history}
                            name={text(transition.scoreSystem.name)}
                        />
                    </section>
                }

                {/* TODO: Implement procedural guides
                <section>
                    <h3 style={sectionTitleStyle}>Application</h3>
                    {
                        <ProcedureBox procedureList={transition.procedureList} />
                    }
                </section>
                */}

                {
                    transition.referenceList &&
                    <section>
                        <h3 style={sectionTitleStyle}>References</h3>
                        {
                            <ReferenceBox referenceList={transition.referenceList} />
                        }
                    </section>
                }
            </div>
        )
    }
}

export default TransitionDisplay

