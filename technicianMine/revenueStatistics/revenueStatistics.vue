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
				<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
					<swiper-item class="swiper-box-item-list" v-for="(item,index) in tabs" :key="item.id">
						<scroll-profit-swiper-item :tabIndex="index" :currentIndex="defaultIndex">
						</scroll-profit-swiper-item>
					</swiper-item>
				</swiper>


			</view>
		</view>
	</view>
</template>

<script>
	import navTitleWhite from "../../components/nav-title-white/nav-title-white.vue"
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	import scrollProfitSwiperItem from '../../components/scroll-profit-swiper-item/scroll-profit-swiper-item.vue'
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				defaultIndex: 0,
				tabs: ["按天", "按周", "按月", "按年"],

			};
		},
		components: {
			navTitleWhite,
			liuyunoTabs,
			scrollProfitSwiperItem
		},
		onShow() {

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
			// 滑动切换列表
			tabChange(e) {
				this.$refs.boxTabs.tabToIndex(e.detail.current)
				this.defaultIndex = e.detail.current
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

				.swiper-box {
					height: 100%;

					.swiper-box-item-list {
						height: 100%;
					}
				}
			}


		}

	}
</style>
