import{_ as t,a as e,s as a,g as s,o as l,e as i,w as n,i as c,f as u,j as g,t as o,m as d,k as _,q as h,v as f,l as r,r as p,F as v,x as m,y as k,a5 as y}from"./index-2a18bb69.js";const b=e(a);const C=t({data(){return{loginStore:b,globalConfig:b.globalConfig,setting:{voiceStatus:!0,vibrateStatus:!1,circleAvatar:!1},language:"",type_list:[{id:1,name:this.$t("set.pop_tit1"),valus:"zh"},{id:2,name:this.$t("set.pop_tit2"),valus:"zhCN"},{id:3,name:this.$t("set.pop_tit3"),valus:"en"}],show_more:!1,index_get:0}},created(){let t=s("appSetting")??"";this.language=b.language,"zh"==this.language?this.index_get=0:"zhCN"==this.language?this.index_get=1:this.index_get=2,t&&(this.setting=t)},methods:{setVoice(t){this.setting.voiceStatus=t.detail.value,this.saveSet()},setVibrate(t){this.setting.vibrateStatus=t.detail.value,this.saveSet()},setAvatar(t){this.setting.circleAvatar=t.detail.value,this.saveSet()},saveSet(){b.setAppSetting(this.setting)},get_type(t,e,a){1==a?this.index_get=e:(b.set_language(this.type_list[this.index_get].valus),this.language=b.language,this.show_more=!1,this.$i18n.locale=this.type_list[this.index_get].valus)}}},[["render",function(t,e,a,s,b,C){const S=m("cu-custom"),x=c,$=k,w=y;return l(),i(x,null,{default:n((()=>[u(S,{bgColor:"bg-gradual-pink",isBack:!0},{backText:n((()=>[])),content:n((()=>[g(o(t.$t("set.title")),1)])),_:1}),u(x,{class:"cu-bar bg-white solid-bottom margin-top"},{default:n((()=>[u(x,{class:"action"},{default:n((()=>[g(o(t.$t("set.new_msg")),1)])),_:1})])),_:1}),u(x,{class:"cu-list menu"},{default:n((()=>[u(x,{class:"cu-item"},{default:n((()=>[u(x,{class:"content"},{default:n((()=>[u($,null,{default:n((()=>[g(o(t.$t("set.notice_t")),1)])),_:1})])),_:1}),u(x,{class:"action"},{default:n((()=>[u(w,{class:d(["switch",b.setting.voiceStatus?"checked":""]),onChange:C.setVoice,checked:b.setting.voiceStatus},null,8,["onChange","class","checked"])])),_:1})])),_:1}),u(x,{class:"cu-item"},{default:n((()=>[u(x,{class:"content"},{default:n((()=>[u($,null,{default:n((()=>[g(o(t.$t("set.notice_t1")),1)])),_:1})])),_:1}),u(x,{class:"action"},{default:n((()=>[u(w,{class:d(["switch",b.setting.vibrateStatus?"checked":""]),onChange:C.setVibrate,checked:b.setting.vibrateStatus},null,8,["onChange","class","checked"])])),_:1})])),_:1})])),_:1}),u(x,{class:"cu-bar bg-white solid-bottom margin-top"},{default:n((()=>[u(x,{class:"action"},{default:n((()=>[g(o(t.$t("set.notice_t2")),1)])),_:1})])),_:1}),u(x,{class:"cu-list menu"},{default:n((()=>[u(x,{class:"cu-item"},{default:n((()=>[u(x,{class:"content"},{default:n((()=>[u($,null,{default:n((()=>[g(o(t.$t("set.notice_t3")),1)])),_:1})])),_:1}),u(x,{class:"action"},{default:n((()=>[u(w,{class:d(["switch",b.setting.circleAvatar?"checked":""]),onChange:C.setAvatar,checked:b.setting.circleAvatar},null,8,["onChange","class","checked"])])),_:1})])),_:1})])),_:1}),u(x,{class:"cu-list menu"},{default:n((()=>[u(x,{class:"cu-item"},{default:n((()=>[u(x,{class:"content"},{default:n((()=>[u($,null,{default:n((()=>[g(o(t.$t("set.language")),1)])),_:1})])),_:1}),u(x,{class:"action"},{default:n((()=>[u(x,{onClick:e[0]||(e[0]=t=>b.show_more=!0)},{default:n((()=>["zh"==b.language?(l(),i(x,{key:0},{default:n((()=>[g("简体中文")])),_:1})):_("",!0),"zhCN"==b.language?(l(),i(x,{key:1},{default:n((()=>[g("繁体中文")])),_:1})):_("",!0),"en"==b.language?(l(),i(x,{key:2},{default:n((()=>[g("English")])),_:1})):_("",!0)])),_:1})])),_:1})])),_:1})])),_:1}),h(u(x,{class:"type_more"},{default:n((()=>[u(x,{style:{"padding-top":"50px"}},{default:n((()=>[u(x,{class:"type_tit"},{default:n((()=>[g(o(t.$t("set.language")),1)])),_:1}),(l(!0),r(v,null,p(b.type_list,((t,e)=>(l(),i(x,{class:d(["type_zi",{type_get:b.index_get==e}]),key:e,onClick:a=>C.get_type(t,e,1)},{default:n((()=>[g(o(t.name),1)])),_:2},1032,["class","onClick"])))),128))])),_:1}),u(x,{class:"type_close",onClick:e[1]||(e[1]=t=>C.get_type("","",2))},{default:n((()=>[g(o(t.$t("set.ok")),1)])),_:1})])),_:1},512),[[f,b.show_more]])])),_:1})}],["__scopeId","data-v-ce9d30de"]]);export{C as default};
