<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('contact.title')}}</template>
		</cu-custom>
		<view class="padding flex justify-start align-center">
			<view class='cu-avatar lg radius mr-15' :style="'background-image:url('+detail.avatar+')'">
			</view>
			<view class='im-flex im-justify-content-start im-columns'>
				<view class="mb-5">{{detail.realname}}</view>
				<view class="text-gray">{{detail.account}}</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item"
				v-if="globalConfig.sysInfo.runMode==2 && detail.friend && userInfo.user_id!=detail.user_id"
				@tap="setNickname">
				<view class="content">
					<text class="cuIcon-edit text-green"></text>
					<text>{{$t('contact.remarks')}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{detail.friend.nickname || $t('contact.no_set')}}</text>
					<text class="text-grey text-sm ml-5 cuIcon-write"></text>
				</view>
			</view>
			<!-- <view class="cu-item">
				<view class="content">
					<text class="cuIcon-mail text-green"></text>
					<text>{{$t('contact.emial')}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{detail.email ?? ''}}</text>
				</view>
			</view> -->
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-safe text-green"></text>
					<text>{{$t('contact.sex')}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{ sex(detail.sex)}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="parseInt(globalConfig.sysInfo.ipregion)">
				<view class="content">
					<text class="cuIcon-location text-green"></text>
					<text>IP</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"
						v-if="detail.last_login_ip">{{ detail.last_login_ip || $t('contact.no_msg')}}
						（{{detail.location || $t('contact.no_msg')}}）</text>
					<text class="text-grey text-sm" v-else>未知</text>
				</view>
			</view>
		</view>

		<template class="" v-if="userInfo.user_id!=detail.user_id">
			<view class="padding flex flex-direction" v-if="globalConfig.sysInfo.runMode==1 || detail.friend">
				<button class="cu-btn bg-green mt-10 lg" @tap="sendMsg(detail)">{{$t('contact.send_msg')}}</button>
				<button class="cu-btn bg-blue mt-10 lg" v-if="validatePhone"
					@tap="callPhone()">{{$t('contact.call')}}</button>
				<button class="cu-btn bg-grey mt-10 lg" @tap="modelName='callRtc'"
					v-if="parseInt(globalConfig.chatInfo.webrtc)">{{$t('contact.video')}}</button>
				<button class="cu-btn bg-red  mt-10 lg" @tap="delFriend()"
					v-if="globalConfig.sysInfo.runMode==2">{{$t('contact.del_friend')}}</button>
			</view>
			<view class="padding flex flex-direction" v-if="globalConfig.sysInfo.runMode==2 && !detail.friend">
				<button class="cu-btn bg-green lg" @tap="addFriend()">{{$t('contact.add_friend')}}</button>
			</view>
		</template>
		<view class="cu-modal bottom-modal" :class="modelName=='callRtc'?'show':''" @tap="modelName=''">
			<view class="cu-dialog">
				<view class="manage-content">
					<view class="cu-list menu bg-white">
						<view class="cu-item" @tap="calling(0)">
							<view class="content padding-tb-sm">
								<text class="cuIcon-dianhua"></text>
								<text>{{$t('contact.video_yuyin')}}</text>
							</view>
						</view>
						<view class="cu-item" @tap="calling(1)">
							<view class="content padding-tb-sm">
								<text class=" cuIcon-record"></text>
								<text>{{$t('contact.video_shiping')}}</text>
							</view>
						</view>
						<view class="parting-line-5"></view>
						<view class="cu-item" @tap="modelName=''">
							<view class="content padding-tb-sm">
								<text class="c-red">{{$t('contact.close')}}</text>
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

						{{$t('pop.content8')}}
					</view>

					<view class="pop_foot">
						<view class="pop_ft_btn1" @tap="pop_notice=false">{{$t('pop.close')}}</view>
						<view class="pop_ft_btn2" @tap="pop_ok()">{{$t('pop.up')}}</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		useMsgStore
	} from '@/store/message';
	import {
		useloginStore
	} from '@/store/login';
	import pinia from '@/store/index'
	const msgStore = useMsgStore(pinia)
	const userStore = useloginStore(pinia)
	export default {
		data() {
			return {
				modelName: '',
				detail: {},
				userInfo: userStore.userInfo,
				globalConfig: userStore.globalConfig
			}
		},
		computed: {
			validatePhone() {
				let reg = /^1[3456789]\d{9}$/;
				return reg.test(this.detail.account);
			}
		},
		onLoad(options) {
			this.pop_notice =false
			this.$api.msgApi.getUserInfo({
				user_id: options.id
			}).then((res) => {
				if (res.code == 0) {
					this.detail = res.data;
				}
			})
		},
		methods: {
			sendMsg(info) {
				uni.navigateTo({
					url: "/pages/message/chat?id=" + info.user_id
				})
			},
			sex(value) {
				let arr = [this.$t('contact.sex_nv'), this.$t('contact.sex_nan'), this.$t('contact.no_msg')]
				return arr[value] || this.$t('contact.no_msg');
			},
			callPhone() {
				let userInfo = JSON.parse(JSON.stringify(userStore.userInfo))

				if (userInfo.islevel == 0 && userInfo.role !== 1) {
					this.pop_notice = true
					return;
				}
				uni.makePhoneCall({
					phoneNumber: this.detail.account
				});
			},
			calling(is_video) {
				let userInfo = JSON.parse(JSON.stringify(userStore.userInfo))
				
				
				if(is_video==0){
					//yuyin
					if (userInfo.ifvoice == 0 && userInfo.role !== 1) {
						this.pop_notice = true
						return;
					}
				}
				if(is_video==1){
					//yuyin
					if (userInfo.ifvideo == 0 && userInfo.role !== 1) {
						this.pop_notice = true
						return;
					}
				}
				
				if (msgStore.webrtcLock) {
					return uni.showToast({
						title: this.$t('contact.other'), //'其他终端正在通话中',
						icon: 'none'
					})
				}
				this.modelName = '';
				let msg_id = this.$util.getUuid();
				uni.navigateTo({
					url: '/pages/message/call?msg_id=' + msg_id + '&type=' + is_video + '&status=1&id=' + this
						.detail.user_id + '&name=' + this.detail.realname + '&avatar=' + encodeURI(this.detail
							.avatar)
				})
			},
			delFriend() {
				uni.showModal({
					title: this.$t('contact.sure_del'), //'确定要删除该好友吗？',
					success: (res) => {
						if (res.confirm) {
							let data = {
								id: this.detail.user_id
							};
							this.$api.friendApi.delFriend(data).then((res) => {
								if (res.code == 0) {
									msgStore.deleteContacts(data);
									uni.reLaunch({
										url: '/pages/index/index'
									})
								}
							})
						}
					},
				})

			},
			addFriend() {
				uni.showModal({
					title: this.$t('contact.check_msg'), //'请输入验证信息',
					editable: true,
					success: (res) => {
						if (res.confirm) {
							if (res.content == '') {
								return uni.showToast({
									title: this.$t('contact.check_remark'), //'请输入备注！',
									icon: 'error'
								})
							}
							this.$api.friendApi.addFriend({
								user_id: this.detail.user_id,
								remark: res.content
							}).then((e) => {
								if (e.code == 0) {
									uni.showToast({
										title: e.msg,
										icon: 'none'
									})
								}
							})
						}
					}
				});
			},
			setNickname() {
				let friend_id = this.detail.friend.friend_id ?? '';
				if (!this.detail.friend) {
					return uni.showToast({
						title: this.$t('contact.can_not_set'), //'无法设置',
						icon: 'error'
					})
				}
				uni.showModal({
					title: this.$t('contact.check_remark2'), //'请输入备注信息',
					editable: true,
					success: (res) => {
						if (res.confirm) {
							if (res.content == '') {
								return uni.showToast({
									title: this.$t('contact.check_remark3'), //'请输入好友备注！',
									icon: 'error'
								})
							}
							this.$api.friendApi.setNickname({
								friend_id: friend_id,
								nickname: res.content
							}).then((e) => {
								if (e.code == 0) {
									this.detail.friend.nickname = res.content;
									uni.showToast({
										title: e.msg,
										icon: 'none'
									})
								}
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>