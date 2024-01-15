<template>
	
	<view>
		<view class="socket-status pd-10 im-flex justify-between im-align-items-center" v-if="!socketStatus">
			<view class="cuIcon-infofill text-red f-18"></view>
			<view class="c-666 f-12"> WS通信已断开，检查网络设置是否正常</view>
			<view @tap="reconnect()">重连</view>
		</view>
		<view class="border-b pd-10 text-gray im-flex im-justify-content-start" v-if="multiport">
			<view class=" iconfont icon-web f-18 ml-20"></view>
			<view class="f-12 ml-20"> Web网页端已登录</view>
			</view>
		
		<messageList :msgs="msgs" @itemTap="itemTap" @btnTap="btnTap"></messageList>
	</view>
</template>

<script>
	import messageList from '@/components/message-list';
	import { storeToRefs } from 'pinia';
	import { useMsgStore } from '@/store/message';
	import { useloginStore } from '@/store/login'
	import pinia from '@/store/index'
	const msgStore = useMsgStore(pinia)
	const {contacts} = storeToRefs(msgStore);
	const userStore = useloginStore(pinia);
	const {multiport} = storeToRefs(userStore);
	export default {
		components: {
			messageList
		},
		data() {
			return {
				navCurrent: 0,
				msgs: contacts,
				// 核心区域高度
				mainHeight: 500,
				pageLoading: true,
				multiport:multiport,
				socketStatus:true,
				
			}
		},
		mounted(){
			// 监听ws网路连接状况
			uni.$on('socketStatus',(e)=>{
				if(!e){
					this.multiport=false;
				}
				this.socketStatus=e;
			})
		},
		methods: {
			btnTap: function(index, contact) {
				// 第一个按钮被点击 置顶、取消置顶消息
				if (index == 0) {
					contact.is_top=contact.is_top==0 ? 1 : 0;
					this.$api.msgApi.setChatTopAPI({
						  id: contact.id,
						  is_top:contact.is_top,
						  is_group: contact.is_group
						}).then(res => {
						  if (res.code == 0) {
							msgStore.updateContacts(contact);
						  }
						});
				}
				// 第三个按钮被打开 [ 删除消息 ]
				else if (index == 1) {
					uni.showModal({
						title: this.$t('message.pop_no_t3'),//'确定要删除吗?',
						success: e => {
							if (e.confirm) {
								this.$api.msgApi.delChatAPI({
									  id: contact.id,
									  is_group: contact.is_group
									}).then(res => {
									  if (res.code == 0) {
										msgStore.deleteContacts(contact);
									  }
									});
							}
						}
					});
				}
				// 第二个按钮被打开 [ 删除消息 ]
				else if (index == 2) {
					contact.is_notice=contact.is_notice==0 ? 1 : 0;
					this.$api.msgApi.setIsNotice({
						  id: contact.id,
						  is_notice:contact.is_notice,
						  is_group: contact.is_group
						}).then(res => {
						  if (res.code == 0) {
							msgStore.updateContacts(contact);
						  }
						});
				}
			},
			// 列表本身被点击 进入连天展示的页面
			itemTap: function(e, item) {
				// 更新所有的未读消息
				msgStore.unread -= item.unread;
				// 将当前的消息置为已读
				let contacts = this.msgs;
				contacts[e].unread = 0;
				msgStore.initContacts(contacts);
				uni.navigateTo({
					url:"/pages/message/chat?id=" + item.id
				})
			},
			reconnect(){
				uni.showLoading({
					title:'重连中...'
				})
				this.socketIo.connectSocketInit({type:'ping'});
				setTimeout(()=>{
					uni.hideLoading()
				},1500)
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	.border-b{
		border-bottom: 1px solid #eee;
	}
	.socket-status{
		background-color: #fde0de;
	}
</style>
