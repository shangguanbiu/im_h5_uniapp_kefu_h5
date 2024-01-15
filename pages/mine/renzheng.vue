<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('usercenter.l_nav6')}}</template>
		</cu-custom>
		<form>

			<view class="cu-form-group align-start">
				<view class="title">{{$t('usercenter.vip_p_desc9')}}</view>
				<textarea maxlength="-1" v-model="check_code" :placeholder="$t('usercenter.vip_p_desc10')"></textarea>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green lg" :style="saved ? 'border: solid 1px #dbdada;' : ''" :disabled="saved"
				@tap="saveInfo()">{{$t('mine.save')}}</button>
		</view>
	</view>
</template>

<script>
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	import {
		useloginStore
	} from '@/store/login'
	import pinia from '@/store/index'
	const loginStore = useloginStore(pinia)
	export default {
		components: {
			avatar
		},
		data() {
			return {
				loginStore: loginStore,
				globalConfig: loginStore.globalConfig,
				userInfo: {},
				sexList: [{
						id: '2',
						name: this.$t('mine.no_msg')
					},
					{
						id: '1',
						name: this.$t('mine.sex_nan')
					},
					{
						id: '0',
						name: this.$t('mine.sex_nv')
					},
				],
				saved: false,
				balance: '0.00',
				check_code: ''
			}
		},
		mounted() {
			// this.get_userInfo()
			// this.userInfo=JSON.parse(JSON.stringify(loginStore.userInfo));
		},
		methods: {
			to_fengmian() {
				uni.navigateTo({
					url: '/pages/mine/run_img'
				})
			},
			async get_userInfo() {
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/user/getUserInfo',
					method: "POST",
				})
				if (res.code == 200) {

					this.balance = res.data.balance
				}
			},
			logout() {
				let client_id = uni.getStorageSync('client_id');
				this.$api.LoginApi.logout({
					client_id: client_id
				}).then(res => {
					if (res.code == 0) {
						loginStore.logout()
					}
				})

			},
			textareaBInput(e) {
				this.userInfo.motto = e.detail.value
			},
			changeSex(evt) {
				this.userInfo.sex = parseInt(evt.detail.value);
			},
			async saveInfo() {
				if (this.check_code == '') {
					uni.showToast({
						title: this.$t('usercenter.vip_p_desc10'), //'请输入昵称',
						icon: 'none'
					})
					return false
				}
				// 防止无限次点击
				this.saved = true;


				// /api/front/user/validateCode
				const res = await this.$myRuquest({
					url: '/api/front/user/validateCode',
					method: "POST",
					data: {
						code: this.check_code
					},
				})
				if (res.code == 200) {
					uni.showToast({
						title: this.$t('usercenter.vip_p_pop_5'),
						icon: "none"
					})
				}

				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/mine/index"
					})
					
				}, 2000)
				// 8秒后可以重新保存
				setTimeout(() => {
					this.saved = false
					
					
				}, 8000)
			},
			setAvatar() {
				uni.navigateTo({
					url: "/pages/mine/avatar"
				})
			},
			uploadAvatar(res) {
				uni.showLoading({
					title: this.$t('mine.set_t_1') //'上传中...'
				})
				uni.uploadFile({
					url: this.$api.msgApi.uploadAvatar,
					filePath: res.path,
					name: 'file',
					header: {
						'Authorization': uni.getStorageSync('authToken'),
					},
					formData: {
						ext: 'png'
					},
					success: (e) => {
						uni.hideLoading();
						let res = JSON.parse(e.data);
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							this.userInfo.avatar = res.data
							let data = JSON.parse(JSON.stringify(this.userInfo));
							loginStore.login(data);
						}
					},
					fail: (res) => {
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>

</style>