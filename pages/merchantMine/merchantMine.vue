<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">

		</view>
		<view class="box-content">
55555
		</view>
		<view class="box-footer">
			<merchant-tabbar @tabbarClick="tabbarClick" :activeIndex="activeIndex"></merchant-tabbar>
		</view>
	</view>
</template>

<script>
	import merchantTabbar from "../../components/merchant-tabbar/merchant-tabbar.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				activeIndex: 4, //当前tabbar所在页面
			};
		},
		components: {
			merchantTabbar
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
				this.activeIndex = index
				switch (index) {
					case 0: //首页
						uni.navigateTo({
							url:"../merchantHome/merchantHome"
						})
						break;
					case 1: //订单
						uni.redirectTo({
							url: "../merchantOrder/merchantOrder"
						})
						break;
					case 2: //门店
						uni.redirectTo({
							url: "../merchantStore/merchantStore"
						})
						break;
					case 3: //商城
						uni.redirectTo({
							url: "../merchantMall/merchantMall"
						})
						break;
					case 4: //我的
						
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
