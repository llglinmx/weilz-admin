<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-top">
				<view class="box-head-top-user-info">
					<view class="box-head-top-user-info-name">蓝池美容美体有限公司</view>
				</view>
				<view class="box-head-top-user-info-language">
					<text class="iconfont iconyuyan icon-font" style="color: #fff;font-size: 28rpx;"></text>
					<text class="box-head-top-user-info-language-text">EN</text>
				</view>
			</view>
			<view class="box-head-bottom">
				<view class="box-head-bottom-list">
					<view class="box-head-bottom-list-li flex-center" v-for="(item,index) in options" :key="index">
						<view class="box-head-bottom-list-li-number">{{item.number}}</view>
						<view class="box-head-bottom-list-li-text">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-order-list">
				<view class="order-list-li" v-for="(item,index) in 10" :key="index">
					<view class="order-list-li-top">
						<view class="order-list-li-top-title">订单号DU199110074026</view>
						<view class="order-list-li-top-msg">待核销</view>
					</view>
					<view class="order-list-li-info">
						<view class="order-list-li-info-wrap">
							<view class="order-list-li-info-wrap-item">
								<view class="order-list-li-info-wrap-item-title">顾客</view>
								<view class="order-list-li-info-wrap-item-msg">
									<text>庄女士</text>
									<text>13812345678</text>
								</view>
							</view>
							<view class="order-list-li-info-wrap-item">
								<view class="order-list-li-info-wrap-item-title">服务</view>
								<view class="order-list-li-info-wrap-item-msg">
									<text>泰式按摩</text>
								</view>
							</view>
							<view class="order-list-li-info-wrap-item">
								<view class="order-list-li-info-wrap-item-title">门店</view>
								<view class="order-list-li-info-wrap-item-msg">
									<text>罗约蓝池·温泉SPA</text>
								</view>
							</view>
							<view class="order-list-li-info-wrap-item">
								<view class="order-list-li-info-wrap-item-title">时间</view>
								<view class="order-list-li-info-wrap-item-msg">
									<text>2020/10/12 15:00-16:00</text>
								</view>
							</view>
							<view class="order-list-li-info-wrap-item">
								<view class="order-list-li-info-wrap-item-title">技师</view>
								<view class="order-list-li-info-wrap-item-msg">
									<text>王二麻子</text>
								</view>
							</view>
						</view>
						<view class="order-list-li-info-footer">
							<view class="order-list-li-info-footer-price">
								<view class="order-list-li-info-footer-price-msg">实付款：</view>
								<view class="order-list-li-info-footer-present-price">
									￥<text>332.70</text>
								</view>
							</view>
							<view class="order-list-li-info-footer-all-btn">
								<view class="order-list-li-info-footer-btn flex-center" @click="cancelOrder">取消订单</view>
								<view class="order-list-li-info-footer-btn flex-center" @click="confirmWriteOff">确认核销</view>
							</view>
						</view>
					</view>
				</view>
			</view>
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
				barHeight: 0, //顶部电量导航栏高度,
				activeIndex: 0, //当前tabbar所在页面
				options: [{
						title: "待付款",
						number: "20"
					},
					{
						title: "待核销",
						number: "20"
					},
					{
						title: "已核销",
						number: "2"
					}, {
						title: "申请退款",
						number: "50"
					},
					{
						title: "已退款",
						number: "1"
					}

				]
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

			// 取消订单
			cancelOrder() {
				uni.showToast({
					title: "取消订单",
					icon: "none"
				})
			},
			// 确认核销
			confirmWriteOff() {
				uni.showToast({
					title: "确认核销",
					icon: "none"
				})
			},

			// tabbar点击
			tabbarClick(index) {
				this.activeIndex = index
				switch (index) {
					case 0: //首页
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
						uni.redirectTo({
							url: "../merchantMine/merchantMine"
						})
						break;
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.box-head {
			background-color: #5DBDFE;
			color: #fff;
			padding-bottom: 40rpx;

			.box-head-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;
				padding: 0 40rpx;
				box-sizing: border-box;

				.box-head-top-user-info {
					display: flex;
					align-items: center;


					.box-head-top-user-info-name {
						font-size: 32rpx;
					}
				}

				.box-head-top-user-info-language {
					display: flex;
					align-items: center;

					.box-head-top-user-info-language-text {
						margin-left: 8rpx;
						font-size: 28rpx;
					}
				}
			}

			.box-head-bottom {
				margin-top: 40rpx;

				.box-head-bottom-list {
					display: flex;
					align-items: center;

					.box-head-bottom-list-li {
						position: relative;
						flex-direction: column;
						flex: 1;

						.box-head-bottom-list-li-number {
							font-weight: bold;
							font-size: 34rpx;
						}

						.box-head-bottom-list-li-text {
							font-size: 26rpx;
						}
					}

					// .box-head-bottom-list-li::after {
					// 	position: absolute;
					// 	top: 0;
					// 	bottom: 0;
					// 	right: 0;
					// 	margin: auto;
					// 	content: '';
					// 	width: 1rpx;
					// 	height: 40rpx;
					// 	background: rgba(255, 255, 255, .4);
					// }
				}
			}
		}

		.box-content {
			flex: 1;
			padding: 0 20rpx;
			box-sizing: border-box;
			overflow-y: scroll;
			background: #F7F7F7;

			.box-content-order-list {
				margin-bottom: 40rpx;

				.order-list-li {
					margin-top: 20rpx;
					background: #fff;
					border-radius: 20rpx;

					.order-list-li-top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 24rpx 20rpx;
						box-sizing: border-box;
						border-bottom: 1rpx solid #EDEDED;

						.order-list-li-top-title {
							font-size: 28rpx;
							color: #000;
						}

						.order-list-li-top-msg {
							font-size: 28rpx;
							color: #5DBDFE;
						}
					}

					.order-list-li-info {
						padding: 30rpx 20rpx 20rpx;
						box-sizing: border-box;

						.order-list-li-info-wrap {
							.order-list-li-info-wrap-item {
								display: flex;
								align-items: center;
								margin-bottom: 20rpx;
								font-size: 28rpx;

								.order-list-li-info-wrap-item-title {
									margin-right: 40rpx;
									color: #B3B3B3;
								}

								.order-list-li-info-wrap-item-msg {
									display: flex;
									align-items: center;
									color: #000;

									text {
										display: block;
										margin-right: 40rpx;
									}

									text:last-child {
										margin-left: 0;
									}
								}
							}
						}

						.order-list-li-info-footer {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.order-list-li-info-footer-price {
								display: flex;
								align-items: center;

								.order-list-li-info-footer-price-msg {
									font-size: 24rpx;
									color: #999;
								}

								.order-list-li-info-footer-present-price {
									font-size: 24rpx;
									color: #FF4D4D;

									text {
										font-size: 32rpx;
										font-weight: 500;
									}
								}
							}

							.order-list-li-info-footer-all-btn {
								display: flex;

								.order-list-li-info-footer-btn {
									font-size: 28rpx;
									border-radius: 32rpx;
								}

								.order-list-li-info-footer-btn:nth-child(1) {
									width: 174rpx;
									height: 58rpx;
									border: 1rpx solid #666666;
									opacity: 1;
									color: #666;

								}

								.order-list-li-info-footer-btn:nth-child(2) {
									width: 176rpx;
									height: 60rpx;
									background: #5DBDFE;
									margin-left: 20rpx;
									color: #fff;
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
