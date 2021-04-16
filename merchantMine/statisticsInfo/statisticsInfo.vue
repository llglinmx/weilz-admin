<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-nav-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #fff;font-size: 36rpx;margin-top: 4rpx;"></text>
				</view>
				<view class="box-head-nav-list">
					<view class="box-head-nav-list-li flex-center" v-for="(item,index) in tabs" :key="index"
						@click="tabsClice(index)">
						{{item}}
						<text :class="defaultIndex==index?'text-active':''"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list">
							<sticky-store />
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<sticky-technician />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import stickyStore from '../../components/sticky-store/sticky-store.vue'
	import stickyTechnician from '../../components/technician-store/technician-store.vue'

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				defaultIndex: 0, //默认当前显示界面
				tabs: ["门店统计", "技师统计"],
				technicianList: [],
				updateStatus: false,

			}
		},
		components: {
			navTitleBalck,
			stickyTechnician,
			stickyStore
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

		},

		methods: {

			//返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 技师详情
			technicianDetail() {
				uni.navigateTo({
					url: "../technicianDetails/technicianDetails"
				})
			},

			// 导航栏点击
			tabsClice(index) {
				this.defaultIndex = index
			},
			// 滑动切换列表
			tabChange(e) {
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
		background: #F7F7F7;

		.box-head {
			background-color: #5DBDFE;

			.box-head-nav {
				display: flex;
				align-items: center;
				height: 88rpx;
				padding: 0 20rpx;

				.box-head-nav-back {
					width: 50rpx;
					height: 50;
				}

				.box-head-nav-list {
					padding: 0 140rpx;
					box-sizing: border-box;
					display: flex;
					flex: 1;

					.box-head-nav-list-li {
						position: relative;
						font-weight: 500;
						font-size: 34rpx;
						color: #fff;
						flex: 1;

						text {
							position: absolute;
							left: 0;
							right: 0;
							bottom: -10rpx;
							margin: auto;
							width: 0;
							height: 4rpx;
							background: #FFFFFF;
							border-radius: 3rpx;
							opacity: 0;
							transition: 0.5s;
						}

						.text-active {
							width: 120rpx !important;
							opacity: 1;
						}
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
