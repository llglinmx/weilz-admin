<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="技师详情" />
		</view>
		<view class="box-content">

			<view class="box-content-user-info">
				<view class="box-content-user-info-image">
					<image src="../../static/images/userImage.png" mode="aspectFill"></image>
				</view>
				<view class="box-content-user-info-wrap">
					<view class="box-content-user-info-wrap-top">
						<view class="box-content-user-info-wrap-top-title">郑晓月</view>
						<view class="box-content-user-info-wrap-top-text">ID: 13860123456</view>
					</view>
					<view class="box-content-user-info-wrap-bottom">
						<view class="info-wrap-bottom-item">门店：集美门店</view>
						<view class="info-wrap-bottom-item">管理账号: 1234578</view>
					</view>
				</view>
			</view>
			<view class="box-content-info">
				<view class="box-content-info-top">
					<view class="box-content-info-top-left">
						<text>数据统计</text>
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
								<text>总收入(元)</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text>预约次数</text>
							</view>
							<view class="box-content-info-bottom-item-text">252</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text>服务提成(元)</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text>买单提成(元)</text>
							</view>
							<view class="box-content-info-bottom-item-text">32158</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text>打赏收入(元)</text>
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
								<view class="box-content-data-list-main-item" v-for="(item,index) in 10"
									@click="serviceDetails">
									<view class="box-content-data-list-main-item-left">
										<view class="list-main-item-left-text">订单号：DSH35693596738</view>
										<view class="list-main-item-left-msg">2021年01月10日 12:00:23</view>
									</view>
									<view class="box-content-data-list-main-item-right">
										<text>+129.00</text>
										<text class="iconfont icongengduo icon-font"
											style="color: #ccc;font-size: 28rpx;margin-top: 4rpx;"></text>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-data-list-main">
								<view class="box-content-data-list-main-item" v-for="(item,index) in 20">
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
				tabsList: ["服务订单", "买单订单"],
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
			// 服务订单详情
			serviceDetails() {
				uni.navigateTo({
					url: "../serviceOrderDetails/serviceOrderDetails"
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

			.box-content-user-info {
				display: flex;
				align-items: center;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-user-info-image {
					display: flex;
					align-items: center;

					image {
						width: 112rpx;
						height: 112rpx;
					}
				}

				.box-content-user-info-wrap {
					height: 112rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left: 20rpx;
					flex: 1;

					.box-content-user-info-wrap-top {
						display: flex;
						align-items: baseline;

						.box-content-user-info-wrap-top-title {
							font-size: 36rpx;
							font-weight: 500;
							color: #333;
							line-height: 32rpx;
						}

						.box-content-user-info-wrap-top-text {
							margin-left: 10rpx;
							font-size: 24rpx;
							color: #333;
						}
					}

					.box-content-user-info-wrap-bottom {
						display: flex;
						flex-wrap: wrap;

						.info-wrap-bottom-item:first-child {
							padding-left: 0;
						}

						.info-wrap-bottom-item:last-child {
							border-right: 0;
						}

						.info-wrap-bottom-item {
							display: flex;
							align-items: center;
							padding: 0 20rpx;
							height: 26rpx;
							border-right: 1rpx solid #ededed;
							font-size: 26rpx;
							color: #B3B3B3;
						}
					}
				}
			}


			.box-content-info {
				padding: 30rpx 40rpx 40rpx;
				margin-top: 20rpx;
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
										color: #5DBDFE;

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
