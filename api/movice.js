// 统一请求路径前缀在libs/axios.js中修改
import {
	postJsonRequest,postJsonRequest_movice,
	apiUrl
} from '@/utils/request.js';
let moviceApi = {}


/**
 * @desc 第三方列表
 * @param {*} 参数 
 */
moviceApi.get_notice = (params) => {
	return postJsonRequest_movice('/api/front/notice/getList', params)
}



export default moviceApi;
