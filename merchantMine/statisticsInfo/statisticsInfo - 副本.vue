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
									<view class="box-content-main-item flex-center" v-for="(item,index) in screenList"
										@click="screenClick(index)">
										<text class="box-content-main-item-title">{{item.name}}</text>
										<text class="iconfont iconxiangxiajiantou icon-font"
											style="color: #fff;font-size: 28rpx"
											:style="{transform:item.isCheck?'rotate(180deg)':'rotate(0deg)'}"></text>
									</view>
								</view>

								<view class="box-content-statistical-chart">
									<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line"
										ref="lineChart"></mpvue-echarts>
								</view>
								<view class="box-content-data" @>
									<view class="box-content-data-title">
										<view class="box-content-data-title-item flex-center">{{storeList.length}}家门店
										</view>
										<view class="box-content-data-title-item flex-center">总收入金额(元)</view>
										<view class="box-content-data-title-item flex-center">订单量(单)</view>
									</view>
									<view class="box-content-data-list">
										<view class="box-content-data-list-li" v-for="(item,index) in storeList"
											:key='item.id' @click="storeDetail(item.id)">
											<view class="box-content-data-list-li-item flex-center">
												<text style="margin-left: 10rpx;">{{item.name}}</text>
											</view>
											<view class="box-content-data-list-li-item flex-center">{{item.order_sum}}
											</view>
											<view class="box-content-data-list-li-item">
												<text>258</text>
												<text class="iconfont icongengduo icon-font"
													style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
											</view>
										</view>
									</view>
								</view>
								<view class="box-content-data-drop-down" :style="{height:open?'500rpx':'0'}">
									<view class="box-content-data-drop-down-li" v-for="(item,index) in downList"
										:class="item.isCheck?'box-content-data-drop-down-li-active':''"
										@click="checkChange(index)">
										{{item.name}}
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
				open: false,
				updateStatus: false,
				echarts: echarts,
				storeList: [],
				technicianList: [],
				downList: [],
				screenList: [{
						name: '本周',
						isCheck: false
					},
					{
						name: '全部门店',
						isCheck: false
					},
					{
						name: '总收入',
						isCheck: false
					},
				],
				storeMenuList1: [{
						name: '本周',
						isCheck: false
					},
					{
						name: '本月',
						isCheck: false
					},
				],
				storeMenuList2: [{
					name: '全部门店',
					isCheck: false,
					id: ''
				}, ],
				storeMenuList3: [{
					name: '总收入',
					isCheck: false,
					id: ''
				}, {
					name: '月收入',
					isCheck: false,
					id: ''
				}, ],

				screenIndex: -1,
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
						boundaryGap: false, //x轴两边不留空白
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value',
					},
					calculable: false,
					grid: {
						top: '5%',
						left: '0',
						right: '5%',
						bottom: '0',
						containLabel: true,
						height: "90%"
					},

					series: [{
							type: 'line',
							smooth: true,
							data: [125, 200, 362, 369, 358, 159, 258],
							color: ['#5DBDFE'], //折线条的颜色
						},
						{
							type: 'line',
							smooth: true,
							data: [500, 632, 360, 258, 852, 254, 369],
							color: ['#FF8366'], //折线条的颜色
						},
						{
							type: 'line',
							smooth: true,
							data: [300, 35, 584, 365, 752, 853, 654],
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
			this.getStoreStatistics()
			this.getTechnicianStatistics()


		},

		methods: {

			// 门店 顶部筛选点击
			screenClick(index) {

				if (this.screenList[index].isCheck) {
					this.screenList[index].isCheck = false
				} else {
					this.screenList[index].isCheck = true
				}

				// this.screenList[index].isCheck = !this.screenList[index].isCheck

				this.open = this.screenList[index].isCheck ? true : false

				// if (this.screenIndex != index) {
				// 	this.open = true
				// } else {
				// 	this.open = false
				// }


				if (index == 0) {
					this.downList = this.storeMenuList1
				} else if (index == 1) {
					this.downList = this.storeMenuList2
				} else if (index == 2) {
					this.downList = this.storeMenuList3
				}
				this.screenIndex = index
			},

			// 选择
			checkChange(index) {
				if (this.screenIndex == 0) {
					this.storeMenuList1.forEach(item => {
						item.isCheck = false
					})
					this.storeMenuList1[index].isCheck = true

					this.screenList.forEach(item => {
						item.isCheck = false
					})
					// this.screenList[this.screenIndex].isCheck = true
					this.screenList[this.screenIndex].name = this.storeMenuList1[index].name
				} else if (this.screenIndex == 1) {
					this.storeMenuList2.forEach(item => {
						item.isCheck = false
					})
					this.storeMenuList2[index].isCheck = true
					this.screenList.forEach(item => {
						item.isCheck = false
					})
					// this.screenList[this.screenIndex].isCheck = true
					this.screenList[this.screenIndex].name = this.storeMenuList2[index].name
				} else if (this.screenIndex == 2) {
					this.storeMenuList3.forEach(item => {
						item.isCheck = false
					})
					this.storeMenuList3[index].isCheck = true

					this.screenList.forEach(item => {
						item.isCheck = false
					})
					// this.screenList[this.screenIndex].isCheck = true
					this.screenList[this.screenIndex].name = this.storeMenuList3[index].name
				}
				this.open = false
			},

			// 
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

			//获取门店统计信息
			getStoreStatistics() {
				this.apiget('api/v1/store/statistics/store_census', {}).then(res => {
					if (res.status == 200) {
						this.storeList = res.data.list
						res.data.list.map(item => {
							var str = {
								name: item.name,
								isCheck: false,
								id: item.id
							}
							this.storeMenuList2.push(str)

							// 初始赋值
							this.screenList[0].name = this.storeMenuList1[0].name
							this.storeMenuList1[0].isCheck = true

							this.screenList[1].name = this.storeMenuList2[0].name
							this.storeMenuList2[0].isCheck = true

							this.screenList[2].name = this.storeMenuList3[0].name
							this.storeMenuList3[0].isCheck = true

						})

					}
				});
			},
			//获取技师统计信息
			getTechnicianStatistics() {
				this.apiget('api/v1/store/Statistics', {}).then(res => {
					if (res.status == 200) {
						this.technicianList = res.data.list
						res.data.list.map(item => {
							var str = {
								name: item.name,
								isCheck: false,
								id: item.id
							}

						})

					}
				});
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
							width: 120rpx !important;
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
								position: relative;
								display: flex;
								flex-direction: column;
								// height: 100;

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

										.box-content-main-item-title {
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
										}

										.icon-font {
											transition: 0.3s;
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
											padding: 20rpx 0;
											// height: 88rpx;
											background: #f7f7f7;

											.box-content-data-list-li-item {
												display: flex;
												align-items: center;
												justify-content: center;
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


								.box-content-data-drop-down {
									position: absolute;
									top: 76rpx;
									left: 0;
									width: 100%;
									background: #fff;
									transition: 0.3s;
									overflow-y: scroll;
									box-shadow: 0rpx 1rpx 1rpx #999;

									.box-content-data-drop-down-li {
										display: flex;
										align-items: center;
										justify-content: center;
										padding: 0 20rpx;
										font-size: 28rpx;
										height: 80rpx;
									}

									.box-content-data-drop-down-li-active {
										background: #eee;
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
