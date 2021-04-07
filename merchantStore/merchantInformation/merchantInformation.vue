<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="商家信息"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-banner">
				<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration"
					:circular="circular">
					<swiper-item class="swiper-item" v-for="(item,index) in imageList">
						<image :src="item.url" mode="aspectFill" class="swiper-item"></image>
					</swiper-item>
				</swiper>
				<view class="box-content-banner-dot">
					<text class="iconfont icontupian icon-font"
						style="color: #fff;font-size: 24rpx;margin-top: 4rpx;"></text>
					<text>4</text>
				</view>
			</view>
			<view class="box-content-info">
				<view class="box-content-info-image">
					<image :src="infoData.simg" mode="aspectFill"></image>
				</view>
				<view class="box-content-info-main">
					<view class="box-content-info-main-title">{{infoData.name}}</view>
					<view class="box-content-info-main-score">
						<score :comment="infoData.comment" />
					</view>
					<view class="box-content-info-main-list">
						<view class="box-content-info-main-list-li">面部按摩</view>
						<view class="box-content-info-main-list-li">肩部按摩</view>
					</view>
				</view>
			</view>

			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">营业时间</view>
					<view class="box-content-list-li-text">{{infoData.plan_date}}</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">电话号码</view>
					<view class="box-content-list-li-text">{{infoData.mobile}}</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">税号</view>
					<view class="box-content-list-li-text">{{infoData.duty_paragraph}}</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">地址</view>
					<view class="box-content-list-li-text">
						<text style="color: #333;">{{infoData.address}}</text>
						<text class="iconfont icondingwei1 icon-font"
							style="color: #26BF82;font-size: 48rpx;margin-top: 4rpx;"></text>

					</view>
				</view>
			</view>

			<view class="box-content-introduce">
				<view class="box-content-introduce-title">商家介绍</view>
				<view class="box-content-introduce-text" v-html="infoData.content">

				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="修改" @btnClick="modify" />
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import score from '../../components/score/score.vue'
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
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
				autoplay: true,
				interval: 5000,
				duration: 500,
				circular: true,
				id: '',
				infoData: {
					name: '',
					simg: '',
					address: '',
					comment: '0',
					content: '',
					plan_date: '',
					mobile: '',
					duty_paragraph: ''
				}
			};
		},
		components: {
			navTitleBalck,
			btnSkyBlue,
			score
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
			// 修改
			modify() {},
			// 获取详情
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

			.box-content-banner {
				position: relative;
				padding: 20rpx 40rpx 0;
				box-sizing: border-box;
				background: #fff;

				.swiper {
					border-radius: 10rpx;
					overflow: hidden;

					.swiper-item {
						image {
							width: 100%;
							height: 376rpx;
						}
					}
				}

				.box-content-banner-dot {
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					right: 60rpx;
					bottom: 20rpx;
					width: 85rpx;
					height: 44rpx;
					background: rgba(0, 0, 0, 0.4);
					border-radius: 24rpx;
					font-size: 24rpx;
					color: #fff;

					.icon-font {
						margin-right: 10rpx;
					}
				}
			}

			.box-content-info {
				display: flex;
				align-items: center;
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-info-image {
					display: flex;
					align-items: center;

					image {
						width: 126rpx;
						height: 126rpx;
						border-radius: 10rpx;
					}
				}

				.box-content-info-main {
					height: 126rpx;
					margin-left: 20rpx;
					flex: 1;

					.box-content-info-main-title {
						line-height: 32rpx;
						font-size: 36rpx;
						font-weight: 500;
						color: #000;
					}

					.box-content-info-main-score {
						margin: 10rpx 0;
						display: flex;
						align-items: center;

						text {
							margin-right: 6rpx;
							font-size: 24rpx;
							color: #999;
						}
					}

					.box-content-info-main-list {
						display: flex;
						flex-wrap: wrap;

						.box-content-info-main-list-li {
							padding: 6rpx 10rpx;
							box-sizing: border-box;
							margin-right: 10rpx;
							font-size: 22rpx;
							color: #666;
							background: #F5F5F5;
							border-radius: 3rpx;
						}
					}
				}
			}

			.box-content-list {
				margin-top: 20rpx;
				background: #fff;

				.box-content-list-li {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 40rpx;
					box-sizing: border-box;
					height: 100rpx;
					border-bottom: 1rpx solid #ededed;
					font-size: 28rpx;
					color: #000;

					.box-content-list-li-title {
						width: 140rpx;
					}

					.box-content-list-li-text {
						display: flex;
						align-items: center;

						.icon-font {
							margin-left: 10rpx;
						}
					}
				}

				.box-content-list-li:last-child {
					border-bottom: 0;
				}
			}



			.box-content-introduce {
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				background: #fff;
				margin-top: 20rpx;

				.box-content-introduce-title {
					margin-bottom: 30rpx;
					font-size: 28rpx;
					color: #000;
					line-height: 28rpx;
				}

				.box-content-introduce-text {
					font-size: 26rpx;
					color: #666;
				}
			}

		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
		}
	}
</style>
