<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="招聘信息"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-screen">
				<view class="box-content-screen-search">
					<text class="iconfont iconshaixuan icon-font" style="color: #000;font-size: 36rpx"></text>
					<text style="margin-left: 10rpx;">筛选</text>
				</view>
			</view>
			<view class="box-content-screen-main">
				<view class="box-content-screen-main-list">
					<view class="screen-main-list-li" v-for="(item,index) in 10" :key="index">
						<view class="screen-main-list-li-top">
							<view class="screen-main-list-li-top-title">全职按摩师</view>
							<view class="screen-main-list-li-top-text">6000+抽成/月</view>
						</view>
						<view class="screen-main-list-li-type">
							<view class="screen-main-list-li-type-item">学历不限</view>
							<view class="screen-main-list-li-type-item">3年以上</view>
						</view>
						<view class="screen-main-list-li-name">
							<view class="screen-main-list-li-name-title">
								厦门然选集美容美体有限公司
							</view>
							<view class="screen-main-list-li-name-more">
								<text class="iconfont icongengduo icon-font" style="color: #ccc;font-size: 28rpx;margin-top: 4rpx;"></text>
							</view>
						</view>
						<view class="screen-main-list-li-addresss">
							<text class="iconfont icondingwei1 icon-font" style="color: #B3B3B3;font-size: 26rpx;margin-top: 4rpx;"></text>
							<text style="margin-left: 10rpx;">思明区 观音山</text>
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
		methods: {

		}
	}
</script>

<style lang="scss">
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

			.box-content-screen {
				padding: 0 40rpx;

				.box-content-screen-search {
					margin: 20rpx 0;
					height: 72rpx;
					border-radius: 40rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #F7F7F7;
					font-size: 28rpx;
					color: #000;

					text {}
				}
			}

			.box-content-screen-main {
				flex: 1;
				overflow-y: scroll;

				.box-content-screen-main-list {
					padding-left: 40rpx;
					box-sizing: border-box;

					.screen-main-list-li:first-child {
						padding-top: 20rpx;
					}

					.screen-main-list-li {
						padding: 40rpx 40rpx 40rpx 0;
						box-sizing: border-box;
						border-bottom: 1rpx solid #ededed;

						.screen-main-list-li-top {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.screen-main-list-li-top-title {
								font-size: 36rpx;
								color: #000;
							}

							.screen-main-list-li-top-text {
								font-size: 32rpx;
								color: #26BF82;
							}
						}

						.screen-main-list-li-type {
							margin-top: 20rpx;
							display: flex;
							flex-wrap: wrap;

							.screen-main-list-li-type-item {
								padding: 10rpx 16rpx;
								box-sizing: border-box;
								margin-right: 10rpx;
								color: #666;
								font-size: 24rpx;
								background: #F7F7F7;
								border-radius: 5rpx;
							}
						}

						.screen-main-list-li-name {
							margin-top: 15rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.screen-main-list-li-name-title {
								font-size: 28rpx;
								color: #333;
							}

							.screen-main-list-li-name-more {}
						}

						.screen-main-list-li-addresss {
							margin-top: 10rpx;
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: #B3B3B3;
						}
					}
				}
			}
		}

		.box-footer {}
	}
</style>
