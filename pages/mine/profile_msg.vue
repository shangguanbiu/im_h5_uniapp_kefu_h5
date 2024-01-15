<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('mine.title')}}</template>
		</cu-custom>
		<form>
			<!-- <view class="cu-form-group" style="height:140rpx">
				<view class="title">{{$t('mine.icon')}}</view>
				<view class="im-flex im-align-items-center">
					<avatar
					       selWidth="240px" selHeight="480upx" @upload="uploadAvatar" :avatarSrc="userInfo.avatar"
					       avatarStyle="width: 100rpx; height: 100rpx; border-radius: 100%;">
					   </avatar>
					<text class="cuIcon-right ml-10 f-18 text-grey"></text></view>
			</view> -->
			<!-- <view class="cu-form-group" @tap="to_fengmian">
				<view class="title">封面图</view>
				<view class="text-gray"><text class="cuIcon-right ml-10 f-18 text-grey"></text></view>
			</view> -->
			<view class="cu-form-group" @tap="to_fengmian">
				<view class="title">{{$t('fengmian.tab1')}}</view>
				<view class="text-gray"><text class="cuIcon-right ml-10 f-18 text-grey"></text></view>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('mine.account')}}</view>
				<view class="text-gray">{{userInfo.account}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('mine.jifen')}}</view>
				<view class="text-pink">{{balance}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">{{globalConfig.sysInfo.runMode==1 ? $t('mine.ming') : $t('mine.nickname')}}</view>
				<view class="text-gray" v-if="globalConfig.sysInfo.runMode==1">{{userInfo.realname}}</view>
				<input class="uni-input" style="text-align: right;" v-if="globalConfig.sysInfo.runMode==2" v-model="userInfo.realname"  placeholder="请输入昵称" />
			</view>
			<!-- <view class="cu-form-group">
				<view class="title">e-mail</view>
				<input class="uni-input" style="text-align: right;" v-model="userInfo.email"  :placeholder="$t('mine.emial')" />
			</view> -->
			<view class="cu-form-group">
				<view class="title">{{$t('mine.age')}}</view>
				<input class="uni-input" style="text-align: right;" v-model="userInfo.ages"  :placeholder="$t('mine.age_num')" type="number" />
			</view>
			<view class="cu-form-group">
				<view class="title">{{$t('mine.sex')}}</view>
				<view>
					<radio-group @change="changeSex">
					<label class="radio mr-10" v-for="x in sexList"><radio name="sex" :value="x.id" :checked="userInfo.sex==x.id" /> {{x.name}}</label>
					</radio-group>
				</view>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">{{$t('mine.sine')}}</view>
				<textarea maxlength="-1" v-model="userInfo.motto" :placeholder="$t('mine.sine_place')"></textarea>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green lg" :style="saved ? 'border: solid 1px #dbdada;' : ''" :disabled="saved" @tap="saveInfo()" >{{$t('mine.save')}}</button>
		</view>
	</view>
</template>

<script>
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	import { useloginStore } from '@/store/login'
	import pinia from '@/store/index'
	const loginStore = useloginStore(pinia)
	export default {
		components: {
			avatar
		},
		data() {
			return {
				loginStore:loginStore,
				globalConfig:loginStore.globalConfig,
				userInfo:{},
				sexList:[
					{
						id:'2',
						name:this.$t('mine.no_msg')
					},
					{
						id:'1',
						name:this.$t('mine.sex_nan')
					},
					{
						id:'0',
						name:this.$t('mine.sex_nv')
					},
				],
				saved:false,
				balance:'0.00'
			}
		},
		mounted() {
			this.get_userInfo()
			this.userInfo=JSON.parse(JSON.stringify(loginStore.userInfo));
		}, 
		methods: {
			to_fengmian(){
				uni.navigateTo({
					url: '/pages/mine/run_img'
				})
			},
			async get_userInfo() {
				var _this = this
				const res = await this.$myRuquest({
					url: '/api/front/user/getUserInfo',
					method: "POST",
				})
				if (res.code == 200) {
					
					this.balance=res.data.balance
				}
			},
			logout(){
				let client_id=uni.getStorageSync('client_id');
				this.$api.LoginApi.logout({client_id:client_id}).then(res => {
					if (res.code == 0) {
						loginStore.logout()
					}
				})
				
			},
			textareaBInput(e) {
				this.userInfo.motto = e.detail.value
			},
			changeSex(evt){
				this.userInfo.sex=parseInt(evt.detail.value);
			},
			saveInfo(){
				if(this.userInfo.realname == ''){
					uni.showToast({
						title:this.$t('mine.set_t_1'),//'请输入昵称',
						icon:'none'
					})
					return false
				  }
				  // 防止无限次点击
				  this.saved=true;
				  let params={
					realname:this.userInfo.realname,
					email:this.userInfo.email,
					sex:this.userInfo.sex,
					motto:this.userInfo.motto,
					ages:this.userInfo.ages,
				  }
				  this.$api.msgApi.updateUserInfo(params).then(res=>{
					if(res.code == 0){
					  uni.showToast({
					  	title:this.$t('mine.set_t_2'),//'保存成功',
					  	icon:'none'
					  })
					  let data=JSON.parse(JSON.stringify(this.userInfo))
					  loginStore.login(data)
					}
				  })
				  // 8秒后可以重新保存
				  setTimeout(()=>{
				  	this.saved=false;
				  },8000)
			},
			setAvatar(){
				uni.navigateTo({
					url:"/pages/mine/avatar"
				})
			},
			uploadAvatar(res){
				uni.showLoading({
					title:this.$t('mine.set_t_1')//'上传中...'
				})
				uni.uploadFile({
					url: this.$api.msgApi.uploadAvatar,
					filePath: res.path,
					name: 'file',
					header: {
						'Authorization': uni.getStorageSync('authToken'),
					},
					formData: {
						ext: 'png'
					},
					success: (e) => {
						uni.hideLoading();
						let res=JSON.parse(e.data);
						if(res.code==0){
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
							this.userInfo.avatar=res.data
							let data=JSON.parse(JSON.stringify(this.userInfo));
							loginStore.login(data);
						}
					},
					fail: (res) => {
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>

</style>
