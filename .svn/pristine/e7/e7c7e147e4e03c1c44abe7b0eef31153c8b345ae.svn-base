<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="技师招聘"></nav-title-balck>
			<view class="box-head-tabs">
				<merchant-tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-main" :style="{display:isData?'block':'none'}">
								<z-paging ref="paging1" @query="queryList" :list.sync="recruitmentList"
									loading-more-no-more-text="已经到底了" :refresher-angle-enable-change-continued="false"
									:touchmove-propagation-enabled="true" :use-custom-refresher="true"
									style="height: 100%;">
									<view class="box-content-main-list">
										<view class="box-content-main-list-li" v-for="(item,index) in recruitmentList"
											:key="item.id" @click="positionDetails(item.id)">
											<view class="box-content-main-list-li-top">
												<view class="box-content-main-list-li-top-title">
													<view class="list-li-top-title-text">{{item.position}}</view>
													<view class="list-li-top-title-msg">{{item.salary}}/月</view>
												</view>
												<view class="box-content-main-list-li-top-list">
													<view class="box-content-main-list-li-top-list-title">职位类别：</view>
													<view class="box-content-main-list-li-top-list-text">
														{{item.class_info}}
													</view>
												</view>
												<view class="box-content-main-list-li-top-list">
													<view class="box-content-main-list-li-top-list-title">门店名称：</view>
													<view class="box-content-main-list-li-top-list-text">
														{{item.store_info}}
													</view>
												</view>
												<view class="box-content-main-list-li-top-list">
													<view class="box-content-main-list-li-top-list-title">工作地点：</view>
													<view class="box-content-main-list-li-top-list-text">
														{{item.place_work}}
													</view>
												</view>
											</view>
											<view class="box-content-main-list-li-bottom">
												<view class="box-content-main-list-li-bottom-item flex-center"
													@click.stop="deleteRecruitment(item.id)">
													<text class="iconfont iconshanchu-shangjia icon-font"
														style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
													<text>删除</text>
												</view>
												<view class="box-content-main-list-li-bottom-item flex-center"
													@click.stop="applicationRecord(item.id)">
													<text class="iconfont iconyingpinjilu-shangjia icon-font"
														style="color: #4EC494;font-size: 36rpx;margin-top: 4rpx;"></text>
													<text>应聘记录</text>
												</view>
												<view class="box-content-main-list-li-bottom-item flex-center"
													@click.stop="edit(item.id)">
													<text class="iconfont iconbianji-shangjia icon-font"
														style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
													<text>编辑</text>
												</view>
											</view>
										</view>
									</view>
								</z-paging>
							</view>
							<view class="box-content-main" :style="{display:!isData?'block':'none'}">
								<loading-merchant v-if="isLoad" />
								<no-data v-if="!isLoad" />
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-seek">
								<view class="box-content-seek-screen">
									<view class="box-content-seek-screen-wrap" @click="seeKClick">
										<text class="iconfont iconshaixuan icon-font"
											style="color: #000;font-size: 36rpx;margin-top: 4rpx;"></text>
										<text>筛选</text>
									</view>
								</view>
								<view class="box-content-seek-list">
									<z-paging ref="paging2" @query="seekQueryList" :list.sync="technicianList"
										loading-more-no-more-text="已经到底了"
										:refresher-angle-enable-change-continued="false"
										:touchmove-propagation-enabled="true" :use-custom-refresher="true"
										:mounted-auto-call-reload="false" style="height: 100%;">
										<view class="box-content-seek-list-box">
											<view class="box-content-seek-list-li"
												v-for="(item,index) in technicianList" :key="item.id">
												<view class="box-content-seek-list-li-image">
													<image :src="item.simg" mode="aspectFill">
													</image>
												</view>
												<view class="box-content-seek-list-li-info">
													<view class="box-content-seek-list-li-info-top">
														<view class="box-content-seek-list-li-info-top-text">
															<view class="box-content-seek-list-li-info-top-text-title">
																{{item.name}}
															</view>
															<view
																class="box-content-seek-list-li-info-top-text-title-score">
																<score :comment="item.comment"></score>
															</view>
														</view>
														<view class="box-content-seek-list-li-info-top-btn flex-center">
															查看简历
														</view>
													</view>
													<view class="box-content-seek-list-li-info-main-list"
														style="color: #636363;">
														<view class="seek-list-li-info-main-list-li">{{item.age}}岁
														</view>
														<view class="seek-list-li-info-main-list-li">{{item.education}}
														</view>
														<view class="seek-list-li-info-main-list-li">厦门</view>
														<view class="seek-list-li-info-main-list-li">
															{{item.service_year}}年工龄
														</view>
													</view>
													<view class="box-content-seek-list-li-info-main-list"
														style="color: #999999;">
														<view class="seek-list-li-info-main-list-li">
															求职岗位：
															<text style="color: #333333;">{{item.job_search}}</text>
														</view>
														<view class="seek-list-li-info-main-list-li">
															期望薪资：
															<text
																style="color: #333333;">{{item.salary_expectation}}</text>
														</view>
													</view>
													<view class="box-content-seek-list-li-info-main-list"
														style="color: #999999;">
														<view class="seek-list-li-info-main-list-li">
															掌握技能：
															<text style="color: #333333;">{{item.skill}}</text>
														</view>
													</view>
												</view>
											</view>
										</view>
									</z-paging>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer" :style="{display:!isLoad?'block':'none'}"
			:class="defaultIndex==1?'box-footer-active':''">
			<btn-sky-blue btnName="发布新招聘" @btnClick="release" />
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
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" mode='base' title="警告" content="你确定要删除此条招聘信息吗？" :duration="2000"
				@confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				tabsList: ["招聘信息", "寻找技师"],
				defaultIndex: 0, //当前滑动的页面
				boolShow: false, //筛选弹出层
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
				skid: '',
				recruitmentList: [],
				isData: false,
				isLoad: true,
				technicianList: [],
				isDataTec: false,
				isLoadTec: true,
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
			this.id = options.id
		},
		onShow() {
			// 用于判断是否有发布招聘
			if (this.$store.state.isAdd) {
				this.getRecruitmentInfo(1, 10)
			}
		},
		methods: {

			// 上拉 下拉
			queryList(pageNo, pageSize) {
				this.getRecruitmentInfo(pageNo, pageSize)
			},

			getRecruitmentInfo(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
					store: this.id
				}
				this.apiget('api/v1/store/recruitment', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.data.length != 0) {
							this.isData = true
							let list = res.data.data
							this.$refs.paging1.complete(list);
						} else {
							this.isData = false
						}
						this.isLoad = false
					}
				});
			},

			// 找技师上拉 下拉
			seekQueryList(pageNo, pageSize) {
				this.getSeekTechnician(pageNo, pageSize)
			},
			getSeekTechnician(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
				}
				this.apiget('api/v1/store/recruitment/accept', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.data.length != 0) {
							this.isDataTec = true
							let list = res.data.data
							this.$refs.paging2.complete(list);
						} else {
							this.isDataTec = false
							this.isLoadTec = false
						}
					}
				});
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

			// 应聘记录
			applicationRecord(id) {
				var str ={
					id:id,
					store:this.id
				}
				uni.navigateTo({
					url: "../applicationRecord/applicationRecord?data=" + JSON.stringify(str)
				})
			},
			// 删除
			deleteRecruitment(id) {
				this.skid = id
				this.$refs.popup.open()
			},
			// 编辑按钮
			edit(id) {
				var str = {
					id: id,
					type: 'edit'
				}
				uni.navigateTo({
					url: "../releaseRecruitment/releaseRecruitment?data=" + JSON.stringify(str)
				})
			},

			// 弹窗点击确认
			confirm() {
				this.apidelte('api/v1/store/recruitment/del/' + this.skid, {}).then(res => {
					if (res.status == 200) {
						uni.showToast({
							title: "删除成功",
							icon: "none"
						})
						this.getRecruitmentInfo(1, 10)
					}
				});
			},

			// 职位详情
			positionDetails(id) {
				uni.navigateTo({
					url: "../positionDetails/positionDetails?id=" + id
				})
			},

			// 发布新招聘
			release() {
				var str = {
					store: this.id,
					type: 'add'
				}
				this.$store.commit("upAdd", false)
				uni.navigateTo({
					url: "../releaseRecruitment/releaseRecruitment?data=" + JSON.stringify(str)
				})
			},

			// 筛选点击
			seeKClick() {
				this.boolShow = true
				// this.$refs.popupRef.show() // 弹出
			},
			// 筛选关闭
			seekBack() {
				// this.$refs.popupRef.close() // 关闭
				this.boolShow = false
			},

			// tabs 点击
			tabClick(e) {
				this.defaultIndex = e
			},
			// 滑动切换列表
			tabChange(e) {
				this.$refs.boxTabs.tabToIndex(e.detail.current)
				this.defaultIndex = e.detail.current

				switch (this.defaultIndex) {
					case 0:
						this.getRecruitmentInfo(1, 10)
						break;
					case 1:
						this.seekQueryList(1, 10)
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
		overflow: hidden;

		.box-head {
			background-color: #fff;

			.box-head-tabs {}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;
			border-top: 1rpx solid #ededed;

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
								height: 100%;

								.box-content-main-list {
									padding: 0 20rpx;
									box-sizing: border-box;

									.box-content-main-list-li {
										margin-top: 20rpx;
										padding: 0 20rpx;
										box-sizing: border-box;
										background: #FFFFFF;
										border-radius: 20rpx;

										.box-content-main-list-li-top {
											padding: 30rpx 0;
											border-bottom: 1rpx solid #ededed;

											.box-content-main-list-li-top-title {
												margin-bottom: 30rpx;
												display: flex;
												align-items: center;
												justify-content: space-between;

												.list-li-top-title-text {
													font-size: 36rpx;
													color: #000;
												}

												.list-li-top-title-msg {
													font-size: 32rpx;
													color: #5DBDFE;
												}
											}

											.box-content-main-list-li-top-list {
												margin-top: 10rpx;
												display: flex;
												align-items: center;
												font-size: 28rpx;

												.box-content-main-list-li-top-list-title {
													color: #000;
												}

												.box-content-main-list-li-top-list-text {
													color: #999;
												}
											}

										}

										.box-content-main-list-li-bottom {
											display: flex;
											align-items: center;
											height: 88rpx;

											.box-content-main-list-li-bottom-item {
												flex: 1;
												font-size: 28rpx;
												color: #333;

												.icon-font {
													margin-right: 10rpx;
												}
											}
										}
									}
								}
							}

							.box-content-seek {
								display: flex;
								flex-direction: column;
								// height: calc(100% - 40rpx);
								height: 100%;
								background: #fff;

								.box-content-seek-screen {
									padding: 20rpx 20rpx 40rpx;
									box-sizing: border-box;

									.box-content-seek-screen-wrap {
										display: flex;
										align-items: center;
										justify-content: center;
										height: 72rpx;
										background: #F7F7F7;
										border-radius: 40rpx;
										font-size: 28rpx;
										color: #000;

										.icon-font {
											margin-right: 10rpx;
										}
									}
								}

								.box-content-seek-list {
									flex: 1;
									overflow-y: scroll;
									padding-left: 40rpx;
									box-sizing: border-box;
									background: #fff;

									.box-content-seek-list-li:last-child {
										margin-bottom: 0;
									}

									.box-content-seek-list-li {
										display: flex;
										margin-bottom: 40rpx;

										.box-content-seek-list-li-image {
											image {
												width: 98rpx;
												height: 98rpx;
												border-radius: 50%;
											}
										}

										.box-content-seek-list-li-info {
											padding-right: 40rpx;
											box-sizing: border-box;
											flex: 1;
											margin-left: 20rpx;
											padding-bottom: 40rpx;
											border-bottom: 1rpx solid #ededed;

											.box-content-seek-list-li-info-top {
												display: flex;
												align-items: center;
												justify-content: space-between;

												.box-content-seek-list-li-info-top-text {
													display: flex;
													align-items: center;

													.box-content-seek-list-li-info-top-text-title {
														font-size: 34rpx;
														font-weight: 500;
														color: #000;
														overflow: hidden;
														text-overflow: ellipsis;
														white-space: nowrap;
													}

													.box-content-seek-list-li-info-top-text-title-score {
														margin-left: 20rpx;
														display: flex;
														align-items: center;

														text {
															margin-right: 6rpx;
															font-size: 24rpx;
															color: #999;
														}
													}
												}

												.box-content-seek-list-li-info-top-btn {
													width: 172rpx;
													height: 60rpx;
													background: #5DBDFE;
													border-radius: 30rpx;
													font-size: 28rpx;
													color: #fff;
												}
											}

											.box-content-seek-list-li-info-main-list {
												display: flex;
												flex-wrap: wrap;
												margin-top: 20rpx;

												.seek-list-li-info-main-list-li:first-child {
													padding-left: 0;
												}

												.seek-list-li-info-main-list-li:last-child {
													border-right: 0;
												}

												.seek-list-li-info-main-list-li {
													display: flex;
													align-items: center;
													height: 28rpx;
													padding: 0 20rpx;
													font-size: 26rpx;
													border-right: 1rpx solid #ccc;
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
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			transition: 0.3s;
		}

		.box-footer-active {
			padding: 0 !important;
			height: 0 !important;
		}

		.zidingyiBox {
			display: flex;
			flex-direction: column;

			width: 500rpx;
			height: 100%;
			background: #fff;

			.popup-head {
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
							background: #5DBDFE !important;
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
					background: #5DBDFE;
					color: #fff;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
