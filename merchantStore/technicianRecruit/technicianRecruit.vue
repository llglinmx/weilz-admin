<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="技师招聘"></nav-title-balck>
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
									<view class="box-content-main-list-li" v-for="(item,index) in 10" :key="index">
										<view class="box-content-main-list-li-top">
											<view class="box-content-main-list-li-top-title">
												<view class="list-li-top-title-text">全职按摩师</view>
												<view class="list-li-top-title-msg">6000+抽成/月</view>
											</view>
											<view class="box-content-main-list-li-top-list">
												<view class="box-content-main-list-li-top-list-title">职位类别：</view>
												<view class="box-content-main-list-li-top-list-text">按摩师</view>
											</view>
											<view class="box-content-main-list-li-top-list">
												<view class="box-content-main-list-li-top-list-title">门店名称：</view>
												<view class="box-content-main-list-li-top-list-text">罗约蓝池·温泉SPA</view>
											</view>
											<view class="box-content-main-list-li-top-list">
												<view class="box-content-main-list-li-top-list-title">工作地点：</view>
												<view class="box-content-main-list-li-top-list-text">厦门</view>
											</view>
										</view>
										<view class="box-content-main-list-li-bottom">
											<view class="box-content-main-list-li-bottom-item flex-center">
												<text class="iconfont iconshanchu-shangjia icon-font" style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>删除</text>
											</view>
											<view class="box-content-main-list-li-bottom-item flex-center">
												<text class="iconfont iconyingpinjilu-shangjia icon-font" style="color: #4EC494;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>应聘记录</text>
											</view>
											<view class="box-content-main-list-li-bottom-item flex-center">
												<text class="iconfont iconbianji-shangjia icon-font" style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>编辑</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-seek">
								<view class="box-content-seek-screen">
									<view class="box-content-seek-screen-wrap" @click="seeKClick">
										<text class="iconfont iconshaixuan icon-font" style="color: #000;font-size: 36rpx;margin-top: 4rpx;"></text>
										<text>筛选</text>
									</view>
								</view>
								<view class="box-content-seek-list">
									<view class="box-content-seek-list-li" v-for="(item,index) in 20" :key="index">
										<view class="box-content-seek-list-li-image">
											<image src="../../static/images/userImage.png" mode="aspectFill"></image>
										</view>
										<view class="box-content-seek-list-li-info">
											<view class="box-content-seek-list-li-info-top">
												<view class="box-content-seek-list-li-info-top-text">
													<view class="box-content-seek-list-li-info-top-text-title">刘晨轩</view>
													<view class="box-content-seek-list-li-info-top-text-title-score">
														<text class="iconfont iconwujiaoxing icon-font" style="color: #FFCD4D;font-size: 28rpx;" v-for="item in 5"></text>
														<text>5分</text>
													</view>
												</view>
												<view class="box-content-seek-list-li-info-top-btn flex-center">查看简历</view>
											</view>
											<view class="box-content-seek-list-li-info-main-list" style="color: #636363;">
												<view class="seek-list-li-info-main-list-li">22岁</view>
												<view class="seek-list-li-info-main-list-li">高中</view>
												<view class="seek-list-li-info-main-list-li">厦门</view>
												<view class="seek-list-li-info-main-list-li">2年工龄</view>
											</view>
											<view class="box-content-seek-list-li-info-main-list" style="color: #999999;">
												<view class="seek-list-li-info-main-list-li">
													求职岗位：
													<text style="color: #333333;">按摩师</text>
												</view>
												<view class="seek-list-li-info-main-list-li">
													期望薪资：
													<text style="color: #333333;">8000</text>
												</view>
											</view>
											<view class="box-content-seek-list-li-info-main-list" style="color: #999999;">
												<view class="seek-list-li-info-main-list-li">
													掌握技能：
													<text style="color: #333333;">足底按摩/背部按摩/泰式古法按摩</text>
												</view>

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
		<view class="box-footer" :class="defaultIndex==1?'box-footer-active':''">
			<btn-sky-blue btnName="发布新招聘" @btnClick="release" />
		</view>
		<popup-layer ref="popupRef" :direction="'left'" v-model="boolShow">
			<view class="zidingyiBox">
				<view class="popup-head" :style="{paddingTop:barHeight+'px'}">
					<text  @click="seekBack"  class="iconfont iconfanhui icon-font" style="color: #333;font-size: 36rpx;margin-top: 4rpx;"></text>
					<text class="popup-head-text">筛选</text>
				</view>
				<view class="popup-content">
					<view class="popup-content-main" v-for="(item,index) in seekList" :key="index">
						<view class="popup-content-main-title">{{item.title}}</view>
						<view class="popup-content-main-list">
							<view class="popup-content-main-list-li flex-center" v-for="(j,k) in item.data">{{j}}</view>
						</view>
					</view>
				</view>
				<view class="popup-footer">
					<view class="popup-footer-reset flex-center">重置</view>
					<view class="popup-footer-confirm flex-center">确认</view>
				</view>
			</view>
		</popup-layer>
	</view>
