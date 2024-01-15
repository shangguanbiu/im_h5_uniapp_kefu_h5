
// const BASE_URL2 = 'https://test.net:9005'

const BASE_URL = 'https://im.baobaoi.vip'



// BASE_URL = 'https://'+window.location.host
export const baseurl=()=>{
	return BASE_URL
}
export const imgurl=()=>{
	return 'https://imweb.baobaoi.vip'
}
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		if (options.type == undefined) {
			let token = uni.getStorageSync('ifLogin')
			let sid = uni.getStorageSync('sid')

			uni.request({
				url: BASE_URL + options.url,
				method: options.method || 'GET',
				data: options.data || {},
				header: options.header || {
					"XX-Api-Version": 1,
					"XX-Device-Type":'mobile',
					"XX-Token":token,
					'content-type': 'application/json'
					
				},
				success: (res) => {
					if (res.data.code == 9999) {
						//  uni.showToast({
						// 	title: '登录已失效请重新登录'
						// })
						
						// setTimeout(function() {
						// 	uni.navigateTo({
						// 		url: '/pages/login/index',
						// 	})
						// }, 1500)
						return
					}
					resolve(res.data)
				},
				fail: (err) => {
					// uni.showToast({
					// 	title: BASE_URL
					// })
					uni.showToast({
						title: 'Error'
					})
					
					reject(err)
				}
			})
		} else {
			uni.request({
				url: BASE_URL2 + options.url,
				method: options.method || 'GET',
				data: options.data || {},
				success: (res) => {
					if (res.data.code !== 200) {
						return uni.showToast({
							title: 'Error'
						})
					}
					resolve(res.data)
				},
				fail: (err) => {
					uni.showToast({
						title: 'Error'
					})
					reject(err)
				}
			})
		}
	})
}
