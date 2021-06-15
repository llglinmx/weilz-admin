<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="招聘信息"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-screen" :style="{display:isData?'block':'none'}">
				<view class="box-content-screen-search">
					<text class="iconfont iconshaixuan icon-font" style="color: #000;font-size: 36rpx"></text>
					<text style="margin-left: 10rpx;">筛选</text>
				</view>
			</view>
			<view class="box-content-screen-main" :style="{display:isData?'block':'none'}">
				<z-paging ref="paging1" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
					:refresher-angle-enable-change-continued="false" :touchmove-propagation-enabled="true"
					:use-custom-refresher="true" style="height: 100%;">
					<view class="box-content-screen-main-list">
						<view class="screen-main-list-li" v-for="(item,index) in dataList" :key="item.id">
							<view class="screen-main-list-li-top">
								<view class="screen-main-list-li-top-title">{{item.position}}</view>
								<view class="screen-main-list-li-top-text">{{item.salary}}/月</view>
							</view>
							<view class="screen-main-list-li-type">
								<view class="screen-main-list-li-type-item"
									v-for="(i,j) in typeSplit(item.position_benefits)">{{i}}</view>
							</view>
							<view class="screen-main-list-li-name">
								<view class="screen-main-list-li-name-title"
									v-if="item.store_info!=null&&item.store_info!=''">{{item.store_info.name}}</view>
								<view class="screen-main-list-li-name-more">
									<text class="iconfont icongengduo icon-font"
										style="color: #ccc;font-size: 28rpx;margin-top: 4rpx;"></text>
								</view>
							</view>
							<view class="screen-main-list-li-addresss">
								<text class="iconfont icondingwei1 icon-font"
									style="color: #B3B3B3;font-size: 26rpx;margin-top: 4rpx;"></text>
								<text style="margin-left: 10rpx;">{{item.place_work}}</text>
							</view>
						</view>
					</view>
				</z-paging>
			</view>
			<view class="box-content-screen-main" :style="{display:!isData?'block':'none'}">
				<loading v-if="isLoad" />
				<no-data v-if="!isLoad" />
			</view>

		</view>

	</view>
</template>

<script>

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				dataList: [],
				isData: false,
				isLoad: true,
			};
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
			// 上拉 下拉
			queryList(pageNo, pageSize) {
				this.recruitList(pageNo, pageSize)
			},


			// 订单列表
			recruitList(num, size) {
				var vuedata = {
					status: 1,
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
				}
				this.apiget('api/v1/engineer/Recruitment', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.data.length != 0) {
							this.isData = true
							let list = res.data.data
							this.$refs.paging1.complete(list);
							return false;
						}
						this.isData = false
						this.isLoad = false

					}
				});
			},
			typeSplit(val) {
				var str = val.split(',')
				return str
			},
		}
	}
</script>

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #f7f7f7;

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
					background: #fff;
					font-size: 28rpx;
					color: #000;

					text {}
				}
			}

			.box-content-screen-main {
				flex: 1;
				overflow-y: scroll;

				.box-content-screen-main-list {
					height: 100%;
					padding-left: 40rpx;
					box-sizing: border-box;
					background: #fff;

					.screen-main-list-li:last-child {
						border-bottom: 0;
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
								margin-bottom: 10rpx;
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
