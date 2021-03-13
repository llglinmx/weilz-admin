<template>
	<view  :style="{paddingTop:barHeight+'px'}">
		<system-message />
	</view>
</template>

<script>
	import systemMessage from "../../components/system-message/system-message.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
			}
		},
		components:{
			systemMessage,
		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
