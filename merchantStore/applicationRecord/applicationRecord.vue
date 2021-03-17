<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="应聘记录"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li" v-for="(item,index) in 20" :key="index">
					<view class="box-content-list-li-image">
						<image src="../../static/images/userImage.png" mode="aspectFill"></image>
					</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-top">
							<view class="box-content-list-li-info-top-title">王二麻子</view>
							<view class="box-content-list-li-info-top-text">2小时前 投递了简历</view>
						</view>
						<view class="box-content-list-li-info-text">应聘岗位：全职按摩师</view>
					</view>
				</view>
			</view>
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
			flex: 1;
			overflow-y: scroll;

			.box-content-list {
				margin-bottom: 40rpx;

				.box-content-list-li {
					display: flex;
					align-items: center;
					padding-left: 40rpx;
					box-sizing: border-box;

					.box-content-list-li-image {
						padding: 30rpx 0;
						display: flex;
						align-items: center;

						image {
							width: 88rpx;
							height: 88rpx;
						}
					}

					.box-content-list-li-info {
						flex: 1;
						display: flex;
						flex-direction: column;
						padding: 30rpx 40rpx 30rpx 0;
						margin-left: 20rpx;
						box-sizing: border-box;
						border-bottom: 1rpx solid #ededed;

						.box-content-list-li-info-top {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.box-content-list-li-info-top-title {
								font-size: 30rpx;
								color: #1B1B1B;
							}

							.box-content-list-li-info-top-text {
								font-size: 24rpx;
								color: #B3B3B3;
							}
						}

						.box-content-list-li-info-text {
							margin-top: 10rpx;
							font-size: 26rpx;
							color: #B3B3B3;
						}
					}
				}
			}
		}

	}
</style>
