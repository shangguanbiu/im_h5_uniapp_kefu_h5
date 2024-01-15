import { defineStore } from 'pinia'
import utils from '@/utils/utils.js';
export const useMsgStore = defineStore({
  id: 'message', // id必填，且需要唯一
  state: () => {
    return {
      pushSocket: '',
      chatSocket: '',
      instantSocket: '',
	  webrtc:'',
	  topContacts:[],
      contacts: [], //所有联系人
      wsSendData: '',
      unread: 0,
	  sysUnread:0,
	  newMessage:{},
	  msgList:[],
	  webrtcLock:false
    }
  },
  // actions 用来修改 state
    actions: {
		catchSocketAction(data){
			this.chatSocket = data;
			if (data.is_group == 2) {
				this.unread += 1;
			}
		},
		updateUnread (data) {
			this.unread = parseInt(data);
		},
		setLastContent (item) {
			switch(item.type){
				case 'image':
					item.lastContent='[图片]';
					break;
				case 'video':
					item.lastContent='[视频]';
					break;
				case 'file':
					item.lastContent='[文件]';
					break;
				case 'voice':
					item.lastContent='[语音]';
					break;
				case 'webrtc':
					item.lastContent='[音视频通话]';
					break;
			}
			return item;
		},
		//初始化联系人
		initContacts (data) {
			let contacts=utils.sortContacts(data);
			let topContacts=[];
			let otherContacts=[];
			let unread=0;
			contacts.forEach((item, index) => {
				if (item.lastContent) {
					unread += item.unread;
				}
				item=this.setLastContent(item);
				if(item.index=='群聊'){
					item.index="#";
				}
				if (item.is_top == 1) {
					topContacts.push(item)
				}else{
					otherContacts.push(item)
				}
			})
			this.unread=unread;
			this.contacts =topContacts.concat(otherContacts);
			uni.setStorageSync('allContacts',this.contacts);
		},
		//更新联系人
		updateContacts (data) {
			const contacts = this.contacts;
			// 更新联系人
			contacts.forEach((item, index) => {
				let contact = contacts[index];
				if (item.id == data.id) {
					contacts[index] = Object.assign(contact, data);
				}
			})
			this.initContacts(contacts);
		},
		//添加联系人
		appendContacts (data) {
			const contacts = this.contacts;
			// 检查是否有该联系人,有就更新,没有就增加
			const contact=contacts.filter(item=> item.id==data.id);
			if(contact.length>0){
				return this.updateContacts(data);
			}
			contacts.push(data);
			this.initContacts(contacts);
		},
		//删除联系人
		deleteContacts (data) {
			const contacts = JSON.parse(JSON.stringify(this.contacts));
			const newContacts = contacts.filter(obj => obj.id != data.id);
			this.contacts=newContacts;
			uni.setStorageSync('allContacts',this.contacts);
		},
		// 初始化当前页面的消息列表
		initMsg(data){
			this.msgList=data;
		},
		// 检查是否存在此消息,有的则跳过,没有就更新
		checkMsg(msg){
			let msgList=this.msgList;
			let hasMsg=false;
			msgList.forEach((item, index) => {
				if (item.id==msg.id) {
				  hasMsg=true;
				}
			})
			if(!hasMsg){
				this.msgList.push(msg);
			}
		},
		getContact(id){
			let contacts=uni.getStorageSync('allContacts');
			const contact = contacts.find(obj => obj.id == id);
			return contact;
		},
		// 新消息推送
		appendMsg(message){
			this.newMessage=message;
		},
		wsSend (data) {
			this.wsSendData = data;
		}
    }
})
