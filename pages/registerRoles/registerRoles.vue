<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-nav-back" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #333;font-size: 36rpx;"></text>
				</view>
				<view class="box-head-nav-text" @click="login">登录</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-title">
				请选择角色
			</view>
			<view class="box-content-list">
				<view class="box-content-list-li" @click="roles('business')">
					<view class="box-content-list-li-icon flex-center">
						<image src="../../static/images/userImage.png" mode="aspectFill"></image>
					</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-title">我是商家</view>
						<view class="box-content-list-li-info-text">按摩SPA、美容、美甲、医美、健身、瑜伽、养生</view>
					</view>
					<view class="box-content-list-li-more">
						<text class="iconfont icongengduo" style="color: #5DBDFE;font-size: 40rpx;"></text>
					</view>
				</view>
				<view class="box-content-list-li" @click="roles('technician')">
					<view class="box-content-list-li-icon flex-center">
						<image src="../../static/images/userImage.png" mode="aspectFill"></image>
					</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-title">我是技师</view>
						<view class="box-content-list-li-info-text">按摩师、美容师、美甲师、健身教练、瑜伽老师</view>
					</view>
					<view class="box-content-list-li-more">
						<text class="iconfont icongengduo" style="color: #26BF82;font-size: 40rpx;"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				isRole: false, //用于判断注册角色
			};
		},
		components: {

		},
		watch: {

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
			// 点击跳转登录页面
			login() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			//返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},
			roles(type) {
				switch (type) {
					// 商家
					case "business":
						uni.navigateTo({
							url: "../../pagesIndexTwo/merchantRegistration/merchantRegistration"
						})
						break;
						// 技师
					case "technician":
						uni.navigateTo({
							url: "../../pagesIndexTwo/technicianRegistration/technicianRegistration"
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

		.box-head {
			background-color: #fff;

			.box-head-nav {
				padding: 0 40rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 88rpx;

				.box-head-nav-back {}

				.box-head-nav-text {
					color: #333;
					font-size: 34rpx;
				}
			}

		}

		.box-content {
			padding: 0 40rpx;
			box-sizing: border-box;
			flex: 1;

			.box-content-title {
				margin-top: 60rpx;
				font-size: 52rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #1B1B1B;
				text-align: center;
			}

			.box-content-list {
				margin-top: 120rpx;

				.box-content-list-li {
					padding: 40rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					border-radius: 10rpx;

					.box-content-list-li-icon {
						width: 130rpx;
						height: 130rpx;
						border-radius: 50%;

						image {
							width: 130rpx;
							height: 130rpx;
						}
					}

					.box-content-list-li-info {
						display: flex;
						justify-content: space-between;
						flex-direction: column;
						flex: 1;
						margin: 0 20rpx;

						.box-content-list-li-info-title {
							font-size: 32rpx;
							color: #000;
						}

						.box-content-list-li-info-text {
							font-size: 24rpx;
							color: #B3B3B3;
						}
					}

					.box-content-list-li-more {}

				}

				.box-content-list-li:nth-child(1) {
					border: 2rpx solid #5DBDFE;
				}

				.box-content-list-li:nth-child(2) {
					margin-top: 40rpx;
					border: 2rpx solid #26BF82;
				}
			}
		}

		.box-footer {}
	}
</style>
