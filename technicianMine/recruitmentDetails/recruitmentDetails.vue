<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="职位详情" />
		</view>
		<view class="box-content">
			<view class="box-content-details">
				<view class="box-content-details-top">
					<view class="box-content-details-top-title">{{infoData.position}}</view>
					<view class="box-content-details-top-text">{{infoData.salary}}/月</view>
				</view>
				<view class="box-content-details-list">
					<view class="box-content-details-list-li">五险一金</view>
					<view class="box-content-details-list-li">包吃</view>
					<view class="box-content-details-list-li">包住</view>
				</view>
				<view class="box-content-details-wrap">
					<view class="box-content-details-wrap-item">
						职位类别：<text>按摩师</text>
					</view>
					<view class="box-content-details-wrap-item">
						学历要求：
						<text v-if="infoData.education==1">不限</text>
						<text v-if="infoData.education==2">高中</text>
						<text v-if="infoData.education==3">技校</text>
						<text v-if="infoData.education==4">中专</text>
						<text v-if="infoData.education==5">大专</text>
						<text v-if="infoData.education==6">本科</text>
						<text v-if="infoData.education==7">应届生</text>
					</view>
					<view class="box-content-details-wrap-item">
						招聘人数：<text>{{infoData.recruits_number}}人</text>
					</view>
					<view class="box-content-details-wrap-item">
						工龄要求：<text>{{infoData.service_year}}</text>
					</view>
					<view class="box-content-details-wrap-item">
						工作地点：<text>厦门</text>
					</view>
				</view>
			</view>
			<view class="box-content-text">
				<view class="box-content-text-title">职位描述</view>
				<view class="box-content-text-msg">{{infoData.position_information}}</view>
			</view>
			<view class="box-content-introduce">
				<view class="box-content-introduce-title">门店介绍</view>
				<view class="box-content-introduce-text">
					门店名称：<text>{{infoData.store_info.name}}</text>
				</view>
				<view class="box-content-introduce-address">
					<view class="box-content-introduce-address-icon">
						<text class="iconfont icondingwei1 icon-font" style="color: #26BF82;font-size: 40rpx"></text>
					</view>
					<view class="box-content-introduce-address-text">
						{{infoData.store_info.address}}
					</view>
					<view class="box-content-introduce-address-more">
						<text class="iconfont icongengduo icon-font"
							style="color: #26BF82;font-size: 40rpx;margin-top: 4rpx;"></text>
					</view>
				</view>
				<view class="box-content-introduce-text">门店介绍</view>
				<view class="box-content-introduce-msg" v-html="infoData.store_info.content"></view>
			</view>
		</view>
		<view class="box-footer">
			
		</view>

	</view>
</template>

<script>

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				id: '',
				infoData: {
					position: '',
					salary: '',
					recruits_number: 1,
					position_information: '',
					service_year: '',
					education: '',
					place_work: '',
					store_info: {
						name: ''
					}
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
		onShow() {
			// 用于判断是否有发布招聘
			if (this.$store.state.isAdd) {
				this.getInfo(this.id)
			}
		},
		methods: {

			getInfo(id) {
				this.apiget('api/v1/store/recruitment/' + id, {}).then(res => {
					if (res.status == 200) {
						this.infoData = res.data.data
					}
				});
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
			background-color: #26BF81;
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-details {
				padding: 30rpx 40rpx 20rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-details-top {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.box-content-details-top-title {
						font-size: 48rpx;
						font-weight: 500;
						color: #000;
					}

					.box-content-details-top-text {
						font-size: 40rpx;
						font-weight: 500;
						color: #26BF81;
					}
				}

				.box-content-details-list {
					display: flex;
					flex-wrap: wrap;
					margin: 30rpx 0 20rpx 0;

					.box-content-details-list-li {
						padding: 10rpx 16rpx;
						margin-right: 10rpx;
						margin-bottom: 10rpx;
						background: #F7F8FA;
						border-radius: 5rpx;
						font-size: 24rpx;
						color: #666;
					}
				}

				.box-content-details-wrap {
					display: flex;
					flex-wrap: wrap;

					.box-content-details-wrap-item {
						display: flex;
						align-items: center;
						width: 260rpx;
						margin-bottom: 20rpx;
						font-size: 28rpx;
						color: #999;

						text {
							color: #000;
						}
					}

					.box-content-details-wrap-item:nth-child(2n) {
						margin-left: 100rpx;
					}
				}
			}

			.box-content-text {
				margin-top: 20rpx;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-text-title {
					font-size: 36rpx;
					font-weight: 500;
					color: #000;
				}

				.box-content-text-msg {
					margin-top: 10rpx;
					line-height: 50rpx;
					font-size: 28rpx;
					color: #1A1A1A;
				}
			}

			.box-content-introduce {
				margin-top: 20rpx;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-introduce-title {
					font-size: 32rpx;
					font-weight: 500;
					color: #000;
				}

				.box-content-introduce-text {
					margin-top: 40rpx;
					font-size: 28rpx;
					color: #999;
					line-height: 32rpx;

					text {
						color: #000;
					}
				}

				.box-content-introduce-address {
					display: flex;
					align-items: center;
					padding: 30rpx 0;
					margin: 30rpx 0;
					border-top: 1rpx solid #ededed;
					border-bottom: 1rpx solid #ededed;

					.box-content-introduce-address-icon {}

					.box-content-introduce-address-text {
						margin: 0 40rpx 0 20rpx;
						flex: 1;
						font-size: 28rpx;
						color: #333333;
					}

					.box-content-introduce-address-more {}
				}

				.box-content-introduce-msg {
					margin-top: 30rpx;
					font-size: 28rpx;
					color: #333;
				}
			}
		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

		}
	}
</style>
