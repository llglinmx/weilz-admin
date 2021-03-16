<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="退款订单详情" />
		</view>
		<view class="box-content">
			<view class="box-content-main">
				<view class="box-content-main-wrap"></view>
				<view class="box-content-main-list">
					<view class="box-content-main-listt-top"></view>
					<view class="box-content-main-list-data">
						<view class="box-content-main-list-data-item" v-for="(item,index) in dataList" :key="index">
							<view class="main-list-data-item-title">{{item.title}}</view>
							<view class="main-list-data-item-text">{{item.text}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navTitleWhite from "../../components/nav-title-white/nav-title-white.vue"
	import merchantTabs from "../../components/merchant-tabs/merchant-tabs.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				dataList: [{
						title: "订单号",
						text: 'DSH35693596738'
					},
					{
						title: "用户ID",
						text: '13812345689'
					},
					{
						title: "用户昵称",
						text: '上善若水'
					},
					{
						title: "管理账号",
						text: 'w1007'
					},
					{
						title: "门店",
						text: '集美区门店'
					},
					{
						title: "退款金额",
						text: '-1200'
					},
					{
						title: "退款原因",
						text: '不想要了'
					},
					{
						title: "支付方式",
						text: '银联'
					},
					{
						title: "时间",
						text: '2020-12-14'
					},
				],
			};
		},
		components: {
			navTitleWhite,
			merchantTabs
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
			background-color: #5DBDFE;
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-main {
				position: relative;
				height: 232rpx;
				background: #5DBDFE;

				.box-content-main-wrap {
					position: absolute;
					width: 670rpx;
					height: 30rpx;
					top: 40rpx;
					left: 0;
					right: 0;
					margin: auto;
					background: #409FFF;
					border-radius: 17rpx;
				}

				.box-content-main-list {
					position: absolute;
					width: 630rpx;
					mine-height: 1125rpx;
					padding-bottom: 50rpx;
					top: 55rpx;
					left: 0;
					right: 0;
					margin: auto;
					background: #fff;

					.box-content-main-listt-top {
						width: 100%;
						height: 40rpx;
						background: linear-gradient(180deg, #98D5FE 0%, rgba(255, 255, 255, 0) 100%);
					}

					.box-content-main-list-data {
						margin-top: 20rpx;
						padding: 0 40rpx;
						box-sizing: border-box;

						.box-content-main-list-data-item {
							height: 88rpx;
							border-bottom: 1rpx solid #ededed;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 28rpx;

							.main-list-data-item-title {
								color: #999;
							}

							.main-list-data-item-text {
								color: #000;
							}
						}
					}
				}
			}

		}

	}
</style>
