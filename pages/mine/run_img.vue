<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('fengmian.title')}}</template>
		</cu-custom>
		<form>
			<view class="tab_mline">
				<view class="tab_mline_zi" v-for="(tabsitem,index_tab) in tabs_arr" :key="index_tab"
					@click="tab_change(index_tab)" :class="{'tab_hover':tabs==index_tab}">
					{{tabsitem.name}}
				</view>

			</view>
			<view v-if="tabs==0" style="position: relative; width: 100%; height: 80vh;">
				<view v-if="userInfo.nearby_img !==null" class="fengmian_are"
					:style="[{backgroundImage:'url('+ userInfo.nearby_img +')'}]">
				</view>
				<view
					style="position: absolute;top: 31%; font-size: 50px; text-align: center; left: 41%; height: 100px; width: 100px;">
					<view class="cuIcon-camera" style="margin-bottom: -60px; color: #ec008c;"></view>
					<avatar selWidth="300px" selHeight="640px" @upload="uploadAvatar"
						avatarStyle="width:480px; height:1200px" mode="circle">
					</avatar>
				</view>

			</view>
			<view v-else class="fengmian_are">
				<view style="width:100%; margin: 10px 0;" v-for="(imgitem,index) in bannerdata" :key="index">
					<view
						style="padding: 10px; border: 1px solid #cccc; border-radius: 6px; display: flex; justify-content: space-between;">
						<view style="height: 80px; width: 80px;">
							<image :src="imgitem" style="width: 100%;max-height: 80px;" mode='widthFix'>
							</image>
						</view>
						<view style="line-height: 80px; color: #ec008c;" @tap="del_img(index)">{{$t('fengmian.del')}}</view>
					</view>

				</view>
				<view class="padding flex flex-direction">
					<view style=" height: 88px; overflow: hidden; width: 90%; margin: auto; position: relative;">
						<view style=" position: absolute;left: 0; top: 0; height: 50px; width: 100%; z-index: 10;">
							<avatar selWidth="350px" selHeight="380px" @upload="uploadAvatar_detail"
								avatarStyle="width:480px; height:450px" mode="circle">
							</avatar>
						</view>
						
						
						<view class="cu-btn bg-green lg" style="width: 100%;">{{$t('fengmian.sel_img')}}</view>
					</view>
					<button class="cu-btn bg-pink lg" :style="saved ? 'border: solid 1px #dbdada;' : ''"
						:disabled="saved" @tap="saveInfo()">{{$t('fengmian.save')}}</button>
				</view>
			</view>

		</form>

	</view>
</template>

<script>
	import {
		useloginStore
	} from '@/store/login'
	import pinia from '@/store/index'
	import avatar from "@/components/yq-avatar/yq-avatar2.vue";
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
						name: '未知'
					},
					{
						id: '1',
						name: '男'
					},
					{
						id: '0',
						name: '女'
					},
				],
				saved: false,
				balance: '0.00',
				tabs_arr: [{
					id: 1,
					name: this.$t('fengmian.tab1'),
					ifshow: false
				}, {
					id: 2,
					name: this.$t('fengmian.tab2'),
					ifshow: false
				}, ],
				tabs: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				bannerdata: [],
				indicatorColor: "#292b40",
				indicatorActiveColor: "#ffffff",
			}
		},
		mounted() {
			this.get_userInfo()
			this.userInfo = JSON.parse(JSON.stringify(loginStore.userInfo));


			this.bannerdata = this.userInfo.nearby_arr.split(',')
		},
		methods: {
			del_img(index) {
				this.bannerdata.splice(index, 1);
			},
			tab_change(index) {
				this.tabs = index

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
			saveInfo() {
				this.saved = true;
				let params = {
					nearby_arr: this.bannerdata.toString()
				}
				this.$api.msgApi.updateUserInfo_imgarr(params).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: this.$t('fengmian.sucess'),//'保存成功',
							icon: 'none'
						})
						this.userInfo.nearby_arr = JSON.stringify(this.bannerdata)
						let data = JSON.parse(JSON.stringify(this.userInfo))
						loginStore.login(data)
					}
				})
				// 8秒后可以重新保存
				setTimeout(() => {
					this.saved = false;
				}, 8000)
			},
			setAvatar() {
				uni.navigateTo({
					url: "/pages/mine/avatar"
				})
			},
			uploadAvatar(res) {
				uni.showLoading({
					title: this.$t('fengmian.upload')//'上传中...'
				})
				uni.uploadFile({
					url: this.$api.msgApi.uploadAvatar_fengmian,
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
							this.userInfo.nearby_img = res.data
							let data = JSON.parse(JSON.stringify(this.userInfo));
							loginStore.login(data);
						}
					},
					fail: (res) => {
						uni.hideLoading();
					}
				})
			},
			uploadAvatar_detail(res) {
				uni.showLoading({
					title: this.$t('fengmian.upload')//'上传中...'
				})
				uni.uploadFile({
					url: this.$api.msgApi.uploadAvatar_detail,
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
							this.bannerdata.push(res.data)
							// uni.showToast({
							// 	title: res.msg,
							// 	icon: 'none'
							// })
							// this.userInfo.nearby_img = res.data
							// let data = JSON.parse(JSON.stringify(this.userInfo));
							// loginStore.login(data);
						}
					},
					fail: (res) => {
						uni.hideLoading();
					}
				})
			},
		}
	}
</script>

<style scoped>
	.tab_mline {
		display: flex;
		justify-content: center;
		padding: 20px 0;

	}

	.fengmian_are {
		width: 96%;
		margin: auto;
		height: 83vh;
		background-size: 100% 100%;
		background-position: top center;

	}

	.tab_mline_zi {

		font-size: 13px;
		color: #646566;
		width: 25%;
		text-align: center;

	}


	.tab_ico {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}

	.tab_hover {
		color: #9c26b0;
		position: relative;
	}

	.tab_hover::after {
		content: '';
		height: 2px;
		width: 50%;
		background: #9c26b0;
		position: absolute;
		left: 25%;
		bottom: -8px;
	}
</style>