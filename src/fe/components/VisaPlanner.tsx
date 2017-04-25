import data from '../../data'

import * as React from 'react'
import {connect, Dispatch} from 'react-redux'

import TopBar from './TopBar'
import PathShowcase from './PathShowcase'
import FilterBar from './Filters/FilterBar'
import PathDetailDisplay from './PathDetailDisplay'
import FilterDetailedOptionPanel from './Filters/FilterDetailedOptionPanel'
import Shade from './Shade'
import sys from '../sys'

import {
    Path, PathDescriptor,
} from "../utils/definitions"

import calcSuitablePaths from "../utils/calcSuitablePaths"

import {VisaPlannerState} from "../reducers"

import {Person} from "../../definitions/Person"
import {
    filterBarClickAction, keyDownAction, pathBoxClickAction, pathViewCloseButtonClickAction,
    shadeClickAction,
} from "../actions/index"
import {Region} from "../../definitions/auxillary/Region"
import {text} from "../utils/text"
import {calcScore} from "../utils/calcScore"
import crs from "../../data/canada/crs"
import {LangId} from "../../definitions/auxillary/MultiLang"

// import {calcScoreTest} from "../utils/calcScore"
// calcScoreTest()

const style = {
    position: "relative",
    margin: 0,
    padding: 0,
    height: sys.ua.iosSafari
            ? `calc(100vh - ${sys.dimensions.iosSafariBottomBarHeight}px)`
            : "100vh",

    overflow: "hidden",
    display: "flex",
    flexFlow: "column",

    fontSize: 14,
    color: "#212121",
    fontFamily: "sans-serif",
} as React.CSSProperties

interface PropTypes {
    user: Person
    lang: LangId
    pathOnDisplay: PathDescriptor | null
    onFilterBarClick: () => void
    onShadeClick: () => void
    onPathBoxClick: (path: Path) => void
    onPathViewCloseButtonClick: () => void
    onKeyDown: (keyCode: number) => void
    filterPanelHeight: number | null
    shouldDetailedFilterPanelExpand: boolean
}

const allTransitions = data.regions.map((region: Region) => region.transitionList).reduce(
    (prev, nextArray) => prev.concat(nextArray),
    []
)

class VisaPlanner extends React.Component<PropTypes, {}> {

    componentDidMount() {
        document.title = text(data.app.brandName)
        window.onkeydown = (event: KeyboardEvent) =>
            this.props.onKeyDown(event.keyCode)
    }

    getPaths(pathDescriptor: PathDescriptor | null): Path | null {
        if (!pathDescriptor) {
            return null
        }
        return {
            transitions: pathDescriptor.transitionIds.map(
                id => allTransitions.filter(transition => transition.id === id)[0]
            )
        }
    }

    render() {

        const {
            user,
            lang,
            shouldDetailedFilterPanelExpand,
            pathOnDisplay,
            filterPanelHeight,
            onPathViewCloseButtonClick,
            onShadeClick,
            onFilterBarClick,
            onPathBoxClick,
        }= this.props

        return (
            <div style={style}>
                <TopBar
                    brandName={text(data.app.brandName)}
                    version={data.app.version}
                />
                <PathShowcase
                    paths={calcSuitablePaths(user, allTransitions)}
                    onClick={onPathBoxClick}
                />
                <PathDetailDisplay
                    user={user}
                    pathOnDisplay={this.getPaths(pathOnDisplay)}
                    onClose={onPathViewCloseButtonClick}
                    lang={lang}
                />
                <Shade
                    shouldShow={shouldDetailedFilterPanelExpand}
                    onClick={onShadeClick}
                />
                <FilterBar
                    onClick={onFilterBarClick}
                    offset={
                        shouldDetailedFilterPanelExpand
                        ? filterPanelHeight
                        : 0
                    }
                />
                <FilterDetailedOptionPanel />
            </div>
        )
    }
}

function mapStateToProps(state: VisaPlannerState): Partial<PropTypes> {
    return {
        user: state.user,
        lang: state.ui.lang,
        pathOnDisplay: state.ui.pathOnDisplay,
        filterPanelHeight: state.ui.filterPanelHeight,
        shouldDetailedFilterPanelExpand: state.ui.shouldDetailedFilterPanelExpand,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): Partial<PropTypes> {
    return {
        onFilterBarClick() {
            dispatch(filterBarClickAction())
        },
        onShadeClick() {
            dispatch(shadeClickAction())
        },
        onPathBoxClick(path: Path) {
            dispatch(pathBoxClickAction(path))
        },
        onPathViewCloseButtonClick() {
            dispatch(pathViewCloseButtonClickAction())
        },
        onKeyDown(keyCode: number) {
            dispatch(keyDownAction(keyCode))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisaPlanner)
