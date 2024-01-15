
<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" class="cu-header">
			<template #backText></template>
			<template #content>
				<view class="im-flex im-justify-content-center im-align-items-center">	<Tags v-if="is_group==1" :text="$t('message.group_title')" size="mini" />
					<statusPoint v-if="is_group==0 && contact.is_online==1 && globalConfig.chatInfo.online==1" type="success"></statusPoint><text class="text-overflow">{{contact.displayName}}</text>
				</view>
			</template>
			<template #right>
				<view class="cuIcon-more mr-10 f-16" @tap="openDetails"></view>
			</template>
		</cu-custom>
		<scroll-view ref="scrollView" scroll-y="true" :scroll-anchoring="true" :scroll-top="scrollTop"  @scroll="scrollChat" :style="{height:scrollH+'rpx',position:'fixed',bottom:bottomHeight+'px'}">
		<view class="cu-chat" :style="{paddingBottom:paddingB+'px'}" @click="closeInput" id="more-oprate">
			<uni-load-more :status="loading"></uni-load-more>
			<template v-for="(item,index) in messageList" :key="index" :id="'chatItem_'+index">
				<view class="cu-info"  v-if="item.type=='event'">{{item.content}} <text class="c-primary" v-if="item.is_undo==1 && (getTime() - item.sendTime) < 120000" @tap="reEdit(item.oldContent ?? '')">{{$t('message.reedit')}}</text></view>
				<template v-else>
					<view class="cu-item" :class="[item.fromUser.id==user.user_id ? 'im-rows-reverse self im-justify-content-start' : '' ]">
						<im-user :info="item.fromUser" :ifvip="item.fromUser.icon_vip==1 ?true:false " :right="item.fromUser.id==user.user_id ?true:false " :profile="isProfile"></im-user>
						<view class="main im-wrap" @touchstart="moreOption(item)" @touchend="endTimer" @tap="dblclick(item)">
							<view class="f-12 c-666" style="width:100%;margin-bottom: 6rpx;" v-if="item.fromUser.id!=user.user_id">{{item.fromUser.realname}}</view>
							<!-- 文字消息 -->
							<view class="content shadow"  :class="[item.fromUser.id==user.user_id ? 'bg-green' : '' ]" v-if="item.type=='text'">
								<mp-html container-style="overflow: hidden;display:inline;white-space: pre-wrap" :content="emojiToHtml(item.content)"/>
							</view>
							<!-- 图片消息 -->
							<image v-else-if="item.type=='image'" :src="item.content" class="radius"  style="height: 200px; width: 120px;" mode="widthFix" @tap="showImgs"  :data-img="item.content" ></image>
							<!-- 语音消息 -->
							<view v-else-if="item.type=='voice'" class="im-voice-msg im-flex im-rows im-nowrap im-align-items-center radius-20" 
							:class="[index == playIndex ? 'linear-green' : '', item.fromUser.id==user.user_id ? 'im-rows-reverse' : '' , ]" :data-voice="item.content" :data-index='index' @tap='playVoice' 
							:style="{'width':(item.extends.duration*3)+'px'}">
								<text class="f-16 cuIcon-subscription rotate45" :class="[index == playIndex ? 'c-white' : '',item.fromUser.id==user.user_id ? 'rotate225' : '']"></text>
								<text class="im-voice-msg-text" :class="[index == playIndex ? 'c-white' : '']">{{item.extends.duration}} "</text> 
							</view>
							<!-- 视频消息 -->
							<view v-else-if="item.type=='video'">
								<view class="course-video radius-10"  @tap="handlePlay(item)">
									<!-- 播放弹层 -->
									<view class="relative-shadow">
										<view class="cuIcon-video icon-center f-28 c-white"></view>
									</view>
									<image :src="item.extends.poster" class="" mode="heightFix"></image>
								</view>
							</view>
							<!-- 文件消息 -->
							<view v-else-if="item.type=='file'">
								<view class="file-card bg-white radius-10 im-flex im-justify-content-start pd-10 im-align-items-center"  @tap="preview(item)">
									<view class="file-icon cuIcon-text f-36"></view>
									<view class="im-flex im-columns ml-10">
										<view class="text-overflow file-name">{{item.fileName}}</view>
										<view class="text-gray file-size f-12">{{fileSize(item.fileSize)}}</view>
									</view>
								</view>
							</view>
							<!-- 音视频消息 -->
							<view v-else-if="item.type=='webrtc'" @tap="calling(item.extends.type)" class="im-voice-msg im-flex im-rows im-nowrap im-align-items-center radius-20" :class="[item.fromUser.id==user.user_id ? 'im-rows-reverse' : '' , ]">
								<text class="f-16" :class="[item.extends.type == 1 ? 'cuIcon-record' : 'cuIcon-dianhua',item.fromUser.id==user.user_id ? 'rotate180' : '']"></text>
								<text class="im-voice-msg-text">{{item.content}}</text> 
							</view>
							<!-- 其他消息 -->
							<imItem v-else :item="item" :index="index" :isSelf="true"></imItem>
						</view>
						<view class="mt-10 f-20" v-if="item.fromUser.id==user.user_id">
							<view class="cuIcon-icloading icon-spin c-999" v-if="item.status=='going'"></view>
							<view class="cuIcon-infofill c-red" v-if="item.status=='failed'" @tap="reSend(item)"></view>
						</view>
						<view class="date"><text v-if="item.is_group==0 && item.fromUser.id==user.user_id" :class="item.is_read ? 'c-success' : 'c-gray'">{{item.is_read ? $t('message.read') : $t('message.unread')}}</text> {{sendTime(item.sendTime)}} </view>
					</view>
				</template>
			</template>
			<view v-if="videoModel" class="video-model im-flex im-align-items-center" >
				<view class="c-white radius-16 close-model" @tap="closeModel">{{$t('message.close')}} </view>
				<video class="video-box" id="myVideo"  :src="videoUrl"  controls autoplay="autoplay"></video>
			</view>
			
		</view>
		</scroll-view>
		<view id="im-input">
			<imInput @send="sendMessage" @setPad="setPad" :boxStatus="boxStatus" :contact="contact" ref="imInput"></imInput>	
		</view>
		<view class="cu-modal bottom-modal" :class="modelName=='moreOpt'?'show':''" @tap="modelName=''">
			<view class="cu-dialog">
				<view class="manage-content">
					<view class="cu-list menu bg-white">
						<view class="cu-item" @tap="undoMsg()" v-if="(getTime() - curMsg.sendTime < 120000 && curMsg.fromUser.id==user.user_id) || contact.role<3">
							<view class="content padding-tb-sm">
								<text class="cuIcon-repeal"></text>
								<text>{{$t('message.reback')}} </text>
							</view>
						</view>
						<view class="cu-item" @tap="copyMsg()">
							<view class="content padding-tb-sm">
								<text class="cuIcon-copy"></text>
								<text>{{$t('message.copy')}} {{copyTxt}}</text>
							</view>
						</view>
						<view class="cu-item" @tap="forwardMsg()" v-if="curMsg.type!='voice'">
							<view class="content padding-tb-sm">
								<text class="cuIcon-forward"></text>
								<text>{{$t('message.re_turn')}} </text>
							</view>
						</view>
						<view class="parting-line-5"></view>
						<view class="cu-item" @tap="modelName=''">
							<view class="content padding-tb-sm">
								<text class="c-red">{{$t('message.quxiao')}} </text>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modelName=='musicPlay'?'show':''" @tap='closeMusic()'>
			<view class="cu-dialog" @tap.stop=''>
				<view class="pd-20">
					<sy-audio ref="audio" :src="curMsg.content" audioCover='' subheading='' :audioTitle="curMsg.fileName" :key="curMsg.id"></sy-audio>
				</view>
				<view class="cu-list menu bg-white">
					<view class="cu-item"  @tap='closeMusic()'>
						<view class="content padding-tb-sm">
							<text>>{{$t('message.close')}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modelName=='copyModel'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-gray" @tap="modelName=''">{{$t('message.quxiao')}}</view>
					<view class="action text-green" @tap="copyMsg()">{{$t('message.copy')}}</view>
				</view>
				<scroll-view scroll-y="true" :style="{height:scrollH+'rpx'}">
					<view class="pd-20 text-container">
						<mp-html :content="curMsg.content"></mp-html>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	import imInput from '@/components/message/im-input.vue';
	import imItem from '@/components/message/im-item.vue';
	import statusPoint from '@/components/status.vue';
	import imUser from '@/components/im-user.vue';
	import emoji from '@/utils/emoji.js'
	import { useloginStore } from '@/store/login';
	import { useMsgStore } from '@/store/message';
	import { storeToRefs } from 'pinia';
	import pinia from '@/store/index'
	const msgStore = useMsgStore(pinia)
	const {newMessage,msgList,getContact,appendMsg,checkMsg} = storeToRefs(msgStore);
	const userStore = useloginStore(pinia)
	const getTime = () => {
	  return new Date().getTime();
	};
	export default {
		components: {
			imInput,
			imItem,
			imUser,
			statusPoint
		},
		data() {
			return {
				user:userStore.userInfo,
				contact:{},
				is_group:0,
				boxStatus:0,
				paddingT:0,
				video:'',
				videoUrl: '',
				videoModel:false,
				InputBottom: 0,
				player    : null,
				playIndex : -1,
				emojiMap:[],
				fileExt:[],
				page:1,
				limit:20,
				moreData:true, //是否有更多数据
				newMessage:newMessage,
				messageList:msgList,
				newheight:0,
				scrollTop:0,
				loading:'more',
				loadLock:false,
				scrollHeight:0,
				paddingB:0,
				contact_id:0,
				bottomHeight:50,
				globalConfig:userStore.globalConfig,
				modelName:'',
				curMsg:'',
				isSending:false,
				copyTxt:this.$t('message.copyTxt_t1'),
				wsData:null,
				timer:null,
				lastTapDiffTime: 0,
				isProfile:false,
				
			};
		},
		computed:{
			scrollH:function(){
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750/winWidth;
				let bottomHeight=uni.upx2px(100);
				this.bottomHeight=bottomHeight;
				const query = uni.createSelectorQuery().in(this);
				setTimeout(() => {
					query.select('.cu-header').boundingClientRect();
					query.exec(data => {
						this.paddingT=data[0].height;
					});
				}, 10)
				// #ifdef H5
				let winHeight =parseInt((sys.windowHeight - this.navBarHeight - this.paddingT)*winrate);
				// #endif
				
				// #ifdef APP-PLUS
				let winHeight =parseInt((sys.windowHeight - (this.inlineTools + this.paddingT+bottomHeight))*winrate);
				// #endif
				
				// #ifndef H5 || APP-PLUS
				this.bottomHeight+=this.inlineTools;
				// 微信小程序需要减去状态栏+底部导航栏+底部横线
				let winHeight =parseInt((sys.windowHeight-(this.inlineTools + this.paddingT + this.navBarHeight))*winrate)
				// #endif
				return winHeight
			}
		},
		watch:{
			newMessage(val){
				if(val.toContactId==this.contact.id && val.fromUser.id!=this.user.user_id){
					this.$api.msgApi.setMsgIsRead({
						toContactId: this.contact.id,
						is_group: this.contact.is_group,
						messages: val,
						fromUser: val.fromUser.id,
					});
				}
				this.scrollToBottom();
			},
			videoModel(val){
				if(!val){
					this.video.pause();
				}
			}
		},
		onLoad(options){
			let data=msgStore.getContact(options.id);
			if(data.is_group==1 && (data.role<3 || data.setting.profile=='1')){
				this.isProfile=true;
			}
			this.contact = data;
			this.contact_id=options.id;
			this.is_group = data.is_group;
			msgStore.updateContacts({
				id:options.id,
				unread:0
			})
			this.getMessageList();
			// 监听消息更新请求
			uni.$on('getPositonsOrder',(res) => {
				let message=res.data;
				switch (res['type']) {
					//处理消息已读,将本地的未读消息修改为已读状态
					case "isRead":
						for (let i = 0; message.length > i; i++) {
					        const data = {
					          id: message[i]["id"],
					          is_read: 1
					        };
					        this.updateMessage(data);
					     }
						break;
					case "readAll":
						// 如果某人阅读了消息，全部置为已读
						if(message.toContactId==this.contact.id && this.is_group==0){
							this.messageList.forEach((item)=>{
								item.is_read=1;
							})
						}
						break;
					//上线、下线通知
					case "isOnline":
						if(message.id==this.contact.id){
							this.contact.is_online=message.is_online;
						}
						break;
					// 撤回消息
					case "undoMessage":
						if(message.from_user==this.user.user_id && message.isMobile==1 && getTime()-message.sendTime<120000){
							return false;
						}
					    this.updateMessage(message);
					    break;
					case "simple":
					case "group":
					case "webrtc":
						let routes = getCurrentPages();
						let curParam ={};
						// #ifdef MP-WEIXIN
						curParam = routes[routes.length - 1].options ?? '';
						// #endif
						// #ifdef APP-PLUS
						curParam = routes[routes.length - 1].$page.options ?? '';
						// #endif
						// 如果是h5需要单独去获取url的参数
						// #ifdef H5
						let url = location.href;
						curParam=this.$util.parseUrl(url);
						// #endif
						if(message.type=='webrtc'){
							if(!['calling','hangup','otherOpt'].includes(message.extends.event)){
								return false;
							}
							if(message.extends.event=='calling'){
								this.wsData=message;
							}
							let code=parseInt(message.extends.code);
								if([902,903,904,905,906,907].includes(code)){
								let wsData=this.wsData || message;
								wsData.content=message.content;
								message=wsData;
							}
						}
						let isAppend=false;
						if(message.is_group==1){
							if(message.toUser==curParam.id){
								isAppend=true;
							}
						}else{
							// 如果是当前的聊天房间，才可以进行消息新增
							if(message.toContactId==curParam.id || (message.fromUser.id==this.user.user_id && message.toUser==curParam.id)){
								isAppend=true;
							}
						}
						if(isAppend){
							msgStore.checkMsg(message);
							msgStore.appendMsg(message);
							msgStore.updateContacts({
								id:curParam.id,
								unread:0
							});
						}
						this.scrollToBottom();
						break;
				}
			})
		},
		onUnload(){
			// 聊天记录置为空
			msgStore.msgList=[];
			// 停止所有声音播放
			innerAudioContext.stop();
			this.closeMusic()
		},
		// 所有聊天页面都返回首页，避免层级过深
		onBackPress(options) {
			this.InputBottom=0;
			uni.reLaunch({
				url: '/pages/index/index'
			})
			return true;
		},
		onShow(){
			// 检测ws是否还在线
			this.socketIo.send({type:'ping'});
		},
		created: function(){

			let emojiMap=[];
			// 解析所有表情
			emoji.forEach(function (item) {
				let child=item.children;
			  if(child.length>0){
				  child.forEach(function (val) {
					  let name=val.name;
					  let src=val.src;
					  emojiMap[name]=src;
				  })
			  }
			});
			this.emojiMap=emojiMap;
			innerAudioContext.onPlay(() => {console.log('play');});
			innerAudioContext.onEnded(() => {
				console.log('播放完毕，继续播放下一个录音！');
				var cIndex     = Number(this.playIndex);
				for(let i = cIndex + 1; i < this.messageList.length; i++) {
					if (this.messageList[i].type == 'voice') {
						this.playNow(this.messageList[i].content, i);
						break;
						return;
					}
				}
				// 如果播放到最后一个,播放结束
				if(this.messageList.length <= cIndex + 1){
					innerAudioContext.stop();
					this.playIndex = -1;
				}
			});
			innerAudioContext.onError((E)=>{console.log(E);});
		},
		mounted () {
			// 创建视频对象
			this.video = uni.createVideoContext('myVideo', this);
			
		},
		methods: {
			calling(type){
				this.$refs.imInput.calling(parseInt(type));
			},
			endTimer() {
			    clearTimeout(this.timer);
			},
			 // 双击
			dblclick(item) {
				const _this = this;
				// 当前时间
				const curTime = new Date().getTime();
				// 上次点击时间
				const lastTime = _this.lastTapDiffTime;
				// 更新上次点击时间
				_this.lastTapDiffTime = curTime;
				// 两次点击间隔小于300ms, 认为是双击
				const diff = curTime - lastTime;
				if (diff < 300) {
					this.curMsg=item;
					this.modelName='copyModel';
				}  
			},
			getTime(){
			  return new Date().getTime();
			},
			setPad(padding){ //设置聊天内容的地步边距
				this.paddingB=padding;
				this.scrollToBottom();
			},
			updateMessage(message){
				let msgList = this.messageList;
				// 更新联系人
				msgList.forEach((item, index) => {
					let msg = msgList[index];
					if (item.id == message.id) {
						msgList[index] = Object.assign(msg, message);
					}
				})
				this.messageList=msgList;
			},
			getScrollHeight(){
				const query = uni.createSelectorQuery().in(this);
				setTimeout(() => {
					query.select('.cu-chat').boundingClientRect();
					query.exec(data => {
						this.scrollHeight=data[0].height;
						this.scrollTop=data[0].height-this.newheight;
						this.loadLock=false;
					});
				}, 10)
			},
			scrollChat(e){
				this.newheight=e.detail.scrollHeight;
				if(e.detail.scrollTop<10 && this.loadLock==false){
					this.loadLock=true;
					this.page++;
					if(this.moreData){
						this.loading='loading';
						setTimeout(()=>{
							this.getMessageList();
						},1000);
					}
				}
			},
			getMessageList() {
				this.$api.msgApi.getMessageList({
					is_group: this.is_group,
					toContactId: this.contact.id,
					page: this.page,
					limit: this.limit
				}).then(res => {
					if(this.page==1){
						msgStore.msgList = [];
					}
					let data=res.data.slice().reverse();
					data.forEach(it => {
						msgStore.msgList.unshift(it)
					})
					var _this=this;
					this.loading='more';
					
					// 如果返回的数据小于每页的数量
					if (res.data.length < this.limit) {
						this.moreData=false
						this.loading='noMore'
					}
					this.$nextTick(()=>{
						if(this.page==1){
							this.scrollToBottom();
						}else{
							this.getScrollHeight();
						}
					});
				})
			},
			moreOption(item){
				this.timer = setTimeout(() => {
					this.curMsg=item;
					if(item.type=="text"){
						this.copyTxt=this.$t('message.copyTxt_t2');//"消息";
					}else if(item.type=="image"){
						this.copyTxt=this.$t('message.copyTxt_t3');//"图片链接";
					}else{
						this.copyTxt=this.$t('message.copyTxt_t4');//"文件链接";
					}
					this.modelName='moreOpt';
				}, 1000); // 设置为 1 秒
			},
			undoMsg(){
				let message=this.curMsg;
				this.modelName='';
				this.$api.msgApi.undoMessage({ id: message.id })
				  .then(res => {
					const data = {
					  id: message.id,
					  type: "event",
					  is_undo:1,
					  content: this.$t('message.reback_msg'),//'你撤回了一条消息',
					  oldContent:message.content,
					  toContactId: message.toContactId,
					};
					this.updateMessage(data);
				  })
				  
			},
			copyMsg(){
				uni.setClipboardData({
					data:this.curMsg.content,
					showToast:true
				});
				this.modelName='';
				this.curMsg={};
			},
			// 转发消息
			forwardMsg(){
				uni.navigateTo({
					url:'/pages/index/userSelection?contact_id='+this.contact_id+'&type=3'
				})
			},
			reEdit(text){
				this.$refs.imInput.inputMsg=text;
				this.$refs.imInput.isFocus=true;
			},
			// 滚动到页面底部
			scrollToBottom(){
				const query = uni.createSelectorQuery().in(this);
				setTimeout(() => {
					query.select('.cu-chat').boundingClientRect();
					query.exec(data => {
						let height=data[0].height ?? 999999;
						this.scrollTop=height+3000;
					});
				}, 10);
			},
			// 打开聊天详情
			openDetails(){
				uni.navigateTo({
					url:"/pages/message/detail?id=" + this.contact.id+"&is_group=" + this.contact.is_group
				})
			},
			fileSize(size){
				return this.$util.getFileSize(size);
			},
			// 自动解析消息中的表情
			emojiToHtml(str){
				let emojiMap=this.emojiMap;
				return str.replace(/\[!(\w+)\]/gi, function (str, match) {
					var file = match;
					return emojiMap[file] ? "<img class='mr-5' style=\"width:18px;height:18px\" emoji-name=\"".concat(match, "\" src=\"").concat(emojiMap[file], "\" />") : "[!".concat(match, "]");
				  });
			},
			// 重新发送
			reSend(message){
				message.status='going';
				this.sendMessage(JSON.parse(JSON.stringify(message)),'');
			},
			// 发送消息
			sendMessage(message,file){
				// 如果开启了群聊禁言或者关闭了单聊权限，就不允许发送消息
				if((!this.globalConfig.chatInfo.simpleChat && this.is_group == 0) || !this.nospeak()){
					//已开启禁言
					uni.showToast({
						title:this.$t('message.pop_tit1'),// '系统已关闭单聊，或者群已开启禁言，无法发送消息',
						icon: "none"
					})
					return;
				}
				let user=this.user;
				user.id=user.user_id;
				message.fromUser=user;
				message.from_user=this.user.user_id;
				message.toContactId=this.contact.id;
				message.is_group=this.contact.is_group;
				this.messageList.push(message);
				this.scrollToBottom();
				var fileTypes = ["image", "file", "video",'voice'];   
				if(message.type=='text'){
					this.$api.msgApi.sendMessage(message)
						.then((res) => {
							if(res.code==0){
								this.updateMessage(res.data);
							}else if(res.code==401){
								// 删除最后一条信息
								this.messageList.pop();
								//已开启禁言
								uni.showToast({
									title: res.msg,
									icon: "none"
								})
							}
						})
						.catch((error) => {
							this.sendFailed(message);
						});
				}else if (fileTypes.includes(message.type)) {
					var self=this;
					if(message.fileSize>10240000){
						return uni.showToast({
							title: this.$t('message.pop_tit2'),//'文件大小不能超过10M',
							icon:'error'
						})
					}
					uni.uploadFile({
						url: this.$api.msgApi.uploadUrl,
						filePath: message.content,
						name: 'file',
						header: {
							'Authorization': uni.getStorageSync('authToken'),
						},
						formData: {
							message: JSON.stringify(message)
						},
						success: (e) => {
							let res=JSON.parse(e.data);
							
							if(res.code==0){
								this.updateMessage(res.data);
							}else if(res.code==401){
								// 删除最后一条信息
								this.messageList.pop();
								//已开启禁言
								uni.showToast({
									title: res.msg,
									icon: "none"
								})
							}
						},
						fail: (res) => {
							this.sendFailed(message);
						}
					})
				}
				
			},
			sendFailed(message){
				message.status='failed';
				this.updateMessage(JSON.parse(JSON.stringify(message)));
			},
			closeModel(){
				this.videoUrl='';
				this.videoModel=false;
			},
			// 播放视频,禁止多个同时播放
			handlePlay (item) {
				this.videoUrl=item.content;
				this.videoModel=true;
				innerAudioContext.stop();
				this.playIndex = -1;
			},
			sendTime:function(mstime){
				return this.$util.timeFormat(mstime);
			},
			// 播放语音
			playVoice: function (e) {
				var voicelUrl = e.currentTarget.dataset.voice;
				var index     = e.currentTarget.dataset.index;
				if (this.playIndex == -1){
					return this.playNow(voicelUrl, index);
				}
				if (this.playIndex == index) {
					innerAudioContext.stop();
					this.playIndex = -1;
				} else {
					innerAudioContext.stop();
					this.playIndex = -1;
					this.playNow(voicelUrl, index);
				}
			},
			// 语音播放基础函数
			playNow: function (voicelUrl, index){
				this.playIndex  = index;
				innerAudioContext.autoplay=true;
				innerAudioContext.src = voicelUrl;
				innerAudioContext.play();
				return true;
			},
			// 文件预览
			preview(item){
				let audioExt=['mp3','wav','acc'];
				let extension = item.content.split('.').pop().toLowerCase();
				if(audioExt.includes(extension)){
					this.curMsg=item;
					this.modelName='musicPlay';
					return;
				}
				// #ifdef APP-PLUS || MP-WEIXIN
				let exts=['doc', 'xls', 'ppt', 'pdf', 'docx', 'xlsx', 'pptx'];
				if(exts.includes(extension)){
					uni.showLoading({title: '文件加载中'});
					uni.downloadFile({
					  url: item.content,
					  success: function (res) {
						uni.hideLoading();
					    var filePath = res.tempFilePath;
					    uni.openDocument({
					      filePath: filePath,
					      showMenu: true,
					      success: function (res) {
					        console.log('打开文档成功');
					      }
					    });
					  },
					  fail() {
					  	uni.hideLoading();
					  }
					});
				}else{
					uni.showToast({
						title:'该文件不支持预览！',
						icon:'none'
					})
				}
				// #endif
				
				// #ifdef H5
				const tempLink = document.createElement("a");
				tempLink.style.display = "none";
				tempLink.href = item.download;
				tempLink.setAttribute("download", item.fileName);
				tempLink.setAttribute("target", "_blank");
				document.body.appendChild(tempLink);
				tempLink.click();
				document.body.removeChild(tempLink);
				// #endif
			},
			closeMusic(){
				this.modelName='';
				this.$refs.audio.audioPause();
			},
			// 图片预览
			showImgs : function(e){
				var imgs        = [];
				var imgsCurrent = e.currentTarget.dataset.img;
				for (var i = 0; i < this.messageList.length; i++) {
					if (this.messageList[i].type == 'image') {
						imgs.push(this.messageList[i].content);
					}
				}
				uni.previewImage({urls : imgs, current : imgsCurrent});
			},
			// 如果点击了聊天记录列表页,需要收起表情面板或者其他的面板
			closeInput(e){
				this.boxStatus++;
			},
			// 禁言时禁止发送消息
			nospeak(){
			  if(this.is_group==1 && this.contact.setting.nospeak>0){
				if(this.contact.setting.nospeak==1 && this.contact.role==2){
				  return true;
				}else if(this.contact.setting.nospeak==2 && this.contact.role==1){
				  return true;
				}else{
				  return false;
				}
			  }else{
				return true;
			  }
			},
		}
	}
</script>

<style lang="scss">
page{
  padding-bottom: 100upx;
}
.cu-chat{
	min-height:calc(100% - 300px);
}
.cu-chat .cu-item.self {
    justify-content: flex-start;
    text-align: right;
}
.im{padding:30rpx;}
.im-system-msg{color:#FFFFFF; font-size:26rpx; line-height:38rpx; padding:5px 10px; display:block; border-radius:6rpx;}
.im-msg{margin-bottom:28px; display:flex; flex-direction:row; flex-wrap:nowrap;}
.im-voice-msg{height:80rpx; padding:0 20rpx; background-color:#E7F0F3; color:#2B2E3D; min-width:160rpx; max-width:400rpx;}
.im-voice-msg-text{font-size:22rpx; margin:0 5rpx;}
.cu-chat .cu-item>.main {
    max-width: calc(100% - 230rpx);
    margin: 0 0.8rem;
    display: flex;
    align-items: center;
	}
.course-video{
	max-width:400rpx;
	overflow: hidden;
	position: relative;
	max-height: 360rpx;
}

.video-model{
	background-color: #3838388f;z-index:10000;width: 100%;height: 100%;position: fixed;top:0;overflow:hidden;;
}
.close-model{
	position: absolute;top:180rpx;right:20rpx;background-color: #3838388f;padding:4rpx 10rpx
}
.video-box{width:100%}
.icon-center{
		position: absolute;
	    top: 50%;
	    z-index: 4;
	    transform: translate(-50%, -50%);
	    left: 50%;
		padding: 0 4rpx 0 6rpx;
}
.relative-shadow{
	position: absolute;width:100%;height:100%;background: #83838387;z-index:1;
}
.file-card{
	width:420rpx;
	height:120rpx;
	.file-icon{
		width:60rpx;
		height:80rpx;
	}
	.file-name{
		text-align: left !important;
		width:300rpx;
	}
	.file-size{
		text-align: left !important;
		margin-top:8rpx;
	}
}

.icon-spin{
	animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.main .content ::v-deep uni-text , .main .content ::v-deep uni-text span{
	word-wrap: break-word !important;
}

.text-container{
	-webkit-user-select:text !important;
	user-select:text !important;
	font-size:48rpx;
	word-wrap: break-word !important;
	text-align: left;
	line-height: 1.5;
	letter-spacing: 1.2px;
	color:#333;
}
</style>
