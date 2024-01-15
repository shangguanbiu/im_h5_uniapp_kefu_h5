// 引入其他模块的接口

import msgApi from '@/api/message.js';  //  消息
import LoginApi from '@/api/login.js';  //登录相关
import friendApi from '@/api/friend.js';  //登录相关
import third_openApi from '@/api/third_open.js';  //第三方相关
import moviceApi from '@/api/movice.js';  //第三方相关
// 导出接口
export default {
	msgApi,
	LoginApi,
	friendApi,
	third_openApi,moviceApi
}
