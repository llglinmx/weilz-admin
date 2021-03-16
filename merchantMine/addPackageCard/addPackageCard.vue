<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="添加套餐卡"></nav-title-balck>
		</view>
		<view class="box-content">

			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">门店</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择门店</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">门店分类</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择门店分类</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">套餐卡名称</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入套餐卡名称" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">平台分类</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择分类</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
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
			<view class="box-content-main">
				<view class="box-content-main-top">
					<view class="box-content-main-top-title">套餐项目</view>
					<view class="box-content-main-top-add flex-center">
						<text class="iconfont iconcuowu icon-font" style="color: #ccc;font-size: 36rpx"></text>
					</view>
				</view>
				<view class="box-content-main-list">
					<view class="box-content-main-list-li" v-for="(item,index) in dataList" :key="index">
						<view class="box-content-main-list-li-image">
							<image src="../../static/images/001.png" mode="aspectFill"></image>
						</view>
						<view class="box-content-main-list-li-info">
							<view class="box-content-main-list-li-info-text">
								<view class="list-li-info-text-title">{{item.title}}</view>
								<view class="list-li-info-text-price">￥{{item.price}}</view>
							</view>
							<view class="box-content-main-list-li-info-bottom">
								<view class="list-li-info-bottom-stepper">
									<view class="list-li-info-bottom-stepper-reduce flex-center"
										@click="stepper(index,'reduce')">
										<text class="iconfont iconjian icon-font"
											:style="{color:item.num>1?'#666':'#ccc'}"></text>
									</view>
									<view class="list-li-info-bottom-stepper-num flex-center">{{item.num}}</view>
									<view class="list-li-info-bottom-stepper-add flex-center"
										@click="stepper(index,'add')">
										<text class="iconfont iconjia icon-font" style="color:#666"></text>
									</view>
								</view>
								<view class="list-li-info-bottom-delete" @click="deleteClick(index)">
									<text class="iconfont iconshanchu-shangjia icon-font"
										style="color: #ccc;font-size: 52rpx;"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">价格</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入价格" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">库存</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="最高为10000" />
						</view>
					</view>
				</view>

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">有效期</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">固定日期时间</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">固定日期区间</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请设置日期区间</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">是否通用</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-check">
							<view class="box-content-list-li-info-check-box" @click="currency(true)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="isCurr"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>是</text>
							</view>
							<view class="box-content-list-li-info-check-box" @click="currency(false)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="!isCurr"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>否</text>
							</view>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">状态</view>
					<view class="box-content-list-li-info">
						<switch :checked="isState" @change="switch1Change" color="#07C160" />
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">排序</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请设置</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li-item">
					<view class="box-content-list-li-item-title">套餐卡使用说明</view>
					<view class="box-content-list-li-item-textarea">
						<textarea value="" placeholder="请输入使用说明" />
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
				isCurr: true, //是否通用
				isState: false, //发放状态
				dataList: [{
						title: "泰式古法按摩",
						num: 1,
						price: '258.00'
					},
					{
						title: "全身按摩SPA",
						num: 1,
						price: '258.00'
					},
					{
						title: "泰式古法按摩",
						num: 1,
						price: '258.00'
					},
					{
						title: "泰式古法按摩",
						num: 1,
						price: '258.00'
					},
					{
						title: "全身按摩SPA",
						num: 1,
						price: '258.00'
					},
				]
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
			// switch 开关
			switch1Change: function(e) {
				this.isState = e.target.value
				console.log('发生 change 事件，携带值为', e.target.value)
			},

			// 是否通用单选点击
			currency(bool) {
				this.isCurr = bool ? true : false
			},
			// 步进器点击
			stepper(index, type) {
				switch (type) {
					case 'reduce':
						if (this.dataList[index].num <= 1) {
							uni.showToast({
								title: "已经减到最低了，不能再减少了",
								icon: "none"
							})
							return;
						}
						this.dataList[index].num--
						break;
					case 'add':
						this.dataList[index].num++
						break;
				}
			},
			// 删除按钮点击
			deleteClick(index) {
				if (this.dataList.length != 1) {
					this.dataList.splice(index, 1)
				} else {
					uni.showToast({
						title: "不能再删了，最少一个",
						icon: "none"
					})
				}
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
						width: 200rpx;
						font-size: 28rpx;
						color: #333;
					}

					.box-content-list-li-info {
						margin-left: 80rpx;
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

							.box-content-list-li-info-check-box:first-child {
								margin-left: 0;
							}

							.box-content-list-li-info-check-box {
								margin-left: 40rpx;
								display: flex;
								align-items: center;
								color: #000;
								font-size: 28rpx;

								.icon-font {
									margin-right: 20rpx;
								}

								text {}
							}
						}
					}
				}

				.box-content-list-li-item {
					padding-bottom: 40rpx;
					padding-right: 40rpx;
					box-sizing: border-box;

					.box-content-list-li-item-title {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #333;
						height: 94rpx;
					}

					.box-content-list-li-item-textarea {
						height: 156rpx;
						border: 1rpx dashed #E0E0E0;
						padding: 20rpx;
						box-sizing: border-box;

						textarea {
							width: 100%;
							height: 100%;
							font-size: 28rpx;
						}
					}
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
						content: "封面";
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

				.box-content-main-list {
					padding-bottom: 30rpx;


					.box-content-main-list-li {
						display: flex;
						align-items: center;
						padding-right: 40rpx;
						box-sizing: border-box;
						margin-top: 30rpx;

						.box-content-main-list-li-image {
							display: flex;
							align-items: center;

							image {
								width: 132rpx;
								height: 132rpx;
							}
						}

						.box-content-main-list-li-info {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							height: 132rpx;
							margin-left: 20rpx;
							flex: 1;

							.box-content-main-list-li-info-text {
								display: flex;
								align-items: center;
								justify-content: space-between;

								.list-li-info-text-title {
									font-size: 30rpx;
									font-weight: 500;
									line-height: 30rpx;
								}

								.list-li-info-text-price {
									font-size: 28rpx;
								}
							}

							.box-content-main-list-li-info-bottom {
								display: flex;
								align-items: center;
								justify-content: space-between;

								.list-li-info-bottom-stepper {
									display: flex;
									width: 220rpx;
									height: 60rpx;
									border: 1rpx solid #E0E0E0;
									border-radius: 10rpx;

									.list-li-info-bottom-stepper-reduce {
										width: 80rpx;
										height: 6;

										.icon-font {
											font-size: 32rpx;
											transition: 0.3s;
										}
									}

									.list-li-info-bottom-stepper-num {
										flex: 1;
										font-size: 28rpx;
										color: #000;
									}

									.list-li-info-bottom-stepper-add {
										width: 80rpx;
										height: 60rpx;

										.icon-font {
											font-size: 32rpx;
											transition: 0.3s;
										}
									}
								}

								.list-li-info-bottom-delete {}
							}
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
