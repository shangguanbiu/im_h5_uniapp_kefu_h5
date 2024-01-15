<template>
	<view class="scroll">
		<view v-if='!if_more'>
			<!-- <cu-custom bgColor="bg-gradual-pink" :isBack="false">
				<template #backText></template>
				<template #content>附近的人</template>
			</cu-custom> -->
			<tantan v-if="list.length > 0" :list="list" @onChange="change" @Image="clickImage" @see_more="show_detail"
				@openpop="open_pop" @bet_like="bet_like"></tantan>
		</view>
		<view v-else>
			<view>
				<view class="page-section swiper">
					<view class="cuIcon-back back" @tap="if_more=false"></view>
					<view style="position: relative;">
						<swiper :indicator-dots="indicatorDots" :indicator-color="indicatorColor"
							:indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval"
							:duration="duration" style="height: 450px;">
							<swiper-item v-for="(banner,indexbn) in bannerdata" :key="'a'+indexbn">
								<image :src="banner" mode='widthFix' style="width: 100%;"></image>
							</swiper-item>

						</swiper>
					</view>
				</view>
				<view class="main_i">
					<view class="main_title">

						<!-- <view class="p_type p_type1" v-if="detail_data.sex==0">女</view>
						<view class="p_type p_type2" v-if="detail_data.sex==1">男</view> -->
						<view style="margin-right: 5px;">{{detail_data.realname}}</view>
						<view class="talk_sex p_type1" style=" height: 18px;" v-if="detail_data.sex==0">
							<view class="sex_ico">
								<image src="@/static/image/nv_b.png" style="width: 100%;" mode='widthFix'></image>
							</view>
							<view style="font-weight: normal; font-size: 13px;">{{detail_data.ages}}</view>
						</view>
						<view class="talk_sex p_type2" style=" height: 18px;" v-if="detail_data.sex==1">
							<view class="sex_ico">
								<image src="@/static/image/nan_b.png" style="width: 100%;" mode='widthFix'></image>
							</view>
							<view style="font-weight: normal; font-size: 13px;">{{detail_data.ages}}</view>
						</view>
						<view class="talk_sex p_type3" style=" height: 18px;" v-if="detail_data.sex==2">
							<!-- <view class="sex_ico" ><image src="@/static/image/nan_b.png"  style="width: 100%;" mode='widthFix' ></image></view> -->
							<view style=" font-size: 13px;">{{detail_data.ages}}</view>
						</view>

					</view>

					<view class="mian_price_line">
						<view style="padding-right: 30px; color: #a09d9d;">
							{{detail_data.isfar+'km '+$t('nearby.actie_time2s')+detail_data.istime+$t('nearby.actie_time2')+detail_data.ispepole+$t('nearby.like_ta')}}
						</view>

					</view>
					<view class="main_title" style="margin-top: 10px;color: #2a1468;">{{$t('nearby.about_me')}}</view>
					<view style="padding-bottom: 90px;">
						<view class="dangan" style="color: #a09d9d;;">
							{{detail_data.motto}}
						</view>
						<view style="display: flex;padding: 10px 0;flex-wrap:wrap" v-if="detail_data.tags">
							<view :class="'item_'+t_index" v-for="(tagitem,t_index) in detail_data.tags.split(',')"
								:key="t_index">
								{{tagitem}}
							</view>
						</view>
					</view>
					<view class="ft_zhaohu_line">
						<view style="margin-right: 5px;" @tap="bet_talk()">
							<view class="ft_zh_zi" style="color:rgb(248, 186, 53)">
								<view class="cuIcon-commandfill" style=" margin-right: 5px; font-size: 17px;"></view>
								{{$t('nearby.talk')}}
							</view>
						</view>
						<view style="margin-left: 5px;" v-show="iflike ==true">
							<view class="ft_zh_zi" style="color:rgb(250, 84, 124) ;">
								<view class="cuIcon-likefill" style=" margin-right: 5px; font-size: 17px;"></view>
								{{$t('nearby.like')}}
							</view>
						</view>
						<view style="margin-left: 5px;" v-show="iflike ==false" @tap="bet_like()">
							<view class="ft_zh_zi" style="color:rgb(250, 84, 124) ;">
								<view class="cuIcon-like" style=" margin-right: 5px; font-size: 17px;"></view>
								{{$t('nearby.like')}}
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
					<view style="padding: 10px 15px;  line-height: 25px; flex-wrap: wrap; text-align: center;">
						{{notice_content}}
					</view>

					<view class="pop_foot">
						<view class="pop_ft_btn1" v-if="notice_type==1" @tap="pop_notice=false">{{$t('pop.close')}}
						</view>
						
						<view class="pop_ft_btn2" @tap="pop_ok()" v-if="notice_type==1&&ifno_msg==false">{{$t('pop.up')}}</view>
						<view class="pop_ft_btn2" @tap="pop_notice=false" v-if="notice_type==2&&ifno_msg==false">{{$t('pop.ok')}}</view>
						<view class="pop_ft_btn2" @tap="to_set()" v-if="ifno_msg==true">{{$t('pop.set')}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="show_talk">
			<view class="com_bg" @tap="show_talk=false"></view>
			<view class="talk_mian">
				<view style="width:90%; margin: auto;">
					<view class="talk_ico">
						<image :src="talk_data.avatar" v-if="talk_data.avatar !==null"
							style="width: 100%;border-radius: 50%; height: 80px;" mode='widthFix'></image>
						<image src="@/static/image/women.png" v-if="talk_data.avatar ==null&&talk_data.sex==0"
							sstyle="width: 100%;border-radius: 50%; height: 80px;" mode='widthFix'></image>
						<image src="@/static/image/men.png" v-if="talk_data.avatar ==null&&talk_data.sex==1"
							style="width: 100%;border-radius: 50%; height: 80px;" mode='widthFix'></image>
						<image src="@/static/image/men2.png" v-if="talk_data.avatar ==null&&talk_data.sex==2"
							style="width: 100%;border-radius: 50%; height: 80px;" mode='widthFix'></image>	
					</view>
					<view class="talk_name">{{talk_data.realname}}</view>
					<view class="talk_desc">
						<view class="talk_sex p_type1" style="height: 20px;" v-if="talk_data.sex==0">
							<view class="sex_ico">
								<image src="@/static/image/nv_b.png" style="width: 100%;" mode='widthFix'></image>
							</view>
							<view style="font-weight: normal; font-size: 13px;"
								v-if="talk_data.ages !==0&&talk_data.ages !==null">
								{{talk_data.ages}}
							</view>
						</view>
						<view class="talk_sex p_type1" style="height: 20px;" v-if="talk_data.sex==1">
							<view class="sex_ico">
								<image src="@/static/image/nan_b.png" style="width: 100%;" mode='widthFix'></image>
							</view>
							<view style="font-weight: normal; font-size: 13px; "
								v-if="talk_data.ages !==0&&talk_data.ages !==null">
								{{talk_data.ages}}
							</view>
						</view>
						<view class="talk_sex p_type3" style="height: 20px;"
							v-if="talk_data.sex==2&&talk_data.ages !==0 &&talk_data.ages !==null">
							<view style=" font-weight: normal; font-size: 13px;">
								{{talk_data.ages}}
							</view>
						</view>
						<view class="talk_sex p_type3" style="height: 20px;" v-if="talk_data.islevel !==0">
							<view style=" font-weight: normal;" v-if="talk_data.islevel ==21">VIP</view>
							<view style=" font-weight: normal;" v-if="talk_data.islevel ==22">Super VIP</view>
							<view style=" font-weight: normal;" v-if="talk_data.islevel ==23">MVP VIP</view>
						</view>
					</view>
					<view class="talk_form">
						<view style="padding-left: 10px;">
							<input :placeholder="$t('like.talk_desc_1')" style="height: 32px; font-size: 14px;" maxlength="32"
								name="input" v-model="send_content" />
						</view>
						<view>
							<button class='cu-btn bg-blue shadow' @tap="check_if_friend(talk_data.user_id)">{{$t('like.send')}}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tantan from '@/components/dgex-tantan/dgex-tantan.vue'
	import {
		useloginStore
	} from '@/store/login'
	import pinia from '@/store/index'
	const loginStore = useloginStore(pinia)
	export default {
		components: {
			tantan
		},
		data() {
			return {
				show_talk: false,
				talk_data: {},
				if_more: false,
				pop_notice: false,
				notice_type: 1,
				notice_content: this.$t('pop.content3'), //"您当前可观看浏览附近的人已达到每日限制，观看更多可开通会员，请联系客服",
				send_content: '',
				fromUser: '',
				detail_data: '',
				list: [],
				paddingB: 0,
				total: 0,
				params: {
					agent_id:null,
					page: 1,
					limit: 10,
				},
				iflike: false,
				had_likes: [],
				scrollW: 0,
				show_login: false,
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				bannerdata: [],
				indicatorColor: "#292b40",
				indicatorActiveColor: "#ffffff",
				tag: [],
				ifno_msg:false
				
			}
		},
		mounted() {


			
			this.get_userinfo()
			this.getList()
			return
			this.if_more = false
			// const arr = []
			// /* 测试数据*/
			// const tu = [
			// 	"https://pic1.zhimg.com/50/v2-fc82ae5d95b116d105932e8bdf38b920_720w.jpg?source=2c26e567",
			// 	"https://picx.zhimg.com/50/v2-2ff9dc184a4fa00fa1e0c493013d8d13_720w.jpg?source=2c26e567",
			// 	"https://picx.zhimg.com/50/v2-a4b356c00dfc7c92c5b69d533e99aa8f_720w.jpg?source=2c26e567",
			// 	"https://picx.zhimg.com/50/v2-ad949fa892116bd98fa02968fb517dd5_720w.jpg?source=2c26e567",
			// 	"https://picx.zhimg.com/50/v2-94d1226578c67f8f25893b5972acaa43_720w.jpg?source=2c26e567"
			// ]
			// for (let index = 0; index < 10; index++) {
			// 	const n = Math.floor(Math.random() * (tu.length - 1))
			// 	let data = {
			// 		image: tu[n],
			// 		title: '你好',
			// 		desc: n + 500 + 'm ' + '30分钟前活跃',
			// 		tags: ['射手座']
			// 	}
			// 	arr.push(data)
			// }
			// this.list = arr
		},
		methods: {
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
					
					if(this.fromUser.ages==null||this.fromUser.sex==2){
						this.ifno_msg=true
						this.pop_notice=true
						this.notice_content =this.$t('pop.content10')//'请完善个人信息-性别,年龄' 
						
					}else{
						this.ifno_msg=false
					}

				}
			},
			to_set(){
				this.pop_notice=false
				uni.navigateTo({
					url: '/pages/mine/profile_msg'
				});
			},
			open_pop() {
				this.pop_notice = !this.pop_notice
				this.notice_content = this.$t('pop.content3') // '您当前浏览附近的人已达到喜欢的每日限制，观看更多可开通会员，请联系客服'
			},
			bet_talk() {

				if (this.fromUser.istalk == 0 && this.fromUser.role == 0) {
					this.pop_notice = true
					this.notice_type = 1
					this.notice_content = this.$t('pop.content4') //'您当前可打招呼次数已达到每日限制，更多权限可升级会员，请联系客服'
					return;

				}

				this.show_talk = true

			},
			pop_ok() {
				uni.navigateTo({
					url: '/pages/movie/kefu/kefu'
				});
			},
			change(data) {
				// 判断倒数
				console.log('ffff',data)
				if (data.currentIndex == this.list.length - 4) {

					// const tu = [
					// 	'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0704%2Fc7a27a1ej00qvpu700019c000hs00vlc.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
					// 	'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0704%2F9f81e6aaj00qvpu70001xc000hs00vmc.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
					// 	'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0704%2F55bf2cb3j00qvpu70002cc000hs012jc.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
					// 	'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0704%2F2017725bj00qvpu70001jc000hs00zxc.jpg&thumbnail=660x2147483647&quality=80&type=jpg'
					// ]
					// let arr = []
					// for (let index = 0; index < 15; index++) {
					// 	const n = Math.floor(Math.random() * (tu.length - 1))
					// 	let newdata = {
					// 		nearby_img: tu[n],
					// 		name: '你好',
					// 		desc: n + 500 + 'm ' + '30分钟前活跃',
					// 		tags: ['射手座']
					// 	}
					// 	arr.push(newdata)
					// }
					this.params.page++
					this.getList()
					// 情况一 如果是追加数据，合并数组即可
					//this.list = this.list.concat(arr)
					// 情况二 如果是更新数据需要同时重置组件，使用v-if重置组件 重置会闪屏自行处理加个动画
					// this.list = []
					// this.$nextTick(() => {
					// 	this.list = arr
					// 	this.key = Math.round(new Date() / 1000)
					// 	uni.showToast({
					// 		title: `重置组件，更新数据`
					// 	})
					// })
				}
				if(data.type=='reset'){
					this.params.page=1
					
					this.getList()
				}
			},
			clickImage(data) {
				console.log(data);
			},

			show_detail(data) {


				this.iflike = false
				this.bannerdata = []
				this.if_more = true
				this.detail_data = data.currentItem
				this.talk_data = data.currentItem

				this.bannerdata = this.talk_data.nearby_arr.split(',')

				let likes_arr = this.fromUser.islikes.split(',')
				if (likes_arr.length !== 0) {
					const result = likes_arr.find(item => item == this.talk_data.account);
					if (result !== undefined) {
						this.iflike = true
					} else {
						this.iflike = false
					}
				} else {
					this.iflike = false
				}

				this.$emit('to_bottom')



			},
			getList() {
				let userInfo = JSON.parse(JSON.stringify(loginStore.userInfo))
				this.params.agent_id=userInfo.agent_id
				
				this.$api.third_openApi.near_user_List(this.params).then((res) => {
					if (res.code == 0) {
						let get_data=res.data.data
						
						if (this.list.length == 0) {
							console.log('11111')
							this.list = res.data.data;
						} else {
							console.log('+++++++')
							this.list = this.list.concat(res.data.data)
						}
						
						// if(get_data.length==0){
						// 	console.log('最后了')
						// 	this.list = this.list.concat(res.data.data)
							
						// }else{
							
						// }
						


						this.list.forEach((item) => {
							this.$set(item, 'iflike', false)
							this.$set(item, 'isfar', (Math.random() * (2.5 - 1) + 1).toFixed(2))
							this.$set(item, 'ifonline', Math.random() >= 0.5)
							this.$set(item, 'istime', (Math.random() * (30 - 10) + 10).toFixed(0))
							this.$set(item, 'ispepole', (Math.random() * (130 - 20) + 10).toFixed(0))
							this.had_likes.forEach((item_zi) => {
								if (item.account == item_zi) {
									item.iflike = true
								}

							})
						})

					}
				})


			},
			setLike(type, user_account, index) {
				var params = {
					type: type,
					user_id: uni.getStorageSync('userInfo').user_id,
					user_account: user_account
				}
				if (type == 1) {
					this.$api.third_openApi.near_user_like(params).then((res) => {
						if (res.code == 0) {
							this.list[index].iflike = true
						}
					})
				}

			},
			async bet_like(item) {
				if (item !== undefined) {
					this.talk_data = item
				}

				if (this.fromUser.iszan == 0 && this.fromUser.role == 0) {
					this.notice_type = 1
					this.pop_notice = true
					this.notice_content = this.$t('pop.content5') // '您当前可点击喜欢TA的次数已达到每日限制，更多权限可升级会员，请联系客服'
					return;
				}
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/index/imIsLikes',
					method: "POST",
					data: {
						user_id: this.fromUser.user_id,
						account: this.talk_data.account,
					}
				})
				if (res.code == 200) {
					// uni.showToast({
					// 	title: 'ok',
					// 	icon: "none"
					// })
					if (item == undefined) {
						this.count_number('iszan')
					}

					this.iflike = true
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
					this.get_userinfo()
				}
			},
			async check_if_friend(invite_after) {

				var user_arr = new Array()
				user_arr.push(this.fromUser.user_id)
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
			sendMessage(toContactid) {
				//提前判断每日剩余打招呼的次数

				let msg = {
					id: this.$util.getUuid(),
					is_group: 0,
					fromUser: this.fromUser,
					type: 'text',
					toContactId: toContactid,
					content: this.send_content,
					sendTime: new Date().getTime()
				}

				this.$api.msgApi.sendMessage(msg)
					.then((res) => {
						if (res.code == 0) {
							//已开启禁言
							// uni.showToast({
							// 	title: '成功',
							// 	icon: "success"
							// })
							this.show_talk = false
							this.notice_content = this.$t('pop.content6') // '已打招呼，等待TA的回应！可在栏目-消息中查看'
							this.pop_notice = true
							this.notice_type = 2

							this.count_number('istalk')
							this.add_talk()

						} else {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
						}
					})
					.catch((error) => {

					});
			},
			add_talk() {
				//提前判断每日剩余打招呼的次数

				let msg = {
					agent_id:this.fromUser.agent_id,
					remark: "玩家:"+this.fromUser.account + ',向附近的人：' + this.talk_data.account + '打招呼了'
				}

				this.$api.third_openApi.add_talk(msg)
					.then((res) => {
						if (res.code == 0) {


						} else {

						}
					})
					.catch((error) => {

					});
			},
			// 
		}
	}
