<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="门店管理"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-main" @click="merchantDetails">
				<view class="box-content-main-image">
					<image :src="infoData.simg" mode="aspectFill"></image>
				</view>
				<view class="box-content-main-info">
					<view class="box-content-main-info-title">{{infoData.name}}</view>
					<view class="box-content-main-info-score">
						<score :comment="infoData.comment" />
					</view>
					<view class="box-content-main-info-address">地址：{{infoData.address}}</view>
				</view>
				<view class="box-content-main-more">
					<text class="iconfont icongengduo icon-font"
						style="color: #ccc;font-size: 32rpx;margin-top: 4rpx;"></text>
				</view>
			</view>

			<view class="box-content-list" v-for="(item,index) in menuList" :key="index"
				@click="menuListClick(item.id)">
				<view class="box-content-list-item">
					<view class="box-content-list-item-left">
						<view class="box-content-list-item-left-image">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
						<view class="box-content-list-item-left-title">{{item.title}}</view>
					</view>
					<view class="box-content-list-item-more">
						<text class="iconfont icongengduo icon-font"
							style="color: #ccc;font-size: 32rpx;margin-top: 4rpx;"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="box-footer-btn flex-center" @click="deleteStore">
				删除门店
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" mode='base' title="警告" content="你确定要删除此门店吗？" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				id: '',
				menuList: [{
						title: "门店二维码",
						image: "../../static/images/store-code-ico.png",
						id: 0
					},
					{
						title: "项目管理",
						image: "../../static/images/store-project-ico.png",
						id: 1
					},
					{
						title: "项目分类",
						image: "../../static/images/store-room-ico.png",
						id: 2
					},
					{
						title: "技师管理",
						image: "../../static/images/store-technician-ico.png",
						id: 3
					},
					{
						title: "排班表",
						image: "../../static/images/store-scheduling-ico.png",
						id: 4
					},
					{
						title: "技师招聘",
						image: "../../static/images/store-recruit-ico.png",
						id: 5
					},
					// {
					// 	title: "房间管理",
					// 	image: "../../static/images/store-room-ico.png",
					// 	id: 6
					// },
				],
				infoData: {
					name: '',
					simg: '',
					address: '',
					comment: '0'
				}
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
			this.getInfo(options.id)
		},
		methods: {
			// 商家信息
			merchantDetails() {
				uni.navigateTo({
					url: "../merchantInformation/merchantInformation?id=" + this.id
				})
			},
			// 删除门店按钮
			deleteStore() {
				this.$refs.popup.open()
			},

			// 弹窗点击取消
			close(done) {
				done()
			},
			// 弹窗点击确认
			confirm(done, value) {
				this.apidelte('api/v1/store/store_information/del/' + this.id, {}).then(res => {
					if (res.status == 200) {
						this.$store.commit("upAddStore", true)
						uni.showToast({
							title: "删除成功",
							icon: "none"
						})
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					}
					done()
				});
			},


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
							url: "../projectManagement/projectManagement?id=" + this.id
						})
						break;
					case 2: //项目分类
						uni.navigateTo({
							url: '../projectClassification/projectClassification?id=' + this.id
						})
						break;
					case 3: //技师管理
						uni.navigateTo({
							url: "../technicianManagement/technicianManagement?id=" + this.id
						})
						break;
					case 4: //排班表
						uni.navigateTo({
							url: "../schedule/schedule?id=" + this.id
						})
						break;
					case 5: //技师招聘
						this.$store.commit("upAdd", false)
						uni.navigateTo({
							url: "../technicianRecruit/technicianRecruit?id=" + this.id
						})
						break;
					case 6: //房间管理
						uni.navigateTo({
							url: "../roomManagement/roomManagement?id=" + this.id
						})
						break;
				}
			},

			getInfo(id) {
				this.apiget('api/v1/store/store_information/' + id, {}).then(res => {
					if (res.status == 200) {
						this.infoData = res.data.member
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
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
						border-radius: 10rpx;
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
