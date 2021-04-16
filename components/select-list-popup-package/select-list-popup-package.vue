<template>
	<view class="popup-box" :class="visible?'popup-box-open':''" @click="cancel">
		<view class="popup-box-main" :class="visible?'popup-box-main-open':''" @click.stop="prevent">
			<view class="popup-box-head">
				<text class="cancel" @click="cancel">取消</text>
				<text class="confirm" @click="confirm">确定</text>
			</view>
			<view class="popup-box-content">
				<view class="popup-box-content-list" v-for="(item,index) in dataList" :key='item.id'>
					<view class="popup-box-content-list-li-title">
						<text class="iconfont iconshangjia icon-font"
							style="font-size: 28rpx;color: #5DBDFE;margin-top: 4rpx;"></text>
						<text>{{item.name}}</text>
					</view>
					<view class="popup-box-content-list-li" v-for="(k,n) in item.data" :key='k.id'
						@click="checkList(index,n)">
						<view class="popup-box-content-list-li-info">
							<view class="list-li-info-image">
								<image :src="k.simg" mode="aspectFill"></image>
							</view>
							<view class="list-li-info-main">
								<view class="list-li-info-main-title">{{k.name}}</view>
								<view class="list-li-info-main-item">
									<view class="list-li-info-main-item-li">{{k.service_time}}分钟</view>
									<view class="list-li-info-main-item-li" v-for="(j,i) in k.format">{{j.name}}
									</view>
								</view>
								<view class="list-li-info-main-price">{{k.price}}</view>
							</view>
						</view>
						<view class="popup-box-content-list-li-check">
							<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
								v-if="k.isCheck"></text>
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

		methods: {
			// 列表点击
			checkList(index, idx) {
				this.dataList[index].data[idx].isCheck = !this.dataList[index].data[idx].isCheck
			},

			// 取消
			cancel() {
				this.$emit("cancel", false)
			},
			// 确定
			confirm() {
				var dataArr = []
				this.dataList.map(item => {
					item.data.forEach(res => {
						if (res.isCheck) {
							dataArr.push(item)
						}
					})
				})

				var obj = {};
				dataArr = dataArr.reduce(function(item, next) {
					obj[next.id] ? '' : obj[next.id] = true && item.push(next);
					return item;
				}, []);

				let newarr = dataArr.map(item => {
					item.data = item.data.filter(res => res.isCheck)
					return item;
				})

				this.$emit('confirm', [...newarr])
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

					.popup-box-content-list-li-title {
						display: flex;
						align-items: center;
						height: 80rpx;
						font-size: 28rpx;

						.icon-font {
							margin-right: 20rpx;
						}
					}

					.popup-box-content-list-li:last-child {
						border-bottom: 1rpx solid #ededed;
					}

					.popup-box-content-list-li {
						padding: 20rpx 0;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-top: 1rpx solid #ededed;
						// border-bottom: 1rpx solid #ededed;

						.popup-box-content-list-li-info {
							display: flex;
							align-items: center;
							justify-content: space-around;

							.list-li-info-image {
								display: flex;
								align-items: center;
								width: 120rpx;

								image {
									width: 120rpx;
									height: 120rpx;
									border-radius: 10rpx;
								}
							}

							.list-li-info-main {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								margin-left: 20rpx;

								.list-li-info-main-title {
									font-size: 32rpx;
									color: #666;
								}

								.list-li-info-main-item {
									display: flex;
									flex-wrap: wrap;

									.list-li-info-main-item-li {
										padding: 6rpx 10rpx;
										margin-right: 10rpx;
										// margin-bottom: 10rpx;
										background: #F5F5F5;
										font-size: 22rpx;
										color: #666;
										border-radius: 2rpx;
									}
								}


								.list-li-info-main-price {
									font-size: 28rpx;
									color: #f52121;
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
