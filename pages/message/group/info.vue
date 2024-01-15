<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('group_sys.message_tit')}}</template>
		</cu-custom>
		<view align="center" class="groupInfo">
			<image :src="contact.avatar" mode="widthFix" style="width:120px;height:120px;border-radius: 12rpx;"></image>
			<view class="f-14 mt-10">
				{{contact.name}} ({{contact.groupUserCount}})
			</view>
		</view>
		<view class="padding flex flex-direction mt-10" v-if="!contact.isJoin">
			<button class="cu-btn bg-green lg"  @tap="applyGroup">
				{{$t('group_sys.message_tit2')}}
			</button>
		</view>
		<view class="padding flex flex-direction mt-10" v-else>
			<button class="cu-btn bg-green lg"  @tap="openChat">
				{{$t('group_sys.message_tit3')}}
			</button>
		</view>
	</view>
</template>
<script>
	const userInfo=uni.getStorageSync('userInfo');
	import pinia from '@/store/index'
	import { useMsgStore } from '@/store/message';
	const msgStore = useMsgStore(pinia)
	export default {
		data() {
			return {
				contact:{},
				group_id:0
			}
		},
		onLoad(options) {
			this.group_id = options.group_id?options.group_id:''
			this.getGroupInfo()
		},
		methods: {
			getGroupInfo() {
				this.$api.msgApi.groupInfo({
					group_id: this.group_id
				}).then((res) => {
					let data=res.data;
					this.contact=data;
					
				})
			},
			applyGroup() {
				if(this.contact.setting.invite==0){
					return uni.showToast({
						title:this.$t('group_sys.pop_tit4'),//'该群聊已经关闭加群申请',
						icon:'none'
					})
				}
				this.$api.msgApi.joinGroup({
					group_id: this.group_id,
					inviteUid:this.contact.inviteUid
				}).then((res) => {
					if(res.code==0){
						this.contact.is_group=1;
						msgStore.appendContacts(this.contact);
						this.openChat();
					}
				})
			},
			openChat(){
				uni.navigateTo({
					url:"/pages/message/chat?id="+this.group_id
				})
			}
		}
	}
</script>
<style scoped>
	.groupInfo{
		margin-top: 100rpx;
	}
</style>
