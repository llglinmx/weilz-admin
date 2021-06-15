<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-search">
				<view class="box-head-search-box">
					<view class="box-head-search-box-icon"
						:class="isSearch?'box-head-search-box-icon-active':'box-head-search-box-icon-no-active'">
						<text class="iconfont iconsousuo1 icon-font"
							style="color: #999;font-size: 40rpx;margin-top: 4rpx;" @click="getStore(1,20)"></text>
						<input type="text"  @keydown.enter="getStore(1,20)" v-model.trim="searchVal" @focus="focus" @blur="blur" placeholder="搜索门店" />
					</view>
				</view>
			</view>
			<view class="box-head-tab">
				<view class="box-head-tab-item flex-center">
					<text>区域</text>
					<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx"></text>
				</view>
				<view class="box-head-tab-item flex-center">
					<text>状态</text>
					<text class="iconfont iconxiangxiajiantou icon-font" style="color: #ccc;font-size: 28rpx"></text>
				</view>
				<view class="box-head-tab-item flex-center" @click="addStore">
					<text>添加门店</text>
					<text class="iconfont iconjia icon-font"
						style="color: #ccc;font-size: 28rpx;margin-top: 4rpx;"></text>
				</view>
			</view>
		</view>
		<view class="box-content" :style="{display:isData?'block':'none'}">
			<view class="box-content-main">
				<z-paging ref="paging1" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
					:refresher-angle-enable-change-continued="false" :touchmove-propagation-enabled="true"
					:use-custom-refresher="true" style="height: 100%;">
					<view class="box-content-main-list">
						<view class="box-content-main-list-li" v-for="(item,index) in dataList" :key="index"
							@click="storeDetails(item.id)">
							<view class="box-content-main-list-li-image">
								<image :src="item.simg" mode="aspectFill"></image>
							</view>
							<view class="box-content-main-list-li-info">
								<view class="main-list-li-info-content">
									<view class="main-list-li-info-content-title">{{item.name}}</view>
									<view class="main-list-li-info-content-address">{{item.address}}</view>
								</view>
								<view class="main-list-li-info-more">
									<text v-if="item.isFlag" style="color:#5DBDFE">营业中</text>
									<text v-if="!item.isFlag" style="color:#FF967D">休息中</text>
									<text class="iconfont icongengduo icon-font"
										style="color: #5DBDFE;font-size: 30rpx;margin-top: 4rpx;"
										v-if="item.isFlag"></text>
									<text class="iconfont icongengduo icon-font"
										style="color: #FF967D;font-size: 30rpx;margin-top: 4rpx;"
										v-if="!item.isFlag"></text>
								</view>
							</view>
						</view>
					</view>
				</z-paging>
			</view>
		</view>
		<view class="box-content" :style="{display:!isData?'block':'none'}">
			<loading-merchant v-if="isLoad" />
			<no-data v-if="!isLoad" />
		</view>
		<view class="box-footer">
			<merchant-tabbar @tabbarClick="tabbarClick" :activeIndex="activeIndex"></merchant-tabbar>
		</view>
	</view>
</template>

<script>

	export default {

		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				activeIndex: 2, //当前tabbar所在页面
				isSearch: false, //是否搜索
				dataList: [],
				isData: false,
				isLoad: true,
				searchVal:'',
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
			if(this.$store.state.isAddStore){
				this.getStore(1,20)
			}
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

			// 门店详情
			storeDetails(id) {
				uni.navigateTo({
					url: "../../merchantStore/storeManagement/storeManagement?id=" + id
				})
			},
			// 添加门店
			addStore() {
				this.$store.commit("upMapObj", {})
				this.$store.commit("upAddStore",false)
				var str ={
					type:'add',
					id:''
				}
				uni.navigateTo({
					url: "../../merchantStore/addStore/addStore?data="+JSON.stringify(str)
				})
			},
			// 上拉 下拉
			queryList(pageNo, pageSize) {
				this.getStore(pageNo, pageSize)
			},


			// 获取门店列表
			getStore(num, size) {
				let vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
					keyword: this.searchVal, //搜索
				}
				this.apiget('api/v1/store/store_information', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.member.length != 0) {
							this.isData = true
							var list = res.data.member
							this.$refs.paging1.complete(list);
						} else {
							this.isData = false
							this.isLoad = false
						}
					}
				});
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
						uni.redirectTo({
							url: "../merchantOrder/merchantOrder"
						})
						break;
					case 2: //门店

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
				padding: 10rpx 20rpx;
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
						left: 260rpx;
						margin: auto;
						width: 200rpx;
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
						left: 260rpx;
						width: 200rpx;
					}

				}
			}

			.box-head-tab {
				height: 76rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.box-head-tab-item {

					flex: 1;
					font-size: 28rpx;
					color: #666;

					.icon-font {
						margin-left: 10rpx;
					}
				}
			}

		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-main {
				height: 100%;
				padding: 0 40rpx;
				box-sizing: border-box;

				.box-content-main-list {
					// margin-bottom: 40rpx;

					.box-content-main-list-li {
						margin-top: 20rpx;
						background: #fff;
						border-radius: 10rpx;
						overflow: hidden;

						.box-content-main-list-li-image {
							image {
								width: 100%;
								height: 300rpx;
							}
						}

						.box-content-main-list-li-info {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 20rpx;
							box-sizing: border-box;

							.main-list-li-info-content {
								width: 480rpx;
								display: flex;
								justify-content: space-between;
								flex-direction: column;

								.main-list-li-info-content-title {
									font-size: 32rpx;
									color: #000;
								}

								.main-list-li-info-content-address {
									margin-top: 20rpx;
									font-size: 26rpx;
									color: #666;
									overflow: hidden; //超出的文本隐藏
									text-overflow: ellipsis; //溢出用省略号显示
									white-space: nowrap; //溢出不换行
								}
							}

							.main-list-li-info-more {
								width: 200rpx;
								display: flex;
								justify-content: flex-end;
								align-items: center;

								.icon-font {
									margin-left: 10rpx;
								}

								text {
									font-size: 28rpx;
								}
							}
						}
					}
				}
			}
		}

		.box-footer {}
	}
</style>
