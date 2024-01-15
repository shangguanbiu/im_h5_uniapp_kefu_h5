<template>
	<view :class="{'scroll_ft':scroll_ft}">
		<!-- <cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<template #backText></template>
			<template #content>投票</template>
		</cu-custom> -->
		<view class="bet_tab">
			<view class="bet_tab_zi" :class="{'bet_tab_haver':tab_index==0}" @click="change_tab(0)">{{$t('bet.tab1')}}</view>
			<view class="bet_tab_zi" :class="{'bet_tab_haver':tab_index==1}" @click="change_tab(1)">{{$t('bet.tab2')}}</view>
			<view class="bet_tab_zi" :class="{'bet_tab_haver':tab_index==2}" @click="change_tab(2)">{{$t('bet.tab3')}}</view>
		</view>
		<view v-show="tab_index==0">
			<view class="bet_top">
				<view style="padding: 10px  15px">
					<view class="bet_line bet_ge">
						<view>{{$t('bet.now')}}</view>
					</view>
					<view style="display: flex; align-items: center;" class="bet_ge">
						<view style="font-weight: bold; font-size: 16px; margin-right: 3px;text-decoration: none;">{{qishu}}
						</view>
						<view v-if="ifrun">{{$t('bet.go_on')}}</view>
						<view v-if="!ifrun">{{$t('bet.close')}}</view>
					</view>
					<view class="time">{{time2+':'+time3}}</view>
					<view class="bet_line bet_ge">
						<view style="display: flex;" v-for="(item,narr_k) in Number_laster.slice(0,1)" :key="narr_k">
							<view style="margin-right: 10px;text-decoration: none;">{{item.open_no}}</view>
			
							<view class="color_n2" v-if="item.number>5||item.number==5">{{$t('bet.bet_n1')}}</view>
							<view class="color_n1" v-if="item.number<4 ||item.number==4">{{$t('bet.bet_n2')}}</view>
							<view class="color_n1" v-if="item.number % 2 === 1">{{$t('bet.bet_n3')}}</view>
							<view class="color_n2" v-if="item.number% 2 === 0">{{$t('bet.bet_n4')}}</view>
						</view>
						<view @click="ifhistory=!ifhistory" style="display: flex;">{{$t('bet.history')}}
			
							<view class="cuIcon-unfold" style="line-height: 19px;margin-left: 2px;" v-if="!ifhistory">
							</view>
							<view class="cuIcon-fold" style="line-height: 19px;margin-left: 2px;" v-if="ifhistory"></view>
						</view>
						<view class="history_are" v-show="ifhistory" @tap="ifhistory=false">
							<view style="padding: 0px 15px" v-if="Number_laster.length !==0">
								<view style="display: flex; padding: 5px 0;" v-for="(item,narr_k) in Number_laster"
									:key="narr_k">
									<view style="margin-right: 10px;">{{item.open_no}}</view>
			
									<view class="color_n2" v-if="item.number>5||item.number==5">{{$t('bet.bet_n1')}}</view>
									<view class="color_n1" v-if="item.number<4 ||item.number==4">{{$t('bet.bet_n2')}}</view>
									<view class="color_n1" v-if="item.number % 2 === 1">{{$t('bet.bet_n3')}}</view>
									<view class="color_n2" v-if="item.number% 2 === 0">{{$t('bet.bet_n4')}}</view>
			
								</view>
							</view>
			
						</view>
					</view>
			
			
				</view>
			
			</view>
			<view class="bet_top_ft">
				<view class="bet_t_ft_m" @tap="pop_notice=true">{{$t('bet.rule')}}</view>
				<view class="bet_t_ft_m" @click="see_list" style="display: flex; justify-content: center; color:#e6557f ;">
					{{$t('bet.outlist')}}
					<view class="cuIcon-right" style="line-height: 40px; margin-left: 2px;"></view>
				</view>
			
			</view>
			<view class="bet_main">
				<view class="bet_mainzi" v-for="(nitem,narr_i) in Number_arr" :key="narr_i">
					<view class="bet_zi" :class="{'bet_zi_get':nitem.ifhad}" @click="get_bet_num(nitem,narr_i)">
						{{nitem.name}}
					</view>
				</view>
			</view>
		</view>
		<view v-show="tab_index==1">
			<view class="list_are" v-if="shop_list.length !==0">
				<!-- <view style="height: calc(100vh - 10px);"></view> -->
				<view class="list_item" v-for="(item,index_girl) in shop_list" :key="index_girl" @click="see_detail(item)">
					<view class="list_zi">
						<view class="list_img_are">
							<image :src="item.logo" class="list_zi_img" mode='widthFix'>
							</image>
						</view>
						<view class="list_foot">
							<view class="m_title">
								<!-- <van-icon name="video-o" class="l_ft_l"/> -->
								{{item.title}}
							</view>
							<view style="display: flex;align-items: center;">
								<view class="cuIcon-moneybag l_ft_r" style="font-size: 14px;"></view>
								<view class="l_ft_r">{{item.price}}</view>
							</view>
						</view>
					</view>
				</view>
			
			</view>
			<Empty v-else :noDatatext="$t('list.no_data')" textcolor="#999" />
			
		</view>
		<view v-show="tab_index==2">
			<view class="list_are" v-if="shop_list.length !==0">
				<!-- <view style="height: calc(100vh - 10px);"></view> -->
				<view class="list_item" v-for="(item,index_girl) in shop_list" :key="index_girl" @click="see_detail(item)">
					<view class="list_zi">
						<view class="list_img_are">
							<image :src="item.logo" class="list_zi_img" mode='widthFix'>
							</image>
						</view>
						<view class="list_foot">
							<view class="m_title">
								<!-- <van-icon name="video-o" class="l_ft_l"/> -->
								{{item.title}}
							</view>
							<view style="display: flex; align-items: center;">
								<view class="cuIcon-moneybag l_ft_r" style="font-size: 14px;"></view>
								<view class="l_ft_r">{{item.price}}</view>
							</view>
						</view>
					</view>
				</view>
			
			</view>
			<Empty v-else :noDatatext="$t('list.no_data')" textcolor="#999" />
		</view>
		
		
		<view style="padding-left: 15px; color: #e6557f; font-size: 16px; font-weight: bold; margin: 15px 0;">
			{{$t('bet.flow_tit')}}</view>
		<view style="padding-left: 10%; padding-bottom: 45px;">
			<view class="flow_line">
				<view style="width: 40%;">
					<view style=" margin-left: -10px;" class="color1">{{$t('bet.flow1')}}</view>
					<view class="flow_m">
						<view class="cuIcon-title color1" v-if="flow_data.flow1==1"></view>
						<view class="cuIcon-title color2" v-if="flow_data.flow1==0"></view>
						<view class="flow_l color2_bg" :class="{'color1_bg':flow_data.flow1==1}" style="flex: 1;">
						</view>
					</view>
					<view style=" margin-left: -10px;" class="color1" v-if="flow_data.flow1==1">{{$t('bet.flow_type1')}}
					</view>
					<view style=" margin-left: -10px;" class="color2" v-else>{{$t('bet.flow_type2')}}</view>
				</view>
				<view style="width: 40%;">
					<view style="margin-left: -10px;" class="color1">{{$t('bet.flow2')}}</view>
					<view class="flow_m">
						<view class="cuIcon-roundcheckfill color1" v-if="flow_data.flow2==1"></view>
						<view class="cuIcon-title color2" v-if="flow_data.flow2==0"></view>
						<view class="flow_l color2_bg" :class="{'color1_bg':flow_data.flow2==1}" style="flex: 1;">
						</view>

					</view>
					<view style=" margin-left: -10px;" class="color1" v-if="flow_data.flow2==1">{{$t('bet.flow_type1')}}
					</view>
					<view style=" margin-left: -10px;" class="color2" v-else>{{$t('bet.flow_type2')}}</view>
				</view>
				<view style="width: 20%;">
					<view style="margin-left: -10px;" class="color1">{{$t('bet.flow3')}}</view>
					<view class="flow_m">
						<view class="cuIcon-roundcheckfill color1" v-if="flow_data.flow3==1"></view>
						<view class="cuIcon-title color2" v-if="flow_data.flow3==0"></view>

					</view>
					<view style=" margin-left: -10px;" class="color1" v-if="flow_data.flow3==1">{{$t('bet.flow_type1')}}
					</view>
					<view style=" margin-left: -10px;" class="color2" v-else>{{$t('bet.flow_type2')}}</view>
				</view>
			</view>
		</view>
		<view class="bet_foot" v-show="pop_bet">
			<view class="bet_f_m">
				<view class="bet_f_mtit">
					<view>{{$t('bet.bet_tit')}}</view>
					<view class="had_num">{{$t('bet.balance')}}:{{max_num}}</view>
				</view>
				<view class="bet_num_line">
					<view class="bet_num" v-for="(item,narr_k) in cost_arr" :key="narr_k" @click="get_num(item)">
						{{item}}
					</view>

				</view>
				<view class="bet_num_line" style="padding: 15px 0;">
					<view style="line-height: 30px;">{{$t('bet.bet_tit_1')}}:</view>
					<view><input class="uni-input inmut_l" v-model="bet_num" @input="change_num(bet_num)" type="number"
							placeholder="" />
					</view>
					<view><button type="default" class="reset_btn" @click="reset">{{$t('bet.reset')}}</button></view>
				</view>
				<button type="default" v-if="ifrun" class="ok_btn" :disabled="!ifrun"
					@tap="submit_bet">{{$t('bet.set_ok')}}</button>
				<button type="default" v-if="!ifrun" class="ok_btn2">{{$t('bet.close')}}</button>
			</view>

		</view>
		<view v-show="pop_notice">
			<view class="com_bg"></view>
			<view class="com_main">
				<view class="pop_mian">
					<view class="pop_title">{{$t('bet.rule')}}</view>
					<view
						style="padding: 10px 15px; display:flex; justify-content: flex-start; line-height: 25px; flex-wrap: wrap;">
						{{$t('bet.content')}}

					</view>

					<view class="pop_foot">
						<view class="pop_ft_btn2" @tap="pop_notice=false">{{$t('bet.close')}}</view>

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
				tab_index:0,
				loginStore: loginStore,
				pop_notice: false,
				scroll_ft: false,
				pop_bet: false,
				index_ico: '@/static/image/shouye.png', // require(""),
				index_ico_h: '', // require("@/static/image/shouye_hover.png"),
				cz_ico: '', // require("@/static/image/chongzhi.png"),
				cz_ico_h: '', // require("@/static/image/chongzhi_hover.png"),
				kf_ico: '', //require("@/static/image/kefu.png"),
				kf_ico_h: '', // require("@/static/image/kefu_hover.png"),
				user_ico: '', //require("@/static/image/wode.png"),
				user_ico_h: '', // require("@/static/image/wode_hover.png"),
				bet_num: '',
				max_num: 0,
				qishu: '',
				qishu_id: '',
				ifrun: true,
				ifhistory: false,
				history_list: [],
				Number_arr: [],
				Number_laster: [],
				cost_arr: [10, 50, 100, 200, 500, 1000],
				userinfo: {},
				time1: 0,
				time2: 0,
				time3: 0,
				time_build: null,
				if_over: false,
				pageHeight: 0,
				flow_data: {},
				shop_list:[],

			}
		},
		watch: {
			watch: {
				$route(val) {
					if (val.fullPath == '/') {}
				}
			},
			bet_num(val) {
				if (Number(val) > this.max_num) {
					this.bet_num = this.max_num
					return
				} else {
					this.bet_num = val
				}

			},
			time3: function(val) {
				var _this = this
				if (this.time1 == 0 && this.time2 == 0 && val < 8) {
					this.ifrun = false
				}
				if (this.time2 == val && val == 0) {
					//clearInterval(this.runtime_obj)
					this.if_over = true
					// this.time1 = 0
					// this.time2 = 0
					// this.time3 = 0
					this.ifrun = false
					clearInterval(this.time_build);
					this.time_build = null;
					setTimeout(function() {
						_this.getNewOpenData()
					}, 3000)
					return;

				}
				if (val < 0 || val == NaN || val == 'NaN') {
					// this.time1 = 0
					// this.time2 = 0
					// this.time3 = 0
					this.ifrun = false
					clearInterval(this.time_build);
					this.time_build = null;
					setTimeout(function() {
						_this.getNewOpenData()
					}, 3000)
				}

			},
		},
		methods: {
			change_tab(index){
				this.tab_index=index
				this.pop_bet=false
				if(index==1){
					this.get_shop_list(1)
				}else if(index==2){
					this.get_shop_list(2)
				}
			},
			get_sys_userinfo() {
				let userInfo = JSON.parse(JSON.stringify(loginStore.userInfo))
				var params = {
					user_id: userInfo.user_id
				}
				this.$api.third_openApi.get_user_info(params).then((res) => {
					if (res.code == 0) {

						let row = res.data.data
						this.flow_data = row[0]

					}
				})
			},
			get_shop_list(type){
				var params = {
					type_id: type
				}
				this.$api.third_openApi.shop_list(params).then((res) => {
					if (res.code == 0) {
				
						this.shop_list = res.data.data
						
				
					}
				})
			},
			see_detail(data) {
				
							
				uni.setStorageSync('shop_info', data)
				uni.navigateTo({
					url: '/pages/movie/bet/detial?id='+data.id,
				});
			
			},
			change_num(val) {

			},
			showtime(nowdate, endate) {
				//2023-12-15 14:42:27
				if (endate !== '') {
					var nowtime = new Date(), //获取当前时间
						endtime = new Date(endate); //定义结束时间
					var lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
						leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
						lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
						leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
						lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
					//console.log('dddd', lefth + ':' + leftm + ':' + lefts)
					this.time1 = lefth
					this.time2 = leftm
					this.time3 = lefts

					return leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
				} else {
					// clearInterval(this.time_build);
					// this.time_build = null;
					// this.if_over = true
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
			see_list() {
				uni.navigateTo({
					url: '/pages/movie/bet/list',
				});

			},
			get_bet_num(data, index) {
				if (this.Number_arr[index].ifhad) {
					this.Number_arr[index].ifhad = false
				} else {
					this.Number_arr[index].ifhad = true
				}

				const result = this.Number_arr.find(item => item.ifhad == true);
				if (result !== undefined) {
					this.pop_bet = true
				} else {
					this.pop_bet = false
				}

				if (this.pageHeight < 820 && this.pop_bet == true) {
					this.scroll_ft = true
				}

			},
			get_num(data) {
				this.bet_num = data
			},
			reset() {
				this.bet_num = ''
			},
			async get_userInfo() {
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/user/getUserInfo',
					method: "POST",
				})
				if (res.code == 200) {
					this.userinfo = res.data
					this.max_num = this.userinfo.balance
				}
			},
			async getNewOpenData() {
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/movie/getNewOpenData',
					method: "POST",
				})
				if (res.code == 200) {
					this.getHistoryOpenData()
					this.qishu = res.data.open_no
					this.qishu_id = res.data.id
					this.time_build = setInterval(() => {
						this.showtime('', res.data.open_time)
					}, 1000)
					this.ifrun = true
				}
			},
			async getOpenData() {
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/movie/getActionDetail',
					method: "POST",
				})
				if (res.code == 200) {
					this.qishu = res.data.next_open_data.open_no
					this.qishu_id = res.data.next_open_data.id
					this.time_build = setInterval(() => {
						this.showtime('', res.data.next_open_data.open_time)
						//this.showtime('', '2023-12-19 10:27:17')
					}, 1000)
				}
			},
			async getHistoryOpenData() {
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/movie/getHistoryOpenData',
					method: "POST",
					data: {
						page: 1,
						pagesize: 10
					}
				})
				if (res.code == 200) {
					this.Number_laster = res.data.data

				}
			},
			async submit_bet() {
				var _this = this


				if (Number(this.bet_num) > Number(this.max_num)) {
					uni.showToast({
						title: this.$t('bet.pop_tit1'),
						icon: "none"
					});
					return
				}
				if (Number(this.bet_num) < 0 || Number(this.bet_num) == 0) {
					uni.showToast({
						title: this.$t('bet.pop_tit2'),
						icon: "none"
					});
					return
				}
				let ids = new Array()
				this.Number_arr.forEach((item) => {
					if (item.ifhad == true) {
						ids.push(item.value)
					}

				})
				if (ids.length == 0) {
					uni.showToast({
						title: this.$t('bet.pop_tit3'),
						icon: "none"
					});
					return
				}

				const res = await this.$myRuquest({
					url: '/api/front/order/createOrder',
					method: "POST",
					data: {
						next_open_id: this.qishu_id,
						multiple_id: ids.toString(),
						amount: Number(this.bet_num)
					}
				})
				if (res.code == 200) {
					uni.showToast({
						title: this.$t('bet.pop_tit4'),
						icon: "success"
					});
					this.bet_num = ''
					this.Number_arr.forEach((item) => {
						item.ifhad = false

					})
					this.get_userInfo()
				}
			},
			run_fun() {
				this.get_sys_userinfo()
				this.get_userInfo()
				this.getOpenData()
				this.getHistoryOpenData()
				this.Number_arr = [{
					name: this.$t('bet.bet_n1'), //'春',
					value: 1,
					ifhad: false
				}, {
					name: this.$t('bet.bet_n2'), //'夏',
					value: 2,
					ifhad: false
				}, {
					name: this.$t('bet.bet_n3'), //'秋',
					value: 3,
					ifhad: false
				}, {
					name: this.$t('bet.bet_n4'), //'冬',
					value: 4,
					ifhad: false
				}]
			}
		},
		onLoad() {
			this.pop_notice = false

			var backbutton = document.getElementsByClassName('uni-page-head-hd')[0]
			if (backbutton) backbutton.style.display = 'none';


		},
		mounted() {
			this.pageHeight = document.documentElement.clientHeight;


		},
		onShow() {

		}
	}
