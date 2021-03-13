<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav"></view>
			<view class="box-head-search">
				<view class="box-head-search-box">
					<view class="box-head-search-box-icon" :class="isSearch?'box-head-search-box-icon-active':'box-head-search-box-icon-no-active'">
						<text class="iconfont iconsousuo1 icon-font" style="color: #999;font-size: 40rpx;margin-top: 4rpx;"></text>
						<input type="text" value="" @focus="focus" @blur="blur" placeholder="搜索订单号、预约信息" />
					</view>
				</view>
			</view>
			<view class="box-head-tabs">
				<tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-order">
								<view class="box-content-order-list">
									<view class="box-content-order-list-li" v-for="(item,index) in 10" :key="index" @click="writeOffDetails">
										<view class="box-content-order-list-li-top">
											<view class="order-list-li-top-title">订单号DU199110074026</view>
											<view class="order-list-li-top-msg">待核销</view>
										</view>
										<view class="box-content-order-list-li-wrap">
											<view class="order-list-li-wrap-item" v-for="(i,j) in 3">
												<view class="order-list-li-wrap-item-image">
													<image src="../../static/images/001.png" mode="aspectFill"></image>
												</view>
												<view class="order-list-li-wrap-item-info">
													<view class="order-list-li-wrap-item-info-top">
														<view class="wrap-item-info-top-text">泰式古法按摩</view>
														<view class="wrap-item-info-top-msg">￥298.00</view>
													</view>
													<view class="order-list-li-wrap-item-info-box">
														<view class="order-list-li-wrap-item-info-box-list">
															<view class="order-list-li-wrap-item-info-box-list-li" v-for="(s,k) in 2">泰式按摩</view>
														</view>
														<view class="order-list-li-wrap-item-info-box-number">x1</view>
													</view>
												</view>
											</view>
										</view>
										<view class="box-content-order-list-li-appointment-info">
											<view class="order-list-li-appointment-info-title">预约信息</view>
											<view class="order-list-li-appointment-info-wrap">
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">预 约 人：</view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text>庄女士</text>
														<text>13812345678</text>
													</view>
												</view>
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">预约门店： </view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text> 罗约蓝池·温泉SPA</text>
													</view>
												</view>
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">买家留言：</view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text>暂无留言</text>
													</view>
												</view>

											</view>
										</view>
										<view class="box-content-order-list-li-footer">
											<view class="box-content-order-list-li-footer-text">
												<view class="box-content-order-list-li-footer-text-msg">实付款：</view>
												<view class="box-content-order-list-li-footer-text-price">￥<text>332.70</text></view>
											</view>
											<view class="box-content-order-list-li-footer-btn">
												<view class="order-list-li-footer-all-btn btn-hollow flex-center">取消订单</view>
												<view class="order-list-li-footer-all-btn btn-fill flex-center">确认核销</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-order">
								<view class="box-content-order-list">
									<view class="box-content-order-list-li" v-for="(item,index) in 10" :key="index">
										<view class="box-content-order-list-li-top">
											<view class="order-list-li-top-title">订单号DU199110074026</view>
											<view class="order-list-li-top-msg">待核销</view>
										</view>
										<view class="box-content-order-list-li-wrap">
											<view class="order-list-li-wrap-item" v-for="(i,j) in 3">
												<view class="order-list-li-wrap-item-image">
													<image src="../../static/images/001.png" mode="aspectFill"></image>
												</view>
												<view class="order-list-li-wrap-item-info">
													<view class="order-list-li-wrap-item-info-top">
														<view class="wrap-item-info-top-text">泰式古法按摩</view>
														<view class="wrap-item-info-top-msg">￥298.00</view>
													</view>
													<view class="order-list-li-wrap-item-info-box">
														<view class="order-list-li-wrap-item-info-box-list">
															<view class="order-list-li-wrap-item-info-box-list-li" v-for="(s,k) in 2">泰式按摩</view>
														</view>
														<view class="order-list-li-wrap-item-info-box-number">x1</view>
													</view>
												</view>
											</view>
										</view>
										<view class="box-content-order-list-li-appointment-info">
											<view class="order-list-li-appointment-info-title">预约信息</view>
											<view class="order-list-li-appointment-info-wrap">
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">预 约 人：</view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text>庄女士</text>
														<text>13812345678</text>
													</view>
												</view>
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">预约门店： </view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text> 罗约蓝池·温泉SPA</text>
													</view>
												</view>
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">买家留言：</view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text>暂无留言</text>
													</view>
												</view>

											</view>
										</view>
										<view class="box-content-order-list-li-footer">
											<view class="box-content-order-list-li-footer-text">
												<view class="box-content-order-list-li-footer-text-msg">实付款：</view>
												<view class="box-content-order-list-li-footer-text-price">￥<text>332.70</text></view>
											</view>
											<view class="box-content-order-list-li-footer-btn">
												<view class="order-list-li-footer-all-btn btn-hollow flex-center">取消订单</view>
												<view class="order-list-li-footer-all-btn btn-fill flex-center">确认核销</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-order">
								<view class="box-content-order-list">
									<view class="box-content-order-list-li" v-for="(item,index) in 10" :key="index">
										<view class="box-content-order-list-li-top">
											<view class="order-list-li-top-title">订单号DU199110074026</view>
											<view class="order-list-li-top-msg">待核销</view>
										</view>
										<view class="box-content-order-list-li-wrap">
											<view class="order-list-li-wrap-item" v-for="(i,j) in 3">
												<view class="order-list-li-wrap-item-image">
													<image src="../../static/images/001.png" mode="aspectFill"></image>
												</view>
												<view class="order-list-li-wrap-item-info">
													<view class="order-list-li-wrap-item-info-top">
														<view class="wrap-item-info-top-text">泰式古法按摩</view>
														<view class="wrap-item-info-top-msg">￥298.00</view>
													</view>
													<view class="order-list-li-wrap-item-info-box">
														<view class="order-list-li-wrap-item-info-box-list">
															<view class="order-list-li-wrap-item-info-box-list-li" v-for="(s,k) in 2">泰式按摩</view>
														</view>
														<view class="order-list-li-wrap-item-info-box-number">x1</view>
													</view>
												</view>
											</view>
										</view>
										<view class="box-content-order-list-li-appointment-info">
											<view class="order-list-li-appointment-info-title">预约信息</view>
											<view class="order-list-li-appointment-info-wrap">
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">预 约 人：</view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text>庄女士</text>
														<text>13812345678</text>
													</view>
												</view>
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">预约门店： </view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text> 罗约蓝池·温泉SPA</text>
													</view>
												</view>
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">买家留言：</view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text>暂无留言</text>
													</view>
												</view>

											</view>
										</view>
										<view class="box-content-order-list-li-footer">
											<view class="box-content-order-list-li-footer-text">
												<view class="box-content-order-list-li-footer-text-msg">实付款：</view>
												<view class="box-content-order-list-li-footer-text-price">￥<text>332.70</text></view>
											</view>
											<view class="box-content-order-list-li-footer-btn">
												<view class="order-list-li-footer-all-btn btn-hollow flex-center">取消订单</view>
												<view class="order-list-li-footer-all-btn btn-fill flex-center">确认核销</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-order">
								<view class="box-content-order-list">
									<view class="box-content-order-list-li" v-for="(item,index) in 10" :key="index">
										<view class="box-content-order-list-li-top">
											<view class="order-list-li-top-title">订单号DU199110074026</view>
											<view class="order-list-li-top-msg">待核销</view>
										</view>
										<view class="box-content-order-list-li-wrap">
											<view class="order-list-li-wrap-item" v-for="(i,j) in 3">
												<view class="order-list-li-wrap-item-image">
													<image src="../../static/images/001.png" mode="aspectFill"></image>
												</view>
												<view class="order-list-li-wrap-item-info">
													<view class="order-list-li-wrap-item-info-top">
														<view class="wrap-item-info-top-text">泰式古法按摩</view>
														<view class="wrap-item-info-top-msg">￥298.00</view>
													</view>
													<view class="order-list-li-wrap-item-info-box">
														<view class="order-list-li-wrap-item-info-box-list">
															<view class="order-list-li-wrap-item-info-box-list-li" v-for="(s,k) in 2">泰式按摩</view>
														</view>
														<view class="order-list-li-wrap-item-info-box-number">x1</view>
													</view>
												</view>
											</view>
										</view>
										<view class="box-content-order-list-li-appointment-info">
											<view class="order-list-li-appointment-info-title">预约信息</view>
											<view class="order-list-li-appointment-info-wrap">
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">预 约 人：</view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text>庄女士</text>
														<text>13812345678</text>
													</view>
												</view>
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">预约门店： </view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text> 罗约蓝池·温泉SPA</text>
													</view>
												</view>
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">买家留言：</view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text>暂无留言</text>
													</view>
												</view>

											</view>
										</view>
										<view class="box-content-order-list-li-footer">
											<view class="box-content-order-list-li-footer-text">
												<view class="box-content-order-list-li-footer-text-msg">实付款：</view>
												<view class="box-content-order-list-li-footer-text-price">￥<text>332.70</text></view>
											</view>
											<view class="box-content-order-list-li-footer-btn">
												<view class="order-list-li-footer-all-btn btn-hollow flex-center">取消订单</view>
												<view class="order-list-li-footer-all-btn btn-fill flex-center">确认核销</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-order">
								<view class="box-content-order-list">
									<view class="box-content-order-list-li" v-for="(item,index) in 10" :key="index">
										<view class="box-content-order-list-li-top">
											<view class="order-list-li-top-title">订单号DU199110074026</view>
											<view class="order-list-li-top-msg">待核销</view>
										</view>
										<view class="box-content-order-list-li-wrap">
											<view class="order-list-li-wrap-item" v-for="(i,j) in 3">
												<view class="order-list-li-wrap-item-image">
													<image src="../../static/images/001.png" mode="aspectFill"></image>
												</view>
												<view class="order-list-li-wrap-item-info">
													<view class="order-list-li-wrap-item-info-top">
														<view class="wrap-item-info-top-text">泰式古法按摩</view>
														<view class="wrap-item-info-top-msg">￥298.00</view>
													</view>
													<view class="order-list-li-wrap-item-info-box">
														<view class="order-list-li-wrap-item-info-box-list">
															<view class="order-list-li-wrap-item-info-box-list-li" v-for="(s,k) in 2">泰式按摩</view>
														</view>
														<view class="order-list-li-wrap-item-info-box-number">x1</view>
													</view>
												</view>
											</view>
										</view>
										<view class="box-content-order-list-li-appointment-info">
											<view class="order-list-li-appointment-info-title">预约信息</view>
											<view class="order-list-li-appointment-info-wrap">
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">预 约 人：</view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text>庄女士</text>
														<text>13812345678</text>
													</view>
												</view>
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">预约门店： </view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text> 罗约蓝池·温泉SPA</text>
													</view>
												</view>
												<view class="order-list-li-appointment-info-wrap-item">
													<view class="order-list-li-appointment-info-wrap-item-title">买家留言：</view>
													<view class="order-list-li-appointment-info-wrap-item-text">
														<text>暂无留言</text>
													</view>
												</view>

											</view>
										</view>
										<view class="box-content-order-list-li-footer">
											<view class="box-content-order-list-li-footer-text">
												<view class="box-content-order-list-li-footer-text-msg">实付款：</view>
												<view class="box-content-order-list-li-footer-text-price">￥<text>332.70</text></view>
											</view>
											<view class="box-content-order-list-li-footer-btn">
												<view class="order-list-li-footer-all-btn btn-hollow flex-center">取消订单</view>
												<view class="order-list-li-footer-all-btn btn-fill flex-center">确认核销</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<technician-tabbar @tabbarClick="tabbarClick" :activeIndex="activeIndex"></technician-tabbar>
		</view>
	</view>
