<template>
	<view style="background-color: #190D30;">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<template #backText></template>
			<template #content>{{$t('notice_list.title')}}</template>
		</cu-custom>
		<view class="mainare">
			<view class="msgheadare">
				<view class="titel">{{data_content.title}}</view>
				<!-- <view class="times">{{data_content.create_time}}</view> -->
			</view>
			<view class="msg" v-show="data_content.content !==undefined">

				<mp-html :content="data_content.content" />

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data_content: {},
				dd: '<p>dadasdsadas</p>'
			}
		},
		components: {

		},
		methods: {
			unescape: function(html) {
				return html
					.replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
					.replace(/&lt;/g, "<")
					.replace(/&gt;/g, ">")
					.replace(/&quot;/g, "\"")
					.replace(/&#39;/g, "\'");
			},
			async get_detail(row_id) {
				var _this = this
				
				const res = await this.$myRuquest({
					url: '/api/front/notice/getInfo',
					method: "POST",
					data: {
						id: row_id
					},

				})
				if (res.code == 200) {
					this.data_content = res.data
					this.data_content.content = this.unescape(this.data_content.content)
				}
			},
			// 自动解析消息中的表情
			emojiToHtml(str) {
				if (!str) {
					return;
				}
				let emojiMap = this.emojiMap;
				return str.replace(/\[!(\w+)\]/gi, function(str, match) {
					var file = match;
					return emojiMap[file] ? "<img class='mr-5' style=\"width:18px;height:18px\" emoji-name=\""
						.concat(match, "\" src=\"").concat(emojiMap[file], "\" />") : "[!".concat(match, "]");
				});
			},
		},
		onLoad(optin) {
			this.get_detail(optin.id)


		},
		onShow() {

		}
	}
</script>

<style scoped>
	page {
		background-color: #190D30;
	}

	.titel {
		font-size: 16px;
		font-weight: bold;
		color: #fff;
	}

	.times {
		font-size: 13px;
		line-height: 35px;
		color: #fff;
	}

	.msg {
		font-size: 13px;
		line-height: 25px;
		padding: 15px;

		background: #fff;
	}

	.msgheadare {
		padding: 15px;
	}
</style>