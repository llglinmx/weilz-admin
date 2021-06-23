<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="预约日程"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list" :style="{display:isData?'block':'none'}">
				<view class="box-content-list-li" v-for="(item,index) in dataList">
					<view class="box-content-list-li-title">{{item.title}}</view>
					<view class="box-content-list-li-main" v-if="item.data.length!=0">
						<view class="list-li-main-item" v-for="(ele,j) in item.data"
							:class="ele.use_status==1?'bgColor':''">
							<view class="list-li-main-item-img">

							</view>
							<view class="list-li-main-item-info">
								<view class="list-li-main-item-info-wrap">
									<view class="list-li-main-item-info-wrap-li">
										<text class="iconfont iconshizhong icon-font" style="font-size: 28rpx;"></text>
										<text>{{ele.plan_start}}-{{ele.plan_end}}AM</text>
									</view>
									<view class="list-li-main-item-info-wrap-li">
										<text class="iconfont icon70BasicIcons-all-05 icon-font"
											style="font-size: 28rpx;"></text>
										<text>{{ele.name}} {{ele.mobile}}</text>
									</view>
									<view class="list-li-main-item-info-wrap-li">
										<text class="iconfont icondingdan1 icon-font" style="font-size: 28rpx;"></text>
										<text>{{ele.reserve_name}} {{changeData(ele.plan_start,ele.plan_end)}}</text>
									</view>
								</view>
							</view>
							<view class="list-li-main-item-name">

							</view>
							<view class="list-li-main-item-complete flex-center" v-if="ele.use_status==1">
								<text class="iconfont iconxuanzhong2" style="font-size: 40rpx;"></text>
							</view>
						</view>
					</view>
					<view class="box-content-list-li-main" v-if="item.data.length==0">
						<view class="box-content-list-li-main-msg">{{noMsg}}</view>
					</view>
				</view>
			</view>
			<view class="box-content-list" style="padding: 0;" :style="{display:!isData?'block':'none'}">
				<loading v-if="isLoad" />
				<no-data msg="暂无预约日程" v-if="!isLoad" />
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
				timeList: [],
				weekList: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
				year: '年',
				month: '月',
				day: '日',
				dataList: [],
				dataArr: {},
				msg: '分钟',
				isLoad: true,
				isData: false,
				noMsg: '该日期暂无任何预约',
				isDayMsg: '今天',
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

			this.getSchedulingInfo(data)

		},
		methods: {

			getSchedulingInfo(e) {
				this.apiget('api/v1/store/engineer/engineer_appointment_schedule', {
					engineer: e.id,
					date: (e.year + '-' + e.month + '-' + e.day),
				}).then(res => {
					if (res.status == 200) {
						var list = res.data
						this.isLoad = true

						var arr = []
						for (let key in list) {
							arr.push({
								title: this.dataChange(key) + ' ' + (this.isToday(key) ? this
									.isDayMsg : this.getweekday(key)),
								data: list[key]
							})
						}
						this.dataList = arr
						if (this.dataList.length != 0) {
							this.isData = true
						}
						this.isLoad = false
					}
				});
			},

			// 判断是否为今天
			isToday(str) {
				var d = new Date(str.replace(/-/g, "/"));
				var todaysDate = new Date();
				if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
					return true;
				} else {
					return false;
				}
			},

			dataChange(data) {
				let str = data.split('-')
				let date = str[0] + this.year + str[1] + this.month + str[2] + this.day
				return date
			},

			// 获取星期
			getweekday(date) {
				var weekArray = this.weekList;
				var week = weekArray[new Date(date).getDay()]; //注意此处必须是先new一个Date
				return week;
			},

			// 获取时长分钟
			changeData(start, end) {
				var spStart = start.split(':');
				var times1 = 60 * parseInt(spStart[0]) + parseInt(spStart[1])
				var spEnd = end.split(':');
				var times2 = 60 * parseInt(spEnd[0]) + parseInt(spEnd[1])
				let text = (times2 - times1) + '' + this.msg
				return text
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

			.box-content-list {
				padding: 0 30rpx;
				box-sizing: border-box;
				height: 100%;

				.box-content-list-li:last-child {
					margin-bottom: 30rpx;
				}

				.box-content-list-li {

					.box-content-list-li-title {
						display: flex;
						align-items: center;
						height: 100rpx;
						font-size: 32rpx;
						font-size: 500;
					}

					.box-content-list-li-main {
						display: flex;
						flex-direction: column;

						.bgColor {
							background: rgba(78, 196, 148, 0.1) !important;
							color: #4EC494 !important;
						}

						.list-li-main-item {
							position: relative;
							display: flex;
							align-items: center;
							min-height: 160rpx;
							padding: 20rpx 30rpx;
							margin-bottom: 20rpx;
							box-sizing: border-box;
							border-radius: 10rpx;
							background: rgba(248, 148, 148, 0.1);
							color: #FF6363;
							font-size: 28rpx;

							.list-li-main-item-img {}

							.list-li-main-item-info {
								flex: 1;
								margin: 0 20rpx;

								.list-li-main-item-info-wrap {
									.list-li-main-item-info-wrap-li {
										display: flex;
										align-items: center;

										.icon-font {
											margin-right: 10rpx;
										}
									}


								}
							}

							.list-li-main-item-name {}

							.list-li-main-item-complete {
								position: absolute;
								right: 20rpx;
								top: 10rpx;
								width: 50rpx;
								height: 50rpx;
							}

						}

						.list-li-main-item:last-child {
							margin-bottom: 0;
						}


						.box-content-list-li-main-msg {
							display: flex;
							align-items: center;
							justify-content: center;
							height: 160rpx;
							padding: 20rpx 30rpx;
							box-sizing: border-box;
							border-radius: 10rpx;
							background: rgba(248, 148, 148, 0.1);
							color: #FF6363;
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}
</style>
