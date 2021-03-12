<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="评价管理"></nav-title-balck>
			<view class="box-head-tabs">
				<tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-item-type">
								<view class="box-content-item-type-li flex-center" @click="typeClick(index)" :class="typeIndex==index?'box-content-item-type-li-active':''"
								 v-for="(item,index) in typeList" :key="index">{{item}}({{index+10}})</view>
							</view>
							<view class="box-content-item-comment">
								<view class="box-content-item-comment-list">
									<view class="box-content-item-comment-list-li" v-for="(item,index) in 10" :key="index">
										<view class="comment-list-li-top">
											<view class="comment-list-li-top-image">
												<image src="../../static/images/userImage.png" mode="aspectFill"></image>
											</view>
											<view class="comment-list-li-top-info">
												<view class="comment-list-li-top-info-title">SKB露娜可可</view>
												<view class="comment-list-li-top-info-score">
													<text class="iconfont iconwujiaoxing icon-font" style="color: #FFCD4D;font-size: 28rpx;" v-for="item in 5"></text>
													<text>5分</text>
												</view>
											</view>
										</view>
										<view class="comment-list-li-msg-content">
											经常累的时候过来按摩，技师服务很好，按摩还会询问力度，很会聊天，这里地理位置也很好找，环境也挺好的，服务员也很热情，来这里整体给我的感觉都是不错的，推荐大家来这家店体验一下。
										</view>
										<view class="comment-list-li-msg-time">
											2020年10月20日 16:25:01
										</view>
										<view class="comment-list-li-msg-image-arr">
											<image src="../../static/images/2.png" mode="aspectFill" v-for="(i,j) in 4" :key="j"></image>
										</view>
										<view class="comment-list-li-msg-reply" v-if="index!=1">
											<view class="comment-list-li-msg-reply-text">我的回复：</view>
											<view class="comment-list-li-msg-reply-content">
												感谢您的支持与认可！我们会继续努力提供更优质的服务与项目感谢您的支持与认可！我们会继续努力提供更优质的服务与项目
											</view>
										</view>
										<view class="comment-list-li-msg-wrap">
											<view class="comment-list-li-msg-wrap-text">查看订单</view>
											<view class="comment-list-li-msg-wrap-btn flex-center" v-if="index!=1">追加回复</view>
											<view class="comment-list-li-msg-wrap-btn flex-center" v-else>回复顾客</view>
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list">

						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer">

		</view>
	</view>
</template>

<script>
	import tabs from "../../components/tabs/tabs.vue"
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				tabsList: ["客户评价", "商家评价"],
				typeList: ["全部", "未回复", "已回复"],
				defaultIndex: 0, //当前滑动的页面
				typeIndex: 0, //当前选择的评论类型
			};
		},
		components: {
			tabs,
			navTitleBalck
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

			// 评论类型点击
			typeClick(index) {
				this.typeIndex = index
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
		background: #fff;

		.box-head {}

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

							.box-content-item-type {
								display: flex;
								align-items: center;
								padding: 30rpx 40rpx;
								box-sizing: border-box;

								.box-content-item-type-li {
									width: 182rpx;
									height: 60rpx;
									margin-right: 20rpx;
									border: 1rpx solid #CCCCCC;
									border-radius: 30rpx;
									color: #ccc;
									font-size: 28rpx;
									transition: 0.3s;
								}

								.box-content-item-type-li:last-child {
									margin-right: 0;
								}

								.box-content-item-type-li-active {
									border: 1rpx solid #26BF82;
									color: #26BF82;
								}
							}

							.box-content-item-comment {
								box-sizing: border-box;

								.box-content-item-comment-list {
									padding-left: 40rpx;
									box-sizing: border-box;
									margin-bottom: 40rpx;

									.box-content-item-comment-list-li:first-child {
										margin-top: 0;
									}

									.box-content-item-comment-list-li {
										padding-right: 40rpx;
										box-sizing: border-box;
										border-bottom: 1rpx solid #ededed;
										padding-bottom: 20rpx;
										margin-top: 40rpx;

										.comment-list-li-top {
											display: flex;
											align-items: center;

											.comment-list-li-top-image {
												display: flex;
												align-items: center;

												image {
													width: 88rpx;
													height: 88rpx;
												}
											}

											.comment-list-li-top-info {
												margin-left: 20rpx;
												flex: 1;
												height: 100%;

												.comment-list-li-top-info-title {
													font-size: 32rpx;
													color: #000;
												}

												.comment-list-li-top-info-score {
													display: flex;
													align-items: center;

													text {
														margin-right: 6rpx;
														font-size: 24rpx;
														color: #999;
													}
												}
											}
										}

										.comment-list-li-msg-content {
											margin: 20rpx 0;
											font-size: 28rpx;
											color: #333;
										}

										.comment-list-li-msg-time {
											font-size: 24rpx;
											color: #999;
										}

										.comment-list-li-msg-image-arr {
											display: flex;
											align-items: center;
											margin-top: 20rpx;

											image {
												width: 160rpx;
												height: 160rpx;
												margin-right: 10rpx;
												margin-bottom: 10rpx;
											}

											image:nth-child(4n) {
												margin-right: 0;
											}
										}

										.comment-list-li-msg-reply {
											margin-top: 20rpx;
											padding: 20rpx;
											box-sizing: border-box;
											min-height: 152rpx;
											background: #F7F7F7;
											border-radius: 10rpx;
											font-size: 28rpx;

											.comment-list-li-msg-reply-text {
												color: #999;
											}

											.comment-list-li-msg-reply-content {
												color: #333;
											}
										}

										.comment-list-li-msg-wrap {
											padding: 20rpx 0;
											display: flex;
											align-items: center;
											justify-content: space-between;
											font-size: 28rpx;

											.comment-list-li-msg-wrap-text {
												color: #999;
											}

											.comment-list-li-msg-wrap-btn {
												width: 176rpx;
												height: 60rpx;
												background: #26BF82;
												border-radius: 32rpx;
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

		.box-footer {}
	}
</style>
