<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="客户详情"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-user">
				<view class="box-content-user-info">
					<view class="box-content-user-info-top">
						<view class="box-content-user-info-top-name">
							张女士
						</view>
						<view class="box-content-user-info-top-leval">
							<image src="../../static/images/grade-yellow.png" mode="aspectFill"></image>
							<text>钻石会员</text>
						</view>
					</view>
					<view class="box-content-user-info-bottom">
						上次到店 2020-12-20 18:40
					</view>
				</view>
				<view class="box-content-user-image">
					<image src="../../static/images/userImage.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="box-content-wrap">
				<view class="box-content-wrap-item" v-for="(item,index) in arrList" :key="index">
					<text>{{item.number}}</text>
					<text>{{item.title}}</text>
				</view>
			</view>
			<view class="box-content-man">
				<view class="box-content-man-item">
					<view class="box-content-man-item-title">手机号码：</view>
					<view class="box-content-man-item-text">13812345678</view>
				</view>
				<view class="box-content-man-item">
					<view class="box-content-man-item-title">消费金额：</view>
					<view class="box-content-man-item-text">280.00</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="box-footer-btn-del flex-center">删除客户</view>
			<view class="box-footer-btn-edit flex-center" @click="modify">修改资料</view>
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				arrList: [{
						title: '礼品卡',
						number: "12"
					},
					{
						title: '年卡',
						number: "25"
					},
					{
						title: '折扣券',
						number: "36"
					},
				],
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
			// 修改资料
			modify() {
				uni.navigateTo({
					url: "../customerEditer/customerEditer"
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

			.box-content-user {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-user-info {
					height: 116rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.box-content-user-info-top {
						flex: 1;
						display: flex;
						align-items: center;

						.box-content-user-info-top-name {
							font-size: 40rpx;
							color: #000;
						}

						.box-content-user-info-top-leval {
							display: flex;
							align-items: center;
							margin-left: 20rpx;

							image {
								width: 34rpx;
								height: 34rpx;
							}

							text {
								margin-left: 10rpx;
								font-size: 26rpx;
								color: #FF967D;
							}
						}
					}

					.box-content-user-info-bottom {
						font-size: 26rpx;
						color: #999;
					}
				}

				.box-content-user-image {
					image {
						width: 116rpx;
						height: 116rpx;
					}
				}
			}

			.box-content-wrap {
				margin: 20rpx 0;
				display: flex;
				height: 142rpx;
				background: #fff;

				.box-content-wrap-item {
					flex: 1;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					text:nth-child(1) {
						font-size: 36rpx;
						font-weight: 500;
						color: #000;
					}

					text:nth-child(2) {
						margin-top: 10rpx;
						font-size: 26rpx;
						color: #999;
					}
				}

				.box-content-wrap-item::after {
					position: absolute;
					top: 0;
					bottom: 0;
					right: 0;
					margin: auto;
					width: 1rpx;
					height: 82rpx;
					content: "";
					background: #ededed;
				}
			}

			.box-content-man {
				padding: 0 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-man-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 100rpx;
					font-size: 28rpx;
					color: #000;
					border-bottom: 1rpx solid #ededed;

					.box-content-man-item-title {}

					.box-content-man-item-text {}
				}

				.box-content-man-item:last-child {
					border-bottom: 0;
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
