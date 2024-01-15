<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('bet_list.title')}}</template>
		</cu-custom>
	
		<view v-if="list.length !==0">
			<view class="list_line_are" v-for="(qishuitem,indexs) in list" :key="indexs">
				<view class="list_line_line">
					<view class="list_line_zi">{{$t('bet_list.qihao')}}</view>
					<view class="list_line_zi">{{$t('bet_list.jifen')}}</view>
				</view>
				<view class="list_line_line">
					<view class="list_line_zi">{{qishuitem.open_no}}</view>
					<view class="list_line_zi">{{qishuitem.amount}}</view>
				</view>
				<view class="list_line_line">
					<view class="list_line_zi">{{$t('bet_list.time')}}</view>
					<view class="list_line_zi">{{$t('bet_list.toupiao')}}</view>
				</view>
				<view class="list_line_line">
					<view sclass="list_line_zi" style="flex: 1;">{{qishuitem.create_time}}</view>
					<view class="list_line_zi">
					<view style="display: flex; justify-items: flex-start;" >
						<view class="color_n1"  v-if="qishuitem.multiple_id==1">{{$t('bet_list.bet_n1')}}</view>
						<view class="color_n2" v-if="qishuitem.multiple_id==2">{{$t('bet_list.bet_n2')}}</view>
						<view class="color_n1" v-if="qishuitem.multiple_id==3">{{$t('bet_list.bet_n3')}}</view>
						<view class="color_n2" v-if="qishuitem.multiple_id==4">{{$t('bet_list.bet_n4')}}</view>
					</view>
					
					</view>
				</view>
			</view>
			<view style="text-align: center; line-height: 50px; color: #ccc;">{{$t('bet_list.reload')}}</view>
		</view>
		<view v-else class="listare li_are">
			<view class="empty_ico">
				<!-- <van-empty class="custom-image" :image="empty_img" description="" /> -->
				<image src="@/static/image/empty.png" style="margin-top: 3px; "
					mode='widthFix' />
					<view style="text-align: center;">{{$t('bet_list.no_data')}}</view>
			</view>
		</view>
		
	

	</view>
</template>

<script>

	export default {
		data() {
			return {
				year: 0,
				data_index: 0,
				ifdown: false,
				ifpop: false,
				page: 1,
				pagesize: 10,
				notice: "下拉刷新",
				loadingType: 0,
				loadingText: '加载中...',
				contentText: {
					contendown: '上拉显示更多',
					contenrefresh: '正在加载...',
					contennomore: '没有更多数据了',
				},
				timer: {},
				minDate: 1546275676,
				columns: [],
				empty_img:'',
				list: []
			}
		},
		components: {
			
		},
		methods: {
			see_money(index) {
				this.list[index].ifsee = !this.list[index].ifsee
			},
			see_detail(data) {
				uni.navigateTo({
					url:'/pages/movie/notice/detail/detail?id=' + data.id,
				});

			},
			onChange(event) {
				console.log(event)
			},
			onClose() {
				this.ifdown = false
			},
			onSelect(event) {
				this.ifdown = false
				this.year = event.detail.value
				Toast.loading({
					duration: 0,
					message: '加載中...',
					forbidClick: true,
				});
				this.list = []
				this.getList()
			},
			async getList(callBack) {
				this.list = []
				// this.State
				// Toast.loading();
				const res = await this.$myRuquest({
					
					method: 'Post',
					url: '/api/front/order/getHistoryOrder',
					data:{
						page:this.page,
						pagesize:5
					}
				})
				if (res.code == 200) {
			
					this.list = res.data.data
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
					url: '/api/front/order/getHistoryOrder',
					data:{
						page:this.page,
						pagesize:5
					},
					
				})
				if (res.code == 200) {
			
			
					//this.page++ // 得到数据之后 page+1
					if (res.data.data.length < 1) { // 没有数据
						this.loadingType = 2
						uni.hideNavigationBarLoading() // 关闭加载动画
						return
					}
					//this.page++ // 每触底一次 page +1
					this.list = this.list.concat(res.data.data) //将数据拼接在一起
					this.loadingType = 0 // 将loadingType归0重置
					uni.hideNavigationBarLoading() // 关闭加载动画
			
				}
			
			},
			formatNum(value) {
				if (!value && value !== 0) return 0;
				let str = value.toString();
				let reg =
					str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
				return str.replace(reg, "$1,");
			},
			


		},
		onLoad() {
			this.list = []
			this.page=1
			this.getList()

		},
		onPullDownRefresh() {
			this.page = 1
			this.list = []
			this.getList().then(res => wx.stopPullDownRefresh())
		},
		onReachBottom() {
			this.getmorelists()

		}
	}
