<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('set.title')}}</template>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">{{$t('set.new_msg')}}</view>
		</view>

		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text>{{$t('set.notice_t')}}</text>
				</view>
				<view class="action">
					<switch class="switch" @change="setVoice" :class="setting.voiceStatus?'checked':''"
						:checked="setting.voiceStatus"></switch>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text>{{$t('set.notice_t1')}}</text>
				</view>
				<view class="action">
					<switch class="switch" @change="setVibrate" :class="setting.vibrateStatus?'checked':''"
						:checked="setting.vibrateStatus"></switch>
				</view>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">{{$t('set.notice_t2')}}</view>
		</view>

		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text>{{$t('set.notice_t3')}}</text>
				</view>
				<view class="action">
					<switch class="switch" @change="setAvatar" :class="setting.circleAvatar?'checked':''"
						:checked="setting.circleAvatar"></switch>
				</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text>{{$t('set.language')}}</text>
				</view>
				<view class="action">
					<view @click="show_more=true">
						<view v-if="language=='zh'">简体中文</view>
						<view v-if="language=='zhCN'">繁体中文</view>
						<view v-if="language=='en'">English</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="show_more" class="type_more">
			<view style="padding-top: 50px;">
				<view class="type_tit">{{$t('set.language')}}</view>

				<view class="type_zi" :class="{'type_get':index_get==inde_t}" v-for="(typeitem,inde_t) in type_list"
					:key="inde_t" @click="get_type(typeitem,inde_t,1)">
					{{typeitem.name}}
				</view>

			</view>
			<view class="type_close" @click="get_type('','',2)">{{$t('set.ok')}}</view>
		</view>
	</view>
</template>

<script>
	import {
		useloginStore
	} from '@/store/login'
	import pinia from '@/store/index'
	const loginStore = useloginStore(pinia)


	export default {
		data() {
			return {
				loginStore: loginStore,
				globalConfig: loginStore.globalConfig,
				setting: {
					voiceStatus: true,
					vibrateStatus: false,
					circleAvatar: false
				},
				language: '',
				type_list: [{
					id: 1,
					name: this.$t('set.pop_tit1'),
					valus: 'zh'
				}, {
					id: 2,
					name: this.$t('set.pop_tit2'),//"繁体中文",
					valus: 'zhCN'
				}, {
					id: 3,
					name: this.$t('set.pop_tit3'),//"english",
					valus: 'en'
				}, ],
				show_more: false,
				index_get: 0
			}
		},
		created() {
			let setting = uni.getStorageSync('appSetting') ?? '';
			this.language = loginStore.language

			if (this.language == 'zh') {
				this.index_get = 0
			} else if (this.language == 'zhCN') {
				this.index_get = 1
			} else {
				this.index_get = 2
			}
			if (setting) {
				this.setting = setting;
			}
		},
		methods: {
			setVoice(e) {
				this.setting.voiceStatus = e.detail.value
				this.saveSet();
			},
			setVibrate(e) {
				this.setting.vibrateStatus = e.detail.value
				this.saveSet();
			},
			setAvatar(e) {
				this.setting.circleAvatar = e.detail.value
				this.saveSet();
			},
			saveSet() {
				loginStore.setAppSetting(this.setting)
			},
			get_type(data, index, type) {
				if (type == 1) {
					this.index_get = index
				} else {

					loginStore.set_language(this.type_list[this.index_get].valus)
					this.language = loginStore.language
					this.show_more = false
					this.$i18n.locale = this.type_list[this.index_get].valus

				}



			}
		}
	}
</script>

<style scoped>
	.type_more {
		height: 100vh;
		width: 50vw;
		background: rgb(0 0 0 / 76%);
		position: fixed;
		top: 0;
		right: 0;
		z-index: 999;
	}

	.type_tit {
		font-size: 14px;
		color: #e6557f;
		text-align: center;
		line-height: 40px;
	}

	.type_zi {
		font-size: 14px;
		color: #fff;
		border-radius: 5px;
		width: 80%;
		margin: 10px auto;
		line-height: 35px;
		background-color: #e6557f;
		text-align: center;
	}

	.type_get {
		font-size: 14px;
		color: #fff;
		border-radius: 5px;
		width: 80%;
		margin: 10px auto;
		line-height: 35px;
		background-color: #e6859f;
		text-align: center;
	}

	.type_close {
		font-size: 14px;
		color: #e6557f;
		border: 1px solid #e6557f;
		border-radius: 5px;
		width: 80%;
		margin: 10px auto;
		line-height: 35px;
		text-align: center;
	}
</style>