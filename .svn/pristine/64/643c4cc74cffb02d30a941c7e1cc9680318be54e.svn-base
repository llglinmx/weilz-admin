<template>
	<view class="resume-box">
		<view class="resume-box-content">
			<view class="resume-box-content-user-image" v-if="false">
				<image src="../../static/images/001.png" mode="aspectFill"></image>
			</view>
			<view class="resume-box-content-user-title">
				预约信息
			</view>
			<view class="resume-box-content-list" v-if="dataInfo.order_info">

				<view class="resume-box-content-list-li">
					<view class="resume-box-content-list-li-title">顾客：</view>
					<view class="resume-box-content-list-li-msg">{{dataInfo.order_info.name}}</view>
				</view>
				<view class="resume-box-content-list-li">
					<view class="resume-box-content-list-li-title">手机号：</view>
					<view class="resume-box-content-list-li-msg">{{dataInfo.order_info.mobile}}</view>
				</view>
				<view class="resume-box-content-list-li">
					<view class="resume-box-content-list-li-title">预约时间：</view>
					<view class="resume-box-content-list-li-msg">
						{{dataInfo.order_info.plan_date}}
						{{dataInfo.order_info.plan_start}} - {{dataInfo.order_info.plan_end}}
					</view>
				</view>
				<view class="resume-box-content-list-li">
					<view class="resume-box-content-list-li-title">服务技师：</view>
					<view class="resume-box-content-list-li-msg">{{dataInfo.order_info.member_name}}</view>
				</view>
				<view class="resume-box-content-list-li">
					<view class="resume-box-content-list-li-title">服务项目：</view>
					<view class="resume-box-content-list-li-msg">{{dataInfo.order_info.reserve_name}}</view>
				</view>
				<view class="resume-box-content-list-li">
					<view class="resume-box-content-list-li-title">门店：</view>
					<view class="resume-box-content-list-li-msg">{{dataInfo.order_info.store_name}}</view>
				</view>
				<view class="resume-box-content-list-li">
					<view class="resume-box-content-list-li-title">订单号：</view>
					<view class="resume-box-content-list-li-msg">{{dataInfo.order_info.out_trade_no}}</view>
				</view>
				<view class="resume-box-content-list-li">
					<view class="resume-box-content-list-li-title">下单时间：</view>
					<view class="resume-box-content-list-li-msg">{{dataInfo.order_info.createtime}}</view>
				</view>
				
				<view class="resume-box-content-list-li" style="align-items: flex-start;">
					<view class="resume-box-content-list-li-title">备注：</view>
					<view class="resume-box-content-list-li-msg">{{dataInfo.order_info.content}}</view>
				</view>
			</view>
		</view>
		<view class="box-footer flex-center" :style="{background:backgroundColor}" @click="close">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		name: "msg-details",
		data() {
			return {
				dataInfo: {}
			};
		},
		props: {
			data: {},
			backgroundColor: {
				type: String,
				default: '#26BF82'
			}
		},
		watch: {
			data(val) {
				this.dataInfo = this.data
			}
		},
		mounted() {
			this.dataInfo = this.data
		},
		methods: {
			close() {
				this.$emit('close')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.resume-box {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 60rpx;
		box-sizing: border-box;
		min-height: 780rpx;
		width: 600rpx;
		background: #fff;
		border-radius: 20rpx;


		.resume-box-content {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow-y: scroll;

			.resume-box-content-user-title {
				margin-bottom: 20rpx;
				font-size: 44rpx;
				text-align: center;
				font-weight: 500;
			}

			.resume-box-content-user-image {
				width: 120rpx;
				height: 120rpx;
				margin: auto;
				margin-bottom: 40rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.resume-box-content-list {
				flex: 1;
				overflow-y: scroll;
				margin-bottom: 20rpx;

				.resume-box-content-list-li {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					font-size: 28rpx;

					.resume-box-content-list-li-title {
						max-width: 140rpx;
						color: #333;
						font-weight: 500;
					}

					.resume-box-content-list-li-msg {
						flex: 1;
						color: #999;
					}
				}
			}
		}

		.box-footer {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10rpx;
			width: 100%;
			height: 80rpx;
			color: #fff;
			font-size: 32rpx;
			font-weight: 500;
		}
	}
</style>
