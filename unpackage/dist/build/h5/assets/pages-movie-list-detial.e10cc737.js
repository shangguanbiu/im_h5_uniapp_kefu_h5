import{_ as e,a as t,s as a,n as i,g as s,c as l,o,e as n,w as r,i as d,f as u,j as c,t as _,l as p,r as f,F as g,q as m,v as h,x as w,a0 as k,m as x,z as y}from"./index-2a18bb69.js";const v=t(a);const b=e({data:()=>({top_title:"详情",pop_notice:!1,scrollW:0,show_login:!1,indicatorDots:!0,autoplay:!0,interval:3e3,duration:500,indicatorColor:"#292b40",indicatorActiveColor:"#ffffff",tag:["好看","大片","动作片","青春","喜剧"],detail:{},guess_arr:[],fromUser:""}),methods:{pop_ok(){i({url:"/pages/movie/kefu/kefu"})},async getList(e){this.list=[];const t=await this.$myRuquest({method:"Post",url:"/api/front/movie/getList",data:{page:1,pagesize:6,tag:"",current_id:e}});200==t.code&&(this.guess_arr=t.data.list)},async add_view(e){200==(await this.$myRuquest({method:"Post",url:"/api/front/movie/addViewCount",data:{id:e}})).code&&this.count_number("isview")},async count_number(e){let t=JSON.parse(JSON.stringify(v.userInfo));(await this.$myRuquest({url:"/api/front/index/changeImUserData",method:"POST",data:{user_id:t.user_id,column:e}})).code},jump(e){1==e?i({url:"/pages/index/index"}):2==e?i({url:"/pages/recharge/recharge"}):3==e?i({url:"/pages/kefu/kefu_index"}):4==e&&i({url:"/pages/usercenter/usercenter"})},onClose(){this.show_login=!this.show_login},noOk(){i({url:"/pages/login/login"})},to_notice(){i({url:"/pages/notice/notice"})},onNavigationBarButtonTap(e){""!==s("token")?0==e.index?i({url:"/pages/notice/notice"}):i({url:"/pages/login/login"}):this.show_login=!0},see_detail(e){0!=this.fromUser.isview||0!=this.fromUser.role?(l("movice_info",e),i({url:"/pages/movie/list/detial?id="+e.id})):this.pop_notice=!0},async get_userinfo(){let e=JSON.parse(JSON.stringify(v.userInfo));const t=await this.$myRuquest({url:"/api/front/index/getImUserInfo",method:"POST",data:{user_id:e.user_id}});if(200==t.code){this.fromUser=t.data;let e=JSON.parse(JSON.stringify(t.data));v.login(e)}}},onLoad(e){l("iffirst",!1),this.detail=s("movice_info"),this.top_title=this.detail.name,this.getList(e.id),this.add_view(e.id)},mounted(){window.scrollTo({top:0,behavior:"smooth"})},onShow(){window.scrollTo({top:0,behavior:"smooth"}),this.show_login=!1,s("token")}},[["render",function(e,t,a,i,s,l){const v=w("cu-custom"),b=k,$=d,C=y,O=w("van-icon");return o(),n($,null,{default:r((()=>[u(v,{bgColor:"bg-gradual-pink",isBack:!0},{backText:r((()=>[])),content:r((()=>[c(_(s.top_title),1)])),_:1}),u($,{class:"page-section swiper"},{default:r((()=>[u($,null,{default:r((()=>[u(b,{id:"myVideo",src:s.detail.url,onError:e.videoErrorCallback,width:"100%",height:"400px","enable-danmu":"","danmu-btn":"",controls:""},null,8,["src","onError"])])),_:1}),u($,{class:"main_i"},{default:r((()=>[u($,{class:"main_title"},{default:r((()=>[c(_(s.detail.name),1)])),_:1}),u($,{class:"mian_price_line",style:{padding:"7px 0"}},{default:r((()=>[u($,{class:"mark_price"},{default:r((()=>[c(_(e.$t("detail.view"))+"："+_(s.detail.view_count),1)])),_:1})])),_:1}),u($,{class:"main_title",style:{"margin-top":"10px",color:"#2a1468"}},{default:r((()=>[c(_(e.$t("detail.jianjie")),1)])),_:1}),u($,{class:"dangan"},{default:r((()=>[c(_(s.detail.desc),1)])),_:1}),u($,{style:{display:"flex",padding:"10px 0","flex-wrap":"wrap"}},{default:r((()=>[(o(!0),p(g,null,f(s.detail.hot_tags.split(","),((e,t)=>(o(),n($,{class:x("item_"+t),key:t},{default:r((()=>[c(_(e),1)])),_:2},1032,["class"])))),128))])),_:1}),u($,{class:"main_title",style:{"margin-top":"10px",color:"#2a1468"}},{default:r((()=>[c(_(e.$t("detail.belike")),1)])),_:1}),u($,{class:"like_are"},{default:r((()=>[(o(!0),p(g,null,f(s.guess_arr,((e,t)=>(o(),n($,{class:"like_zi",key:t,onClick:t=>l.see_detail(e)},{default:r((()=>[u($,{class:"like_zi_are"},{default:r((()=>[u(C,{src:e.img,class:"list_zi_img",mode:"widthFix"},null,8,["src"]),u($,{class:"like_zi_title"},{default:r((()=>[u($,null,{default:r((()=>[c(_(e.name),1)])),_:2},1024),u($,null,{default:r((()=>[u(O,{name:"eye-o",class:"l_ft_r"}),c(_(e.view_count),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1})])),_:1}),m(u($,null,{default:r((()=>[u($,{class:"com_bg"}),u($,{class:"com_main"},{default:r((()=>[u($,{class:"pop_mian"},{default:r((()=>[u($,{class:"pop_title"},{default:r((()=>[c(_(e.$t("pop.title")),1)])),_:1}),u($,{style:{padding:"10px 15px",display:"flex","justify-content":"flex-start","line-height":"25px","flex-wrap":"wrap"}},{default:r((()=>[c(_(e.$t("pop.content2")),1)])),_:1}),u($,{class:"pop_foot"},{default:r((()=>[u($,{class:"pop_ft_btn1",onClick:t[0]||(t[0]=e=>s.pop_notice=!1)},{default:r((()=>[c(_(e.$t("pop.close")),1)])),_:1}),u($,{class:"pop_ft_btn2",onClick:t[1]||(t[1]=e=>l.pop_ok())},{default:r((()=>[c(_(e.$t("pop.up")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},512),[[h,s.pop_notice]])])),_:1})}],["__scopeId","data-v-fe80ac46"]]);export{b as default};