<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('like.title2')}}</template>
		</cu-custom>
		<view v-if="list.length !==0">
			<view class="user_line" v-for="(people,t_index) in list" :key="t_index" v-show="t_index<4">
				<view class="user_l">
					<image :src="host+people.avatar" v-if="people.avatar !==null"
						style="width: 80px; height: 80px; border-radius: 50%;"></image>
				
					<image src="@/static/image/women.png" v-if="people.avatar ==null&&people.sex==0"
						style="width: 80px; height: 80px; border-radius: 50%;"></image>
					<image src="@/static/image/men.png" v-if="people.avatar ==null&&people.sex==1"
						style="width: 80px; height: 80px; border-radius: 50%;"></image>
					<image src="@/static/image/men2.png" v-if="people.avatar ==null&&people.sex==2"
						style="width: 80px; height: 80px; border-radius: 50%;"></image>
					<view class="item_like">
				
						<view class="cuIcon-title" v-if="people.ifonline" @tap="setLike(2,people.account,t_index)">
						</view>
					</view>
				</view>
				<view class="user_r">
					<view class="item_name">
						<view style="display: flex;">
							<view class="sex_ico" v-if="people.sex==0">
								<image src="@/static/image/nv.png" style="width: 100%;" mode='widthFix'></image>
							</view>
							<view class="sex_ico" v-if="people.sex==1">
								<image src="@/static/image/nan.png" style="width: 100%;" mode='widthFix'></image>
							</view>
							{{people.realname}}
						</view>
						<view class="col_96" style="display: flex;width: 150px; justify-content: flex-end;">
							<view>{{people.isfar}}km · </view>
							<view v-if="people.ifonline">{{$t('like.like_msg_1')}}</view>
							<view v-if="!people.ifonline">{{people.istime+$t('like.like_msg_2')}}</view>
						</view>
					</view>
					<view style="margin: 5px 0; text-align: right;">
						<view class="item_btn" @tap="bet_talk(people)">{{$t('like.talk')}}</view>
					</view>
					<view v-if="people.motto !==''&&people.motto !==null" class="motto">{{$t('like.sine')}}：{{people.motto}}</view>
					<!-- <view style=" max-height: 84px;">
						<view style="display: flex;padding: 10px 0; flex-wrap: wrap;" v-if="people.tags !==null && people.tags !==''">
							<view :class="'item_'+t_tag"  v-for="(tagitem,t_tag) in people.tags.split(',')" :key="t_tag">{{tagitem}}</view>
							
						</view>
					</view> -->

				</view>
			</view>

		</view>
		<Empty v-else :noDatatext="$t('like.no_data')" textcolor="#999" />
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
						<view class="talk_sex p_type1" v-if="talk_data.sex==0">
							<view class="sex_ico">
								<image src="@/static/image/nv_b.png" style="width: 100%;" mode='widthFix'></image>
							</view>
							<view style=" line-height: 25px;">{{talk_data.ages}}</view>
						</view>
						<view class="talk_sex p_type1" v-if="talk_data.sex==1">
							<view class="sex_ico">
								<image src="@/static/image/nan_b.png" style="width: 100%;" mode='widthFix'></image>
							</view>
							<view style=" line-height: 25px;">{{talk_data.ages}}</view>
						</view>
						<view class="talk_sex p_type3" v-if="talk_data.sex==2">
							<view style=" line-height: 25px;">{{talk_data.ages}}</view>
						</view>
						<view class="talk_sex p_type3" v-if="talk_data.islevel !==0">
							
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
		<view v-show="pop_notice">
			<view class="com_bg"></view>
			<view class="com_main">
				<view class="pop_mian">
					<view class="pop_title">{{$t('pop.title')}}</view>
					<view style="padding: 10px 15px;  line-height: 25px; flex-wrap: wrap; text-align: center;">
						{{notice_content}}
					</view>

					<view class="pop_foot">
						<view class="pop_ft_btn1" v-if="notice_type==1" @tap="pop_notice=false">{{$t('pop.close')}}</view>
						<view class="pop_ft_btn2" @tap="pop_ok()" v-if="notice_type==1">{{$t('pop.up')}}</view>
						<view class="pop_ft_btn2" @tap="pop_notice=false" v-if="notice_type==2">{{$t('pop.ok')}}</view>
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
				pop_notice: false,
				notice_type: 1,
				notice_content: this.$t('pop.content4'),//"您当前可打招呼次数已达到每日限制，联更多的TA可开通会员，请联系客服",
				paddingB: 0,
				total: 0,
				 
				params: {
					page: 1,
					limit: 10,
					is_mine: 0,
					agent_id:'',
				},
				list: [],
				iflike: false,
				had_likes: [],

				show_talk: false,
				talk_data: {},
				fromUserid: '',
				fromUser:'',
				send_content: "",
				host:""
			}
		},
		methods: {
			bet_talk(data) {
				this.show_talk = true
				this.talk_data = data

			},
			pop_ok() {
				uni.navigateTo({
					url: '/pages/movie/kefu/kefu'
				});
			},
			getList() {
				this.$api.third_openApi.like_me_index(this.params).then((res) => {
					if (res.code == 0) {
						let list_arr = res.data.data;
						this.total = res.count;
						list_arr.forEach((item) => {
							this.$set(item, 'iflike', false)
							this.$set(item, 'isfar', (Math.random() * (2.5 - 1) + 1).toFixed(2))
							this.$set(item, 'ifonline', Math.random() >= 0.5)
							this.$set(item, 'istime', (Math.random() * (1.5 - 1) + 1).toFixed(2))
							this.had_likes.forEach((item_zi) => {
								if (item.account == item_zi) {
									item.iflike = true
								}

							})
						})
						
						if(this.fromUser.islevel<22){
							this.list=list_arr.slice(0,5)
						}else{
							this.list=list_arr
						}



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
			async check_if_friend(invite_after){
				//提前判断每日剩余打招呼的次数
				if(this.fromUser.istalk ==0&& this.fromUser.role == 0){
					this.pop_notice=true
					this.notice_type=1
					return;
					
				}
				var user_arr=new Array()
				user_arr.push(this.fromUser.user_id)
				user_arr.push(invite_after)
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/index/saveImUser',
					method: "POST",
					data:{
						users:user_arr.toString()
					}
				})
				if (res.code == 200) {
					this.sendMessage(invite_after)
					
				}
			},
			sendMessage(toContactid) {


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
							this.notice_content =this.$t('pop.content6')// '已打招呼，等待TA的回应！可在下方栏目-消息中查看'
							this.pop_notice = true
							this.notice_type = 2
							
							this.count_number()
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
			async count_number(){
				let userInfo = JSON.parse(JSON.stringify(loginStore.userInfo))
				const res = await this.$myRuquest({
					url: '/api/front/index/changeImUserData',
					method: "POST",
					data: {
						user_id: userInfo.user_id,
						column:'istalk'
					},
				})
				if (res.code == 200) {
					this.get_userinfo()
					
				
				}
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
		},
		created() {
			// #ifdef H5
			this.paddingB = this.inlineTools;
			// #endif

			// #ifndef H5
			this.paddingB = this.navBarHeight + this.inlineTools;
			// #endif
			
			var userinfo = uni.getStorageSync('userInfo')
			
			if(userinfo.role !==1){
				this.params.agent_id=userinfo.agent_id
			}
			this.getList()
			this.had_likes = userinfo.islikes.split(',')
			this.fromUser = uni.getStorageSync('userInfo')
			this.host=this.$imgurl()
			
			

		}
	}
</script>

<style scoped>
	.user_line {
		display: flex;
		width: 93%;
		margin: 15px auto;
	}

	.user_l {
		width: 80px;
		height: 80px;

		border-radius: 50%;
		position: relative;
	}

	.user_r {
		flex: 1;
		padding-left: 15px;
	}

	.item_name {
		font-size: 14px;
		display: flex;
		justify-content: space-between;
	}

	.item_like {
		position: absolute;
		bottom: -15px;
		right: 2px;
		color: #39b54a;
		font-size: 36px;
	}

	.item {
		background: linear-gradient(50deg, #9b54ca, #e6557f);
		color: #fff;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
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
		background: linear-gradient(50deg, #832bca, #6937e6);
		color: #fff;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;

	}

	.item_6 {
		background: linear-gradient(50deg, #ca991d, #e67716);
		color: #fff;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;

	}

	.item_btn {
		background: linear-gradient(50deg, #8e3aca, #e6557f);
		color: #fff;
		width: 30%;
		text-align: center;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;

	}

	.motto {
		padding: 5px 0;
		font-size: 13px;
		color: #969696;
	}

	.col_96 {
		color: #969696;
	}

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

	.p_type3 {
		background: #ccc;
	}

	.p_type3 {
		background: #f37b1d;
	}

	.sex_ico {
		width: 13px;
		margin-right: 5px;
		padding-top: 5px;
	}
</style>