<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title navTitle="技师注册"></nav-title>
		</view>
		<view class="box-content">

		</view>
		<view class="box-footer">

		</view>
	</view>
</template>

<script>
	import navTitle from "../../components/nav-title/nav-title.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
			};
		},
		components: {
			navTitle
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

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #F7F7F7;

		.box-head {
			background-color: #fff;
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;
		}

		.box-footer {}
	}
</style>