</script>

<style scoped>
	
	page {
		background: #190D30;
	}

	/deep/ .van-popup {
		z-index: 99999;
	}

	/deep/ .van-empty__image {
		width: 230px;
		height: 230px;
	}

	/deep/ .wxParse {
		color: #969799;
	}

.list_line_are{width: 95%; margin:10px auto; padding: 10px 0; background: #fff; color: #000; border-radius: 10px;}
.list_line_line{display: flex; padding:5px 10px;}
.list_line_zi{width: 50%;}
.color_n1 {
		color: #fff;
		border-radius: 5px;
		padding: 0px 5px;
		background: #EAC477;
		margin-right: 10px;
	}

	.color_n2 {
		color: #fff;
		border-radius: 5px;
		padding: 0px 5px;
		background: #8e3aca;
		margin-right: 10px;
	}
	.rizi_top {
		height: 110px;
		background: #3E3EF7;
		border-radius: 0 0 22px 22px;

	}

	.rizi_line {

		display: flex;
		justify-content: space-between;
		padding: 10px 0;

	}

	.tit_l {
		font-size: 16px;
		color: #fff;
		padding: 0px 15px;
		position: relative;
		line-height: 30px;
		display: flex;
	}


	.tit_day {
		background: #fff;
		border-radius: 17px;
		display: flex;
		padding: 5px 15px;
		margin-right: 15px;
	}

	.r_rr {
		color: #fff;
		font-size: 22px;
		margin-right: 5px;
	}

	.r_rl {
		color: #3E3EF7;
		font-size: 22px;
	}

	.r_year {
		font-size: 14px;
		padding: 0 10px;
		line-height: 28px;
	}

	.r_dowm {
		color: #74778A;
		font-size: 18px;
		line-height: 28px;
		padding-left: 5px;
	}

	.listare {
		height: auto;
		width: 95%;
		margin: auto;
		margin-top: 10px;
	}

	.li_are {
		height: auto;
		overflow: hidden;
		width: calc(100% - 32rpx);
		border-radius: 8px;
		padding: 16px;
		background: #fff;
		margin-bottom: 15px;
	}

	.li_a_top {

		width: 100%;

		font-size: 15px;
	}

	.li_a_top_p {
		font-size: 12px;
		color: #969799;
		padding-top: 10px
	}

	.li_tit {
		padding-left: 15px;
		flex-grow: 2
	}

	.li_more {
		color: #74778A;
		font-size: 13px;
		line-height: 24px;
	}

	.li_money {
		flex-grow: 2;
		font-size: 24px;
		display: flex;
	}

	.li_moneytt {
		font-size: 13px;
		color: #74778A;
		line-height: 31px;
	}

	.li_see {
		line-height: 31px;
		font-size: 24px;
	}

	.money_line {
		margin-top: 0px;
		font-size: 13px;
		position: relative;
		color: #969799;
		display: flex;

	}

	.money_lr {
		position: absolute;
		right: 5px;
		top: -7px;
		color: #969799;
		font-size: 24px;
	}

	.empty_ico {
		display: block;
		margin-top: 20px;
		color: #74778A;
	}
	
	.title_line {
		height: auto;
		width: 100%;
		display: flex;
		line-height: 25px;
		font-size: 14px;
		padding: 5px 0;
		position: relative;
	}
	
	.title_line::after {
		height: 1px;
		background: #eaeaea;
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		content: '';
	}
	
	.title_line2 {
		background: #ccc;
	}
	
	.title_l {
		width: 120px;
		text-align: center;
	}
	
	.title_lc {
		text-align: center;
		padding: 0px 5px;
		flex: 1;
	}
	
	.value_m {
		border-radius: 50%;
		color: #fff;
		width: 25px;
		height: 25px;
		display: block;
		margin: auto;
	}
	
	.value_1 {
		background: #409eff;
	}
	
	.value_2 {
		background: #583212;
	}
	
	.jiange {
		background: #eaeaea;
	}
</style>