</template>

<script>
	import merchantTabs from "../../components/merchant-tabs/merchant-tabs.vue"
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import popupLayer from '../../components/popup-layer/popup-layer.vue';
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				tabsList: ["招聘信息", "寻找技师"],
				defaultIndex: 0, //当前滑动的页面
				boolShow: false, //筛选弹出层
				seekList: [{
						title: "岗位",
						data: ['不限', '按摩师', '足疗师', '针灸推拿']
					},
					{
						title: "学历要求",
						data: ['不限', '初中及以下', '中专/中技', '高中', '大专', '本科']
					},
					{
						title: "工龄",
						data: ['不限', '学徒', '1-2年', '3-4年', '5-6年', '6年以上']
					},
				]
			};
		},
		components: {
			merchantTabs,
			navTitleBalck,
			btnSkyBlue,
			popupLayer
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

			// 发布新招聘
			release() {
				uni.showToast({
					title: "发布新招聘",
					icon: "none"
				})
			},

			// 筛选点击
			seeKClick() {
				this.boolShow =true
				// this.$refs.popupRef.show() // 弹出
			},
			// 筛选关闭
			seekBack() {
				// this.$refs.popupRef.close() // 关闭
				this.boolShow =false
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
		overflow: hidden;

		.box-head {
			background-color: #fff;

			.box-head-tabs {}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;
			border-top: 1rpx solid #ededed;

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
								.box-content-main-list {
									padding: 0 20rpx;
									box-sizing: border-box;

									.box-content-main-list-li {
										margin-top: 20rpx;
										padding: 0 20rpx;
										box-sizing: border-box;
										background: #FFFFFF;
										border-radius: 20rpx;

										.box-content-main-list-li-top {
											padding: 30rpx 0;
											border-bottom: 1rpx solid #ededed;

											.box-content-main-list-li-top-title {
												margin-bottom: 30rpx;
												display: flex;
												align-items: center;
												justify-content: space-between;

												.list-li-top-title-text {
													font-size: 36rpx;
													color: #000;
												}

												.list-li-top-title-msg {
													font-size: 32rpx;
													color: #5DBDFE;
												}
											}

											.box-content-main-list-li-top-list {
												margin-top: 10rpx;
												display: flex;
												align-items: center;
												font-size: 28rpx;

												.box-content-main-list-li-top-list-title {
													color: #000;
												}

												.box-content-main-list-li-top-list-text {
													color: #999;
												}
											}

										}

										.box-content-main-list-li-bottom {
											display: flex;
											align-items: center;
											height: 88rpx;

											.box-content-main-list-li-bottom-item {
												flex: 1;
												font-size: 28rpx;
												color: #333;
											}
										}
									}
								}
							}

							.box-content-seek {
								display: flex;
								flex-direction: column;
								// height: calc(100% - 40rpx);
								height: 100%;
								background: #fff;

								.box-content-seek-screen {
									padding: 20rpx 20rpx 40rpx;
									box-sizing: border-box;

									.box-content-seek-screen-wrap {
										display: flex;
										align-items: center;
										justify-content: center;
										height: 72rpx;
										background: #F7F7F7;
										border-radius: 40rpx;
										font-size: 28rpx;
										color: #000;

										.icon-font {
											margin-right: 10rpx;
										}
									}
								}

								.box-content-seek-list {
									flex: 1;
									overflow-y: scroll;
									padding-left: 40rpx;
									box-sizing: border-box;
									background: #fff;

									.box-content-seek-list-li {
										display: flex;
										margin-bottom: 40rpx;

										.box-content-seek-list-li-image {
											image {
												width: 98rpx;
												height: 98rpx;
											}
										}

										.box-content-seek-list-li-info {
											padding-right: 40rpx;
											box-sizing: border-box;
											flex: 1;
											margin-left: 20rpx;
											padding-bottom: 40rpx;
											border-bottom: 1rpx solid #ededed;

											.box-content-seek-list-li-info-top {
												display: flex;
												align-items: center;
												justify-content: space-between;

												.box-content-seek-list-li-info-top-text {
													display: flex;
													align-items: center;

													.box-content-seek-list-li-info-top-text-title {
														font-size: 34rpx;
														font-weight: 500;
														color: #000;
													}

													.box-content-seek-list-li-info-top-text-title-score {
														margin-left: 20rpx;
														display: flex;
														align-items: center;

														text {
															margin-right: 6rpx;
															font-size: 24rpx;
															color: #999;
														}
													}
												}

												.box-content-seek-list-li-info-top-btn {
													width: 172rpx;
													height: 60rpx;
													background: #5DBDFE;
													border-radius: 30rpx;
													font-size: 28rpx;
													color: #fff;
												}
											}

											.box-content-seek-list-li-info-main-list {
												display: flex;
												flex-wrap: wrap;
												margin-top: 20rpx;

												.seek-list-li-info-main-list-li:first-child {
													padding-left: 0;
												}

												.seek-list-li-info-main-list-li:last-child {
													border-right: 0;
												}

												.seek-list-li-info-main-list-li {
													display: flex;
													align-items: center;
													height: 28rpx;
													padding: 0 20rpx;
													font-size: 26rpx;
													border-right: 1rpx solid #ccc;
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
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			transition: 0.3s;
		}

		.box-footer-active {
			padding: 0 !important;
			height: 0 !important;
		}

		.zidingyiBox {
			display: flex;
			flex-direction: column;

			width: 500rpx;
			height: 100%;
			background: #fff;

			.popup-head {
				margin-bottom: 20rpx;
				font-size: 34rpx;
				display: flex;
				align-items: center;
				padding: 0 40rpx;
				box-sizing: border-box;

				.icon-font {}

				.popup-head-text {
					display: flex;
					align-items: center;
					justify-content: center;
					flex: 1;
				}
			}

			.popup-content {
				padding: 0 40rpx;
				box-sizing: border-box;
				flex: 1;
				overflow-y: scroll;
				border-bottom: 1rpx solid #ededed;

				.popup-content-main {
					.popup-content-main-title {
						font-size: 36rpx;
						color: #000;
						padding: 40rpx 0;
						box-sizing: border-box;
					}

					.popup-content-main-list {
						display: flex;
						flex-wrap: wrap;

						.popup-content-main-list-li {
							width: 200rpx;
							height: 66rpx;
							margin-right: 20rpx;
							margin-bottom: 40rpx;
							background: #F7F8FA;
							border-radius: 40rpx;
							font-size: 26rpx;
							color: #333;
						}

						.popup-content-main-list-li:nth-child(2n) {
							margin-right: 0;
						}

						.popup-content-main-list-li-active {
							color: #fff;
							background: #5DBDFE;
						}
					}
				}
			}

			.popup-footer {
				padding: 0 40rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 120rpx;
				font-size: 32rpx;

				.popup-footer-reset {
					width: 198rpx;
					height:68rpx;
					background: #F7F7F7;
					border: 1px solid #666666;
					border-radius: 10rpx;
					color: #666;
				}

				.popup-footer-confirm {
					width: 200rpx;
					height: 70rpx;
					background: #5DBDFE;
					color: #fff;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
