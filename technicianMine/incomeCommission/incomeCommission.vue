<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="收益提成"></nav-title-white>
			<view class="box-head-main">
				<view class="box-head-main-title">你当前的收益提成</view>
				<view class="box-head-main-price">4000.00</view>
				<view class="box-head-main-btn flex-center">立即提现</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item" v-for="(item,index) in arrList" :key="index">
					<view class="box-content-wrap-item-text">{{item.text}}</view>
					<view class="box-content-wrap-item-number">{{item.number}}</view>
				</view>
			</view>
			<view class="box-content-main">
				<view class="box-content-main-record">
					<view class="box-content-main-record-wrap">
						<view class="box-content-main-record-title">收益记录</view>
						<view class="box-content-main-record-text" @click="checkSelect">
							<text style="margin-right: 10rpx;">{{textName}}</text>
							<text class="iconfont iconxiangxiajiantou icon-font" style="color: #333;font-size: 32rpx;"
								:style="{transform:!isCheck?'rotate(0deg)':'rotate(180deg)'}"></text>
						</view>
					</view>
					<view class="box-content-main-record-main" :style="{height:isCheck?'400rpx':'0'}">
						<view class="box-content-main-record-main-li" v-for="(item,index) in menuList" :key='index'
							@click="selectChange(index)" :class="item.isActive?'main-li-active':''">
							{{item.name}}
						</view>
					</view>

				</view>
				<view class="box-content-main-list" :style="{display:isData?'block':'none'}">
					<z-paging ref="paging" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
						:refresher-angle-enable-change-continued="false" :touchmove-propagation-enabled="true"
						:use-custom-refresher="true" style="height: 100%;">
						<view class="box-content-main-list-content">
							<view class="box-content-main-list-content-item" v-for="(item,index) in dataList">
								<view class="main-list-content-item-left">
									<view class="main-list-content-item-left-text">订单号：1991100701{{index+99}}</view>
									<view class="main-list-content-item-left-msg">2021年01月20日 12:00:23</view>
								</view>
								<view class="main-list-content-item-right">
									<text style="color: #26BF82;" v-if="index%2!=0">+{{index+99}}</text>
									<text style="color: #000;" v-else>-{{index+99}}</text>
									<text class="iconfont icongengduo icon-font"
										style="color: #ccc;font-size: 28rpx;margin-top: 4rpx;"></text>
								</view>
							</view>
						</view>
					</z-paging>
				</view>
				<view class="box-content-main-list" style="padding-left: 0;" :style="{display:!isData?'block':'none'}">
					<loading v-if="!isData" />
					<no-data v-if="isData" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navTitleWhite from "../../components/nav-title-white/nav-title-white.vue"
	import loading from '../../components/loading/loading.vue'
	import noData from '../../components/no-data/no-data.vue'
	import zPaging from '../../components/z-paging/components/z-paging/z-paging.vue'
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				isCheck: false,
				textName: '',
				dataList: [],
				isData: false,
				isLoad: true,
				arrList: [{
						text: "总收益(元)",
						number: "75500"
					},
					{
						text: "已提现(元)",
						number: "55000"
					},
					{
						text: "打赏总金额(元)",
						number: "2500"
					},
				],
				menuList: [{
						name: '今日',
						isActive: true,
						id: 1
					},
					{
						name: '本周',
						isActive: false,
						id: 2
					},
					{
						name: '本月',
						isActive: false,
						id: 3
					},
					{
						name: '本年',
						isActive: false,
						id: 4
					},
				]
			};
		},
		components: {
			navTitleWhite,
			loading,
			noData,
			zPaging,
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
			this.textName = this.menuList[0].name
		},
		methods: {

			checkSelect() {
				this.isCheck = !this.isCheck
			},
			selectChange(index) {
				this.textName = this.menuList[index].name
				this.isCheck = false
				this.menuList.forEach(item => {
					item.isActive = false
				})
				this.menuList[index].isActive = true
			},

			// 上拉 下拉
			queryList(pageNo, pageSize) {
				this.getData(pageNo, pageSize)
			},


			// 收益数据
			getData(num, size) {
				var vuedata = {
					status: 1,
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
				}
				this.apiget('pc/category/category_type', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.length != 0) {
							this.isData = true
							let list = res.data
							this.$refs.paging.complete(list);
							console.log(res)
							return false;
						}
						this.isData = false
						this.isLoad = false

					}
				});
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
			background-color: #26BF82;

			.box-head-main {
				padding-bottom: 40rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-items: center;
				color: #fff;
				box-sizing: border-box;

				.box-head-main-title {
					margin-top: 20rpx;
					font-size: 28rpx;
				}

				.box-head-main-price {
					margin: 20rpx 0 30rpx;
					font-size: 80rpx;
					font-family: Lato;
					font-weight: bold;
				}

				.box-head-main-btn {
					width: 248rpx;
					height: 72rpx;
					background: #FFFFFF;
					color: #26BF82;
					font-size: 32rpx;
					border-radius: 43rpx;
				}
			}

		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.box-content-wrap {
				position: relative;
				margin-top: 20rpx;
				height: 140rpx;
				display: flex;
				background: #fff;

				.box-content-wrap-item {
					position: relative;
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					.box-content-wrap-item-text {
						font-size: 26rpx;
						color: #999;
					}

					.box-content-wrap-item-number {
						font-size: 36rpx;
						font-weight: 500;
						color: #26BF82;
					}
				}

				.box-content-wrap-item::after {
					position: absolute;
					top: 0;
					bottom: 0;
					right: 0;
					margin: auto;
					width: 1rpx;
					height: 60rpx;
					content: "";
					background: #ededed;
				}
			}

			.box-content-main {
				display: flex;
				flex-direction: column;
				flex: 1;
				margin-top: 20rpx;
				background: #fff;
				overflow-y: scroll;

				.box-content-main-record {
					position: relative;
					height: 96rpx;
					padding: 0 40rpx;
					box-sizing: border-box;
					color: #000;
					border-bottom: 1rpx solid #ededed;

					.box-content-main-record-wrap {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 100%;

						.box-content-main-record-title {
							font-size: 36rpx;
							font-weight: 500;
						}

						.box-content-main-record-text {
							font-size: 28rpx;
							display: flex;
							align-items: center;

							.icon-font {
								transition: 0.3s;
							}
						}
					}

					.box-content-main-record-main {
						position: absolute;
						top: 96rpx;
						left: 0;
						width: 100%;
						background: #fff;
						box-shadow: 0rpx 1rpx 1rpx #eee;
						transition: 0.3s;
						overflow: scroll;
						z-index: 99999;

						.box-content-main-record-main-li {
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 0 40rpx;
							box-sizing: border-box;
							height: 100rpx;
							border-bottom: 1rpx solid #ededed;
							font-size: 28rpx;
							color: #333;
							transition: 0.3s;
						}

						.main-li-active {
							background: #eee;
							font-weight: 500;
							font-size: 32rpx !important;
						}

						.box-content-main-record-main-li:last-child {
							border-bottom: 0;
						}
					}

				}

				.box-content-main-list {
					flex: 1;
					padding-left: 40rpx;
					box-sizing: border-box;
					overflow-y: scroll;

					.box-content-main-list-content {


						.box-content-main-list-content-item {
							height: 130rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding-right: 40rpx;
							box-sizing: border-box;
							border-bottom: 1rpx solid #ededed;

							.main-list-content-item-left {

								.main-list-content-item-left-text {
									font-size: 30rpx;
									color: #000;
								}

								.main-list-content-item-left-msg {
									font-size: 24rpx;
									color: #999;
								}
							}

							.main-list-content-item-right {
								display: flex;

								text {
									font-size: 32rpx;
								}

								.icon-font {
									margin-left: 8rpx;
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
