<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="title"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<!-- <view class="box-content-wrap-item" v-for="(item,index) in dataList" :key='item.id'>
					<image :src="item.simg" mode=""></image>
					<text>{{item.name}}</text>
				</view> -->
			</view>
			<view class="box-content-list" :key='keyIndex'>
				<view class="box-content-list-li" v-for="(item,index) in timeList" :key='index'>
					<view class="box-content-list-li-time">{{item.time}}</view>
					<view class="box-content-list-li-main">
						<view class="box-content-list-li-main-item" v-for="(ele,idx) in item.data" :key='ele.id'
							:style="{marginBottom:isCheckChange(item.time,ele.endTime)?'20rpx':0,opacity:ele.isShow?'1':'0'}">
							<view class="list-li-main-item-li">
								<text class="iconfont icon-font iconshizhong" style="font-size: 28rpx;"></text>
								<text class="icon-text">{{ele.startTime}}-{{ele.endTime}}AM</text>
							</view>
							<view class="list-li-main-item-li">
								<text class="iconfont icon-font icon70BasicIcons-all-05"
									style="font-size: 28rpx;"></text>
								<text class="icon-text">赵女士</text>
							</view>
							<view class="list-li-main-item-li">
								<text class="iconfont icon-font icondingdan1" style="font-size: 28rpx;"></text>
								<text class="icon-text">脸部护肤 30分钟</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		timeList
	} from '../../static/js/publicFile.js'

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				title: '2021年02月12日预约日程',
				timeList: [],
				dataList: [],
				keyIndex: 0,
				dataArr: {}
			};
		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onLoad(options) {
			var data = JSON.parse(options.data)
			this.dataArr = data
			this.title = data.year + '年' + data.month + '月' + data.day + "日预约日程"

			this.initChange()
		},
		methods: {
			isCheck(status) {
				var bool = status == 1 ? true : false
				return bool
			},

			isCheckChange(initTime, end) {
				var bool = false
				if (initTime && end) {
					let spInit = initTime.split(':')
					let spEnd = end.split(':')
					if (spInit[0] == spEnd[0]) {
						bool = true
					}
				}


				return bool
			},

			isEnd(initTime, start, end) {
				let spInit = initTime.split(':')
				let spStart = start.split(':')
				if (spInit[0] == spStart[0]) {
					// bool = true
				}
				var bool = true
				return bool
			},

			// 初始获取时间
			initChange() {
				timeList.forEach(item => {
					var str = {
						time: item.time,
						data: [],
					}

					this.timeList.push(str)

				})
				this.getSchedulingInfo(this.dataArr)
			},

			getSchedulingInfo(e) {
				this.apiget('api/v1/store/engineer/engineer_schedule', {
					store: e.store,
					date: (e.year + '-' + e.month + '-' + e.day),
				}).then(res => {
					if (res.status == 200) {
						var list = res.data
						this.dataList = res.data
						if (list.length != 0) {




							for (var i = 0; i < this.timeList.length; i++) {
								this.timeList[i].data = list
								for (var j = 0; j < list.length; j++) {
									if (list[j].order_info.length != 0) {
										for (var k = 0; k < list[j].order_info.length; k++) {
											let init = this.timeChange(this.timeList[i].time)
											let start = this.timeChange(list[j].order_info[k].plan_start)
											let end = this.timeChange(list[j].order_info[k].plan_end)

											if (init >= start && init <= end) {
												console.log(i,j,k)
												
												this.timeList[i].data[j].startTime = list[j].order_info[k]
													.plan_start
												this.timeList[i].data[j].endTime = list[j].order_info[k].plan_end
												this.timeList[i].data[j].isShow = true
												this.timeList[i].data[j].status = list[j].order_info[k].use_status
											}
										}
									}

								}
							}
							this.keyIndex++

							console.log(this.timeList)




							// this.timeList.map(item => {
							// 	// console.log(item.time)
							// 	item.data = list

							// 	list.map(ele => {
							// 		if (ele.order_info.length != 0) {
							// 			ele.order_info.map(idx => {
							// 				let init = this.timeChange(item.time)
							// 				let start = this.timeChange(idx.plan_start)
							// 				let end = this.timeChange(idx.plan_end)
							// 				if (init >= start && init <= end) {
							// 					item.startTime = idx.plan_start
							// 					item.endTime = idx.plan_end
							// 					item.isShow = true
							// 					item.status = idx.use_status
							// 				}
							// 			})
							// 		}
							// 	})
							// })

						}
					}
				});
			},

			timeChange(item) {
				var t = item.split(':');
				var times = 60 * parseInt(t[0]) + parseInt(t[1])
				return times
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;

		.box-head {
			background-color: #fff;
		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.box-content-wrap {
				display: flex;
				align-items: center;
				width: 100%;
				height: 100rpx;

				.box-content-wrap-item {
					width: 360rpx;
					display: flex;
					margin-right: 20rpx;
					align-items: center;

					image {
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
					}

					text {
						font-size: 32rpx;
						color: #000;
					}
				}
			}

			.box-content-list {
				flex: 1;
				overflow-y: scroll;

				.box-content-list-li {
					display: -webkit-box;
					flex-direction: row;

					.box-content-list-li-time {
						width: 150rpx;
						height: 160rpx;
						text-align: center;
						font-size: 28rpx;
						color: #B3B3B3;
					}

					.box-content-list-li-main {
						display: -webkit-box;
						flex: 1;

						.box-content-list-li-main-item {
							padding: 20rpx;
							box-sizing: border-box;
							display: flex;
							flex-direction: column;
							justify-content: center;
							width: 360rpx;
							margin-right: 20rpx;
							background: rgba(248, 148, 148, 0.1);
							color: #FF6363;

							.list-li-main-item-li {
								display: flex;
								align-items: center;

								.icon-font {
									margin-right: 10rpx;
								}

								.icon-text {
									font-size: 26rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
