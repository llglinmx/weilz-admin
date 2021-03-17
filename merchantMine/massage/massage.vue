<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="按摩"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-wrap-search">
				<view class="box-content-wrap-search-box">
					<text class="iconfont iconsousuo icon-font" style="color: #999;font-size:40rpx;margin-top: 4rpx;"
						:class="isSearch?'icon-font-active':''"></text>
					<input type="text" @focus="focus" @blur="blur" placeholder="搜索按摩教程"
						:class="isSearch?'input-active':''" />
				</view>
				<view class="box-content-wrap-search-screen">
					<text class="iconfont iconshaixuan icon-font"
						style="color: #000;font-size:36rpx;margin-top: 4rpx;"></text>
					<text>筛选</text>
				</view>
			</view>

			<view class="box-content-list">
				<view class="box-content-list-li" v-for="(item,index) in dataList" :key="index" @click="massageDetails">
					<view class="box-content-list-li-image">
						<image src="../../static/images/am-ico.png" mode="aspectFill"></image>
					</view>
					<view class="box-content-list-li-wrap">
						<view class="box-content-list-li-wrap-left">
							<view class="box-content-list-li-wrap-left-title">{{item.title}}</view>
							<view class="box-content-list-li-wrap-left-text">{{item.text}}</view>
						</view>
						<view class="box-content-list-li-wrap-collect" @click.stop="collectClick(index)">
							<text class="iconfont iconshoucang-tianchong" style="color:#5DBDFE;font-size: 52rpx"
								v-if="item.isCheck"></text>
							<text class="iconfont iconshoucang" style="color:#ccc;font-size: 52rpx" v-else></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">

		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				isSearch: false, //是否搜索
				dataList: [{
						title: "推拿培训 肩部疼痛",
						text: '肩部疼痛在线调理视频',
						isCheck: true
					},
					{
						title: "推拿培训 肩部疼痛",
						text: '肩部疼痛在线调理视频',
						isCheck: false
					},
					{
						title: "推拿培训 肩部疼痛",
						text: '肩部疼痛在线调理视频',
						isCheck: false
					},
					{
						title: "推拿培训 肩部疼痛",
						text: '肩部疼痛在线调理视频',
						isCheck: true
					},
					{
						title: "推拿培训 肩部疼痛",
						text: '肩部疼痛在线调理视频',
						isCheck: false
					},
					{
						title: "推拿培训 肩部疼痛",
						text: '肩部疼痛在线调理视频',
						isCheck: false
					},
				]
			};
		},
		components: {
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
			// input框 获得焦点事件
			focus() {
				this.isSearch = true
			},
			// 失去焦点事件
			blur() {
				this.isSearch = false
			},

			// 点击进入详情
			massageDetails() {
				uni.navigateTo({
					url: "../massageDetails/massageDetails"
				})
			},

			// 收藏点击
			collectClick(index) {
				this.dataList[index].isCheck = !this.dataList[index].isCheck
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

		.box-head {
			background-color: #fff;
		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.box-content-wrap-search {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 40rpx 30rpx;
				box-sizing: border-box;

				.box-content-wrap-search-box {
					position: relative;
					width: 548rpx;
					height: 72rpx;
					background: #F7F7F7;
					border-radius: 40rpx;

					.icon-font {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 180rpx;
						margin: auto;
						transition: 0.3s;
					}

					.icon-font-active {
						left: 480rpx;
					}

					input {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 228rpx;
						margin: auto;
						width: 180rpx;
						height: 100%;
						font-size: 28rpx;
						transition: 0.3s;
					}

					.input-active {
						left: 0 !important;
						padding-left: 40rpx;
					}
				}

				.box-content-wrap-search-screen {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #000;

					.icon-font {
						margin-right: 10rpx;
					}
				}
			}

			.box-content-list {
				flex: 1;
				overflow-y: scroll;
				padding: 0 40rpx;
				box-sizing: border-box;
				margin-bottom: 40rpx;

				.box-content-list-li:first-child {
					margin-top: 0rpx;
				}

				.box-content-list-li {
					margin-top: 40rpx;

					.box-content-list-li-image {
						image {
							width: 100%;
							height: 420rpx;
						}
					}

					.box-content-list-li-wrap {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.box-content-list-li-wrap-left {
							.box-content-list-li-wrap-left-title {
								font-size: 34rpx;
								color: #000;
							}

							.box-content-list-li-wrap-left-text {
								font-size: 26rpx;
								color: #B3B3B3;
							}
						}

						.box-content-list-li-wrap-collect {}
					}
				}
			}
		}

		.box-footer {}
	}
</style>
