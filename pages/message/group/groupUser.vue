<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('group_sys.user_list')}}</template>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="keywords" :placeholder="$t('group_sys.search_placeholder')" confirm-type="search"/>
			</view>
		</view>
		<view style="margin-top: 104rpx;">
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="item in userList">
					<view class="cu-avatar round lg" :style="'background-image:url('+item.userInfo.avatar+');'" @tap="openChatDetail(item)"></view>
					<view class="content">
						<view class="text-grey">
							<view class="text-cut">{{item.userInfo.displayName}}</view>
							<view v-if="item.role<3" class="cu-tag round sm" :class="item.role==1 ? 'bg-red' : 'bg-orange'">{{item.role ==1?$t('group_sys.role_t1'):item.role==2?$t('group_sys.role_t2'):''}}</view>
							<view v-if="item.user_id==userInfo.user_id" class="cu-tag round sm">我</view>
						</view>
					</view>
					<view class="action" @tap="openModel(item)">
						<view class="text-grey text-sm"> <text class="cuIcon-more f-24" v-if="item.role>1 && isAuth" ></text></view>
					</view>
				</view>
				<Empty v-if="!userList.length" :noDatatext="$t('group_sys.search_no_data')" textcolor="#999" ></Empty>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modelName=='userOpt'?'show':''">
			<view class="cu-dialog">
				<view class="manage-content">
					<view class="cu-list menu bg-white">
						<view class="cu-item" v-if="curUser">
							<view class="content im-flex im-justify-content-center im-align-items-center">
								<view class="cu-avatar round sm" :style="'background-image:url('+(curUser.avatar)+');'"></view>
								<view class="text-cut ml-5">{{curUser.realname}}</view>
								<view v-if="curUser.role==2" class="cu-tag round sm bg-orange">{{$t('group_sys.role_t2')}}</view>
							</view>
						</view>
						<view class="cu-item"  @tap="changeOwner()" v-if="isAdmin">
							<view class="content padding-tb-sm">
								<text class="c-orange">{{$t('group_sys.change_admin')}}</text>
							</view>
						</view>
						<view class="cu-item"  @tap="setManage()" v-if="isAdmin">
							<view class="content padding-tb-sm">
								<text>{{curUser.role==2 ? $t('group_sys.role_set_t1') : $t('group_sys.role_set_t2')}}</text>
							</view>
						</view>
						<view class="cu-item" @tap="removeUser()">
							<view class="content padding-tb-sm">
								<text>{{$t('group_sys.out_group')}}</text>
							</view>
						</view>
						<view class="parting-line-5"></view>
						<view class="cu-item" @tap="modelName=''">
							<view class="content padding-tb-sm">
								<text class="c-red">{{$t('group_sys.ok')}}</text>
							</view>
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
		data() {
			return {
				keywords:'',
				group_id: '',
				modelName:'',
				userList: [],
				allUser:[],
				isAdmin:false,
				isManage:false,
				isAuth:false,
				userInfo:userInfo,
				curUser:{}  //选中的用户
			}
		},
		watch:{
			keywords(val){
				if(val==''){
					this.userList=this.allUser;
				}else{
					this.search();
				}
			},
		},
		onLoad(options) {
			this.group_id = options.group_id?options.group_id:''
			this.getGroupuserlist()

		},
		methods: {
			getGroupuserlist() {
				this.userList = []
				this.$api.msgApi.groupUserList({
					group_id: this.group_id
				}).then(res => {
					const admin=res.data.filter(item => item.role == 1 && item.userInfo.id== userInfo.user_id)
					if(admin.length) this.isAdmin=true;
					const manage=res.data.filter(item => item.role == 2 && item.userInfo.id== userInfo.user_id)
					if(manage.length) this.manage=true;
					if(admin.length || manage.length) this.isAuth=true;
					const allUser=res.data;
					allUser.forEach((item)=>{
						item.realname=item.userInfo.displayName;
						item.name_py=item.userInfo.name_py;
					})
					this.allUser=allUser;
					this.userList = res.data;
				})
			},
			openModel(item){
				item.realname=item.userInfo.displayName;
				item.avatar=item.userInfo.avatar;
				this.curUser=item;
				this.modelName='userOpt';
			},
			// 设置取消管理员
			setManage(){
				const role=this.curUser.role==2 ? 3 : 2;
				this.$api.msgApi.setManager({
					id:this.group_id,
					user_id:this.curUser.user_id,
					role:role
				}).then((res)=>{
					if(res.code==0){
						this.getGroupuserlist();
					}
					this.modelName='';
				})
			},
			// 移出成员
			removeUser(){
				this.modelName='';
				uni.showModal({
					title: this.$t('group_sys.pop_tit1'),//'确定要删除该成员吗?,
					success: e => {
						if (e.confirm) {
							this.$api.msgApi.removeUser({
								id:this.group_id,
								user_id:this.curUser.user_id,
							}).then((res)=>{
								if(res.code==0){
									this.getGroupuserlist();
								}
							})
						}
					}
				});
			},
			changeOwner(){
				this.modelName='';
				uni.showModal({
					title: this.$t('group_sys.pop_tit2'),//'确定将管理权限转移给该成员吗?',
					success: e => {
						if (e.confirm) {
							this.$api.msgApi.changeOwner({
								id:this.group_id,
								user_id:this.curUser.user_id,
							}).then((res)=>{
								if(res.code==0){
									uni.reLaunch({
										url:'/pages/index/index'
									})
								}
							})
						}
					}
				});
			},
			search(){
				const allUser=JSON.parse(JSON.stringify(this.allUser));
				this.userList=this.$util.searchObject(allUser,['realname','name_py'],this.keywords);
			},
			openChatDetail(item){
				if(userInfo.user_id==item.user_id) return;
				let friend=msgStore.getContact(item.user_id);
				let curContact=msgStore.getContact(this.group_id);
				if(curContact.role<3 || curContact.setting.profile=='1' || friend){
					uni.navigateTo({
						url:"/pages/contacts/detail?id="+item.user_id
					})
				}else{
					uni.showToast({
						title:this.$t('group_sys.pop_tit3'),//'已开启用户隐私！',
						icon:'none'
					})
					return false;
				}
			}
		}
	}
</script>
<style scoped>
	.list-image {
		width: 80rpx;
		height: 80rpx;
		font-size: 0;
	}
</style>
