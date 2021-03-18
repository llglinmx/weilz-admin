<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">技师管理</view>
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
							<view class="box-content-main">
								<view class="box-content-main-list">
									<view class="box-content-main-list-li" v-for="(item,index) in dataList"
										:key="index">
										<view class="box-content-main-list-li-top">
											<view class="box-content-main-list-li-top-image">
												<image src="../../static/images/001.png" mode="aspectFill"></image>
											</view>
											<view class="box-content-main-list-li-top-info">
												<view class="box-content-main-list-li-top-info-title">
													<view class="box-content-main-list-li-top-info-title-text">张小小
													</view>
													<view class="box-content-main-list-li-top-info-title-msg">【金牌技师】
													</view>
												</view>
												<view class="box-content-main-list-li-top-info-msg">工龄：2年</view>
												<view class="box-content-main-list-li-top-info-msg">手机号：13825411234
												</view>
												<view class="box-content-main-list-li-top-info-wrap">
													<view class="list-li-top-info-wrap-item">60分钟</view>
													<view class="list-li-top-info-wrap-item">背部按摩</view>
												</view>
											</view>
										</view>
										<view class="box-content-main-list-li-bottom">
											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconshanchu-shangjia icon-font"
													style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>删除</text>
											</view>

											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconbianji-shangjia icon-font"
													style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>编辑</text>
											</view>
										</view>
									</view>
								</view>
							</view>

						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-main">
								<view class="box-content-main-list">
									<view class="box-content-main-list-li" v-for="(item,index) in dataList"
										:key="index">
										<view class="box-content-main-list-li-top">
											<view class="box-content-main-list-li-top-image">
												<image src="../../static/images/001.png" mode="aspectFill"></image>
												<text class="flex-center">临时技师</text>
											</view>
											<view class="box-content-main-list-li-top-info">
												<view class="box-content-main-list-li-top-info-title">
													<view class="box-content-main-list-li-top-info-title-text">张小小
													</view>
													<view class="box-content-main-list-li-top-info-title-msg">【金牌技师】
													</view>
												</view>
												<view class="box-content-main-list-li-top-info-msg">工龄：2年</view>
												<view class="box-content-main-list-li-top-info-msg">手机号：13825411234
												</view>
												<view class="box-content-main-list-li-top-info-wrap">
													<view class="list-li-top-info-wrap-item">60分钟</view>
													<view class="list-li-top-info-wrap-item">背部按摩</view>
												</view>
											</view>
										</view>
										<view class="box-content-main-list-li-bottom">
											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconshanchu-shangjia icon-font"
													style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>删除</text>
											</view>

											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconbianji-shangjia icon-font"
													style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>编辑</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>

					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="btn-1" v-if="defaultIndex==0">
				<btn-sky-blue btnName="新增技师" @btnClick="addTechnician" />
			</view>
			<view class="btn-2" v-if="defaultIndex==1">
				<btn-sky-blue btnName="新增临时技师" />
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
				defaultIndex: 0, //当前滑动的页面
				tabsList: ["全职技师 0", "临时技师 0"],
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
			// 新增技师
			addTechnician() {
				uni.navigateTo({
					url: "../newTechnician/newTechnician"
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
									margin-bottom: 40rpx;

									.box-content-main-list-li-active {
										padding-bottom: 0 !important;
									}

									.box-content-main-list-li {
										padding: 30rpx 30rpx 0;
										box-sizing: border-box;
										background: #fff;
										border-radius: 20rpx;
										margin-top: 20rpx;
										transition: 0.3s;

										.box-content-main-list-li-top {
											display: flex;
											align-items: center;
											padding-bottom: 30rpx;
											transition: 0.3s;
											border-bottom: 1rpx solid #ededed;


											.box-content-main-list-li-top-image {
												position: relative;
												display: flex;
												align-items: center;
												width: 164rpx;
												border-radius: 10rpx;

												image {
													width: 164rpx;
													height: 164rpx;
												}

												text {
													position: absolute;
													left: 0;
													bottom: 0;
													width: 100%;
													height: 40rpx;
													background: rgba(0, 0, 0, .5);
													font-size: 24rpx;
													color: #fff;
													border-radius: 0rpx 0rpx 10rpx 10rpx;
												}
											}

											.box-content-main-list-li-top-info {
												height: 164rpx;
												margin-left: 20rpx;
												flex: 1;

												.box-content-main-list-li-top-info-title {
													display: flex;
													align-items: center;

													.box-content-main-list-li-top-info-title-text {
														margin-right: 10rpx;
														line-height: 34rpx;
														font-size: 34rpx;
														font-weight: 500;
														color: #000;
													}

													.box-content-main-list-li-top-info-title-msg {
														font-size: 28rpx;
														line-height: 28rpx;
														color: #FF8366;
													}
												}

												.box-content-main-list-li-top-info-msg {
													// line-height: 28rpx;
													margin-top: 10rpx;
													font-size: 24rpx;
													color: #666;
												}

												.box-content-main-list-li-top-info-wrap {
													margin-top: 10rpx;
													display: flex;
													align-items: center;
													flex-wrap: wrap;

													.list-li-top-info-wrap-item {
														padding: 6rpx 10rpx;
														margin-right: 10rpx;
														margin-bottom: 10rpx;
														background: #F5F5F5;
														font-size: 22rpx;
														color: #666;
														border-radius: 3rpx;
													}
												}

												.box-content-main-list-li-top-info-stock {
													font-size: 24rpx;
													color: #999;
												}


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
