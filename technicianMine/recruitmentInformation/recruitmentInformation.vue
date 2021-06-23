<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="招聘信息"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-screen" :style="{display:isData?'block':'none'}">
				<view class="box-content-screen-search" @click="boolShow = true">
					<text class="iconfont iconshaixuan icon-font" style="color: #000;font-size: 36rpx"></text>
					<text style="margin-left: 10rpx;">筛选</text>
				</view>
			</view>
			<view class="box-content-screen-main" :style="{display:isData?'block':'none'}">
				<z-paging ref="paging1" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
					:refresher-angle-enable-change-continued="false" :touchmove-propagation-enabled="true"
					:use-custom-refresher="true" style="height: 100%;">
					<view class="box-content-screen-main-list">
						<view class="screen-main-list-li" v-for="(item,index) in dataList" :key="item.id"
							@click="positionDeatils(item.id)">
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
		<popup-layer ref="popupRef" :direction="'left'" v-model="boolShow">
			<view class="zidingyiBox">
				<view class="popup-head" :style="{paddingTop:barHeight+'px'}">
					<text @click="seekBack" class="iconfont iconfanhui icon-font"
						style="color: #333;font-size: 36rpx;margin-top: 4rpx;"></text>
					<text class="popup-head-text">筛选</text>
				</view>
				<view class="popup-content">
					<view class="popup-content-main" v-for="(item,index) in seekList" :key="index">
						<view class="popup-content-main-title">{{item.title}}</view>
						<view class="popup-content-main-list">
							<view class="popup-content-main-list-li flex-center"
								:class="j.isCheck?'popup-content-main-list-li-active':''" @click="checkBtn(index,k)"
								v-for="(j,k) in item.data">{{j.title}}</view>
						</view>
					</view>
				</view>
				<view class="popup-footer">
					<view class="popup-footer-reset flex-center" @click="reset">重置</view>
					<view class="popup-footer-confirm flex-center" @click="determine">确认</view>
				</view>
			</view>
		</popup-layer>
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
				seekList: [{
						title: "岗位",
						data: [{
								isCheck: true,
								title: '不限'
							},
							{
								isCheck: false,
								title: '按摩师'
							},
							{
								isCheck: false,
								title: '足疗师'
							},
							{
								isCheck: false,
								title: '针灸推拿'
							},
						]
					},
					{
						title: "学历要求",
						data: [{
								isCheck: true,
								title: '不限'
							},
							{
								isCheck: false,
								title: '初中及以下'
							},
							{
								isCheck: false,
								title: '中专/中技'
							},
							{
								isCheck: false,
								title: '高中'
							},
							{
								isCheck: false,
								title: '大专'
							},
							{
								isCheck: false,
								title: '本科'
							},
						]
					},
					{
						title: "工龄",
						data: [{
								isCheck: true,
								title: '不限'
							},
							{
								isCheck: false,
								title: '学徒'
							},
							{
								isCheck: false,
								title: '1-2年'
							},
							{
								isCheck: false,
								title: '3-4年'
							}, {
								isCheck: false,
								title: '5-6年'
							},
							{
								isCheck: false,
								title: '6年以上'
							},
						]
					},
				],
				checkArr: [],
				boolShow: false
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
			// 筛选关闭
			seekBack() {
				this.boolShow = false
			},
			// 筛选点击
			checkBtn(index, idx) {
				// index 第一级下标 idx 第二级下标
				this.checkArr = []
				this.seekList[index].data.map(item => {
					item.isCheck = false
				})
				this.seekList[index].data[idx].isCheck = true

				this.seekList.forEach(item => {
					item.data.forEach(res => {
						if (res.isCheck) {
							this.checkArr.push(res.title)
						}
					})
				})
			},

			// 重置按钮
			reset() {
				this.seekList.forEach(item => {
					item.data.forEach(res => {
						res.isCheck = false
					})
					item.data[0].isCheck = true
				})
			},
			// 确定按钮
			determine() {
				console.log(this.checkArr)
				this.boolShow = false
			},



			// 上拉 下拉
			queryList(pageNo, pageSize) {
				this.recruitList(pageNo, pageSize)
			},


			// 招聘列表
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
			// 查看职位详情
			positionDeatils(id) {
				uni.navigateTo({
					url: '../recruitmentDetails/recruitmentDetails?id=' + id
				})
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

		.zidingyiBox {
			display: flex;
			flex-direction: column;

			width: 500rpx;
			height: 100%;
			background: #fff;

			.popup-head {
				height: 88rpx;
				margin-bottom: 20rpx;
				font-size: 34rpx;
				display: flex;
				align-items: center;
				padding: 0 40rpx;
				box-sizing: border-box;

				.icon-font {}

				.popup-head-text {
					display: flex;
					align-items: center;
					justify-content: center;
					flex: 1;
				}
			}

			.popup-content {
				padding: 0 40rpx;
				box-sizing: border-box;
				flex: 1;
				overflow-y: scroll;
				border-bottom: 1rpx solid #ededed;

				.popup-content-main {
					.popup-content-main-title {
						font-size: 36rpx;
						color: #000;
						padding: 40rpx 0;
						box-sizing: border-box;
					}

					.popup-content-main-list {
						display: flex;
						flex-wrap: wrap;

						.popup-content-main-list-li {
							width: 200rpx;
							height: 66rpx;
							margin-right: 20rpx;
							margin-bottom: 40rpx;
							background: #F7F8FA;
							border-radius: 40rpx;
							font-size: 26rpx;
							color: #333;
							transition: 0.3s;
						}

						.popup-content-main-list-li:nth-child(2n) {
							margin-right: 0;
						}

						.popup-content-main-list-li-active {
							color: #fff !important;
							background: #26BF82 !important;
						}
					}
				}
			}

			.popup-footer {
				padding: 0 40rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 120rpx;
				font-size: 32rpx;

				.popup-footer-reset {
					width: 198rpx;
					height: 68rpx;
					background: #F7F7F7;
					border: 1px solid #666666;
					border-radius: 10rpx;
					color: #666;
				}

				.popup-footer-confirm {
					width: 200rpx;
					height: 70rpx;
					background: #26BF82;
					color: #fff;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
