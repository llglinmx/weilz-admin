<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="订单详情"></nav-title-white>
		</view>
		<view class="box-content">
			<view class="box-content-appointment-room">
				<view class="box-content-appointment-room-title">房间信息</view>
				<view class="box-content-appointment-room-bottom">
					<view class="box-content-appointment-room-image flex-center">
						<image src="../../static/images/bed-use.png" mode="aspectFill"></image>
					</view>
					<view class="box-content-appointment-room-info">
						<view class="box-content-appointment-room-info-text">
							<text class="msg">楼层</text>
							<text>1F</text>
						</view>
						<view class="box-content-appointment-room-info-text">
							<text class="msg">房间类型</text>
							<text>1人床位</text>
						</view>
						<view class="box-content-appointment-room-info-text">
							<text class="msg">倒计时中</text>
							<text>00:59:52</text>
						</view>
					</view>
				</view>
			</view>

			<view class="box-content-order-info">
				<view class="box-content-order-info-title">订单信息</view>
				<view class="box-content-order-list-li-wrap">
					<view class="order-list-li-wrap-item" v-for="(i,j) in 1">
						<view class="order-list-li-wrap-item-image">
							<image src="../../static/images/001.png" mode="aspectFill"></image>
						</view>
						<view class="order-list-li-wrap-item-info">
							<view class="order-list-li-wrap-item-info-top">
								<view class="wrap-item-info-top-text">{{orderInfo.reserve_name}}</view>
								<view class="wrap-item-info-top-msg">￥298.00</view>
							</view>
							<view class="order-list-li-wrap-item-info-box">
								<view class="order-list-li-wrap-item-info-box-list">
									<view class="order-list-li-wrap-item-info-box-list-li" v-for="(s,k) in 2">泰式按摩
									</view>
								</view>
								<view class="order-list-li-wrap-item-info-box-number">x1</view>
							</view>
						</view>
					</view>
				</view>
				<view class="box-content-order-info-main">
					<view class="box-content-order-info-main-item">
						<view class="box-content-order-info-main-item-title">订单编号：</view>
						<view class="box-content-order-info-main-item-text">
							<text>{{orderInfo.out_trade_no}}</text>
							<text style="color: #5DBDFE;">复制</text>
						</view>
					</view>
					<view class="box-content-order-info-main-item">
						<view class="box-content-order-info-main-item-title">下单时间：</view>
						<view class="box-content-order-info-main-item-text">
							<text>{{orderInfo.createtime}}</text>
						</view>
					</view>
					<view class="box-content-order-info-main-item">
						<view class="box-content-order-info-main-item-title">服务方式：</view>
						<view class="box-content-order-info-main-item-text">
							<text v-if="orderInfo.service_type==1">到店服务</text>
							<text v-if="orderInfo.service_type==2">上门服务</text>
						</view>
					</view>
					<view class="box-content-order-info-main-item">
						<view class="box-content-order-info-main-item-title">支付方式：</view>
						<view class="box-content-order-info-main-item-text">
							<text v-if="orderInfo.pay_type==1">微信支付</text>
							<text v-if="orderInfo.pay_type==2">余额支付</text>
						</view>
					</view>
				</view>
				<view class="box-content-order-info-text">
					<view class="box-content-order-info-text-list">
						<view class="box-content-order-info-text-list-title">项目总价</view>
						<view class="box-content-order-info-text-list-price">￥{{orderInfo.payable}}</view>
					</view>
					<!-- <view class="box-content-order-info-text-list">
						<view class="box-content-order-info-text-list-title">使用优惠券</view>
						<view class="box-content-order-info-text-list-price">￥100.00</view>
					</view> -->
				</view>
				<view class="box-content-order-info-price">
					<view class="box-content-order-info-price-text">实付款：</view>
					<view class="present-price">
						￥<text>{{orderInfo.amount}}</text>
					</view>
				</view>
			</view>

			<view class="box-content-text">
				<view class="box-content-text-title">门店信息</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">门店</view>
					<view class="box-content-text-list-msg">{{orderInfo.store_name}}</view>
				</view>
			</view>
			<view class="box-content-text">
				<view class="box-content-text-title">下单用户信息</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">用户昵称</view>
					<view class="box-content-text-list-msg" v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.nickname">{{orderInfo.member_info.nickname}}</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">用户名</view>
					<view class="box-content-text-list-msg" v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.name">{{orderInfo.member_info.name}}</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">手机号码</view>
					<view class="box-content-text-list-msg"  v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.mobile">{{orderInfo.member_info.mobile}}</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">邮箱</view>
					<view class="box-content-text-list-msg"  v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.email">{{orderInfo.member_info.email}}</view>
				</view>
			</view>

			<view class="box-content-text">
				<view class="box-content-text-title">紧急联系人</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">姓名</view>
					<view class="box-content-text-list-msg"  v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.urgency_name">{{orderInfo.member_info.urgency_name}}</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">联系电话</view>
					<view class="box-content-text-list-msg" v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.urgency_mobile">{{orderInfo.member_info.urgency_mobile}}</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">关系</view>
					<view class="box-content-text-list-msg" v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.urgency_relation">{{orderInfo.member_info.urgency_relation}}</view>
				</view>
			</view>
			<view class="box-content-text">
				<view class="box-content-text-title">用户健康信息</view>
				<view class="box-content-text-list" v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.sex">
					<view class="box-content-text-list-title">性别</view>
					<view class="box-content-text-list-msg" v-if="orderInfo.member_info.sex==1">男</view>
					<view class="box-content-text-list-msg" v-if="orderInfo.member_info.sex==2">女</view>
					<view class="box-content-text-list-msg" v-if="orderInfo.member_info.sex==0">保密</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">年龄</view>
					<view class="box-content-text-list-msg"  v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.age">{{orderInfo.member_info.age}}</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">过往病例</view>
					<view class="box-content-text-list-msg"  v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.cottoms">{{orderInfo.member_info.cottoms}}</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">过敏病例</view>
					<view class="box-content-text-list-msg" v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.allergy">{{orderInfo.member_info.allergy}}</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">有无手术</view>
					<view class="box-content-text-list-msg" v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.operation">{{orderInfo.member_info.operation==1?'无':'有'}}</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">是否怀孕</view>
					<view class="box-content-text-list-msg" v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.fetation">{{orderInfo.member_info.fetation==1?'否':'是'}}</view>
				</view>
				<view class="box-content-text-list">
					<view class="box-content-text-list-title">注意事项</view>
					<view class="box-content-text-list-msg" v-if="orderInfo&&orderInfo.member_info&&orderInfo.member_info.announcements">{{orderInfo.member_info.announcements}}</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="flex-center cancel" v-if="orderInfo.status==-1&&orderInfo.use_status==-1">订单未支付</view>
			<view class="flex-center cancel" v-if="orderInfo.status==1&&orderInfo.use_status==-1">取消订单</view>
			<view class="flex-center cancel" v-if="orderInfo.status==-2&&orderInfo.use_status==-1">订单已失效</view>
			<view class="box-font-btn flex-center" v-if="orderInfo.status==1&&orderInfo.use_status==-1">服务结束</view>
			<view class="box-font-btn flex-center" v-if="orderInfo.status==1&&orderInfo.use_status==1">服务已完成</view>
		</view>
	</view>
