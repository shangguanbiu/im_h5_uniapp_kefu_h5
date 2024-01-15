<template>

	<view  class="im-message-list">
		<view class="cu-list menu-avatar" :style="{paddingBottom: paddingB+'px'}" v-if="msgsIn.length>0">
			<view class="cu-item" :class="[modalName=='move-box-'+ index?'move-cur':'',item.is_top==1 ? 'top-contacts' : '',item.is_group==0 ? 'third' : 'second']" v-for="(item, index) in msgsIn"  :key="index"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" @tap="openChat(index,item)" :data-target="'move-box-' + index">
				<view class="cu-avatar lg icon_vip_are" :class="appSetting.circleAvatar?'round':'radius'" :style="[{backgroundImage:'url('+ item.avatar +')'}]">
					<view class="icon_vip_l" v-if="item.icon_vip==1">
						<image src="@/static/image/guan_l.png"  mode='widthFix' style="width: 100%;max-height: 100px;">
						</image>
					</view>
				</view>
				<view class="content">
					<view class="c-333">
						<Tags v-if="item.is_group==1" :text="$t('message.group_title')" size="mini"></Tags>
						<statusPoint v-if="item.is_online && item.is_group==0 && globalConfig.chatInfo.online==1" type="success"></statusPoint> 
						<view class="text-overflow f-16" style="width:80%">
							{{item.displayName}}
						</view>
					</view>
					<view class="im-flex im-justify-content-start im-align-items-start pt-5" style="height: 50rpx;overflow:hidden">
						<view class="text-gray text-sm"><text v-if="item.unread>0 && item.is_notice==0">[{{item.unread}}{{$t('message.no_read')}}]&nbsp;</text></view>
						<mp-html :content="emojiToHtml(item.lastContent)" class="im-flex text-gray text-sm text-overflow no-click"/>
					</view>
					
				</view>
				<view class="action">
					<view class="text-grey text-xs" >{{from_time(item.lastSendTime)}}</view>
					<view class="cu-tag round bg-red sm" v-if="item.unread>0 && item.is_notice">{{item.unread}}</view>
					<view class="c-999" v-if="item.is_notice==0">
						<text class="cuIcon-musicforbidfill"></text>
					</view>
				</view>
				<view class="move" :class="item.is_group==0 ? 'third' : 'second' ">
					<view class="bg-grey" v-if="item.is_top==1" @tap="btnTap(0,item)">{{$t('message.cancle_top')}}</view>
					<view class="bg-blue" v-else  @tap="btnTap(0,item)">{{$t('message.set_top')}}</view>
					<view class="bg-orange" v-if="item.is_notice==1"  @tap="btnTap(2,item)">{{$t('message.set_notice')}}</view>
					<view class="bg-orange" v-else  @tap="btnTap(2,item)">{{$t('message.cancle_notice')}}</view>
					<view class="bg-red" v-if="item.is_group==0" @tap="btnTap(1,item)">{{$t('message.del_talk')}}</view>
				</view>
			</view>
		</view>
		<Empty v-else :noDatatext="$t('message.no_data')" textcolor="#999" />
	</view>
</template>

<script>
import emoji from '@/utils/emoji.js'
import statusPoint from './status.vue'
import { useloginStore } from '@/store/login'
import pinia from '@/store/index'
const userStore = useloginStore(pinia)
export default{
	name  : "message-list",
	props : {
		msgs        : { type : Array,  default : function(){return [];}},
		btnWidth    : { type : Number, default : 320},
	},
	components:{
		statusPoint
	},
	data() {
		return {
			msgsIn    : [],
			damping   : 0.29,
			moveIndex : -1,
			x         : 0,
			oX        : 0,
			scY       : true,
			btnWidthpx:160,
			touchStart:false,
			modalName: null,
			listTouchStart: 0,
			listTouchDirection: null,
			emojiMap:[],
			chatStatus:true,
			paddingB:0,
			appSetting:userStore.appSetting,
			globalConfig:userStore.globalConfig
		}
	},
	created:function(){
		this.init(this.msgs);
		this.btnWidthpx = (uni.upx2px(this.btnWidth) * -1) + 2;
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
		// #ifdef H5
		this.paddingB=this.inlineTools;
		// #endif
		
		// #ifndef H5
		this.paddingB=this.navBarHeight+this.inlineTools;
		// #endif
	},
	watch:{
		msgs : function(nv){this.init(nv);}
	},
	methods:{
		init     : function(msgs){
			this.moveIndex = -1;
			this.msgsIn    =msgs.filter(obj => obj.lastContent);
		},
		scrolltolower : function () {
		},
		// 自动解析消息中的表情
		emojiToHtml(str){
			if(!str){
				return;
			}
			let emojiMap=this.emojiMap;
			return str.replace(/\[!(\w+)\]/gi, function (str, match) {
				var file = match;
				return emojiMap[file] ? "<img class='mr-5' style=\"width:18px;height:18px\" emoji-name=\"".concat(match, "\" src=\"").concat(emojiMap[file], "\" />") : "[!".concat(match, "]");
			  });
		},
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX
		},
		// ListTouch计算方向
		ListTouchMove(e) {
			let cux=e.touches[0].pageX;
			let direction=cux- this.listTouchStart;
			// 左滑的距离需要达到100才能滑动出菜单,否则在页面自然滚动的时候就会吧菜单给拖出来了
			if(Math.abs(direction)>100 && direction<0){
				this.listTouchDirection='left';
			}else{
				this.listTouchDirection='right';
			}
		},
		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.modalName = e.currentTarget.dataset.target
				this.chatStatus=false;
			} else {
				this.modalName = null
			}
			this.listTouchDirection = null
		},
		openChat(index,item){
			// 如果左滑工具栏在开启的情况下不能够点击进入聊天
			if(this.chatStatus){
				this.$emit('itemTap',index,item);
			}else{
				this.chatStatus=true;
			}
			
		},
		from_time(time){
			return this.$util.timeFormat(time);
		},
		btnTap(index,item){
			this.$emit('btnTap',index,item);
		}
		
	}
}
</script>
<style>
	.text-overflow ::v-deep uni-text , .text-overflow ::v-deep uni-text span{
		overflow: hidden !important;
		text-overflow: ellipsis;
		white-space: nowrap !important;
		width:300rpx;
		display: block;
	}
	.top-contacts{
		background-color: #f5f5f5 !important;
	}
	.cu-list.menu-avatar>.cu-item{
		padding-right:30rpx;
	}
	.no-click{
		pointer-events:none;
	}
</style>