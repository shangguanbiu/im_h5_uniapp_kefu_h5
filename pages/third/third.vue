<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>影院</template>
		</cu-custom>
		<view>
			
			<web-view ref="webview" @message="getMessage" :update-title="true"
				:src="web_url"></web-view>
		</view>
		

	</view>
</template>

<script>
	export default {
		name: "third",
		data() {
			return {
				web_url: '',

			}
		},
		methods: {
			getMessage(e) {
				console.log("@message 接收成功1")
				// uni.switchTab({
				// 	url: '/pages/index/index'
				// });
				if(e.detail.data[0].action='message'){
					uni.reLaunch({
						url:'/pages/index/index'
					})
				}
			},
			getPostMessage(e) {
				console.log("@onPostMessage 接收成功2")
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
		},
		mounted() {
			top.addEventListener('message', (e) => {
				console.log('获得传参：', e.data)
			}, false)
			// #ifdef H5
			// A项目运行在H5时，如果不加这句代码，真机运行的时候，就无法监听到message事件
			window.addEventListener("message", this.getMessage, false)
			// #endif
			var backbutton = document.getElementsByClassName('uni-page-head-hd')[0]
			if(backbutton) backbutton.style.display = 'none';

		},
		onLoad(option) {

			this.web_url = option.url + '?uid=' + option.uid

		}
	}
</script>

<style>

</style>
