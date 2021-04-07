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
		<view class="box-content" :style="{display:isData?'block':'none'}">
			<z-paging ref="paging1" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
				:refresher-angle-enable-change-continued="false" :touchmove-propagation-enabled="true"
				:use-custom-refresher="true" style="height: 100%;">
				<view class="box-content-order-list">
					<view class="order-list-li" v-for="(item,index) in dataList" :key="index">
						<view class="order-list-li-top">
							<view class="order-list-li-top-title">订单号{{item.out_trade_no}}</view>
							<view class="order-list-li-top-msg" v-if="item.status==1">待核销</view>
						</view>
						<view class="order-list-li-info">
							<view class="order-list-li-info-wrap">
								<view class="order-list-li-info-wrap-item">
									<view class="order-list-li-info-wrap-item-title">顾客</view>
									<view class="order-list-li-info-wrap-item-msg">
										<text>{{item.member_name}}</text>
										<text>{{item.mobile}}</text>
									</view>
								</view>
								<view class="order-list-li-info-wrap-item">
									<view class="order-list-li-info-wrap-item-title">服务</view>
									<view class="order-list-li-info-wrap-item-msg">
										<text v-if="item.service_name==null">{{item.reserve_name}}</text>
										<text v-if="item.reserve_name==null">{{item.service_name}}</text>
									</view>
								</view>
								<view class="order-list-li-info-wrap-item">
									<view class="order-list-li-info-wrap-item-title">门店</view>
									<view class="order-list-li-info-wrap-item-msg">
										<text>{{item.store_name}}</text>
									</view>
								</view>
								<view class="order-list-li-info-wrap-item">
									<view class="order-list-li-info-wrap-item-title">时间</view>
									<view class="order-list-li-info-wrap-item-msg">
										<text>2020/10/12 15:00-16:00</text>

									</view>
								</view>
							</view>
							<view class="order-list-li-info-footer">
								<view class="order-list-li-info-footer-price">
									<view class="order-list-li-info-footer-price-msg">实付款：</view>
									<view class="order-list-li-info-footer-present-price">
										￥<text>{{item.amount}}</text>
									</view>
								</view>
								<view class="order-list-li-info-footer-all-btn">
									<view class="order-list-li-info-footer-btn flex-center" @click="cancelOrder">取消订单
									</view>
									<view class="order-list-li-info-footer-btn flex-center" @click="confirmWriteOff">
										确认核销</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
		<view class="box-content" :style="{display:!isData?'block':'none'}">
			<loading v-if="isLoad" />
			<no-data v-if="!isLoad" />
		</view>
		<view class="box-footer">
			<merchant-tabbar @tabbarClick="tabbarClick" :activeIndex="activeIndex"></merchant-tabbar>
		</view>
	</view>
</template>

<script>
	import merchantTabbar from "../../components/merchant-tabbar/merchant-tabbar.vue"
	import loading from '../../components/loading-merchant/loading-merchant.vue'
	import noData from '../../components/no-data/no-data.vue'
	import zPaging from '../../components/z-paging/components/z-paging/z-paging.vue'
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度,
				activeIndex: 0, //当前tabbar所在页面
				dataList: [],
				options: [{
						title: "待付款",
						number: "0"
					},
					{
						title: "待核销",
						number: "0"
					},
					{
						title: "已核销",
						number: "0"
					}, {
						title: "申请退款",
						number: "0"
					},
					{
						title: "已退款",
						number: "0"
					}

				],
				isData: false,
				isLoad: true,
			};
		},
		components: {
			merchantTabbar,
			loading,
			noData,
			zPaging,

		},
		onShow() {

		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onLoad() {

		},
		methods: {

			// 上拉 下拉
			queryList(pageNo, pageSize) {
				this.orderList(pageNo, pageSize)
			},


			// 订单列表
			orderList(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
				}
				this.apiget('api/v1/store/order', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.data.length != 0) {
							this.isData = true
							let list = res.data.data
							this.$refs.paging1.complete(list);
							return false;
						}
						this.isData = false
						this.isLoad = false

					}
				});
			},

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
				// margin-bottom: 40rpx;

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
