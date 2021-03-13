<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="待核销"></nav-title-white>
		</view>
		<view class="box-content">
			<view class="box-content-appointment-time">
				<view class="box-content-appointment-time-info">
					<view class="appointment-time-info-title">预约时间</view>
					<view class="appointment-time-info-text">2021年1月4日 17:00-18:00</view>
				</view>
				<view class="box-content-appointment-time-info-btn flex-center">提醒顾客</view>
			</view>

			<view class="box-content-order-info">
				<view class="box-content-order-info-title">订单信息</view>
				<view class="box-content-order-list-li-wrap">
					<view class="order-list-li-wrap-item" v-for="(i,j) in 3">
						<view class="order-list-li-wrap-item-image">
							<image src="../../static/images/001.png" mode="aspectFill"></image>
						</view>
						<view class="order-list-li-wrap-item-info">
							<view class="order-list-li-wrap-item-info-top">
								<view class="wrap-item-info-top-text">泰式古法按摩</view>
								<view class="wrap-item-info-top-msg">￥298.00</view>
							</view>
							<view class="order-list-li-wrap-item-info-box">
								<view class="order-list-li-wrap-item-info-box-list">
									<view class="order-list-li-wrap-item-info-box-list-li" v-for="(s,k) in 2">泰式按摩</view>
								</view>
								<view class="order-list-li-wrap-item-info-box-number">x1</view>
							</view>
						</view>
					</view>
				</view>
				<view class="box-content-order-info-main">
					<view class="box-content-order-info-main-item">
						<view class="box-content-order-info-main-item-title">订单编号：</view>
						<view class="box-content-order-info-main-item-text">
							<text>400199110070101</text>
							<text style="color: #5DBDFE;">复制</text>
						</view>
					</view>
					<view class="box-content-order-info-main-item">
						<view class="box-content-order-info-main-item-title">下单时间：</view>
						<view class="box-content-order-info-main-item-text">
							<text>2021-01-13 10:35:11</text>
						</view>
					</view>
					<view class="box-content-order-info-main-item">
						<view class="box-content-order-info-main-item-title">服务方式：</view>
						<view class="box-content-order-info-main-item-text">
							<text>到店服务</text>
						</view>
					</view>
					<view class="box-content-order-info-main-item">
						<view class="box-content-order-info-main-item-title">支付方式：</view>
						<view class="box-content-order-info-main-item-text">
							<text>余额支付</text>
						</view>
					</view>
				</view>
				<view class="box-content-order-info-text">
					<view class="box-content-order-info-text-list">
						<view class="box-content-order-info-text-list-title">项目总价</view>
						<view class="box-content-order-info-text-list-price">￥358.00</view>
					</view>
					<view class="box-content-order-info-text-list">
						<view class="box-content-order-info-text-list-title">使用优惠券</view>
						<view class="box-content-order-info-text-list-price">￥100.00</view>
					</view>
				</view>
				<view class="box-content-order-info-price">
					<view class="box-content-order-info-price-text">实付款：</view>
					<view class="present-price">
						￥<text>396.00</text>
					</view>
				</view>
			</view>

			<view class="box-content-text">
				<view class="box-content-text-title">门店信息</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">门店</view>
					<view class="box-content-text-list-msg">印象诗意·悠然SPA</view>
				</view>
			</view>
			<view class="box-content-text">
				<view class="box-content-text-title">下单用户信息</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">用户昵称</view>
					<view class="box-content-text-list-msg">上善若水</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">用户名</view>
					<view class="box-content-text-list-msg">王二麻子</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">手机号码</view>
					<view class="box-content-text-list-msg">1888888888</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">邮箱</view>
					<view class="box-content-text-list-msg">4488@163.com</view>
				</view>
			</view>

			<view class="box-content-text">
				<view class="box-content-text-title">紧急联系人</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">姓名</view>
					<view class="box-content-text-list-msg">王二麻子</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">联系电话</view>
					<view class="box-content-text-list-msg">1888888888</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">关系</view>
					<view class="box-content-text-list-msg">朋友</view>
				</view>
			</view>
			<view class="box-content-text">
				<view class="box-content-text-title">用户健康信息</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">性别</view>
					<view class="box-content-text-list-msg">男</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">年龄</view>
					<view class="box-content-text-list-msg">18</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">过往病例</view>
					<view class="box-content-text-list-msg">无</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">过敏病例</view>
					<view class="box-content-text-list-msg">芒果过敏</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">有无手术</view>
					<view class="box-content-text-list-msg">无</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">注意事项</view>
					<view class="box-content-text-list-msg">无</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="flex-center cancel">取消订单</view>
			<view class="box-font-btn flex-center">确认核销</view>
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
			flex: 1;
			overflow-y: scroll;

			.box-content-appointment-time {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
				height: 150rpx;
				background: #fff;

				.box-content-appointment-time-info {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.appointment-time-info-title {
						line-height: 32rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #000;
					}

					.appointment-time-info-text {
						line-height: 28rpx;
						font-size: 28rpx;
						color: #666;
					}
				}

				.box-content-appointment-time-info-btn {
					width: 174rpx;
					height: 58rpx;
					border: 1rpx solid #5DBDFE;
					border-radius: 32rpx;
					font-size: 28rpx;
					color: #5DBDFE;
				}
			}

			.box-content-order-info {
				margin-top: 20rpx;
				padding: 0 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-order-info-title {
					line-height: 32rpx;
					padding: 30rpx 0;
					font-size: 32rpx;
					font-weight: 500;
					color: #000;
				}

				.box-content-order-list-li-wrap {
					// padding-bottom: 20rpx;

					.order-list-li-wrap-item {
						display: flex;
						margin-bottom: 20rpx;

						.order-list-li-wrap-item-image {
							display: flex;
							align-items: center;

							image {
								width: 132rpx;
								height: 132rpx;
							}
						}

						.order-list-li-wrap-item-info {
							flex: 1;
							margin-left: 20rpx;

							.order-list-li-wrap-item-info-top {
								display: flex;
								align-items: center;
								justify-content: space-between;
								color: #000;

								.wrap-item-info-top-text {
									font-size: 30rpx;
									font-weight: 500;
								}

								.wrap-item-info-top-msg {
									font-size: 28rpx;
								}
							}

							.order-list-li-wrap-item-info-box {
								display: flex;
								justify-content: space-between;
								align-items: center;
								margin-top: 10rpx;

								.order-list-li-wrap-item-info-box-list {
									display: flex;
									flex-wrap: wrap;

									.order-list-li-wrap-item-info-box-list-li {
										padding: 6rpx 10rpx;
										margin-left: 8rpx;
										background: #F5F5F5;
										border-radius: 3rpx;
										font-size: 22rpx;
										color: #666;
									}
								}

								.order-list-li-wrap-item-info-box-number {
									font-size: 28rpx;
									color: #999;
								}

							}
						}
					}
				}

				.box-content-order-info-main {
					padding: 30rpx 0;
					border-top: 1rpx dashed #ededed;
					border-bottom: 1rpx dashed #ededed;

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

				.box-content-order-info-text {
					height: 136rpx;
					padding: 30rpx 0;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					border-bottom: 1rpx solid #ededed;

					.box-content-order-info-text-list {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28rpx;
						line-height: 32rpx;
						color: #000;

						.box-content-order-info-text-list-title {}

						.box-content-order-info-text-list-price {}
					}
				}

				.box-content-order-info-price {
					height: 72rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					.box-content-order-info-price-text {
						font-size: 24rpx;
						color: #999;
					}

					.present-price {
						font-size: 24rpx;
						color: #FF4D4D;

						text {
							font-size: 32rpx;
							font-weight: 500;
						}
					}
				}
			}


			.box-content-text {
				margin: 20rpx 0;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-text-title {
					line-height: 32rpx;
					margin-bottom: 30rpx;
					font-size: 32rpx;
					color: #000;
				}

				.box-content-text-list:last-child {
					margin-bottom: 0;
				}

				.box-content-text-list {
					display: flex;
					align-items: center;
					margin-bottom: 10rpx;
					font-size: 28rpx;

					.box-content-text-list-title {
						position: relative;
						padding-right: 10rpx;
						box-sizing: border-box;
						text-align-last: justify;
						text-align: justify;
						text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
						width: 130rpx;
						color: #999;
					}

					.box-content-text-list-title::after {
						position: absolute;
						top: 0;
						bottom: 0;
						right: 0;
						content: ":";
					}

					.box-content-text-list-msg {
						margin-left: 20rpx;
						color: #000;
						flex: 1;
					}
				}
			}
		}

		.box-footer {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			background: #fff;
			height: 107rpx;
			padding: 0 20rpx;
			box-sizing: border-box;

			.box-font-btn {
				width: 220rpx;
				height: 80rpx;
				background: #5DBDFE;
				border-radius: 40rpx;
				color: #fff;
				font-size: 32rpx;
			}
			.cancel{
				width: 218rpx;
				height: 78rpx;
				border: 1rpx solid #666666;
				margin-right: 20rpx;
				border-radius: 40rpx;
				font-size: 32rpx;
				color: #666;
			}
		}
	}
</style>
