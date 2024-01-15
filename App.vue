<script>
	// 引入vue3 getCurrentInstance 
	import { getCurrentInstance } from 'vue'
	import pinia from '@/store/index' 
	import { useMsgStore } from '@/store/message';
	import { useloginStore } from '@/store/login';
	const msgStore = useMsgStore(pinia)
	const userStore = useloginStore(pinia)



	export default {
		onLaunch: function() {

			// 初始化APP设置
			let setting=uni.getStorageSync('appSetting') ?? '';
			if(!setting){
				userStore.setAppSetting({
					voiceStatus:true,
					vibrateStatus:false,
					circleAvatar:false
				});
			}else{
				userStore.setAppSetting(setting);
			}
			// 获取全局配置
			userStore.getGlobalConfig();
		    uni.getSystemInfo({
		        success: function(e) {
					let paddingB=0;
		        	// 获取 appContext  上下文
					const {appContext} = getCurrentInstance();
					appContext.config.globalProperties.StatusBar = e.statusBarHeight;
		            // #ifndef MP
		            if (e.platform == 'android') {
		                appContext.config.globalProperties.CustomBar = e.statusBarHeight + 50;
		            } else {
		                appContext.config.globalProperties.CustomBar = e.statusBarHeight + 45;
		            };
		            // #endif
		            // #ifdef MP-WEIXIN
		            
		            let custom = wx.getMenuButtonBoundingClientRect();
		            appContext.config.globalProperties.Custom = custom;
		            appContext.config.globalProperties.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
		            // #endif     
					   
		            // #ifdef MP-ALIPAY
		            appContext.config.globalProperties.CustomBar = e.statusBarHeight + e.titleBarHeight;
		            // #endif
					
					// #ifdef MP
					try {
						
					    var res = uni.getSystemInfoSync();
						res.model = res.model.replace(' ', '');
						res.model = res.model.toLowerCase();
						var res1  = res.model.indexOf('iphonex');
						if(res1 > 5){res1 = -1;}
						var res2   = res.model.indexOf('iphone1');
						if(res2 > 5){res2 = -1;}
						if(res1 != -1 || res2 != -1){
							paddingB = uni.upx2px(50);
						}
						
					} catch (e){return null;}
					// #endif
					// #ifdef H5
						paddingB = uni.upx2px(100);
					// #endif
					// 获取设备底部高度
					appContext.config.globalProperties.inlineTools=paddingB;
					// 设置全局底部导航栏高度
					appContext.config.globalProperties.navBarHeight=uni.upx2px(100);
		        }
		    })
			
			// uni.getPushClientId({
			// 		success: (res) => {
			// 			console.log('初始化cid：',res.cid)
			// 			uni.setStorageSync('cid',res.cid)
			// 		},
			// 		fail(err) {
			// 			console.log(err)
			// 		}
			// 	})
			// 只有app才有推送权限
			// #ifdef APP
			uni.onPushMessage((res) => {
				console.log("收到推送消息：",res) 
				let data=res.data;
				if(res.type=='click'){
					let playload=data.payload;
					let toUser=playload.toContactId ? playload.toContactId : '';
					// 如果是音视频通话则不
					if(playload.type=='webrtc'){
						return;
					}
					uni.navigateTo({
						url:"/pages/message/chat?id=" + toUser
					})
				}else if(res.type=='receive'){
					
					let appStatus=this.appStatus;
					console.log("app状态：",appStatus) 
					// 如果app在后台运行,创建通知栏
					if(!appStatus){
						console.log("创建通知栏") 
						let message={
							title:data.title,
							content:data.content,
							payload:data.payload,
							
						}
						let systemInfo = uni.getSystemInfoSync();
						// 判断平台,如果是安卓就去下载头像并展示头像
						if (systemInfo.platform === 'android') {
							uni.downloadFile({
								url: data.payload.fromUser.avatar, 
								success: (res) => {
									if (res.statusCode === 200) {
										message.icon=res.tempFilePath
										uni.createPushMessage(message)
									}
								}
							});
						} else if (systemInfo.platform === 'ios') {
							 uni.createPushMessage(message)
						}
					}
				}
			})
			// #endif
		}, 
		onUnload() {
			this.scoketClose()
			this.socketIo.traderDetailIndex = 100 // 初始化 tabIndex 
		},
		onShow: function() {
			if(!this.socketIo.checkStatus()){
				console.log('ws断线了，重新链接！');
				uni.$emit('socketStatus',false);
				this.getWebsocketData();
			}
			this.appStatus=true;
			var ifhad=uni.getStorageSync('language')
			if(ifhad ==''||ifhad ==undefined){
				uni.setStorageSync('language','zhCN')
			}
			
			console.log('App Show')
		},
		methods:{
			scoketClose() {
				this.socketIo.connectNum = 1
				const data = {
					type: "close"
				};
				this.socketIo.send(data); // 这是给后端发送特定数据 关闭推送
				this.socketIo.Close(); // 主动 关闭连接 ， 不会重连
			},
			getWebsocketData() {
				// 获取用户信息
				var userInfo = uni.getStorageSync('userInfo');
				var _this = this;
				// 要发送的数据包
				const data = {
					type: "ping"
				};
				// 打开连接
				this.socketIo.connectSocketInit(data);
				uni.$off("getPositonsOrder");
				// 接收数据,全局监听
				uni.$on("getPositonsOrder", (res) => {
					var userInfo = uni.getStorageSync('userInfo');
					let data=res.data;
					this.connect = true;
					switch (res['type']) {
						// 服务端ping客户端
						case 'ping':
							this.socketIo.send({
								type: "pong"
							});
							break;
						case 'pong':
							userStore.$patch({
							  multiport: res.multiport
							})
							break;
							// 登录 更新用户列表
						case 'init':
							// 设置全局clientId
							uni.setStorageSync('client_id', res.client_id);
							if(userInfo){
								this.$api.LoginApi.bindUid({
									client_id: res['client_id'],
									user_id: userInfo.user_id,
									cid:uni.getStorageSync('cid')
								}).then(e => {
									this.socketIo.send({
										type: "bindUid",
										user_id: userInfo.user_id,
										token:uni.getStorageSync("authToken")
									});
								}).catch(error => {})
							}
							
							break;
						//上线、下线通知
						case "isOnline":
						  msgStore.updateContacts({
						  	id: data.id,
						  	is_online:data.is_online
						  });
						  break;
						case "offline":
						   let clientId=uni.getStorageSync('client_id');
						    if(data.id==userInfo.user_id && data.client_id!=clientId && data.isMobile){
								uni.showToast({
									title: "您的账号在其他地方登录，已被迫下线！",
									icon: "none",
									duration: 2500
								})
								userStore.logout();
						    }
							break;
						case 'simple':
						case 'group':
							// 只要不是自己发的,才可以播放声音
							if (data.fromUser.id != userInfo.user_id) {
								const contact = msgStore.getContact(data.toContactId);
								// 如果开启了声音才播放
								if (data.toContactId=='system' || contact.is_notice == 1) {
								  this.playSound();
								}
							}
							this.appendMessage(res);
							break;
						case "setChatTop":
							msgStore.updateContacts({
								id: data.id,
								is_top: data.is_top
							});
							break;
						case "setIsNotice":
							msgStore.updateContacts({
								id: data.id,
								is_notice: data.is_notice
							});
							break;
						// 新增加了群聊
						case "addGroup":
						    msgStore.appendContacts(data);
						    this.$api.LoginApi.bindGroup({ client_id: uni.getStorageSync('client_id'), group_id: data.id });
						    break;
							// 设置群管理员
						case "setManager":
						case "addGroupUser":
						case "removeUser":
							msgStore.updateContacts({
								id: data.group_id,
								avatar: data.avatar
							});
							uni.$emit('updateGroup',res);
							break;
						// 修改群组名称
						case "editGroupName":
						    msgStore.updateContacts({
							    id: data.id,
							    displayName: data.displayName
						    });
						    break;
						case "removeGroup":
						    msgStore.deleteContacts({
							    id: data.group_id
						    })
						    break;
						// 发布公告
						case "setNotice":
						  msgStore.updateContact({
							id: data.group_id,
							notice: data.notice
						  });
						  break;
						  // 群聊设置
						case "groupSetting":
						  msgStore.updateContact({
							id: data.group_id,
							setting: data.setting
						  });
						  break;
						case "appendContact":
							console.log(123123,data);
						  msgStore.appendContacts(data);
						  break;
						case 'webrtc':
							let platform='h5';
							//#ifdef H5
								platform='h5';
							//#endif
							//#ifdef APP-PLUS
								platform= 'app';
							//#endif
							if(data.fromUser.id==userInfo.user_id){
								// 挂断的情况下解锁webrtc
								if([902,903,905,906,907].includes(parseInt(data.extends.code))){
								  msgStore.webrtcLock=false;
								}
								// 如果是当前设备发出的消息则不处理
								if(data.extends.isMobile==1 || data.extends.event=='calling'){
									if(data.extends.event=='calling'){
										this.appendMessage(res);
									}
								  return;
								}
								
							}
							// 如果是多端在线,要将在通话中的用户锁定
							if(data.extends.event == 'offer' || data.extends.event == 'answer' ){
								msgStore.webrtcLock=true;
							}else if(data.extends.event == 'hangup'){
								msgStore.webrtcLock=false;
							}
						    if(data.extends.event == 'calling'){
								this.appendMessage(res);
								const allroutes = getCurrentPages();
								const cureentRoute = allroutes[allroutes.length - 1].route;
								// 如果当前已经在通话中,通知对方忙线中
								if (cureentRoute == 'pages/message/call') {
										this.$api.msgApi.sendToMsg({
											toContactId:data.fromUser.user_id,
											type:data.extends.type,
											event:'busy',
											status:data.extends.status,
											code:907,
											id:data.id,
											msg_id:data.msg_id,
										})
								}else{
									// 小程序不支持音视频聊天
									//#ifdef APP-PLUS || H5
									uni.navigateTo({
									  url: '/pages/message/call?msg_id='+data.id+'&type='+data.extends.type+'&status='+data.extends.status+'&id='+data.fromUser.user_id+'&name='+data.fromUser.realname+'&avatar='+encodeURI(data.fromUser.avatar)
									})
									//#endif
								}
								
							   
						    }else{
								uni.$emit('webrtcConn',data);
							}
						   break;
						default:
							break;
					}
				})
				// 错误时做些什么
				uni.$on("connectError", () => {
					this.connect = false
					this.scoketError = true
					uni.$emit('socketStatus',false);
				})
			},
			appendMessage(res){
				let data=res.data;
				if(data.toContactId=='system'){
					// 系统消息只需要把未读数增加一
					msgStore.$patch({
					  sysUnread: msgStore.sysUnread += 1,
					})
				}else{
					let contacts = msgStore.contacts;
					let toUser = data.toContactId;
					// 判断是否是自己,自己发的看接收人是谁，去更新接受人的信息
					var userInfo = uni.getStorageSync('userInfo');
					let addUnread = 1;
					// 自己发送的不需要加
					if(data.fromUser.id==userInfo.user_id){
						addUnread = 0;
					}
					if(data.toContactId == userInfo.user_id){
						toUser = data.toUser
					} 
					let contact = this.$util.findArray(contacts, toUser);
					if (contact) {
						contact.lastContent = data.content;
						contact.lastSendTime = data.sendTime*1000;
						contact.type = data.type;
						contact.unread += addUnread;
						// 更新联系人信息
						msgStore.updateContacts(contact);
					} else {
						let newContact = {
							id: data.toContactId,
							displayName: data.fromUser.displayName,
							avatar: data.fromUser.avatar,
							lastContent: data.content,
							lastSendTime: data.sendTime*1000,
							is_group: data.is_group,
							unread: addUnread,
							is_top: 0,
							dep_id: 0
						}
						contacts.push(newContact);
						msgStore.initContacts(contacts);
					}
					msgStore.catchSocketAction(res);
				}
			},
			playSound() {
				let setting=uni.getStorageSync('appSetting') ?? '';
				if(setting.voiceStatus){
					let _this = this
					// _this.playing = true
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = 'https://file.lcoce.com/static/v5/voice/notice.wav';
					innerAudioContext.onError((res) => {
						//如果音频没有正常播放
					})
					innerAudioContext.onStop((res) => {
						// _this.playing=false
						_this.$forceUpdate()
					})
				}
				if(setting.vibrateStatus){
					uni.vibrateLong({
						success: function () {
							console.log('手机震动');
						}
					});
				}
				
			}
		},
		onHide: function() {
			this.appStatus=false;
			console.log('App Hide')
		}
	}
