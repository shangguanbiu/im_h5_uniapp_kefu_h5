<template>
	<view style="background-color: #190D30;">
		<!-- <cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<template #backText></template>
			<template #content>影院</template>
		</cu-custom> -->
		<view class="index_topline" style="display: none;">
			<view class="index_top_l" style="width: 47px;" @click="to_notice">
				<!-- <view id="backBtn" style="padding-top: 5px; color: #EAC477; padding-left: 10px; line-height: 32px;">聊天室
				</view> -->
				<view style="padding-top: 5px;">
					<image src="@/static/image/ding.png" style="width:25px;height: 25px;  margin-top: 3px; "
						mode='widthFix' />
				</view>
			</view>
			<view class="index_top_mdl"></view>
			<view class="index_top_l">
				<!-- <view style="padding-top: 5px;">
					<image src="@/static/image/ding.png" style="width:25px;height: 25px;  margin-top: 3px; "
						mode='widthFix' />
				</view> -->
			</view>
		</view>
		<view class="page-section swiper">
			<view style="position: relative;">
				<swiper :indicator-dots="indicatorDots" :indicator-color="indicatorColor"
					:indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval"
					:duration="duration" style="width: 100%; height: 210px;" >
					<!-- v-if="bannerdata.length !==0" -->
					<swiper-item v-for="(banner,indexbn) in bannerdata" :key="indexbn">
						<image :src="banner.img" mode='widthFix' style="width: 100%;"></image>
					</swiper-item>

				</swiper>
			</view>
			<view style="width: 100vw; display:flex; background-color: #fffbe8;">
				<!-- <van-notice-bar left-icon="volume-o" :scrollable="true" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" /> -->
				<view class="laba">
					<view class="cuIcon-notificationfill"></view>
				</view>
				<view style="flex: 1; height: 40px; overflow: hidden;">
					<uni-notice-bar :single="true" :scrollable="true" :speed="60" :text="run_text_string" />

				</view>
			</view>
			<view class="main_i">
				
				<view class="title_line">{{$t('index.part_1')}}<view class="type_more" @tap="to_more">{{$t('index.more')}}</view>
				</view>
				<view class="index_lanmu">
					<view class="index_lm_zi" @click="on_func_notice(roomitem)" v-for="(roomitem,index) in room"
						:key="index">
						<view class="index_lm_zim">
							<image :src="roomitem.img" style="width:100%;" mode='widthFix'>
							</image>
							<view class="tit_a">{{roomitem.name}}</view>
							<view class="tit_adesc">{{roomitem.desc}}</view>

						</view>
					</view>
				</view>
				<view class="title_line">{{$t('index.part_2')}}<view class="type_more" @tap="to_more">{{$t('index.more')}}</view>
				</view>
				<view style="padding-bottom: 55px;">
					<view class="user_line" v-for="(people,t_index) in hot_list" :key="t_index"
						@click="on_func_notice(people)">
						<view class="user_l">
							<image :src="people.img" mode='widthFix' style="width: 100%;">
							</image>
						</view>
						<view class="user_r">
							<view class="item_name">{{people.name}}</view>
							<view style=" max-height: 90px;">
								<view class="item_desc">{{people.desc}}</view>
								<view>
									<view :class="'item_'+ta_index" v-if="people.hot_tags !==null"
										v-for="(tagitem,ta_index) in people.hot_tags.split(',')" :key="ta_index"
										v-show="ta_index<3">
										{{tagitem}}
									</view>
								</view>
							</view>

							<view style="display: flex;">
								<view class="cuIcon-attentionfavor l_ft_r" style="font-size: 14px;"></view>
								<view class="l_ft_r">{{people.view_count}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view v-show="pop_notice">
			<view class="com_bg"></view>
			<view class="com_main">
				<view class="pop_mian">
					<view class="pop_title">{{$t('pop.title')}}</view>
					<view
						style="padding: 10px 15px; display:flex; justify-content: flex-start; line-height: 25px; flex-wrap: wrap;">
						{{$t('pop.content2')}}
					</view>

					<view class="pop_foot">
						<view class="pop_ft_btn1" @tap="pop_notice=false">{{$t('pop.close')}}</view>
						<view class="pop_ft_btn2" @tap="pop_ok()">{{$t('pop.up')}}</view>
					</view>
				</view>
			</view>
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
				pop_notice: false,
				getitem: 0,
				if_long: false,
				scrollW: 0,
				show_login: false,
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,

				list_t: [],

				bannerdata: [],
				indicatorColor: "#292b40",
				indicatorActiveColor: "#ffffff",
				show_team: false,
				team: '',
				get_data: '',
				compay_name: '正在获取中正在获取中',
				select_compay: false,
				compay_list: [],
				if_login_check: false,
				compay_id: '',

				index_ico: '', // require("@/static/image/shouye.png"),
				index_ico_h: '', // require("@/static/image/shouye_hover.png"),
				cz_ico: '', //require("@/static/image/chongzhi.png"),
				cz_ico_h: '', // require("@/static/image/chongzhi_hover.png"),
				kf_ico: '', //require("@/static/image/kefu.png"),
				kf_ico_h: '', // require("@/static/image/kefu_hover.png"),
				user_ico: '', //require("@/static/image/wode.png"),
				user_ico_h: '', // require("@/static/image/wode_hover.png"),
				index_ft_bg: '', // require("@/static/image/logo_mg.png"),

				room: [],
				list: [],
				hot_list: [],
				run_txt: [],
				run_text_string: '',
				userinfo: {},
				back:false,

			}
		},
		props: ['run'],
		watch: {
			$route(val) {
				if (val.fullPath == '/') {
					
					//this.get_banner(1)//待确定
					this.back=true
					this.get_notice(2);
					this.getList(1, 6, 1);
					this.getList(2, 10, 2);
					
				}
			}
		},
		methods: {
			// function 调用uniapp的 方法
			pop_ok() {
				uni.navigateTo({
					url: '/pages/movie/kefu/kefu'
				});
			},
			postMsg() {
				uni.switchTab({
					url: '/pages/index/index',
				});
			},
			async get_userinfo() {
				let userInfo = JSON.parse(JSON.stringify(loginStore.userInfo))
				const res = await this.$myRuquest({
					url: '/api/front/index/getImUserInfo',
					method: "POST",
					data: {
						user_id: userInfo.user_id
					},
				})
				if (res.code == 200) {

					this.userinfo = res.data
					let data = JSON.parse(JSON.stringify(res.data))
					loginStore.login(data)

				}
			},

			on_func_notice(data) {

				if (this.userinfo.isview == 0 && this.userinfo.role == 0) {
					this.pop_notice = true
					return;
				}

				uni.setStorageSync('movice_info', data)
				uni.navigateTo({
					url: '/pages/movie/list/detial?id=' + data.id,
				});
				return

				var had_token = uni.getStorageSync('token')
				if (had_token == '') {
					this.show_login = !this.show_login
					return
				}
				if (this.userinfo.level == 0 || this.userinfo.level == undefined) {
					Toast.fail("您等級未達到進入房間最低要求，不可進入");
					return
				}
				if (Number(data.member_level_limit) > Number(this.userinfo.level)) {
					Toast.fail("您等級未達到進入房間最低等級要求，不可進入");
					setTimeout(function() {
						Toast.clear()

					}, 1000)

					return

				} else {
					uni.navigateTo({
						url: '/pages/room/room?pid=' + data.id + '&room_name=' + data.name,
					});
				}

			},
			jump(type) {
				if (type == 1) {
					uni.navigateTo({
						url: '/pages/movie/index/index',
					});
				} else if (type == 2) {
					uni.navigateTo({
						url: '/pages/movie/list/index'
					});
				} else if (type == 3) {
					uni.navigateTo({
						url: "/pages/movie/bet/bet",
					});
				} else if (type == 4) {
					uni.navigateTo({
						url: '/pages/kefu/kefu_index',
					});
				} else if (type == 5) {
					uni.navigateTo({
						url: '/pages/mine/index',
					});
				}
			},
			async getList(type, size, val) {
				if (type == 1) {
					this.get_userinfo()
				}
				this.list = []
				// this.State
				// Toast.loading();
				const res = await this.$myRuquest({
					method: 'Post',
					url: '/api/front/movie/getList',

					data: {
						page: 1,
						pagesize: size,
						tag: val
					}
				})
				if (res.code == 200) {
					if (type == 1) {
						this.room = res.data.list
					} else {
						this.hot_list = res.data.list
					}
					//this.list = res.data.list
				}
			},
			async get_banner(type_id) {

				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				})
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/notice/getList',
					method: "POST",
					data: {
						type: type_id
					},

				})
				if (res.code == 200) {
					_this.bannerdata = res.data.list
				}
			},
			async get_notice(type_id) {

				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/notice/getList',
					method: "POST",
					data: {
						type: type_id
					},
				})
				if (res.code == 200) {
					
					if(!this.back){
						this.get_banner(1);
					}
					
					_this.run_txt = res.data.list
					if (_this.run_txt.length !== 0) {
						_this.run_txt.forEach((item) => {
							this.run_text_string += item.title
						})
					}
				}
			},


			onClose() {
				this.show_login = !this.show_login
			},
			noOk() {
				uni.navigateTo({
					url: '/pages/login/login',
				});
			},
			to_notice() {
				uni.navigateTo({
					url: '/pages/movie/notice/notice',
				});

			},
			to_more() {
				uni.navigateTo({
					url: '/pages/movie/list/index',
				});

			},
			to_home() {
				uni.postMessage({
					type: 'backToHome' // 自定义消息类型，用于小程序端的判断
				});
			},
			onNavigationBarButtonTap(e) {
				var had_token = uni.getStorageSync('token')
				if (had_token !== '') {
					if (e.index == 0) {
						uni.navigateTo({
							url: '/pages/notice/notice',
						});
					} else {
						uni.navigateTo({
							url: '/pages/login/login',
						});
					}
				} else {
					this.show_login = true
				}

			},


		},
		onLoad() {

		},
		onShow() {

			uni.removeStorageSync('movice_info')
			this.pop_notice = false
			this.show_login = false
			var had_token = uni.getStorageSync('ifLogin')
			if (had_token !== '') {
				//this.get_userInfo()
			}
		},
		// 在使用到的页面 添加如下代码
		mounted() {
		
			var token = uni.getStorageSync('ifLogin')
			
		},

	}
