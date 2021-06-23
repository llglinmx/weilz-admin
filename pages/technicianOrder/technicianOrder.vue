<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav"></view>
			<view class="box-head-search" style="margin-top: 20rpx;">
				<view class="box-head-search-box">
					<view class="box-head-search-box-icon"
						:class="isSearch?'box-head-search-box-icon-active':'box-head-search-box-icon-no-active'">
						<text class="iconfont iconsousuo1 icon-font"
							style="color: #999;font-size: 40rpx;margin-top: 4rpx;" @click="searchChange"></text>
						<input type="text"  confirm-type="search" @confirm="searchChange" @keydown.enter="searchChange" v-model.trim="searchVal" @focus="focus"
							@blur="blur" placeholder="搜索订单号、预约信息" />
					</view>
				</view>
			</view>
			<view class="box-head-tabs">
				<tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list" v-for="(item,index) in tabsList" :key="index">
							<scroll-tab-swiper-item ref='orderRef' :search='searchVal' :tabIndex="index"
								:orderType='status' :currentIndex="defaultIndex">
							</scroll-tab-swiper-item>
						</swiper-item>

					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<technician-tabbar @tabbarClick="tabbarClick" :activeIndex="activeIndex"></technician-tabbar>
		</view>
	</view>
</template>

<script>
	import tabs from "../../components/tabs/tabs.vue"
	import scrollTabSwiperItem from '../../components/scroll-tab-swiper-item/scroll-tab-swiper-item.vue'
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				activeIndex: 1, //当前tabbar所在页面
				defaultIndex: 0, //当前滑动的页面
				tabsList: ["全部订单", "待核销", "已核销", "已退款", "已评价"],
				isSearch: false, //是否搜索
				status: '', //订单类型
				searchVal: '',
			};
		},
		components: {
			tabs,
			scrollTabSwiperItem
		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onShow() {
			if (this.$store.state.isOrderState) {
				this.$refs.orderRef[this.defaultIndex].getDataList(1, 20)
			}
		},
		methods: {
			// input框 获得焦点事件
			focus() {
				this.isSearch = true
			},
			// 失去焦点事件
			blur() {
				this.isSearch = false
			},

			// 搜索
			searchChange() {
				this.$refs.orderRef[this.defaultIndex].getDataList(1, 20)
			},

			// tabs 点击
			tabClick(e) {
				this.defaultIndex = e
			},
			// 滑动切换列表
			tabChange(e) {
				this.$refs.boxTabs.tabToIndex(e.detail.current)
				this.defaultIndex = e.detail.current
				this.changeIndex(this.defaultIndex)
			},

			changeIndex(index) {
				switch (index) {
					case 0:
						this.status = ''
						break;
					case 1:
						this.status = '1'
						break;
					case 2:
						this.status = '2'
						break;
					case 3:
						this.status = '3'
						break;
					case 4:
						this.status = '4'
						break;
				}
			},


			// tabbar点击
			tabbarClick(index) {
				switch (index) {
					case 0: //首页
						uni.redirectTo({
							url: "../../pages/technicianHome/technicianHome"
						})
						break;
					case 1: //订单

						break;
					case 2: //我的
						uni.redirectTo({
							url: "../../pages/technicianMine/technicianMine"
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
