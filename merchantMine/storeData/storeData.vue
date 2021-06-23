<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="门店数据" />
		</view>
		<view class="box-content">
			<view class="box-content-info">
				<view class="box-content-info-top">
					<view class="box-content-info-top-left">
						<text class="iconfont iconshangjia icon-font"
							style="color: #5DBDFE;font-size: 32rpx;margin-right: 10rpx;margin-top: 10rpx;"></text>
						<text>{{dataObj.name}}</text>
					</view>
					<view class="box-content-info-top-right" @click="isShow = true">
						<text>{{msg}}</text>
						<text class="iconfont iconxiangxiajiantou icon-font"
							style="color: #333;font-size: 28rpx;transition: 0.3s;"
							:style="{transform:isShow?'rotate(180deg)':'rotate(0deg)'}"></text>
					</view>
				</view>
				<view class="box-content-info-bottom">
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #5DBDFE;" class="dot"></text>
								<text>总收入</text>
							</view>
							<view class="box-content-info-bottom-item-text">{{dataObj.order_sum}}</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>订单量</text>
							</view>
							<view class="box-content-info-bottom-item-text">{{dataObj.order_allnum}}</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>银行卡支付</text>
							</view>
							<view class="box-content-info-bottom-item-text">{{dataObj.bank_amount}}</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>余额支付</text>
							</view>
							<view class="box-content-info-bottom-item-text">{{dataObj.over_amount}}</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>微信支付</text>
							</view>
							<view class="box-content-info-bottom-item-text">{{dataObj.wx_amount}}</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>通用套餐收入</text>
							</view>
							<view class="box-content-info-bottom-item-text">{{dataObj.pack_amount}}</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FF4D4D;" class="dot"></text>
								<text>退款金额</text>
							</view>
							<view class="box-content-info-bottom-item-text">
								<text>{{dataObj.refund_amount}}</text>
								<text class="iconfont iconwenhao icon-font"
									style="color: #FF3333;font-size: 32rpx;"></text>
							</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FFDB3A;" class="dot"></text>
								<text>线下收入</text>
							</view>
							<view class="box-content-info-bottom-item-text">{{dataObj.line_amount}}</view>
						</view>
					</view>
					<view class="box-content-info-bottom-item">
						<view class="box-content-info-bottom-item-wrap">
							<view class="box-content-info-bottom-item-title">
								<text style="border: 3rpx solid #FF4D4D;" class="dot"></text>
								<text>平台提成</text>
							</view>
							<view class="box-content-info-bottom-item-text">{{dataObj.fee_amount}}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="box-content-data">
				<view class="box-content-data-tabs">
					<merchant-tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
				</view>
				<view class="box-content-data-list">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list" v-for="(item,index) in tabsList" :key='index'>
							<store-data-swiper ref='refSwiper' :time='timeObj' :id='id' :type='type' :tabIndex="index"
								:currentIndex="defaultIndex" @initChange='initChange' />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<popup-list-select @cancel="cancel" @confirm="confirm" :visible='isShow' :dataList="dataList" />
	</view>
</template>

<script>
	import {
		checkList
	} from '../../static/js/publicFile.js'
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				tabsList: [{
						name: "退款订单",
						type: 1
					},
					{
						name: "成交订单",
						type: 2
					},
				],
				defaultIndex: 0, //当前滑动的页面
				id: '',
				type: 1,
				timeObj: {
					startTime: '',
					endTime: ''
				},
				dataObj: {},
				isShow: false,
				msg: '全部',
				dataList: []
			};
		},
		onLoad(options) {
			this.id = options.id
			this.dataList = checkList
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

			initChange(e) {
				this.dataObj = e
			},
			// 弹出层取消按钮
			cancel(e) {
				this.isShow = e
			},

			// 弹出层确认按钮
			confirm(e) {
				this.msg = e.name;
				let date1 = new Date();
				let time1 = date1.getFullYear() + "-" + this.isTody(date1.getMonth() + 1) + "-" + date1.getDate() + ' ' +
					date1.getHours() + ":" + date1.getMinutes() + ':' + date1.getSeconds();
				if (e.id == -1) {
					this.timeObj.startTime = ''
					this.timeObj.endTime = ''
				} else if (e.id == 1) {
					this.timeObj.startTime = date1.getFullYear() + "-" + this.isTody(date1.getMonth() + 1) + "-" + date1.getDate()+' '+'00:00:00'
					this.timeObj.endTime = date1.getFullYear() + "-" + this.isTody(date1.getMonth() + 1) + "-" + date1.getDate()+' '+'23:59:59'
				} else if (e.id == 2 || e.id == 3) {
					this.timeObj.startTime = time1
					this.timeObj.endTime = this.funcitonDate(e.day)
				}
				this.$refs.refSwiper[this.defaultIndex].getDataList(1, 20)
			},

			// 根据传递进来的天数 获取到对应日期
			funcitonDate(day) {
				var date1 = new Date(),
					time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间
				var date2 = new Date(date1);
				date2.setDate(date1.getDate() + day);
				var time2 = date2.getFullYear() + "-" + this.isTody(date2.getMonth() + 1) + "-" + date2.getDate() + ' ' +
					date2
					.getHours() + ":" + date2.getMinutes() + ':' + date2.getSeconds();
				return time2
			},

			// 是否小于10 小于则补0
			isTody(day) {
				return day < 10 ? '0' + day : day
			},


			// tabs 点击
			tabClick(e) {
				this.defaultIndex = e
				this.type = this.tabsList[this.defaultIndex].type
			},
			// 滑动切换列表
			tabChange(e) {
				this.$refs.boxTabs.tabToIndex(e.detail.current)
				this.defaultIndex = e.detail.current
				this.type = this.tabsList[this.defaultIndex].type
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
			display: flex;
			flex-direction: column;
			flex: 1;
			// overflow-y: scroll;

			.box-content-info {
				padding: 30rpx 40rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-info-top {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.box-content-info-top-left {
						display: flex;
						align-items: center;
						font-size: 36rpx;
						color: #000;

						image {
							margin-top: 4rpx;
							width: 36rpx;
							height: 36rpx;
							margin-right: 10rpx;
						}
					}

					.box-content-info-top-right {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #000;

						.icon-font {
							margin-left: 10rpx;
						}
					}
				}

				.box-content-info-bottom {
					display: flex;
					flex-wrap: wrap;

					.box-content-info-bottom-item {
						width: 220rpx;
						margin-top: 40rpx;

						.box-content-info-bottom-item-wrap {
							.box-content-info-bottom-item-title {
								display: flex;
								align-items: center;
								font-size: 26rpx;
								color: #999;

								text {
									display: block;
								}

								.dot {
									margin-right: 10rpx;
									width: 16rpx;
									height: 16rpx;
									background: #FFFFFF;
									border-radius: 50%;
								}
							}

							.box-content-info-bottom-item-text {
								display: flex;
								align-items: center;
								margin-top: 10rpx;
								margin-left: 30rpx;
								font-size: 32rpx;
								font-weight: bold;
								color: #000;

								.icon-font {
									margin-left: 10rpx;
								}
							}

						}
					}
				}
			}


			.box-content-data {
				margin-top: 20rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				background: #fff;

				.box-content-data-tabs {
					border-bottom: 2rpx solid #ededed;
				}

				.box-content-data-list {
					// flex: 1;
					// overflow-y: scroll;
					height: 100%;

					.swiper-box {
						height: 100%;
						// overflow-y: scroll;

						.swiper-box-item-list {
							height: 100%;
							// overflow-y: scroll;


						}
					}
				}

			}
		}

	}
</style>
