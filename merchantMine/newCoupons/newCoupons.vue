<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="新增优惠券"></nav-title-balck>
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
					<view class="box-content-list-li-title">优惠券名称</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入优惠券名称" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">优惠券起用金额</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入金额" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">优惠券减免金额</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入金额" />
							<text>元</text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">库存</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="上限为10000" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">有效期</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">固定日期区间</view>
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
					<view class="box-content-list-li-title">适用分类</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">已选中4个项目</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">发放状态</view>
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
					<view class="box-content-list-li-item-title">优惠券使用说明</view>
					<view class="box-content-list-li-item-textarea">
						<textarea value="" placeholder="例如：不可与其他优惠同享" />
					</view>
				</view>
			</view>

			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">活动开始时间</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请设置日期</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">活动结束时间</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请设置日期</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="确认提交" @btnClick="confirm" />
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
		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
		}
	}
</style>