</script>


<style lang="scss">
	@import url("static/css/iconfont.css");
	@import url("static/css/main.css");
	@import url("static/css/icon.css");
	@import url("static/css/reset.css");
	
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	
	// 设置整个项目的背景色

	page {
		background-color: #f5f5f5;
		max-width: 750px;
	}
	
	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	.nav_bar{padding: 10px 0; position: fixed;z-index:80; left:0;bottom:0;background: #251C48; width: 100vw; display: flex;}
	.nav_zi{ width: 50%; font-size: 12px; text-align: center; color: #6E5C4C;}
	.nav_hover{ color: #EAC477;}
	.nav_ge{ padding: 5px 0; padding-bottom: 0;}
	.com_bg{height: 100vh; width: 100vw; position: fixed;z-index: 1025; background: rgb(0 0 0 / 49%); display: block; left:0; top: 0;}
	.com_main{height: 100vh; width: 100vw; position: fixed;z-index: 1026; display: block; left:0; top: 0; display: flex; align-items: center;}
	.pop_mian{width:85%; background: #fff; margin: auto; border-radius: 8px;}
	.pop_title{text-align: center; padding: 15px 0;  font-size: 15px; color: #333}
	.pop_foot{display: flex; justify-content: center;padding: 15px 0;}
	.pop_ft_btn1{color: #999; font-size: 13px; width: 50%; text-align: center; position: relative;}
	.pop_ft_btn1::after{ content: ''; height: 25px; width: 1px; background: #ccc; position: absolute; bottom: -3px; right: 0;}
	.pop_ft_btn2{color: #190D30; font-size: 13px;width: 50%; text-align: center;}
	
	.talk_mian{height: 300px; width: 100%; position: fixed; left: 0; bottom: 0; z-index: 1025; background: #fff; border-radius: 20px 20px 0 0;}
	.talk_ico{margin: auto; width: 80px; height: 80px; overflow: hidden; margin-top: -20px; border: 2px solid #fff; border-radius: 50%;}
	.talk_name{text-align: center; font-size: 15px; font-weight: bold;padding: 10px 0;}
	.talk_desc{display: flex; justify-content: center;}
	.talk_sex{display: flex; margin-right: 5px; border-radius: 15px; color: #fff; padding:2px 6px;}
	.talk_form{display: flex; width: 90%; background: #f1f1f1; border-radius: 5px; margin:30px auto; margin-top: 50px; justify-content: space-between;}
	
	.p_type1{ background: #e6557f;}
	.p_type2{ background: #55aaff;}
	.p_type3{ background: #ccc;}
	.p_type3{ background: #f37b1d;}
	.sex_ico{width: 13px; margin-right:2px;}
	.icon_vip_are{ position: relative;}
	.icon_vip_l{ height: 30px; width: 30px; position: absolute;top: -14px; left: -14px; }
	.icon_vip_r{ height: 30px; width: 30px; position: absolute;top: -14px; right: -14px; }
</style>
