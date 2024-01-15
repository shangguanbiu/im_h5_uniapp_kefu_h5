<template>
	<view>
		<view class="bet_top">
			<view style="padding: 10px  15px">
				<view class="bet_line bet_ge">
					<view>当前期数</view>

				</view>
				<view style="display: flex;" class="bet_ge">
					<view style="font-weight: bold; font-size: 16px;">{{qishu}}</view>
					<view v-if="ifrun">投票中</view>
					<view v-if="!ifrun">封盘中</view>
				</view>
				<view class="time">01:23</view>
				<view class="bet_line bet_ge">
					<view style="display: flex;">
						<view>20231212000002</view>
						<view class="color_n1">春</view>
						<view class="color_n2">秋</view>
					</view>
					<view @click="ifhistory=!ifhistory" style="display: flex;">历史出票

						<view class="cuIcon-unfold" style="line-height: 19px;margin-left: 2px;" v-if="!ifhistory">
						</view>
						<view class="cuIcon-fold" style="line-height: 19px;margin-left: 2px;" v-if="ifhistory"></view>
					</view>
					<view class="history_are" v-show="ifhistory">
						<view style="padding: 0px 15px">
							<view style="display: flex; padding: 5px 0;" v-for="(item,narr_k) in Number_arr" :key="narr_k">
								<view>20231212000002</view>
								<view class="color_n1">春</view>
								<view class="color_n2">秋</view>
							</view>
						</view>

					</view>
				</view>


			</view>

		</view>
		<view class="bet_top_ft">
			<view class="bet_t_ft_m">活动规则</view>
			<view class="bet_t_ft_m" style="display: flex; justify-content: center; color:#e6557f ;">我的出票
				<view class="cuIcon-right" style="line-height: 40px; margin-left: 2px;"></view>
			</view>

		</view>
		<view class="bet_main">
			<!-- <view class="bet_mainzi" v-for="(nitem,narr_i) in Number_arr" :key="narr_i">
				<view class="bet_zi" :class="{'bet_zi_get':nitem.ifhad}" @click="get_bet_num(nitem,narr_i)">
					{{nitem.name}}</view>
			</view> -->




		</view>
		<!-- <view class="bet_foot">
			<view class="bet_f_m">
				<view class="bet_f_mtit">
					<view>快捷投票</view>
					<view class="had_num">可用积分:{{max_num}}</view>
				</view>
				<view class="bet_num_line">
					<view class="bet_num" v-for="(item,narr_k) in cost_arr" :key="narr_k" @click="get_num(item)">
						{{item}}
					</view>

				</view>
				<view class="bet_num_line" style="padding: 15px 0;">
					<view>投票积分:</view>
					<view><input class="uni-input inmut_l" v-model="bet_num" @change="change_num(bet_num)" type="number"
							placeholder="" />
					</view>
					<view><button type="default" class="reset_btn" @click="reset">重置</button></view>
				</view>
				<button type="default" class="ok_btn" @click="">投票</button>
			</view>

		</view> -->
		<view class="nav_bar">
			<view class="nav_zi" @click="jump(1)">
				<view>
					<image src="@/static/image/shouye.png" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view class="nav_ge">首頁</view>
			</view>
			<view class="nav_zi" @click="jump(2)">
				<view>
					<image src="@/static/image/shouye.png" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view class="nav_ge">影院</view>
			</view>
			<view class="nav_zi">
				<view>
					<image src="@/static/image/shouye_hover.png" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view class="nav_hover nav_ge">投票</view>
			</view>
			<view class="nav_zi" @click="jump(4)">
				<view>
					<image src="@/static/image/shouye.png" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view class="nav_ge">客服</view>
			</view>
			<view class="nav_zi" @click="jump(5)">
				<view>
					<image src="@/static/image/shouye.png" style="width:24px; height: 24px;" mode='widthFix'>
					</image>
				</view>
				<view class="nav_ge">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index_ico: '@/static/image/shouye.png', // require(""),
				index_ico_h: '', // require("@/static/image/shouye_hover.png"),
				cz_ico: '', // require("@/static/image/chongzhi.png"),
				cz_ico_h: '', // require("@/static/image/chongzhi_hover.png"),
				kf_ico: '', //require("@/static/image/kefu.png"),
				kf_ico_h: '', // require("@/static/image/kefu_hover.png"),
				user_ico: '', //require("@/static/image/wode.png"),
				user_ico_h: '', // require("@/static/image/wode_hover.png"),
				bet_num: '',
				max_num: 1000,
				qishu: '20231212000001',
				ifrun: true,
				ifhistory: false,
				history_list: [],
				Number_arr: [{
					name: '春',
					value: 1,
					ifhad: false
				}, {
					name: '夏',
					value: 2,
					ifhad: false
				}, {
					name: '秋',
					value: 3,
					ifhad: false
				}, {
					name: '冬',
					value: 4,
					ifhad: false
				}],
				cost_arr: [10, 50, 100, 200, 500, 1000]
			}
		},
		watch: {
			bet_num(val) {
				if (val > this.max_num) {
					this.bet_num = this.max_num
				} else {
					this.bet_num = val
				}

			}
		},
		methods: {
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
					uni.setStorageSync('PageCur', 'mine')

					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/mine/index',
						});
					}, 100);
				}
			},
			get_bet_num(data, index) {
				if (this.Number_arr[index].ifhad) {
					this.Number_arr[index].ifhad = false
				} else {
					this.Number_arr[index].ifhad = true
				}

			},
			get_num(data) {
				this.bet_num = data
			},
			reset() {
				this.bet_num = ''
			},
		}
	}
</script>

<style scoped>
	page {
		background: #969696;

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
		margin-top: 20px;
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
		height: 222px;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 60px;
		background: #fff;
		border-radius: 18px 18px 0 0;
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
		width: 40px;
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
	}

	.color_n1 {
		color: #fff;
		border-radius: 5px;
		padding: 0px 5px;
		background: #EAC477;
		margin: 0px 10px;
	}

	.color_n2 {
		color: #fff;
		border-radius: 5px;
		padding: 0px 5px;
		background: #8e3aca;
	}

	.history_are {
		background: #251c487a;
		border-radius: 8px;
		position: absolute;
		top: 149px;
		left: 0px;
		width: 100%;
		padding: 10px 0px;
	}
</style>