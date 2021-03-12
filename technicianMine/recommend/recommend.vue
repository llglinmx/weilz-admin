<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="navTitle"></nav-title-balck>
			<view class="box-head-tabs">
				<tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list">
							<view class="box-item-list-business public-style">
								<view class="box-item-list-business-address">
									<view class="box-item-list-business-address-item">
										<text class="title">福建省</text>
										<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx;"></text>
									</view>
									<view class="box-item-list-business-address-item">
										<text class="title">厦门市</text>
										<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx;"></text>
									</view>
								</view>
								<view class="box-item-list-business-main">
									<view class="business-main-list">
										<view class="business-main-list-li" v-for="(item,index) in 20" :key="index">
											<view class="business-main-list-li-image">
												<image src="../../static/images/1.png" mode="aspectFill"></image>
											</view>
											<view class="business-main-list-li-info">
												<view class="business-main-list-li-info-title">花·SUN SPA</view>
												<view class="business-main-list-li-info-score">
													<text class="iconfont iconwujiaoxing icon-font" style="color: #FFCD4D;font-size: 28rpx;" v-for="item in 5"></text>
													<text>5分</text>
												</view>
												<view class="business-main-list-li-info-text">地址：厦门市 集美区 杏滨路罗约酒店负一楼</view>
												<view class="business-main-list-li-info-text">电话：0592-6060448</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-item-list-recommend public-style">
								<view class="box-item-list-business-address">
									<view class="box-item-list-business-address-item">
										<text class="title">福建省</text>
										<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx;"></text>
									</view>
									<view class="box-item-list-business-address-item">
										<text class="title">厦门市</text>
										<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx;"></text>
									</view>
								</view>
								<view class="box-item-list-recommend-main">
									<view class="box-item-list-recommend-main-list">
										<view class="recommend-main-list-li" v-for="(item,index) in 10" :key="index">
											<view class="recommend-main-list-li-top">
												<view class="recommend-main-list-li-top-left">
													<view class="recommend-main-list-li-top-left-image">
														<image src="../../static/images/userImage.png" mode="aspectFill"></image>
													</view>
													<view class="recommend-main-list-li-top-left-info">
														<view class="recommend-main-list-li-top-left-info-title">刘小霞</view>
														<view class="recommend-main-list-li-top-left-info-text">执业6年</view>
													</view>
												</view>
												<view class="recommend-main-list-li-top-btn flex-center">联系TA</view>
											</view>
											<view class="recommend-main-list-li-bottom">
												税务师，从事财务工作十八年，具有丰富的财务实战经验和涉税实战经验。
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-item-list-recommend public-style">
								<view class="box-item-list-business-address">
									<view class="box-item-list-business-address-item">
										<text class="title">福建省</text>
										<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx;"></text>
									</view>
									<view class="box-item-list-business-address-item">
										<text class="title">厦门市</text>
										<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx;"></text>
									</view>
								</view>
								<view class="box-item-list-recommend-main">
									<view class="box-item-list-recommend-main-list">
										<view class="recommend-main-list-li" v-for="(item,index) in 10" :key="index">
											<view class="recommend-main-list-li-top">
												<view class="recommend-main-list-li-top-left">
													<view class="recommend-main-list-li-top-left-image">
														<image src="../../static/images/userImage.png" mode="aspectFill"></image>
													</view>
													<view class="recommend-main-list-li-top-left-info">
														<view class="recommend-main-list-li-top-left-info-title">郑坤宇</view>
														<view class="recommend-main-list-li-top-left-info-text">执业6年</view>
													</view>
												</view>
												<view class="recommend-main-list-li-top-btn flex-center">联系TA</view>
											</view>
											<view class="recommend-main-list-li-bottom">
												郑坤宇律师擅长民事合同纠纷、民间借贷纠纷、交通事故纠纷、劳动工伤纠纷、人身损害纠纷。
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							其他推荐
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
	import tabs from "../../components/tabs/tabs.vue"
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				tabsList: ["商家推荐", "会计推荐", "律师推荐", "其他推荐"],
				defaultIndex: 1, //当前滑动的页面
				navTitle: "商家推荐", //标题名称
			};
		},
		components: {
			tabs,
			navTitleBalck
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

			// tabs 点击
			tabClick(e) {
				this.defaultIndex = e
				switch (this.defaultIndex) {
					case 0:
						this.navTitle = "商家推荐"
						break;
					case 1:
						this.navTitle = "会计推荐"
						break;
					case 2:
						this.navTitle = "律师推荐"
						break;
					case 3:
						this.navTitle = "其他推荐"
						break;
				}
			},
			// 滑动切换列表
			tabChange(e) {

				this.$refs.boxTabs.tabToIndex(e.detail.current)
				this.defaultIndex = e.detail.current
				switch (this.defaultIndex) {
					case 0:
						this.navTitle = "商家推荐"
						break;
					case 1:
						this.navTitle = "会计推荐"
						break;
					case 2:
						this.navTitle = "律师推荐"
						break;
					case 3:
						this.navTitle = "其他推荐"
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
		background: #F7F7F7;

		.box-head {
			background-color: #fff;

			.box-head-tabs {}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;
			background: #fff;

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

							.box-item-list-business {
								height: 100%;
								display: flex;
								flex-direction: column;


								.box-item-list-business-main {
									flex: 1;
									overflow-y: scroll;
									margin-bottom: 40rpx;

									.business-main-list {
										padding-left: 40rpx;
										box-sizing: border-box;

										.business-main-list-li:first-child {
											padding-top: 0;
										}

										.business-main-list-li {
											display: flex;
											align-items: center;
											padding: 40rpx 40rpx 40rpx 0;
											box-sizing: border-box;
											border-bottom: 1rpx solid #ededed;

											.business-main-list-li-image {
												display: flex;
												align-items: center;

												image {
													width: 164rpx;
													height: 164rpx;
												}
											}

											.business-main-list-li-info {
												margin-left: 20rpx;
												flex: 1;
												height: 164rpx;

												.business-main-list-li-info-title {
													line-height: 32rpx;
													font-size: 34rpx;
													color: #000;
												}

												.business-main-list-li-info-score {
													margin-top: 10rpx;
													display: flex;
													align-items: center;

													text {
														margin-right: 6rpx;
														font-size: 24rpx;
														color: #999;
													}
												}

												.business-main-list-li-info-text {
													margin-top: 10rpx;
													font-size: 24rpx;
													color: #666;
												}
											}
										}
									}
								}
							}

							.box-item-list-recommend {
								height: 100%;
								display: flex;
								flex-direction: column;

								.box-item-list-recommend-main {
									flex: 1;
									overflow-y: scroll;

									.box-item-list-recommend-main-list {
										margin-bottom: 40rpx;
										padding-left: 40rpx;
										box-sizing: border-box;

										.recommend-main-list-li:first-child {
											padding-top: 0;
										}

										.recommend-main-list-li {
											padding: 40rpx 40rpx 40rpx 0;
											box-sizing: border-box;
											border-bottom: 1rpx solid #ededed;

											.recommend-main-list-li-top {
												display: flex;
												align-items: center;
												justify-content: space-between;

												.recommend-main-list-li-top-left {
													display: flex;
													align-items: center;

													.recommend-main-list-li-top-left-image {
														display: flex;
														align-items: center;

														image {
															width: 98rpx;
															height: 98rpx;
														}
													}

													.recommend-main-list-li-top-left-info {
														margin-left: 20rpx;
														flex: 1;

														.recommend-main-list-li-top-left-info-title {
															font-size: 34rpx;
															color: #000;
														}

														.recommend-main-list-li-top-left-info-text {
															font-size: 26rpx;
															color: #999;
														}
													}
												}

												.recommend-main-list-li-top-btn {
													width: 149rpx;
													height: 60rpx;
													background: #26BF82;
													border-radius: 30rpx;
													color: #fff;
													font-size: 28rpx;
												}
											}

											.recommend-main-list-li-bottom {
												font-size: 26rpx;
												color: #333;
											}
										}
									}
								}
							}



							.public-style {
								.box-item-list-business-address {
									padding: 0 40rpx;
									box-sizing: border-box;
									margin: 30rpx 0;
									display: flex;
									flex-wrap: wrap;

									.box-item-list-business-address-item {
										display: flex;
										align-items: center;
										padding: 16rpx 24rpx;
										box-sizing: border-box;
										margin-right: 20rpx;
										background: #F7F7F7;
										border-radius: 30rpx;

										.title {
											line-height: 28rpx;
											margin-right: 16rpx;
											font-size: 28rpx;
											color: #666;
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
