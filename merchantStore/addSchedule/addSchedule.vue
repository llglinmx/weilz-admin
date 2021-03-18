<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="添加排班表"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">员工</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择员工</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">预约时间间隔</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="示例:30" />
							<text>分钟</text>
						</view>
					</view>
				</view>
			</view>

			<view class="box-content-main">
				<view class="box-content-main-calendar">

				</view>
				<view class="box-content-main-schedule-list">
					<view class="box-content-main-schedule-list-li" v-for="(item,index) in dataList" :key="index">
						<view class="box-content-main-schedule-list-li-title">{{item.title}}<text>{{item.number}}</text>
						</view>
						<view class="box-content-main-schedule-list-li-wrap">
							<view class="schedule-list-li-wrap-item" v-for="(i,j) in item.data" :key="j">
								<view class="schedule-list-li-wrap-item-add flex-center" @click="addTime(index,j)">
									<text class="iconfont iconjia icon-font"
										style="color: #ccc;font-size: 28rpx"></text>
								</view>
								<view class="schedule-list-li-wrap-item-text flex-center">
									<text class="iconfont iconshizhong icon-font"
										style="color: #ccc;font-size: 40rpx;margin-top: 4rpx;"></text>
									<text v-if="i.startTime!=''">{{i.startTime}}</text>
									<text v-else style="color: #999;">开始时间</text>
								</view>
								<view class="schedule-list-li-wrap-item-connect flex-center">
									<text class="iconfont iconjian icon-font"
										style="color: #ccc;font-size: 24rpx"></text>
								</view>
								<view class="schedule-list-li-wrap-item-text flex-center">
									<text class="iconfont iconshizhong icon-font"
										style="color: #ccc;font-size: 40rpx;margin-top: 4rpx;"></text>
									<text v-if="i.endTime!=''">{{i.endTime}}</text>
									<!-- <text v-else style="color: #999;">结束时间</text> -->
									<text>{{i.random}}</text>
								</view>
								<view class="schedule-list-li-wrap-item-del flex-center">
									<text class="iconfont iconcuowu icon-font"
										style="color: #ccc;font-size: 52rpx"  @click="deleteTime(index,j)" :style="{display:j==0?'none':'block'}"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="确认提交" @btnClick="confirm" />
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				dataList: [{
						title: "周一",
						number: "01/08/15/22/29",
						data: [{
							startTime: '',
							endTime: ''
						}, ],
					},
					{
						title: "周二",
						number: "02/09/16/23/30",
						data: [{
							startTime: '',
							endTime: ''
						}, ],
					},
					{
						title: "周三",
						number: "03/10/17/24",
						data: [{
							startTime: '',
							endTime: ''
						}, ],
					},
					{
						title: "周四",
						number: "04/11/18/25",
						data: [{
							startTime: '',
							endTime: ''
						}, ],
					},
					{
						title: "周五",
						number: "06/13/20/27",
						data: [{
							startTime: '',
							endTime: ''
						}, ],
					},
					{
						title: "周六",
						number: "06/13/20/27",
						data: [{
							startTime: '',
							endTime: ''
						}, ],
					}, {
						title: "周日",
						number: "07/14/21/28",
						data: [{
							startTime: '',
							endTime: ''
						}, ],
					},
				],
			};
		},
		components: {
			navTitleBalck,
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
			// 添加日程安排时间
			addTime(index, idx) {
				// index 第一级下标 idx 第二级下标
				let str = {
					startTime: '',
					endTime: '',
					random: Math.floor(Math.random() * (100))
				}
				this.dataList[index].data.splice(idx+1, 0, str) // 当前点击的后一位添加

			},

			// 删除添加的日程时间
			deleteTime(index, idx) {
				if (this.dataList[index].data.length <= 1) {
					uni.showToast({
						title: "不能再删了，至少保留一个",
						icon: "none"
					})
					return false;
				}
				this.dataList[index].data.splice(idx, 1) // 当前点击位置删除
			},

			// 确认按钮
			confirm() {
				uni.showToast({
					title: "确认提交",
					icon: "none"
				})
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
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;


			.box-content-list {
				margin-top: 20rpx;
				padding-left: 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-list-li:last-child {
					border-bottom: 0;
				}

				.box-content-list-li {
					display: flex;
					align-items: center;
					height: 100rpx;
					padding-right: 40rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ededed;

					.box-content-list-li-title {
						width: 180rpx;
						font-size: 28rpx;
						color: #333;
					}

					.box-content-list-li-info {
						margin-left: 80rpx;
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.box-content-list-li-info-text {
							font-size: 28rpx;
							color: #000;
						}

						.box-content-list-li-info-more {}

						.box-content-list-li-info-input {
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: space-between;

							input {
								flex: 1;
								height: 100%;
								font-size: 28rpx;
							}

							text {
								margin-left: 10rpx;
								font-size: 28rpx;
								color: #333;
							}
						}
					}
				}
			}

			.box-content-main {
				padding: 0 40rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
				background: #fff;

				.box-content-main-calendar {
					height: 700rpx;
				}

				.box-content-main-schedule-list {
					padding-bottom: 30rpx;

					.box-content-main-schedule-list-li {
						.box-content-main-schedule-list-li-title {
							padding: 30rpx 0;
							display: flex;
							align-items: center;
							font-size: 32rpx;
							color: #333;

							text {
								margin-left: 20rpx;
								font-size: 30rpx;
							}
						}

						.box-content-main-schedule-list-li-wrap {
							.schedule-list-li-wrap-item:first-child {
								margin-top: 0;
							}

							.schedule-list-li-wrap-item {
								display: flex;
								align-items: center;
								margin-top: 20rpx;

								.schedule-list-li-wrap-item-add {
									width: 40rpx;
									height: 40rpx;
									border: 2rpx solid #CCCCCC;
									border-radius: 10rpx;
								}

								.schedule-list-li-wrap-item-text {
									display: flex;
									align-items: center;
									width: 250rpx;
									height: 80rpx;
									margin: 0 20rpx;
									border: 2rpx solid #EDEDED;
									border-radius: 10rpx;
									font-size: 28rpx;

									.icon-font {
										margin-right: 10rpx;
									}
								}

								.schedule-list-li-wrap-item-connect {}

								.schedule-list-li-wrap-item-del {
									width: 40rpx;
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
