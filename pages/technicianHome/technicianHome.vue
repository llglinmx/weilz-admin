<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-top">
				<view class="box-head-top-user-info">
					<view class="box-head-top-user-info-image flex-center">
						<image :src="userInfo.simg" mode="aspectFill"></image>
					</view>
					<view class="box-head-top-user-info-name">{{userInfo.name}}</view>
				</view>
				<view class="box-head-top-user-info-language" @click="clickLanguage">
					<text class="iconfont iconyuyan icon-font"
						style="color: #fff;font-size: 32rpx;margin-top: 4rpx;"></text>
					<text class="box-head-top-user-info-language-text">{{languageName}}</text>
				</view>
			</view>
			<view class="box-head-bottom">
				<view class="box-head-bottom-list">
					<view class="box-head-bottom-list-li flex-center" v-for="(item,index) in options" :key="index">
						<view class="box-head-bottom-list-li-number">{{item.number}}</view>
						<view class="box-head-bottom-list-li-text">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-content" :style="{display:isData?'block':'none'}">
			<z-paging ref="paging1" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
				:refresher-angle-enable-change-continued="false" :touchmove-propagation-enabled="true"
				:use-custom-refresher="true" style="height: 100%;">
				<view class="box-content-order-list">
					<view class="order-list-li" v-for="(item,index) in dataList" :key="index">
						<view class="order-list-li-top">
							<view class="order-list-li-top-title">订单号{{item.out_trade_no}}</view>
							<view class="order-list-li-top-msg" v-if="item.status==1&&item.use_status==-1">待核销</view>
							<view class="order-list-li-top-msg" v-if="item.status==-1&&item.use_status==-1">待支付</view>
							<view class="order-list-li-top-msg" v-if="item.status==2&&item.use_status==-1">已退款</view>
							<view class="order-list-li-top-msg" v-if="item.status==-2&&item.use_status==-1">订单已失效</view>
							<view class="order-list-li-top-msg" v-if="item.status==1&&item.use_status==1">已核销</view>
						</view>
						<view class="order-list-li-info">
							<view class="order-list-li-info-wrap">
								<view class="order-list-li-info-wrap-item">
									<view class="order-list-li-info-wrap-item-title">顾客</view>
									<view class="order-list-li-info-wrap-item-msg">
										<text>{{item.name}}</text>
										<text>{{item.mobile}}</text>
									</view>
								</view>
								<view class="order-list-li-info-wrap-item">
									<view class="order-list-li-info-wrap-item-title">服务</view>
									<view class="order-list-li-info-wrap-item-msg">
										<text>{{item.reserve_name}}</text>
									</view>
								</view>
								<view class="order-list-li-info-wrap-item">
									<view class="order-list-li-info-wrap-item-title">门店</view>
									<view class="order-list-li-info-wrap-item-msg">
										<text>{{item.store_name}}</text>
									</view>
								</view>
								<view class="order-list-li-info-wrap-item">
									<view class="order-list-li-info-wrap-item-title">时间</view>
									<view class="order-list-li-info-wrap-item-msg">
										<text>{{item.plan_date}} {{item.plan_start}}-{{item.plan_end}}</text>
									</view>
								</view>
							</view>
							<view class="order-list-li-info-footer">
								<view class="order-list-li-info-footer-price">
									<view class="order-list-li-info-footer-price-msg">实付款：</view>
									<view class="order-list-li-info-footer-present-price">
										￥<text>{{item.amount}}</text>
									</view>
								</view>
								<view class="order-list-li-info-footer-all-btn"
									v-if="item.status==1&&item.use_status==-1">
									<view class="order-list-li-info-footer-btn flex-center"
										@click="confirmWriteOff(item.id)">
										确认核销</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
		<view class="box-content" :style="{display:!isData?'block':'none'}">
			<loading v-if="isLoad" />
			<no-data v-if="!isLoad" />
		</view>
		<view class="box-footer">
			<technician-tabbar ref="tabBarRef" @tabbarClick="tabbarClick" :activeIndex="activeIndex">
			</technician-tabbar>
		</view>

		<!-- 选择语言弹出层 -->
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="popup-box">
				<view class="popup-list-box">
					<view class="popup-title">
						选择语言
					</view>
					<view class="popup-list">
						<view class="popup-list-li" v-for="(item,index) in textList"
							@click="selectLanguage(item.id,index)" :class="item.default==1?'popup-list-li-active':''">
							<text>{{item.name}}</text>
							<text class="iconfont icondagou icon-font" style="color:#26BF82;font-size: 40rpx;"
								v-if="item.default==1"></text>
						</view>
					</view>
					<view class="popup-btn" @click="confirmBtn">
						确定
					</view>
				</view>
				<view class="popup-close flex-center" @click="closeLanguage">
					<text class="iconfont iconcuowu icon-font" style="color:#fff;font-size: 48rpx;"></text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度,
				activeIndex: 0, //当前tabbar所在页面
				textList: ['中文', "英语", "俄语", "法语", "德语"],
				dataList: [],
				options: [{
						title: "待核销",
						number: "0",
						id: 0
					},
					{
						title: "已核销",
						number: "0",
						id: 1
					},
					{
						title: "今日预约",
						number: "0",
						id: 2
					},
					{
						title: "已评价",
						number: "0",
						id: 3
					},
				],
				userInfo: {
					name: '',
					simg: ''
				},
				isData: false,
				isLoad: true,
				selectIndex: 0, //当前选择的语言
				LanguageID: '',
				LanguageCode: '',
				selectIndex: 0, //当前选择的语言
				languageName: 'EN',

			}
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
			if (this.$store.state.isOrderState) {
				this.orderList(1, 20)
			}
		},
		onLoad() {
			this.languageList();
			this.getInfo()
		},

		methods: {

			// 获取个人信息
			getInfo() {
				let vuedata = {}
				this.apiget('api/v1/engineer/info', vuedata).then(res => {
					if (res.status == 200) {
						this.userInfo = res.data.engineer
						this.options.map(item => {
							switch (item.id) {
								case 0:
									item.number = res.data.engineer.not_verification_order
									break;
								case 1:
									// item.number = res.data.written_off_num
									break;
								case 2:
									item.number = res.data.engineer.booking_today_num
									break;
								case 3:
									// item.number = res.data.cancelled_num
									break;
							}
						})
					}
				});
			},

			// 上拉 下拉
			queryList(pageNo, pageSize) {
				this.orderList(pageNo, pageSize)
			},


			// 订单列表
			orderList(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
				}
				this.apiget('api/v1/engineer/order', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.member.length != 0) {
							this.isData = true
							let list = res.data.member
							this.$refs.paging1.complete(list);
							return false;
						}
						this.isData = false
						this.isLoad = false

					}
				});
			},




			// 打开切换语言
			clickLanguage() {
				this.$refs.popup.open()
			},
			// 选择语言
			selectLanguage(id, index) {
				this.textList.forEach(item => {
					item.default = '-1'
				})
				this.textList[index].default = 1
				this.selectIndex = index
				this.LanguageID = this.textList[index].id
				this.LanguageCode = this.textList[index].code
			},
			// 选择语言 关闭
			closeLanguage() {
				this.$refs.popup.close()
			},
			// 语言选择确定按钮
			confirmBtn() {
				this.languageName = this.textList[this.selectIndex].name
				uni.setStorageSync('isTechnicianSelectLanguage', true);
				uni.setStorageSync('technicianLanguageId', this.LanguageID);
				uni.setStorageSync('technicianLanguageCode', this.LanguageCode);
				this.$refs.tabBarRef.languageChange()
				this.$refs.popup.close()
			},

			// 请求语言列表
			languageList() {
				this.apiget('language', {}).then(res => {
					if (res.status == 200) {
						this.textList = res.data.lng.reverse()
						var langId = uni.getStorageSync('technicianLanguageId');

						if (langId) {
							this.textList.forEach((item, index) => {
								if (item.id == langId) { //判断默认选中语言包
									this.textList.forEach(item => {
										item.default = '-1'
									})
									this.textList[index].default = 1
									this.languageName = item.name
								}
							})
						} else {
							this.textList.forEach((item, index) => {
								if (item.default == 1) { //判断默认选中语言包
									this.selectIndex = index
									this.languageName = item.name
								}
							})
						}
					}
				});
			},



			// 确认核销
			confirmWriteOff(id) {
				this.$store.commit('upOrderState', false)
				uni.navigateTo({
					url: "../../technicianOrder/toBeWrittenOff/toBeWrittenOff?id=" + id
				})
			},



			// tabbar点击
			tabbarClick(index) {
				this.activeIndex = index
				switch (index) {
					case 0: //首页

						break;
					case 1: //订单
						uni.redirectTo({
							url: "../../pages/technicianOrder/technicianOrder"
						})
						break;
					case 2: //我的
						uni.redirectTo({
							url: "../../pages/technicianMine/technicianMine"
						})
						break;
				}

			},

		}
	}
