<template>
	<view>
		<view class="mainare">
			<view class="msgheadare">
				<view class="titel">{{data_content.title}}</view>
				<view class="times">{{data_content.create_time}}</view>
			</view>
			<view class="msg"> 
				
				<u-parse :content="data_content.content"  noData="暫無內容"></u-parse>
				
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		data() {
			return {
				data_content:{}
			}
		},
		components:{
			uParse
		},
		methods: {
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
					this.data_content=res.data
						 
				}
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
	@import url('../../../components/u-parse/u-parse.css');
	
	.titel {
		font-size: 16px;
		font-weight: bold;
	}

	.times {
		font-size: 13px;
		line-height: 35px;
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
