import{_ as t,K as a,n as e,o as s,e as c,w as l,i as n,f as o,j as r,t as d,C as u,l as i,r as h,F as _,k as f,x as p,y as m,P as k,Q as y,O as g}from"./index-2a18bb69.js";const x=t({name:"search",data(){return{title:"搜索朋友",keywords:"",contacts:[],type:1,noText:this.$t("contact.no_data")}},methods:{search(){if(""==this.keywords)return a({title:this.$t("contact.search_pop"),icon:"none"});this.noText=this.$t("contact.search_no_data"),this.$api.msgApi.searchUser({keywords:this.keywords}).then((t=>{0==t.code&&(this.contacts=t.data)}))},openDetails(t){e({url:"/pages/contacts/detail?id="+t.user_id})},sendMsg(t){e({url:"/pages/message/chat?id="+t})}}},[["render",function(t,a,e,x,b,$){const w=p("cu-custom"),C=m,D=k,T=n,V=y,j=p("Empty");return s(),c(T,null,{default:l((()=>[o(w,{bgColor:"bg-gradual-pink",isBack:!0},{backText:l((()=>[])),content:l((()=>[r(d(t.$t("contact.search_title")),1)])),_:1}),o(T,{class:"cu-bar bg-white search fixed",style:u([{top:t.CustomBar+"px"}])},{default:l((()=>[o(T,{class:"search-form round"},{default:l((()=>[o(C,{class:"cuIcon-search"}),o(D,{type:"text",modelValue:b.keywords,"onUpdate:modelValue":a[0]||(a[0]=t=>b.keywords=t),placeholder:t.$t("contact.search"),"confirm-type":"search"},null,8,["modelValue","placeholder"])])),_:1}),o(T,{class:"action"},{default:l((()=>[o(V,{class:"cu-btn round bg-green",onClick:a[1]||(a[1]=t=>$.search())},{default:l((()=>[r(d(t.$t("contact.search_btn")),1)])),_:1})])),_:1})])),_:1},8,["style"]),o(T,{style:{"margin-top":"120rpx"}},{default:l((()=>[o(T,null,{default:l((()=>[o(T,{class:"cu-list menu no-padding"},{default:l((()=>[(s(!0),i(_,null,h(b.contacts,((a,e)=>(s(),c(T,{class:"cu-item",key:e,onClick:t=>$.openDetails(a)},{default:l((()=>[o(T,{class:"cu-avatar radius mr-15",style:u([{backgroundImage:"url("+a.avatar+")"}])},null,8,["style"]),o(T,{class:"content"},{default:l((()=>[o(T,{class:"c-333"},{default:l((()=>[r(d(a.realname),1)])),_:2},1024)])),_:2},1024),o(T,{class:"action ml-10"},{default:l((()=>[a.friend?(s(),c(T,{key:0,class:"text-blue",onClick:g((t=>$.sendMsg(a.user_id)),["stop"])},{default:l((()=>[r(d(t.$t("contact.send_msg")),1)])),_:2},1032,["onClick"])):f("",!0),a.friend?f("",!0):(s(),c(T,{key:1,class:"text-blue"},{default:l((()=>[r(d(t.$t("contact.see_more")),1)])),_:1}))])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),b.contacts.length?f("",!0):(s(),c(T,{key:0},{default:l((()=>[o(j,{noDatatext:b.noText,textcolor:"#999"},null,8,["noDatatext"])])),_:1}))])),_:1})])),_:1})}]]);export{x as default};