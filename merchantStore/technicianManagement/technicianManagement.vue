<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">技师管理</view>
				<view class="box-head-ico flex-center">
					<text class="iconfont iconsousuo1 icon-font"
						style="color: #5DBDFE;font-size: 52rpx;margin-top: 4rpx;"></text>
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
						<swiper-item class="swiper-box-item-list" v-for="(item,index) in tabsList" :key='index'>
							<scroll-technician-swiper-item ref="tech" :store='id' :tabIndex="index" :currentIndex="defaultIndex">
							</scroll-technician-swiper-item>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="btn-1" v-if="defaultIndex==0">
				<btn-sky-blue btnName="新增技师" @btnClick="addTechnician" />
			</view>
			<view class="btn-2" v-if="defaultIndex==1">
				<btn-sky-blue btnName="新增临时技师" />
			</view>
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import merchantTabs from "../../components/merchant-tabs/merchant-tabs.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import scrollTechnicianSwiperItem from "../../components/scroll-technician-swiper-item/scroll-technician-swiper-item.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				defaultIndex: 0, //当前滑动的页面
				tabsList: ["全职技师 0", "临时技师 0"],
				id:'',
			};
		},
		components: {
			navTitleBalck,
			merchantTabs,
			btnSkyBlue,
			scrollTechnicianSwiperItem
		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onLoad(options) {
			this.id=options.id
		},
		onShow() {
			console.log(this.$store.state.isAddTechhnician)
			if (this.$store.state.isAddTechhnician) {
				this.$refs.tech[this.defaultIndex].getDataList(1, 10)
			}
		},
		methods: {
			//返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 新增技师
			addTechnician() {
				this.$store.commit('upAddTechhnician', false)
				var str = {
					type: 'add',
					storeId: this.id
				}
				uni.navigateTo({
					url:"../../merchantStore/newTechnician/newTechnician?data="+JSON.stringify(str)
				})
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

			.box-head-nav {
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;
				height: 88rpx;

				.box-head-back {
					width: 50rpx;
				}

				.box-head-title {
					flex: 1;
					text-align: center;
					font-size: 34rpx;
					font-weight: 500;
					color: #000;
				}

				.box-head-ico {
					width: 50rpx;
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

		.box-footer {
			position: relative;
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			overflow: hidden;
		}

	}
</style>
