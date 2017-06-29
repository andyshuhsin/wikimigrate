import { PrereqId } from '../../definitions/Prerequisites/BasePrereq'
import { MultiLangStringSet } from '../../definitions/auxiliary/MultiLang'

type PrereqTitleDict = {
    [id in PrereqId]: MultiLangStringSet
    }

export const prereqTitleDict: PrereqTitleDict = {
    education: {
        en: 'Education',
        zh_hans: '教育',
    },
    age: {
        en: 'Age',
        zh_hans: '年龄',
    },
    business: {
        en: 'business',
        zh_hans: '生意',
    },
    language_test: {
        en: 'Language',
        zh_hans: '语言',
    },
    right: {
        en: 'Right',
        zh_hans: '权利',
    },
    residence: {
        en: 'Residence',
        zh_hans: '居住',
    },
    work_experience: {
        en: 'Work Experience',
        zh_hans: '工作经验',
    },
    fund: {
        en: 'Fund',
        zh_hans: '资金',
    },
    certification: {
        en: 'Certification',
        zh_hans: '认证',
    },
    offer: {
        en: 'Offer',
        zh_hans: '工作合约',
    },
    union: {
        en: 'Union',
        zh_hans: '婚姻',
    },
    spouse: {
        en: 'Spouse',
        zh_hans: '夫妻',
    },
    nomination: {
        en: 'Nomination',
        zh_hans: '提名',
    },
    sibling: {
        en: 'Sibling',
        zh_hans: '兄弟姐妹',
    }
}

export default prereqTitleDict