</template>

<script>
	import navTitleWhite from "../../components/nav-title-white/nav-title-white.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				orderInfo: {

				}
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
		onLoad(options) {
			this.getOrderDetails(options.id)
		},
		methods: {
			// 获取订单详情 
			getOrderDetails(id) {
				this.apiget('api/v1/store/order/' + id).then(res => {
					if (res.status == 200) {
						this.orderInfo = res.data.data
					} else {
						uni.showToast({
							title: res.massage,
							icon: 'none'
						})
					}
				});
			}
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

			.box-content-appointment-room {
				margin-top: 20rpx;
				padding: 30rpx 40rpx;
				background: #fff;

				.box-content-appointment-room-title {
					margin-bottom: 30rpx;
					font-weight: 500;
					font-size: 32rpx;
					color: #000;
				}

				.box-content-appointment-room-bottom {
					display: flex;
					align-items: center;

					.box-content-appointment-room-image {
						width: 170rpx;
						height: 140rpx;
						background: #F6FCFA;
						border: 1rpx solid #4EC494;
						border-radius: 16rpx;

						image {
							width: 82rpx;
							height: 60rpx;
						}
					}

					.box-content-appointment-room-info {
						height: 140rpx;
						margin-left: 20rpx;
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.box-content-appointment-room-info-text {
							display: flex;
							align-items: center;
							font-size: 28rpx;

							.msg {
								position: relative;
								width: 130rpx;
								margin-right: 40rpx;
								color: #999;
								text-align-last: justify;
								text-align: justify;
							}

							.msg::after {
								position: absolute;
								top: 0;
								bottom: 0;
								right: -20rpx;
								margin: auto;
								content: ":";
							}

							text {}
						}
					}
				}
			}



			.box-content-order-info {
				margin-top: 20rpx;
				padding: 0 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-order-info-title {
					line-height: 32rpx;
					padding: 30rpx 0;
					font-size: 32rpx;
					font-weight: 500;
					color: #000;
				}

				.box-content-order-list-li-wrap {
					// padding-bottom: 20rpx;

					.order-list-li-wrap-item {
						display: flex;
						margin-bottom: 20rpx;

						.order-list-li-wrap-item-image {
							display: flex;
							align-items: center;

							image {
								width: 132rpx;
								height: 132rpx;
							}
						}

						.order-list-li-wrap-item-info {
							flex: 1;
							margin-left: 20rpx;

							.order-list-li-wrap-item-info-top {
								display: flex;
								align-items: center;
								justify-content: space-between;
								color: #000;

								.wrap-item-info-top-text {
									font-size: 30rpx;
									font-weight: 500;
								}

								.wrap-item-info-top-msg {
									font-size: 28rpx;
								}
							}

							.order-list-li-wrap-item-info-box {
								display: flex;
								justify-content: space-between;
								align-items: center;
								margin-top: 10rpx;

								.order-list-li-wrap-item-info-box-list {
									display: flex;
									flex-wrap: wrap;

									.order-list-li-wrap-item-info-box-list-li {
										padding: 6rpx 10rpx;
										margin-left: 8rpx;
										background: #F5F5F5;
										border-radius: 3rpx;
										font-size: 22rpx;
										color: #666;
									}
								}

								.order-list-li-wrap-item-info-box-number {
									font-size: 28rpx;
									color: #999;
								}

							}
						}
					}
				}

				.box-content-order-info-main {
					padding: 30rpx 0;
					border-top: 1rpx dashed #ededed;
					border-bottom: 1rpx dashed #ededed;

					.box-content-order-info-main-item:last-child {
						margin-bottom: 0;
					}

					.box-content-order-info-main-item {
						display: flex;
						align-items: center;
						margin-bottom: 10rpx;
						font-size: 26rpx;

						.box-content-order-info-main-item-title {
							color: #999;
						}

						.box-content-order-info-main-item-text {
							flex: 1;
							color: #000;
							display: flex;
							justify-content: space-between;

							text {
								display: block;
							}
						}
					}
				}

				.box-content-order-info-text {
					padding: 30rpx 0;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					border-bottom: 1rpx solid #ededed;

					.box-content-order-info-text-list {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28rpx;
						line-height: 32rpx;
						color: #000;

						.box-content-order-info-text-list-title {}

						.box-content-order-info-text-list-price {}
					}
				}

				.box-content-order-info-price {
					height: 72rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					.box-content-order-info-price-text {
						font-size: 24rpx;
						color: #999;
					}

					.present-price {
						font-size: 24rpx;
						color: #FF4D4D;

						text {
							font-size: 32rpx;
							font-weight: 500;
						}
					}
				}
			}


			.box-content-text {
				margin: 20rpx 0;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-text-title {
					line-height: 32rpx;
					margin-bottom: 30rpx;
					font-size: 32rpx;
					color: #000;
				}

				.box-content-text-list:last-child {
					margin-bottom: 0;
				}

				.box-content-text-list {
					display: flex;
					align-items: center;
					margin-bottom: 10rpx;
					font-size: 28rpx;

					.box-content-text-list-title {
						position: relative;
						padding-right: 10rpx;
						box-sizing: border-box;
						text-align-last: justify;
						text-align: justify;
						text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
						width: 130rpx;
						color: #999;
					}

					.box-content-text-list-title::after {
						position: absolute;
						top: 0;
						bottom: 0;
						right: 0;
						content: ":";
					}

					.box-content-text-list-msg {
						margin-left: 20rpx;
						color: #000;
						flex: 1;
					}
				}
			}
		}

		.box-footer {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			background: #fff;
			height: 107rpx;
			padding: 0 20rpx;
			box-sizing: border-box;

			.box-font-btn {
				width: 220rpx;
				height: 80rpx;
				background: #5DBDFE;
				border-radius: 40rpx;
				color: #fff;
				font-size: 32rpx;
			}

			.cancel {
				width: 218rpx;
				height: 78rpx;
				border: 1rpx solid #666666;
				margin-right: 20rpx;
				border-radius: 40rpx;
				font-size: 32rpx;
				color: #666;
			}
		}
	}
</style>
