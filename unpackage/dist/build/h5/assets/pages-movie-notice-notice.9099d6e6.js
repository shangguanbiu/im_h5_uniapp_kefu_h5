import{_ as t,n as e,aH as i,aI as s,aJ as a,o as l,e as o,w as n,i as d,f as c,j as r,t as h,l as _,r as g,F as p,x as u,z as m}from"./index-2a18bb69.js";import{_ as f}from"./empty.3b0e6a78.js";const y=t({data(){return{year:0,data_index:0,ifdown:!1,ifpop:!1,page:1,pagesize:10,notice:this.$t("notice_list.load_m1"),loadingType:0,loadingText:"加载中...",contentText:{contendown:"上拉显示更多",contenrefresh:"正在加载...",contennomore:"没有更多数据了"},timer:{},minDate:1546275676,columns:[],empty_img:"",list:[]}},components:{},methods:{see_money(t){this.list[t].ifsee=!this.list[t].ifsee},see_detail(t){e({url:"/pages/movie/notice/detail/detail?id="+t.id})},onChange(t){console.log(t)},onClose(){this.ifdown=!1},onSelect(t){this.ifdown=!1,this.year=t.detail.value,Toast.loading({duration:0,message:"加載中...",forbidClick:!0}),this.list=[],this.getList()},async getList(t){const e=await this.$myRuquest({url:"/api/front/notice/getList",method:"POST",data:{page:this.page,pagesize:this.pagesize,type:3}});200==e.code&&(this.list=[...this.list,...e.data.list]),t&&t()},formatNum(t){if(!t&&0!==t)return 0;let e=t.toString(),i=e.indexOf(".")>-1?/(\d)(?=(\d{3})+\.)/g:/(\d)(?=(?:\d{3})+$)/g;return e.replace(i,"$1,")},async getmorelists(){if(this.notice=this.$t("notice_list.load_m2"),0!==this.loadingType)return!1;this.loadingType=1,i(),this.page++;const t=await this.$myRuquest({url:"/api/front/notice/getList",method:"POST",data:{type:3,page:this.page,pagesize:this.pagesize}});if(200==t.code){if(this.page==Number(t.data.last_page))return this.loadingType=2,this.notice=this.$t("notice_list.load_m3"),void s();this.list=this.list.concat(t.data.list),this.loadingType=0,s()}}},onLoad(){this.list=[],this.getList()},onPullDownRefresh(){this.page=1,this.list=[],this.getList().then((t=>a()))},onReachBottom(){this.getmorelists()}},[["render",function(t,e,i,s,a,y){const x=u("cu-custom"),w=d,T=u("van-divider"),$=u("van-icon"),k=m;return l(),o(w,null,{default:n((()=>[c(x,{bgColor:"bg-gradual-pink",isBack:!0},{backText:n((()=>[])),content:n((()=>[r(h(t.$t("notice_list.title")),1)])),_:1}),c(w,{class:"listare"},{default:n((()=>[0!==a.list.length?(l(),o(w,{key:0},{default:n((()=>[(l(!0),_(p,null,g(a.list,((e,i)=>(l(),o(w,{class:"li_are",key:i,onClick:t=>y.see_detail(e)},{default:n((()=>[c(w,{class:"li_a_top"},{default:n((()=>[r(h(e.title)+" ",1),c(w,{class:"li_a_top_p"},{default:n((()=>[c(w,null,{default:n((()=>[r(h(e.desc),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),c(T),c(w,{class:"li_a_top money_line"},{default:n((()=>[c(w,{style:{width:"120px"}},{default:n((()=>[r(h(t.$t("notice_list.more"))+" >>",1)])),_:1}),c(w,{class:"money_lr"},{default:n((()=>[c($,{name:"arrow"})])),_:1})])),_:1})])),_:2},1032,["onClick"])))),128)),c(w,{style:{"text-align":"center","line-height":"50px",color:"#ccc"}},{default:n((()=>[r(h(a.notice),1)])),_:1})])),_:1})):(l(),o(w,{key:1,class:"listare li_are"},{default:n((()=>[c(w,{class:"empty_ico"},{default:n((()=>[c(k,{src:f,style:{"margin-top":"3px"},mode:"widthFix"}),c(w,{style:{"text-align":"center"}},{default:n((()=>[r(h(t.$t("notice_list.no_data")),1)])),_:1})])),_:1})])),_:1}))])),_:1})])),_:1})}],["__scopeId","data-v-2103eea3"]]);export{y as default};
