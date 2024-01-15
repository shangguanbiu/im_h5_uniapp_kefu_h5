<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">

			<template #content>{{top_title}}</template>
			<template #right>
				<view class="cuIcon-more mr-10 f-16" @tap="openMore"></view>
			</template>
		</cu-custom>
		<view class="list_are" v-if="list.length !==0">
			<!-- <view style="height: calc(100vh - 10px);"></view> -->
			<view class="list_item" v-for="(item,index_girl) in list" :key="index_girl" @click="see_detail(item)">
				<view class="list_zi">
					<view class="list_img_are">
						<image :src="item.img" class="list_zi_img" mode='widthFix'>
						</image>
					</view>
					<view class="list_foot">
						<view class="m_title">
							<!-- <van-icon name="video-o" class="l_ft_l"/> -->
							{{item.name}}
						</view>
						<view style="display: flex;align-items: center;">
							<view class="cuIcon-cardboardfill l_ft_r" style="font-size: 14px;"></view>
							<view class="l_ft_r">{{item.view_count}}</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<Empty v-else :noDatatext="$t('list.no_data')" textcolor="#999" />
		<view v-show="show_more" class="type_more">
			<view style="padding-top: 50px;">
				<view class="type_tit">{{$t('list.type_hot')}}</view>
				<view class="type_zi" :class="{'type_get':index_get==99}" @click="get_type('',99)">
					{{$t('list.all')}}
				</view>
				<view class="type_zi" :class="{'type_get':index_get==inde_t}" v-for="(typeitem,inde_t) in type_list" :key="inde_t" @click="get_type(typeitem,inde_t)">
					<view v-if="language=='zh'">{{typeitem.name}}</view>
					<view v-if="language=='zhCN'">{{typeitem.name_2}}</view>
					<view v-if="language=='en'">{{typeitem.name_3}}</view>
				</view>

			</view>
			<view class="type_close" @click="show_more=false">{{$t('list.close')}}</view>
		</view>
		<view v-show="pop_notice">
			<view class="com_bg"></view>
			<view class="com_main">
					<view class="pop_mian">
						<view class="pop_title">{{$t('pop.title')}}</view>
						<view style="padding: 10px 15px; display:flex; justify-content: flex-start; line-height: 25px; flex-wrap: wrap;">
							
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
	import { useloginStore } from '@/store/login'
	import pinia from '@/store/index'
	const loginStore = useloginStore(pinia)
	export default {
		data() {
			return {
				pop_notice:false,
				active: 0,
				top_title:this.$t('list.title'),//'影院',
				show_more: false,
				loadingType: 0,
				page: 1,
				State: 0,
				type_list: [],
				timer: {},
				list: [],
				type_list: [],
				State: '',
				index_get:99,
				fromUser: '',
				language:loginStore.language
			}
		},
		methods: {
			pop_ok(){
				uni.navigateTo({
					url: '/pages/movie/kefu/kefu'
				});
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
			see_detail(data) {
				
				if(this.fromUser.isview ==0&&this.fromUser.role == 0){					
					this.pop_notice=true					
					return;
				}
								
				uni.setStorageSync('movice_info', data)
				uni.navigateTo({
					url: '/pages/movie/list/detial?id='+data.id,
				});

			},
			
			async get_type_list() {
				const res = await this.$myRuquest({
					url: '/api/front/movie/getTypes',
					method: "POST",
					data: {
						page: 1
					},
				})
				if (res.code == 200) {


					this.type_list = res.data.data


				}
			},

			onClose() {

			},

			onChange(data) {

				return
				this.State = this.type_list[index].id
				//this.type_list=[]
				this.list = []

				this.getList()

			},
			openMore() {
				this.show_more = !this.show_more
			},
			get_type(data,index) {
				this.page=1
				this.index_get=index
				this.openMore()
				if(data !==''){
					this.State = data.id
					this.top_title=this.$t('list.title')+'-'+data.name
				}else{
					this.State = ''
					this.top_title=this.$t('list.title')
				}	
				
				this.getList()
			},
			async get_userinfo(){
				let userInfo = JSON.parse(JSON.stringify(loginStore.userInfo))
				const res = await this.$myRuquest({
					url: '/api/front/index/getImUserInfo',
					method: "POST",
					data: {
						user_id: userInfo.user_id
					},
				})
				if (res.code == 200) {
					
					this.fromUser =res.data
					let data=JSON.parse(JSON.stringify(res.data))
					loginStore.login(data)
				
				}
			},
			async getList(callBack) {
				this.list = []
				// this.State
				// Toast.loading();
				const res = await this.$myRuquest({
					
					method: 'Post',
					url: '/api/front/movie/getMoreList',
					data:{
						page:this.page,
						pagesize:10,
						type_id:this.State
					}
				})
				if (res.code == 200) {

					this.list = res.data.list
					// setTimeout(function() {
					// 	Toast.clear();
					// }, 1000)
				}

				callBack && callBack()

			},
			async getmorelists() {

				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false
				}
				this.loadingType = 1
				uni.showNavigationBarLoading() //显示加载动画
				this.page++

				const res = await this.$myRuquest({
					
					method: 'Post',
					url: '/api/front/movie/getMoreList',
					data:{
						page:this.page,
						pagesize:10,
						type_id:this.State
					},
					
				})
				if (res.code == 200) {


					//this.page++ // 得到数据之后 page+1
					if (res.data.list.length < 1) { // 没有数据
						this.loadingType = 2
						uni.hideNavigationBarLoading() // 关闭加载动画
						return
					}
					//this.page++ // 每触底一次 page +1
					this.list = this.list.concat(res.data.list) //将数据拼接在一起
					this.loadingType = 0 // 将loadingType归0重置
					uni.hideNavigationBarLoading() // 关闭加载动画

				}

			},



		},
		mounted() {
			window.scrollTo({
				top:0,
				behavior:'smooth'
			})
		},
		onLoad(option) {
			
			this.get_type_list()
			this.getList()
			uni.removeStorageSync('movice_info')
			this.show_more = false
			var backbutton = document.getElementsByClassName('uni-page-head-hd')[0]
			if (backbutton) backbutton.style.display = 'none';
		},
		onShow() {
			this.get_userinfo()
			this.getList()
			uni.removeStorageSync('movice_info')
			this.fromUser = uni.getStorageSync('userInfo')
			
			this.show_login = false
			var had_token = uni.getStorageSync('token')
			if (had_token !== '') {

			}

		},
		onPullDownRefresh() {
			this.page = 1
			this.list = []
			this.getList().then(res => wx.stopPullDownRefresh())
		},
		onReachBottom() {
			
			if (this.timer !== null) {
				clearTimeout(this.timer)
			}
			this.timer = setTimeout(() => {
				this.getmorelists()
			}, 1000)
		}
	}
