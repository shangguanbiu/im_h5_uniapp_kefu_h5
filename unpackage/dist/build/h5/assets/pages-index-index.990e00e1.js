import{_ as a,u as s,s as t,a as e,b as n,h as i,$ as o,g as c,n as l,p as r,c as u,d as m,o as d,e as p,w as f,i as g,f as _,j as h,t as b,k as v,l as C,r as k,F as $,m as x,q as y,v as j,x as w,y as N,z as P}from"./index-2a18bb69.js";import{m as T}from"./index.a45589a7.js";import I from"./pages-contacts-index.95886c29.js";import L from"./pages-compass-index.27eaecb5.js";import S from"./pages-movie-index-index.533eb10e.js";import F from"./pages-opengroup-opengroup.bcc16541.js";import M from"./pages-movie-bet-bet.27aa8875.js";import O from"./pages-nearby-nearby.27844864.js";import q from"./pages-mine-index.1fb18220.js";import{s as z}from"./scan.8ecc2f0c.js";import"./mp-html.f05a545c.js";import"./uni-app.es.29f8a0f7.js";import"./guan_l.692a6680.js";import"./status.22266c08.js";import"./uni-icons.57102094.js";import"./nan_b.1f2ad1df.js";import"./men2.a2cf875e.js";const G=s(t),J=e(t),{unread:Q,sysUnread:U}=n(G);const A=a({components:{message:T,contacts:I,compass:L,mine:q,movice:S,opengroup:F,bet:M,nearby:O},watch:{},data(){return this.$t("nav.message"),this.$t("nav.contacts"),this.$t("nav.mine"),this.$t("nav.contacts"),this.$t("nav.mine"),{pop_notice:!1,globalConfig:J.globalConfig,PageCur:"message",PageName:this.$t("nav.message"),TabCur:0,modelName:!1,navList:[],userinfo:{},tabs:0,run_fun:!0,tabs_arr:[]}},onShow(){this.PageName=this.$t("nav.message"),this.navList=[{name:"message",title:this.$t("nav.message"),notice:Q},{name:"contacts",title:this.$t("nav.contacts"),notice:U},{name:"mine",title:this.$t("nav.mine"),notice:0}],this.tabs_arr=[{id:1,name:this.$t("tab_nav.nav1"),ifshow:!1},{id:2,name:this.$t("tab_nav.nav2"),ifshow:!1},{id:3,name:this.$t("tab_nav.nav3"),ifshow:!1},{id:4,name:this.$t("tab_nav.nav4"),ifshow:!1}]},onLoad(){},mounted(){i(),this.initContacts(),o("socketStatus",(a=>{a&&this.initContacts()})),this.userinfo=c("userInfo")},methods:{pop_ok(){l({url:"/pages/movie/kefu/kefu"})},to_bottom(){setTimeout((()=>{r({scrollTop:document.querySelector(".scroll_main").scrollHeight-102,duration:0})}),100)},run_child(){""!==c("iffirst")&&(this.$refs.child_action.get_banner(1),this.$refs.child_action.getList(1,6,1),this.$refs.child_action.getList(2,10,2),u("iffirst",!0))},closeModel(){this.modelName=!1},scan(){z.scanQr()},NavChange:function(a){"mine"==a.name?l({url:"/pages/mine/index"}):"message"==a.name?l({url:"/pages/index/mv_index"}):"contacts"==a.name?m({url:"/pages/contacts/index"}):"compass"==a.name?l({url:"/pages/compass/index"}):"serve"==a.name?l({url:"/pages/movie/kefu/kefu"}):(this.PageCur=a.name,this.PageName=a.title)},showContacts(){1==this.TabCur?this.TabCur=0:this.TabCur=1},initContacts(){this.modelName="",this.$api.msgApi.initContacts().then((a=>{G.sysUnread=a.count,G.initContacts(a.data)}))},addGroup(){l({url:"/pages/index/userSelection?type=1"})},addFriend(){l({url:"/pages/contacts/search"})},search(){const a="message"==this.PageCur?1:2;l({url:"/pages/index/search?type="+a})},tab_change(a){if(2==a){if(1==JSON.parse(JSON.stringify(J.userInfo)).ifsearch)return void(this.pop_notice=!0);this.$refs.bet_action.run_fun()}this.tabs=a,this.PageName=this.tabs_arr[a].name,this.run_fun=!1,0==a&&(this.run_fun=!0,this.$refs.child_action.get_userinfo())}}},[["render",function(a,s,t,e,n,i){const o=w("cu-custom"),c=w("message"),l=w("contacts"),r=w("mine"),u=g,m=P,T=N;return d(),p(u,{class:"scroll_main"},{default:f((()=>[_(o,{bgColor:"bg-gradual-pink",isBack:!1},{backText:f((()=>[])),content:f((()=>[h(b(n.PageName),1)])),_:1}),_(u,null,{default:f((()=>["message"==n.PageCur?(d(),p(c,{key:0})):v("",!0),"contacts"==n.PageCur?(d(),p(l,{key:1,TabCur:n.TabCur},null,8,["TabCur"])):v("",!0),"mine"==n.PageCur?(d(),p(r,{key:2})):v("",!0)])),_:1}),3!=n.tabs?(d(),p(u,{key:0,class:"cu-bar tabbar bg-white shadow foot"},{default:f((()=>[(d(!0),C($,null,k(n.navList,((a,s)=>(d(),p(u,{class:"action",onClick:s=>i.NavChange(a),key:s,"data-cur":"message"},{default:f((()=>[_(u,{class:"cuIcon-cu-image"},{default:f((()=>[_(m,{src:"/static/image/tabbar/"+[a.name]+[n.PageCur==a.name?"-active":""]+".svg"},null,8,["src"]),a.notice>0?(d(),p(u,{key:0,class:"cu-tag badge"},{default:f((()=>[h(b(a.notice),1)])),_:2},1024)):v("",!0)])),_:2},1024),_(u,{class:x(n.PageCur==a.name?"text-mauve":"text-black")},{default:f((()=>[h(b(a.title),1)])),_:2},1032,["class"])])),_:2},1032,["onClick"])))),128))])),_:1})):v("",!0),_(u,{class:x(["cu-modal bottom-modal","add"==n.modelName?"show":""]),onClick:s[4]||(s[4]=a=>n.modelName="")},{default:f((()=>[_(u,{class:"cu-dialog"},{default:f((()=>[_(u,{class:"manage-content"},{default:f((()=>[_(u,{class:"cu-list menu bg-white"},{default:f((()=>[_(u,{class:"cu-item",onClick:s[0]||(s[0]=a=>{i.initContacts()})},{default:f((()=>[_(u,{class:"content padding-tb-sm"},{default:f((()=>[_(T,{class:"cuIcon-refresh"}),_(T,null,{default:f((()=>[h(b(a.$t("talk.reload")),1)])),_:1})])),_:1})])),_:1}),void 0!==n.userinfo.role&&1==n.userinfo.role?(d(),p(u,{key:0},{default:f((()=>[2==n.globalConfig.sysInfo.runMode?(d(),p(u,{key:0,class:"cu-item",onClick:s[1]||(s[1]=a=>i.addFriend())},{default:f((()=>[_(u,{class:"content padding-tb-sm"},{default:f((()=>[_(T,{class:"cuIcon-friendadd"}),_(T,null,{default:f((()=>[h(b(a.$t("talk.add_friend")),1)])),_:1})])),_:1})])),_:1})):v("",!0),_(u,{class:"cu-item",onClick:s[2]||(s[2]=a=>i.addGroup())},{default:f((()=>[_(u,{class:"content padding-tb-sm"},{default:f((()=>[_(T,{class:"cuIcon-friend"}),_(T,null,{default:f((()=>[h(b(a.$t("talk.new_group")),1)])),_:1})])),_:1})])),_:1})])),_:1})):v("",!0),_(u,{class:"parting-line-5"}),_(u,{class:"cu-item",onClick:s[3]||(s[3]=a=>n.modelName="")},{default:f((()=>[_(u,{class:"content padding-tb-sm"},{default:f((()=>[_(T,{class:"c-red"},{default:f((()=>[h(b(a.$t("talk.close")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["class"]),y(_(u,null,{default:f((()=>[_(u,{class:"com_bg"}),_(u,{class:"com_main"},{default:f((()=>[_(u,{class:"pop_mian"},{default:f((()=>[_(u,{class:"pop_title"},{default:f((()=>[h(b(a.$t("pop.title")),1)])),_:1}),_(u,{style:{padding:"10px 15px","text-align":"center","line-height":"25px","flex-wrap":"wrap"}},{default:f((()=>[h(b(a.$t("pop.content8")),1)])),_:1}),_(u,{class:"pop_foot"},{default:f((()=>[_(u,{class:"pop_ft_btn1",onClick:s[5]||(s[5]=a=>n.pop_notice=!1)},{default:f((()=>[h(b(a.$t("pop.close")),1)])),_:1}),_(u,{class:"pop_ft_btn2",onClick:s[6]||(s[6]=a=>i.pop_ok())},{default:f((()=>[h(b(a.$t("pop.ok2")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},512),[[j,n.pop_notice]])])),_:1})}],["__scopeId","data-v-fd1fd0cc"]]);export{A as default};