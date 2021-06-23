<template>
	<view class="box">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '/static/googleMap.html?'
			}
		},
		onLoad(options) {
			var data = JSON.parse(options.data)
			this.url += "log=" + data.longitude + "&lat=" + data.latitude
		},
		onReady() {
			// #ifdef APP-PLUS
			var currentWebview = this.$scope
				.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
			// #endif
		},
		methods: {

		}
	}
</script>

<style>

</style>
