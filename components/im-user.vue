<template>
	<view class="cu-avatar lg icon_vip_are" :class="appSetting.circleAvatar?'round':'radius'" @tap="openUserInfo(info)" :style="[{backgroundImage:'url('+ info.avatar +')'}]">
		<view class="icon_vip_l" v-if="right==false&&ifvip==true">
			<image src="@/static/image/guan_l.png"  mode='widthFix' style="width: 100%;max-height: 100px;">
			</image>
		</view>
		<view class="icon_vip_r" v-if="right==true&&ifvip==true">
			<image src="@/static/image/guan_r.png"  mode='widthFix' style="width: 100%;max-height: 100px;">
			</image>
		</view>
	</view>
</template>
<script>
	const userInfo=uni.getStorageSync('userInfo');
	const appSetting=uni.getStorageSync('appSetting');
	import { useMsgStore } from '@/store/message';
	import pinia from '@/store/index'
	const msgStore = useMsgStore(pinia)
export default{
	name  : "im-touch",
	props : {
		info:{type:Object, default:function(){return {};}},
		circleAvatar:{type:Boolean, default:false},
		profile:{type:Boolean, default:false},
		right:{type:Boolean, default:false},
		ifvip:{type:Boolean, default:false},
	},
	data() {
		return {
			toucheTimer  : 0,
			fingerRes    : [],
			distance     : 0,
			taptimer     : 100,
			appSetting:appSetting
		}
	},
	
	methods:{
		// 打开用户详情
		openUserInfo(item){
			let friend=msgStore.getContact(item.user_id);
			if(!this.profile && !friend){
				uni.showToast({
					title:'已开启用户隐私！',
					icon:'none'
				})
				return false;
			}
			if(item.id==userInfo.user_id) return;
			uni.navigateTo({
				url:"/pages/contacts/detail?id="+this.info.id
			})
		}
	}
}
</script>
<style scoped></style>