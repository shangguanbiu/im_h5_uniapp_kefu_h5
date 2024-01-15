
<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true" >
			<template #backText></template>
			<template #content>{{$t('message.msg_tit')}}</template>
		</cu-custom>
		<view>
			<view class="bg-white">
				<view v-if="is_group==1" class="user-list im-flex im-justify-content-start im-align-items-center im-a im-wrap">
					<view class="user-info mt-20" v-for="(item,index) in userList" :key="index" align="center">
						<image class="user-avatar" :src="item.userInfo.avatar" @tap="openChatDetail(item.userInfo)"></image>
						<view class="text-center user-name text-overflow">{{item.userInfo.displayName}}</view>
					</view>
					<view class="user-info mt-20" v-if="isAuth || is_group==0 || contact.setting.invite">
						<view class="user-opt radius-8" style='margin:auto' @tap='editUser(2)'>
							<view class="icon cuIcon-add f-24"></view>
						</view>
						<view class="f-11 mt-5">{{$t('message.msg_add')}}</view>
					</view>
					<view class="user-info mt-20" v-if="isAuth">
						<view class="user-opt radius-8" style='margin:auto' @tap='manageUser()'>
							<view class="icon cuIcon-move f-24"></view>
						</view>
						<view class="f-11 mt-5">{{$t('message.msg_remove')}}</view>
					</view>
				</view>
				<navigator v-if="is_group==1" class="mt-10" :url="`/pages/message/group/groupUser?group_id=${contact_id}`">
					<view class="text-center pb-15 pt-15 im-flex im-justify-content-center im-align-items-center">
						<text class="gui-list-title-text gui-list-one-line gui-primary-color">{{$t('message.msg_see')}}</text>
						<text class="gui-list-title-desc gui-color-gray">{{allUser.length}}人</text>
						<text class="cuIcon-right"></text>
					</view>
				</navigator>
				
				
			</view>
			<view class="cu-list menu mt-15 bg-white" v-if="is_group==1">
				<view class="cu-item"  @click="open">
					<view class="content padding-tb-sm">
						<view> {{$t('message.msg_group_name')}} </view>
					</view>
					<view class="action">
						<view class="text-grey">{{contact.displayName}} <text class="cuIcon-right"></text></view>
					</view>
				</view>
				<!-- <view class="cu-item"  @click="openQr" v-if="contact.setting.invite">
					<view class="content padding-tb-sm">
						<view> 群二维码 </view>
					</view>
					<view class="action">
						<view class="text-grey"><text class="cuIcon-qr_code f-18"></text> <text class="cuIcon-right"></text></view>
					</view>
				</view> -->
				<view class="cu-item"  @tap="openModel('notice')">
					<view class="content padding-tb-sm">
						<view> {{$t('message.msg_group_notice')}} </view>
					</view>
					<view class="action" style="width:80%">
						<view class="text-grey im-flex im-justify-content-end">
							<view class="text-overflow notice-line">
								{{contact.notice ?? $t('message.msg_group_nonotice')}}
							</view>
							<text class="cuIcon-right"></text>
						</view>
					</view>
				</view>
				<view class="cu-item"  v-if="isAuth" @tap="openModel('manage')">
					<view class="content padding-tb-sm">
						<view> {{$t('message.msg_group_guanli')}}  </view>
					</view>
					<view class="action">
						<view class="text-grey"><text class="cuIcon-right"></text></view>
					</view>
				</view>
				<uni-popup ref="popup" type="dialog">
					<uni-popup-dialog mode="input" :value="contact.displayName" :title="$t('message.msg_group_rename')" :duration="2000" :before-close="true" @close="closePop" @confirm="editGroupName">
						
					</uni-popup-dialog>
				</uni-popup>
			</view>
			
			<view class="cu-list menu mt-15 bg-white">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view> {{$t('message.msg_group_set_no')}} </view>
					</view>
					<view class="action">
						<switch class="switch" @change="setIsNotice" :class="!contact.is_notice?'checked':''" :checked="!contact.is_notice?true:false"></switch>
					</view>
				</view>
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view> {{$t('message.msg_group_set_top')}} </view>
					</view>
					<view class="action">
						<switch class="switch" @change="setIsTop" :class="contact.is_top?'checked':''" :checked="contact.is_top?true:false"></switch>
					</view>
				</view>
			</view>
			
