<!-- 滚动吸附效果演示 -->
<template>
	<view class="content-box">
		<!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
		<z-paging ref="paging" :auto-clean-list-when-reload="false" :auto-scroll-to-top-when-reload="false"
			:refresher-threshold="80" :use-custom-refresher="true" :touchmove-propagation-enabled='true'
			:refresher-status.sync="refresherStatus" @query="queryList" :list.sync="dataList" style="height: 100%;">

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
					<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" ref="lineChart">
					</mpvue-echarts>
				</view>
				<view class="box-content-data-title" style="z-index: 100;position: sticky;top :0;">
					<view class="box-content-data-title-item flex-center">{{totalNum }}家门店
					</view>
					<view class="box-content-data-title-item flex-center">总收入金额(元)</view>
					<view class="box-content-data-title-item flex-center">订单量(单)</view>
				</view>
				<view class="box-content-data" v-if="dataList.length>0">
					<view class="box-content-data-list">
						<view class="box-content-data-list-li" v-for="(item,index) in dataList" :key='item.id'
							@click="storeDetail(item.id)">
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
				<view class="box-content-data" v-if="dataList.length==0">
					<loading v-if="isLoad"></loading>
					<no-data v-if="dataList.length<=0&&!isLoad"></no-data>
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
	import * as echarts from '@/components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
	import loading from '../../components/loading-merchant/loading-merchant.vue'
	import noData from '../../components/no-data/no-data.vue'
	import zPaging from '../../components/z-paging/components/z-paging/z-paging.vue'
	export default {
		data() {
			return {
				totalNum: 0,
				isLoad: true,
				dataList: [],
				refresherStatus: 0,
				sum: 1,
				open: false,
				echarts: echarts,
				storeList: [],
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
					id: -1
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
			mpvueEcharts,
			loading,
			noData,
			zPaging,
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

			// 门店详情
			storeDetail(id) {
				uni.navigateTo({
					url: "../storeData/storeData?id=" + id
				})
			},

			queryList(pageNo, pageSize) {
				this.getStoreStatistics(pageNo, pageSize)
			},
			//获取门店统计信息
			getStoreStatistics(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
				}
				this.apiget('api/v1/store/statistics/store_census', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.list.length != 0) {
							this.storeList = res.data.list
							this.$refs.paging.addData(res.data.list)


							res.data.list.map(item => {
								var str = {
									name: item.name,
									isCheck: false,
									id: item.id
								}
								this.storeMenuList2.push(str)
							})

							this.screenList.forEach(item => {
								item.isCheck = false
							})

							var obj = {};
							this.storeMenuList2 = this.storeMenuList2.reduce(function(item, next) {
								obj[next.id] ? '' : obj[next.id] = true && item.push(next);
								return item;
							}, []);

							this.open = false
							this.totalNum = res.data.total_rows
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
					}

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
							text-align: center;

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
