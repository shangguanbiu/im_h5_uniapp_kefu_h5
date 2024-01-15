<template>
  <view class="">
    <web-view :src="html"></web-view>
  </view>
</template>

<script>
export default {
		data() {
			return {
				html: '',
			}
		},
		onLoad: function (option) {
			this.html=option.src
		},
	}
</script>

<style>

</style>
