<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="排班表"></nav-title-balck>
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
								<view class="box-content-main-calendar">

								</view>
								<view class="box-content-main-wrap-text">
									<view class="box-content-main-wrap-text-left">
										<text>2021年02月12日</text>
										<text style="margin-left: 10rpx;">周五</text>
									</view>
									<view class="box-content-main-wrap-text-right">
										<text>查看当日预约</text>
										<text class="iconfont icongengduo icon-font"
											style="color: #45B3FE;font-size: 28rpx;margin-top: 4rpx;"></text>
									</view>
								</view>
								<view class="box-content-main-wrap-msg">上班人员有：</view>
								<view class="box-content-main-wrap-list">
									<view class="box-content-main-wrap-list-li flex-center" v-for="(item,index) in 10"
										:key="index">张小小</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-check-wrap">
								<view class="box-content-check-wrap-title">员工</view>
								<view class="box-content-check-wrap-text">
									<text>王二麻子</text>
									<text class="iconfont icongengduo icon-font"
										style="color: #ccc;font-size: 32rpx;margin-top: 8rpx;"></text>
								</view>
							</view>
							<view class="box-content-main">
								<view class="box-content-main-calendar">

								</view>
								<view class="box-content-main-appointment-info">
									<view class="box-content-main-appointment-info-top">
										<view class="appointment-info-top-title">
											<text>2021年02月12日</text>
											<text>周五</text>
										</view>
										<view class="appointment-info-top-text">
											<text>查看当日预约</text>
											<text class="iconfont icongengduo icon-font"
												style="color: #45B3FE;font-size: 28rpx;margin-top: 4rpx;"></text>
										</view>
									</view>
									<view class="box-content-main-appointment-info-text" style="margin-top: 30rpx;">
										门店名称：罗约蓝池·温泉SPA
									</view>
									<view class="box-content-main-appointment-info-text">
										上班时间：09:00-22:00
									</view>
								</view>
								<view class="box-content-main-appointment-wrap">
									<view class="box-content-main-appointment-wrap-title">当月累计</view>
									<view class="box-content-main-appointment-wrap-list">
										<view class="appointment-wrap-list-item">
											<text class="dot" style="background: #45B3FE"></text>
											<text>正常排班 24 天</text>
										</view>
										<view class="appointment-wrap-list-item">
											<text class="dot" style="background: #FF8366;"></text>
											<text>休息班次 6 天</text>
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
			<btn-sky-blue btnName="添加排班表" @btnClick="addSchedule" />
		</view>
	</view>
</template>

<script>
	import merchantTabs from "../../components/merchant-tabs/merchant-tabs.vue"
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				tabsList: ["团队排班表", "员工排班表"],
				defaultIndex: 1, //当前滑动的页面
			};
		},
		components: {
			merchantTabs,
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
			// 添加排班表
			addSchedule() {
				uni.navigateTo({
					url: "../addSchedule/addSchedule"
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

			.box-head-tabs {}
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

							.box-content-check-wrap {
								margin-top: 20rpx;
								height: 100rpx;
								padding: 0 40rpx;
								box-sizing: border-box;
								display: flex;
								align-items: center;
								justify-content: space-between;
								font-size: 32rpx;
								color: #000;
								background: #fff;

								.box-content-check-wrap-title {}

								.box-content-check-wrap-text {
									display: flex;
									align-items: center;

									.icon-font {
										margin-left: 10rpx;
									}
								}
							}

							.box-content-main {
								margin-top: 20rpx;
								padding: 0 20rpx 30rpx;
								box-sizing: border-box;
								background: #fff;

								.box-content-main-calendar {
									height: 700rpx;
								}

								.box-content-main-wrap-text {
									padding: 30rpx 20rpx;
									box-sizing: border-box;
									display: flex;
									align-items: center;
									justify-content: space-between;

									.box-content-main-wrap-text-left {
										font-size: 32rpx;
										font-weight: 500;
										color: #000;
									}

									.box-content-main-wrap-text-right {
										display: flex;
										align-items: center;
										font-size: 28rpx;
										color: #45B3FE;

										.icon-font {
											margin-left: 10rpx;
										}
									}
								}

								.box-content-main-wrap-msg {
									padding: 0 20rpx;
									box-sizing: border-box;
									font-size: 28rpx;
									color: #333;
								}

								.box-content-main-wrap-list {
									padding: 0 20rpx;
									box-sizing: border-box;
									margin-top: 30rpx;
									display: flex;
									flex-wrap: wrap;

									.box-content-main-wrap-list-li {
										width: 152rpx;
										height: 52rpx;
										margin: 0 20rpx 20rpx 0;
										background: #F7F7F7;
										border-radius: 26rpx;
										font-size: 28rpx;
										color: #666;
									}

									.box-content-main-wrap-list-li:nth-child(4n) {
										margin-right: 0;
									}
								}

								.box-content-main-appointment-info {
									padding: 30rpx;
									box-sizing: border-box;
									background: #F2FAFF;
									border: 1rpx solid #5DBDFE;
									border-radius: 10rpx;

									.box-content-main-appointment-info-top {
										display: flex;
										align-items: center;
										justify-content: space-between;
										color: #45B3FE;

										.appointment-info-top-title {
											font-size: 32rpx;
											font-weight: 500;
										}

										.appointment-info-top-text {
											display: flex;
											align-items: center;
											font-size: 28rpx;

											.icon-font {
												margin-left: 10rpx;
											}
										}
									}

									.box-content-main-appointment-info-text {
										margin-bottom: 10rpx;
										font-size: 28rpx;
										color: #000;
									}
								}

								.box-content-main-appointment-wrap {
									padding: 0 20rpx;
									box-sizing: border-box;

									.box-content-main-appointment-wrap-title {
										padding: 30rpx 0;
										font-size: 32rpx;
										font-weight: 500;
										color: #333;
									}

									.box-content-main-appointment-wrap-list {
										display: flex;

										.appointment-wrap-list-item {
											display: flex;
											align-items: center;
											flex: 1;
											font-size: 28rpx;
											color: #333;

											text {
												display: block;
											}

											.dot {
												width: 16rpx;
												height: 16rpx;
												border-radius: 50%;
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

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
		}
	}
</style>
