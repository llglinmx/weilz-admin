<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="门店二维码" />
		</view>
		<view class="box-content">
			<view class="box-content-wrap"></view>
			<view class="box-content-main">
				<view class="box-content-main-image">
					<image src="../../static/images/qrcode.png" mode="aspectFill"></image>
				</view>
				<view class="box-content-main-text">扫一扫加入我们</view>
				<view class="box-content-main-btn flex-center">保存二维码</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navTitleWhite from "../../components/nav-title-white/nav-title-white.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
			};
		},
		components: {
			navTitleWhite
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
			background-color: #5DBDFE;
		}

		.box-content {
			position: relative;
			flex: 1;
			overflow-y: scroll;

			.box-content-wrap {
				height: 200rpx;
				background: #5DBDFE;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
			}

			.box-content-main {
				display: flex;
				flex-direction: column;
				align-items: center;
				position: absolute;
				left: 0;
				right: 0;
				top: 40rpx;
				margin: auto;
				width: 630rpx;
				height: 792rpx;
				padding: 100rpx 115rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				border-radius: 30rpx;

				.box-content-main-image {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 400rpx;
					height: 400rpx;
					border: 1rpx dashed #333;

					image {
						width: 380rpx;
						height: 380rpx;
					}
				}

				.box-content-main-text {
					margin-top: 20rpx;
					font-size: 32rpx;
					color: #000;
				}

				.box-content-main-btn {
					width: 316rpx;
					height: 80rpx;
					margin-top: 60rpx;
					border: 1rpx solid #707070;
					border-radius: 39rpx;
					font-size: 28rpx;
					color: #000;
				}

			}
		}

	}
</style>
