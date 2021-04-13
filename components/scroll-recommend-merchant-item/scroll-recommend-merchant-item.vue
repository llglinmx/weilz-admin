<template>
	<view class="content">
		<!-- 这里设置了z-paging加载时禁止自动调用reload方法，自行控制何时reload（懒加载），同时允许touchmove事件冒泡，否则无法横向滚动切换tab -->
		<z-paging ref="paging" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
			:mounted-auto-call-reload="false" :refresher-angle-enable-change-continued="false"
			:touchmove-propagation-enabled="true" :use-custom-refresher="true" style="height: 100%;">
			<!-- 自定义下拉刷新view，若不设置，则使用z-paging自带的下拉刷新view -->
			<!-- <custom-refresher slot="refresher"></custom-refresher> -->
			<loading-merchant v-if="isLoad"></loading-merchant>
			<no-data v-if="dataList.length<=0&&!isLoad"></no-data>
			<!-- <empty-view slot="empty"></empty-view> -->
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
			<view class="box-item-list-recommend" v-if="dataList.length>0&&tabIndex==0">
				<region-tab></region-tab>
				<view class="box-item-list-recommend-main">
					<view class="box-item-list-recommend-main-list">
						<view class="recommend-main-list-li" v-for="(item,index) in dataList" :key="index">
							<view class="recommend-main-list-li-top">
								<view class="recommend-main-list-li-top-left">
									<view class="recommend-main-list-li-top-left-image">
										<image :src="item.photo" mode="aspectFill"></image>
									</view>
									<view class="recommend-main-list-li-top-left-info">
										<view class="recommend-main-list-li-top-left-info-title">{{item.name}}</view>
										<view class="recommend-main-list-li-top-left-info-text">执业6年
										</view>
									</view>
								</view>
								<view class="recommend-main-list-li-top-btn flex-center">联系TA</view>
							</view>
							<view class="recommend-main-list-li-bottom" v-html="item.introduce"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="box-item-list-recommend" v-if="dataList.length>0&&tabIndex==1">
				<region-tab></region-tab>
				<view class="box-item-list-recommend-main">
					<view class="box-item-list-recommend-main-list">
						<view class="recommend-main-list-li" v-for="(item,index) in dataList" :key="index">
							<view class="recommend-main-list-li-top">
								<view class="recommend-main-list-li-top-left">
									<view class="recommend-main-list-li-top-left-image">
										<image :src="item.photo" mode="aspectFill"></image>
									</view>
									<view class="recommend-main-list-li-top-left-info">
										<view class="recommend-main-list-li-top-left-info-title">{{item.name}}</view>
										<view class="recommend-main-list-li-top-left-info-text">执业6年
										</view>
									</view>
								</view>
								<view class="recommend-main-list-li-top-btn flex-center">联系TA</view>
							</view>
							<view class="recommend-main-list-li-bottom" v-html="item.introduce"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="box-item-list-business " v-if="dataList.length>0&&tabIndex==2">
				<region-tab></region-tab>
				<view class="box-item-list-business-main">
					<view class="business-main-list">
						<view class="business-main-list-li" v-for="(item,index) in dataList" :key="index">
							<view class="business-main-list-li-image">
								<image :src="item.photo" mode="aspectFill"></image>
							</view>
							<view class="business-main-list-li-info">
								<view class="business-main-list-li-info-title">{{item.name}}</view>
								<view class="business-main-list-li-info-score">
									<text class="iconfont iconwujiaoxing icon-font"
										style="color: #FFCD4D;font-size: 28rpx;" v-for="item in 5"></text>
									<text>5分</text>
								</view>
								<view class="business-main-list-li-info-text">地址：{{item.detailed_address}}</view>
								<view class="business-main-list-li-info-text">电话：{{item.mobile}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="box-item-list-recommend" v-if="dataList.length>0&&tabIndex==3">
				<region-tab></region-tab>
				<view class="box-item-list-recommend-main">
					<view class="box-item-list-recommend-main-list">
						<view class="recommend-main-list-li" v-for="(item,index) in dataList" :key="item.id">
							<view class="recommend-main-list-li-top">
								<view class="recommend-main-list-li-top-left">
									<view class="recommend-main-list-li-top-left-image">
										<image :src="item.photo" mode="aspectFill"></image>
									</view>
									<view class="recommend-main-list-li-top-left-info">
										<view class="recommend-main-list-li-top-left-info-title">
											<text class="title-name">吴先森</text>
											<text class="title-text">总监</text>
										</view>
										<view class="recommend-main-list-li-top-left-info-text" style="color:#333333">
											{{item.name}}
										</view>
									</view>
								</view>
								<view class="recommend-main-list-li-top-btn flex-center">投递项目</view>
							</view>
							<view class="recommend-main-list-li-bottom"
								style="color: #999;padding-left: 118rpx;box-sizing: border-box;">
								关注地区：安徽省/北京/重庆/福建省/甘肃省/广东省/广西/贵州省
							</view>
						</view>
					</view>
				</view>
			</view>

		</z-paging>
	</view>
</template>

<script>
	import zPaging from "../z-paging/components/z-paging/z-paging.vue"
	export default {
		data() {
			return {
				dataList: [],
				firstLoaded: false,
				isLoad: true,
			}
		},
		components: {
			zPaging
		},
		props: {
			tabIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			currentIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			typeId: {

			}
		},
		watch: {
			currentIndex: {
				handler(newVal) {
					if (newVal === this.tabIndex) {
						//懒加载，当滑动到当前的item时，才去加载
						if (!this.firstLoaded) {
							this.$nextTick(() => {
								this.$refs.paging.reload();
							})
						}
					}
				},
				immediate: true
			},
		},
		methods: {
			queryList(pageNo, pageSize) {
				//组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//模拟请求服务器获取分页数据，请替换成自己的网络请求
				// this.$request.queryList(pageNo, pageSize, this.tabIndex + 1, (data) => {
				// 	this.$refs.paging.complete(data);
				// 	this.firstLoaded = true;
				// })
				var page = {
					num: pageNo,
					size: pageSize,

				}
				this.getDataList(page)
			},


			// 获取数据
			getDataList(page) {
				var vuedata = {
					page_index: page.num, // 请求页数，
					each_page: page.size, // 请求条数
					type_id: this.typeId,
				}
				this.apiget('api/v1/store/Recommend', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.member.length != 0) {
							let list = res.data.member
							let totalSize = res.data.total_rows
							this.$refs.paging.addData(list);
							this.firstLoaded = true;
						}
						this.isLoad = false
					}
				});
			},
			// 查看券码 
			viewCouponCode(item) {
				this.$emit('couponCode', item.id)
			}
		}
	}
