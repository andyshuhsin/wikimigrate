import data from '../../../data'

import * as React from 'react'
import {connect, Dispatch} from 'react-redux'

import TopBar from './TopBar'
import PathShowcase from './PathShowcase'
import FilterBar from './Filters/FilterBar'
import PathwayDisplay from './PathwayDisplay'
import FilterDetailedOptionPanel from './Filters/FilterDetailedOptionPanel'
import Shade from './Shade'
import sys from '../sys'

import {
    Pathway, PathwayDescriptor,
} from "../../utils/definitions"

import calcSuitablePaths from "../../utils/calcSuitablePaths"

import {VisaPlannerState} from "../../reducers"

import {Person} from "../../../definitions/Person"
import {
    filterBarClickAction, keyDownAction, pathBoxClickAction, pathViewCloseButtonClickAction, urlpathChangeAction,
    shadeClickAction,
} from "../../actions"
import {setTextLang, text} from "../../utils/text"
import {LangId} from "../../../definitions/auxiliary/MultiLang"
import {formPath} from "../../utils/urlpath"

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
    pathwayOnDisplay: PathwayDescriptor | null
    onFilterBarClick: () => void
    onShadeClick: () => void
    onPathwayBoxClick: (path: Pathway) => void
    onPathViewCloseButtonClick: () => void
    onKeyDown: (keyCode: number) => void
    filterPanelHeight: number | null
    shouldDetailedFilterPanelExpand: boolean
    onUrlpathChange: (path: string) => void
}

const allTransitions = data.allTransitions

class VisaPlanner extends React.Component<PropTypes, {}> {

    componentWillMount() {
        setTextLang(this.getCurrentLang())
        document.title = text(data.app.brandName)

        this.props.onUrlpathChange(window.location.pathname)
        window.addEventListener("popstate", () =>
            this.props.onUrlpathChange(window.location.pathname)
        )
        window.onkeydown = (event: KeyboardEvent) =>
            this.props.onKeyDown(event.keyCode)
    }

    getPaths(pathwayDes: PathwayDescriptor | null): Pathway | null {
        if (!pathwayDes) {
            return null
        }
        return {
            transitions: pathwayDes.transitionIds.map(
                id => allTransitions.filter(transition => transition.id === id)[0]
            )
        }
    }

    getCurrentLang(): LangId {
    if (this.props.lang) {
        return this.props.lang
    }
    else {
        // TODO: (1)Implement proper detection via Accept-Language
        // TODO: (2)Proper handling of Chinese tags
        const lang = window.navigator.language
        if (lang.indexOf("zh-cn") > -1) {
            return "zh_hans"
        }
        else {
            return "en"
        }
    }
}

    componentWillReceiveProps(newProps: PropTypes) {
        if (newProps.pathwayOnDisplay) {
            const oldPath = window.location.pathname
            const path = formPath(newProps.pathwayOnDisplay)
            if (path !== oldPath) {
                window.history.pushState(null, document.title, path)
            }
        }
        if (!newProps.pathwayOnDisplay && this.props.pathwayOnDisplay) {
            if (window.location.pathname !== "/") {
                window.history.pushState(null, document.title, "/")
            }
        }
    }

    render() {
        setTextLang(this.getCurrentLang())
        const {
            user,
            lang,
            shouldDetailedFilterPanelExpand,
            pathwayOnDisplay,
            filterPanelHeight,
            onPathViewCloseButtonClick,
            onShadeClick,
            onFilterBarClick,
            onPathwayBoxClick,
        }= this.props

        return (
            <div style={style}>
                <TopBar
                    brandName={text(data.app.brandName)}
                    version={data.app.version}
                />
                <PathShowcase
                    paths={calcSuitablePaths(user, allTransitions)}
                    onClick={onPathwayBoxClick}
                />
                <PathwayDisplay
                    user={user}
                    pathOnDisplay={this.getPaths(pathwayOnDisplay)}
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
        pathwayOnDisplay: state.ui.pathwayOnDisplay,
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
        onPathwayBoxClick(path: Pathway) {
            dispatch(pathBoxClickAction(path))
        },
        onPathViewCloseButtonClick() {
            dispatch(pathViewCloseButtonClickAction())
        },
        onKeyDown(keyCode: number) {
            dispatch(keyDownAction(keyCode))
        },
        onUrlpathChange(path: string) {
            dispatch(urlpathChangeAction(path))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisaPlanner)
