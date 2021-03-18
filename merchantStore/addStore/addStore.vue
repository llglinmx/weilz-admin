<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="添加门店"></nav-title-balck>
		</view>
		<view class="box-content">

			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">门店名称</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入门店名称" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">区域</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择区域</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">分类</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择分类</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-title">
						<text>营业执照</text>
						<text>(100*100)</text>
					</view>
					<view class="box-content-list-item-info">
						<view class="box-content-list-item-info-icon flex-center">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
						</view>
						<!-- <image src="" class="box-content-list-item-info-image" mode=""></image> -->
					</view>
				</view>

			</view>

			<view class="box-content-main">
				<view class="box-content-main-top">
					<view>添加图片<text style="font-size: 24rpx;color: #999;margin-left: 10rpx;">(990*556)</text></view>
				</view>
				<view class="box-content-main-image-list">
					<view class="box-content-main-image-list-li" :class="index==0?'list-li-affter':''"
						v-for="(item,index) in 2" :key="index">
						<image src="../../static/images/001.png" mode="aspectFill"></image>
						<text class="close flex-center">
							<text class="iconfont iconcuowu icon-font" style="color: #fff;font-size: 36rpx"></text>
						</text>
					</view>
					<view class="box-content-main-image-list-up flex-center">
						<text class="iconfont iconcuowu icon-font" style="color: #ddd;font-size: 90rpx"></text>
					</view>
				</view>
			</view>


			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">门店电话</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入门店电话" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">营业时间</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入营业时间" />
						</view>
					</view>
				</view>



				<view class="box-content-list-li" style="padding:30rpx 0;height: auto;align-items: flex-start;">
					<view class="box-content-list-li-title">预约方式</view>
					<view class="box-content-list-li-info" style="flex-direction: column;">
						<view class="box-content-list-li-info-check">
							<view class="box-content-list-li-info-check-box" @click="currency(true)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="isCurr"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>时间</text>
							</view>
							<view class="box-content-list-li-info-check-box" @click="currency(false)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="!isCurr"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>时间段</text>
							</view>
						</view>
						<view class="box-content-list-li-info-msg">
							注：时间是指时间排列选择，例如9:00 9:30 10:00; 时间段是指按时间段排列选择，例如9:00-10:00 10:00-11:00
						</view>
					</view>
				</view>

				<view class="box-content-list-li" style="padding:30rpx 0;height: auto;align-items: flex-start;">
					<view class="box-content-list-li-title">会员折扣</view>
					<view class="box-content-list-li-info" style="flex-direction: column;">
						<view class="box-content-list-li-info-check">
							<view class="box-content-list-li-info-check-box" @click="discount(true)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="isDiscount"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>开启</text>
							</view>
							<view class="box-content-list-li-info-check-box" @click="discount(false)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="!isDiscount"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>关闭</text>
							</view>
						</view>
						<view class="box-content-list-li-info-msg">
							注：开启会员折扣后,门店下的支付会员能享受对应的等级折扣,不开启就没有
						</view>
					</view>
				</view>

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">地址</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请定位具体地址</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">税号</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入税号" />
						</view>
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-title">
						<text>营业执照</text>
						<text>(100*100)</text>
					</view>
					<view class="box-content-list-item-info">
						<view class="box-content-list-item-info-icon flex-center">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
						</view>
						<!-- <image src="" class="box-content-list-item-info-image" mode=""></image> -->
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-title">
						<text>其他执照</text>
						<text>(110*80)</text>
					</view>
					<view class="box-content-list-item-info">
						<view class="box-content-list-item-info-icon flex-center">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
						</view>
						<!-- <image src="" class="box-content-list-item-info-image" mode=""></image> -->
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">状态</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择状态</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">详情</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入详情" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="确认添加" @btnClick="confirm" />
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
				isCurr: true, //预约方式
				isDiscount: false, //是否开启会员折扣
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

			// 预约方式
			currency(bool) {
				this.isCurr = bool ? true : false
			},
			// 是否开启会员折扣
			discount(bool) {
				this.isDiscount = bool ? true : false
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
						margin-left: 60rpx;
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
							width: 100%;
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

						.box-content-list-li-info-check {
							display: flex;
							align-items: center;
							width: 100%;


							.box-content-list-li-info-check-box {
								display: flex;
								align-items: center;
								color: #000;
								font-size: 28rpx;

								.icon-font {
									margin-right: 20rpx;
								}

								text {}
							}

							.box-content-list-li-info-check-box:nth-child(2) {
								margin-left: 40rpx;
							}
						}

						.box-content-list-li-info-msg {
							margin-top: 20rpx;
							font-size: 24rpx;
							color: #999;
						}
					}
				}

				.box-content-list-item {
					display: flex;
					align-items: center;
					padding: 30rpx 0;
					border-bottom: 1rpx solid #ededed;

					.box-content-list-item-title {
						display: flex;
						flex-direction: column;
						width: 180rpx;

						text:nth-child(1) {
							font-size: 28rpx;
							color: #333;
						}

						text:nth-child(2) {
							font-size: 24rpx;
							color: #999;
						}
					}

					.box-content-list-item-info {
						margin-left: 60rpx;

						.box-content-list-item-info-icon {
							width: 120rpx;
							height: 120rpx;
							background: #EDEDED;
							border-radius: 10rpx;
						}

						.box-content-list-item-info-image {
							width: 120rpx;
							height: 120rpx;
						}
					}
				}

				.box-content-list-item:last-child {
					border-bottom: 0;
				}

			}

			.box-content-main {
				margin-top: 20rpx;
				padding-left: 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-main-top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-right: 40rpx;
					box-sizing: border-box;
					height: 80rpx;
					border-bottom: 1rpx solid #ededed;
					color: #333;
					font-size: 28rpx;

					.box-content-main-top-title {}

					.box-content-main-top-add {
						width: 40rpx;
						height: 40rpx;
						border: 2rpx solid #CCCCCC;
						border-radius: 10rpx;

						.icon-font {
							transform: rotate(135deg);
						}
					}
				}

				.box-content-main-image-list {
					display: flex;
					align-items: center;
					padding: 40rpx 0 70rpx;
					box-sizing: border-box;

					.list-li-affter {
						position: relative;
					}

					.list-li-affter::after {
						position: absolute;
						bottom: -44rpx;
						left: 0;
						right: 0;
						margin: auto;
						content: "门店封面";
						font-size: 24rpx;
						text-align: center;
						color: #333;
					}

					.box-content-main-image-list-li {
						position: relative;
						width: 160rpx;
						height: 160rpx;
						margin-right: 30rpx;

						image {
							width: 160rpx;
							height: 160rpx;
						}

						.close {
							position: absolute;
							right: -20rpx;
							top: -20rpx;
							width: 40rpx;
							height: 40rpx;
							background: rgba(0, 0, 0, 0.4);
							border-radius: 50%;
						}
					}

					.box-content-main-image-list-up {
						width: 156rpx;
						height: 156rpx;
						border: 2rpx dashed #DDDDDD;
						border-radius: 10rpx;

						.icon-font {
							transform: rotate(45deg);
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
