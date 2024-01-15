# Raingad-IM for uniapp

技术栈：`vue3` + `pinia` + `color-UI`

#### 目录结构
```
Raingad
├─api                   接口目录
│  ├─index.js           总的接口文件
│  └─message.js         消息接口
│
├─common                公共目录
│  ├─socket.js          websocket配置
│  └─config.js          服务器地址配置
│ 
│─components            符合vue组件规范的uni-app组件目录
│  └─comp-a.vue         可复用的a组件
│
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  ├─message
│  │   └─index.vue      消息列表页面
│  ├─ ...               更多目录
│  └─contact
│     └─index.vue       联系人列表页面
│
├─static                存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
│
├─uni_modules           存放[uni_module](/uni_modules)。
│
├─hybrid                App端存放本地html文件的目录，详见
│
├─nativeplugins              远程插件目录
│
├─unpackage             非工程代码，一般存放运行或发行的编译结果
│
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
├─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
└─uni.scss              这里是uni-app内置的常用样式变量
```

#### 安装
1. 下载最新的Hbuilder编辑器，将项目文件导入到编辑器中。
2. 点击编辑器中的运行，选择需要运行的终端即可，系统会提示您需要安装的依赖或者插件。
3. 如果运行成功后有报错，请打开终端执行 `npm install` 安装一下依赖。

#### 开发
1. 域名配置文件在 `/common/config.js` 中，直接替换为自己的域名即可，如果自己的域名没有证书，请把https协议头修改为 `http`，wss协议头修改为 `ws`。
2. 开发过程中涉及到录音、摄像头等敏感权限需要开启HTTPS才能正常使用。

#### 发布
1. 请按照官方的打包教程来即可。打包后将整个H5目录放到后端的public文件夹下面即可。
2. 访问：域名+`/h5`;

#### 原生组件
本程序使用了原生组件【APP文件选择】，请自行在manifest.json文件中“APP原生插件配置”里面加载原生插件，并使用传统打包制作自定义基座，然后才能正常打包。
原生组件由插件市场提供：[APP文件选择(支持安卓13和苹果)](https://ext.dcloud.net.cn/plugin?id=14059)

#### 开启消息推送
修改 `uniCloud/cloudfunctions/push/index.js` 文件，将appid设置为自己的appid，然后在uniCloud关联自己的服务空间，并上传，其他的内容请参考unipush的官方文档。