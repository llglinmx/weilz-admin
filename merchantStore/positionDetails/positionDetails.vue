<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="职位详情" />
		</view>
		<view class="box-content">
			<view class="box-content-details">
				<view class="box-content-details-top">
					<view class="box-content-details-top-title">全职按摩师</view>
					<view class="box-content-details-top-text">6000+抽成/月</view>
				</view>
				<view class="box-content-details-list">
					<view class="box-content-details-list-li">五险一金</view>
					<view class="box-content-details-list-li">包吃</view>
					<view class="box-content-details-list-li">包住</view>
				</view>
				<view class="box-content-details-wrap">
					<view class="box-content-details-wrap-item">
						职位类别：<text>按摩师</text>
					</view>
					<view class="box-content-details-wrap-item">
						学历要求：<text>不限</text>
					</view>
					<view class="box-content-details-wrap-item">
						招聘人数：<text>20人</text>
					</view>
					<view class="box-content-details-wrap-item">
						工龄要求：<text>不限</text>
					</view>
					<view class="box-content-details-wrap-item">
						工作地点：<text>厦门</text>
					</view>
				</view>
			</view>
			<view class="box-content-text">
				<view class="box-content-text-title">职位描述</view>
				<view class="box-content-text-msg">人性化管理，高提成，高奖金，两个班次，客源稳定，挣钱看过来，生手免费培训，专业老师教学。</view>
			</view>
			<view class="box-content-introduce">
				<view class="box-content-introduce-title">门店介绍</view>
				<view class="box-content-introduce-text">
					门店名称：<text>罗约蓝池·温泉SPA</text>
				</view>
				<view class="box-content-introduce-address">
					<view class="box-content-introduce-address-icon">
						<text class="iconfont icondingwei1 icon-font" style="color: #26BF82;font-size: 40rpx"></text>
					</view>
					<view class="box-content-introduce-address-text">
						中国 福建省 厦门市 集美区
						杏滨路罗约酒店负一楼
					</view>
					<view class="box-content-introduce-address-more">
						<text class="iconfont icongengduo icon-font"
							style="color: #26BF82;font-size: 40rpx;margin-top: 4rpx;"></text>
					</view>
				</view>
				<view class="box-content-introduce-text">门店介绍</view>
				<view class="box-content-introduce-msg">
					水疗（SPA）这种休闲美容方式的历史很久远。在15世纪欧洲的比利时有一个被称之为SPAU的小山谷，山谷中有一个富含矿物质的热温泉旅游、疗养区，当时有许多贵族到这里来度假疗养这就是SPA最初的形式。18世纪后开始在欧洲贵族中风行开来，成为贵族们休闲度假、强身健体的首选，20世纪末在欧美民间社会又重新掀起了SPA热潮，并于21世纪初传入亚洲各国。
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="box-footer-btn-del flex-center">删除</view>
			<view class="box-footer-btn-edit flex-center" @click="modify">修改</view>
		</view>
	</view>
</template>

<script>
	import navTitleWhite from "../../components/nav-title-white/nav-title-white.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度

			};
		},
		components: {
			navTitleWhite
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
			// 修改资料
			modify() {

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
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-details {
				padding: 30rpx 40rpx 20rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-details-top {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.box-content-details-top-title {
						font-size: 48rpx;
						font-weight: 500;
						color: #000;
					}

					.box-content-details-top-text {
						font-size: 40rpx;
						font-weight: 500;
						color: #5DBDFE;
					}
				}

				.box-content-details-list {
					display: flex;
					flex-wrap: wrap;
					margin: 30rpx 0 20rpx 0;

					.box-content-details-list-li {
						padding: 10rpx 16rpx;
						margin-right: 10rpx;
						margin-bottom: 10rpx;
						background: #F7F8FA;
						border-radius: 5rpx;
						font-size: 24rpx;
						color: #666;
					}
				}

				.box-content-details-wrap {
					display: flex;
					flex-wrap: wrap;

					.box-content-details-wrap-item {
						width: 260rpx;
						margin-bottom: 20rpx;
						font-size: 28rpx;
						color: #999;

						text {
							color: #000;
						}
					}

					.box-content-details-wrap-item:nth-child(2n) {
						margin-left: 100rpx;
					}
				}
			}

			.box-content-text {
				margin-top: 20rpx;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-text-title {
					font-size: 36rpx;
					font-weight: 500;
					color: #000;
				}

				.box-content-text-msg {
					margin-top: 10rpx;
					line-height: 50rpx;
					font-size: 28rpx;
					color: #1A1A1A;
				}
			}

			.box-content-introduce {
				margin-top: 20rpx;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-introduce-title {
					font-size: 32rpx;
					font-weight: 500;
					color: #000;
				}

				.box-content-introduce-text {
					margin-top: 40rpx;
					font-size: 28rpx;
					color: #999;
					line-height: 32rpx;

					text {
						color: #000;
					}
				}

				.box-content-introduce-address {
					display: flex;
					align-items: center;
					padding: 30rpx 0;
					margin: 30rpx 0;
					border-top: 1rpx solid #ededed;
					border-bottom: 1rpx solid #ededed;

					.box-content-introduce-address-icon {}

					.box-content-introduce-address-text {
						margin: 0 40rpx 0 20rpx;
						flex: 1;
						font-size: 28rpx;
						color: #333333;
					}

					.box-content-introduce-address-more {}
				}

				.box-content-introduce-msg {
					margin-top: 30rpx;
					font-size: 28rpx;
					color: #333;
				}
			}
		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.box-footer-btn-del {
				width: 318rpx;
				height: 78rpx;
				background: #F7F7F7;
				border: 1rpx solid #666666;
				border-radius: 10rpx;
				font-size: 32rpx;
				color: #666;
			}

			.box-footer-btn-edit {
				width: 320rpx;
				height: 80rpx;
				background: #5DBDFE;
				border-radius: 10rpx;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
</style>
