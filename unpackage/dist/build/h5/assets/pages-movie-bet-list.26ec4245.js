import{_ as t,n as e,aH as s,aI as i,aJ as l,o as a,e as n,w as o,i as _,f as d,j as r,t as c,l as u,r as f,F as g,x as h,z as p,k as m}from"./index-2a18bb69.js";import{_ as y}from"./empty.3b0e6a78.js";const b=t({data:()=>({year:0,data_index:0,ifdown:!1,ifpop:!1,page:1,pagesize:10,notice:"下拉刷新",loadingType:0,loadingText:"加载中...",contentText:{contendown:"上拉显示更多",contenrefresh:"正在加载...",contennomore:"没有更多数据了"},timer:{},minDate:1546275676,columns:[],empty_img:"",list:[]}),components:{},methods:{see_money(t){this.list[t].ifsee=!this.list[t].ifsee},see_detail(t){e({url:"/pages/movie/notice/detail/detail?id="+t.id})},onChange(t){console.log(t)},onClose(){this.ifdown=!1},onSelect(t){this.ifdown=!1,this.year=t.detail.value,Toast.loading({duration:0,message:"加載中...",forbidClick:!0}),this.list=[],this.getList()},async getList(t){this.list=[];const e=await this.$myRuquest({method:"Post",url:"/api/front/order/getHistoryOrder",data:{page:this.page,pagesize:5}});200==e.code&&(this.list=e.data.data),t&&t()},async getmorelists(){if(0!==this.loadingType)return!1;this.loadingType=1,s(),this.page++;const t=await this.$myRuquest({method:"Post",url:"/api/front/order/getHistoryOrder",data:{page:this.page,pagesize:5}});if(200==t.code){if(t.data.data.length<1)return this.loadingType=2,void i();this.list=this.list.concat(t.data.data),this.loadingType=0,i()}},formatNum(t){if(!t&&0!==t)return 0;let e=t.toString(),s=e.indexOf(".")>-1?/(\d)(?=(\d{3})+\.)/g:/(\d)(?=(?:\d{3})+$)/g;return e.replace(s,"$1,")}},onLoad(){this.list=[],this.page=1,this.getList()},onPullDownRefresh(){this.page=1,this.list=[],this.getList().then((t=>l()))},onReachBottom(){this.getmorelists()}},[["render",function(t,e,s,i,l,b){const x=h("cu-custom"),$=_,k=p;return a(),n($,null,{default:o((()=>[d(x,{bgColor:"bg-gradual-pink",isBack:!0},{backText:o((()=>[])),content:o((()=>[r(c(t.$t("bet_list.title")),1)])),_:1}),0!==l.list.length?(a(),n($,{key:0},{default:o((()=>[(a(!0),u(g,null,f(l.list,((e,s)=>(a(),n($,{class:"list_line_are",key:s},{default:o((()=>[d($,{class:"list_line_line"},{default:o((()=>[d($,{class:"list_line_zi"},{default:o((()=>[r(c(t.$t("bet_list.qihao")),1)])),_:1}),d($,{class:"list_line_zi"},{default:o((()=>[r(c(t.$t("bet_list.jifen")),1)])),_:1})])),_:1}),d($,{class:"list_line_line"},{default:o((()=>[d($,{class:"list_line_zi"},{default:o((()=>[r(c(e.open_no),1)])),_:2},1024),d($,{class:"list_line_zi"},{default:o((()=>[r(c(e.amount),1)])),_:2},1024)])),_:2},1024),d($,{class:"list_line_line"},{default:o((()=>[d($,{class:"list_line_zi"},{default:o((()=>[r(c(t.$t("bet_list.time")),1)])),_:1}),d($,{class:"list_line_zi"},{default:o((()=>[r(c(t.$t("bet_list.toupiao")),1)])),_:1})])),_:1}),d($,{class:"list_line_line"},{default:o((()=>[d($,{sclass:"list_line_zi",style:{flex:"1"}},{default:o((()=>[r(c(e.create_time),1)])),_:2},1024),d($,{class:"list_line_zi"},{default:o((()=>[d($,{style:{display:"flex","justify-items":"flex-start"}},{default:o((()=>[1==e.multiple_id?(a(),n($,{key:0,class:"color_n1"},{default:o((()=>[r(c(t.$t("bet_list.bet_n1")),1)])),_:1})):m("",!0),2==e.multiple_id?(a(),n($,{key:1,class:"color_n2"},{default:o((()=>[r(c(t.$t("bet_list.bet_n2")),1)])),_:1})):m("",!0),3==e.multiple_id?(a(),n($,{key:2,class:"color_n1"},{default:o((()=>[r(c(t.$t("bet_list.bet_n3")),1)])),_:1})):m("",!0),4==e.multiple_id?(a(),n($,{key:3,class:"color_n2"},{default:o((()=>[r(c(t.$t("bet_list.bet_n4")),1)])),_:1})):m("",!0)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128)),d($,{style:{"text-align":"center","line-height":"50px",color:"#ccc"}},{default:o((()=>[r(c(t.$t("bet_list.reload")),1)])),_:1})])),_:1})):(a(),n($,{key:1,class:"listare li_are"},{default:o((()=>[d($,{class:"empty_ico"},{default:o((()=>[d(k,{src:y,style:{"margin-top":"3px"},mode:"widthFix"}),d($,{style:{"text-align":"center"}},{default:o((()=>[r(c(t.$t("bet_list.no_data")),1)])),_:1})])),_:1})])),_:1}))])),_:1})}],["__scopeId","data-v-bd0ebec7"]]);export{b as default};
