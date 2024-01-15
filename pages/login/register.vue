<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('register.title')}}</template>
		</cu-custom>
		<view style="height:100rpx;"></view>
		<view class="padding im-flex im-rows im-justify-content-center mb-10">
			<view class="im-flex im-rows im-justify-content-center">
				<image class="login-logo " :src="globalConfig.sysInfo.logo ?? packData.logo" mode="fixWidth"></image>

			</view>
		</view>
		<view class="im-flex im-rows im-justify-content-center">{{globalConfig.sysInfo.name ?? packData.name}}</view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">{{$t('register.tit_l1')}}</view>
				<input :placeholder="$t('register.tit_l1_p1')" class="uni-input" maxlength="32" name="input"
					v-model="regForm.account" @input="handleInput" />
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">{{$t('register.tit_l2')}}</view>
				<input :placeholder="$t('register.tit_l1_p2')" maxlength="32" name="input" v-model="regForm.realname" />
			</view>
			<!-- <view class="cu-form-group" v-if="parseInt(globalConfig.sysInfo.regauth)">
				<view class="title">验证码</view>
				<input placeholder="请输入验证码" maxlength="6" name="input" v-model="regForm.code"/>
				<button class='cu-btn bg-blue shadow' @tap="sendCode">发送验证码</button>
			</view> -->

			<view class="cu-form-group">
				<view class="title">{{$t('register.tit_l3')}}</view>
				<input :placeholder="$t('register.tit_l1_p3')" maxlength="32" type="password" name="input"
					v-model="regForm.password" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('register.tit_l4')}}</view>
				<input :placeholder="$t('register.tit_l1_p4')" maxlength="32" type="password" name="input"
					v-model="regForm.repass" />
			</view>
			<!-- <view class="cu-form-group" >
				<view class="title">验证码</view>
				<input placeholder="请输入验证码" maxlength="6" name="input" v-model="regForm.code"/>
				<image :src="base_url+'/api/front/captcha/index?t='+time" @click="run_time" mode='widthFix'
					style="width: 114px;"></image>
				
			</view> -->
		</form>
		<view class="flex flex-direction im-login-btn">
			<button class="cu-btn lg bg-pink" @tap="login()">{{$t('register.ok')}}</button>
		</view>
		<!-- <view class="footer-version c-999">
			{{globalConfig.sysInfo.name ?? packData.name}} for {{packData.version}}
		</view> -->
	</view>
</template>

<script>
	import {
		useloginStore
	} from '@/store/login'
	import pinia from '@/store/index'
	import packageData from "../../package.json"
	const loginStore = useloginStore(pinia)
	export default {
		data() {
			return {
				regForm: {
					account: '',
					realname: '',
					password: '',
					repass: '',
					code: ''
				},
				forget: false,
				packData: packageData,
				globalConfig: loginStore.globalConfig,
				base_url: '',
				time: parseInt(new Date().getTime() / 1000),
			}
		},
		watch: {
			forget(val) {
				if (val) {
					this.regForm.password = '123456';
				}
			}
		},
		mounted() {
			this.base_url = this.$baseurl()
		},
		methods: {
			isHongKongPhoneNumber(phone) {
				// 定义香港手机号的正则表达式规则
				var regex = /^(\+?852|0)?[6-9]\d{7}$/;

				return regex.test(phone);
			},
			run_time() {
				this.time = parseInt(new Date().getTime() / 1000)
			},
			handleInput(event) {
				let value = event.detail.value;
				let filteredValue = value.replace(/[\u4e00-\u9fa5]/g, '');
				this.regForm.account = filteredValue;
			},
			sendCode() {
				if (!this.regForm.account) {
					uni.showToast({
						title: '请输入账号！',
						icon: "none"
					});
					return false;
				}

				let data = {
					account: this.regForm.account,
					type: 2
				}
				this.$api.LoginApi.sendCode(data).then((res) => {
					uni.showToast({
						title: res.msg,
						icon: "none"
					});
				})
			},
			async check_yan_zm() {
				if (this.regForm.code == '') {
					uni.showToast({
						title: '请输入验证码！',
						icon: "none"
					});
					return false;

				}
				const res = await this.$myRuquest({
					method: 'Post',
					url: '/api/front/user/checkCode',

					data: {
						code: this.regForm.code,
					}
				})
				if (res.code == 200) {

				}
			},
			login() {
				// if (!this.isHongKongPhoneNumber(this.regForm.account)) {
				// 	uni.showToast({
				// 		title: '请输入正确格式手机号码,852...',
				// 		icon: "none"
				// 	});
				// 	return false;
				// }
				if (this.regForm.account == "") {
					uni.showToast({
						title: this.$t('register.pop_tit1'), // '请输入账号！',
						icon: "none"
					});
					return false;
				}
				if (this.regForm.realname == "") {
					uni.showToast({
						title: this.$t('register.pop_tit2'), //  '请输入用户名或者昵称！',
						icon: "none"
					});
					return false;
				}
				if (this.regForm.password == "" && this.regForm.password.length < 6 && this.regForm.password > 16) {
					uni.showToast({
						title: this.$t('register.pop_tit3'), //  '请输入6-16位密码！',
						icon: "none"
					});
					return false;
				}
				if (this.regForm.password != this.regForm.repass) {
					uni.showToast({
						title: this.$t('register.pop_tit4'), // '两次密码输入不相同！',
						icon: "none"
					});
					return false;
				}
				this.$api.LoginApi.register(this.regForm).then(res => {
					if (res.code == 0) {
						this.check_if_friend(res.data.user_id)
					}
				})

			},
			async check_if_friend(invite_after) {
				let fromUser = 2
				var user_arr = new Array()
				user_arr.push(fromUser)
				user_arr.push(invite_after)
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/index/saveImUser',
					method: "POST",
					data: {
						users: user_arr.toString()
					}
				})
				if (res.code == 200) {
					this.sendMessage(invite_after)

				}
			},
			async sendMessage(toContactid) {

				//提前判断每日剩余打招呼的次数
				let fromUser = 2
				let msg = {
					id: this.$util.getUuid(),
					from_user: fromUser,
					to_user: toContactid,
					content: this.$t('welcome'), // '欢迎加入喇叭花，我是人工接待员将为您24小时咨询服务',
					create_time: new Date().getTime() / 1000
				}

				const res = await this.$myRuquest({
					url: '/api/front/index/changeImMessageData',
					method: "POST",
					data: msg,

				})
				if (res.code == 200) {
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/index'
						})
					}, 2000)
				}
			}
		}
	}
</script>

<style scoped>
	.login-logo {
		width: 180rpx;
		height: 180rpx;
		font-size: 80rpx;
		text-align: center;
		line-height: 120rpx;
		border-radius: 18rpx;
	}

	.footer-version {
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 40rpx;
	}

	.remark-title {
		font-weight: 600;
	}

	.im-reg-btn {
		padding: 30rpx;
	}

	.im-login-btn {
		padding: 30rpx;
	}

	.forget {
		padding: 30rpx;
		text-align: right;
	}
</style>