import{_ as e,u as t,s as a,a as s,b as l,g as n,$ as i,n as c,d as o,aa as u,K as r,o as d,e as g,w as _,i as f,f as p,j as m,t as h,m as x,C as v,k,l as y,r as b,F as C,q as I,v as w,x as S,z as $,y as N,Q as j}from"./index-2a18bb69.js";import{s as L}from"./scan.8ecc2f0c.js";import{_ as O,a as A,b as J}from"./men2.a2cf875e.js";const P=""+new URL("vip_me-3501a8ec.png",import.meta.url).href,F=t(a),U=s(a),{unread:q,sysUnread:z}=l(F);const R=e({data:()=>({keyIndex:1,pop_notice:!1,hackReset:!1,loginStore:U,globalConfig:U.globalConfig,appSetting:U.appSetting,PageCur:"mine",navList:[],balance:"0.00",flow_data:{},like_me_num:0,params:{page:1,limit:10,is_mine:0,agent_id:""}}),onShow(){this.navList=[{name:"message",title:this.$t("nav.message"),notice:q},{name:"contacts",title:this.$t("nav.contacts"),notice:z},{name:"mine",title:this.$t("nav.mine"),notice:0}]},mounted(){n("allContacts").length||this.initContacts(),i("socketStatus",(e=>{e&&this.initContacts()}));var e=document.getElementsByClassName("uni-page-head-hd")[0];e&&(e.style.display="none"),this.get_userinfo()},methods:{async get_balance(){const e=await this.$myRuquest({url:"/api/front/user/getUserInfo",method:"POST"});200==e.code&&(this.flow_data=e.data,this.balance=e.data.balance)},async get_userinfo(){let e=JSON.parse(JSON.stringify(U.userInfo));const t=await this.$myRuquest({url:"/api/front/index/getImUserInfo",method:"POST",data:{user_id:e.user_id}});if(200==t.code){let e=JSON.parse(JSON.stringify(t.data));1!==e.role&&(this.params.agent_id=e.agent_id),U.login(e),this.get_balance(),this.getList_like()}},to_like(e){let t=JSON.parse(JSON.stringify(U.userInfo));if(1==e){if(0==t.islevel&&0==t.role)return void(this.pop_notice=!0);c({url:"/pages/mine/like/like_me"})}else c({url:"/pages/mine/like/like"})},NavChange(e){"message"==e.name?c({url:"/pages/index/mv_index"}):"contacts"==e.name?o({url:"/pages/contacts/index"}):"compass"==e.name?c({url:"/pages/compass/index"}):"home"==e.name?o({url:"/pages/index/index"}):"serve"==e.name&&c({url:"/pages/movie/kefu/kefu"})},initContacts(){this.modelName="",this.$api.msgApi.initContacts().then((e=>{F.sysUnread=e.count,F.initContacts(e.data)}))},logout(){let e=n("client_id");this.$api.LoginApi.logout({client_id:e}).then((e=>{0==e.code&&U.logout()})),u("allContacts"),u("ifLogin"),u("iffirst")},about(){if(this.globalConfig&&this.globalConfig.demon_mode){c({url:"/pages/mine/webview?src="+"https://im.raingad.com"})}else c({url:"/pages/mine/about"})},showSetting(){c({url:"/pages/mine/setting"})},showsecure(){c({url:"/pages/mine/secure"})},editInfo(){c({url:"/pages/mine/profile"})},editInfo_msg(){c({url:"/pages/mine/profile_msg"})},edit_renzheng(){null===this.flow_data.agent_account?c({url:"/pages/mine/renzheng"}):r({title:this.$t("usercenter.vip_p_pop_6"),icon:"none"})},scan(){L.scanQr()},openQr(){c({url:"/pages/index/qrcode"})},to_vip(){c({url:"/pages/mine/vip/vip"})},getList_like(){this.$api.third_openApi.like_me_index(this.params).then((e=>{if(0==e.code){let t=e.data.data;this.like_me_num=t.length}}))}}},[["render",function(e,t,a,s,l,n){const i=S("cu-custom"),c=f,o=$,u=N,r=j;return d(),g(c,null,{default:_((()=>[p(i,{bgColor:"bg-gradual-pink",isBack:!1},{content:_((()=>[m(h(e.$t("usercenter.title")),1)])),_:1}),p(c,{class:"padding flex im-space-between im-align-items-center bg-white mb-10"},{default:_((()=>[p(c,{class:"flex justify-start bg-white",onClick:t[0]||(t[0]=e=>n.editInfo())},{default:_((()=>[null!==l.loginStore.userInfo.avatar?(d(),g(c,{key:0,class:x(["cu-avatar lg mr-15",l.appSetting.circleAvatar?"round":"radius"]),style:v([{backgroundImage:"url("+l.loginStore.userInfo.avatar+")"}])},null,8,["class","style"])):k("",!0),null==l.loginStore.userInfo.avatar&&0==l.loginStore.userInfo.sex?(d(),g(c,{key:1,class:x(["cu-avatar lg mr-15",l.appSetting.circleAvatar?"round":"radius"])},{default:_((()=>[p(o,{src:O,mode:"widthFix",style:{width:"100%","max-height":"100px"}})])),_:1},8,["class"])):k("",!0),null==l.loginStore.userInfo.avatar&&1==l.loginStore.userInfo.sex?(d(),g(c,{key:2,class:x(["cu-avatar lg mr-15",l.appSetting.circleAvatar?"round":"radius"])},{default:_((()=>[p(o,{src:A,mode:"widthFix",style:{width:"100%","max-height":"100px"}})])),_:1},8,["class"])):k("",!0),null==l.loginStore.userInfo.avatar&&2==l.loginStore.userInfo.sex?(d(),g(c,{key:3,class:x(["cu-avatar lg mr-15",l.appSetting.circleAvatar?"round":"radius"])},{default:_((()=>[p(o,{src:J,mode:"widthFix",style:{width:"100%","max-height":"100px"}})])),_:1},8,["class"])):k("",!0),p(c,{class:"im-flex im-justify-content-start im-columns"},{default:_((()=>[p(c,{class:"mb-5 f-18 mb-10 im-flex im-align-items-center"},{default:_((()=>[p(c,{class:"c-333"},{default:_((()=>[m(h(l.loginStore.userInfo.realname),1)])),_:1})])),_:1}),p(c,{class:"mb-10",style:{"text-decoration":"none",display:"flex","align-items":"center"}},{default:_((()=>[p(c,{class:"text-gray"}),m(h(l.loginStore.userInfo.account)+" ",1),p(c,{class:"text-pink",style:{"padding-left":"10px"}},{default:_((()=>[m(h(e.$t("mine.jifen"))+"："+h(l.balance),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),p(c,{class:"vip_are_P",onClick:n.to_vip},{default:_((()=>[p(c,{class:"vip_are_m"},{default:_((()=>[p(c,{class:"vip_are_tit"},{default:_((()=>[m(h(e.$t("usercenter.vip_title")),1)])),_:1}),p(c,{class:"vip_are_p"},{default:_((()=>[m(h(e.$t("usercenter.vip_desc")),1)])),_:1})])),_:1}),p(o,{src:P,mode:"widthFix",style:{width:"100%","max-height":"100px"}})])),_:1},8,["onClick"]),p(c,{class:"cu-list menu"},{default:_((()=>[p(c,{class:"cu-item",onClick:t[1]||(t[1]=e=>n.edit_renzheng())},{default:_((()=>[p(c,{class:"content"},{default:_((()=>[p(u,{class:"cuIcon-vip text-pink"}),p(u,null,{default:_((()=>[m(h(e.$t("usercenter.l_nav6")),1)])),_:1})])),_:1}),p(c,{class:"action"},{default:_((()=>[p(u,{class:"text-grey cuIcon-right"})])),_:1})])),_:1}),p(c,{class:"cu-item",onClick:t[2]||(t[2]=e=>n.editInfo_msg())},{default:_((()=>[p(c,{class:"content"},{default:_((()=>[p(u,{class:"cuIcon-newsfill text-red"}),p(u,null,{default:_((()=>[m(h(e.$t("usercenter.l_nav5")),1)])),_:1})])),_:1}),p(c,{class:"action"},{default:_((()=>[p(u,{class:"text-grey cuIcon-right"})])),_:1})])),_:1}),p(c,{class:"cu-item",onClick:t[3]||(t[3]=e=>n.to_like(1))},{default:_((()=>[p(c,{class:"content",style:{position:"relative"}},{default:_((()=>[p(u,{class:"cuIcon-likefill text-red"}),p(u,null,{default:_((()=>[m(h(e.$t("usercenter.l_nav1")),1)])),_:1}),0!==l.like_me_num?(d(),g(c,{key:0,class:"pop_num"},{default:_((()=>[m(h(l.like_me_num),1)])),_:1})):k("",!0)])),_:1}),p(c,{class:"action"},{default:_((()=>[p(u,{class:"text-grey cuIcon-right"})])),_:1})])),_:1}),p(c,{class:"cu-item",onClick:t[4]||(t[4]=e=>n.to_like(2))},{default:_((()=>[p(c,{class:"content"},{default:_((()=>[p(u,{class:"cuIcon-emojiflashfill text-pink"}),p(u,null,{default:_((()=>[m(h(e.$t("usercenter.l_nav2")),1)])),_:1})])),_:1}),p(c,{class:"action"},{default:_((()=>[p(u,{class:"text-grey cuIcon-right"})])),_:1})])),_:1}),p(c,{class:"cu-item",onClick:n.showSetting},{default:_((()=>[p(c,{class:"content"},{default:_((()=>[p(u,{class:"cuIcon-settings text-grey"}),p(u,null,{default:_((()=>[m(h(e.$t("usercenter.l_nav3")),1)])),_:1})])),_:1}),p(c,{class:"action"},{default:_((()=>[p(u,{class:"text-grey cuIcon-right"})])),_:1})])),_:1},8,["onClick"]),p(c,{class:"cu-item",onClick:n.showsecure},{default:_((()=>[p(c,{class:"content"},{default:_((()=>[p(u,{class:"cuIcon-safe text-orange"}),p(u,null,{default:_((()=>[m(h(e.$t("usercenter.l_nav4")),1)])),_:1})])),_:1}),p(c,{class:"action"},{default:_((()=>[p(u,{class:"text-grey cuIcon-right"})])),_:1})])),_:1},8,["onClick"])])),_:1}),p(c,{class:"padding flex flex-direction"},{default:_((()=>[p(r,{class:"cu-btn bg-red lg",onClick:t[5]||(t[5]=e=>n.logout())},{default:_((()=>[m(h(e.$t("usercenter.login_put")),1)])),_:1})])),_:1}),p(c,{class:"cu-bar tabbar bg-white shadow foot"},{default:_((()=>[(d(!0),y(C,null,b(l.navList,((e,t)=>(d(),g(c,{class:"action",onClick:t=>n.NavChange(e),key:t,"data-cur":"message"},{default:_((()=>[p(c,{class:"cuIcon-cu-image"},{default:_((()=>[p(o,{src:"/static/image/tabbar/"+[e.name]+[l.PageCur==e.name?"-active":""]+".svg"},null,8,["src"]),e.notice>0?(d(),g(c,{key:0,class:"cu-tag badge"},{default:_((()=>[m(h(e.notice),1)])),_:2},1024)):k("",!0)])),_:2},1024),p(c,{class:x(l.PageCur==e.name?"text-mauve":"text-black")},{default:_((()=>[m(h(e.title),1)])),_:2},1032,["class"])])),_:2},1032,["onClick"])))),128))])),_:1}),I(p(c,null,{default:_((()=>[p(c,{class:"com_bg"}),p(c,{class:"com_main"},{default:_((()=>[p(c,{class:"pop_mian"},{default:_((()=>[p(c,{class:"pop_title"},{default:_((()=>[m(h(e.$t("pop.title")),1)])),_:1}),p(c,{style:{padding:"10px 15px",display:"flex","justify-content":"flex-start","line-height":"25px","flex-wrap":"wrap"}},{default:_((()=>[m(h(e.$t("pop.content1")),1)])),_:1}),p(c,{class:"pop_foot"},{default:_((()=>[p(c,{class:"pop_ft_btn1",onClick:t[6]||(t[6]=e=>l.pop_notice=!1)},{default:_((()=>[m(h(e.$t("pop.close")),1)])),_:1}),p(c,{class:"pop_ft_btn2",onClick:t[7]||(t[7]=t=>e.pop_ok())},{default:_((()=>[m(h(e.$t("pop.up")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},512),[[w,l.pop_notice]])])),_:1})}],["__scopeId","data-v-2a5c6a6d"]]);export{R as default};
