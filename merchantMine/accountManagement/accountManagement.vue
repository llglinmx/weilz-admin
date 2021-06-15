<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="账号管理"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-search">
				<view class="box-content-search-box">
					<view class="box-content-search-box-ico" :class="isSearch?'box-content-search-box-ico-active':''">
						<text class="iconfont iconsousuo1 icon-font"
							style="color: #999;font-size: 40rpx;margin-top: 4rpx;"></text>
					</view>
					<view class="box-content-search-box-input"
						:class="isSearch?'box-content-search-box-input-active':''">
						<input type="text" @focus="focus" @blur="blur" placeholder="搜索门店名称、账号" />
					</view>
				</view>
			</view>
			<view class="box-content-main" :style="{display:isData?'block':'none'}">
				<z-paging ref="paging1" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
					:refresher-angle-enable-change-continued="false" :touchmove-propagation-enabled="true"
					:use-custom-refresher="true" style="height: 100%;">
					<view class="box-content-main-list">
						<view class="box-content-main-list-li" v-for="(item,index) in dataList" :key="item.id"
							@click="accountDetail(item.id)">
							<view class="box-content-main-list-li-image flex-center">
								<text class="iconfont iconmendian1 icon-font"
									style="color:#5DBDFE;font-size: 52rpx"></text>
							</view>
							<view class="box-content-main-list-li-info">
								<view class="box-content-main-list-li-info-left">
									<view class="list-li-info-left-title">{{item.company}}</view>
									<view class="list-li-info-left-text">账号：{{item.username}}</view>
								</view>
								<view class="box-content-main-list-li-info-more">
									<text class="iconfont icongengduo icon-font"
										style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
								</view>
							</view>
						</view>
					</view>
				</z-paging>
			</view>
			<view class="box-content-main" :style="{display:!isData?'block':'none'}">
				<loading v-if="isLoad" />
				<no-data v-if="!isLoad" />
			</view>
		</view>

		<view class="box-footer">
			<btn-sky-blue btnName="添加子账号" @btnClick="addBtn" />
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				isSearch: false, //是否有点击输入框搜索
				dataList: [],
				isData: false,
				isLoad: true,
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
		onLoad() {

		},
		onShow() {
			if (this.$store.state.isAddAccount) {
				this.storeList(1, 20)
			}
		},
		methods: {
			// 上拉 下拉
			queryList(pageNo, pageSize) {
				this.storeList(pageNo, pageSize)
			},

			// 获取列表
			storeList(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
				}
				this.apiget('api/v1/store/admin', vuedata).then(res => {
					if (res.status == 200) {

						if (res.data.length != 0 && res.data.member.length != 0) {
							this.isData = true
							let list = res.data.member
							this.$refs.paging1.complete(list);
						} else {
							this.isData = false
							this.isLoad = false
						}
					}
				});
			},


			// 获得焦点
			focus() {
				this.isSearch = true
			},
			// 失去焦点
			blur() {
				this.isSearch = false
			},

			// 账号详情
			accountDetail(id) {
				uni.navigateTo({
					url: "../accountDetails/accountDetails?id=" + id
				})
			},

			// 添加按钮
			addBtn() {
				this.$store.commit('upAddAccount', false)
				var str = {
					type: 'add'
				}
				uni.navigateTo({
					url: "../addSubAccount/addSubAccount?data=" + JSON.stringify(str)
				})
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
		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.box-content-search {
				padding: 20rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-search-box {
					position: relative;
					display: flex;
					height: 88rpx;
					background: #F7F7F7;
					border-radius: 15rpx;

					.box-content-search-box-ico {
						position: absolute;
						left: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 80rpx;
						height: 100%;
						transition: 0.3s;

						.icon-font {
							font-weight: 500;
						}
					}

					.box-content-search-box-ico-active {
						left: 590rpx !important;
						z-index: 999;
					}

					.box-content-search-box-input {
						position: absolute;
						width: 590rpx;
						height: 100%;
						left: 80rpx;
						transition: 0.3s;

						input {
							height: 100%;
							font-size: 28rpx;
						}
					}

					.box-content-search-box-input-active {
						left: 30rpx !important;
					}
				}
			}

			.box-content-main {
				flex: 1;
				overflow-y: scroll;

				.box-content-main-list {
					background: #fff;
					padding: 30rpx 0;

					.box-content-main-list-li {
						display: flex;
						padding-left: 40rpx;
						box-sizing: border-box;
						margin-bottom: 20rpx;

						.box-content-main-list-li-image {
							width: 88rpx;
							height: 88rpx;
							background: #EAF7FF;
							border-radius: 50%;
						}

						.box-content-main-list-li-info {
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding-bottom: 30rpx;
							border-bottom: 1rpx solid #ededed;
							margin-left: 20rpx;
							padding-right: 40rpx;
							box-sizing: border-box;

							.box-content-main-list-li-info-left {
								.list-li-info-left-title {
									font-size: 34rpx;
									font-weight: 500;
									color: #000;
								}

								.list-li-info-left-text {
									margin-top: 10rpx;
									font-size: 24rpx;
									color: #999;
								}
							}

							.box-content-main-list-li-info-more {}
						}
					}
				}
			}
		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
		}
	}
</style>
