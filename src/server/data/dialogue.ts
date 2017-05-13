import {LangId, MultiLangStringSet} from "../../definitions/auxillary/MultiLang"
import {clone} from "../../fe/utils/clone"
import {Person} from "../../definitions/Person"
import {
    EducationQuality,
    EducationStage,
    educationStageProfiles,
} from "../../definitions/Qualities/EducationExperience"
import {text} from "../../fe/utils/text"
import {data} from "../../data/index"
import {RegionId} from "../../definitions/auxillary/Region"
import {WechatChatbotUser} from "../middlewares/wechat"
import {Path} from "../../fe/utils/definitions"
import {calcSuitability, calcSuitablePaths} from "../../fe/utils/calcSuitablePaths"

type Response = string

interface Reducer<T> {
    (state: T, input: string): T
}

interface Template<T> {
    (state: T): string
}

interface Dialogue<T> {
    reduce: Reducer<T>
    text: Template<T>
}

const restartKeywords = ["重来", "reset"]

export function shouldReset(answer: string): boolean {
    return restartKeywords.includes(answer.toLowerCase())
}

const wrap = (markStart: string, markEnd: string) => (content: string) => markStart + content + markEnd

interface ReverseEducationNameTextTable {
    [text: string]: EducationStage
}

export function buildReverseStageTable(
    lang: LangId,
    profiles = educationStageProfiles
): ReverseEducationNameTextTable {
    const result: ReverseEducationNameTextTable = {}
    for (const entry of Object.entries(profiles)) {
        const displayText = text(entry[1].name, lang)
        const stage = entry[0] as EducationStage
        result[displayText] = stage
    }
    return result
}

const reverseEducationStageNameTable = buildReverseStageTable("zh_hans")

function getTransitionName(path: Path): string {
    return path.transitions.map(transition => {
        const region = data.getRegionById(transition.regionId)
        return text(region && region.name) + text(transition.name)
    })
        .join('\n')
}

export type TopicId =
    "initial"
    | "education_level"
    | "education_location"
    | "path_list"


export const wechatReduce: Reducer<WechatChatbotUser> = function(user, input) {
    const newUser = WechatChatbotUser.loadData(clone(user))
    newUser.history.push({
        timestamp: Date.now(),
        speaker: user.id,
        content: input
    })

    if (shouldReset(input)) {
        newUser.initialize()
        return newUser
    }
    switch (user.topic) {
        case "initial": {
            newUser.topic = "education_level"
            return newUser
        }
        case "education_level": {
            if (reverseEducationStageNameTable[input]) {
                newUser.person.education = [{
                    qualityId: "education",
                    stage: reverseEducationStageNameTable[input]
                } as EducationQuality]
                newUser.topic = "education_location"
                newUser.invalidInput = false
                return newUser
            }
            else {
                newUser.invalidInput = true
                return newUser
            }
        }
        case "education_location": {
            const region = data.regions.find(
                (region => text(region.name, "zh_hans") === input)
            )
            const regionId = region ? region.id : "world"

            if (newUser.person.education) {
                newUser.person.education[0].regionId = regionId
            }
            else {
                console.warn("Unexpected answer: ", input)
            }
            newUser.topic = "path_list"
            return newUser
        }
        case "path_list": {
            return newUser
        }
    }
}

export const wechatText: Template<WechatChatbotUser> = function(user) {
    let response: string = ""

    if (user.invalidInput) {
        response += `不好意思，没听懂「${user.history[user.history.length - 1].content}的意思，请再试一次：`
    }

    switch (user.topic) {
        case "initial": {
            response += `你好，我是维基迁徙机器人。请回复「开始」开始聊天，我会帮你想想怎么样出去比较好。
                         我们聊天的过城中，您可以随时回复${restartKeywords.join("或")}重新开始。`
            break
        }

        case "education_level": {
            response += "你的最高学历是什么？（本科？硕士？）"
            break
        }

        case "education_location": {
            response += "你的最高学历是在哪个国家或地区读的？"
            break
        }

        case "path_list": {
            const allTransitions = data.allTransitions
            const suitablePaths = calcSuitablePaths(user.person, allTransitions)
            const descriptions = suitablePaths.map(getTransitionName).join('\n')
            response += `你可以申请以下签证哟：\n${descriptions}`
            break
        }

        default: {
            console.error("Unimplemented exchange", user.topic)
            return ""
        }
    }

    return response
}

export const wechatDialog: Dialogue<WechatChatbotUser> = {
    reduce: wechatReduce,
    text: wechatText,
}

