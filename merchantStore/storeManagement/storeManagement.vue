<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="门店管理"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-main">
				<view class="box-content-main-image">
					<image src="../../static/images/001.png" mode="aspectFill"></image>
				</view>
				<view class="box-content-main-info">
					<view class="box-content-main-info-title">罗约蓝池·温泉SPA</view>
					<view class="box-content-main-info-score">
						<text class="iconfont iconwujiaoxing icon-font" style="color: #FFCD4D;font-size: 28rpx;" v-for="item in 5"></text>
						<text>5分</text>
					</view>
					<view class="box-content-main-info-address">地址：中国 福建省 厦门市 集美区 杏滨路罗约酒店负一楼</view>
				</view>
				<view class="box-content-main-more">
					<text class="iconfont icongengduo icon-font" style="color: #ccc;font-size: 32rpx;margin-top: 4rpx;"></text>
				</view>
			</view>

			<view class="box-content-list" v-for="(item,index) in menuList" :key="index" @click="menuListClick(index)">
				<view class="box-content-list-item">
					<view class="box-content-list-item-left">
						<view class="box-content-list-item-left-image">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
						<view class="box-content-list-item-left-title">{{item.title}}</view>
					</view>
					<view class="box-content-list-item-more">
						<text class="iconfont icongengduo icon-font" style="color: #ccc;font-size: 32rpx;margin-top: 4rpx;"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="box-footer-btn flex-center">
				删除门店
			</view>
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				menuList: [{
						title: "门店二维码",
						image: "../../static/images/store-code-ico.png"
					},
					{
						title: "项目管理",
						image: "../../static/images/store-project-ico.png"
					},
					{
						title: "技师管理",
						image: "../../static/images/store-technician-ico.png"
					},
					{
						title: "排班表",
						image: "../../static/images/store-scheduling-ico.png"
					},
					{
						title: "技师招聘",
						image: "../../static/images/store-recruit-ico.png"
					},
					{
						title: "房间管理",
						image: "../../static/images/store-room-ico.png"
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
			// 菜单栏点击
			menuListClick(index) {
				switch (index) {
					case 0: //门店二维码
						uni.navigateTo({
							url: "../storeQRCode/storeQRCode"
						})
						break;
					case 1: //项目管理
						uni.navigateTo({
							url: "../projectManagement/projectManagement"
						})
						break;
					case 2: //技师管理
						uni.navigateTo({
							url: "../technicianManagement/technicianManagement"
						})
						break;
					case 4: //技师招聘
						uni.navigateTo({
							url: "../technicianRecruit/technicianRecruit"
						})
						break;
					case 5: //房间管理
						uni.navigateTo({
							url: "../roomManagement/roomManagement"
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
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-main {
				display: flex;
				align-items: center;
				padding: 30rpx 40rpx;
				margin-top: 20rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-main-image {
					width: 132rpx;
					height: 132rpx;

					image {
						width: 132rpx;
						height: 132rpx;
					}
				}

				.box-content-main-info {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					width: 470rpx;
					height: 132rpx;
					margin: 0 20rpx;

					.box-content-main-info-title {
						color: #000;
						font-size: 34rpx;
					}

					.box-content-main-info-score {
						display: flex;
						align-items: center;

						text {
							margin-right: 6rpx;
							font-size: 24rpx;
							color: #999;
						}
					}

					.box-content-main-info-address {
						font-size: 24rpx;
						color: #666;
						overflow: hidden; //超出的文本隐藏
						text-overflow: ellipsis; //溢出用省略号显示
						white-space: nowrap; //溢出不换行
					}
				}

				.box-content-main-more {
					// width: 50rpx;
				}
			}


			.box-content-list {
				margin-top: 20rpx;
				padding: 0 40rpx;
				box-sizing: border-box;
				height: 100rpx;
				background: #fff;

				.box-content-list-item {
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.box-content-list-item-left {
						display: flex;
						align-items: center;

						.box-content-list-item-left-image {
							display: flex;
							align-items: center;

							image {
								width: 76rpx;
								height: 76rpx;

							}
						}

						.box-content-list-item-left-title {
							margin-left: 20rpx;
							font-size: 32rpx;
							color: #000;
						}
					}

					.box-content-list-item-more {}
				}
			}

		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;

			.box-footer-btn {
				height: 78rpx;
				font-size: 32rpx;
				color: #5DBDFE;
				border-radius: 10rpx;
				border: 1px solid #5DBDFE;
			}
		}
	}
</style>