</template>

<script>
	import tabs from "../../components/tabs/tabs.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				activeIndex: 1, //当前tabbar所在页面
				defaultIndex: 0, //当前滑动的页面
				tabsList: ["全部订单", "待核销", "已核销", "已退款", "已评价"],
				isSearch: false, //是否搜索
			};
		},
		components: {
			tabs
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
			// input框 获得焦点事件
			focus() {
				this.isSearch = true
			},
			// 失去焦点事件
			blur() {
				console.log(111)
				this.isSearch = false
			},

			// 待核销详情
			writeOffDetails() {
				uni.navigateTo({
					url: "../../technicianOrder/toBeWrittenOff/toBeWrittenOff"
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

			// tabbar点击
			tabbarClick(index) {
				switch (index) {
					case 0: //首页
						uni.redirectTo({
							url: "../../pages/technicianHome/technicianHome"
						})
						break;
					case 1: //订单

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

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #F7F7F7;

		.box-head {
			background-color: #fff;

			.box-head-search {
				padding: 0 20rpx;
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
						left: 170rpx;
						margin: auto;
						width: 370rpx;
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
						left: 170rpx;
						width: 370rpx;
					}

				}
			}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

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

							.box-content-order {
								.box-content-order-list {
									margin-bottom: 20rpx;

									.box-content-order-list-li {
										margin-top: 20rpx;
										padding: 0 40rpx;
										box-sizing: border-box;
										background: #fff;

										.box-content-order-list-li-top {
											display: flex;
											align-items: center;
											justify-content: space-between;
											padding: 30rpx 0;
											font-size: 28rpx;

											.order-list-li-top-title {
												color: #000;
											}

											.order-list-li-top-msg {
												color: #26BF82;
											}
										}

										.box-content-order-list-li-wrap {
											padding-bottom: 20rpx;

											.order-list-li-wrap-item {
												display: flex;
												margin-bottom: 20rpx;

												.order-list-li-wrap-item-image {
													display: flex;
													align-items: center;

													image {
														width: 132rpx;
														height: 132rpx;
													}
												}

												.order-list-li-wrap-item-info {
													flex: 1;
													margin-left: 20rpx;

													.order-list-li-wrap-item-info-top {
														display: flex;
														align-items: center;
														justify-content: space-between;
														color: #000;

														.wrap-item-info-top-text {
															font-size: 30rpx;
															font-weight: 500;
														}

														.wrap-item-info-top-msg {
															font-size: 28rpx;
														}
													}

													.order-list-li-wrap-item-info-box {
														display: flex;
														justify-content: space-between;
														align-items: center;
														margin-top: 10rpx;

														.order-list-li-wrap-item-info-box-list {
															display: flex;
															flex-wrap: wrap;

															.order-list-li-wrap-item-info-box-list-li {
																padding: 6rpx 10rpx;
																margin-left: 8rpx;
																background: #F5F5F5;
																border-radius: 3rpx;
																font-size: 22rpx;
																color: #666;
															}
														}

														.order-list-li-wrap-item-info-box-number {
															font-size: 28rpx;
															color: #999;
														}

													}
												}
											}
										}

										.box-content-order-list-li-appointment-info {
											padding: 30rpx 0;
											border-top: 1rpx solid #ededed;
											border-bottom: 1rpx solid #ededed;

											.order-list-li-appointment-info-title {
												font-size: 30rpx;
												line-height: 32rpx;
												color: #000;
											}

											.order-list-li-appointment-info-wrap {
												margin-top: 30rpx;

												.order-list-li-appointment-info-wrap-item {
													display: flex;
													align-items: center;
													margin-bottom: 10rpx;
													font-size: 26rpx;

													.order-list-li-appointment-info-wrap-item-title {
														color: #999;
													}

													.order-list-li-appointment-info-wrap-item-text {
														display: flex;
														align-items: center;
														color: #000;

														text {
															margin-right: 40rpx;
															display: block;
														}

														text:last-child {
															margin-right: 0;
														}
													}
												}
											}
										}

										.box-content-order-list-li-footer {
											display: flex;
											align-items: center;
											justify-content: space-between;
											height: 100rpx;

											.box-content-order-list-li-footer-text {
												display: flex;
												align-items: baseline;

												.box-content-order-list-li-footer-text-msg {
													font-size: 24rpx;
													color: #999;
												}

												.box-content-order-list-li-footer-text-price {
													font-size: 24rpx;
													color: #FF4D4D;

													text {
														font-size: 32rpx;
														font-weight: 500;
													}
												}
											}

											.box-content-order-list-li-footer-btn {
												display: flex;
												align-items: center;

												.order-list-li-footer-all-btn {
													margin-right: 20rpx;
													border-radius: 32rpx;
													font-size: 28rpx;
												}

												.order-list-li-footer-all-btn:last-child {
													margin-right: 0;
												}

												.btn-hollow {
													width: 174rpx;
													height: 58rpx;
													border: 1rpx solid #666666;
													color: #666;
												}

												.btn-fill {
													width: 176rpx;
													height: 60rpx;
													background: #26BF82;
													color: #fff;
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

		.box-footer {}
	}
</style>
