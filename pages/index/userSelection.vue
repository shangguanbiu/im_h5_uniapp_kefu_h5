<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{title}}</template>
			<template #right>
				<view class="mr-10 f-16" @tap="save">{{type==3 ? '转发' : '保存'}}</view>
			</template>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="keywords" placeholder="输入搜索的关键词" confirm-type="search"/>
			</view>
		</view>

		<view class="gui-padding" style="margin-top:120rpx;padding-bottom: 100rpx;" v-if="!keywords">
			<uni-data-checkbox multiple class="user-list-select" @change="chooseUser" v-model="changeUser" :localdata="lists"></uni-data-checkbox>
			<Empty v-if="!lists.length" noDatatext="无联系人" textcolor="#999" ></Empty>
		</view>
		<view class="gui-padding" style="margin-top:120rpx;padding-bottom: 100rpx;"  v-if="keywords">
			<uni-data-checkbox multiple class="user-list-select" @change="chooseSearchUser" v-model="searcheUser" :localdata="searchList"></uni-data-checkbox>
			<Empty v-if="!searchList.length" noDatatext="未搜索到数据" textcolor="#999" ></Empty>
		</view>
		<view class="cu-bar bg-white tabbar border shop footer-opt">
		    <scroll-view class="scroll-view_H" scroll-x="true"  :scroll-anchoring="true" :scroll-left="scrollLeft">
		    	<view class="user-list-avatar">
					<template v-for="item in selectUser">
						<image class="user-avatar" :src="item.avatar" @tap="removeUser(item.id)"></image>
					</template>
				</view>
				<view class="select-num pd-10">已选{{selectUser.length}}人</view>
		    </scroll-view>
		</view>
	</view>
</template>

