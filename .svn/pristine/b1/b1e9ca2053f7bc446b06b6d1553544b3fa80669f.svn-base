<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-top">
				<text class="iconfont iconxiaoxi icon-font" style="font-size: 52rpx;color: #fff;margin-right: 20rpx;"
					@click="msgClick"></text>
				<text class="iconfont iconshezhi icon-font" style="font-size: 52rpx;color: #fff;" @click="set"></text>
			</view>
			<view class="box-head-wrap">
				<view class="box-head-wrap-user-info">
					<view class="box-head-wrap-user-info-image flex-center">
						<image :src="userInfo.simg" mode="aspectFill"></image>
					</view>
					<view class="box-head-wrap-user-info-main">
						<view class="user-info-main-title">
							<view class="user-info-main-title-text">{{userInfo.name}}</view>
							<view class="user-info-main-title-msg">{{userInfo.level_name}}</view>
						</view>
						<view class="user-info-main-store">所属门店：{{userInfo.store_name}}</view>
					</view>
				</view>
				<view class="box-head-wrap-state flex-center">上班中</view>
			</view>
		</view>
		<view class="box-content">
			<!-- <view class="box-content-list">
				<view class="box-content-list-li" v-for="(item,index) in typeList" :key="index">
					<view class="box-content-list-li-image">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="box-content-list-li-text">{{item.text}}</view>
				</view>
			</view> -->

			<view class="box-content-main">
				<view class="box-content-main-list">
					<view class="box-content-main-list-li" v-for="(item,index) in menuList" :key="index"
						@click="menuClick(index,item.id)">
						<view class="box-content-main-list-li-info">
							<text :class="item.style" class="iconfont icon-font"
								:style="{fontSize:item.size+'rpx',color:item.color}"></text>
							<text class="list-li-info-text">{{item.text}}</text>
						</view>
						<view class="box-content-main-list-li-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<technician-tabbar @tabbarClick="tabbarClick" :activeIndex="activeIndex"></technician-tabbar>
		</view>
	</view>
</template>

