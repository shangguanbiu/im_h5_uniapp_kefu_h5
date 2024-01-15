<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>附近的人</template>
		</cu-custom>
		<view>
			<view class="user_line" v-for="(people,t_index) in list" :key="t_index">
				<view class="user_l">
					<image :src="people.avatar"  style="width: 80px; height: 80px; border-radius: 50%;"></image>
					<view class="item_like">
						
						<view class="cuIcon-title" v-if="people.ifonline" @tap="setLike(2,people.account,t_index)"></view>
					</view>
				</view>
				<view class="user_r">
					<view class="item_name">
					{{people.realname}}
					<view class="col_96" style="display: flex;width: 150px; justify-content: flex-end;">{{people.isfar}}km · <view v-if="people.ifonline">在线</view><view v-if="!people.ifonline">{{people.istime}}小时</view></view>
					</view>
					<view style="margin: 5px 0;">
						<view class="p_type p_type1" v-if="people.sex==0">女</view>
						<view class="p_type p_type2" v-if="people.sex==1">男</view>
					</view>
					<view v-if="people.motto !==null" class="motto">签名：{{people.motto}}</view>
					<!-- <view style=" max-height: 84px;">
						<view style="display: flex;padding: 10px 0; flex-wrap: wrap;" v-if="people.tags !==null && people.tags !==''">
							<view :class="'item_'+t_tag"  v-for="(tagitem,t_tag) in people.tags.split(',')" :key="t_tag">{{tagitem}}</view>
							
						</view>
					</view> -->
					
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				had_likes:[]
			}
		},
		methods: {
			getList() {
				this.$api.third_openApi.near_user_List(this.params).then((res) => {
					if (res.code == 0) {
						this.list = res.data.data;
						this.total = res.count;
						this.list.forEach((item) => {
							this.$set(item, 'iflike', false)
							this.$set(item, 'isfar', (Math.random()*(2.5-1)+1).toFixed(2))
							 this.$set(item, 'ifonline', Math.random() >= 0.5)
							 this.$set(item, 'istime', (Math.random()*(1.5-1)+1).toFixed(2))
							this.had_likes.forEach((item_zi) => {
								if(item.account==item_zi){
									item.iflike=true
								}
								
							})
						})
						
					

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
			
			console.log('f',uni.getStorageSync('userInfo'))
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
		width: 100%; text-align:center;
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
</style>
