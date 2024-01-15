<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<template #backText>
				
				<!-- <view v-if="PageCur=='message' || PageCur=='contacts'" class="f-20 ml-10 mr-10" @tap="search()">
					<text class="cuIcon-search" style="margin-left: -10px;"></text>
				</view> -->
				
			</template>
			<template #content>{{PageName}}</template>
			<template #right>
				<view v-if="PageCur=='contacts' && (globalConfig && globalConfig.demon_mode)" class="f-20 ml-10 mr-10"
					@tap="showContacts()">
					<text class="f-24" :class="TabCur ? 'cuIcon-peoplelist' : 'cuIcon-friend'"></text>
				</view>
				<view v-if="PageCur=='message'" class="f-20 ml-10 mr-10" @tap="modelName='add'">
					<text class="cuIcon-add f-28"></text>
				</view>
		
			</template>
		</cu-custom>
		<view>
			
			<message v-if="PageCur=='message'"></message>
			<contacts v-if="PageCur=='contacts'" :TabCur="TabCur"></contacts>
			<!-- <compass v-if="PageCur=='compass'"></compass> -->
			<!-- <mine v-if="PageCur=='mine'"></mine> -->

		</view>
		<view class="cu-bar tabbar bg-white shadow foot" :key="keyIndex">
			<view class="action" @click="NavChange(item)" v-for="(item,index) in navList" 
				data-cur="message">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/image/tabbar/' + [item.name] + [PageCur==item.name?'-active':''] + '.svg'">
					</image>
					<view class="cu-tag badge" v-if="item.notice>0">{{item.notice}}</view>
				</view>
				<view :class="PageCur==item.name?'text-mauve':'text-black'">{{item.title}}</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modelName=='add' ? 'show' : ''" @tap="modelName=''">
			<view class="cu-dialog">
				<view class="manage-content">
					<view class="cu-list menu bg-white">
						<view class="cu-item" @tap="initContacts();">
							<view class="content padding-tb-sm">
								<text class="cuIcon-refresh"></text>
								<text>{{$t('talk.reload')}}</text>
							</view>
						</view>
						<view v-if="userinfo.role !==undefined &&userinfo.role==1">
							<view class="cu-item" @tap="addFriend()" v-if='globalConfig.sysInfo.runMode==2'>
								<view class="content padding-tb-sm">
									<text class="cuIcon-friendadd"></text>
									<text>{{$t('talk.add_friend')}}</text>
								</view>
							</view>
							<view class="cu-item" @tap="addGroup()">
								<view class="content padding-tb-sm">
									<text class=" cuIcon-friend"></text>
									<text>{{$t('talk.new_group')}}</text>
								</view>
							</view>
							<!-- <view class="cu-item" @tap="scan()">
								<view class="content padding-tb-sm">
									<text class=" cuIcon-scan mr-10"></text>
									<text>扫 一 扫</text>
								</view>
							</view> -->
						</view>
						<view class="parting-line-5"></view>
						<view class="cu-item" @tap="modelName=''">
							<view class="content padding-tb-sm">
								<text class="c-red">{{$t('talk.close')}}</text>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import message from '@/pages/message';
	import contacts from '@/pages/contacts';
	import compass from '@/pages/compass';
	import mine from '@/pages/mine';
	import {
		storeToRefs
	} from 'pinia';
	import {
		useMsgStore
	} from '@/store/message';
	import {
		useloginStore
	} from '@/store/login';
	import pinia from '@/store/index'
	import scan from '@/common/scan.js'
	const msgStore = useMsgStore(pinia)
	const loginStore = useloginStore(pinia)
	const {
		unread,
		sysUnread
	} = storeToRefs(msgStore);
	export default {
		components: {
			message,
			contacts,
			compass,
			mine
		},
		data() {
			let navList = [{
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
				}
			]
			let compass = {
				name: 'compass',
				title: '探索',
				notice: 0
			};

			let mine = {
				name: 'mine',
				title: '我的',
				notice: 0
			}
			// navList.push(mine);
			return {
				
				globalConfig: loginStore.globalConfig,
				PageCur: 'message',
				PageName: this.$t('nav.message'),
				TabCur: 0,
				modelName: false,
				navList: [],
				userinfo: {},
				tabs: 0,
				tabs_arr: [{
					id: 1,
					name: '影院',
					ifshow: false
				}, {
					id: 2,
					name: '群',
					ifshow: false
				}, {
					id: 3,
					name: '探索',
					ifshow: false
				}, {
					id: 4,
					name: '附近的人',
					ifshow: false
				}, ],
				
			}
		},
		onShow() {
			//this.initContacts();
			this.navList = [{
					name: 'message',
					title: this.$t('nav.message'),
					notice: unread
				}, 
				{
					name: 'contacts',
					title: this.$t('nav.contacts'),
					notice: sysUnread
				}, {
					name: 'mine',
					title: this.$t('nav.mine'),
					notice: 0
				}
			]
		},
		onLoad() {
				
		},
		mounted() {
			  
			// #ifndef MP
			uni.hideTabBar();
			// #endif	
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

			this.userinfo = uni.getStorageSync('userInfo')

		},
		methods: {
			closeModel() {
				this.modelName = false;
			},
			scan() {
				scan.scanQr();

			},
			NavChange: function(item) {

				if (item.name == 'mine') {
					uni.navigateTo({
						url: '/pages/mine/index',
					});
				} else if (item.name == 'contacts') {
					uni.switchTab({
						url: '/pages/contacts/index',
					});
				} else if (item.name == 'compass') {
					uni.navigateTo({
						url: '/pages/compass/index',
					});
				}else if (item.name == 'serve') {
					uni.navigateTo({
						url: '/pages/movie/kefu/kefu',
					});
				}  else if (item.name == 'home') {
					uni.switchTab({
						url: '/pages/index/index',
					});
				}
			},
			showContacts() {
				this.TabCur == 1 ? this.TabCur = 0 : this.TabCur = 1
			},
			initContacts() {
				this.modelName = '';
				this.$api.msgApi.initContacts().then(res => {
					// 设置消息未读数和系统消息未读数
					msgStore.sysUnread = res.count;
					msgStore.initContacts(res.data);
				})
			},
			addGroup() {
				uni.navigateTo({
					url: '/pages/index/userSelection?type=1'
				})
			},
			addFriend() {
				uni.navigateTo({
					url: '/pages/contacts/search'
				})
			},
			search() {
				const type = this.PageCur == "message" ? 1 : 2;
				uni.navigateTo({
					url: '/pages/index/search?type=' + type
				})
			},
			tab_change(index) {
				this.tabs = index
			},
		}
	}
</script>

<style scoped>
	.tab_mline {
		display: flex;
		justify-content: center;
		padding: 20px 0;

	}


	.tab_mline_zi {

		font-size: 13px;
		color: #646566;
		width: 25%;
		text-align: center;

	}


	.tab_ico {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}

	.tab_hover {
		color: #3E3EF7;
		position: relative;
	}

	.tab_hover::after {
		content: '';
		height: 2px;
		width: 50%;
		background: #3E3EF7;
		position: absolute;
		left: 25%;
		bottom: -8px;
	}
</style>