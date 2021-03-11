<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-top">

			</view>
		</view>
		<view class="box-content">

		</view>
		<view class="box-footer">
			<technician-tbar  @tabbarClick="tabbarClick" :activeIndex="activeIndex"></technician-tbar>
		</view>
	</view>
</template>

<script>
	import technicianTbar from "../../components/technician-tabbar/technician-tabar.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				activeIndex: 1, //当前tabbar所在页面
			};
		},
		components: {
			technicianTbar
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
		// tabbar点击
		tabbarClick(index) {
			console.log("order:"+index)
			switch (index) {
				case 0: //首页
					uni.redirectTo({
						url: "../../pages/technicianHome/technicianHome"
					})
					break;
				case 1: //订单
					uni.redirectTo({
						url: "../../pages/technicianOrder/technicianOrder"
					})
					break;
				case 2: //我的
					uni.redirectTo({
						url: "../../pages/technicianMine/technicianMine"
					})
					break;
			}
			
		},
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
