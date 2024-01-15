<template>
	<view>
		<view class="listare">
			<view v-if="list.length !==0">
				<view class="li_are" v-for="(listitem,k) in list" :key="k" @click="see_detail(listitem)">
					<view class="li_a_top">
						{{listitem.title}}
						<view class="li_a_top_p">
							<u-parse :content="listitem.desc" noData="暫無內容"></u-parse>
						</view>
					</view>
					<van-divider />
					<view class="li_a_top money_line">
						<view style="width: 120px;">查看詳情 </view>
						<view style="flex: 1; text-align: right; padding-right: 40px;">{{listitem.create_time}}</view>

						<view class="money_lr">
							<van-icon name="arrow" />
						</view>
					</view>
				</view>
				<view style="text-align: center; line-height: 50px; color: #ccc;">{{notice}}</view>
			</view>
			<view v-else class="listare li_are">
				<view class="empty_ico">
					<van-empty class="custom-image" :image="empty_img" description="暫無記錄..." />
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				year: 0,
				data_index: 0,
				ifdown: false,
				ifpop: false,
				page: 1,
				pagesize: 10,
				notice: "上拉顯示更多",
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
				empty_img: require("@/static/image/empty_ico1.png"),
				list: []
			}
		},
		components: {
			uParse
		},
		methods: {
			see_money(index) {
				this.list[index].ifsee = !this.list[index].ifsee
			},
			see_detail(data) {
				uni.navigateTo({
					url: './detail/detail?id=' + data.id,
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


				const res = await this.$myRuquest({
					url: '/api/front/notice/getList',
					method: "POST",
					data: {
						page: this.page,
						pagesize: this.pagesize,
						type: 3
					},
				})
				if (res.code == 200) {
					this.list = [...this.list, ...res.data.list]
				}

				callBack && callBack()

			},
			formatNum(value) {
				if (!value && value !== 0) return 0;
				let str = value.toString();
				let reg =
					str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
				return str.replace(reg, "$1,");
			},
			async getmorelists() {
				this.notice = '正在加載...'
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false
				}
				this.loadingType = 1
				uni.showNavigationBarLoading() //显示加载动画
				this.page++ // 得到数据之后 page+1
				const res = await this.$myRuquest({
					url: '/api/front/notice/getList',
					method: "POST",
					data: {
						type: 3,
						page: this.page,
						pagesize: this.pagesize,
					},
				})
				if (res.code == 200) {


					if (this.page == Number(res.data.last_page)) { // 没有数据
						this.loadingType = 2
						this.notice = '沒有更多數據了'
						uni.hideNavigationBarLoading() // 关闭加载动画
						return
					}
					this.list = this.list.concat(res.data.list) //将数据拼接在一起
					this.loadingType = 0 // 将loadingType归0重置
					uni.hideNavigationBarLoading() // 关闭加载动画
				}

			}


		},
		onLoad() {
			this.list = []
			this.getList()
			const b = new Date();
			this.year = b.getFullYear()
			this.columns.push(this.year - 1)
			for (let i = 0; i < 5; i++) {
				this.columns.push(this.year + i)
			}
			this.columns.forEach((element, index) => {
				if (element == this.year) {
					this.data_index = index
				}
			})

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
	@import url('../../components/u-parse/u-parse.css');

	page {
		background: #F7F8FC;
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
		width: calc(100% - 64rpx);
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
</style>
