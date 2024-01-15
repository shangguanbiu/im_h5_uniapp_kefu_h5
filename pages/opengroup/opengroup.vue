<template>
	<view>
		<!-- <cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<template #backText></template>
			<template #content>福利群</template>
		</cu-custom> -->
		<view style="padding-bottom: 50px;" v-if="list.length !==0">
			<view class="user_line" v-for="(people,t_index) in list" :key="t_index">
				
				<view class="user_l">
					<image :src="host+people.avatar" mode='widthFix' style="width: 100%; border-radius: 8px;"></image>
				</view>
				<view class="user_r">
					<view class="item_name">{{people.name}}</view>
					<view style=" max-height: 90px; font-size: 13px; color: #969696; padding: 10px 0;">
						{{people.desc_v}}

					</view>
					<view v-if="people.ifin" @tap="openDetails(people)" class="item_btn2">
						
						{{$t('group.in_group')}}
					</view>
					<view v-else class="item_btn" @tap="into_droup(people.group_id,t_index)">
						
						{{$t('group.add_group')}}
					</view>
				</view>
			</view>
		</view>
		<Empty v-else :noDatatext="$t('group.no_data')" textcolor="#999" />
	</view>
</template>

<script>
	import {
		storeToRefs
	} from 'pinia';
	import pinia from '@/store/index'
	import {
		useMsgStore
	} from '@/store/message';
	const msgStore = useMsgStore(pinia)
	

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
				join_id: '',
				contacts: [],
				host:'',
			}
		},
		methods: {
			// 打开聊天
			openDetails(items) {
				
				uni.navigateTo({
					url: "/pages/message/chat?id=" + 'group-' + items.group_id
				})
			},
			getList() {
				this.$api.third_openApi.opengroup_List(this.params).then((res) => {
					if (res.code == 0) {
						this.list = res.data.data;
						this.total = res.count;

						for (var i = 0; i < this.list.length; i++) {
							for (var k = 0; k < this.contacts.length; k++) {
								if (this.list[i].group_id == this.contacts[k].group_id) {
									this.$set(this.list[i], 'ifin', true)
								}
							}
						}

					}
				})
			},
			into_droup(id, index) {
				var _this = this
				this.$api.third_openApi.into_group({
					group_id: 'group-' + id,
					inviteUid: [1]
				}).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: this.$t('group.seccess'),
							icon: "success"
						});
						this.initContacts()

						this.$set(this.list[index], 'ifin', true)

					}
				})
			},
			initContacts() {
				this.modelName = '';
				this.$api.msgApi.initContacts().then(res => {
					// 设置消息未读数和系统消息未读数
					msgStore.sysUnread = res.count;
					msgStore.initContacts(res.data);
				})
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
			this.contacts = uni.getStorageSync('allContacts');
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
		width: 100px;
		height: 100px;
		border-radius: 8px;
	}

	.user_r {
		flex: 1;
		padding-left: 15px;
	}

	.item_name {
		font-size: 14px;
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

	.item_btn {
		background: #9b54ca;
		color: #fff;
		width: 100%;
		text-align: center;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;
		margin-top: 10px;
	}

	.item_btn2 {
		background: #c191ca;
		color: #fff;
		width: 100%;
		text-align: center;
		display: inline-block;
		border-radius: 0.33333rem;
		margin-right: 0.33333rem;
		font-size: 12PX;
		padding: 0.33333rem 1rem;
		margin-bottom: 0.33333rem;
		margin-top: 10px;
	}
</style>