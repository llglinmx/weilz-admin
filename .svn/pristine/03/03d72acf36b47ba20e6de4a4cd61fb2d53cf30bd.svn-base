<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-nav-back" @click="Gback">
					<text class="iconfont iconfanhui icon-font"
						style="color: #fff;font-size: 36rpx;margin-top: 4rpx;"></text>
				</view>
				<view class="box-head-nav-title">物流详情</view>
				<view class="box-head-nav-ico">
					<text class="iconfont iconfenxiang icon-font" style="color: #fff;font-size: 52rpx"></text>
				</view>
			</view>
			<view class="box-head-main">
				<view class="box-head-main-image">
					<image src="../../static/images/2.png" mode="aspectFill"></image>
					<text class="flex-center">共2件</text>
				</view>
				<view class="box-head-main-info">
					<view class="box-head-main-info-text">物流状态：运输中</view>
					<view class="box-head-main-info-text">物流公司：顺丰快递</view>
					<view class="box-head-main-info-text">快递单号：952482154465458</view>
				</view>
			</view>

		</view>
		<view class="box-content">
			<view class="box-content-main">
				<view class="box-content-main-list">
					<view class="box-content-main-list-li" v-for="(item,index) in dataList" :key="index">
						<view class="box-content-main-list-li-dot" :class="[{active:item.currentLocation}]"></view>
						<view class="box-content-main-list-li-text">{{item.text}}</view>
						<view class="box-content-main-list-li-time">{{item.time}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				dataList: [{
						text: '[广州市]广州市 等待空运装机 下一站厦门',
						time: '2021-01-15 14:00:00',
						currentLocation: true,
					},
					{
						text: '[[广州市]杨江县 集散中心已入库 下一站广州',
						time: '2021-01-15 14:00:00',
						currentLocation: false,
					},
					{
						text: '[广州市]杨江县 快递员已揽件',
						time: '2021-01-15 14:00:00',
						currentLocation: false,
					},
					{
						text: '包裹正在等待揽收',
						time: '2021-01-15 14:00:00',
						currentLocation: false,
					},
				]
			};
		},
		components: {

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
			//返回
			Gback() {
				uni.navigateBack({
					delta: 1
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
			background-color: #5DBDFE;

			.box-head-nav {
				display: flex;
				align-items: center;
				height: 88rpx;
				padding: 0 20rpx;
				box-sizing: border-box;

				.box-head-nav-back {
					width: 50rpx;
					display: flex;
					align-items: center;
				}

				.box-head-nav-title {
					flex: 1;
					color: #fff;
					font-size: 34rpx;
					font-weight: 500;
					text-align: center;
				}

				.box-head-nav-ico {
					padding-right: 10rpx;
					width: 50rpx;
					display: flex;
				}
			}

			.box-head-main {
				display: flex;
				align-items: center;
				padding: 20rpx 40rpx;
				box-sizing: border-box;

				.box-head-main-image {
					position: relative;
					display: flex;
					align-items: center;
					border-radius: 10rpx;
					overflow: hidden;

					image {
						width: 120rpx;
						height: 120rpx;
					}

					text {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 40rpx;
						background: rgba(0, 0, 0, 0.5);
						font-size: 24rpx;
						color: #fff;
					}
				}

				.box-head-main-info {
					height: 120rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20rpx;

					.box-head-main-info-text {
						// line-height: 26rpx;
						font-size: 26rpx;
						color: #fff;
					}
				}
			}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-main {
				margin-top: 20rpx;
				padding: 40rpx;
				box-sizing: border-box;
				background: url(../../static/images/wave-ico.png) #fff no-repeat;
				background-size: contain;

				.box-content-main-list {
					.box-content-main-list-li:last-child {
						border-left: 0;
						padding-bottom: 0;
					}

					.box-content-main-list-li {
						position: relative;
						border-left: 1rpx dashed #ccc;
						padding-bottom: 60rpx;
						padding-left: 50rpx;
						box-sizing: border-box;

						.box-content-main-list-li-dot {
							position: absolute;
							left: -14rpx;
							top: 10rpx;
							width: 24rpx;
							height: 24rpx;
							background: #E0E0E0;
							border-radius: 50%;
						}

						.box-content-main-list-li-text {
							font-size: 28rpx;
							color: #000;
						}

						.box-content-main-list-li-time {
							line-height: 24rpx;
							margin-top: 20rpx;
							font-size: 24rpx;
							color: #B3B3B3;
						}
					}

					.active {
						background: #5DBDFE !important;
					}
				}
			}
		}

		.box-footer {}
	}
</style>
