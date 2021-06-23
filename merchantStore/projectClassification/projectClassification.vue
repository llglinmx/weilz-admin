<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">分类管理</view>
				<view class="box-head-ico flex-center">
					<text class="iconfont iconsousuo1 icon-font" @click="openSearch"
						style="color: #5DBDFE;font-size: 52rpx;margin-top: 4rpx;" v-if="!isSearch" />
					<text class="iconfont iconcuowu icon-font" @click="closeSearch"
						style="color: #5DBDFE;font-size: 52rpx;margin-top: 4rpx;" v-if="isSearch" />
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-search"
				:style="{height:isSearch?'auto':'0',padding:isSearch?'30rpx 40rpx':'0 40rpx'}">
				<view class="box-content-search-box">
					<input confirm-type="search" @confirm="getDataList(1,20)" :focus="isFocus" type="text" @keydown.enter="getDataList(1,20)" v-model.trim="searchVal"
						placeholder="请输入需要搜索的内容" />
					<text class="iconfont iconsousuo1 icon-font" style="color: #999;font-size: 48rpx;margin-top: 4rpx;"
						@click="getDataList(1,20)"></text>
				</view>
			</view>
			<view class="box-content-wrap" :style="{display:isData?'block':'none'}">
				<view class="box-content-wrap-item">
					<z-paging ref="paging" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
						:refresher-angle-enable-change-continued="false" :touchmove-propagation-enabled="true"
						:use-custom-refresher="true">
						<view class="box-content-main">
							<view class="box-content-main-list">
								<view class="box-content-main-list-li" v-for="(item,index) in dataList" :key="item.id">
									<view class="box-content-main-list-li-top">
										<view class="box-content-main-list-li-top-image">
											<image :src="item.icon" mode="aspectFill"></image>
										</view>
										<view class="box-content-main-list-li-top-info">
											<view class="box-content-main-list-li-top-info-title">
												<view class="box-content-main-list-li-top-info-title-text">
													分类名称：{{item.name}}
												</view>
											</view>
											<view class="box-content-main-list-li-top-info-msg">适用门店：{{item.store_name}}
											</view>
											<view class="box-content-main-list-li-top-info-msg">
												状态：{{item.status==1?'正常':'关闭'}}</view>
										</view>
									</view>
									<view class="box-content-main-list-li-bottom">
										<view class="box-content-main-list-li-bottom-item"
											@click.stop="deleteClick(item.id)">
											<text class="iconfont iconshanchu-shangjia icon-font"
												style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
											<text>删除</text>
										</view>

										<view class="box-content-main-list-li-bottom-item"
											@click.stop="editChange(item.id)">
											<text class="iconfont iconbianji-shangjia icon-font"
												style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
											<text>编辑</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</z-paging>
				</view>
			</view>
			<view class="box-content-wrap" :style="{display:!isData?'block':'none'}">
				<loading-merchant v-if="isLoad" />
				<no-data v-if="!isLoad" />
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="新增分类" @btnClick="addClassification" />
		</view>

		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" mode='base' cancel='取消' determine='确定' title="警告" content="你确定要删除该分类吗"
				:duration="2000" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				dataList: [],
				store: '',
				isData: false,
				isLoad: true,
				searchVal: '', //搜索内容
				id: '',
				isSearch: false,
				isFocus: false,
			};
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
			this.store = options.id
		},
		onShow() {
			if (this.$store.state.isClassification) {
				this.getDataList(1, 20)
			}
		},
		methods: {
			//返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 搜索
			openSearch() {
				this.isSearch = true
				this.isFocus = true
			},
			closeSearch() {
				this.isFocus = false
				this.isSearch = false
			},

			// 新增分类
			addClassification() {
				this.$store.commit('upAddClassification', false)
				var str = {
					type: 'add',
					store: this.store
				}
				uni.navigateTo({
					url: '../addClassification/addClassification?data=' + JSON.stringify(str)
				})
			},

			// 删除分类
			deleteClick(id) {
				this.id = id
				this.$refs.popup.open()
			},
			// 编辑
			editChange(id) {
				this.$store.commit('upAddClassification', false)
				var str = {
					type: 'edit',
					store: this.store,
					id: id
				}
				uni.navigateTo({
					url: '../addClassification/addClassification?data=' + JSON.stringify(str)
				})
			},


			// 弹窗点击确认
			confirm(done, value) {
				this.apidelte('api/v1/store/service_reservation/category_del/' + this.id, {}).then(res => {
					if (res.status == 200) {
						uni.showToast({
							title: "删除成功",
							icon: "none"
						})
						this.getDataList(1, 10)
					}
					done()
				});
			},

			queryList(pageNo, pageSize) {
				this.getDataList(pageNo, pageSize)
			},

			// 获取数据
			getDataList(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
					store: this.store,
					keyword: this.searchVal
				}
				this.apiget('api/v1/store/service_reservation/reserve_category', vuedata).then(res => {
					if (res.status == 200) {
						let list = []
						if (res.data.data.length != 0) {
							this.isData = true
							list = res.data.data
							this.$refs.paging.addData(list);
						} else {
							this.isData = false
							this.isLoad = false
							this.$refs.paging.addData(list);
						}
					} else {
						uni.showToast({
							title: res.massage,
							icon: "none"
						})
					}
				});
			},

		}
	}