</script>
<style>
	/deep/ .van-tabs__line {
		background-color: #fff;
		width: 40px !important;
	}

	/deep/ .van-tab--active {
		color: #e54d42;
	}
</style>
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

	.list_are {
		padding: 10px 5px;
		padding-top: 0;

		display: flex;
		flex-wrap: wrap;
		justify-content:flex-start;
		overflow-y: scroll;
		padding-bottom: 90px;
	}

	.list_item {
		width: 50%;

	}

	.list_zi {
		padding: 10px 5px;
	}

	.m_title {
		width: 50%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 26px;
	}

	.list_img_are {
		position: relative;
		display: block;
	}

	.list_zi_img {
		width: 100%;
		max-height: 110px;
		

	}

	.list_zi_meng {
		height: 40px;
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .4);
		display: flex;
		justify-content: space-between;
		color: #fff;
		font-size: 12px;
		text-align: center;
	}

	.tag_line {
		font-size: 13px;
		padding: 5px;
		color: #999;
		display: flex;
	}

	.list_foot {
		display: flex;
		font-size: 13px;
		color: #999;
		justify-content: space-between;
	}

	.l_m_btn {
		border: 1px solid #fff;
		margin-top: 7px;
		padding: 5px;
	}

	.l_ft_l {
		color: #f2b247;
		font-size: 20px;
		padding-right: 5px;

	}

	.l_ft_r {
		color: #e6557f;
		font-size: 14px;
		padding-right: 5px;
		line-height: 26px;
	}

	.rizi_top {
		background: #fff;

		margin-bottom: 20px;

		height: 40px;
		width: 100vw;
		color: #000;



	}
</style>