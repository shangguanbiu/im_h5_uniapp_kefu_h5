<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{top_title}}</template>
		</cu-custom>
		<view class="page-section swiper">
			<view>
				<view class="page-section swiper">

					<view style="position: relative;">
						<swiper :indicator-dots="indicatorDots" :indicator-color="indicatorColor"
							:indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval"
							:duration="duration" style="min-height: 400px;">
							<swiper-item v-for="(banner,indexbn) in bannerdata" :key="'a'+indexbn">
								<image :src="banner" mode='widthFix' style="width: 100%;"></image>
							</swiper-item>

						</swiper>
					</view>
				</view>
			</view>
			<view class="main_i">
				<view class="main_title">{{detail.title}}
				</view>
				<view class="mian_price_line" style="padding: 7px 0;">
					<view class="mark_price">{{$t('mine.jifen')}}：{{detail.price}}</view>
				</view>
				<view class="mian_price_line" style="padding: 7px 0;">
					<view class="mark_price">{{$t('detail.bianhao')}}：LMHSD-{{detail.id}}</view>
				</view>
				<view class="main_title" style="margin-top: 10px;color: #2a1468;">{{$t('detail.jianjie')}}</view>
				<view class="dangan" style="padding-bottom: 40px;">
					{{detail.remark}}
				</view>
				<view class="buy_btn" @tap="pop_notice=true">{{$t('detail.buynow')}}</view>
				<!-- <view style="display: flex;padding: 10px 0;  flex-wrap:wrap">
					<view :class="'item_'+t_index" v-for="(tagitem,t_index) in detail.hot_tags.split(',')"
						:key="t_index">
						{{tagitem}}
					</view>
				</view> -->

				<!-- <view class="main_title" style="margin-top: 10px; color: #2a1468;">{{$t('detail.belike')}}</view>
				<view class="like_are">
					<view class="like_zi" v-for="(guessitem,index_guess) in guess_arr" :key="index_guess"
						@click="see_detail(guessitem)">
						<view class="like_zi_are">
							<image :src="guessitem.img" class="list_zi_img" mode='widthFix'>
							</image>
							<view class="like_zi_title">
								<view>{{guessitem.name}}</view>
								<view>
									<van-icon name="eye-o" class="l_ft_r" />{{guessitem.view_count}}
								</view>
							</view>
						</view>
					</view>

				</view> -->

			</view>

		</view>
		<!-- <van-action-sheet :show="select_compay" :actions="compay_list" :round="false" @cancel="onClose" @select="onSelect" 
			cancel-text="取消">
		</van-action-sheet> -->
		<view v-show="pop_notice">
			<view class="com_bg"></view>
			<view class="com_main">
				<view class="pop_mian">
					<view class="pop_title">{{$t('pop.title')}}</view>
					<view
						style="padding: 10px 15px;  text-align: center; line-height: 25px; ">
						{{$t('pop.content9')}}
					</view>
					<view class="pop_foot">
						<view class="pop_ft_btn1" @tap="pop_notice=false">{{$t('pop.close')}}</view>
						<view class="pop_ft_btn2" @tap="pop_ok()">{{$t('pop.ok2')}}</view>
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
				top_title: '详情',
				pop_notice: false,
				scrollW: 0,
				show_login: false,
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,

				indicatorColor: "#292b40",
				indicatorActiveColor: "#ffffff",
				tag: ['好看', '大片', '动作片', '青春', '喜剧'],
				detail: {},
				guess_arr: [],
				fromUser: '',
				bannerdata: []
			}
		},
		methods: {

			pop_ok() {
				uni.navigateTo({
					url: '/pages/movie/kefu/kefu'
				});
			},
			async getList(id) {
				this.list = []
				// this.State
				// Toast.loading();
				const res = await this.$myRuquest({
					method: 'Post',
					url: '/api/front/movie/getList',

					data: {
						page: 1,
						pagesize: 6,
						tag: '',
						current_id: id,
					}
				})
				if (res.code == 200) {

					this.guess_arr = res.data.list
				}
			},

			async add_view(val_id) {
				///
				const res = await this.$myRuquest({
					method: 'Post',
					url: '/api/front/movie/addViewCount',
					data: {
						id: val_id,
					}
				})
				if (res.code == 200) {
					this.count_number('isview')
				}
			},
			async count_number(type) {
				let userInfo = JSON.parse(JSON.stringify(loginStore.userInfo))
				const res = await this.$myRuquest({
					url: '/api/front/index/changeImUserData',
					method: "POST",
					data: {
						user_id: userInfo.user_id,
						column: type
					},
				})
				if (res.code == 200) {
					// uni.showToast({
					// 	title: 'ok',
					// 	icon: "none"
					// });

				}
			},
			jump(type) {
				if (type == 1) {
					uni.navigateTo({
						url: '/pages/index/index',
					});
				} else if (type == 2) {
					uni.navigateTo({
						url: '/pages/recharge/recharge',
					});
				} else if (type == 3) {
					uni.navigateTo({
						url: '/pages/kefu/kefu_index',
					});
				} else if (type == 4) {
					uni.navigateTo({
						url: '/pages/usercenter/usercenter',
					});
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
					url: '/pages/notice/notice',
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

			see_detail(data) {
				if (this.fromUser.isview == 0 && this.fromUser.role == 0) {
					this.pop_notice = true
					return;
				}

				uni.setStorageSync('movice_info', data)
				uni.navigateTo({
					url: '/pages/movie/list/detial?id=' + data.id,
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

					this.fromUser = res.data
					let data = JSON.parse(JSON.stringify(res.data))
					loginStore.login(data)

				}
			},
		},
		onLoad(option) {
			uni.setStorageSync('iffirst', false)
			this.detail = uni.getStorageSync('shop_info')
			if (this.detail.nearby_arr !== '') {
				this.bannerdata = this.detail.nearby_arr.split(',')
			}

			this.top_title = this.detail.title



		},
		mounted() {

			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		},
		onShow() {

			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
			this.show_login = false
			var had_token = uni.getStorageSync('token')
			if (had_token !== '') {

			}



		}
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
</style>
<style scoped>
	.buy_btn {
		position: fixed;
		left: 10%;
		bottom: 5%;
		width: 80%;
		height: 35px;
		z-index: 10;
		text-align: center;
		color: #fff;
		background: #e6557f; line-height: 35px;
		font-size: 14px; border-radius: 5px;
	}

	#myVideo {
		width: 100%;
		height: 400px;
	}

	.index_topline {
		width: 100%;
		display: flex;
		background: url("../../static/image/new_top.png") no-repeat center;
		background-size: 100%;
	}

	.like_are {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.like_zi {
		width: 50%;
	}

	.like_zi_are {
		padding: 0 5px;

		position: relative;
		margin: 10px 0;
	}

	.list_zi_img {
		width: 100%;

	}

	.like_zi_title {
		position: absolute;
		left: 5px;
		bottom: 0;
		width: calc(100% - 10px);
		padding: 5px;
		display: flex;
		background: rgba(0, 0, 0, .4);
		line-height: 25px;
		justify-content: space-between;
		color: #fff;
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

	page {
		background: #fff;

	}

	.main_i {
		padding: 5px 10px;
	}

	.main_title {
		font-size: 16px;
		font-weight: bold;
		padding: 10px 0;
		display: flex;
	}

	.main_No {
		color: #f2b247;
		padding-left: 10px;
	}

	.mian_price_line {
		font-size: 13px;
		color: #333;
		display: flex;
	}

	.mark_price {
		font-size: 16px;
		color: #e6557f;
		font-weight: bold;
		padding-right: 30px;
	}

	.mark_price_line {
		text-decoration: line-through;
	}

	.dangan {
		color: #6b22b3;
		font-size: 13px;
		margin: 5px 0;
	}

	.item_btn {
		background: linear-gradient(50deg, #8e3aca, #e6557f);
		color: #fff;

		width: 100px;
		text-align: center;
		display: inline-block;
		border-radius: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 0;
		margin-bottom: 0.33333rem;
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

	.item_5 {
		background: linear-gradient(50deg, #8e3aca, #e6557f);
		color: #fff;

		width: 100px;
		text-align: center;
		display: inline-block;
		border-radius: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 0;
		margin-bottom: 0.33333rem;
	}

	.item_desc {
		color: #969799;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 200px;
		padding: 10px 0;

	}
</style>