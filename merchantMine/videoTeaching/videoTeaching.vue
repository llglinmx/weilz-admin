<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="视频教学"></nav-title-balck>
			<view class="box-head-search">
				<view class="box-head-search-box">
					<view class="box-head-search-box-icon"
						:class="isSearch?'box-head-search-box-icon-active':'box-head-search-box-icon-no-active'">
						<text class="iconfont iconsousuo1 icon-font"
							style="color: #999;font-size: 40rpx;margin-top: 4rpx;"></text>
						<input type="text" value="" @focus="focus" @blur="blur" placeholder="搜索按摩教程" />
					</view>
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-banner">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration" :circular="circular">
					<swiper-item class="swiper-item" v-for="(item,index) in imageList">
						<image :src="item.url" mode="aspectFill" class="swiper-item"></image>
					</swiper-item>
				</swiper>
			</view>

			<view class="box-content-menu">
				<view class="box-content-menu-list">
					<view class="box-content-menu-list-li" @click="typeDetail(item)" v-for="(item,index) in menuList"
						:key="index">
						<image src="../../static/images/001.png" mode="aspectFill"></image>
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="box-content-menu-bar">
					<view class="box-content-menu-bar-active"></view>
				</view>
			</view>

			<view class="box-content-tabs">
				<view class="box-content-tabs-left">
					<view class="tabs-left-list">
						<view class="tabs-left-list-li" v-for="(item,index) in tabs" :key="index"
							:class="tabsIndex==index?'tabs-left-list-li-active':''" @click="tabsClick(index)">
							<text :class="tabsIndex==index?'text-after':''">{{item}}</text>
						</view>
					</view>
				</view>
				<view class="box-content-tabs-right" @click="changeIt">
					<text class="iconfont iconhuanyihuan icon-font"
						style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;" :class="isRotate?'rotate':''"></text>
					<text>换一换</text>
				</view>
			</view>

			<view class="box-content-main">
				<swiper class="box-content-main-swiper" :current="tabsIndex" @change="tabChange">
					<swiper-item class="swiper-box-item-list">
						<view class="box-content-main-list">
							<view class="box-content-main-list-li" v-for="(item,index) in 20" :key="index"
								@click="massageDetails">
								<view class="box-content-main-list-li-image">
									<image src="../../static/images/am-ico.png" mode="aspectFill"></image>
								</view>
								<view class="box-content-main-list-li-text">推拿培训 肩部疼痛</view>
								<view class="box-content-main-list-li-msg">肩部疼痛在线调理视频</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="swiper-box-item-list">
						<view class="box-content-main-list">
							<view class="box-content-main-list-li" v-for="(item,index) in 20" :key="index">
								<view class="box-content-main-list-li-image">
									<image src="../../static/images/am-ico1.png" mode="aspectFill"></image>
								</view>
								<view class="box-content-main-list-li-text">面部护理手法指导教...</view>
								<view class="box-content-main-list-li-msg">面部护理手法指导教学视频</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
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
				isRotate: false, //是否旋转
				tabsIndex: 0, //当前页面切换下标
				tabs: ["最新课程", "热门推荐"],
				imageList: [{
						url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1212%2F10%2Fc1%2F16491670_1355126816487.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617169230&t=15c6d87792f9fe60a66efcc066e816d5",
						link: ""
					},
					{
						url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201304%2F18%2F001339jv88x0qs06vo3qq6.jpg&refer=http%3A%2F%2Fattachments.gfan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617169230&t=cee66d4129e14994e31b7f0f370b0c39",
						link: ""
					},
					{
						url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201312%2F31%2F111859myvyiivetyftfz2n.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617169230&t=91b7765aa0a2234b14fc7dbf31cc2bf8",
						link: ""
					}
				],
				menuList: [{
						title: '按摩'
					},
					{
						title: '美容'
					},
					{
						title: '美甲'
					},
					{
						title: '医美'
					},
					{
						title: '健身'
					},
					{
						title: '瑜伽'
					},
					{
						title: '按摩'
					},
					{
						title: '按摩'
					},
				],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				circular: true,
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
			// 分类栏
			typeDetail(item) {
				switch (item.title) {
					case "按摩":
						uni.navigateTo({
							url: "../massage/massage"
						})
						break;
					default:
						break;
				}
			},


			// 点击tabs 
			tabsClick(index) {
				this.tabsIndex = index
			},
			// 滑动切换列表
			tabChange(e) {
				this.tabsIndex = e.detail.current
			},

			// 按摩详情
			massageDetails() {
				uni.navigateTo({
					url: "../massageDetails/massageDetails"
				})
			},

			// 点击换一换
			changeIt() {
				this.isRotate = true
				setTimeout(() => {
					this.isRotate = false
				}, 1000)
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

			.box-head-search {
				padding: 10rpx 20rpx;
				box-sizing: border-box;

				.box-head-search-box {
					position: relative;
					height: 80rpx;
					background: #F7F7F7;
					border-radius: 34rpx;

					.box-head-search-box-icon {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 230rpx;
						margin: auto;
						width: 250rpx;
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
						left: 230rpx;
						width: 250rpx;
					}

				}
			}
		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.box-content-banner {
				margin: 10rpx 0 10rpx;
				height: 300rpx;
				padding: 0 40rpx;
				box-sizing: border-box;

				.swiper {
					height: 100%;
					border-radius: 10rpx;
					overflow: hidden;
					border-radius: 10rpx;

					.swiper-item {
						height: 100%;

						// border-radius: 10rpx;
						image {
							width: 100%;
							height: 100%;
							// border-radius: 10rpx;
						}
					}
				}
			}

			.box-content-menu {
				position: relative;
				padding: 40rpx 0;


				.box-content-menu-list {
					display: flex;
					align-items: center;
					overflow-x: scroll;

					.box-content-menu-list-li {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						margin-left: 40rpx;
						width: 90rpx;

						image {
							width: 88rpx;
							height: 88rpx;
						}

						text {
							margin-top: 10rpx;
							font-size: 28rpx;
							color: #333;
						}
					}
				}

				.box-content-menu-bar {
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					width: 90rpx;
					height: 6rpx;
					background: #ededed;
					border-radius: 3rpx;

					.box-content-menu-bar-active {
						width: 60rpx;
						height: 100%;
						background: #5DBDFE;
						border-radius: 3rpx;
					}
				}
			}

			.box-content-tabs {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 40rpx;
				box-sizing: border-box;

				.box-content-tabs-left {
					.tabs-left-list {
						display: flex;
						align-items: center;

						.tabs-left-list-li:last-child {
							margin-right: 0;
						}

						.tabs-left-list-li {
							display: flex;
							align-items: center;
							width: 150rpx;
							height: 76rpx;

							margin-right: 40rpx;
							font-size: 32rpx;
							color: #666;
							transition: 0.3s;

							text {}

							.text-after {
								position: relative;
								transition: 0.3s;
							}

							.text-after::after {
								position: absolute;
								width: 100%;
								height: 4rpx;
								background: #5DBDFE;
								content: "";
								left: 0;
								bottom: -12rpx;
							}
						}

						.tabs-left-list-li-active {
							font-size: 36rpx !important;
							font-weight: 500;
							color: #000 !important;
						}
					}

				}

				.box-content-tabs-right {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #5DBDFE;

					.icon-font {
						margin-right: 10rpx;
						transition: 0.5s;
					}

					.rotate {
						transform: rotate(360deg);
					}
				}
			}

			.box-content-main {
				flex: 1;
				overflow-y: scroll;
				padding: 0 40rpx;
				box-sizing: border-box;

				.box-content-main-swiper {
					height: 100%;
					overflow-y: scroll;

					.swiper-box-item-list {
						width: 100%;
						height: 100%;
						overflow-y: scroll;

						.box-content-main-list {
							width: 100%;
							height: 100%;
							display: flex;
							flex-wrap: wrap;
							overflow-y: scroll;

							.box-content-main-list-li {
								width: 320rpx;
								margin-right: 30rpx;
								margin-bottom: 30rpx;

								.box-content-main-list-li-image {
									image {
										width: 320rpx;
										height: 200rpx;
									}
								}

								.box-content-main-list-li-text {
									margin: 10rpx 0;
									line-height: 32rpx;
									font-size: 30rpx;
									color: #000;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}

								.box-content-main-list-li-msg {
									font-size: 26rpx;
									color: #B3B3B3;
								}
							}

							.box-content-main-list-li:nth-child(2n) {
								margin-right: 0;
							}
						}
					}
				}
			}

		}

		.box-footer {}
	}
</style>
