<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('like.title')}}</template>
		</cu-custom>
		<view v-if="likes_arr.length !==0">
			<view class="user_line" v-for="(people,t_index) in likes_arr" :key="t_index" v-show="t_index<4">
				<view class="user_l">
					<view style="display: flex;">
						<view class="sex_ico" v-if="people.sex==0"><image src="@/static/image/nv.png"  style="width: 100%;" mode='widthFix' ></image></view>
						<view class="sex_ico" v-if="people.sex==1"><image src="@/static/image/nan.png"  style="width: 100%;" mode='widthFix' ></image></view>
						
						<image :src="host+people.avatar" v-if="people.avatar !==null"
							style="width: 80px; height: 80px; border-radius: 50%;"></image>
						<image src="@/static/image/women.png" v-if="people.avatar ==null&&people.sex==0"
							style="width: 80px; height: 80px; border-radius: 50%;"></image>
						<image src="@/static/image/men.png" v-if="people.avatar ==null&&people.sex==1"
							style="width: 80px; height: 80px; border-radius: 50%;"></image>
						<image src="@/static/image/men2.png" v-if="people.avatar ==null&&people.sex==2"
							style="width: 80px; height: 80px; border-radius: 50%;"></image>
					</view>
					<view class="item_like">
						<view class="cuIcon-title" v-if="people.ifonline" @tap="setLike(2,people.account,t_index)"></view>
					</view>
				</view>
				<view class="user_r">
					<view class="item_name">
					{{people.realname}}
					<view class="col_96" style="display: flex;width: 150px; justify-content: flex-end;"><view>{{people.isfar}}km · </view><view v-if="people.ifonline">在线</view><view v-if="!people.ifonline">{{people.istime}}小时</view></view>
					</view>
					<view style="margin: 5px 0;">
						<view class="p_type p_type1" v-if="people.sex==0">{{$t('like.sex_nv')}}</view>
						<view class="p_type p_type2" v-if="people.sex==1">{{$t('like.sex_nan')}}</view>
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
	</view>
</template>

<script>
	import { useloginStore } from '@/store/login'
	import pinia from '@/store/index'
	const loginStore = useloginStore(pinia)
	export default {
		data() {
			return {
				paddingB: 0,
				total: 0,
				params: {
					page: 1,
					limit: 10,
					is_mine: 0
				},
				list: [],
				iflike:false,
				had_likes:[],
				likes_arr:[],
				host:'',
			}
		},
		methods: {
			getList() {
				let userInfo = JSON.parse(JSON.stringify(loginStore.userInfo))
				this.$api.third_openApi.near_user_List(this.params).then((res) => {
					if (res.code == 0) {
						let list_arr = res.data.data;
						this.total = res.count;
						 list_arr.forEach((item) => {
							this.$set(item, 'iflike', false)
							this.$set(item, 'isfar', (Math.random()*(2.5-1)+1).toFixed(2))
							 this.$set(item, 'ifonline', Math.random() >= 0.5)
							 this.$set(item, 'istime', (Math.random()*(1.5-1)+1).toFixed(2))
							 if(this.had_likes.length !==0){
								 this.had_likes.forEach((item_zi) => {
								 	if(item.account==item_zi){
								 		item.iflike=true
								 		this.likes_arr.push(item)
								 	}
								 	
								 })
							 }
							
						})
						
						if(userInfo.islevel==0){
							this.list=list_arr.slice(0,5)
						}else{
							this.list=list_arr
						}
						
					}
				})
			},
			setLike(type,user_account,index) {
				var params={
					type:type,
					user_id:uni.getStorageSync('userInfo').user_id,
					user_account:user_account
				}
				if(type==1){
					this.$api.third_openApi.near_user_like(params).then((res) => {
						if (res.code == 0) {
							this.list[index].iflike=true
						}
					})	
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
			this.getList()
			var userinfo=uni.getStorageSync('userInfo')
			this.had_likes=userinfo.islikes.split(',')
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
		
		border-radius: 50%;position: relative;
	}

	.user_r {
		flex: 1;
		padding-left: 15px; 
	}
	.item_name{ font-size: 14px; display: flex ; justify-content:space-between;}
	.item_like{
		position: absolute; bottom: -15px; right: 2px; color: #39b54a; font-size: 36px;
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
		width: 30%; text-align:center;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;
		
	}
	.motto{ padding: 5px 0; font-size: 13px; color: #969696;}
	.col_96{color: #969696;}
	.p_type{ color: #fff; text-align: center; padding: 0px 5px; width: 30px; border-radius: 5px; margin-left: 5px; font-size: 12px;}
	.p_type1{ background: #e6557f;}
	.p_type2{ background: #55aaff;}
	.sex_ico{width: 13px; margin-right:5px; padding-top: 5px;}
</style>
