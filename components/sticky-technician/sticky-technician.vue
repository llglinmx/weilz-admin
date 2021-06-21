<!-- 滚动吸附效果演示 -->
<template>
	<view class="content-box">
		<!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false"
			:refresher-threshold="80" :use-custom-refresher="true" :touchmove-propagation-enabled='true'
			:refresher-status.sync="refresherStatus" @query="queryList" :list.sync="dataList">
			<view class="box-content-main">
				<view class="box-content-main-content-tabs">
					<view class="box-content-main-item flex-center" v-for="(item,index) in screenList"
						@click="screenClick(index)">
						<text class="box-content-main-item-title">{{item.name}}</text>
						<text class="iconfont iconxiangxiajiantou icon-font" style="color: #fff;font-size: 28rpx"
							:style="{transform:item.isCheck?'rotate(180deg)':'rotate(0deg)'}"></text>
					</view>
				</view>

				<view class="box-content-statistical-chart">
					<l-echart ref="chart" />
				</view>
				<view class="box-content-data-title" style="z-index: 100;position: sticky;top :0;">
					<view class="box-content-data-title-item flex-center">{{totalNum}}位技师</view>
					<view class="box-content-data-title-item flex-center">总收入(元)</view>
					<view class="box-content-data-title-item flex-center">预约次数</view>
				</view>
				<view class="box-content-data" v-if="goodsList.length>0">
					<view class="box-content-data-list">
						<view class="box-content-data-list-li" v-for="(item,index) in goodsList" :key='item.id'
							@click="storeDetail(item.id)">
							<view class="box-content-data-list-li-item flex-center">
								<text style="margin-left: 10rpx;">{{item.name}}</text>
							</view>
							<view class="box-content-data-list-li-item flex-center">{{item.order_sum}}
							</view>
							<view class="box-content-data-list-li-item">
								<text>{{item.service_num}}</text>
								<text class="iconfont icongengduo icon-font"
									style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
							</view>
						</view>
					</view>

				</view>
				<view class="box-content-data" v-if="goodsList.length==0">
					<loading-merchant v-if="isLoad" />
					<no-data v-if="goodsList.length<=0&&!isLoad" />
				</view>
				<view class="box-content-data-drop-down" :style="{height:open?'560rpx':'0'}">
					<view class="box-content-data-drop-down-li" v-for="(item,index) in downList"
						:class="item.isCheck?'box-content-data-drop-down-li-active':''" @click="checkChange(index)">
						{{item.name}}
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import * as echarts from '../../uni_modules/lime-echart/components/lime-echart/echarts.js';
	import lEchart from '../../uni_modules/lime-echart/components/lime-echart/index.vue'

	export default {
		data() {
			return {
				totalNum: 0,
				isLoad: true,
				dataList: [],
				goodsList: [],
				refresherStatus: 0,
				id: '',
				type: 2,
				sum: 1,
				open: false,
				echarts: echarts,
				storeList: [],
				downList: [],
				option: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							// 坐标轴指示器，坐标轴触发有效
							type: 'line' // 默认为直线，可选为：'line' | 'shadow'
						},
						confine: true
					},
					legend: {
						data: ['热度', '正面', '负面']
					},
					grid: {
						left: 0,
						right: 10,
						bottom: 10,
						top: 10,
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: [0, 0, 0, 0, 0, 0, 0]
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [0, 0, 0, 0, 0, 0, 0],
						type: 'line',
						smooth: true
					}]
				},
				screenList: [{
						name: '本周',
						isCheck: false
					},
					{
						name: '全部技师',
						isCheck: false
					},
					{
						name: '总收入',
						isCheck: false
					},
				],
				storeMenuList1: [{
						name: '本周',
						isCheck: false,
						type: 2
					},
					{
						name: '本月',
						isCheck: false,
						type: 1
					},
				],
				storeMenuList2: [{
					name: '全部技师',
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

			}
		},
		components: {
			lEchart
		},
		onLoad() {

		},
		methods: {
			// 门店 顶部筛选点击
			screenClick(index) {

				if (this.screenList[index].isCheck) {
					this.screenList[index].isCheck = false
				} else {
					this.screenList[index].isCheck = true
				}


				this.open = this.screenList[index].isCheck ? true : false

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
					this.type = this.storeMenuList1[index].type

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
					this.id = this.storeMenuList2[index].id
					this.screenList.forEach(item => {
						item.isCheck = false
					})
					// this.screenList[this.screenIndex].isCheck = true
					this.screenList[this.screenIndex].name = this.storeMenuList2[index].name
					this.option.series = []
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
				this.getTechnicianStatistics(1, 20)
			},


			// 门店详情
			storeDetail(id) {
				uni.navigateTo({
					url: "../../merchantMine/technicianData/technicianData?id=" + id
				})
			},

			queryList(pageNo, pageSize) {
				this.getTechnicianStatistics(pageNo, pageSize)
				this.getTechnicianStatisticsTable(pageNo, pageSize)
			},
			//获取技师统计信息
			getTechnicianStatistics(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
					switch_type: 1,
					eid: this.id,
					type: this.type
				}
				this.apiget('api/v1/store/Statistics', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.length != 0) {
							this.storeList = res.data
							this.$refs.paging.addData(res.data)
							this.option.xAxis.data = []
							var arrs = []
							// 循环截取字符串
							res.data[0].date.forEach(e => {
								this.option.xAxis.data.push(e.slice(5))
							})
							res.data.map(item => {
								var s;
								var d = []
								item.data.forEach(ele => {
									s = {
										type: 'line',
										smooth: true,
										data: d,
										// color: ['#5DBDFE'], //折线条的颜色
									}
									d.push(ele == null ? 0 : ele)
								})
								arrs.push(s)

								var str = {
									name: item.name,
									isCheck: false,
									id: item.id
								}
								this.storeMenuList2.push(str)
							})
							this.option.series = arrs
	
							this.initEcharts()


							this.screenList.forEach(item => {
								item.isCheck = false
							})

							var obj = {};
							this.storeMenuList2 = this.storeMenuList2.reduce(function(item, next) {
								obj[next.id] ? '' : obj[next.id] = true && item.push(next);
								return item;
							}, []);


							this.open = false
						}
						if (this.sum == 1) { //只需加载一次
							// 初始赋值
							this.screenList[0].name = this.storeMenuList1[0].name
							this.storeMenuList1[0].isCheck = true

							this.screenList[1].name = this.storeMenuList2[0].name
							this.storeMenuList2[0].isCheck = true

							this.screenList[2].name = this.storeMenuList3[0].name
							this.storeMenuList3[0].isCheck = true
						}

						this.sum++
						this.isLoad = false
						// this.initEcharts()
					}
				});
			},

			getTechnicianStatisticsTable(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
					switch_type: 2
				}
				this.apiget('api/v1/store/Statistics', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.length != 0) {
							this.goodsList = res.data.list
							this.totalNum = res.data.total_rows
						}
					}
				});
			},

			// 初始化图表
			initEcharts() {
				this.$refs.chart.init(config => {
					const {
						canvas
					} = config;
					const chart = echarts.init(canvas, null, config);
					canvas.setChart(chart);
					chart.setOption(this.option);
					// 需要把 chart 返回
					return chart;
				});
			},
		}

	}
</script>

<style scoped lang="scss">
	.content-box {
		height: 100%;

		.box-content-main {
			position: relative;
			display: flex;
			flex-direction: column;
			height: 100%;

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

			.box-content-data-title {
				display: flex;
				align-items: center;
				height: 100rpx;
				background: #fff;
				margin-top: 20rpx;

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

			.box-content-data {
				display: flex;
				flex-direction: column;
				overflow-y: scroll;
				flex: 1;


				.box-content-data-list {
					flex: 1;
					overflow-y: scroll;

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
</style>
