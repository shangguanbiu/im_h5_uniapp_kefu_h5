<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('usercenter.vip_p_title')}}</template>
		</cu-custom>
		<view style="padding: 10px;max-height: 200px; position: relative;">
			<image src="@/static/image/vip_top.png" mode='widthFix' style="width: 100%;max-height: 200px;">
			</image>
			<view class="item_btn" v-if="userinfo.islevel==0" @tap="to_vip"
				style="position: absolute;right: 32px; top: 70px;">{{$t('usercenter.vip_p_open')}}</view>
			<view class="item_btn" v-else @tap="to_vip" style="position: absolute;right: 32px; top: 70px;">{{$t('usercenter.vip_p_up')}}</view>
			<!-- <view v-else></view> -->
			<view class="vip_are_p">
				<image :src="userinfo.avatar" mode='widthFix'
					style="height: 30px; width: 30px; border-radius: 50%; margin-right: 5px;">
				</image>

				<view v-if="userinfo.islevel==0" style="font-size: 15px; font-weight: bold;">{{$t('usercenter.vip_p_desc1')}}</view>
				<view v-if="userinfo.islevel==21" style="font-size: 15px; font-weight: bold;">{{$t('usercenter.vip_p_desc2')}}</view>
				<view v-if="userinfo.islevel==22" style="font-size: 15px; font-weight: bold;">{{$t('usercenter.vip_p_desc3')}}</view>
				<view v-if="userinfo.islevel==23" style="font-size: 15px; font-weight: bold;">{{$t('usercenter.vip_p_desc4')}}</view>
			</view>
		</view>
		<view class="tab_line">
			<view class="tab_l_zi_are "  v-for="(vipitem,t_index) in list" :key="t_index"
				:class="{'tab_l_zi_hover':type_l1==t_index}" @click="change_tab(t_index)" >
				<view class="tab_l_zi">
					<view class="tab_l_top">{{vipitem.price}}元</view>
					<view class="tab_l_day">
						{{vipitem.name}}
					</view>
					<view style="text-align: center;">

					</view>
					<view class="tab_l_ft" v-if="vipitem.istype==0">
						{{$t('usercenter.vip_p_desc8')}}{{vipitem.price}}/{{$t('usercenter.vip_p_desc5')}}
					</view>
					<view class="tab_l_ft" v-if="vipitem.istype==1">
						{{$t('usercenter.vip_p_desc8')}}{{vipitem.price}}/{{$t('usercenter.vip_p_desc6')}}
					</view>
					<view class="tab_l_ft" v-if="vipitem.istype==2">
						{{$t('usercenter.vip_p_desc8')}}{{vipitem.price}}/{{$t('usercenter.vip_p_desc7')}}
					</view>
				</view>
			</view>


		</view>
		<view v-show="type_l1==0" class="vip_ft">
			<view class="vip_tit">
				{{$t('usercenter.vip_p_main')}}
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/vip.jpg" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						{{$t('usercenter.vip_p_nav1')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_1')}}
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/vip.jpg" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						{{$t('usercenter.vip_p_nav2')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_2')}}
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/right.png" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						{{list.length!==0?list[type_l1].iszan:0}}{{$t('usercenter.vip_p_nav3')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_3')}}
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/vip.jpg" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						
						{{$t('usercenter.vip_p_nav4')}}{{list.length!==0?list[type_l1].isview:0}}{{$t('usercenter.vip_p_nav4s')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_4')}}
						
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/vip.jpg" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						
						{{$t('usercenter.vip_p_nav5')}}
					</view>
					<view class="vip_tit_zi">
						
						{{$t('usercenter.vip_p_nav1_5')}}
					</view>
				</view>
			</view>
		</view>
		<view v-show="type_l1==1" class="vip_ft">
			<view class="vip_tit">
				{{$t('usercenter.vip_p_main')}}
			</view>

			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/vip.jpg" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						{{$t('usercenter.vip_p_nav2')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_2s')}}
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/right.png" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						{{list.length!==0?list[type_l1].iszan:0}}{{$t('usercenter.vip_p_nav3')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_3')}}
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/vip.jpg" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						{{$t('usercenter.vip_p_nav4')}}{{list.length!==0?list[type_l1].isview:0}}{{$t('usercenter.vip_p_nav4s')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_4')}}
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/vip.jpg" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						{{$t('usercenter.vip_p_nav5')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_5')}}
					</view>
				</view>
			</view>
		</view>
		<view v-show="type_l1==2" class="vip_ft">
			<view class="vip_tit">
				{{$t('usercenter.vip_p_main')}}
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/vip.jpg" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						{{$t('usercenter.vip_p_nav2')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_2')}}
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/right.png" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;" v-if="list.length!==0">
					<view class="vip_tit_zit">
						{{list[type_l1].iszan>999?$t('usercenter.vip_p_nav3s'):list[type_l1].iszan}}{{$t('usercenter.vip_p_nav3')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_3')}}
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 10px 0;" v-if="list.length!==0">
				<view>
					<image src="@/static/image/vip.jpg" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						
						{{$t('usercenter.vip_p_nav4')}}{{list[type_l1].isview>999?$t('usercenter.vip_p_nav3s'):list[type_l1].isview}}{{$t('usercenter.vip_p_nav4s')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_4')}}
					</view>
				</view>
			</view>
			<view style="display: flex;padding: 10px 0;">
				<view>
					<image src="@/static/image/vip.jpg" mode='widthFix' style="width:50px;">
					</image>
				</view>
				<view style="margin-left: 10px;">
					<view class="vip_tit_zit">
						{{$t('usercenter.vip_p_nav5')}}
					</view>
					<view class="vip_tit_zi">
						{{$t('usercenter.vip_p_nav1_5')}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { useloginStore } from '@/store/login'
	import pinia from '@/store/index'
	const loginStore = useloginStore(pinia)
	export default {
		data() {
			return {
				type_l1: 0,
				userinfo: {},
				list: [],
				balance: 0
			}
		},
		methods: {
			change_tab(type) {

				this.type_l1 = type

			},
			getList() {
				this.$api.third_openApi.get_level_list(this.params).then((res) => {
					if (res.code == 0) {
						this.list = res.data.data;
					}
				})
			},
			async get_userinfo_im(){
				let userInfo = JSON.parse(JSON.stringify(loginStore.userInfo))
				const res = await this.$myRuquest({
					url: '/api/front/index/getImUserInfo',
					method: "POST",
					data: {
						user_id: userInfo.user_id
					},
				})
				if (res.code == 200) {
					this.userinfo =res.data
					let data=JSON.parse(JSON.stringify(res.data))
					loginStore.login(data)
				
				}
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
			async to_vip() {
				if (this.balance == 0 || this.balance < this.list[this.type_l1].price) {
					uni.showToast({
						title: this.$t('usercenter.vip_p_pop_1'),
						icon: "none"
					});
					return
				}
				if(this.userinfo.islevel==this.list[this.type_l1].id){
					uni.showToast({
						title:this.$t('usercenter.vip_p_pop_2'),
						icon: "none"
					})
					return
				}
				if(this.userinfo.islevel>this.list[this.type_l1].id){
					uni.showToast({
						title: this.$t('usercenter.vip_p_pop_3'),
						icon: "none"
					})
					return
				}
				const res = await this.$myRuquest({
					url: '/api/front/index/changeImUserData',
					method: "POST",
					data: {
						user_id: this.userinfo.user_id,
						islevel: this.list[this.type_l1].id
					},
				})
				if (res.code == 200) {
					uni.showToast({
						title: this.$t('usercenter.vip_p_pop_4'),
						icon: "none"
					})
					this.userinfo.islevel=this.list[this.type_l1].id
					let data=JSON.parse(JSON.stringify(this.userinfo))
					loginStore.login(data)
				
				}

			}
		},
		onShow() {
			this.getList()
			this.get_userInfo()
			this.get_userinfo_im()
			// this.userinfo = JSON.parse(JSON.stringify(loginStore.userInfo))
			// console.log('ffff',this.userinfo)
		}
	}
</script>

<style scoped>
	.tab_line {
		display: flex;
		justify-content: center;
		padding: 10px;
	}

	.tab_l_zi_are {
		width: 30%;
		margin: 1.5%;
	}

	.tab_l_zi {
		border: 5px solid #f9f0e7;
		border-radius: 10px;
		position: relative;
		width: 100%;
		padding-bottom: 10px;
	}

	.tab_l_top {
		height: 30px;
		width: 70%;
		position: absolute;
		top: -15px;
		left: 15%;
		background: #f9f0e7;
		color: #e5c4a1;
		text-align: center;
		line-height: 30px;
		border-radius: 5px;
	}

	.tab_l_day {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		padding-top: 25px;
	}

	.tab_l_ft {
		text-align: center;
		color: #dfa061;
		padding-top: 15px;
	}

	.tab_l_zi_hover .tab_l_top {
		background: #dfa061;
		color: #fff;
	}

	.tab_l_zi_hover .tab_l_zi {
		border: 5px solid #dfa061;
	}

	.vip_ft {
		padding: 10px;
	}

	.vip_tit {
		font-weight: bold;
		font-size: 14px;
		color: #999999;
		padding-bottom: 15px;
	}

	.vip_tit_zit {
		font-weight: bold;
		font-size: 13px;
		color: #333;
		line-height: 30px;
	}

	.vip_tit_zi {
		font-size: 13px;
		color: #999;
	}

	.vip_are_p {
		font-size: 13px;
		color: #b67d54;
		display: flex;
		position: absolute;
		left: 35px;
		bottom: 40px;
		z-index: 20px;
		align-items: center;
	}

	.item_btn {
		background: linear-gradient(50deg, #8e3aca, #e6557f);
		color: #fff;
		width: 30%;
		text-align: center;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 14PX;
		padding: 0.7rem 1rem;
		margin-bottom: 0.33333rem; font-weight: bold;

	}
</style>