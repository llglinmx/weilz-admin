<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">房间管理</view>
				<view class="box-head-ico flex-center" @click="addRoom">
					添加房间
				</view>
			</view>
			<view class="box-head-tab">
				<view class="box-head-tab-item flex-center">
					<text>状态</text>
					<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx"></text>
				</view>
				<view class="box-head-tab-item flex-center">
					<text>类型</text>
					<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx"></text>
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-type">
						<view class="box-content-list-li-type-title">1F</view>
						<view class="box-content-list-li-type-title-state">
							<view class="box-content-list-li-type-title-state-item">
								<view class="list-li-type-title-state-item-dot" style="background:#26BF82;"></view>
								<view class="list-li-type-title-state-item-text">使用中</view>
							</view>
							<view class="box-content-list-li-type-title-state-item">
								<view class="list-li-type-title-state-item-dot" style="background: #5DBDFE;"></view>
								<view class="list-li-type-title-state-item-text">预约</view>
							</view>
							<view class="box-content-list-li-type-title-state-item">
								<view class="list-li-type-title-state-item-dot" style="background: #FF7167;"></view>
								<view class="list-li-type-title-state-item-text">故障</view>
							</view>
							<view class="box-content-list-li-type-title-state-item">
								<view class="list-li-type-title-state-item-dot" style="background: #B3B3B3;"></view>
								<view class="list-li-type-title-state-item-text">空闲</view>
							</view>
						</view>
					</view>
					<view class="box-content-list-li-main">
						<view class="box-content-list-li-main-item " :class="[{'border-color-4EC494':index === 0}, 
						 {'border-color-B3B3B3':index === 1},
						 {'border-color-5DBDFE':index === 2},
						 {'border-color-FF7167':index === 3}]"
						 v-for="(item,index) in 4" :key="index" @click="listClick(index)">
							<view class="box-content-list-li-main-item-text">1人</view>
							<view class="box-content-list-li-main-item-info">
								<image src="../../static/images/bed-use.png" mode="aspectFill" v-if="index==0"></image>
								<image src="../../static/images/bed-free.png" mode="aspectFill" v-if="index==1"></image>
								<image src="../../static/images/bed-about.png" mode="aspectFill" v-if="index==2"></image>
								<image src="../../static/images/bed-fault.png" mode="aspectFill" v-if="index==3"></image>
								<text>00:59:52</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="false">
		</uni-popup>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import UniPopup from "../../components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
			};
		},
		components: {
			navTitleBalck,
			UniPopup
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
			// 返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 添加房间
			addRoom() {
				uni.navigateTo({
					url: "../addRoom/addRoom"
				})
			},

			listClick() {
				this.$refs.popup.open()
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

			.box-head-nav {
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;
				height: 88rpx;

				.box-head-back {
					width: 50rpx;
				}

				.box-head-title {
					flex: 1;
					text-align: center;
					font-size: 34rpx;
					font-weight: 500;
					margin-left: 70rpx;
					color: #000;
				}

				.box-head-ico {
					text-align: left;
					font-size: 30rpx;
					width: 140rpx;
					color: #5DBDFE;
				}
			}

			.box-head-tab {
				height: 76rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.box-head-tab-item {
					flex: 1;
					font-size: 28rpx;
					color: #666;

					.icon-font {
						margin-left: 10rpx;
					}
				}
			}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-list {
				margin-top: 20rpx;
				background: #fff;

				.box-content-list-li {
					padding: 0 40rpx 30rpx;
					box-sizing: border-box;

					.box-content-list-li-type {
						padding: 30rpx 0;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.box-content-list-li-type-title {
							font-size: 36rpx;
							color: #333;
						}

						.box-content-list-li-type-title-state {
							display: flex;
							align-items: center;

							.box-content-list-li-type-title-state-item {
								display: flex;
								align-items: center;
								margin-right: 20rpx;

								.list-li-type-title-state-item-dot {
									width: 20rpx;
									height: 20rpx;
									border-radius: 4rpx;
								}

								.list-li-type-title-state-item-text {
									margin-left: 8rpx;
									font-size: 24rpx;
									color: #333;
								}
							}

							.box-content-list-li-type-title-state-item:last-child {
								margin-right: 0;
							}
						}
					}

					.box-content-list-li-main {
						display: flex;
						flex-wrap: wrap;

						.box-content-list-li-main-item {
							padding: 16rpx;
							box-sizing: border-box;
							width: 208rpx;
							height: 170rpx;
							border-radius: 16rpx;
							margin-right: 20rpx;
							margin-bottom: 20rpx;

							.box-content-list-li-main-item-text {
								font-size: 24rpx;
							}

							.box-content-list-li-main-item-info {
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;

								image {
									width: 82rpx;
									height: 60rpx;
								}

								text {
									font-size: 24rpx;
								}
							}
						}

						.box-content-list-li-main-item:nth-child(3n) {
							margin-right: 0;
						}

						.border-color-4EC494 {
							background: #F6FCFA;
							border: 1rpx solid #4EC494;
							color: #4EC494;
						}

						.border-color-B3B3B3 {
							background: #fff;
							border: 1rpx solid #B3B3B3;
							color: #B3B3B3;
						}

						.border-color-5DBDFE {
							background: #EDF8FE;
							border: 1rpx solid #5DBDFE;
							color: #5DBDFE;
						}

						.border-color-FF7167 {
							background: #FFF8F7;
							border: 1rpx solid #FF7167;
							color: #FF7167;
						}
					}



				}
			}
		}

	}
</style>
