<template>
	<view class="popup-box" :class="visible?'popup-box-open':''" @click="cancel">
		<view class="popup-box-main" :class="visible?'popup-box-main-open':''" @click.stop="prevent">
			<view class="popup-box-head">
				<text class="cancel" @click="cancel">取消</text>
				<text class="confirm" @click="confirm">确定</text>
			</view>
			<view class="popup-box-content">
				<view class="popup-box-content-list">
					<view class="popup-box-content-list-li" v-for="(item,index) in dataList" :key='item.id'
						@click="checkList(index)">
						<view class="popup-box-content-list-li-info">
							<view class="list-li-info-icon">
								<view class="list-li-info-icon-title">
									<text>{{item.reduce_cost |priceStr}}</text>
									元
								</view>
								<view class="list-li-info-icon-text">
									满{{item.least_cost|priceStr}}可用
								</view>
							</view>
							<view class="list-li-info-main">
								<view class="list-li-info-main-title">{{item.name}}</view>
								<view class="list-li-info-main-msg">门店：{{item.store_info.name}}</view>
								<view class="list-li-info-main-msg" v-if="item.date_type==1">
									结束时间：{{item.end_time |strTime}}</view>
								<view class="list-li-info-main-msg" v-if="item.date_type==2">
									有效期：{{item.fixed_term}}天</view>
							</view>
						</view>
						<view class="popup-box-content-list-li-check">
							<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
								v-if="item.isCheck"></text>
							<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
								v-else></text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "popup-list-select",
		data() {
			return {

			};
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			dataList: {}
		},
		filters: {
			strTime(val) {
				if (val != '' && val != null) {
					var str = val.split(' ')
					return str[0]
				}
			},
			priceStr(val) {
				if (val != '') {
					var str = val.split('.')
					return str[0]
				}
			},
		},
		methods: {
			// 列表点击
			checkList(index) {
				this.dataList[index].isCheck = !this.dataList[index].isCheck
			},

			// 取消
			cancel() {
				this.$emit("cancel", false)
			},
			// 确定
			confirm() {
				var arr = []
				this.dataList.map(item => {
					if (item.isCheck) {
						arr.push(item)
					}
				})

				this.$emit('confirm', arr)
				this.cancel()
			},
			prevent() {},
		}
	}
</script>

<style lang="scss" scoped>
	.popup-box-open {
		background: rgba(0, 0, 0, 0.5) !important;
		z-index: 999 !important;
	}

	.popup-box {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		transition: 0.4s;
		z-index: -999;

		.popup-box-main-open {
			height: 1000rpx !important;
		}

		.popup-box-main {
			display: flex;
			flex-direction: column;
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 0;
			transition: 0.4s;
			background: #fff;
			border-radius: 20rpx 20rpx 0 0;

			.popup-box-head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 40rpx;
				box-sizing: border-box;
				height: 100rpx;
				border-bottom: 1rpx solid #ededed;
				font-size: 28rpx;

				.cancel {
					color: #999;
				}

				.confirm {
					color: #1676ec;
				}
			}

			.popup-box-content {
				flex: 1;
				overflow-y: scroll;

				.popup-box-content-list {
					padding: 0 20rpx;
					box-sizing: border-box;

					.popup-box-content-list-li {
						padding: 20rpx 0;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1rpx solid #ededed;

						.popup-box-content-list-li-info {
							display: flex;
							align-items: center;
							justify-content: space-around;

							.list-li-info-icon {
								display: flex;
								align-items: center;
								justify-content: center;
								flex-direction: column;
								height: 180rpx;
								width: 180rpx;
								background: url(../../static/images/coupone-sky-blue.png) no-repeat;
								background-size: contain;
								color: #fff;
								font-size: 28rpx;

								.list-li-info-icon-title {

									text {
										font-size: 70rpx;
									}
								}

								.list-li-info-icon-text {}
							}

							.list-li-info-main {
								margin-left: 20rpx;
								display: flex;
								flex-direction: column;

								.list-li-info-main-title {
									font-size: 32rpx;
									margin-bottom: 20rpx;
								}

								.list-li-info-main-msg {
									margin-bottom: 10rpx;
									font-size: 28rpx;
									color: #999;
								}

								.list-li-info-main-msg:last-child {
									margin-bottom: 0;
								}
							}
						}

						.popup-box-content-list-li-check {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 100rpx;
						}
					}
				}
			}
		}
	}
</style>
