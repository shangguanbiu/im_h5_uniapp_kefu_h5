// 统一请求路径前缀在libs/axios.js中修改
import {
	postJsonRequest,
	apiUrl
} from '@/utils/request.js';
let third_openApi = {}


/**
 * @desc 第三方列表
 * @param {*} 参数 
 */
third_openApi.thirdList = (params) => {
	return postJsonRequest('/enterprise/third/index', params)
}
/**
 * @desc 附近的人列表
 * @param {*} 参数 
 */
third_openApi.near_user_List = (params) => {
	return postJsonRequest('/enterprise/third/nearby_index', params)
}
/**
 * @desc 喜欢我的TA列表
 * @param {*} 参数 
 */
third_openApi.like_me_index = (params) => {
	return postJsonRequest('/enterprise/third/like_me_index', params)
}

/**
 * @desc 添加打招呼列表
 * @param {*} 参数 
 */
third_openApi.add_talk = (params) => {
	return postJsonRequest('/enterprise/third/add_talk', params)
}
/**
 * @desc 商品列表
 * @param {*} 参数 
 */
third_openApi.shop_list = (params) => {
	return postJsonRequest('/enterprise/third/shop_list', params)
}

/**
 * @desc 公开的群列表
 * @param {*} 参数 
 */
third_openApi.opengroup_List = (params) => {
	return postJsonRequest('/enterprise/third/open_group_list', params)
}
third_openApi.near_user_like = (params) => {
	return postJsonRequest('/enterprise/third/islikes', params)
}
/**
 * @desc 加入公开的群列表
 * @param {*} 参数 
 */
third_openApi.into_group = (params) => {
	return postJsonRequest('/enterprise/group/joinGroup', params)
}
/**
 * @desc 等级列表
 * @param {*} 参数 
 */
third_openApi.get_level_list = (params) => {
	return postJsonRequest('/enterprise/third/Level_list', params)
}

/**
 * @desc 获取用户信息
 * @param {*} 参数 
 */
third_openApi.get_user_info = (params) => {
	return postJsonRequest('/enterprise/third/user_info', params)
}

export default third_openApi;