</script>

<style lang="scss" scoped>
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

			.box-content-search {
				padding: 0 40rpx;
				box-sizing: border-box;
				background: #fff;
				overflow: hidden;
				transition: 0.3s;

				.box-content-search-box {
					display: flex;
					height: 68rpx;
					padding: 0 20rpx;
					background: #F7F7F7;
					opacity: 1;
					border-radius: 34rpx;
					box-sizing: border-box;

					input {
						padding-left: 10rpx;
						height: 100%;
						flex: 1;
						font-size: 28rpx;
						box-sizing: border-box;
					}
				}
			}


			.box-content-wrap {
				height: 100%;
				overflow-y: scroll;

				.box-content-wrap-item {
					height: 100%;

					.box-content-main {
						padding: 0 20rpx;
						box-sizing: border-box;

						.box-content-main-list {
							margin-bottom: 40rpx;

							.box-content-main-list-li-active {
								padding-bottom: 0 !important;
							}

							.box-content-main-list-li {
								padding: 30rpx 30rpx 0;
								box-sizing: border-box;
								background: #fff;
								border-radius: 20rpx;
								margin-top: 20rpx;
								transition: 0.3s;

								.box-content-main-list-li-top {
									display: flex;
									align-items: center;
									padding-bottom: 30rpx;
									transition: 0.3s;
									border-bottom: 1rpx solid #ededed;


									.box-content-main-list-li-top-image {
										position: relative;
										display: flex;
										align-items: center;
										width: 164rpx;

										image {
											width: 164rpx;
											height: 164rpx;
											border-radius: 10rpx;
										}

										text {
											position: absolute;
											left: 0;
											bottom: 0;
											width: 100%;
											height: 40rpx;
											background: rgba(0, 0, 0, .5);
											font-size: 24rpx;
											color: #fff;
											border-radius: 0rpx 0rpx 10rpx 10rpx;
										}
									}

									.box-content-main-list-li-top-info {
										height: 164rpx;
										margin-left: 20rpx;
										flex: 1;

										.box-content-main-list-li-top-info-title {
											display: flex;
											align-items: center;

											.box-content-main-list-li-top-info-title-text {
												margin-right: 10rpx;
												line-height: 32rpx;
												font-size: 32rpx;
												font-weight: 500;
												color: #000;
											}

											.box-content-main-list-li-top-info-title-msg {
												font-size: 28rpx;
												line-height: 28rpx;
												color: #FF8366;
											}
										}

										.box-content-main-list-li-top-info-msg {
											// line-height: 28rpx;
											margin-top: 10rpx;
											font-size: 24rpx;
											color: #666;
										}

									}
								}



								.box-content-main-list-li-bottom {
									height: 88rpx;
									display: flex;
									align-items: center;
									overflow: hidden;
									transition: 0.3s;

									.box-content-main-list-li-bottom-item {
										flex: 1;
										display: flex;
										align-items: center;
										justify-content: center;
										font-size: 28rpx;
										color: #333;

										text {}

										.icon-font {
											margin-right: 10rpx;
										}
									}
								}

							}
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
