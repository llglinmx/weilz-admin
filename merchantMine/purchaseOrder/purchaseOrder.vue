<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">我的进货订单</view>
				<view class="box-head-ico flex-center">
					<text class="iconfont iconsousuo1 icon-font"
						style="color: #5DBDFE;font-size: 52rpx;margin-top: 4rpx;"></text>
				</view>
			</view>
			<view class="box-head-tabs">
				<merchant-tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-order">
								<view class="box-content-order-list">
									<view class="box-content-order-list-li" v-for="(item,index) in 10" :key="index"
										@click="index==2 && shippingDetails(index)">
										<view class="box-content-order-list-li-top">
											<view class="order-list-li-top-title">
												<text class="iconfont iconshangjia icon-font"
													style="color: #5DBDFE;font-size: 28rpx;margin-top: 4rpx;"></text>
												<!-- <image src="../../static/images/icon-5.jpg" mode=""></image> -->
												<text>罗约蓝池·温泉SPA</text>
											</view>
											<view class="order-list-li-top-msg">待付款</view>
										</view>
										<view class="box-content-order-list-li-wrap">
											<view class="order-list-li-wrap-item" v-for="(i,j) in 3">
												<view class="order-list-li-wrap-item-image">
													<image src="../../static/images/001.png" mode="aspectFill"></image>
												</view>
												<view class="order-list-li-wrap-item-info">
													<view class="order-list-li-wrap-item-info-top">
														<view class="wrap-item-info-top-text">淡雅茉莉香薰蜡烛</view>
														<view class="wrap-item-info-top-msg">￥298.00</view>
													</view>
													<view class="order-list-li-wrap-item-info-box">
														<view class="order-list-li-wrap-item-info-box-list">
															规格：500g
														</view>
														<view class="order-list-li-wrap-item-info-box-number">x1</view>
													</view>
												</view>
											</view>
										</view>

										<view class="box-content-order-list-li-footer">
											<view class="box-content-order-list-li-footer-text">
												<view class="box-content-order-list-li-footer-text-msg">实付款：</view>
												<view class="box-content-order-list-li-footer-text-price">
													￥<text>332.70</text></view>
											</view>
											<view class="box-content-order-list-li-footer-btn">
												<view class="order-list-li-footer-all-btn btn-blue flex-center"
													v-if="index==3">评价订单</view>
												<view class="order-list-li-footer-all-btn btn-hollow flex-center"
													v-if="index==2" @click.stop="viewLogistics">查看物流</view>
												<view class="order-list-li-footer-all-btn btn-blue flex-center"
													v-if="index==2">确认收货</view>
												<view class="order-list-li-footer-all-btn btn-hollow flex-center"
													v-if="index==0">取消订单</view>
												<view class="order-list-li-footer-all-btn btn-fill flex-center"
													v-if="index==0">去付款</view>
												<view class="order-list-li-footer-all-btn btn-hollow flex-center"
													v-if="index!=0&&index!=2&&index!=3">删除订单</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							2
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							3
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							4
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							5
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							6
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer">

		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import merchantTabs from "../../components/merchant-tabs/merchant-tabs.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				defaultIndex: 0, //当前滑动的页面
				tabsList: ["进货订单", "待付款", "待发货", "待收货", "待评价", "已完成"],
			};
		},
		components: {
			navTitleBalck,
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
			// 发货详情
			shippingDetails(index) {
				uni.navigateTo({
					url: "../deliveryFromSeller/deliveryFromSeller"
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
			background-color: #fff;

			.box-head-nav {
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;
				height: 88rpx;

				.box-head-back {
					width: 50rpx;
				}

				.box-head-title {
					flex: 1;
					text-align: center;
					font-size: 34rpx;
					font-weight: 500;
					color: #000;
				}

				.box-head-ico {
					width: 50rpx;
				}
			}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-wrap {
				height: 100%;
				overflow-y: scroll;

				.box-content-wrap-item {
					height: 100%;

					.swiper-box {
						height: 100%;
						overflow-y: scroll;

						.swiper-box-item-list {
							height: 100%;
							overflow-y: scroll;


							.box-content-order {
								.box-content-order-list {
									margin-bottom: 20rpx;

									.box-content-order-list-li {
										margin-top: 20rpx;
										padding: 0 40rpx;
										box-sizing: border-box;
										background: #fff;

										.box-content-order-list-li-top {
											display: flex;
											align-items: center;
											justify-content: space-between;
											padding: 30rpx 0;
											font-size: 28rpx;

											.order-list-li-top-title {
												display: flex;
												align-items: center;
												color: #000;

												text {
													margin-right: 8rpx;
												}
											}

											.order-list-li-top-msg {
												color: #5DBDFE;
											}
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
															align-items: center;
															color: #666;
															font-size: 24rpx;
														}

														.order-list-li-wrap-item-info-box-number {
															font-size: 28rpx;
															color: #999;
														}

													}
												}
											}
										}



										.box-content-order-list-li-footer {
											display: flex;
											align-items: center;
											justify-content: space-between;
											height: 100rpx;

											.box-content-order-list-li-footer-text {
												display: flex;
												align-items: baseline;

												.box-content-order-list-li-footer-text-msg {
													font-size: 24rpx;
													color: #999;
												}

												.box-content-order-list-li-footer-text-price {
													font-size: 24rpx;
													color: #FF4D4D;

													text {
														font-size: 32rpx;
														font-weight: 500;
													}
												}
											}

											.box-content-order-list-li-footer-btn {
												display: flex;
												align-items: center;

												.order-list-li-footer-all-btn {
													margin-right: 20rpx;
													border-radius: 32rpx;
													font-size: 28rpx;
												}

												.order-list-li-footer-all-btn:last-child {
													margin-right: 0;
												}

												.btn-hollow {
													width: 174rpx;
													height: 58rpx;
													border: 1rpx solid #666666;
													color: #666;
												}

												.btn-blue {
													width: 174rpx;
													height: 58rpx;
													border: 1rpx solid #5DBDFE;
													color: #5DBDFE;
												}

												.btn-fill {
													width: 176rpx;
													height: 60rpx;
													background: #5DBDFE;
													color: #fff;
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
		}

		.box-footer {}
	}
</style>
