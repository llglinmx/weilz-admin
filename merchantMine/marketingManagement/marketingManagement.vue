<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">营销管理</view>
				<view class="box-head-ico flex-center">
					<text class="iconfont iconsousuo1 icon-font" style="color: #5DBDFE;font-size: 52rpx;margin-top: 4rpx;"></text>
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
							<view class="box-content-main">
								<view class="box-content-main-list">
									<view class="box-content-main-list-li" v-for="(item,index) in dataList" :key="index">
										<view class="box-content-main-list-li-top">
											<view class="box-content-main-list-li-top-left">
												<image src="../../static/images/business-blue-ico.png" mode="aspectFill"></image>
												<text>罗约蓝池·温泉SPA</text>
											</view>
											<view class="box-content-main-list-li-top-right">
												<view class="main-list-li-top-left-msg flex-center">已审核</view>
											</view>
										</view>
										<view class="box-content-main-list-li-center">
											<view class="box-content-main-list-li-center-top">
												<view class="main-list-li-center-top-title">元旦限定优惠券</view>
												<view class="main-list-li-center-top-price">￥20</view>
											</view>
											<view class="box-content-main-list-li-center-text">满200元可用</view>
											<view class="box-content-main-list-li-center-list">
												<view class="main-list-li-center-list-li">
													<text class="title">发放数量</text>
													<text class="text">10000</text>
												</view>
												<view class="main-list-li-center-list-li">
													<text class="title">领取数量</text>
													<text class="text">99</text>
												</view>
												<view class="main-list-li-center-list-li">
													<text class="title">已使用</text>
													<text class="text">255</text>
												</view>
											</view>
											<view class="box-content-main-list-li-center-msg">发放时间：待发放</view>
											<view class="box-content-main-list-li-center-msg">活动时间：2021. 01.01-2021.01.10</view>
										</view>
										<view class="box-content-main-list-li-bottom">
											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconshanchu-shangjia icon-font" style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>删除</text>
											</view>

											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconbianji-shangjia icon-font" style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>编辑</text>
											</view>
										</view>
									</view>
								</view>
							</view>

						</swiper-item>
						<swiper-item class="swiper-box-item-list"></swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-main">
								<view class="box-content-main-list">
									<view class="box-content-main-list-li" v-for="(item,index) in dataList" :key="index">
										<view class="box-content-main-list-li-top">
											<view class="box-content-main-list-li-top-left">
												<image src="../../static/images/business-blue-ico.png" mode="aspectFill"></image>
												<text>罗约蓝池·温泉SPA</text>
											</view>
											<view class="box-content-main-list-li-top-right">出售中</view>
										</view>
										<view class="box-content-main-list-li-center">
											
										</view>
										<view class="box-content-main-list-li-bottom">
											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconxiajia-shangjia icon-font" style="color: #4EC494;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>下架</text>
											</view>
											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconshanchu-shangjia icon-font" style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>删除</text>
											</view>

											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconbianji-shangjia icon-font" style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>编辑</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list"></swiper-item>
						<swiper-item class="swiper-box-item-list"></swiper-item>

					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="btn-1" v-if="defaultIndex==0">
				<btn-sky-blue btnName="新增优惠券" />
			</view>
			<view class="btn-2" v-if="defaultIndex==1">
				<btn-sky-blue btnName="新增兑换券" />
			</view>
			<view class="btn-2" v-if="defaultIndex==2">
				<btn-sky-blue btnName="添加套餐卡" />
			</view>
			<view class="btn-2" v-if="defaultIndex==3">
				<btn-sky-blue btnName="添加礼品卡" />
			</view>
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import merchantTabs from "../../components/merchant-tabs/merchant-tabs.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				defaultIndex: 2, //当前滑动的页面
				tabsList: ["优惠券", "兑换券", "套餐卡", "礼品卡", "储值卡"],
				dataList: [{
						isOpen: true,
						isCheck: false
					},
					{
						isOpen: false,
						isCheck: true
					},
					{
						isOpen: true,
						isCheck: false
					},
					{
						isOpen: false,
						isCheck: true
					},
					{
						isOpen: true,
						isCheck: false
					},
					{
						isOpen: false,
						isCheck: false
					},
				]
			};
		},
		components: {
			navTitleBalck,
			merchantTabs,
			btnSkyBlue
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

							.box-content-main {
								padding: 0 20rpx;
								box-sizing: border-box;

								.box-content-main-list {
									// margin-bottom: 40rpx;

									.box-content-main-list-li-active {
										padding-bottom: 0 !important;
									}

									.box-content-main-list-li {
										padding: 0 20rpx;
										box-sizing: border-box;
										background: #fff;
										border-radius: 20rpx;
										margin-top: 20rpx;
										transition: 0.3s;

										.box-content-main-list-li-top {
											height: 76rpx;
											display: flex;
											align-items: center;
											justify-content: space-between;

											.box-content-main-list-li-top-left {
												display: flex;
												align-items: center;

												image {
													width: 28rpx;
													height: 28rpx;
												}

												text {
													margin-left: 10rpx;
													font-size: 28rpx;
													color: #000;
												}
											}

											.box-content-main-list-li-top-right {
												font-size: 28rpx;
												color: #5DBDFE;

												.main-list-li-top-left-msg {
													width: 86rpx;
													height: 36rpx;
													background: #4EC494;
													border-radius: 5rpx;
													color: #fff;
													font-size: 22rpx;
												}
											}

										}

										.box-content-main-list-li-center {
											padding: 20rpx 0 30rpx;
											box-sizing: border-box;
											border-top: 1rpx solid #ededed;
											border-bottom: 1rpx solid #ededed;

											.box-content-main-list-li-center-top {
												display: flex;
												align-items: center;
												justify-content: space-between;
												font-weight: 500;

												.main-list-li-center-top-title {
													font-size: 34rpx;
													color: #000;
												}

												.main-list-li-center-top-price {
													font-size: 40rpx;
													color: #FF4D4D;
												}
											}

											.box-content-main-list-li-center-text {
												font-size: 24rpx;
												color: #333;
											}

											.box-content-main-list-li-center-list {
												display: flex;
												margin: 30rpx 0 40rpx;

												.main-list-li-center-list-li {
													flex: 1;
													font-size: 26rpx;

													.title {
														color: #999;
													}

													.text {
														margin-left: 10rpx;
														color: #000;
													}
												}
											}

											.box-content-main-list-li-center-msg {
												font-size: 24rpx;
												color: #999;
											}
										}

										.box-content-main-list-li-bottom {
											height: 88rpx;
											display: flex;
											align-items: center;
											overflow: hidden;
											transition: 0.3s;

											.box-content-main-list-li-bottom-item {
												flex: 1;
												display: flex;
												align-items: center;
												justify-content: center;
												font-size: 28rpx;
												color: #333;

												text {}

												.icon-font {
													margin-right: 10rpx;
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

		.box-footer {
			position: relative;
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			overflow: hidden;
		}

	}
</style>
