<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav"></view>
			<view class="box-head-search">
				<view class="box-head-search-box">
					<view class="box-head-search-box-icon"
						:class="isSearch?'box-head-search-box-icon-active':'box-head-search-box-icon-no-active'">
						<text class="iconfont iconsousuo1 icon-font"
							style="color: #999;font-size: 40rpx;margin-top: 4rpx;"></text>
						<input type="text" value="" @focus="focus" @blur="blur" placeholder="搜索订单号、预约信息" />
					</view>
				</view>
			</view>
			<view class="box-head-tabs">
				<merchant-tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list" v-for="(item,index) in tabsList" :key="index">
							<scroll-order-swiper-item :tabIndex="index" :currentIndex="defaultIndex">
							</scroll-order-swiper-item>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<merchant-tabbar @tabbarClick="tabbarClick" :activeIndex="activeIndex"></merchant-tabbar>
		</view>
	</view>
</template>

<script>
	import merchantTabbar from "../../components/merchant-tabbar/merchant-tabbar.vue"
	import merchantTabs from "../../components/merchant-tabs/merchant-tabs.vue"
	import scrollOrderSwiperItem from '../../components/scroll-order-swiper-item/scroll-order-swiper-item.vue'
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				activeIndex: 1, //当前tabbar所在页面
				defaultIndex: 0, //当前滑动的页面
				tabsList: ["订单管理", "预约订单", "打赏记录", "积分兑换", "买单记录"],
				isSearch: false, //是否搜索
			};
		},
		components: {
			merchantTabbar,
			merchantTabs,
			scrollOrderSwiperItem
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

			// input框 获得焦点事件
			focus() {
				this.isSearch = true
			},
			// 失去焦点事件
			blur() {
				console.log(111)
				this.isSearch = false
			},


		

			// tabs 点击
			tabClick(e) {
				this.defaultIndex = e
			},
			// 滑动切换列表
			tabChange(e) {
				this.$refs.boxTabs.tabToIndex(e.detail.current)
				this.defaultIndex = e.detail.current
			},


			// tabbar点击
			tabbarClick(index) {
				this.activeIndex = index
				switch (index) {
					case 0: //首页
						uni.redirectTo({
							url: "../merchantHome/merchantHome"
						})
						break;
					case 1: //订单

						break;
					case 2: //门店
						uni.redirectTo({
							url: "../merchantStore/merchantStore"
						})
						break;
					case 3: //商城
						uni.redirectTo({
							url: "../merchantMall/merchantMall"
						})
						break;
					case 4: //我的
						uni.redirectTo({
							url: "../merchantMine/merchantMine"
						})
						break;
				}

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

			.box-head-search {
				margin-top: 20rpx;
				padding: 0 20rpx;
				box-sizing: border-box;

				.box-head-search-box {
					position: relative;
					height: 68rpx;
					background: #F7F7F7;
					border-radius: 34rpx;

					.box-head-search-box-icon {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 170rpx;
						margin: auto;
						width: 370rpx;
						display: flex;
						align-items: center;
						transition: 0.3s;
						overflow: hidden;
						text-align: left;

						.icon-font {
							margin-left: 20rpx;
							margin-right: 10rpx;
						}

						input {
							font-size: 28rpx;
							width: 100%;
							height: 100%;
						}
					}

					.box-head-search-box-icon-active {
						left: 0 !important;
						width: 100% !important;
					}

					.box-head-search-box-icon-no-active {
						left: 170rpx;
						width: 370rpx;
					}

				}
			}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-wrap {
				height: 100%;
				overflow-y: scroll;

				.box-content-wrap-item {
					height: 100%;

					.swiper-box {
						height: 100%;
						overflow-y: scroll;

						.swiper-box-item-list {
							height: 100%;
							overflow-y: scroll;




						}
					}
				}
			}
		}

		.box-footer {}
	}
</style>