</script>

<style scoped lang="scss">
	.box-item-list-business {
		height: 100%;
		display: flex;
		flex-direction: column;


		.box-item-list-business-main {
			flex: 1;
			overflow-y: scroll;

			.business-main-list {
				padding-left: 40rpx;
				box-sizing: border-box;

				.business-main-list-li:first-child {
					padding-top: 0;
				}

				.business-main-list-li {
					display: flex;
					align-items: center;
					padding: 40rpx 40rpx 40rpx 0;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ededed;

					.business-main-list-li-image {
						display: flex;
						align-items: center;

						image {
							width: 164rpx;
							height: 164rpx;
							border-radius: 10rpx;
						}
					}

					.business-main-list-li-info {
						margin-left: 20rpx;
						flex: 1;
						height: 164rpx;

						.business-main-list-li-info-title {
							line-height: 32rpx;
							font-size: 34rpx;
							color: #000;
						}

						.business-main-list-li-info-score {
							margin-top: 10rpx;
							display: flex;
							align-items: center;

							text {
								margin-right: 6rpx;
								font-size: 24rpx;
								color: #999;
							}
						}

						.business-main-list-li-info-text {
							margin-top: 10rpx;
							font-size: 24rpx;
							color: #666;
						}
					}
				}
			}
		}
	}

	.box-item-list-recommend {
		height: 100%;
		display: flex;
		flex-direction: column;

		.box-item-list-recommend-main {
			flex: 1;
			overflow-y: scroll;

			.box-item-list-recommend-main-list {
				margin-bottom: 40rpx;
				padding-left: 40rpx;
				box-sizing: border-box;

				.recommend-main-list-li:first-child {
					padding-top: 0;
				}

				.recommend-main-list-li {
					padding: 40rpx 40rpx 40rpx 0;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ededed;

					.recommend-main-list-li-top {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.recommend-main-list-li-top-left {
							display: flex;
							align-items: center;

							.recommend-main-list-li-top-left-image {
								display: flex;

								image {
									width: 98rpx;
									height: 98rpx;
									border-radius: 50%;
								}
							}

							.recommend-main-list-li-top-left-info {
								margin-left: 20rpx;
								flex: 1;

								.recommend-main-list-li-top-left-info-title {
									font-size: 34rpx;
									color: #000;
								}

								.recommend-main-list-li-top-left-info-text {
									font-size: 26rpx;
									color: #999;
								}
							}
						}

						.recommend-main-list-li-top-btn {
							width: 149rpx;
							height: 60rpx;
							background: #5DBDFE;
							border-radius: 30rpx;
							color: #fff;
							font-size: 28rpx;
						}
					}

					.recommend-main-list-li-bottom {
						margin-top: 10rpx;
						font-size: 26rpx;
						color: #333;
					}
				}
			}
		}
	}

	.box-item-list-recommend {
		height: 100%;
		display: flex;
		flex-direction: column;

		.box-item-list-recommend-main {
			flex: 1;
			overflow-y: scroll;

			.box-item-list-recommend-main-list {
				margin-bottom: 40rpx;
				padding-left: 40rpx;
				box-sizing: border-box;

				.recommend-main-list-li:first-child {
					padding-top: 0;
				}

				.recommend-main-list-li {
					padding: 40rpx 40rpx 40rpx 0;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ededed;

					.recommend-main-list-li-top {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.recommend-main-list-li-top-left {
							display: flex;
							align-items: center;

							.recommend-main-list-li-top-left-image {
								display: flex;

								image {
									width: 98rpx;
									height: 98rpx;
								}
							}

							.recommend-main-list-li-top-left-info {
								margin-left: 20rpx;
								flex: 1;

								.recommend-main-list-li-top-left-info-title {
									display: flex;
									align-items: center;
									font-size: 34rpx;
									color: #000;

									.title-name {
										display: flex;
										align-items: center;
										height: 34rpx;
										padding-right: 16rpx;
										border-right: 1rpx solid #666;
										font-size: 34rpx;
										color: #000;
									}

									.title-text {
										margin-left: 16rpx;
										font-size: 28rpx;
										color: #333;
									}
								}

								.recommend-main-list-li-top-left-info-text {
									margin-top: 15rpx;
									font-size: 26rpx;
									color: #999;
								}

							}
						}

					}

					.recommend-main-list-li-bottom {
						margin-top: 15rpx;
						font-size: 26rpx;
						color: #333;
					}
				}
			}
		}
	}
</style>
