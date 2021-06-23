<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">房间管理</view>
				<view class="box-head-ico flex-center" @click="addRoom">
					添加房间
				</view>
			</view>
			<view class="box-head-tab">
				<view class="box-head-tab-item flex-center">
					<text>状态</text>
					<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx"></text>
				</view>
				<view class="box-head-tab-item flex-center">
					<text>类型</text>
					<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx"></text>
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-type">
						<view class="box-content-list-li-type-title"></view>
						<view class="box-content-list-li-type-title-state">
							<view class="box-content-list-li-type-title-state-item">
								<view class="list-li-type-title-state-item-dot" style="background:#26BF82;"></view>
								<view class="list-li-type-title-state-item-text">使用中</view>
							</view>
							<view class="box-content-list-li-type-title-state-item">
								<view class="list-li-type-title-state-item-dot" style="background: #5DBDFE;"></view>
								<view class="list-li-type-title-state-item-text">预约</view>
							</view>
							<view class="box-content-list-li-type-title-state-item">
								<view class="list-li-type-title-state-item-dot" style="background: #FF7167;"></view>
								<view class="list-li-type-title-state-item-text">故障</view>
							</view>
							<view class="box-content-list-li-type-title-state-item">
								<view class="list-li-type-title-state-item-dot" style="background: #B3B3B3;"></view>
								<view class="list-li-type-title-state-item-text">空闲</view>
							</view>
						</view>
					</view>
					<view class="box-content-list-li-main">
						<view class="box-content-list-li-main-item " :class="[{'border-color-4EC494':index === 0}, 
						 {'border-color-B3B3B3':index === 1},
						 {'border-color-5DBDFE':index === 2},
						 {'border-color-FF7167':index === 3}]" v-for="(item,index) in 4" :key="index" @click="listClick(item.id)">
							<view class="box-content-list-li-main-item-text">1人</view>
							<view class="box-content-list-li-main-item-info">
								<image src="../../static/images/bed-use.png" mode="aspectFill" v-if="index==0"></image>
								<image src="../../static/images/bed-free.png" mode="aspectFill" v-if="index==1"></image>
								<image src="../../static/images/bed-about.png" mode="aspectFill" v-if="index==2">
								</image>
								<image src="../../static/images/bed-fault.png" mode="aspectFill" v-if="index==3">
								</image>
								<text>00:59:52</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popup-box">
				<view class="popup-box-main">
					<view class="popup-box-main-title">房间信息</view>
					<view class="popup-box-main-content">
						<view class="popup-box-main-content-list">
							<view class="main-content-list-li">
								<view class="main-content-list-li-title">门店</view>
								<view class="main-content-list-li-text">罗约蓝池·温泉SPA</view>
							</view>
							<view class="main-content-list-li">
								<view class="main-content-list-li-title">房间类型</view>
								<view class="main-content-list-li-text">2人床位</view>
							</view>
							<view class="main-content-list-li">
								<view class="main-content-list-li-title">状态</view>
								<view class="main-content-list-li-text" style="color: #26BF82;">使用中</view>
							</view>
							<view class="main-content-list-li">
								<view class="main-content-list-li-title">倒计时</view>
								<view class="main-content-list-li-text">01:20:56</view>
							</view>
						</view>
						<view class="popup-box-main-content-wrap" v-if="rooType">
							<view class="popup-box-main-content-wrap-title">已有预约</view>
							<view class="popup-box-main-content-wrap-box">
								<view class="content-wrap-box-main-item">14:00-15:00</view>
								<view class="content-wrap-box-main-item">14:00-15:00</view>
								<view class="content-wrap-box-main-item">14:00-15:00</view>
							</view>
						</view>
						<view class="popup-box-main-content-btn" v-if="!rooType">
							<view class="popup-box-main-content-btn-del flex-center" @click="deleteRoom">删除</view>
							<view class="popup-box-main-content-btn-edit flex-center" @click="editRoom">编辑</view>
						</view>
					</view>
				</view>
				<view class="popup-box-main-close" @click="popClose">
					<text class="iconfont iconcuowu" style="color: #fff;font-size: 52rpx;"></text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="deltePopup" type="dialog">
			<uni-popup-dialog type="warn" mode='base' title="警告" content="你确定要删除此房间吗？" :duration="2000"  @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				id: '',
				rooType: false,
				dataList: []
			};
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
			this.id = options.id
			this.getRoom(1, 50)
		},
		methods: {
			// 返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 添加房间
			addRoom() {
				var str = {
					id: this.id,
					type: 'add'
				}
				uni.navigateTo({
					url: "../addRoom/addRoom?data=" + JSON.stringify(str)
				})
			},


			listClick() {
				this.$refs.popup.open()

			},
			// 关闭弹窗 close
			popClose() {
				this.$refs.popup.close()
			},

			// 删除房间
			deleteRoom() {
				this.$refs.deltePopup.open()
			},

			// 弹窗点击确认
			confirm() {
				this.$refs.popup.close()

				return false

				this.apidelte('api/v1/store/room_management/del/' + this.id, vuedata).then(res => {
					if (res.status == 200) {
						uni.showToast({
							title: "房间删除成功",
							icon: 'none'
						})
						this.$refs.popup.close() //关闭父级弹出层
					} else if (res.status == 400) {
						uni.showToast({
							title: res.massage,
							icon: 'none'
						})
					}
				})
			},
			// 编辑房间
			editRoom() {

				this.$refs.deltePopup.close()


				var str = {
					id: 18,
					type: 'edit'
				}
				// uni.navigateTo({
				// 	url: "../addRoom/addRoom?data=" + JSON.stringify(str)
				// })
			},

			// 获取房间列表
			getRoom(num, size) {
				let vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
					store_id: this.id,
				}
				this.apiget('api/v1/store/room_management', vuedata).then(res => {
					if (res.status == 200) {
						this.dataList = res.data.room_info
						console.log(res.data)
					} else if (res.status == 400) {
						uni.showToast({
							title: res.massage,
							icon: "none"
						})
					}
				});
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
					margin-left: 70rpx;
					color: #000;
				}

				.box-head-ico {
					text-align: left;
					font-size: 30rpx;
					width: 140rpx;
					color: #5DBDFE;
				}
			}

			.box-head-tab {
				height: 76rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.box-head-tab-item {
					flex: 1;
					font-size: 28rpx;
					color: #666;

					.icon-font {
						margin-left: 10rpx;
					}
				}
			}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-list {
				margin-top: 20rpx;
				background: #fff;

				.box-content-list-li {
					padding: 0 40rpx 30rpx;
					box-sizing: border-box;

					.box-content-list-li-type {
						padding: 30rpx 0;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.box-content-list-li-type-title {
							font-size: 36rpx;
							color: #333;
						}

						.box-content-list-li-type-title-state {
							display: flex;
							align-items: center;

							.box-content-list-li-type-title-state-item {
								display: flex;
								align-items: center;
								margin-right: 20rpx;

								.list-li-type-title-state-item-dot {
									width: 20rpx;
									height: 20rpx;
									border-radius: 4rpx;
								}

								.list-li-type-title-state-item-text {
									margin-left: 8rpx;
									font-size: 24rpx;
									color: #333;
								}
							}

							.box-content-list-li-type-title-state-item:last-child {
								margin-right: 0;
							}
						}
					}

					.box-content-list-li-main {
						display: flex;
						flex-wrap: wrap;

						.box-content-list-li-main-item {
							padding: 16rpx;
							box-sizing: border-box;
							width: 208rpx;
							height: 170rpx;
							border-radius: 16rpx;
							margin-right: 20rpx;
							margin-bottom: 20rpx;

							.box-content-list-li-main-item-text {
								font-size: 24rpx;
							}

							.box-content-list-li-main-item-info {
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;

								image {
									width: 82rpx;
									height: 60rpx;
								}

								text {
									font-size: 24rpx;
								}
							}
						}

						.box-content-list-li-main-item:nth-child(3n) {
							margin-right: 0;
						}

						.border-color-4EC494 {
							background: #F6FCFA;
							border: 1rpx solid #4EC494;
							color: #4EC494;
						}

						.border-color-B3B3B3 {
							background: #fff;
							border: 1rpx solid #B3B3B3;
							color: #B3B3B3;
						}

						.border-color-5DBDFE {
							background: #EDF8FE;
							border: 1rpx solid #5DBDFE;
							color: #5DBDFE;
						}

						.border-color-FF7167 {
							background: #FFF8F7;
							border: 1rpx solid #FF7167;
							color: #FF7167;
						}
					}



				}
			}
		}

		.popup-box {
			position: relative;
			width: 570rpx;
			// height: 660rpx;
			padding: 40rpx 60rpx 60rpx;
			box-sizing: border-box;
			background: #fff;
			border-radius: 20rpx;

			.popup-box-main {
				.popup-box-main-title {
					text-align: center;
				}

				.popup-box-main-content {
					margin-top: 40rpx;

					.popup-box-main-content-list {
						.main-content-list-li {
							display: flex;
							align-items: center;
							margin-bottom: 20rpx;
							font-size: 28rpx;

							.main-content-list-li-title {
								position: relative;
								width: 120rpx;
								color: #999;
								text-align: justify;
								text-align-last: justify;
							}

							.main-content-list-li-title::after {
								position: absolute;
								top: 0;
								bottom: 0;
								right: -15rpx;
								content: ':';
							}

							.main-content-list-li-text {
								margin-left: 30rpx;
								flex: 1;
								color: #000;
							}
						}
					}

					.popup-box-main-content-wrap {
						margin-top: 30rpx;
						padding: 30rpx 0rpx;
						box-sizing: border-box;
						font-size: 28rpx;
						border-radius: 20rpx;
						border: 1rpx dashed #ededed;

						.popup-box-main-content-wrap-title {
							text-align: center;
							color: #999;
						}

						.popup-box-main-content-wrap-box {
							margin-top: 20rpx;
							display: flex;
							align-items: center;
							flex-wrap: wrap;

							.content-wrap-box-main-item {
								color: #000;
								margin-bottom: 10rpx;
								margin-left: 40rpx;
							}

						}
					}

					.popup-box-main-content-btn {
						margin-top: 60rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.popup-box-main-content-btn-del {
							width: 215rpx;
							height: 68rpx;
							background: #EDEDED;
							border-radius: 34rpx;
							font-size: 28rpx;
							color: #666;
						}

						.popup-box-main-content-btn-edit {
							width: 215rpx;
							height: 68rpx;
							background: #5DBDFE;
							border-radius: 34rpx;
							font-size: 28rpx;
							color: #fff;
						}
					}

				}
			}

			.popup-box-main-close {
				position: absolute;
				top: -28rpx;
				right: -28rpx;
				width: 56rpx;
				height: 56rpx;
				background: #5DBDFE;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

	}
</style>
