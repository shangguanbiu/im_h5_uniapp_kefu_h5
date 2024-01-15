import {
	createI18n
} from "vue-i18n";

import zhCN from './langs/zh-CN'
import en from './langs/en'
import zh from './langs/zh'
import {
	useloginStore
} from '@/store/login'
import pinia from '@/store/index'
const loginStore = useloginStore(pinia)
const messages = {
	en, //英语
	zhCN, //中文繁体
	zh, //中文
	


}
// 创建 i18n 实例


const i18n = createI18n({
	legacy: false,
	globalInjection:true,
	locale:loginStore.language,
	messages: messages,
	globalInjection: true,
});

export default i18n