</script>

<style scoped>
	page {
		background: #969696;

	}

	.flow_line {
		display: flex;
		justify-content: space-between;
		width: 85%;
		margin: 20px auto;
	}

	.flow_l {
		height: 1px;
	}

	.flow_m {
		display: flex;
		align-items: center;
		margin: 10px 0;
	}

	.color2 {
		color: #969799;
	}

	.color2_bg {
		background: #969799;
	}

	.color1 {
		color: #e6557f;
	}

	.color1_bg {
		background: #e6557f;
	}

	.bet_top {
		height: auto;
		width: 94%;
		margin: auto;
		margin-top: 10px;
		border-radius: 18px 18px 0 0;
		background: #e6557f;
		position: relative;
	}
	.bet_tab{ display: flex;width: 90%; margin: auto;}
	.bet_tab_zi{ width: 33%; background: #251c487a; color: #fff; text-align: center; line-height: 40px;}
	.bet_tab_haver{background: #e6557f;}

	.bet_top_ft {
		height: auto;
		width: 94%;
		margin: auto;
		display: flex;
		border-radius: 0 0 18px 18px;
		background: #fff;

	}

	.bet_t_ft_m {
		width: 50%;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
	}

	.bet_line {
		display: flex;
		justify-content: space-between;
	}

	.bet_ge {
		padding: 5px 0;
		color: #fff;
		font-size: 14px;

	}

	.time {
		border: 1px solid #fff;
		padding: 2px;
		margin: 10px 0;
		color: #fff;
		width: 50px;
		text-align: center;
		border-radius: 5px
	}

	.bet_main {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-top: 10px;
	}

	.bet_mainzi {
		width: 50%;
		margin: 10px 0;
	}

	.bet_zi {
		border-radius: 8px;
		line-height: 60px;
		width: 90%;
		margin: auto;
		background: #e6557f;
		text-align: center;
		color: #fff;
		font-size: 18px;
	}

	.bet_zi_get {
		background: #251C48;
	}

	.bet_foot {
		height: 240px;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 50px;
		background: #fff;
		border-radius: 18px 18px 0 0;
		z-index: 1027;
	}

	.bet_f_m {
		padding: 10px 15px;
	}

	.bet_f_mtit {
		font-size: 14px;
		color: #333;
		display: flex;
		justify-content: space-between;
		padding-bottom: 10px;
	}

	.had_num {
		color: #e6557f;
		;
	}

	.bet_num_line {
		display: flex;
		justify-content: center;
	}

	.bet_num {
		border: 1px solid #e6557f;
		padding: 5px;
		width: 48px;
		text-align: center;
		border-radius: 5px;
		margin: 10px 5px;
		color: #e6557f;

	}

	.inmut_l {
		/* border: 1px solid #ccc; */
		border-radius: 28px;
		text-align: center;
		height: 30px;
		line-height: 30px;
		color: #e6557f;
		background: #bebebe;
		width: 100px;
		margin: 0 5px;
		padding: 0px 15px;
	}

	.reset_btn {
		height: 30px;
		color: #fff;
		background: #EAC477;
		text-align: center;
		line-height: 30px;
		border-radius: 28px;
		font-size: 14px;
	}

	.ok_btn {
		height: 35px;
		color: #fff;
		background: #e6557f;
		width: 80%;
		text-align: center;
		line-height: 35px;
		font-size: 14px;
		margin: 20px auto;
	}

	.ok_btn2 {
		height: 35px;
		color: #fff;
		background: #e6e6e6;
		width: 80%;
		text-align: center;
		line-height: 35px;
		font-size: 14px;
	}

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

	.history_are {
		background: #251c487a;
		border-radius: 8px;
		position: absolute;
		top: 149px;
		left: 0px;
		width: 100%;
		padding: 10px 0px;
		z-index: 1029;
	}

	.scroll_ft {
		padding-bottom: 300px;
	}
	
	
	.list_are {
		padding: 10px 5px;
		padding-top: 0;
	
		display: flex;
		flex-wrap: wrap;
		justify-content:flex-start;
		overflow-y: scroll;
		padding-bottom: 10px;
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
	
</style>