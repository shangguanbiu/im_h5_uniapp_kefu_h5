import {
	defineStore
} from 'pinia'
import LoginApi from '@/api/login.js'
export const useloginStore = defineStore({
	id: 'login', // id必填，且需要唯一
	state: () => {
		return {
			userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {},
			globalConfig: uni.getStorageSync('globalConfig') ? uni.getStorageSync('globalConfig') : [],
			appSetting: uni.getStorageSync('appSetting') ? uni.getStorageSync('appSetting') : [],
			multiport: false,
			language: uni.getStorageSync('language') ? uni.getStorageSync('language') : 'zhCN',
		}
	},
	// actions 用来修改 state
	actions: {
		login(userInfo) {
			uni.setStorageSync('userInfo', userInfo)
			this.userInfo = userInfo
		},
		set_language(data) {

			this.language = data
			uni.setStorageSync('language', data)

		},
		logout() {
			uni.removeStorageSync('userInfo');
			uni.removeStorageSync("authToken");
			this.userInfo = {};
			uni.reLaunch({
				url: "/pages/login/index"
			})
		},
		getGlobalConfig() {
			LoginApi.getSystemInfo().then((res) => {
				this.globalConfig = res.data;
				uni.setStorageSync('globalConfig', res.data)
			})
		},
		setAppSetting(setting) {
			uni.setStorageSync('appSetting', setting)
			this.appSetting = setting
		}
	}
})