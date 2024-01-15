<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('server.title')}}</template>
		</cu-custom>
		<view class="main">
			<view @click="to_kefu(1)" class="kf_item">
				<view class="kf_itemico">
					<image src="@/static/image/online_i1.png" style="width:100%; " mode='widthFix' />
					<view style="position: absolute; left: 0; bottom: 64px; width: 100%;">
						<view style="text-align: center; color: #fff; font-size: 18px;">{{$t('server.meiqia')}}</view>
					</view>
				</view>

			</view>
			<view @click="to_kefu(2)" class="kf_item">
				<view class="kf_itemico">
					<image src="@/static/image/online_i2.png" style="width:100%; " mode='widthFix' />
					<view style="position: absolute; left: 0; bottom: 64px; width: 100%;">
						<view style="text-align: center; color: #fff; font-size: 18px;">{{$t('server.whatapp')}}</view>
					</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		methods: {
			async get_kefu_url() {
				const res = await this.$myRuquest({
					url: '/api/front/index/getKefuUrl',

					method: "POST",
					data: {
						page: 1
					},
				})
				if (res.code == 200) {
					this.url = res.data
					
				}
			},
			to_kefu(type) {
				if (type == 1) {
					uni.navigateTo({
						url: '/pages/movie/kefu/detail',
					})
				} else {
					window.location.href = this.url.other_val

				}

			},
			copyCode(data) {
				let url = data;
				let oInput = document.createElement("input");
				oInput.value = url;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;

				document.execCommand("Copy"); // 执行浏览器复制命令

				Toast.success("已複製賬號");
				oInput.remove();
			},
		},
		onLoad() {
				this.get_kefu_url()
		},
		onShow() {
			
		}
	}
</script>

<style scoped>
	.main {
		width: 100%;
		height: calc(100vh - 45px);
		display: flex;
		color: #fff;
		padding-top: 10px;
	}

	.kf_item {
		width: 50%;
		display: block;

		text-align: center;
		;

	}

	.kf_itemico {
		padding: 5px 10px;position: relative;
	}

	page {
		background: #190D30;
	}
</style>