<script>
	import { useMsgStore } from '@/store/message';
	import { storeToRefs } from 'pinia';
	import pinia from '@/store/index'
	const msgStore = useMsgStore(pinia)
	const {appendContacts} = storeToRefs(msgStore);
	export default {
		data() {

			return {
				title:'发起群聊',
				contact_id:'',
				lists: [],
				keywords:'',
				searchList:[],
				selectUser:[],
				userList: [],
				changeUser: [], //选中的数据
				user_ids: [], //
				type: 1,
				relayState: false,
				scrollLeft:300,
				contacList:[],
				searcheUser:[], //搜索选中人员
				curMsg:{}
			}
		},
		watch: {

			relayState(val) {
				if (val == true) {
					uni.showToast({
						icon: 'success',
						title: '转发成功'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				}

			},
			keywords(val){
				this.search();
				// 如果关键词为空,搜索选中的人员为已经选中的人员
				if(val!=''){
					this.searcheUser=this.changeUser;
				}
			},
			searcheUser(val){
				const arr=this.changeUser.concat(val);
				this.changeUser=[...new Set(arr)];
			}
		},
		components: {
		
		},

		onLoad(options) {
			var pages = getCurrentPages(); //当前页
			var beforePage = pages[pages.length - 2]; //上个页面
			this.type = options.type ? options.type : 1;
			this.contact_id = options.contact_id ? options.contact_id : '';
			if (options.type == 2) {
				this.title="添加成员";
				// 调用上一页的方法刷新 
				// #ifdef H5
				this.user_ids = beforePage.user_ids
				// #endif
				// #ifndef H5
				this.user_ids = beforePage.$vm.user_ids
				// #endif
				this.getAllUser()
			}else if (options.type == 3) {
				this.title="转发聊天";
				// 调用上一页的方法刷新 
				// #ifdef H5
				this.curMsg = beforePage.curMsg
				// #endif
				// #ifndef H5
				this.curMsg = beforePage.$vm.curMsg
				// #endif
				this.getAllUser()
			} else {
				this.title="发起群聊";
				this.getAllUser()
			}


		},
		methods: {
			// 转发
			relay() {
				let user_ids = this.changeUser.map(it => {
					return it.id
				})
				if (!user_ids.length) {
					uni.showToast({
						title: "请选择至少一名人员",
						icon: "none"
					})
				} else if (user_ids.length > 5) {
					uni.showToast({
						title: "转发的人数不能超过5人！",
						icon: "none"
					})
				} else {
					var pages = getCurrentPages(); //当前页
					var beforePage = pages[pages.length - 2]; //上个页面
					let toContactId = ''
					let fromUser = ''
					// 调用上一页的方法刷新
					// #ifdef H5
					fromUser = beforePage.fromUser
					toContactId = beforePage.contact.id
					// #endif
					// #ifndef H5
					fromUser = beforePage.$vm.fromUser
					// #endif
					let selectedItem = ''
					if (this.type == 'relayCrm' || this.type == 'relayProject') {
						// #ifdef H5
						selectedItem = beforePage.message
						// #endif
						// #ifndef H5
						selectedItem = beforePage.$vm.message
						// #endif
					} else {
						selectedItem = uni.getStorageSync('selectedItem')
					}
					user_ids.forEach(it => {
						let msg = {
							id: this.$util.getUuid(),
							is_group: 0,
							fromUser,
							extends: selectedItem.extends ? selectedItem.extends : '',
							type: selectedItem.type,
							toContactId: it,
							content: selectedItem.content,
							sendTime: new Date().getTime()
						}

						this.$api.msgApi.sendMessage(msg)
							.then((res) => {
								if (res.code !== 200) return
								this.relayState = true
							})
					})
				}
			},
			// 移除群成员
			delUser() {
				uni.showModal({
					title: '提示',
					content: '确定删除？',
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "确认", // 确认按钮的文字  
					showCancel: true, // 是否显示取消按钮，默认为 true
					success: (res) => {
						if (res.confirm) {
							var pages = getCurrentPages(); //当前页
							var beforePage = pages[pages.length - 2]; //上个页面
							// 调用上一页的方法刷新 
							// #ifdef H5
							let group_id = beforePage.group_id
							// #endif
							// #ifndef H5
							let group_id = beforePage.$vm.group_id
							// #endif
							this.$api.msgApi.removeUser({
								user_id: this.changeUser.user_id,
								id: group_id
							}).then(rr => {
								if (rr.code !== 200) return
								uni.navigateBack()
							})
						} else {
							console.log('cancel') //点击取消之后执行的代码
						}
					}
				})


			},
			// 添加群成员
			addGroupUser(user_ids) {
				var pages = getCurrentPages(); //当前页
				var beforePage = pages[pages.length - 2]; //上个页面
				// 调用上一页的方法刷新 
				// #ifdef H5
				beforePage.getsimpleMessage = false
				let group_id = beforePage.group_id
				// #endif
				// #ifndef H5
				beforePage.$vm.getsimpleMessage = false
				let group_id = beforePage.$vm.group_id
				// #endif
				this.$api.msgApi.addGroupUser({
					user_ids,
					id: group_id
				}).then(res => {
					if (res.code == 200) {
						uni.navigateBack()
					}
				})
			},
			// 添加群聊
			addGroup(user_ids) {
				this.$api.msgApi.addGroup({
					user_ids
				}).then(res => {
					if (res.code == 200) {
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)



					}
				})
			},
			getAllUser() {
				const allContact=uni.getStorageSync('allContacts');
				let contact=[];
				if(this.type==3){
					contact = allContact.filter((item)=>{
						return item.id!=this.contact_id;
					})
					contact.forEach(item => {
						item.disable = false;
						let name=item.displayName;
						if(item.is_group){
							name+="（群聊）";
						}
						item.text=name;
						item.value=item.id;
					})
				}else{
					contact = allContact.filter((item)=>{
						return item.is_group==0;
					})
					this.contacList=JSON.parse(JSON.stringify(contact));
					contact.forEach(item => {
						item.disable = false;
						item.text=item.displayName;
						item.value=item.id;
						if (this.user_ids.length && this.type==2) {
							if (this.user_ids.includes(item.id)) {
								item.disable = true
							}
						}
					})
					if(this.type==1 && this.contact_id){
						this.changeUser.push(parseInt(this.contact_id));
						this.selectUser=contact.filter((item)=>{
							return item.id==this.contact_id;
						})
					}
				}
				this.userList = contact
				this.lists = contact
			},
			chooseUser(e){
				this.selectUser=e.detail.data;
				setTimeout(()=>{
					this.scrollLeft+=300;
				},50)
			},
			chooseSearchUser(e){
				this.selectUser=this.$util.mergeArrays(e.detail.data,this.selectUser);
				setTimeout(()=>{
					this.scrollLeft+=300;
				},50)
			},
			removeUser(id){
				this.selectUser=this.selectUser.filter((e)=>{
					return e.id!=id;
				})
				this.changeUser=this.changeUser.filter((e)=>{
					return e!=id;
				})
			},
			save(){
				uni.showLoading({
					title: '保存中...',
					mask:true
				});
				if(!this.changeUser.length){
					return uni.showToast({
						title:'请选择人员',
						icon:'none'
					})
				}
				if(this.type==1){
					this.$api.msgApi.addGroup({user_ids:this.changeUser}).then(res =>{
						uni.hideLoading();
						const data = res.data;
						msgStore.appendContacts(data);
						uni.navigateTo({
							url:'/pages/message/chat?id='+data.id
						})
					})
				}else if(this.type==2){
					this.$api.msgApi.addGroupUser({user_ids:this.changeUser,id:this.contact_id}).then(res =>{
						uni.hideLoading();
						uni.navigateBack()
					})
				}else if(this.type==3){
					if(this.changeUser.length>5){
						return uni.showToast({
							title:'单次转发不能超过5人',
							icon:'none'
						})
					}
					this.$api.msgApi.forwardMessage({user_ids:this.changeUser,msg_id:this.curMsg.msg_id}).then(res =>{
						uni.hideLoading();
						uni.navigateBack()
					})
				}else{
					this.$api.msgApi.removeUser({user_ids:this.changeUser,id:this.contact_id}).then(res =>{
						uni.hideLoading();
						uni.navigateBack()
					})
				}
				
			},
			search: function(e) {
				let contact=JSON.parse(JSON.stringify(this.lists));
				this.searchList=this.$util.searchObject(contact,['displayName','name_py'],this.keywords);
			},
			// 监听提交
			confirm: function(e) {
				let arr = []
				if (e) { //这个值为输入框输入的值
					var brr = this.userList.filter(value => {
						//遍历数组，返回值为true保留并复制到新数组，false则过滤掉
						let data = value.realname ? value.realname : value.userInfo.displayName
						if (data.includes(e.trim())) {
							arr.push(value)
						}
						return data.includes(e.trim());
					});
					this.lists = arr
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-warp {
		width: 750rpx;
		padding: 15rpx 50rpx;
	}
	::v-deep .checklist-group{
		display: grid !important;
		.checklist-box{
			padding:20rpx;
			.checkbox__inner{
				width:40rpx !important;
				height:40rpx !important;
				overflow:hidden;
				.checkbox__inner-icon{
					position: absolute;
					top: -8px !important;
					left: -4px !important;
					height: 20px !important;
					width: 20px !important;
					border-right-width: 2px !important;
					border-bottom-width: 2px !important;
				}
			}
			.checklist-content{
				margin-left:20rpx;
				.checklist-text{
					font-size:36rpx !important; 
				}
				
			}
		}
	}
	.footer-opt{
		position: fixed;
		bottom:0;
		left:0;
		width:100%;
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	
	.user-list-avatar{
		float: left;
		margin-top:10rpx;
		.user-avatar{
			width:70rpx;
			height:70rpx;
			flex: 0 0 auto;
			border-radius: 8rpx;
			margin-left: 15rpx;
			display: inline-block;
			&:last-child{
				margin-right: 15rpx;
			}
		}
		.select-num{
			padding:10rpx;
		}
		
	}
</style>
