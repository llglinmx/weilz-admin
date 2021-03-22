<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-search">
				<view class="box-head-search-box">
					<view class="box-head-search-box-icon"
						:class="isSearch?'box-head-search-box-icon-active':'box-head-search-box-icon-no-active'">
						<text class="iconfont iconsousuo1 icon-font"
							style="color: #999;font-size: 40rpx;margin-top: 4rpx;"></text>
						<input type="text" value="" @focus="focus" @blur="blur" placeholder="搜索门店" />
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
		<view class="box-content">
			<view class="box-content-main">
				<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"
					:height="mesHeight">
					<view class="box-content-main-list">
						<view class="box-content-main-list-li" v-for="(item,index) in dataList" :key="index"
							@click="storeDetails">
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
				</mescroll-uni>
			</view>
		</view>
		<view class="box-footer">
			<merchant-tabbar @tabbarClick="tabbarClick" :activeIndex="activeIndex"></merchant-tabbar>
		</view>
	</view>
</template>

<script>
	import merchantTabbar from "../../components/merchant-tabbar/merchant-tabbar.vue"
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				activeIndex: 2, //当前tabbar所在页面
				isSearch: false, //是否搜索
				mesHeight: 0,
				downOption: { // 下拉刷新配置
					auto: false,
				},
				upOption: { // 上拉加载配置
					noMoreSize: 5,
					textLoading: "正在加载更多数据",
					textNoMore: "——  已经到底了  ——",
					isBounce: true,
					auto: false,
				},
				PageNumber: 1, // 请求页数，
				PageLimt: 5, // 请求条数
				dataList: [{
						title: "罗约蓝池·温泉SPA",
						address: "地址：中国 福建省 厦门市 集美区 杏滨路罗约酒店负一楼",
						image: '../../static/images/icon-1.png',
						isFlag: true
					},
					{
						title: "花·SUN SPA",
						address: "地址：中国 福建省 厦门市 集美区 杏滨路罗约酒店负一楼",
						image: '../../static/images/icon-2.png',
						isFlag: false
					},
					{
						title: "罗约蓝池·温泉SPA",
						address: "地址：中国 福建省 厦门市 集美区 杏滨路罗约酒店负一楼",
						image: '../../static/images/icon-3.png',
						isFlag: true
					},
					{
						title: "花·SUN SPA",
						address: "地址：中国 福建省 厦门市 集美区 杏滨路罗约酒店负一楼",
						image: '../../static/images/icon-1.png',
						isFlag: false
					},
					{
						title: "罗约蓝池·温泉SPA",
						address: "地址：中国 福建省 厦门市 集美区 杏滨路罗约酒店负一楼",
						image: '../../static/images/icon-2.png',
						isFlag: true
					},
				]
			};
		},
		components: {
			merchantTabbar,
			MescrollUni
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
			const sys = uni.getSystemInfoSync();
			var Heigh = sys.windowHeight
			this.mesHeight = (Heigh - 130) * 2
		},
		onLoad() {
			this.storeList();
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
			storeDetails() {
				uni.navigateTo({
					url: "../../merchantStore/storeManagement/storeManagement"
				})
			},
			// 添加门店
			addStore() {
				uni.navigateTo({
					url: "../../merchantStore/addStore/addStore"
				})
			},


			// 门店列表
			storeList() {
				var vuedata = {
					page_index: this.PageNumber, // 请求页数，
					each_page: this.PageLimt, // 请求条数
				}
				this.apiget('pc/store', vuedata).then(res => {
					if (res.status == 200) {
						this.dataList = res.data.storeList

					}
				});
			},

			/*下拉刷新的回调*/
			downCallback() {
				this.PageNumber = 1
				setTimeout(() => {
					this.mescroll.endSuccess() // 请求成功 隐藏加载状态

					// this.mescroll.showNoMore()

				}, 1500)
			},

			/*上拉加载的回调*/
			upCallback(page) {
				this.PageNumber++
				console.log(this.PageNumber)
				setTimeout(() => {
					this.mescroll.endSuccess() // 请求成功 隐藏加载状态
					// if (this.PageNumber > 3) {
					this.mescroll.showNoMore()
					// }
				}, 1500)
				console.log("上拉加载")
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
