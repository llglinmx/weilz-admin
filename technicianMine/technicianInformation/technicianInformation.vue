<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-nav-back" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-nav-title">技师信息</view>
				<view class="box-head-nav-text">编辑信息</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap-info">
				<view class="box-content-wrap-info-user">
					<view class="box-content-wrap-info-user-image">
						<image src="../../static/images/001.png" mode="aspectFill"></image>
						<view class="box-content-wrap-info-user-image-toast">
							<text class="iconfont icontupian icon-font"
								style="color: #fff;font-size: 24rpx;margin-top: 4rpx;"></text>
							<text style="margin-left: 8rpx;">4</text>
						</view>
					</view>
					<view class="box-content-wrap-info-user-main">
						<view class="info-user-main-text">
							<view class="info-user-main-text-title">王二麻子</view>
							<view class="info-user-main-text-msg">【金牌技师】</view>
						</view>
						<view class="info-user-main-score">
							<text class="iconfont iconwujiaoxing icon-font" style="color: #FFCD4D;font-size: 28rpx;"
								v-for="item in 5"></text>
							<text>5分</text>
						</view>
						<view class="info-user-main-user-info">
							<text>女</text>
							<text>年龄</text>
							<text>2年工龄</text>
						</view>
						<view class="info-user-main-text">手机号码：13312584596</view>
						<view class="info-user-main-text">邮箱地址：1007@163.com</view>
					</view>
				</view>
				<view class="box-content-wrap-info-text">
					语言技能：中文、韩文、英文
				</view>
				<view class="box-content-wrap-info-text">兴趣爱好：书法</view>
				<view class="box-content-wrap-info-text">执照ID：<text style="color: #26BF82;">查看图片</text></view>
			</view>

			<view class="box-content-store">
				<view class="box-content-store-title">所属门店</view>
				<view class="box-content-store-list">
					<view class="box-content-store-list-text">
						<text class="iconfont iconmendian icon-font" style="color:#26BF82;font-size: 28rpx"></text>
						<text style="font-weight: 500;color: #000;margin-left: 20rpx;">罗约蓝池·温泉SPA</text>
					</view>
					<view class="box-content-store-list-more">
						<text class="iconfont icongengduo icon-font"
							style="color: #B3B3B3;font-size: 28rpx;margin-top: 4rpx;"></text>
					</view>
				</view>
				<view class="box-content-store-list">
					<view class="box-content-store-list-text">
						<text class="iconfont icondingwei1 icon-font" style="color:#26BF82;font-size: 40rpx"></text>
						<text style="color: #333;margin-left: 20rpx;">中国 福建省 厦门市 集美区 杏滨路罗约酒店负一楼</text>
					</view>
					<view class="box-content-store-list-more">
						<text class="iconfont icongengduo icon-font"
							style="color: #B3B3B3;font-size: 28rpx;margin-top: 4rpx;"></text>
					</view>
				</view>
			</view>

			<view class="box-content-types-of-services">
				<view class="box-content-types-of-services-title">服务种类</view>
				<view class="box-content-types-of-services-list">
					<view class="box-content-types-of-services-list-li" v-for="(item,index) in 10" :key="index">背部按摩
					</view>
				</view>
			</view>

			<view class="box-content-work-record">
				<view class="box-content-work-record-title">工作记录</view>
				<view class="box-content-work-record-list">
					<view class="box-content-work-record-list-li" v-for="(item,index) in 5">
						<view class="box-content-work-record-list-li-time">2019.04.01 - 2019.08.31</view>
						<view class="box-content-work-record-list-li-text">
							<text>The prime泰鼎盛</text>
							<text>按摩技师</text>
						</view>
					</view>
				</view>
			</view>
			<view class="box-content-type-list">
				<view class="box-content-type-list-li">
					<view class="box-content-type-list-li-text">体检报告</view>
					<view class="box-content-type-list-li-more">
						<text class="iconfont icongengduo icon-font"
							style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
					</view>
				</view>
				<view class="box-content-type-list-li">
					<view class="box-content-type-list-li-text">银行卡信息</view>
					<view class="box-content-type-list-li-more">
						<text class="iconfont icongengduo icon-font"
							style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
					</view>
				</view>
			</view>
		</view>
	</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
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
			background-color: #fff;

			.box-head-nav {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
				box-sizing: border-box;
				height: 88rpx;

				.box-head-nav-back {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 50rpx;
					height: 50rpx;
				}

				.box-head-nav-title {
					margin-left: 30rpx;
					flex: 1;
					font-size: 34rpx;
					color: #000;
					text-align: center;
				}

				.box-head-nav-text {
					margin-right: 10rpx;
					font-size: 30rpx;
					color: #26BF82;
				}

			}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-wrap-info {
				padding: 20rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-wrap-info-user {
					display: flex;
					margin-bottom: 40rpx;

					.box-content-wrap-info-user-image {
						position: relative;
						display: flex;
						align-items: center;

						image {
							width: 256rpx;
							height: 256rpx;
						}

						.box-content-wrap-info-user-image-toast {
							display: flex;
							align-items: center;
							justify-content: center;
							position: absolute;
							bottom: 10rpx;
							right: 10rpx;
							width: 85rpx;
							height: 44rpx;
							background: rgba(0, 0, 0, 0.4);
							border-radius: 24rpx;
							color: #fff;
							font-size: 24rpx;
						}
					}

					.box-content-wrap-info-user-main {
						margin-left: 20rpx;
						flex: 1;

						.info-user-main-text {
							display: flex;
							align-items: baseline;

							.info-user-main-text-title {
								font-size: 36rpx;
								font-weight: 500;
								color: #000;
							}

							.info-user-main-text-msg {
								font-size: 28rpx;
								color: #FF8366;
							}
						}

						.info-user-main-score {
							margin: 20rpx 0;
							display: flex;
							align-items: center;

							text {
								margin-right: 6rpx;
							}
						}

						.info-user-main-user-info {
							margin-bottom: 20rpx;
							display: flex;
							font-size: 26rpx;
							color: #666;

							text:first-child {
								padding-left: 0;
							}

							text:last-child {
								border-right: 0;
							}

							text {
								display: block;
								padding: 0 20rpx;
								box-sizing: border-box;
								height: 26rpx;
								line-height: 26rpx;
								border-right: 1rpx solid #ededed;
							}
						}

						.info-user-main-text {
							font-size: 26rpx;
							color: #000;
						}
					}
				}

				.box-content-wrap-info-text {
					margin-bottom: 10rpx;
					font-size: 28rpx;
					color: #666;
				}

			}

			.box-content-store {
				padding: 0 40rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
				background: #fff;

				.box-content-store-title {
					padding-top: 30rpx;
					font-size: 32rpx;
					color: #000;
				}

				.box-content-store-list {
					padding: 30rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid #ededed;

					.box-content-store-list-text {
						display: flex;
						align-items: center;

						text {
							font-size: 28rpx;
						}

					}

					.box-content-store-list-more {
						margin-left: 20rpx;
					}
				}

				.box-content-store-list:last-child {
					border-bottom: 0;
				}
			}

			.box-content-types-of-services {
				padding: 0 40rpx;
				padding-bottom: 10rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
				background: #fff;

				.box-content-types-of-services-title {
					padding: 30rpx 0;
					font-size: 32rpx;
					color: #000;
				}

				.box-content-types-of-services-list {
					display: flex;
					flex-wrap: wrap;

					.box-content-types-of-services-list-li {
						margin-right: 20rpx;
						margin-bottom: 20rpx;
						padding: 10rpx 16rpx;
						border-radius: 3rpx;
						background: #F5F5F5;
						font-size: 28rpx;
						color: #666;
					}
				}
			}

			.box-content-work-record {
				margin-top: 20rpx;
				padding: 0 40rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-work-record-title {
					padding: 30rpx 0;
					font-size: 32rpx;
					color: #000;
				}

				.box-content-work-record-list {
					.box-content-work-record-list-li:first-child {
						margin-top: 0;
					}

					.box-content-work-record-list-li {
						margin-top: 40rpx;

						.box-content-work-record-list-li-time {
							font-size: 28rpx;
							color: #B3B3B3;
						}

						.box-content-work-record-list-li-text {
							display: flex;
							align-items: center;
							justify-content: space-between;

							text {
								color: #000;
							}

							text:nth-child(1) {
								font-size: 32rpx;
							}

							text:nth-child(2) {
								font-size: 28rpx;
							}
						}
					}
				}
			}

			.box-content-type-list {
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				padding-left: 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-type-list-li {
					padding: 32rpx 40rpx 32rpx 0;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid #ededed;

					.box-content-type-list-li-text {
						font-size: 32rpx;
						color: #000;
					}

					.box-content-type-list-li-more {}
				}

				.box-content-type-list-li:last-child {
					border-bottom: 0;
				}
			}


		}

	}
</style>
