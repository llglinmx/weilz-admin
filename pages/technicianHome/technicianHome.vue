<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-top">
				<view class="box-head-top-user-info">
					<view class="box-head-top-user-info-image flex-center">
						<image src="../../static/images/userImage.png" mode="aspectFill"></image>
					</view>
					<view class="box-head-top-user-info-name">王二麻子</view>
				</view>
				<view class="box-head-top-user-info-language" @click="clickLanguage">
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
			<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"
				:height="mesHeight">
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
							</view>
							<view class="order-list-li-info-footer">
								<view class="order-list-li-info-footer-price">
									<view class="order-list-li-info-footer-price-msg">实付款：</view>
									<view class="order-list-li-info-footer-present-price">
										￥<text>332.70</text>
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
			</mescroll-uni>
		</view>
		<view class="box-footer">
			<technician-tabbar @tabbarClick="tabbarClick" :activeIndex="activeIndex"></technician-tabbar>
		</view>
		<!-- 选择语言弹出层 -->
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup-box">
				<view class="popup-list-box">
					<view class="popup-title">
						选择语言
					</view>
					<view class="popup-list">
						<view class="popup-list-li" v-for="(item,index) in textList"
							@click="selectLanguage(item.id,index)" :class="item.default==1?'popup-list-li-active':''">
							<text>{{item.name}}</text>
							<text class="iconfont icondagou icon-font" style="color:#26BF82;font-size: 40rpx;"
								v-if="item.default==1"></text>
						</view>
					</view>
					<view class="popup-btn" @click="confirmBtn">
						确定
					</view>
				</view>
				<view class="popup-close flex-center" @click="closeLanguage">
					<text class="iconfont iconcuowu icon-font" style="color:#fff;font-size: 48rpx;"></text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import technicianTabbar from "../../components/technician-tabbar/technician-tabbar.vue"
	import UniPopup from "../../components/uni-popup/uni-popup.vue"
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度,
				activeIndex: 0, //当前tabbar所在页面
				textList: ['中文', "英语", "俄语", "法语", "德语"],
				selectIndex: 0, //当前选择的语言
				mesHeight: 0,
				downOption: { // 下拉刷新配置
					auto: false,
				},
				upOption: { // 上拉加载配置
					noMoreSize: 5,
					textLoading: "正在加载更多数据",
					textNoMore: "——  已经到底了  ——",
					isBounce: true,
					auto: false,
				},
				PageNumber: 1, // 请求页数，
				PageLimt: 10, // 请求条数
				options: [{
						title: "待核销",
						number: "20"
					},
					{
						title: "已核销",
						number: "2"
					},
					{
						title: "已退款",
						number: "1"
					},
					{
						title: "已评价",
						number: "50"
					},
				]
			}
		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onShow() {
			const sys = uni.getSystemInfoSync();
			var Heigh = sys.windowHeight
			this.mesHeight = (Heigh - 180) * 2
		},
		onLoad() {
			this.languageList();
			this.orderList();
		},
		components: {
			technicianTabbar,
			MescrollUni,
			UniPopup
		},
		methods: {

			// 打开切换语言
			clickLanguage() {
				this.$refs.popup.open()
				this.textList.forEach(item => {
					item.default = '-1'
				})
				this.textList[this.selectIndex].default = 1
			},
			// 选择语言
			selectLanguage(id, index) {
				this.textList.forEach(item => {
					item.default = '-1'
				})
				this.textList[index].default = 1
			},
			// 选择语言 关闭
			closeLanguage() {
				this.$refs.popup.close()
			},
			// 语言选择确定按钮
			confirmBtn() {
				this.$refs.popup.close()
			},

			// 请求语言列表
			languageList() {
				this.apiget('language', {}).then(res => {
					if (res.status == 200) {
						this.textList = res.data.lng.reverse()
						this.textList.forEach((item, index) => {
							if (item.default == 1) { //判断默认选中语言包
								this.selectIndex = index
							}
						})
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

			// 订单列表
			orderList() {
				this.apiget('api/v1/engineer/order', {}).then(res => {
					if (res.status == 200) {
						console.log(res)
					}
				});
			},


			/*下拉刷新的回调*/
			downCallback() {
				this.PageNumber = 1
				setTimeout(() => {
					this.mescroll.endSuccess() // 请求成功 隐藏加载状态

					// this.mescroll.showNoMore()

				}, 1500)
			},

			/*上拉加载的回调*/
			upCallback(page) {
				this.PageNumber++
				console.log(this.PageNumber)
				setTimeout(() => {
					this.mescroll.endSuccess() // 请求成功 隐藏加载状态
					// if (this.PageNumber > 3) {
					this.mescroll.showNoMore()
					// }
				}, 1500)
				console.log("上拉加载")
			},


			// tabbar点击
			tabbarClick(index) {
				this.activeIndex = index
				switch (index) {
					case 0: //首页

						break;
					case 1: //订单
						uni.redirectTo({
							url: "../../pages/technicianOrder/technicianOrder"
						})
						break;
					case 2: //我的
						uni.redirectTo({
							url: "../../pages/technicianMine/technicianMine"
						})
						break;
				}

			},

		}
	}
</script>

<style scoped lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.box-head {
			background-color: #26BF82;
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

					.box-head-top-user-info-image {
						width: 80rpx;
						height: 80rpx;
						background: rgba(255, 255, 255, .2);
						border-radius: 50%;

						image {
							width: 70rpx;
							height: 70rpx;
						}
					}

					.box-head-top-user-info-name {
						margin-left: 16rpx;
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

					.box-head-bottom-list-li::after {
						position: absolute;
						top: 0;
						bottom: 0;
						right: 0;
						margin: auto;
						content: '';
						width: 1rpx;
						height: 40rpx;
						background: rgba(255, 255, 255, .4);
					}
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
							color: #26BF82;
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
									background: #26BF82;
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

		.popup-box {
			position: relative;
			width: 570rpx;
			// height: 704rpx;
			padding: 0 60rpx;
			box-sizing: border-box;
			background: #fff;
			border-radius: 20rpx;

			.popup-list-box {
				height: 100%;
				display: flex;
				flex-direction: column;

				.popup-title {
					padding: 40rpx 0;
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					text-align: center;
				}

				.popup-list {
					flex: 1;
					margin-bottom: 40rpx;
					overflow-y: scroll;

					.popup-list-li {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 80rpx;
						margin-bottom: 30rpx;
						background: #F7F7F7;
						transition: 0.2s;

						text {}

						.icon-font {
							position: absolute;
							right: 30rpx;
							top: 0;
							bottom: 0;
							margin: auto;
						}
					}

					.popup-list-li-active {
						color: #26BF82 !important;
						background: #bde6d6 !important;
					}

					.popup-list-li:last-child {
						margin-bottom: 0;
					}
				}

				.popup-btn {
					margin-bottom: 50rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 88rpx;
					background: #26BF82;
					border-radius: 15rpx;
					color: #fff;
				}
			}

			.popup-close {
				position: absolute;
				top: -28rpx;
				right: -28rpx;
				width: 56rpx;
				height: 56rpx;
				border-radius: 50%;
				background: #26BF82;
			}
		}
	}
</style>
