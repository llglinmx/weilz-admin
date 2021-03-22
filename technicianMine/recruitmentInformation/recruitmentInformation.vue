<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="招聘信息"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-screen">
				<view class="box-content-screen-search">
					<text class="iconfont iconshaixuan icon-font" style="color: #000;font-size: 36rpx"></text>
					<text style="margin-left: 10rpx;">筛选</text>
				</view>
			</view>
			<view class="box-content-screen-main">
				<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"
					:height="mesHeight">
					<view class="box-content-screen-main-list">
						<view class="screen-main-list-li" v-for="(item,index) in 10" :key="index">
							<view class="screen-main-list-li-top">
								<view class="screen-main-list-li-top-title">全职按摩师</view>
								<view class="screen-main-list-li-top-text">6000+抽成/月</view>
							</view>
							<view class="screen-main-list-li-type">
								<view class="screen-main-list-li-type-item">学历不限</view>
								<view class="screen-main-list-li-type-item">3年以上</view>
							</view>
							<view class="screen-main-list-li-name">
								<view class="screen-main-list-li-name-title">
									厦门然选集美容美体有限公司
								</view>
								<view class="screen-main-list-li-name-more">
									<text class="iconfont icongengduo icon-font"
										style="color: #ccc;font-size: 28rpx;margin-top: 4rpx;"></text>
								</view>
							</view>
							<view class="screen-main-list-li-addresss">
								<text class="iconfont icondingwei1 icon-font"
									style="color: #B3B3B3;font-size: 26rpx;margin-top: 4rpx;"></text>
								<text style="margin-left: 10rpx;">思明区 观音山</text>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
		<view class="box-footer">

		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				mesHeight: 0,
				downOption: { // 下拉刷新配置
					auto: false,
				},
				upOption: { // 上拉加载配置
					noMoreSize: 5,
					textLoading: "正在加载更多数据",
					textNoMore: "——  已经到底了  ——",
					isBounce: true,
					auto: false,
				},
				PageNumber: 1, // 请求页数，
				PageLimt: 10, // 请求条数
			};
		},
		components: {
			navTitleBalck,
			MescrollUni
		},
		onShow() {
			const sys = uni.getSystemInfoSync();
			var Heigh = sys.windowHeight
			this.mesHeight = (Heigh - 100) * 2
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
			/*下拉刷新的回调*/
			downCallback() {
				this.PageNumber = 1
				setTimeout(() => {
					this.mescroll.endSuccess() // 请求成功 隐藏加载状态

					// this.mescroll.showNoMore()

				}, 1500)
			},

			/*上拉加载的回调*/
			upCallback(page) {
				this.PageNumber++
				console.log(this.PageNumber)
				setTimeout(() => {
					this.mescroll.endSuccess() // 请求成功 隐藏加载状态
					// if (this.PageNumber > 3) {
					this.mescroll.showNoMore()
					// }
				}, 1500)
				console.log("上拉加载")
			},
		}
	}
</script>

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;

		.box-head {
			background-color: #fff;
		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.box-content-screen {
				padding: 0 40rpx;

				.box-content-screen-search {
					margin: 20rpx 0;
					height: 72rpx;
					border-radius: 40rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #F7F7F7;
					font-size: 28rpx;
					color: #000;

					text {}
				}
			}

			.box-content-screen-main {
				flex: 1;
				overflow-y: scroll;

				.box-content-screen-main-list {
					padding-left: 40rpx;
					box-sizing: border-box;

					.screen-main-list-li:first-child {
						padding-top: 20rpx;
					}

					.screen-main-list-li {
						padding: 40rpx 40rpx 40rpx 0;
						box-sizing: border-box;
						border-bottom: 1rpx solid #ededed;

						.screen-main-list-li-top {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.screen-main-list-li-top-title {
								font-size: 36rpx;
								color: #000;
							}

							.screen-main-list-li-top-text {
								font-size: 32rpx;
								color: #26BF82;
							}
						}

						.screen-main-list-li-type {
							margin-top: 20rpx;
							display: flex;
							flex-wrap: wrap;

							.screen-main-list-li-type-item {
								padding: 10rpx 16rpx;
								box-sizing: border-box;
								margin-right: 10rpx;
								color: #666;
								font-size: 24rpx;
								background: #F7F7F7;
								border-radius: 5rpx;
							}
						}

						.screen-main-list-li-name {
							margin-top: 15rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.screen-main-list-li-name-title {
								font-size: 28rpx;
								color: #333;
							}

							.screen-main-list-li-name-more {}
						}

						.screen-main-list-li-addresss {
							margin-top: 10rpx;
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: #B3B3B3;
						}
					}
				}
			}
		}

		.box-footer {}
	}
</style>
