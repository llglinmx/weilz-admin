<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="评价管理"></nav-title-balck>
			<view class="box-head-tabs">
				<tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list" v-for="(item,index) in tabsList" :key="item.id">
							<scroll-comment-swiper-item :tabIndex="index" :currentIndex="defaultIndex">
							</scroll-comment-swiper-item>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer">

		</view>
	</view>
</template>

<script>
	import tabs from "../../components/tabs/tabs.vue"
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import scrollCommentSwiperItem from '../../components/scroll-comment-swiper-item/scroll-comment-swiper-item.vue'
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				tabsList: ["客户评价", "商家评价"],
				defaultIndex: 0, //当前滑动的页面
			};
		},
		components: {
			tabs,
			navTitleBalck,
			scrollCommentSwiperItem
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
		background: #fff;

		.box-head {}

		.box-content {
			flex: 1;
			overflow-y: scroll;
			border-top: 1rpx solid #ededed;

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

						}
					}
				}
			}
		}

		.box-footer {}
	}
</style>