</script>
<style>
	/deep/ .uni-swiper {
		height: 420rpx;
	}

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
	.p_type {
		color: #fff;
		text-align: center;
		padding: 0px 5px;
		width: 30px;
		border-radius: 5px;
		margin-left: 5px;
		font-size: 12px;
	}

	.p_type1 {
		background: #e6557f;
	}

	.p_type2 {
		background: #55aaff;
	}

	.back {
		position: absolute;
		z-index: 99;
		font-size: 20px;
		color: #fff;
		top: 125px;
		left: 15px;
	}

	.main_i {
		padding: 5px 10px;
	}

	.main_title {
		font-size: 16px;
		font-weight: bold;
		padding: 10px 0;
		display: flex;
		align-items: center;
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

	.item_desc {
		color: #969799;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 200px;
		padding: 10px 0;

	}

	.ft_zhaohu_line {
		display: flex;
		color: #333;
		width: 100vw;
		position: fixed;
		left: 0;
		bottom: 15px;
		justify-content: center;
	}

	.ft_zh_zi {
		/* width: 80px;
		background: rgb(51 51 51 / 15%);
		color: #fff;
		padding: 7px 10px;
		border-radius: 20px;
		text-align: center;
		display: flex;
		justify-content: center; */
		height: 3rem;
		width: 5.625rem;
		margin: 0 0.5rem;
		border-radius: 1.5625rem;
		display: flex;
		justify-content: center;
		align-content: center;
		position: relative;
		transition: 100ms;
		background-color: rgba(158, 158, 158, 0.3);
		line-height: 3rem;
	}
</style>