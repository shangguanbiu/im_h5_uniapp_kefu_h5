import{_ as a,a as s,s as t,g as e,n as l,K as o,o as c,e as n,w as i,i as u,f as d,j as f,t as g,x as m,z as r}from"./index-2a18bb69.js";import{p}from"./package.fba20730.js";const _=s(t);const b=a({data:()=>({loginStore:_,globalConfig:_.globalConfig,packData:p}),onShow(){},methods:{logout(){let a=e("client_id");this.$api.LoginApi.logout({client_id:a}).then((a=>{0==a.code&&_.logout()}))},openWeb(a){l({url:"/pages/mine/webview?src=https://im.raingad.com"})},showSetting(){o({title:"请在web端进行资料设置",icon:"none"})},editInfo(){l({url:"/pages/mine/profile"})},setAvatar(){l({url:"/pages/mine/avatar"})}}},[["render",function(a,s,t,e,l,o){const p=m("cu-custom"),_=u,b=r;return c(),n(_,null,{default:i((()=>[d(p,{bgColor:"bg-gradual-pink",isBack:!0},{backText:i((()=>[])),content:i((()=>[f("关于我们")])),_:1}),d(_,{style:{height:"150rpx"}}),d(_,{class:"padding im-flex im-rows im-justify-content-center mb-10"},{default:i((()=>[d(_,{class:"im-flex im-rows im-justify-content-center"},{default:i((()=>[d(b,{class:"login-logo",src:l.globalConfig.sysInfo.logo??l.packData.logo,mode:"fixWidth"},null,8,["src"])])),_:1})])),_:1}),d(_,{class:"app-name"},{default:i((()=>[f(g(l.globalConfig.sysInfo.name??l.packData.name),1)])),_:1}),d(_,{class:"app-version mb-20 mt-10 c-999"},{default:i((()=>[f("Version "+g(l.packData.version),1)])),_:1}),d(_,{class:"padding"},{default:i((()=>[d(_,{class:"mb-15"},{default:i((()=>[d(_,{class:"cuIcon-title"},{default:i((()=>[f("支持单聊和群聊")])),_:1})])),_:1}),d(_,{class:"mb-15"},{default:i((()=>[d(_,{class:"cuIcon-title"},{default:i((()=>[f("支持发送表情、图片、语音、视频和文件消息")])),_:1})])),_:1}),d(_,{class:"mb-15"},{default:i((()=>[d(_,{class:"cuIcon-title"},{default:i((()=>[f("单聊支持消息已读未读的状态显示，在线状态显示")])),_:1})])),_:1}),d(_,{class:"mb-15"},{default:i((()=>[d(_,{class:"cuIcon-title"},{default:i((()=>[f("群聊创建、删除和群成员管理、群公告、群禁言等")])),_:1})])),_:1}),d(_,{class:"mb-15"},{default:i((()=>[d(_,{class:"cuIcon-title"},{default:i((()=>[f("支持置顶联系人，消息免打扰")])),_:1})])),_:1}),d(_,{class:"mb-15"},{default:i((()=>[d(_,{class:"cuIcon-title"},{default:i((()=>[f("支持一对一音视频通话（已打通web端和移动端）")])),_:1})])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-5c99a290"]]);export{b as default};