<script>
	import technicianTabbar from "../../components/technician-tabbar/technician-tabbar.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				activeIndex: 2, //当前tabbar所在页面
				typeList: [{
						text: '待核销',
						image: '../../static/images/technician-mine-icon1.png',
					},
					{
						text: '已核销',
						image: '../../static/images/technician-mine-icon2.png'
					},
					{
						text: '已退款',
						image: '../../static/images/technician-mine-icon3.png'
					},
					{
						text: '已评价',
						image: '../../static/images/technician-mine-icon4.png'
					},
					{
						text: '全部订单',
						image: '../../static/images/technician-mine-icon5.png'
					},
				],
				menuList: [
					// {
					// 	text: "收益统计",
					// 	size: '48',
					// 	style: "iconshouyitongji",
					// 	color: "#26BF82",
					// 	id: 0
					// },
					{
						text: "日程安排",
						size: '48',
						style: "iconrichenganpai",
						color: "#26BF82",
						id: 1
					},
					{
						text: "客户评价",
						size: '48',
						style: "iconkehupingjia",
						color: "#FFDB3A",
						id: 2
					},
					{
						text: "技师信息",
						size: '48',
						style: "iconjishixinxi",
						color: "#4CB6FE",
						id: 3
					},
					// {
					// 	text: "收益提成",
					// 	size: '48',
					// 	style: "iconshouyiticheng",
					// 	color: "#26BF82",
					// 	id: 4
					// },
					{
						text: "推荐消息",
						size: '48',
						style: "icontuijianxiaoxi",
						color: "#4CB6FE",
						id: 5
					},
					{
						text: "招聘信息",
						size: '48',
						style: "iconzhaopinxinxi",
						color: "#FFDB3A",
						id: 6
					},
				],
				userInfo: {
					level_name: '',
					name: '',
					simg: '',
					store_name: ''
				}
			};
		},
		components: {
			technicianTabbar
		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onLoad() {
			this.getInfo()
		},
		methods: {

			// 获取个人信息
			getInfo() {
				let vuedata = {}
				this.apiget('api/v1/engineer/info', vuedata).then(res => {
					if (res.status == 200) {
						this.userInfo = res.data.engineer
					}
				});
			},



			// 系统消息
			msgClick() {
				uni.navigateTo({
					url: "../../technicianMine/systemMessage/systemMessage"
				})
			},

			// 设置
			set() {
				uni.navigateTo({
					url: "../../technicianMine/set/set"
				})
			},

			// 菜单点击
			menuClick(index, id) {
				// 
				switch (id) {
					// 收益统计
					case 0:
						uni.navigateTo({
							url: "../../technicianMine/revenueStatistics/revenueStatistics"
						})
						break;
						// 日程安排
					case 1:
						let str = {
							store: this.userInfo.store,
							id: this.userInfo.id
						}
						uni.navigateTo({
							url: "../../technicianMine/schedule/schedule?data=" + JSON.stringify(str)
						})
						break;
						// 客户评价
					case 2:
						uni.navigateTo({
							url: "../../technicianMine/evaluationManagement/evaluationManagement"
						})
						break;
						// 技师信息
					case 3:
						uni.navigateTo({
							url: "../../technicianMine/technicianInformation/technicianInformation"
						})
						break;
						// 收益提成
					case 4:
						uni.navigateTo({
							url: "../../technicianMine/incomeCommission/incomeCommission"
						})
						break;
						// 推荐消息
					case 5:
						uni.navigateTo({
							url: "../../technicianMine/recommend/recommend"
						})
						break;
						// 招聘信息
					case 6:
						uni.navigateTo({
							url: "../../technicianMine/recruitmentInformation/recruitmentInformation"
						})
						break;
				}
			},

			// tabbar点击
			tabbarClick(index) {
				this.activeIndex = index
				switch (index) {
					case 0: //首页
						uni.redirectTo({
							url: "../../pages/technicianHome/technicianHome"
						})
						break;
					case 1: //订单

						uni.redirectTo({
							url: "../../pages/technicianOrder/technicianOrder"
						})
						break;
					case 2: //我的


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
			padding-bottom: 30rpx;
			background-color: #26BF82;
			color: #fff;

			.box-head-top {
				display: flex;
				justify-content: flex-end;
				padding: 18rpx 40rpx;
				box-sizing: border-box;
			}

			.box-head-wrap {
				padding-left: 40rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.box-head-wrap-user-info {
					display: flex;
					align-items: center;

					.box-head-wrap-user-info-image {
						width: 128rpx;
						height: 128rpx;
						background: rgba(255, 255, 255, .2);
						border-radius: 50%;

						image {
							width: 112rpx;
							height: 112rpx;
							border-radius: 50%;
						}
					}

					.box-head-wrap-user-info-main {
						margin-left: 20rpx;

						.user-info-main-title {
							display: flex;
							align-items: center;

							.user-info-main-title-text {
								font-size: 36rpx;
							}

							.user-info-main-title-msg {
								margin-left: 12rpx;
								padding: 7rpx 10rpx;
								box-sizing: border-box;
								font-size: 22rpx;
								border: 1rpx solid #fff;
								line-height: 22rpx;
								border-radius: 6rpx;
							}
						}

						.user-info-main-store {
							margin-top: 10rpx;
							font-size: 24rpx;
						}
					}
				}

				.box-head-wrap-state {
					width: 144rpx;
					height: 56rpx;
					background: rgba(255, 255, 255, .2);
					border-radius: 28rpx 0rpx 0rpx 28rpx;
					font-size: 28rpx;
				}
			}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-list {
				height: 164rpx;
				display: flex;
				margin: 20rpx 0;
				background: #fff;

				.box-content-list-li {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					flex: 1;

					.box-content-list-li-image {
						image {
							width: 64rpx;
							height: 64rpx;
						}
					}

					.box-content-list-li-text {
						font-size: 24rpx;
						color: #333;
					}
				}
			}

			.box-content-main {
				.box-content-main-list {
					background: #fff;
					padding-left: 40rpx;
					box-sizing: border-box;

					.box-content-main-list-li {
						height: 100rpx;
						padding-right: 40rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1rpx solid #ededed;

						.box-content-main-list-li-info {
							display: flex;
							align-items: center;

							.list-li-info-text {
								margin-left: 16rpx;
								font-size: 32rpx;
								color: #000;
							}
						}

						.box-content-main-list-li-more {}
					}

					.box-content-main-list-li:last-child {
						border-bottom: 0;
					}
				}
			}

		}

		.box-footer {}
	}
</style>
