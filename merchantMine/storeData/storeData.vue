<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="门店数据" />
		</view>
		<view class="box-content">
			<view class="box-content-info">
				<view class="box-content-info-top">
					<view class="box-content-info-top-left">
						<image src="../../static/images/business-blue-ico.png" mode="aspectFill"></image>
						<text>中山路店</text>
					</view>
					<view class="box-content-info-top-right">
						<text>本周</text>
						<text class="iconfont iconxiangxiajiantou icon-font"
							style="color: #333;font-size: 28rpx"></text>
					</view>
				</view>
				<view class="box-content-info-bottom">
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #5DBDFE;" class="dot"></text>
								<text>总收入</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>订单量</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>会员充值</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>余额支付</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>微信支付</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>通用套餐收入</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FF4D4D;" class="dot"></text>
								<text>退款金额</text>
							</view>
							<view class="box-content-info-bottom-item-text">
								<text>552512</text>
								<text class="iconfont iconwenhao icon-font"
									style="color: #FF3333;font-size: 32rpx;"></text>
							</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>线下收入</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FF4D4D;" class="dot"></text>
								<text>平台提成</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
				</view>
			</view>

			<view class="box-content-data">
				<view class="box-content-data-tabs">
					<merchant-tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
				</view>
				<view class="box-content-data-list">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-data-list-main">
								<view class="box-content-data-list-main-item" v-for="(item,index) in 20"
									@click="refundDetails">
									<view class="box-content-data-list-main-item-left">
										<view class="list-main-item-left-text">订单号：DSH35693596738</view>
										<view class="list-main-item-left-msg">2021年01月10日 12:00:23</view>
									</view>
									<view class="box-content-data-list-main-item-right">
										<text>-129.00</text>
										<text class="iconfont icongengduo icon-font"
											style="color: #ccc;font-size: 28rpx;margin-top: 4rpx;"></text>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-data-list-main">
								<view class="box-content-data-list-main-item" v-for="(item,index) in 20"
									@click="packageDetails">
									<view class="box-content-data-list-main-item-left">
										<view class="list-main-item-left-text">订单号：DSH35693596738</view>
										<view class="list-main-item-left-msg">2021年01月10日 12:00:23</view>
									</view>
									<view class="box-content-data-list-main-item-right">
										<text>-129.00</text>
										<text class="iconfont icongengduo icon-font"
											style="color: #ccc;font-size: 28rpx;margin-top: 4rpx;"></text>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navTitleWhite from "../../components/nav-title-white/nav-title-white.vue"
	import merchantTabs from "../../components/merchant-tabs/merchant-tabs.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				tabsList: ["退款订单", "套餐订单"],
				defaultIndex: 0, //当前滑动的页面
			};
		},
		components: {
			navTitleWhite,
			merchantTabs
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
			// 退款订单详情
			refundDetails() {
				uni.navigateTo({
					url: "../refundOrderDetails/refundOrderDetails"
				})
			},
			// 套餐订单详情
			packageDetails() {
				uni.navigateTo({
					url: "../packageOrderDdetails/packageOrderDdetails"
				})
			},

			// tabs 点击
			tabClick(e) {
				this.defaultIndex = e
			},
			// 滑动切换列表
			tabChange(e) {
				this.$refs.boxTabs.tabToIndex(e.detail.current)
				this.defaultIndex = e.detail.current
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
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-info {
				padding: 30rpx 40rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-info-top {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.box-content-info-top-left {
						display: flex;
						align-items: center;
						font-size: 36rpx;
						color: #000;

						image {
							margin-top: 4rpx;
							width: 36rpx;
							height: 36rpx;
							margin-right: 10rpx;
						}
					}

					.box-content-info-top-right {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #000;

						.icon-font {
							margin-left: 10rpx;
						}
					}
				}

				.box-content-info-bottom {
					display: flex;
					flex-wrap: wrap;

					.box-content-info-bottom-item {
						width: 220rpx;
						margin-top: 40rpx;

						.box-content-info-bottom-item-wrap {
							.box-content-info-bottom-item-title {
								display: flex;
								align-items: center;
								font-size: 26rpx;
								color: #999;

								text {
									display: block;
								}

								.dot {
									margin-right: 10rpx;
									width: 16rpx;
									height: 16rpx;
									background: #FFFFFF;
									border-radius: 50%;
								}
							}

							.box-content-info-bottom-item-text {
								display: flex;
								align-items: center;
								margin-top: 10rpx;
								margin-left: 30rpx;
								font-size: 32rpx;
								font-weight: bold;
								color: #000;

								.icon-font {
									margin-left: 10rpx;
								}
							}

						}
					}
				}
			}


			.box-content-data {
				margin-top: 20rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				background: #fff;

				.box-content-data-tabs {
					border-bottom: 2rpx solid #ededed;
				}

				.box-content-data-list {
					flex: 1;
					overflow-y: scroll;

					.swiper-box {
						height: 100%;
						overflow-y: scroll;

						.swiper-box-item-list {
							height: 100%;
							overflow-y: scroll;

							.box-content-data-list-main {
								padding-left: 40rpx;
								box-sizing: border-box;
								margin-bottom: 40rpx;

								.box-content-data-list-main-item {
									display: flex;
									align-items: center;
									padding: 30rpx 40rpx 30rpx 0;
									box-sizing: border-box;
									border-bottom: 1rpx solid #ededed;

									.box-content-data-list-main-item-left {
										flex: 1;
										margin-right: 20rpx;

										.list-main-item-left-text {
											font-size: 30rpx;
											color: #000;
										}

										.list-main-item-left-msg {
											margin-top: 10rpx;
											font-size: 24rpx;
											color: #999;
										}

									}

									.box-content-data-list-main-item-right {
										display: flex;
										align-items: center;
										font-size: 32rpx;
										color: #FF4D4D;

										.icon-font {
											margin-left: 20rpx;
										}
									}
								}
							}

						}
					}
				}

			}
		}

	}
</style>
