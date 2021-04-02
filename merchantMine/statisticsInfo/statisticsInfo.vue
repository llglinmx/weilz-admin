<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-nav-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #fff;font-size: 36rpx;margin-top: 4rpx;"></text>
				</view>
				<view class="box-head-nav-list">
					<view class="box-head-nav-list-li flex-center" v-for="(item,index) in tabs" :key="index"
						@click="tabsClice(index)">
						{{item}}
						<text :class="defaultIndex==index?'text-active':''"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-main">
								<view class="box-content-main-content-tabs">
									<view class="box-content-main-item flex-center">
										<text>本周</text>
										<text class="iconfont iconxiangxiajiantou icon-font"
											style="color: #fff;font-size: 28rpx"></text>
									</view>
									<view class="box-content-main-item flex-center">
										<text>全部门店</text>
										<text class="iconfont iconxiangxiajiantou icon-font"
											style="color: #fff;font-size: 28rpx"></text>
									</view>
									<view class="box-content-main-item flex-center">
										<text>总收入</text>
										<text class="iconfont iconxiangxiajiantou icon-font"
											style="color: #fff;font-size: 28rpx"></text>
									</view>
								</view>

								<view class="box-content-statistical-chart">
									<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line"
										ref="lineChart"></mpvue-echarts>
								</view>
								<view class="box-content-data">
									<view class="box-content-data-title">
										<view class="box-content-data-title-item flex-center">7家门店</view>
										<view class="box-content-data-title-item flex-center">总收入金额(元)</view>
										<view class="box-content-data-title-item flex-center">订单量(单)</view>
									</view>
									<view class="box-content-data-list">
										<view class="box-content-data-list-li" v-for="(item,index) in 20"
											@click="storeDetail">
											<view class="box-content-data-list-li-item flex-center">
												{{index+1}}<text style="margin-left: 10rpx;">中山路店</text>
											</view>
											<view class="box-content-data-list-li-item flex-center">
												32158.41
											</view>
											<view class="box-content-data-list-li-item">
												<text>258</text>
												<text class="iconfont icongengduo icon-font"
													style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-main">
								<view class="box-content-main-content-tabs">
									<view class="box-content-main-item flex-center">
										<text>本周</text>
										<text class="iconfont iconxiangxiajiantou icon-font"
											style="color: #fff;font-size: 28rpx"></text>
									</view>
									<view class="box-content-main-item flex-center">
										<text>全部技师</text>
										<text class="iconfont iconxiangxiajiantou icon-font"
											style="color: #fff;font-size: 28rpx"></text>
									</view>
									<view class="box-content-main-item flex-center">
										<text>总收入</text>
										<text class="iconfont iconxiangxiajiantou icon-font"
											style="color: #fff;font-size: 28rpx"></text>
									</view>
								</view>
								<view class="box-content-statistical-chart">

								</view>
								<view class="box-content-data">
									<view class="box-content-data-title">
										<view class="box-content-data-title-item flex-center">20位技师</view>
										<view class="box-content-data-title-item flex-center">总收入(元)</view>
										<view class="box-content-data-title-item flex-center">预约次数</view>
									</view>
									<view class="box-content-data-list">
										<view class="box-content-data-list-li" v-for="(item,index) in 20"
											@click="technicianDetail">
											<view class="box-content-data-list-li-item flex-center">
												{{index+1}}<text style="margin-left: 10rpx;">王二麻子</text>
											</view>
											<view class="box-content-data-list-li-item flex-center">
												32158.41
											</view>
											<view class="box-content-data-list-li-item">
												<text>预约次数</text>
												<text class="iconfont icongengduo icon-font"
													style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
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

		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"

	import * as echarts from '@/components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				defaultIndex: 0, //默认当前显示界面
				tabs: ["门店统计", "技师统计"],
				updateStatus: false,
				echarts: echarts,
				line: {
					title: {
						text: 'ECharts 入门示例',
						subtext: '纯属虚构',
						x: 'center'
					},
					textStyle: {
						color: '#999', //配置文字颜色
						fontSize: '18',
					},
					// color: ['#5DBDFE', '#FF8366', '#FFDB3A'],
					legend: {
						data: ['订单数', '销售额', '新增用户'],
						show: true,
						bottom: '5%'
					},
					tooltip: {
						trigger: 'none',
						show: false,
					},
					xAxis: {
						type: 'category',
						data: ['10-12', '10-13', '10-14', '10-15', '10-16', '10-17', '10-18'],
						boundaryGap: false, //x轴两边不留空白

					},
					yAxis: {
						type: 'value',
					},
					calculable: false,
					grid: {
						top: '10%',
						left: '0',
						right: '5%',
						bottom: '0',
						containLabel: true,

					},

					series: [{
							type: 'line',
							smooth: true,
							data: [0.25, 0.28, 0.23, 0.08, 0.15, 0.42, 0.7],
							color: ['#5DBDFE'], //折线条的颜色
						},
						{
							type: 'line',
							smooth: true,
							data: [0.19, 0.4, 0.39, 0.21, 0.29, 0.59, 0.83],
							color: ['#FF8366'], //折线条的颜色
						},
						{
							type: 'line',
							smooth: true,
							data: [0.35, 0.58, 0.56, 0.38, 0.42, 0.76, 1],
							color: ['#FFDB3A'], //折线条的颜色
						}
					]
				}
			}
		},
		components: {
			navTitleBalck,
			mpvueEcharts
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

			lineInit(canvas, width, height) {
				let lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(lineChart)

				lineChart.setOption(this.line)

				return lineChart
			},



			//返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 门店详情
			storeDetail() {
				uni.navigateTo({
					url: "../storeData/storeData"
				})
			},
			// 技师详情
			technicianDetail() {
				uni.navigateTo({
					url: "../technicianDetails/technicianDetails"
				})
			},

			// 导航栏点击
			tabsClice(index) {
				this.defaultIndex = index
			},
			// 滑动切换列表
			tabChange(e) {
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

			.box-head-nav {
				display: flex;
				align-items: center;
				height: 88rpx;
				padding: 0 20rpx;

				.box-head-nav-back {
					width: 50rpx;
					height: 50;
				}

				.box-head-nav-list {
					padding: 0 140rpx;
					box-sizing: border-box;
					display: flex;
					flex: 1;

					.box-head-nav-list-li {
						position: relative;
						font-weight: 500;
						font-size: 34rpx;
						color: #fff;
						flex: 1;

						text {
							position: absolute;
							left: 0;
							right: 0;
							bottom: -10rpx;
							margin: auto;
							width: 0;
							height: 4rpx;
							background: #FFFFFF;
							border-radius: 3rpx;
							opacity: 0;
							transition: 0.5s;
						}

						.text-active {
							width: 80rpx !important;
							opacity: 1;
						}
					}
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
								display: flex;
								flex-direction: column;

								.box-content-main-content-tabs {
									height: 76rpx;
									display: flex;
									align-items: center;
									background: #5DBDFE;

									.box-content-main-item {
										display: flex;
										align-items: center;
										flex: 1;
										font-size: 28rpx;
										color: #fff;

										.icon-font {
											margin-left: 10rpx;
										}
									}
								}

								.box-content-statistical-chart {
									height: 596rpx;
									padding: 40rpx;
									box-sizing: border-box;
									background: #fff;
								}

								.box-content-data {
									display: flex;
									flex-direction: column;
									overflow-y: scroll;
									flex: 1;
									margin-top: 20rpx;

									.box-content-data-title {
										display: flex;
										align-items: center;
										height: 100rpx;
										background: #fff;

										.box-content-data-title-item:first-child {
											font-size: 32rpx;
											color: #000;
										}

										.box-content-data-title-item {
											flex: 1;
											font-size: 26rpx;
											color: #666;
										}
									}

									.box-content-data-list {
										flex: 1;
										overflow-y: scroll;
										margin-bottom: 40rpx;

										.box-content-data-list-li {
											display: flex;
											height: 88rpx;
											background: #f7f7f7;

											.box-content-data-list-li-item {
												display: flex;
												align-items: center;
												flex: 1;
												font-size: 28rpx;
												color: #333;

												text {}

												.icon-font {
													margin: 0 40rpx;
												}
											}

											.box-content-data-list-li-item:nth-child(2) {
												color: #5DBDFE;
											}

											.box-content-data-list-li-item:nth-child(3) {
												display: flex;
												align-items: center;
												justify-content: flex-end;
											}
										}


										.box-content-data-list-li:nth-child(2n) {
											background: #fff;
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
