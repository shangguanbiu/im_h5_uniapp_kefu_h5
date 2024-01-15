<template>
	<view>
		<view  :style="{paddingBottom: paddingB+'px'}">
		<view style="padding-bottom:30rpx">
			<view style="padding:5px 10px;" @tap="To_third(1,'')">
				<image src="/static/image/nearby_ico.jpg" mode='widthFix' style="width: 100%;"></image>
			</view>
			
			<view class="cu-list menu mt-10">
				<!-- <view class="cu-item arrow" @tap="To_third(1,'')">
					<view class='cu-avatar mr-15 invite-bg' :class="true?'round':'radius'">

					</view>
					<view class="content">
						<text class="c-333">附近的人</text>
					</view>

				</view> -->

				<view class="cu-item arrow" @tap="To_third(2,'')">
					<view class='cu-avatar mr-15 group-bg' :class="true?'round':'radius'">

					</view>
					<view class="content">
						<text class="c-333">公开的群</text>
					</view>

				</view>
				<view class="cu-item arrow" v-for="(third_item,t_index) in list" :key="t_index"
					@tap="To_third(3,third_item)">
					<view class='cu-avatar mr-15' :class="true?'round':'radius'">
						<image :src="third_item.logo" mode='widthFix' style="width: 100%;"></image>
					</view>
					<view class="content">
						<text class="c-333">{{third_item.name}}</text>
					</view>

				</view>

			</view>
		</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange(item)" v-for="(item,index) in navList" :key="index"
				data-cur="message">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/image/tabbar/' + [item.name] + [PageCur==item.name?'-active':''] + '.svg'">
					</image>
					<view class="cu-tag badge" v-if="item.notice>0">{{item.notice}}</view>
				</view>
				<view :class="PageCur==item.name?'text-green':'text-black'">{{item.title}}</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		useloginStore
	} from '@/store/login'
	const loginStore1 = useloginStore()
	import pinia from '@/store/index'
	import scan from '@/common/scan.js'
	import {
		useMsgStore
	} from '@/store/message';
	const msgStore = useMsgStore(pinia)
	import {
		storeToRefs
	} from 'pinia';
	const loginStore = useloginStore(pinia)
	const {
		unread,
		sysUnread
	} = storeToRefs(msgStore);
	export default {
		data() {
			return {
				isCard: true,

				userInfo: loginStore1.userInfo,
				paddingB: 0,
				current: 0,
				list: [],
				total: 0,
				params: {
					page: 1,
					limit: 10,
					is_mine: 0
				},
				PageCur: 'compass',
				navList: [{
						name: 'message',
						title: '消息',
						notice: unread
					},
					{
						name: 'contacts',
						title: '通讯录',
						notice: sysUnread
					}, {
						name: 'compass',
						title: '探索',
						notice: 0
					}, {
						name: 'mine',
						title: '我的',
						notice: 0
					}
				],
			};
		},
		created: function() {
			// #ifdef H5
			this.paddingB = this.inlineTools;
			// #endif

			// #ifndef H5
			this.paddingB = this.navBarHeight + this.inlineTools;
			// #endif

			this.getList()


		},
		mounted() {
			var backbutton = document.getElementsByClassName('uni-page-head-hd')[0]
			if(backbutton) backbutton.style.display = 'none';
			// 检查本地联系人,如果没有才去请求接口
			let contacts = uni.getStorageSync('allContacts');
			if (!contacts.length) {
				this.initContacts();
			}
			// 监听ws状态,如果重新连接了,要更新联系人
			uni.$on('socketStatus', (e) => {
				if (e) {
					this.initContacts();
				}
			})
			
			
		},
		methods: {
			NavChange(item) {
				console.log('fff', item)

				if (item.name == 'message') {
					
					uni.switchTab({
						url: '/pages/index/index',
					});
				} else if (item.name == 'contacts') {
					uni.switchTab({
						url: '/pages/contacts/index',
					});
				} else if (item.name == 'compass') {
					uni.navigateTo({
						url: '/pages/compass/index',
					});
				} else {
					uni.navigateTo({
						url: '/pages/mine/index',
					});
				}

			},
			initContacts() {
				this.modelName = '';
				this.$api.msgApi.initContacts().then(res => {
					// 设置消息未读数和系统消息未读数
					msgStore.sysUnread = res.count;
					msgStore.initContacts(res.data);
				})
			},
			IsCard(e) {
				this.isCard = e.detail.value
			},
			getList() {
				this.$api.third_openApi.thirdList(this.params).then((res) => {
					if (res.code == 0) {
						this.list = res.data.data;
						this.total = res.count;

					}
				})
			},
			To_third(type, data) {
				var userInfo = uni.getStorageSync('userInfo')
				if (type == 1) {
					uni.navigateTo({
						url: "/pages/nearby/nearby"
					});
				} else if (type == 2) {
					uni.navigateTo({
						url: '/pages/opengroup/opengroup'
					});
				} else {

					uni.navigateTo({
						//url:'/pages/third/third?url=' + data.url+'&uid='+userInfo.account,
						url: '/pages/movie/index/index'
					});
				}

			},


		}
	}
</script>

<style lang="scss">
	.im-friend-header {
		width: 100%;
		height: 400rpx;
		position: relative;

		.im-friend-bg {
			width: 100%;
			height: 300rpx;
			overflow: hidden;

			.im-friend-image {
				width: 100%;
				height: 300rpx;
			}
		}
	}

	.im-user {
		position: absolute;
		right: 60rpx;
		top: 210rpx;
		overflow: hidden;
	}

	.group-bg {
		background-image: url(@/static/image/group.png);
	}

	.invite-bg {
		background-image: url(@/static/image/invite.png);
	}
</style>