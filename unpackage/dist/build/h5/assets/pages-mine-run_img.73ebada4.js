import{_ as t,as as i,ax as s,R as e,L as h,E as a,ay as l,D as n,h as o,K as r,G as c,at as p,az as d,aA as f,o as g,e as u,w as m,f as x,C as v,j as w,z as b,au as y,y as S,i as I,I as H,a as W,s as k,g as _,n as T,Y as D,t as R,l as C,r as O,F as P,k as z,x as A,Q as U,ab as $,m as M}from"./index-2a18bb69.js";const Y=t({name:"yq-avatar",data:()=>({csH:"0px",sD:"none",sT:"-10000px",pT:"-10000px",iS:{},sS:{},sO:!0,bW:"19%",bD:"flex",tp:0,imgSrc:{imgSrc:""}}),watch:{avatarSrc(){this.imgSrc.imgSrc=this.avatarSrc}},computed:{inlineH:()=>0},props:{avatarSrc:"",avatarStyle:"",selWidth:"",selHeight:"",expWidth:"",expHeight:"",minScale:"",maxScale:"",canScale:"",canRotate:"",lockWidth:"",lockHeight:"",stretch:"",lock:"",fileType:"",noTab:"",inner:"",quality:"",index:"",bgImage:""},created(){this.cc=i("avatar-canvas",this),this.cco=i("oper-canvas",this),this.ccp=i("prv-canvas",this),this.qlty=parseFloat(this.quality)||1,this.imgSrc.imgSrc=this.avatarSrc,this.letRotate=!1===this.canRotate||!0===this.inner||"true"===this.inner||"false"===this.canRotate?0:1,this.letScale=!1===this.canScale||"false"===this.canScale?0:1,this.isin=!0===this.inner||"true"===this.inner?1:0,this.indx=this.index||void 0,this.mnScale=parseFloat(this.minScale)||.3,this.mxScale=parseFloat(this.maxScale)||4,this.noBar=!0===this.noTab||"true"===this.noTab?1:0,this.stc=this.stretch,this.lck=this.lock,this.fType="jpg"===this.fileType?"jpg":"png",this.isin||!this.letRotate?(this.bW="24%",this.bD="none"):(this.bW="19%",this.bD="flex"),this.noBar?this.fWindowResize():s({fail:()=>{this.noBar=1},success:()=>{this.noBar=0},complete:t=>{this.fWindowResize()}})},methods:{fWindowResize(){let t=e();this.platform=t.platform,this.wW=t.windowWidth,this.drawTop=t.windowTop,this.wH=t.windowHeight,this.noBar||(this.wH+=50),this.csH=this.wH-50-this.inlineH+"px",this.tp=this.csH,this.tp=t.windowTop+parseInt(this.csH)+"px",this.pxRatio=this.wW/750;let i=this.avatarStyle;if(i&&!0!==i&&(i=i.trim())){i=i.split(";");let t={};for(let s of i)if(s){if(s=s.trim().split(":"),s[1].toString().indexOf("upx")>=0){let t=s[1].trim().split(" ");for(let i in t)t[i]&&t[i].toString().indexOf("upx")>=0&&(t[i]=parseFloat(t[i])*this.pxRatio+"px");s[1]=t.join(" ")}t[s[0].trim()]=s[1].trim()}this.iS=t}this.expWidth&&(this.eW=this.expWidth.toString().indexOf("upx")>=0?parseInt(this.expWidth)*this.pxRatio:parseInt(this.expWidth)),this.expHeight&&(this.eH=this.expHeight.toString().indexOf("upx")>=0?parseInt(this.expHeight)*this.pxRatio:parseInt(this.expHeight)),"flex"===this.sD&&this.fDrawInit(!0),this.fHideImg()},fSelect(){this.fSelecting||(this.fSelecting=!0,setTimeout((()=>{this.fSelecting=!1}),500),h({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:t=>{a({title:"加载中...",mask:!0});let i=this.imgPath=t.tempFilePaths[0];l({src:i,success:t=>{if(this.imgWidth=t.width,this.imgHeight=t.height,this.path=i,!this.hasSel){let t=this.sS||{};if(!this.selWidth||!this.selHeight)return void n({title:"裁剪框的宽或高没有设置",showCancel:!1});{let i=this.selWidth.toString().indexOf("upx")>=0?parseInt(this.selWidth)*this.pxRatio:parseInt(this.selWidth),s=this.selHeight.toString().indexOf("upx")>=0?parseInt(this.selHeight)*this.pxRatio:parseInt(this.selHeight);t.width=i+"px",t.height=s+"px",t.top=(this.wH-s-50|0)/2+"px",t.left=(this.wW-i|0)/2+"px"}this.sS=t}this.noBar?this.fDrawInit(!0):o({complete:()=>{this.fDrawInit(!0)}})},fail:()=>{r({title:"请选择正确图片",duration:2e3})},complete(){c()}})}}))},fUpload(){if(this.fUploading)return;this.fUploading=!0,setTimeout((()=>{this.fUploading=!1}),1e3);let t=this.sS,i=parseInt(t.left),e=parseInt(t.top),h=parseInt(t.width),l=parseInt(t.height),n=this.eW||h*this.pixelRatio,o=this.eH||l*this.pixelRatio;a({title:"加载中...",mask:!0}),this.sD="none",this.sT="-10000px",this.hasSel=!1,this.fHideImg(),p({x:i,y:e,width:h,height:l,destWidth:n,destHeight:o,canvasId:"avatar-canvas",fileType:this.fType,quality:this.qlty,success:t=>{t=t.tempFilePath,this.btop(t).then((t=>{this.$emit("upload",{avatar:this.imgSrc,path:t,index:this.indx,data:this.rtn,base64:this.base64||null})}))},fail:t=>{r({title:"error1",duration:2e3})},complete:()=>{c(),this.noBar||s(),this.$emit("end")}},this)},fPrvUpload(){if(this.fPrvUploading)return;this.fPrvUploading=!0,setTimeout((()=>{this.fPrvUploading=!1}),1e3);let t=this.sS;parseInt(t.width),parseInt(t.height);let i=this.prvX,e=this.prvY,h=this.prvWidth,l=this.prvHeight,n=this.eW||parseInt(t.width)*this.pixelRatio,o=this.eH||parseInt(t.height)*this.pixelRatio;a({title:"加载中...",mask:!0}),this.sD="none",this.sT="-10000px",this.hasSel=!1,this.fHideImg(),p({x:i,y:e,width:h,height:l,destWidth:n,destHeight:o,canvasId:"prv-canvas",fileType:this.fType,quality:this.qlty,success:t=>{t=t.tempFilePath,this.btop(t).then((t=>{this.$emit("upload",{avatar:this.imgSrc,path:t,index:this.indx,data:this.rtn,base64:this.base64||null})}))},fail:()=>{r({title:"error_prv",duration:2e3})},complete:()=>{c(),this.noBar||s(),this.$emit("end")}},this)},fDrawInit(t=!1){let i=this.wW,s=this.wH,e=this.imgWidth,h=this.imgHeight,a=e/h,l=i-40,n=s-50-80,o=l/n,r=parseInt(this.sS.width),c=parseInt(this.sS.height);switch(this.fixWidth=0,this.fixHeight=0,this.lckWidth=0,this.lckHeight=0,this.stc){case"x":this.fixWidth=1;break;case"y":this.fixHeight=1;break;case"long":a>1?this.fixWidth=1:this.fixHeight=1;break;case"short":a>1?this.fixHeight=1:this.fixWidth=1;break;case"longSel":r>c?this.fixWidth=1:this.fixHeight=1;break;case"shortSel":r>c?this.fixHeight=1:this.fixWidth=1}switch(this.lck){case"x":this.lckWidth=1;break;case"y":this.lckHeight=1;break;case"long":a>1?this.lckWidth=1:this.lckHeight=1;break;case"short":a>1?this.lckHeight=1:this.lckWidth=1;break;case"longSel":r>c?this.lckWidth=1:this.lckHeight=1;break;case"shortSel":r>c?this.lckHeight=1:this.lckWidth=1}this.fixWidth?(l=r,n=l/a):this.fixHeight?(n=c,l=n*a):a<o?h<n?(l=e,n=h):l=n*a:e<l?(l=e,n=h):n=l/a,this.isin&&(l<r&&(l=r,n=l/a,this.lckHeight=0),n<c&&(n=c,l=n*a,this.lckWidth=0)),this.scaleSize=1,this.rotateDeg=0,this.posWidth=(i-l)/2|0,this.posHeight=(s-n-50)/2|0,this.useWidth=0|l,this.useHeight=0|n,this.centerX=this.posWidth+l/2,this.centerY=this.posHeight+n/2,this.focusX=0,this.focusY=0;let p=this.sS,d=parseInt(p.left),f=parseInt(p.top),g=parseInt(p.width),u=parseInt(p.height);this.canvas,this.canvasOper,this.cc;let m=this.cco;m.beginPath(),m.setLineWidth(3),m.setGlobalAlpha(1),m.setStrokeStyle("white"),m.strokeRect(d,f,g,u),m.setFillStyle("black"),m.setGlobalAlpha(.5),m.fillRect(0,0,this.wW,f),m.fillRect(0,f,d,u),m.fillRect(0,f+u,this.wW,this.wH-u-f-50),m.fillRect(d+g,f,this.wW-g-d,u),m.setGlobalAlpha(1),m.setStrokeStyle("red"),m.moveTo(d+15,f),m.lineTo(d,f),m.lineTo(d,f+15),m.moveTo(d+g-15,f),m.lineTo(d+g,f),m.lineTo(d+g,f+15),m.moveTo(d+15,f+u),m.lineTo(d,f+u),m.lineTo(d,f+u-15),m.moveTo(d+g-15,f+u),m.lineTo(d+g,f+u),m.lineTo(d+g,f+u-15),m.stroke(),m.draw(!1,(()=>{t&&(this.sD="flex",this.sT=this.drawTop+"px",this.fDrawImage(!0))})),this.$emit("init")},fDrawImage(t=!1){let i=Date.now();if(i-this.drawTm<20)return;this.drawTm=i;let s=this.cc,e=this.useWidth*this.scaleSize,h=this.useHeight*this.scaleSize;if(this.bgImage?s.drawImage(this.bgImage,0,0,this.wW,this.wH-50):s.fillRect(0,0,this.wW,this.wH-50),this.isin){let t=this.focusX*(this.scaleSize-1),i=this.focusY*(this.scaleSize-1);s.translate(this.centerX,this.centerY),s.rotate(this.rotateDeg*Math.PI/180),s.drawImage(this.imgPath,this.posWidth-this.centerX-t,this.posHeight-this.centerY-i,e,h)}else s.translate(this.posWidth+e/2,this.posHeight+h/2),s.rotate(this.rotateDeg*Math.PI/180),s.drawImage(this.imgPath,-e/2,-h/2,e,h);s.draw(!1)},fPreview(){if(this.fPreviewing)return;this.fPreviewing=!0,setTimeout((()=>{this.fPreviewing=!1}),1e3);let t=this.sS,i=parseInt(t.left),s=parseInt(t.top),e=parseInt(t.width),h=parseInt(t.height);a({title:"加载中...",mask:!0}),p({x:i,y:s,width:e,height:h,expWidth:e*this.pixelRatio,expHeight:h*this.pixelRatio,canvasId:"avatar-canvas",fileType:this.fType,quality:this.qlty,success:t=>{this.prvImgTmp=t=t.tempFilePath;let i=this.ccp,s=this.wW,e=parseInt(this.csH),h=parseInt(this.sS.width),a=parseInt(this.sS.height),l=s-40,n=e-80,o=l/h,r=a*o;r<n?(h=l,a=r):(o=n/a,h*=o,a=n),i.fillRect(0,0,s,e),this.prvX=s=(s-h)/2|0,this.prvY=e=(e-a)/2|0,this.prvWidth=h|=0,this.prvHeight=a|=0,i.drawImage(t,s,e,h,a),i.draw(!1),this.btop(t).then((t=>{this.sO=!1,this.pT=this.drawTop+"px"})),this.sO=!1,this.pT=this.drawTop+"px"},fail:()=>{r({title:"error2",duration:2e3})},complete:()=>{c()}},this)},fChooseImg(t,i,s){if(i){let t=i.selWidth,s=i.selHeight,e=i.expWidth,h=i.expHeight,a=i.quality,l=i.canRotate,n=i.canScale,o=i.minScale,r=i.maxScale,c=i.stretch,p=i.fileType,d=i.inner,f=i.lock;e&&(this.eW=e.toString().indexOf("upx")>=0?parseInt(e)*this.pxRatio:parseInt(e)),h&&(this.eH=h.toString().indexOf("upx")>=0?parseInt(h)*this.pxRatio:parseInt(h)),this.letRotate=!1===l||!0===d||"true"===d||"false"===l?0:1,this.letScale=!1===n||"false"===n?0:1,this.qlty=parseFloat(a)||1,this.mnScale=parseFloat(o)||.3,this.mxScale=parseFloat(r)||4,this.stc=c,this.isin=!0===d||"true"===d?1:0,this.fType="jpg"===p?"jpg":"png",this.lck=f,this.isin||!this.letRotate?(this.bW="24%",this.bD="none"):(this.bW="19%",this.bD="flex"),t&&s&&(t=t.toString().indexOf("upx")>=0?parseInt(t)*this.pxRatio:parseInt(t),s=s.toString().indexOf("upx")>=0?parseInt(s)*this.pxRatio:parseInt(s),this.sS.width=t+"px",this.sS.height=s+"px",this.sS.top=(this.wH-s-50|0)/2+"px",this.sS.left=(this.wW-t|0)/2+"px",this.hasSel=!0)}this.rtn=s,this.indx=t,this.fSelect()},fRotate(){this.rotateDeg+=90-this.rotateDeg%90,this.fDrawImage()},fStart(t){let i=t.touches,s=i[0],e=i[1];if(this.touch0=s,this.touch1=e,e){let t=e.x-s.x,i=e.y-s.y;this.fgDistance=Math.sqrt(t*t+i*i)}},fMove(t){let i=t.touches,s=i[0],e=i[1];if(e){let t=e.x-s.x,i=e.y-s.y,h=Math.sqrt(t*t+i*i),a=.005*(h-this.fgDistance),l=this.scaleSize+a;do{if(!this.letScale)break;if(l<this.mnScale)break;if(l>this.mxScale)break;let t=this.useWidth*a/2,i=this.useHeight*a/2;if(this.isin){let s=this.useWidth*l,e=this.useHeight*l;this.posWidth,this.posHeight;let h,a,n=parseInt(this.sS.left),o=parseInt(this.sS.top),r=parseInt(this.sS.width),c=parseInt(this.sS.height),p=n+r,d=o+c;if(s<=r||e<=c)break;this.cx=h=this.focusX*l-this.focusX,this.cy=a=this.focusY*l-this.focusY,this.posWidth-=t,this.posHeight-=i,this.posWidth-h>n&&(this.posWidth=n+h),this.posWidth+s-h<p&&(this.posWidth=p-s+h),this.posHeight-a>o&&(this.posHeight=o+a),this.posHeight+e-a<d&&(this.posHeight=d-e+a)}else this.posWidth-=t,this.posHeight-=i;this.scaleSize=l}while(0);this.fgDistance=h,e.x!==s.x&&this.letRotate&&(t=(this.touch1.y-this.touch0.y)/(this.touch1.x-this.touch0.x),i=(e.y-s.y)/(e.x-s.x),this.rotateDeg+=180*Math.atan((i-t)/(1+t*i))/Math.PI,this.touch0=s,this.touch1=e),this.fDrawImage()}else if(this.touch0){let t=s.x-this.touch0.x,i=s.y-this.touch0.y,e=this.posWidth+t,h=this.posHeight+i;if(this.isin){let s,a,l=this.useWidth*this.scaleSize,n=this.useHeight*this.scaleSize,o=e,r=h,c=o+l,p=r+n,d=parseInt(this.sS.left),f=parseInt(this.sS.top),g=d+parseInt(this.sS.width),u=f+parseInt(this.sS.height);this.cx=s=this.focusX*this.scaleSize-this.focusX,this.cy=a=this.focusY*this.scaleSize-this.focusY,!this.lckWidth&&Math.abs(t)<100&&(d<o-s?this.posWidth=d+s:g>c-s?this.posWidth=g-l+s:(this.posWidth=e,this.focusX-=t)),!this.lckHeight&&Math.abs(i)<100&&(f<r-a?(this.focusY-=f+a-this.posHeight,this.posHeight=f+a):u>p-a?(this.focusY-=u+a-(this.posHeight+n),this.posHeight=u-n+a):(this.posHeight=h,this.focusY-=i))}else Math.abs(t)<100&&!this.lckWidth&&(this.posWidth=e),Math.abs(i)<100&&!this.lckHeight&&(this.posHeight=h),this.focusX-=t,this.focusY-=i;this.touch0=s,this.fDrawImage()}},fEnd(t){let i=t.touches,s=i&&i[0];i&&i[1],s?this.touch0=s:(this.touch0=null,this.touch1=null)},fHideImg(){this.prvImg="",this.pT="-10000px",this.sO=!0,this.prvImgData=null,this.target=null},fClose(){this.sD="none",this.sT="-10000px",this.hasSel=!1,this.fHideImg(),this.noBar||s(),this.$emit("end")},fGetImgData(){return new Promise(((t,i)=>{let s=this.prvX,e=this.prvY,h=this.prvWidth,a=this.prvHeight;d({canvasId:"prv-canvas",x:s,y:e,width:h,height:a,success(i){t(i.data)},fail(t){i(t)}},this)}))},async fColorChange(t){let i=Date.now();if(i-this.prvTm<100)return;if(this.prvTm=i,a({title:"加载中...",mask:!0}),!this.prvImgData){if(!(this.prvImgData=await this.fGetImgData().catch((()=>{r({title:"error_read",duration:2e3})}))))return;this.target=new Uint8ClampedArray(this.prvImgData.length)}let s,e,h,l,n,o,p,d,g,u,m,x,v,w,b,y,S=this.prvImgData,I=this.target,H=t.detail.value;if(0===H)I=S;else{H=(H+100)/200,H<.005&&(H=0),H>.995&&(H=1);for(let t=S.length-1;t>=0;t-=4){if(s=S[t-3]/255,e=S[t-2]/255,h=S[t-1]/255,x=Math.max(s,e,h),m=Math.min(s,e,h),d=x-m,x===m?n=0:x===s&&e>=h?n=(e-h)/d*60:x===s&&e<h?n=(e-h)/d*60+360:x===e?n=(h-s)/d*60+120:x===h&&(n=(s-e)/d*60+240),p=(x+m)/2,0===p||x===m?o=0:0<p&&p<=.5?o=d/(2*p):p>.5&&(o=d/(2-2*p)),S[t]&&(l=S[t]),H<.5?o=o*H/.5:H>.5&&(o=2*o+2*H-o*H/.5-1),0===o)s=e=h=Math.round(255*p);else{p<.5?u=p*(1+o):p>=.5&&(u=p+o-p*o),g=2*p-u,v=n/360,w=v+1/3,b=v,y=v-1/3;let t=t=>t<0?t+1:t>1?t-1:t,i=t=>t<1/6?g+6*(u-g)*t:t>=1/6&&t<.5?u:t>=.5&&t<2/3?g+6*(u-g)*(2/3-t):g;s=w=Math.round(255*i(t(w))),e=b=Math.round(255*i(t(b))),h=y=Math.round(255*i(t(y)))}l&&(I[t]=l),I[t-3]=s,I[t-2]=e,I[t-1]=h}}let W=this.prvX,k=this.prvY,_=this.prvWidth,T=this.prvHeight;f({canvasId:"prv-canvas",x:W,y:k,width:_,height:T,data:I,fail(){r({title:"error_put",duration:2e3})},complete(){c()}},this)},btop(t){return this.base64=t,new Promise((function(i,s){for(var e=t.split(","),h=e[0].match(/:(.*?);/)[1],a=atob(e[1]),l=a.length,n=new Uint8Array(l);l--;)n[l]=a.charCodeAt(l);return i((window.URL||window.webkitURL).createObjectURL(new Blob([n],{type:h})))}))}}},[["render",function(t,i,s,e,h,a){const l=b,n=y,o=S,r=I,c=H;return g(),u(r,null,{default:m((()=>[x(l,{src:h.imgSrc.imgSrc,onClick:a.fSelect,style:{width:"100%"}},null,8,["src","onClick"]),x(n,{"canvas-id":"avatar-canvas",id:"avatar-canvas",class:"my-canvas",style:v({top:h.sT,height:h.csH}),"disable-scroll":"false"},null,8,["style"]),x(n,{"canvas-id":"oper-canvas",id:"oper-canvas",class:"oper-canvas",style:v({top:h.sT,height:h.csH}),"disable-scroll":"false",onTouchstart:a.fStart,onTouchmove:a.fMove,onTouchend:a.fEnd},null,8,["style","onTouchstart","onTouchmove","onTouchend"]),x(n,{"canvas-id":"prv-canvas",id:"prv-canvas",class:"prv-canvas","disable-scroll":"false",onTouchstart:a.fHideImg,style:v({height:h.csH,top:h.pT})},null,8,["onTouchstart","style"]),x(r,{class:"oper-wrapper",style:v({display:h.sD,bottom:0,paddingBottom:a.inlineH+"px",height:50+a.inlineH+"px"})},{default:m((()=>[x(r,{class:"oper"},{default:m((()=>[h.sO?(g(),u(r,{key:0,class:"btn-wrapper"},{default:m((()=>[x(r,{onClick:a.fSelect,"hover-class":"hover",style:v({width:h.bW})},{default:m((()=>[x(o,null,{default:m((()=>[w("重选")])),_:1})])),_:1},8,["onClick","style"]),x(r,{onClick:a.fClose,"hover-class":"hover",style:v({width:h.bW})},{default:m((()=>[x(o,null,{default:m((()=>[w("关闭")])),_:1})])),_:1},8,["onClick","style"]),x(r,{onClick:a.fRotate,"hover-class":"hover",style:v({width:h.bW,display:h.bD})},{default:m((()=>[x(o,null,{default:m((()=>[w("旋转")])),_:1})])),_:1},8,["onClick","style"]),x(r,{onClick:a.fPreview,"hover-class":"hover",style:v({width:h.bW})},{default:m((()=>[x(o,null,{default:m((()=>[w("预览")])),_:1})])),_:1},8,["onClick","style"]),x(r,{onClick:a.fUpload,"hover-class":"hover",style:v({width:h.bW})},{default:m((()=>[x(o,null,{default:m((()=>[w("上传")])),_:1})])),_:1},8,["onClick","style"])])),_:1})):(g(),u(r,{key:1,class:"clr-wrapper"},{default:m((()=>[x(c,{class:"my-slider",onChange:a.fColorChange,"block-size":"25",value:"0",min:"-100",max:"100",activeColor:"red",backgroundColor:"green","block-color":"grey","show-value":""},null,8,["onChange"]),x(r,{onClick:a.fPrvUpload,"hover-class":"hover",style:v({width:h.bW})},{default:m((()=>[x(o,null,{default:m((()=>[w("上传")])),_:1})])),_:1},8,["onClick","style"])])),_:1}))])),_:1})])),_:1},8,["style"])])),_:1})}],["__scopeId","data-v-e539d470"]]),q=W(k);const X=t({components:{avatar:Y},data(){return{loginStore:q,globalConfig:q.globalConfig,userInfo:{},sexList:[{id:"2",name:"未知"},{id:"1",name:"男"},{id:"0",name:"女"}],saved:!1,balance:"0.00",tabs_arr:[{id:1,name:this.$t("fengmian.tab1"),ifshow:!1},{id:2,name:this.$t("fengmian.tab2"),ifshow:!1}],tabs:0,indicatorDots:!0,autoplay:!0,interval:3e3,duration:500,bannerdata:[],indicatorColor:"#292b40",indicatorActiveColor:"#ffffff"}},mounted(){this.get_userInfo(),this.userInfo=JSON.parse(JSON.stringify(q.userInfo)),this.bannerdata=this.userInfo.nearby_arr.split(",")},methods:{del_img(t){this.bannerdata.splice(t,1)},tab_change(t){this.tabs=t},async get_userInfo(){const t=await this.$myRuquest({url:"/api/front/user/getUserInfo",method:"POST"});200==t.code&&(this.balance=t.data.balance)},logout(){let t=_("client_id");this.$api.LoginApi.logout({client_id:t}).then((t=>{0==t.code&&q.logout()}))},textareaBInput(t){this.userInfo.motto=t.detail.value},changeSex(t){this.userInfo.sex=parseInt(t.detail.value)},saveInfo(){this.saved=!0;let t={nearby_arr:this.bannerdata.toString()};this.$api.msgApi.updateUserInfo_imgarr(t).then((t=>{if(0==t.code){r({title:this.$t("fengmian.sucess"),icon:"none"}),this.userInfo.nearby_arr=JSON.stringify(this.bannerdata);let t=JSON.parse(JSON.stringify(this.userInfo));q.login(t)}})),setTimeout((()=>{this.saved=!1}),8e3)},setAvatar(){T({url:"/pages/mine/avatar"})},uploadAvatar(t){a({title:this.$t("fengmian.upload")}),D({url:this.$api.msgApi.uploadAvatar_fengmian,filePath:t.path,name:"file",header:{Authorization:_("authToken")},formData:{ext:"png"},success:t=>{c();let i=JSON.parse(t.data);if(0==i.code){r({title:i.msg,icon:"none"}),this.userInfo.nearby_img=i.data;let t=JSON.parse(JSON.stringify(this.userInfo));q.login(t)}},fail:t=>{c()}})},uploadAvatar_detail(t){a({title:this.$t("fengmian.upload")}),D({url:this.$api.msgApi.uploadAvatar_detail,filePath:t.path,name:"file",header:{Authorization:_("authToken")},formData:{ext:"png"},success:t=>{c();let i=JSON.parse(t.data);0==i.code&&this.bannerdata.push(i.data)},fail:t=>{c()}})}}},[["render",function(t,i,s,e,h,a){const l=A("cu-custom"),n=I,o=A("avatar"),r=b,c=U,p=$;return g(),u(n,null,{default:m((()=>[x(l,{bgColor:"bg-gradual-pink",isBack:!0},{backText:m((()=>[])),content:m((()=>[w(R(t.$t("fengmian.title")),1)])),_:1}),x(p,null,{default:m((()=>[x(n,{class:"tab_mline"},{default:m((()=>[(g(!0),C(P,null,O(h.tabs_arr,((t,i)=>(g(),u(n,{class:M(["tab_mline_zi",{tab_hover:h.tabs==i}]),key:i,onClick:t=>a.tab_change(i)},{default:m((()=>[w(R(t.name),1)])),_:2},1032,["onClick","class"])))),128))])),_:1}),0==h.tabs?(g(),u(n,{key:0,style:{position:"relative",width:"100%",height:"80vh"}},{default:m((()=>[null!==h.userInfo.nearby_img?(g(),u(n,{key:0,class:"fengmian_are",style:v([{backgroundImage:"url("+h.userInfo.nearby_img+")"}])},null,8,["style"])):z("",!0),x(n,{style:{position:"absolute",top:"31%","font-size":"50px","text-align":"center",left:"41%",height:"100px",width:"100px"}},{default:m((()=>[x(n,{class:"cuIcon-camera",style:{"margin-bottom":"-60px",color:"#ec008c"}}),x(o,{selWidth:"300px",selHeight:"640px",onUpload:a.uploadAvatar,avatarStyle:"width:480px; height:1200px",mode:"circle"},null,8,["onUpload"])])),_:1})])),_:1})):(g(),u(n,{key:1,class:"fengmian_are"},{default:m((()=>[(g(!0),C(P,null,O(h.bannerdata,((i,s)=>(g(),u(n,{style:{width:"100%",margin:"10px 0"},key:s},{default:m((()=>[x(n,{style:{padding:"10px",border:"1px solid #cccc","border-radius":"6px",display:"flex","justify-content":"space-between"}},{default:m((()=>[x(n,{style:{height:"80px",width:"80px"}},{default:m((()=>[x(r,{src:i,style:{width:"100%","max-height":"80px"},mode:"widthFix"},null,8,["src"])])),_:2},1024),x(n,{style:{"line-height":"80px",color:"#ec008c"},onClick:t=>a.del_img(s)},{default:m((()=>[w(R(t.$t("fengmian.del")),1)])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024)))),128)),x(n,{class:"padding flex flex-direction"},{default:m((()=>[x(n,{style:{height:"88px",overflow:"hidden",width:"90%",margin:"auto",position:"relative"}},{default:m((()=>[x(n,{style:{position:"absolute",left:"0",top:"0",height:"50px",width:"100%","z-index":"10"}},{default:m((()=>[x(o,{selWidth:"350px",selHeight:"380px",onUpload:a.uploadAvatar_detail,avatarStyle:"width:480px; height:450px",mode:"circle"},null,8,["onUpload"])])),_:1}),x(n,{class:"cu-btn bg-green lg",style:{width:"100%"}},{default:m((()=>[w(R(t.$t("fengmian.sel_img")),1)])),_:1})])),_:1}),x(c,{class:"cu-btn bg-pink lg",style:v(h.saved?"border: solid 1px #dbdada;":""),disabled:h.saved,onClick:i[0]||(i[0]=t=>a.saveInfo())},{default:m((()=>[w(R(t.$t("fengmian.save")),1)])),_:1},8,["style","disabled"])])),_:1})])),_:1}))])),_:1})])),_:1})}],["__scopeId","data-v-7ab1629e"]]);export{X as default};