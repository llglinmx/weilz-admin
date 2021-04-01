<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="navTitle"></nav-title-balck>
			<view class="box-head-tabs">
				<tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list" v-for="(item,index) in tabsList" :key="item.id">
							<scroll-recommend-swiper-item :tabIndex="index" :typeId='typeId'
								:currentIndex="defaultIndex"></scroll-recommend-swiper-item>
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
	import loading from '../../components/loading/loading.vue'
	import noData from '../../components/no-data/no-data.vue'
	import zPaging from '../../components/z-paging/components/z-paging/z-paging.vue'
	import scrollRecommendSwiperItem from '../../components/scroll-recommend-swiper-item/scroll-recommend-swiper-item.vue'
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				tabsList: [],
				defaultIndex: 0, //当前滑动的页面
				navTitle: "", //标题名称
				typeId: ''
			};
		},
		components: {
			tabs,
			navTitleBalck,
			loading,
			noData,
			zPaging,
			scrollRecommendSwiperItem
		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onLoad() {
			this.getType()
		},
		methods: {


			// 获取分类
			getType() {
				var vuedata = {
					type: 13
				}
				this.apiget('pc/category/category_type', vuedata).then(res => {
					if (res.status == 200) {
						this.tabsList = res.data.reverse()
						this.navTitle = this.tabsList[0].name + '推荐'
						this.typeId = this.tabsList[0].id
					}
				});
			},

			getData() {

			},



			// tabs 点击
			tabClick(e) {
				this.defaultIndex = e
			},
			// 滑动切换列表
			tabChange(e) {

				this.$refs.boxTabs.tabToIndex(e.detail.current)
				this.defaultIndex = e.detail.current
				this.navTitle = this.tabsList[this.defaultIndex].name + '推荐';

				this.typeId = this.tabsList[this.defaultIndex].id
				console.log(this.typeId)
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

			.box-head-tabs {}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;
			background: #fff;

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
