<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="title"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-user">
					<view class="box-content-wrap-user-image">
						<image src="../../static/images/userImage.png" mode="aspectFill"></image>
					</view>
					<view class="box-content-wrap-user-text">张小小</view>
				</view>
			</view>
			<view class="box-content-list">
				<view class="box-content-list-li" v-for="(item,index) in timeList" :key="index">
					<view class="box-content-list-li-time">{{item.time}}</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-wrap">
							<view class="list-li-info-wrap-item" v-for="(i,j) in item.data"
								:class="[{bgColor:isTime(item.time,i.startTime,i.endTime)}]">
								<text class="iconfont iconshizhong icon-font" style="font-size: 28rpx;"></text>
								<text>{{i.startTime}}-{{i.endTime}}AM</text>
							</view>
							<view class="list-li-info-wrap-item" v-for="(i,j) in item.data">
								<text class="iconfont icon70BasicIcons-all-05 icon-font"
									style="font-size: 28rpx;"></text>
								<text>{{i.personnel}}</text>
							</view>
							<view class="list-li-info-wrap-item" v-for="(i,j) in item.data" :key="index">
								<text class="iconfont icondingdan1 icon-font" style="font-size: 28rpx;"></text>
								<text>{{i.content}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">

		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				title: '2021年02月12日预约日程',
				timeList: [{
						time: '09:00',
						data: [{
							startTime: '09:00',
							endTime: '09:30',
							personnel: '赵女士',
							content: '脸部护肤 30分钟'
						}, ]
					},
					{
						time: '09:30',
						data: [{
							startTime: '09:30',
							endTime: '10:30',
							personnel: '赵女士',
							content: '脸部护肤 60分钟'
						}, ]
					},
					{
						time: '10:00',
						data: [{
							startTime: '09:30',
							endTime: '10:30',
							personnel: '赵女士',
							content: '脸部护肤 60分钟'
						}, ]
					},
					{
						time: '10:30',
						data: [{
							startTime: '09:30',
							endTime: '10:30',
							personnel: '赵女士',
							content: '脸部护肤 60分钟'
						}, ]
					},
					{
						time: '11:00',
						data: [{
							startTime: '11:00',
							endTime: '13:30',
							personnel: '张女士',
							content: '脸部护肤 150分钟'
						}, ]
					},
					{
						time: '11:30',
						data: [{
							startTime: '11:00',
							endTime: '13:30',
							personnel: '张女士',
							content: '脸部护肤 150分钟'
						}, ]
					},
					{
						time: '12:00',
						data: [{
							startTime: '11:00',
							endTime: '13:30',
							personnel: '张女士',
							content: '脸部护肤 150分钟'
						}, ]
					},
					{
						time: '12:30',
						data: [{
							startTime: '11:00',
							endTime: '13:30',
							personnel: '张女士',
							content: '脸部护肤 150分钟'
						}, ]
					},
					{
						time: '13:00',
						data: [{
							startTime: '11:00',
							endTime: '13:30',
							personnel: '张女士',
							content: '脸部护肤 150分钟'
						}, ]
					},
					{
						time: '13:30',
						data: [{
							startTime: '11:00',
							endTime: '13:30',
							personnel: '张女士',
							content: '脸部护肤 150分钟'
						}, ]
					},
					{
						time: '14:00',
						data: [{
							startTime: '14:00',
							endTime: '14:30',
							personnel: '章女士',
							content: '脸部护肤 30分钟'
						}, ]
					},
					{
						time: '14:30',
						data: [{
							startTime: '14:00',
							endTime: '14:30',
							personnel: '章女士',
							content: '脸部护肤 30分钟'
						}, ]
					},
					{
						time: '15:00',
						data: [{
							startTime: '15:00',
							endTime: '16:30',
							personnel: '李女士',
							content: '脸部护肤 90分钟'
						}, ]
					},
					{
						time: '15:30',
						data: [{
							startTime: '15:00',
							endTime: '16:30',
							personnel: '李女士',
							content: '脸部护肤 90分钟'
						}, ]
					},
					{
						time: '16:00',
						data: [{
							startTime: '15:00',
							endTime: '16:30',
							personnel: '李女士',
							content: '脸部护肤 90分钟'
						}, ]
					},
					{
						time: '16:30',
						data: [{
							startTime: '15:00',
							endTime: '16:30',
							personnel: '李女士',
							content: '脸部护肤 90分钟'
						}, ]
					},
					{
						time: '17:00',
						data: [{
							startTime: '17:00',
							endTime: '18:30',
							personnel: '吴女士',
							content: '脸部护肤90分钟'
						}, ]
					},
					{
						time: '17:30',
						data: [{
							startTime: '17:00',
							endTime: '18:30',
							personnel: '吴女士',
							content: '脸部护肤90分钟'
						}, ]
					},
					{
						time: '18:00',
						data: [{
							startTime: '17:00',
							endTime: '18:30',
							personnel: '吴女士',
							content: '脸部护肤90分钟'
						}, ]
					},
					{
						time: '18:30',
						data: [{
							startTime: '17:00',
							endTime: '18:30',
							personnel: '吴女士',
							content: '脸部护肤90分钟'
						}, ]
					},
				]
			};
		},
		components: {
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
		onLoad(options) {
			var data = JSON.parse(options.data)
			this.title = data.year + '年' + data.month + '月' + data.day + "日预约日程"

			console.log(this.title)
		},
		methods: {
			isTime(initTime, state, end) {
				console.log(initTime, state, end)
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
				height: 100rpx;
				padding: 0 40rpx 0 150rpx;
				box-sizing: border-box;

				.box-content-wrap-user {
					display: flex;
					align-items: center;

					.box-content-wrap-user-image {
						display: flex;
						align-items: center;

						image {
							width: 64rpx;
							height: 64rpx;
						}
					}

					.box-content-wrap-user-text {
						margin-left: 20rpx;
						font-size: 32rpx;
						color: #000;
					}
				}
			}

			.box-content-list {
				flex: 1;
				overflow-y: scroll;
				padding: 0 40rpx;
				box-sizing: border-box;

				.box-content-list-li {

					display: flex;

					height: 160rpx;

					.box-content-list-li-time {
						width: 110rpx;
						font-size: 28rpx;
						color: #B3B3B3;
					}

					.box-content-list-li-info {
						flex: 1;
						padding: 20rpx;
						box-sizing: border-box;
						border-radius: 10rpx;
						
						// background: rgba(78,196,148,0.1);
						// color: #26BF81;
						
						background: rgba(248,148,148,0.1);
						color: #FF6363;

						.box-content-list-li-info-wrap {
							.list-li-info-wrap-item {

								display: flex;
								align-items: center;
								font-size: 26rpx;

								.icon-font {
									margin-right: 10rpx;
								}
							}
						}

					}
				}

				.list-li-margin-top {
					margin-top: 20rpx;
				}
			}

		}

		.box-footer {}
	}
</style>
