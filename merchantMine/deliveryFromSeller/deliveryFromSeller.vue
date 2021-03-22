<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-nav-back" @click="Gback">
					<text class="iconfont iconfanhui icon-font"
						style="color: #fff;font-size: 36rpx;margin-top: 4rpx;"></text>
				</view>
				<view class="box-head-nav-title">卖家已发货</view>
				<view class="box-head-nav-ico">
					<text class="iconfont iconkefu icon-font" style="color: #fff;font-size: 52rpx"></text>
				</view>
			</view>
			<view class="box-head-main">
				<view class="box-head-main-ico">
					<text class="iconfont iconwuliuqiache icon-font" style="color: #fff;font-size: 52rpx"></text>
				</view>
				<view class="box-head-main-text">
					<view class="box-head-main-text-title">[广州市]广州市 等待空运装机 下一站厦门</view>
					<view class="box-head-main-text-time">2021-01-15 14:00:00</view>
				</view>
				<view class="box-head-main-more">
					<text class="iconfont icongengduo icon-font"
						style="color: #fff;font-size: 32rpx;margin-top: 4rpx;"></text>
				</view>
			</view>

		</view>
		<view class="box-content">
			<view class="box-content-main-address">
				<view class="box-content-main-address-top">
					<text class="name">王二麻子</text>
					<text class="phone">+86 15854251145</text>
				</view>
				<view class="box-content-main-address-center">中国 福建省 厦门市 集美区 银江路137号121212</view>
				<view class="box-content-main-address-bottom">363000</view>
			</view>

			<view class="box-content-wrap">
				<view class="box-content-wrap-title">
					<text class="iconfont iconshangjia icon-font"
						style="color: #5DBDFE;font-size: 28rpx;margin-top: 4rpx;"></text>
					<text>罗约蓝池·温泉SPA</text>
				</view>
				<view class="box-content-wrap-list">
					<view class="box-content-wrap-list-li" v-for="(item,index) in 3" :key="index">
						<view class="box-content-wrap-list-li-image">
							<image src="../../static/images/1.png" mode="aspectFill"></image>
						</view>
						<view class="box-content-wrap-list-li-info">
							<view class="box-content-wrap-list-li-info-top">
								<text>淡雅茉莉香薰蜡烛</text>
								<text>￥40.00</text>
							</view>
							<view class="box-content-wrap-list-li-info-text">
								<text>规格：500g</text>
								<text>x50</text>
							</view>
							<view class="box-content-wrap-list-li-info-btn">
								<view class="info-btn flex-center">申请退款</view>
							</view>
						</view>
					</view>
				</view>
				<view class="box-content-wrap-text">
					<text>商品总价</text>
					<text>￥3290.00</text>
				</view>
				<view class="box-content-wrap-footer">
					<view class="box-content-wrap-footer-text">
						实付款：
					</view>
					<view class="box-content-wrap-footer-price">
						￥<text>3290.00</text>
					</view>
				</view>
			</view>


			<view class="box-content-order-info-main">
				<view class="box-content-order-info-main-title">订单信息</view>
				<view class="box-content-order-info-main-item">
					<view class="box-content-order-info-main-item-title">订单编号：</view>
					<view class="box-content-order-info-main-item-text">
						<text>400199110070101</text>
						<text style="color: #5DBDFE;">复制</text>
					</view>
				</view>
				<view class="box-content-order-info-main-item">
					<view class="box-content-order-info-main-item-title">支付方式：</view>
					<view class="box-content-order-info-main-item-text">
						<text>余额支付</text>
					</view>
				</view>
				<view class="box-content-order-info-main-item">
					<view class="box-content-order-info-main-item-title">下单时间：</view>
					<view class="box-content-order-info-main-item-text">
						<text>2021-01-13 10:35:11</text>
					</view>
				</view>

			</view>
		</view>
		<view class="box-footer">
			<view class="box-footer-btn gray flex-center" @click="viewLogistics">查看物流</view>
			<view class="box-footer-btn blue flex-center">确认收货</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				dataList: [{
						text: '[广州市]广州市 等待空运装机 下一站厦门',
						time: '2021-01-15 14:00:00',
						currentLocation: true,
					},
					{
						text: '[[广州市]杨江县 集散中心已入库 下一站广州',
						time: '2021-01-15 14:00:00',
						currentLocation: false,
					},
					{
						text: '[广州市]杨江县 快递员已揽件',
						time: '2021-01-15 14:00:00',
						currentLocation: false,
					},
					{
						text: '包裹正在等待揽收',
						time: '2021-01-15 14:00:00',
						currentLocation: false,
					},
				]
			};
		},
		components: {

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
			//返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 查看物流
			viewLogistics() {
				uni.navigateTo({
					url: "../logisticsDetails/logisticsDetails"
				})
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
			background-color: #5DBDFE;

			.box-head-nav {
				display: flex;
				align-items: center;
				height: 88rpx;
				padding: 0 20rpx;
				box-sizing: border-box;

				.box-head-nav-back {
					width: 50rpx;
					display: flex;
					align-items: center;
				}

				.box-head-nav-title {
					flex: 1;
					color: #fff;
					font-size: 34rpx;
					font-weight: 500;
					text-align: center;
				}

				.box-head-nav-ico {
					padding-right: 10rpx;
					width: 50rpx;
					display: flex;
				}
			}

			.box-head-main {
				display: flex;
				align-items: center;
				padding: 20rpx 40rpx;
				box-sizing: border-box;
				color: #fff;

				.box-head-main-ico {}

				.box-head-main-text {
					margin: 0 20rpx;
					flex: 1;

					.box-head-main-text-title {
						font-size: 28rpx;
					}

					.box-head-main-text-time {
						font-size: 24rpx;
					}
				}

				.box-head-main-more {}
			}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;
			margin-bottom: 20rpx;

			.box-content-main-address {
				margin-top: 20rpx;
				padding: 40rpx 40rpx 30rpx;
				box-sizing: border-box;
				background: url(../../static/images/wave-ico.png) #fff no-repeat;
				background-size: contain;
				font-size: 28rpx;
				color: #000;

				.box-content-main-address-top {
					.name {}

					.phone {
						margin-left: 20rpx;
					}
				}

				.box-content-main-address-center {
					margin: 10rpx 0;
				}

				.box-content-main-address-bottom {}
			}


			.box-content-wrap {
				margin-top: 20rpx;
				padding: 30rpx 40rpx 0;
				box-sizing: border-box;
				background: #fff;

				.box-content-wrap-title {
					display: flex;
					align-items: center;

					font-size: 28rpx;
					color: #000;

					text {
						margin-right: 10rpx;
					}
				}

				.box-content-wrap-list {
					margin-top: 30rpx;
					background: #fff;

					.box-content-wrap-list-li {
						display: flex;
						margin-bottom: 30rpx;

						.box-content-wrap-list-li-image {
							display: flex;
							align-items: center;
							height: 132rpx;

							image {
								width: 132rpx;
								height: 132rpx;
							}
						}

						.box-content-wrap-list-li-info {
							// height: 132rpx;
							margin-left: 20rpx;
							flex: 1;

							.box-content-wrap-list-li-info-top {
								display: flex;
								align-items: center;
								justify-content: space-between;
								line-height: 30rpx;

								text:nth-child(1) {
									font-size: 30rpx;
								}

								text:nth-child(2) {
									font-size: 28rpx;
								}
							}

							.box-content-wrap-list-li-info-text {
								margin-top: 10rpx;
								display: flex;
								align-items: center;
								justify-content: space-between;

								text:nth-child(1) {
									font-size: 24rpx;
									color: #666;
								}

								text:nth-child(2) {
									font-size: 28rpx;
									color: #999;
								}
							}

							.box-content-wrap-list-li-info-btn {
								display: flex;
								justify-content: flex-end;
								margin-top: 54rpx;

								.info-btn {
									width: 158rpx;
									height: 54rpx;
									border: 1rpx solid #666666;
									border-radius: 30rpx;
									color: #666;
									font-size: 24rpx;
								}
							}


						}

					}
				}

				.box-content-wrap-text {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #ededed;
					font-size: 28rpx;
				}

				.box-content-wrap-footer {
					padding: 20rpx 0;
					display: flex;
					align-items: baseline;
					justify-content: flex-end;

					.box-content-wrap-footer-text {
						font-size: 24rpx;
						color: #999;
					}

					.box-content-wrap-footer-price {
						display: flex;
						align-items: baseline;
						font-size: 24rpx;
						font-weight: 500;
						color: #FF4D4D;

						text {
							font-size: 32rpx;
						}
					}
				}
			}


			.box-content-order-info-main {
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
				background: #fff;

				.box-content-order-info-main-title {
					margin-bottom: 30rpx;
					font-size: 32rpx;
					font-weight: 500;
					line-height: 32rpx;
					color: #000;
				}

				.box-content-order-info-main-item:last-child {
					margin-bottom: 0;
				}

				.box-content-order-info-main-item {
					display: flex;
					align-items: center;
					margin-bottom: 10rpx;
					font-size: 26rpx;

					.box-content-order-info-main-item-title {
						color: #999;
					}

					.box-content-order-info-main-item-text {
						flex: 1;
						color: #000;
						display: flex;
						justify-content: space-between;

						text {
							display: block;
						}
					}
				}
			}
		}

		.box-footer {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 0 20rpx;
			height: 108rpx;
			box-sizing: border-box;
			background: #fff;

			.box-footer-btn {
				width: 218rpx;
				height: 78rpx;
				border-radius: 40rpx;
				font-size: 32rpx;
			}

			.gray {
				margin-right: 20rpx;
				border: 1rpx solid #666666;
				color: #666;
			}

			.blue {
				border: 1rpx solid #5DBDFE;
				color: #5DBDFE;
			}
		}
	}
</style>