<!-- 			<view class="cu-list menu mt-15 bg-white">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view> 查看聊天记录 </view>
					</view>
					<view class="action">
						<view class="text-grey"><text class="cuIcon-right"></text></view>
					</view>
				</view>
			</view> -->
			
			<view class="cu-list menu mt-15 bg-white" v-if="is_group==1" @tap="removeGroup">
				<view class="cu-item text-center delete-btn">
					<text class="c-red">{{isAdmin ? $t('message.msg_group_close') : $t('message.msg_group_out')  }}</text>
				</view>
			</view>
			<view class="parting-line-20"></view>
			<view class="cu-modal bottom-modal" :class="modelName=='notice'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="action text-gray" @tap="closeModel">{{$t('message.quxiao')}}</view>
						<view class="action text-green" @tap="editNotice">{{$t('message.save')}}</view>
					</view>
					<view class="notice-content">
						<textarea class="im-textarea" maxlength="-1" :disabled="!isAuth" v-model="contact.notice" @input="textareaAInput" :placeholder="$t('message.msg_group_notice2')"></textarea>
					</view>
				</view>
			</view>
			<view class="cu-modal bottom-modal" :class="modelName=='manage'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="action text-gray" @tap="closeModel">{{$t('message.quxiao')}}</view>
						<view class="action text-green" @tap="saveManage">{{$t('message.save')}}</view>
					</view>
					<view class="manage-content">
						<view class="cu-list menu mt-15 bg-white">
							<view class="cu-item">
								<view class="content padding-tb-sm">
									<view>{{$t('message.msg_group_set_t1')}}</view>
									<view class="text-gray text-sm">{{$t('message.msg_group_set_t2')}} </view>
								</view>
								<view class="action">
									<switch class="switch" @change="setManage" :class="contact.setting.manage=='1'?'checked':''" :checked="contact.setting.manage=='1'?true:false"></switch>
								</view>
							</view>
							<view class="cu-item">
								<view class="content padding-tb-sm">
									<view>{{$t('message.msg_group_set_t3')}}</view>
									<view class="text-gray text-sm">{{$t('message.msg_group_set_t4')}}</view>
								</view>
								<view class="action">
									<switch class="switch"  @change="setInvite" :class="contact.setting.invite=='1'?'checked':''" :checked="contact.setting.invite=='1'?true:false"></switch>
								</view>
							</view>
							<view class="cu-item">
								<view class="content padding-tb-sm">
									<view>{{$t('message.msg_group_set_t5')}}</view>
									<view class="text-gray text-sm">{{$t('message.msg_group_set_t6')}}</view>
								</view>
								<view class="action">
									<switch class="switch"  @change="setProfile" :class="contact.setting.profile=='1'?'checked':''" :checked="contact.setting.profile=='1'?true:false"></switch>
								</view>
							</view>
							<uni-section :title="$t('message.msg_group_set_t7')" type="line">
								<radio-group class="block" @change="setSpeak">
									<view class="cu-form-group" v-for="item in radioList">
										<view class="title">{{item.label}}</view>
										<radio :class="contact.setting.nospeak==item.value?'checked':''" :checked="contact.setting.nospeak==item.value?true:false" :value="item.value"></radio>
									</view>
								</radio-group>
							</uni-section>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { useMsgStore } from '@/store/message';
	import pinia from '@/store/index'
	const msgStore = useMsgStore(pinia)
	const userInfo=uni.getStorageSync('userInfo');
	export default {
		components: {
		},
		data() {
			return {
				pageLoading: true,
				contact_id: null, //聊天id,
				is_group:0,
				modelName:false,
				userList: [], //群成员
				allUser:[],
				chatRecordlist: [{
						text: '文本',
						icon: "icon-wenben",
						type: 'text'
		
					},
					{
						text: '图片',
						icon: "icon-zhaopian",
						type: 'image'
		
					}, {
						text: '文件',
						icon: "icon-wenjian",
						type: 'file'
		
					}, {
						text: '视频',
						icon: "icon-shipin",
						type: 'video'
		
					}, {
						text: '项目',
						icon: "icon-xiangmu_2",
						type: 'project'
		
					}, {
						text: '客户',
						icon: "icon-kehu",
						type: 'leads'
		
					},
				],
				radioList: [{
						label: this.$t('message.msg_group_close2'),//"关闭",
						value: 0
					},
					{
						label: this.$t('message.msg_group_set_r1'),//"仅管理员可发言",
						value: 1
					},
					{
						label: this.$t('msg_group_set_r2'),//"仅群主可发言",
						value: 2
					},
				],
				isAuth: false, //判断自己是否时群管理或者群主
				contact: null, //联系人相关信息
				isAdmin:false, //如果为真，自己就是群主
				isManage: false, // 如果为真，自己就是管理
				user_ids: [],
				user:[],//全部群成员
			}
		},
		onShow() {
				this.getUserlist()
		},
		onLoad: function(options) {
			this.is_group = options.is_group;
			this.contact_id = options.id;
			let contact=msgStore.getContact(this.contact_id)
			this.contact=contact;
			if(this.is_group==0){
				contact.userInfo={
					id:contact.user_id,
					account:contact.account,
					displayName:contact.displayName,
					avatar:contact.avatar
				}
				this.allUser.push(contact);
				this.userList.push(contact);
			}
		},
		methods: {
			openModel(model){
				this.modelName=model;
			},
			closeModel(){
				this.modelName=false;
			},
			saveManage(){
				if(!this.isAuth) return;
				this.$api.msgApi.groupSetting({
					id: this.contact.id,
					setting: this.contact.setting
				})
				this.modelName=false;
			},
			setManage(e){
				this.contact.setting.manage=e.detail.value ? '1' : '0';
			},
			setInvite(e){
				this.contact.setting.invite=e.detail.value ? '1' : '0';
			},
			setProfile(e){
				this.contact.setting.profile=e.detail.value ? '1' : '0';
			},
			setSpeak(e){
				this.contact.setting.nospeak=e.detail.value;
			},
			setIsNotice(e){
				this.contact.is_notice=e.detail.value ? 0 : 1;
				this.$api.msgApi.isNoticeAPI({
					id: this.contact.id,
					is_group:this.contact.is_group,
					is_notice:this.contact.is_notice
				})
			},
			setIsTop(e){
				this.contact.is_top=e.detail.value ? 1 : 0;;
				this.$api.msgApi.setChatTopAPI({
					id: this.contact.id,
					is_group:this.contact.is_group,
					is_top:this.contact.is_top
				})
			},
			editNotice(){
				if(!this.isAuth) return;
				this.$api.msgApi.setNotice({
					id: this.contact.id,
					notice: this.contact.notice
				})
				this.modelName=false;
			},
			open() {
				this.$refs.popup.open()
			},
			openQr() {
				uni.navigateTo({
					url: '/pages/index/qrcode?group_id='+ this.contact.id
				})
			},
			editGroupName(e){
				this.$api.msgApi.editGroupName({id:this.contact.id,displayName:e}).then( res =>{
					this.contact.displayName=e;
					this.$refs.popup.close()
				})
			},
			closePop(){
				this.$refs.popup.close()
			},
			//移除群聊
			removeGroup() {
				// 如果是群主就解散群聊，否则就退出群聊
				let txt=this.$t('message.msg_group_out')//"退出群聊";
				if(this.isAdmin) txt=this.$t('message.msg_group_close')//"解散群聊";
				uni.showModal({
					title: this.$t('message.pop_no_t1')+txt+'?',
					success: e => {
						if (e.confirm) {
							if(this.isAdmin){
								this.$api.msgApi.removeGroup({id:this.contact.id}).then((res)=>{
									// 删除之后返回首页
									uni.reLaunch({
										url: '/pages/index/index'
									})
								})
							}else{
								this.$api.msgApi.removeUser({id:this.contact.id,user_id:userInfo.user_id}).then((res)=>{
									// 删除之后返回首页
									uni.reLaunch({
										url: '/pages/index/index'
									})
								})
							}
							
						}
					}
				});
				
			},
			// 添加群成员
			editUser(type) {
				this.user_ids = this.allUser.map(item => item.user_id)
				if(this.contact.is_group==0){
					type=1
				}
				uni.navigateTo({
					url: '/pages/index/userSelection?type='+type+'&contact_id=' + this.contact.id
				})
			},
			// 管理群成员
			manageUser() {
				uni.navigateTo({
					url: '/pages/message/group/groupUser?group_id=' + this.contact.id
				})
			},
			// 跳转到聊天记录
			goChatRecord(type) {
				uni.navigateTo({
					url: '/package/message/pages/chatRecord/chatRecord?type=' + type + '&toContactId=' + this.contact_id + '&is_group=1'
				})
			},
			// 获取群成员列表
			getUserlist() {
				if(this.is_group==0) return;
				this.userList = []
				this.$api.msgApi.groupUserList({
					group_id: this.contact_id
				}).then(res => {
					this.user = res.data
					if (res.code !== 0) return
					// 判断自己是否为群主
					const admin=res.data.filter(item => item.role == 1 && item.userInfo.id== userInfo.user_id)
					if(admin.length) this.isAdmin=true;
					// 判断自己是否是群管理
					const manage=res.data.filter(item => item.role == 2 && item.userInfo.id== userInfo.user_id)
					if(manage.length) this.manage=true;
					// 判断是否有管理权限
					if(admin.length || manage.length) this.isAuth=true;
					this.allUser=JSON.parse(JSON.stringify(res.data));
					if (res.data.length > 18) {
						if (this.isAuth) {
							this.userList = res.data.splice(0, 18)
						}else if(this.contact.setting.invite){
							this.userList = res.data.splice(0, 19)
						} else {
							this.userList = res.data.splice(0, 20)
						}
					} else {
						this.userList = res.data
					}
					this.pageLoading = false;
				})
			},
			// 打开联系人详情
			openChatDetail(item){
				if(userInfo.user_id==item.id) return;
				let friend=msgStore.getContact(item.id);
				if(this.contact.role<3 || this.contact.setting.profile=='1' || friend){
					uni.navigateTo({
						url:"/pages/contacts/detail?id="+item.id
					})
				}else{
					uni.showToast({
						title:this.$t('message.pop_no_t2'),//'已开启用户隐私！',
						icon:'none'
					})
					return false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-list{
		padding:0 20rpx 20rpx;
		.user-info{
			width:142rpx;
			height:130rpx;
			text-align:center;
			.user-avatar{
				width:100rpx;
				height:100rpx;
				border-radius: 16rpx;
			}
			.user-name{
				width:100rpx;
				margin:0 auto;
				font-size: 22rpx;
			}
			.user-opt{
				border:1px dashed #999;
				height:98rpx;
				width:98rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.icon{
					color:#999 !important;
				}
				
			}
		}
		
	}

	.delete-btn{
		justify-content:center !important ;
	}
	
	.notice-content{
		width:100%;
		min-height:480rpx;
		.im-textarea{
			width:100%;
			min-height:480rpx;
			padding:20rpx;
			text-align:left;
		}
	}
	.manage-content{
		text-align: left;
	}
	.notice-line{
		width:70%;
		text-align: right;
	}
</style>
