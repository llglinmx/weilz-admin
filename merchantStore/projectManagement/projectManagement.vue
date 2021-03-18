<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">项目管理</view>
				<view class="box-head-ico flex-center">
					<text class="iconfont iconsousuo1 icon-font"
						style="color: #5DBDFE;font-size: 52rpx;margin-top: 4rpx;"
						:style="{display:!isChoice?'block':'none'}" @click="searchCilck"></text>
					<text class="iconfont iconcuowu" style="color: #5DBDFE;font-size: 60rpx;"
						:style="{display:isChoice?'block':'none'}" @click="cancelChoice"></text>
				</view>
			</view>
			<view class="box-head-tabs">
				<merchant-tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-search"
				:style="{height:isSearch?'auto':'0',padding:isSearch?'30rpx 40rpx':'0 40rpx'}">
				<view class="box-content-search-box">
					<input type="text" placeholder="请输入需要搜索的内容" />
					<text class="iconfont iconsousuo1 icon-font"
						style="color: #999;font-size: 48rpx;margin-top: 4rpx;"></text>
				</view>
			</view>

			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-main">
								<view class="box-content-main-list" :style="{marginBottom:isChoice?'40rpx':'0'}">
									<view class="box-content-main-list-li"
										:class="!item.isOpen?'box-content-main-list-li-active':''"
										v-for="(item,index) in dataList" @longtap="longtap" :key="index">
										<view class="box-content-main-list-li-top"
											:class="item.isOpen?'box-content-main-list-li-top-active':''">
											<view class="box-content-main-list-li-top-check flex-center"
												:style="{width:isChoice?'50rpx':'0'}">
												<text class="iconfont iconxuanzhong icon-font"
													style="color: #5DBDFE;font-size: 40rpx;" v-if="item.isCheck"
													@click="checkClick(index,true)"></text>
												<text class="iconfont iconweixuanzhong1 icon-font"
													style="color: #ccc;font-size: 40rpx;" v-else
													@click="checkClick(index,false)"></text>
											</view>
											<view class="box-content-main-list-li-top-image">
												<image src="../../static/images/001.png" mode="aspectFill"></image>
											</view>
											<view class="box-content-main-list-li-top-info">
												<view class="box-content-main-list-li-top-info-title">泰式古法按摩</view>
												<view class="box-content-main-list-li-top-info-wrap">
													<view class="list-li-top-info-wrap-item">60分钟</view>
													<view class="list-li-top-info-wrap-item">背部按摩</view>
												</view>
												<view class="box-content-main-list-li-top-info-stock">库存：200</view>
												<view class="box-content-main-list-li-top-info-price">
													<view class="list-li-top-info-present-price">￥285.00</view>
													<view class="list-li-top-info-switch flex-center" v-if="!isChoice">
														<text class="iconfont iconzhankai icon-font open"
															:class="item.isOpen?'open-active':''"
															style="color:#5DBDFE;font-size: 48rpx;"
															@click="switchClick(index,true)"></text>
														<text class="iconfont iconshouqi icon-font close"
															:class="item.isOpen?'close-active':''"
															style="color: #ccc;font-size: 48rpx;"
															@click="switchClick(index,false)"></text>
													</view>
												</view>
											</view>
										</view>
										<view class="box-content-main-list-li-bottom"
											:class="item.isOpen?'box-content-main-list-li-bottom-active':''">
											<view class="box-content-main-list-li-bottom-item" @click="projectDelete(index)">
												<text class="iconfont iconshanchu-shangjia icon-font"
													style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>删除</text>
											</view>
											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconxiajia-shangjia icon-font"
													style="color: #4EC494;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>下架</text>
											</view>
											<view class="box-content-main-list-li-bottom-item">
												<text class="iconfont iconbianji-shangjia icon-font"
													style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
												<text>编辑</text>
											</view>
										</view>
									</view>
								</view>
							</view>

						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							2
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							3
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer" :style="{height:isChoice?'108rpx':'0'}">
			<view class="box-footer-all-check">
				<text class="iconfont iconxuanzhong icon-font" style="color: #5DBDFE;font-size: 40rpx;"
					@click="selectAll" v-if="isSelectAll"></text>
				<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 40rpx;"
					@click="selectAll" v-if="!isSelectAll"></text>
				<text>全选</text>
			</view>
			<view class="box-footer-btn">
				<view class="btn-delete flex-center">删除</view>
				<view class="btn-off-the-shelf flex-center">下架</view>
			</view>
		</view>
		<view class="box-footer-btn" :style="{height:!isChoice?'140rpx':'0'}">
			<btn-sky-blue style="width: 100%;" btnName="添加项目" @btnClick="addProject" />
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import merchantTabs from "../../components/merchant-tabs/merchant-tabs.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				defaultIndex: 0, //当前滑动的页面
				tabsList: ["出售中 0", "仓库中 0", "已售罄 0"],
				isSelectAll: false, //是否全选
				isChoice: false, //是否多选
				isSearch: false, //是否搜索
				dataList: [{
						isOpen: false,
						isCheck: false
					},
					{
						isOpen: false,
						isCheck: false
					},
					{
						isOpen: false,
						isCheck: false
					},
					{
						isOpen: false,
						isCheck: false
					},
					{
						isOpen: false,
						isCheck: false
					},
					{
						isOpen: false,
						isCheck: false
					},
				]
			};
		},
		components: {
			navTitleBalck,
			merchantTabs,
			btnSkyBlue
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
			//返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 列表长按事件
			longtap() {
				this.isChoice = true;
				
				if (this.isSearch) { //如果有显示搜索框则隐藏搜索
					this.isSearch = false
				}
				
			},
			// 取消多选界面显示
			cancelChoice() {
				this.isChoice = false;
			},

			// 全选
			selectAll() {
				// 循环列表 修改属性
				this.dataList.forEach(item => {
					item.isCheck = this.isSelectAll ? false : true
				})
				this.isSelectAll = !this.isSelectAll
			},

			// 选中 未选中
			checkClick(index, bool) {
				this.dataList[index].isCheck = bool ? false : true;
			},

			// 展开 收起
			switchClick(index, bool) {
				if (this.isSearch) { //如果有显示搜索框 点击则隐藏搜索
					this.isSearch = false
				}

				this.dataList[index].isOpen = bool ? true : false;
			},
			// 删除单个项目
			projectDelete(index){
				this.dataList.splice(index,1)
			},
			
			
			// 搜索按钮
			searchCilck() {
				this.isSearch = true;
			},


			// 添加项目
			addProject() {
				uni.navigateTo({
					url: "../addProject/addProject"
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

					.swiper-box {
						height: 100%;
						overflow-y: scroll;

						.swiper-box-item-list {
							height: 100%;
							overflow-y: scroll;

							.box-content-main {
								padding: 0 20rpx;
								box-sizing: border-box;

								.box-content-main-list {
									margin-bottom: 40rpx;

									.box-content-main-list-li-active {
										padding-bottom: 0 !important;
									}

									.box-content-main-list-li {
										padding: 30rpx 20rpx 0;
										box-sizing: border-box;
										background: #fff;
										border-radius: 20rpx;
										margin-top: 20rpx;
										transition: 0.3s;

										.box-content-main-list-li-top-active {
											border-bottom: 1rpx solid #ededed;
											// padding-bottom: 0 !important;
										}

										.box-content-main-list-li-top {
											display: flex;
											align-items: center;
											padding-bottom: 30rpx;
											transition: 0.3s;

											.box-content-main-list-li-top-check {
												transition: 0.3s;
												overflow: hidden;
											}

											.box-content-main-list-li-top-image {
												display: flex;
												align-items: center;
												margin-left: 10rpx;

												image {
													width: 178rpx;
													height: 178rpx;
												}
											}

											.box-content-main-list-li-top-info {
												height: 178rpx;
												margin-left: 20rpx;
												flex: 1;

												.box-content-main-list-li-top-info-title {
													line-height: 34rpx;
													font-size: 34rpx;
													font-weight: 500;
													color: #000;
												}

												.box-content-main-list-li-top-info-wrap {
													margin-top: 10rpx;
													display: flex;
													align-items: center;
													flex-wrap: wrap;

													.list-li-top-info-wrap-item {
														padding: 6rpx 10rpx;
														margin-right: 10rpx;
														margin-bottom: 10rpx;
														background: #F5F5F5;
														font-size: 22rpx;
														color: #666;
														border-radius: 3rpx;
													}
												}

												.box-content-main-list-li-top-info-stock {
													font-size: 24rpx;
													color: #999;
												}

												.box-content-main-list-li-top-info-price {
													display: flex;
													align-items: baseline;
													justify-content: space-between;

													.list-li-top-info-present-price {
														font-size: 34rpx;
														font-weight: 500;
														color: #FF4D4D;
													}

													.list-li-top-info-switch {
														position: relative;
														width: 50rpx;
														height: 50rpx;
														overflow: hidden;

														.open {
															position: absolute;
															top: 0;
															left: 0;
															transition: 0.3s;
														}

														.open-active {
															top: -50rpx !important;
														}

														.close {
															position: absolute;
															top: -50rpx;
															left: 0;
															transform: 0.3s;
														}

														.close-active {
															top: 0 !important;
														}
													}
												}

											}
										}

										.box-content-main-list-li-bottom-active {
											height: 88rpx !important;
										}

										.box-content-main-list-li-bottom {
											height: 0;
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
			}
		}

		.box-footer {
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #fff;
			overflow: hidden;
			transform: 0.3s;

			.box-footer-all-check {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #000;

				.icon-font {
					margin-left: 20rpx;
					margin-right: 20rpx;
				}

				text {}
			}

			.box-footer-btn {
				display: flex;
				align-items: center;

				.btn-delete {
					width: 182rpx;
					height: 66rpx;
					background: #FFFFFF;
					border: 1rpx solid #666666;
					border-radius: 34rpx;
					color: #666;
					font-size: 32rpx;
				}

				.btn-off-the-shelf {
					margin-left: 20rpx;
					width: 184rpx;
					height: 68rpx;
					background: #5DBDFE;
					border-radius: 34rpx;
					color: #fff;
					font-size: 32rpx;
				}
			}
		}

		.box-footer-btn {
			display: flex;
			align-items: center;
			padding: 0 40rpx;
			box-sizing: border-box;
			overflow: hidden;
			transition: 0.3s;
		}
	}
</style>