</script>

<style scoped lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.box-head {
			background-color: #26BF82;
			color: #fff;
			padding-bottom: 40rpx;

			.box-head-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;
				padding: 0 40rpx;
				box-sizing: border-box;

				.box-head-top-user-info {
					display: flex;
					align-items: center;

					.box-head-top-user-info-image {
						width: 80rpx;
						height: 80rpx;
						background: rgba(255, 255, 255, .2);
						border-radius: 50%;

						image {
							width: 70rpx;
							height: 70rpx;
							border-radius: 50%;
						}
					}

					.box-head-top-user-info-name {
						margin-left: 16rpx;
						font-size: 32rpx;
					}
				}

				.box-head-top-user-info-language {
					display: flex;
					align-items: center;

					.box-head-top-user-info-language-text {
						margin-left: 8rpx;
						font-size: 28rpx;
					}
				}
			}

			.box-head-bottom {
				margin-top: 40rpx;

				.box-head-bottom-list {
					display: flex;
					align-items: center;

					.box-head-bottom-list-li {
						position: relative;
						flex-direction: column;
						flex: 1;

						.box-head-bottom-list-li-number {
							font-weight: bold;
							font-size: 34rpx;
						}

						.box-head-bottom-list-li-text {
							font-size: 26rpx;
						}
					}

					.box-head-bottom-list-li::after {
						position: absolute;
						top: 0;
						bottom: 0;
						right: 0;
						margin: auto;
						content: '';
						width: 1rpx;
						height: 40rpx;
						background: rgba(255, 255, 255, .4);
					}
				}
			}
		}

		.box-content {
			flex: 1;

			overflow-y: scroll;
			background: #F7F7F7;

			.box-content-order-list {
				// margin-bottom: 40rpx;
				padding: 0 20rpx;
				box-sizing: border-box;

				.order-list-li {
					margin-top: 20rpx;
					background: #fff;
					border-radius: 20rpx;

					.order-list-li-top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 24rpx 20rpx;
						box-sizing: border-box;
						border-bottom: 1rpx solid #EDEDED;

						.order-list-li-top-title {
							font-size: 28rpx;
							color: #000;
						}

						.order-list-li-top-msg {
							font-size: 28rpx;
							color: #26BF82;
						}
					}

					.order-list-li-info {
						padding: 30rpx 20rpx 20rpx;
						box-sizing: border-box;

						.order-list-li-info-wrap {
							.order-list-li-info-wrap-item {
								display: flex;
								align-items: center;
								margin-bottom: 20rpx;
								font-size: 28rpx;

								.order-list-li-info-wrap-item-title {
									margin-right: 40rpx;
									color: #B3B3B3;
								}

								.order-list-li-info-wrap-item-msg {
									display: flex;
									align-items: center;
									color: #000;

									text {
										display: block;
										margin-right: 40rpx;
									}

									text:last-child {
										margin-left: 0;
									}
								}
							}
						}

						.order-list-li-info-footer {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.order-list-li-info-footer-price {
								display: flex;
								align-items: center;

								.order-list-li-info-footer-price-msg {
									font-size: 24rpx;
									color: #999;
								}

								.order-list-li-info-footer-present-price {
									font-size: 24rpx;
									color: #FF4D4D;

									text {
										font-size: 32rpx;
										font-weight: 500;
									}
								}
							}

							.order-list-li-info-footer-all-btn {
								display: flex;

								.order-list-li-info-footer-btn {
									width: 176rpx;
									height: 60rpx;
									background: #26BF82;
									margin-left: 20rpx;
									color: #fff;
									font-size: 28rpx;
									border-radius: 32rpx;
								}
							}
						}
					}
				}
			}

		}

		.box-footer {}

		.popup-box {
			position: relative;
			width: 570rpx;
			// height: 704rpx;
			padding: 0 60rpx;
			box-sizing: border-box;
			background: #fff;
			border-radius: 20rpx;

			.popup-list-box {
				height: 100%;
				display: flex;
				flex-direction: column;

				.popup-title {
					padding: 40rpx 0;
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #000000;
					text-align: center;
				}

				.popup-list {
					flex: 1;
					margin-bottom: 40rpx;
					overflow-y: scroll;

					.popup-list-li {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 80rpx;
						margin-bottom: 30rpx;
						background: #F7F7F7;
						transition: 0.2s;

						text {}

						.icon-font {
							position: absolute;
							right: 30rpx;
							top: 0;
							bottom: 0;
							margin: auto;
						}
					}

					.popup-list-li-active {
						color: #26BF82 !important;
						background: #bde6d6 !important;
					}

					.popup-list-li:last-child {
						margin-bottom: 0;
					}
				}

				.popup-btn {
					margin-bottom: 50rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 88rpx;
					background: #26BF82;
					border-radius: 15rpx;
					color: #fff;
				}
			}

			.popup-close {
				position: absolute;
				top: -28rpx;
				right: -28rpx;
				width: 56rpx;
				height: 56rpx;
				border-radius: 50%;
				background: #26BF82;
			}
		}
	}
</style>
