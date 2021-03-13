<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="日程安排"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-main">
				<view class="box-content-calendar">
					<calendar name="calendar" :defaultTime="time" :extraData="extraData" @calendarTap="calendarTap" @monthTap="monthTap" />
				</view>
				<view class="box-content-arrange">
					<view class="box-content-arrange-top">
						<view class="box-content-arrange-top-left">
							<text class="date">2021年02月12日</text>
							<text class="week">周五</text>
						</view>
						<view class="box-content-arrange-top-right">
							<text>查看当日预约</text>
							<text class="iconfont icongengduo icon-font" style="color: #26BF82;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
					<view class="box-content-arrange-text">门店名称：罗约蓝池·温泉SPA</view>
					<view class="box-content-arrange-text">上班时间：09:00-22:00</view>
				</view>
				<view class="box-content-cumulative">
					<view class="box-content-cumulative-tilte">当月累计</view>
					<view class="box-content-cumulative-bottom">
						<view class="box-content-cumulative-bottom-text">
							<text class="dot" style="background: #26BF82;"></text>
							<text class="msg">正常排班 24 天</text>
						</view>
						<view class="box-content-cumulative-bottom-text">
							<text class="dot" style="background: #FF8366;"></text>
							<text class="msg">休息班次 6 天</text>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import calendar from "../../components/tale-calendar/calendar.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				time: {
					year: 2020,
					month: 5
				},
				extraData: [{
						date: '2020-6-3',
						value: '签到',
						dot: true,
						active: true
					},
					{
						date: '2020-6-5',
						value: '未签到',
						dot: true,
						active: false
					},
					{
						date: '2020-7-3',
						value: '签到',
						dot: true,
						active: true
					}
				],
				month: {
					year: 2020,
					month: 6
				}, //当前年月
			};
		},
		components: {
			navTitleBalck,
			calendar
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
			calendarTap(e) {
				console.log(e);
			},
			monthTap(val) {
				let {
					year,
					month
				} = val;
				this.month = {
					year: year,
					month: month,
				}
				// 此处获取动态的数据，赋值给extraData
				this.extraData = [{
					date: '2020-11-3',
					value: '签到',
					dot: true,
					active: true
				}];
			}
		}
	}
</script>

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #f7f7f7;

		.box-head {
			background-color: #fff;

		}

		.box-content {
			flex: 1;
			overflow-y: scroll;


			.box-content-main {
				background: #fff;
				padding: 0 20rpx;
				box-sizing: border-box;
				margin-top: 20rpx;

				.box-content-calendar {}

				.box-content-arrange {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 208rpx;
					padding: 30rpx;
					box-sizing: border-box;
					border: 1rpx solid #26BF82;
					border-radius: 10px;
					background: #E8F8F1;

					.box-content-arrange-top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 30rpx;

						.box-content-arrange-top-left {
							font-size: 32rpx;
							font-weight: 500;
							color: #26BF82;

							.date {
								margin-right: 20rpx;
							}

							.week {}
						}

						.box-content-arrange-top-right {
							display: flex;
							align-items: center;
							font-size: 28rpx;
							color: #26BF82;

							.icon-font {
								margin-left: 10rpx;
							}
						}
					}

					.box-content-arrange-text {
						font-size: 28rpx;
						color: #000;
					}
				}

				.box-content-cumulative {
					padding: 40rpx 20rpx;
					box-sizing: border-box;

					.box-content-cumulative-tilte {
						margin-bottom: 30rpx;
						line-height: 32rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #333;
					}

					.box-content-cumulative-bottom {
						display: flex;
						align-items: center;

						.box-content-cumulative-bottom-text {
							flex: 1;
							display: flex;
							align-items: center;

							text {
								display: block;
							}

							.dot {
								width: 16rpx;
								height: 16rpx;
								margin-right: 10rpx;
								border-radius: 50%;
							}

							.msg {
								font-size: 28rpx;
								color: #333;
							}
						}
					}
				}
			}

		}

	}
</style>
