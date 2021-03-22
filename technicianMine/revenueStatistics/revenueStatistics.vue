<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="收益统计"></nav-title-white>
			<view class="box-content-tabs">
				<liuyuno-tabs ref="boxTabs" :tabData="tabs" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-main-head">
				<view class="box-content-main-head-li">
					<view class="box-content-main-head-li-text">日期</view>
					<view class="box-content-main-head-li-text">收益</view>
					<view class="box-content-main-head-li-text">订单量</view>
				</view>
			</view>
			<view class="box-content-main">
				<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"
					:height="mesHeight">
					<view class="box-content-main-list">
						<view class="box-content-main-list-li" v-for="(item,index) in 100" :key="index">
							<view class="box-content-main-list-li-text">2021第{{index+1}}周</view>
							<view class="box-content-main-list-li-text">32158.41</view>
							<view class="box-content-main-list-li-text">{{index+99}}</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
	</view>
</template>

<script>
	import navTitleWhite from "../../components/nav-title-white/nav-title-white.vue"
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				defaultIndex: 0,
				tabs: ["按天", "按周", "按月", "按年"],
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
			navTitleWhite,
			liuyunoTabs,
			MescrollUni
		},
		onShow() {
			const sys = uni.getSystemInfoSync();
			var Heigh = sys.windowHeight
			this.mesHeight = (Heigh - 140) * 2
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
			// tabs 点击
			tabClick(e) {
				this.defaultIndex = e
			},

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

		.box-head {
			height: 164rpx;
			background-color: #26BF82;
			padding-bottom: 10rpx;
		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.box-content-main-head {
				height: 100rpx;
				background: #fff;

				.box-content-main-head-li {
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					.box-content-main-head-li-text {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #666;
						font-size: 26rpx;
					}

					.box-content-main-head-li-text:nth-child(1) {
						font-size: 32rpx;
						font-weight: 500;
						color: #000;
					}
				}
			}

			.box-content-main {
				flex: 1;
				overflow-y: scroll;

				.box-content-main-list {
					display: flex;
					flex-direction: column;

					.box-content-main-list-li {
						display: flex;
						height: 88rpx;
						background: #F7F7F7;

						.box-content-main-list-li-text {
							display: flex;
							align-items: center;
							justify-content: center;
							flex: 1;
							color: #333;
							font-size: 28rpx;
						}

						.box-content-main-list-li-text:nth-child(2) {
							color: #26BF82;
						}

					}

					.box-content-main-list-li:nth-child(2n) {
						background: #fff;
					}
				}
			}


		}

	}
</style>
