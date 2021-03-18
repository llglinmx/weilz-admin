<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">客户管理</view>
				<view class="box-head-ico flex-center">
					添加
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-search">
				<view class="box-content-search-box">
					<view class="box-content-search-box-ico" :class="isSearch?'box-content-search-box-ico-active':''">
						<text class="iconfont iconsousuo1 icon-font"
							style="color: #999;font-size: 40rpx;margin-top: 4rpx;"></text>
					</view>
					<view class="box-content-search-box-input"
						:class="isSearch?'box-content-search-box-input-active':''">
						<input type="text" @focus="focus" @blur="blur" placeholder="搜索用户名称" />
					</view>
				</view>
			</view>
			<view class="box-content-main">
				<view class="box-content-main-list">
					<view class="box-content-main-list-li" v-for="(item,index) in 20" :key="index"
						@click="customerDetail">
						<view class="box-content-main-list-li-image">
							<image src="../../static/images/userImage.png" mode="aspectFill"></image>
						</view>
						<view class="box-content-main-list-li-info">
							<view class="box-content-main-list-li-info-left">
								<view class="box-content-main-list-li-info-left-top">
									<view class="main-list-li-info-left-top-title">张女士</view>
									<view class="main-list-li-info-left-top-text">
										<image src="../../static/images/grade-yellow.png" mode=""></image>
										<text>钻石会员</text>
									</view>
								</view>
								<view class="box-content-main-list-li-info-left-bottom">
									<text>消费 259.00元</text>
									<text>上次到店 2020-12-20 18:40</text>
								</view>
							</view>
							<view class="box-content-main-list-li-info-more">
								<text class="iconfont icongengduo icon-font"
									style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
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
				isSearch: false, //是否有点击输入框搜索
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
			// 返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 获得焦点
			focus() {
				this.isSearch = true
			},
			// 失去焦点
			blur() {
				this.isSearch = false
			},

			// 客户详情
			customerDetail() {
				uni.navigateTo({
					url: "../customerDetails/customerDetails"
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
					color: #000;
				}

				.box-head-ico {
					text-align: left;
					font-size: 30rpx;
					width: 70rpx;
				}
			}
		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.box-content-search {
				padding: 20rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-search-box {
					position: relative;
					display: flex;
					height: 88rpx;
					background: #F7F7F7;
					border-radius: 15rpx;

					.box-content-search-box-ico {
						position: absolute;
						left: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 80rpx;
						height: 100%;
						transition: 0.3s;

						.icon-font {
							font-weight: 500;
						}
					}

					.box-content-search-box-ico-active {
						left: 590rpx !important;
						z-index: 999;
					}

					.box-content-search-box-input {
						position: absolute;
						width: 590rpx;
						height: 100%;
						left: 80rpx;
						transition: 0.3s;

						input {
							height: 100%;
							font-size: 28rpx;
						}
					}

					.box-content-search-box-input-active {
						left: 30rpx !important;
					}
				}
			}

			.box-content-main {
				flex: 1;
				overflow-y: scroll;

				.box-content-main-list {
					background: #fff;
					padding-left: 40rpx;
					box-sizing: border-box;
					margin-bottom: 40rpx;

					.box-content-main-list-li {
						display: flex;
						align-items: center;

						.box-content-main-list-li-image {
							display: flex;
							align-items: center;

							image {
								width: 88rpx;
								height: 88rpx;
							}
						}

						.box-content-main-list-li-info {
							flex: 1;
							display: flex;
							margin-left: 20rpx;
							padding: 37rpx 0;
							padding-right: 40rpx;
							box-sizing: border-box;
							align-items: center;
							justify-content: space-between;
							border-bottom: 1rpx solid #ededed;

							.box-content-main-list-li-info-left {
								flex: 1;

								.box-content-main-list-li-info-left-top {
									display: flex;
									align-items: center;

									.main-list-li-info-left-top-title {
										font-size: 34rpx;
										color: #000;
									}

									.main-list-li-info-left-top-text {
										margin-left: 20rpx;
										display: flex;
										align-items: center;

										image {
											width: 30rpx;
											height: 34rpx;
										}

										text {
											margin-left: 10rpx;
											font-size: 26rpx;
											color: #FF967D;
										}
									}
								}

								.box-content-main-list-li-info-left-bottom {
									margin-top: 10rpx;
									font-size: 24rpx;
									color: #999;

									text:first-child {
										margin-right: 20rpx;
									}
								}
							}

							.box-content-main-list-li-info-more {}
						}
					}
				}
			}
		}

		.box-footer {}
	}
</style>