</script>
<style>
	/deep/ .uni-swiper-dots-horizontal {
		bottom: 20rpx;
	}

	.gongzi /deep/ uni-image>img {
		width: 100%;

	}

	/deep/ .van-action-sheet__item {
		background: #fff;

	}

	/deep/ .uni-noticebar {
		margin-bottom: 0;
	}
</style>
<style scoped>
	page {
		background-color: #190D30;

	}

	.tit_a {
		font-size: 15px;
		line-height: 25px;
		color: #fff;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.tit_adesc {
		font-size: 13px;
		line-height: 22px;
		color: #999;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.user_line {
		display: flex;
		width: 100%;
		margin: 10px auto;
	}

	.user_l {
		width: 130px;
		margin-right: 15px;
		display: flex;

		align-items: center;
	}

	.user_r {
		flex: 1;
		width: calc(100% - 140px);
	}

	.item_name {
		font-size: 14px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #fff;
	}

	.item_0 {
		background: linear-gradient(50deg, #9b54ca, #e6557f);
		color: #fff;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;

	}

	.item_1 {
		background: linear-gradient(50deg, #832bca, #6937e6);
		color: #fff;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;

	}

	.item_2 {
		background: linear-gradient(50deg, #ca991d, #e67716);
		color: #fff;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;

	}

	.item_3 {
		background: linear-gradient(50deg, #ff007f, #e684c1);
		color: #fff;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;

	}

	.item_4 {
		background: linear-gradient(50deg, #5500ff, #ff87f5);
		color: #fff;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;

	}

	.item_desc {
		color: #969799;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 200px;
		padding: 8px 0;
		font-size: 13px;

	}

	.item_btn {
		/* background: linear-gradient(50deg, #8e3aca, #e6557f); */
		color: #e6557f;
		;

		width: 100%;
		text-align: left;
		display: flex;
		border-radius: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 0;
		margin-bottom: 0.33333rem;
	}

	.index_topline {
		width: 100%;
		display: flex;
		/* background: url("../../static/image/new_top.png") no-repeat center; */
		background-size: 100%;
	}

	.index_top_l {
		width: 50px;
		height: 44px;
		text-align: center;

		color: #fff;

	}

	.index_top_mdl {
		flex: 1;
		display: block;
		text-align: center;
	}

	.laba {
		width: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #fffbe8;
		color: #ed6a0c;
		padding-left: 5px;
		overflow: hidden;
	}

	.cont {
		height: 40px;
		line-height: 40px;
		background-color: #fffbe8;
		color: #ed6a0c;
		font-size: 14px;
		overflow: hidden;
		position: relative;
	}

	.contlist {
		position: absolute;
		white-space: nowrap;
		display: flex;
		flex-direction: row;
	}

	.contlistul {
		display: flex;
		flex-direction: row;
	}

	.contlistli {
		font-size: 12px;
		margin-right: 25px;
		height: 40px;
		line-height: 40px;
		display: flex;
		flex-direction: row;
	}

	.contlistem {
		color: #f80;
		font-size: 12px;
		padding-right: 10px;
	}

	/deep/ .van-fade-enter-active,
	.van-fade-leave-active {
		z-index: 91;
	}

	/deep/ .van-dialog {
		z-index: 92;
	}

	.msg_are {
		padding: 20px 15px;
		font-size: 14px;
		line-height: 25px;
		text-align: center;
	}

	.top_select {
		position: absolute;
		top: 48px;
		left: 10px;
		border-radius: 50px;
		height: 32px;
		width: 130px;
		background-color: rgba(0, 0, 0, 0.2);
		display: block;
		z-index: 99;
		display: flex;
		padding: 0px 15px;
		padding-right: 5px;
		color: #fff;
	}

	.com_name {
		line-height: 32px;
		padding: 0 5px;
		font-size: 13px;
	}



	.gongzi {
		margin-bottom: 28rpx;
	}

	.page-section {
		position: relative;
	}

	.index_lanmu {
		height: auto;
		overflow: hidden;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 15px;
		justify-content: flex-start;

	}

	.index_lm_zi {
		width: 50%;
		margin: 5px auto;
		margin-bottom: 15px;
	}

	.index_lm_long {
		width: 100%;
		margin: 5px auto;

		display: block;

	}

	.index_lm_zim {
		border-radius: 16rpx;
		height: auto;
		padding: 0 5px;

	}

	.index_lm_ziml {
		padding-right: 5px;
		padding-left: 0px;
	}

	.index_lm_zim image {
		width: 100%;
		display: block;
	}

	.index_lm_zim1 {

		background: url("../../static/image/index_gl_01s.png") no-repeat right bottom #EBEBFF;
		background-size: 43%;
		margin: 0px 20rpx 20rpx 0;
		border: 1px solid #E4E4FF;
	}

	.index_lm_zim2 {

		background: url("../../static/image/index_gl_02s.png") no-repeat right bottom #FFEFEB;
		background-size: 43%;
		margin: 0px 0px 0px 20rpx;
		border: 1px solid #FFE8E4;
	}

	.index_lm_zim3 {
		background: url("../../static/image/index_gl_03s.png") no-repeat right bottom #FFF7EB;
		background-size: 43%;
		margin: 0px 0rpx 20rpx 0;
		border: 1px solid #FBEDDD;
	}

	.index_lm_zim4 {
		background: url("../../static/image/index_gl_04s.png") no-repeat right bottom #EDFBF9;
		background-size: 43%;
		margin: 0px 0px 0px 20rpx;
		border: 1px solid #DAF8F3;
	}

	.index_lm_tit1 {
		font-size: 28rpx;
		position: relative;
		color: #2E2E30;
		display: block;
		line-height: 144rpx;
		padding-left: 100rpx;
	}

	.index_lm_tit1::after {
		content: '';
		left: 8%;
		top: 27%;
		height: 35px;
		width: 35px;
		position: absolute;

		background: url("../../static/image/index_gl_01.png") no-repeat center;
		background-size: 100%;
	}

	.index_lm_tit2::after {
		content: '';
		left: 8%;
		top: 27%;
		height: 35px;
		width: 35px;
		position: absolute;

		background: url("../../static/image/index_gl_02.png") no-repeat center;
		background-size: 100%;
	}

	.index_lm_tit3::after {
		content: '';
		left: 8%;
		top: 27%;
		height: 35px;
		width: 35px;
		position: absolute;

		background: url("../../static/image/index_gl_03.png") no-repeat center;
		background-size: 100%;
	}

	.index_lm_tit4::after {
		content: '';
		left: 8%;
		top: 27%;
		height: 35px;
		width: 35px;
		position: absolute;

		background: url("../../static/image/index_gl_04.png") no-repeat center;
		background-size: 100%;
	}

	.l_ft_r {
		color: #e6557f;
		font-size: 14px;
		padding-right: 5px;
		line-height: 26px;
	}

	.banner {
		width: 750rpx;
		height: 482rpx;
		background-color: #0f0f27;

	}

	.banner .swiper {
		width: 750rpx;
		height: 482rpx !important;
	}

	.banner .swiper-item {
		width: 750rpx;
		height: 482rpx !important;
	}

	.banner .swiper-item image {
		display: block;
		width: 750rpx;
		height: 482rpx !important;
	}

	.main_ge {
		height: 30px;
		display: block;
		width: 100%;
		background: #583212;
	}

	.main_i {
		/* background: #F7F8FC; */
		border-radius: 44rpx 44rpx 0 0;
		padding: 20rpx 20rpx;

		display: block;
		width: 100%;
		/* calc(100% - 40rpx); */

		padding-top: 25px;
		border-radius: 20px 20px 0 0;
		z-index: 90;
		/* position: absolute;
		left: 0;
		bottom: -730rpx; */
	}

	.title_line {
		/* color: #2E2E30; */
		color: #EAC477;
		font-size: 32rpx;
		padding-left: 20rpx;
		position: relative;
		margin-bottom: 28rpx;
		line-height: 21px;

	}

	.type_more {
		width: 80px;
		padding-left: 5px;
		text-align: right;
		position: absolute;
		height: 25px;
		line-height: 25px;
		right: 0;
		top: -2px;
		color: #EAC477;
		font-size: 12px;
	}

	.selectitem {
		position: relative;
	}

	.selectitem::after {
		content: ;
		right: 10px;
		top: 10px;
	}

	.title_line::after {
		content: '';
		position: absolute;
		left: 2px;
		top: 0;
		background: #EAC477;
		height: 20px;
		width: 2px;
		border-radius: 5px;
	}

	.pop_are {
		height: auto;
		padding-top: 10px;
		width: calc(100vw - 32px);
		margin: auto;
		background: #fff;
		border-radius: 8px;
	}



	.input_are {
		width: calc(100vw - 96px);
		margin: auto;
		padding: 16px;

		/* background: #F7F8FC; */
		border-radius: 8px;
	}

	.tit {
		font-size: 16px;
		text-align: center;
		line-height: 30px;
		padding-bottom: 10px;
	}

	.ft_btnline {

		padding: 16px 16px
	}



	/* // */
	.select_are {
		background-color: #ffffff;
		width: 100vw;
		height: 150px;
		overflow: hidden;
	}

	.select_btn {
		display: block;
		height: 45px;
		background-color: #ffffff;

	}

	.select_l {
		float: left;
		width: 60px;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
		color: #9C9FB7;
	}

	.select_r {
		float: right;
		width: 60px;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
		color: #3E3EF7;
	}

	.select_item {
		display: flex;
		width: 100%;
		padding: 14px 0px;
		font-size: 16px;
		background-color: #fff;
		border: none;
		cursor: pointer;
		text-align: center;
		justify-content: center;
	}

	.ft_btnare {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #fff;
		padding: 10px 0;
	}

	.ft_btn {
		width: 90%;
		margin: auto;
		display: block;
	}
</style>