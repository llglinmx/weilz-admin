<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="客户详情"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-user">
				<view class="box-content-user-info">
					<view class="box-content-user-info-top">
						<view class="box-content-user-info-top-name">
							{{infoData.name}}
						</view>
						<view class="box-content-user-info-top-leval">
							<image src="../../static/images/grade-yellow.png" mode="aspectFill"></image>
							<text>钻石会员</text>
						</view>
					</view>
					<view class="box-content-user-info-bottom">
						上次到店 2020-12-20 18:40
					</view>
				</view>
				<view class="box-content-user-image">
					<image :src="infoData.avatar" mode="aspectFill"></image>
				</view>
			</view>
			<view class="box-content-wrap">
				<view class="box-content-wrap-item" v-for="(item,index) in arrList" :key="index">
					<text>{{item.number}}</text>
					<text>{{item.title}}</text>
				</view>
			</view>
			<view class="box-content-man">
				<view class="box-content-man-item">
					<view class="box-content-man-item-title">手机号码：</view>
					<view class="box-content-man-item-text">{{infoData.mobile}}</view>
				</view>
				<view class="box-content-man-item">
					<view class="box-content-man-item-title">消费金额：</view>
					<view class="box-content-man-item-text">{{infoData.order_status.consumption_money}}</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="删除客户" @btnClick="deleteBtn" />
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" mode='base' title="警告" content="你确定要删除该客户吗?" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import UniPopup from "../../components/uni-popup/uni-popup.vue"
	import UniPopupDialog from "../../components/uni-popup/uni-popup-dialog.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				arrList: [{
						title: '礼品卡',
						number: "12"
					},
					{
						title: '年卡',
						number: "25"
					},
					{
						title: '折扣券',
						number: "36"
					},
				],
				infoData: {
					name: '',
					avatar: '',
					mobile: '',
					order_status: {
						consumption_money: ''
					}
				}
			};
		},
		components: {
			navTitleBalck,
			btnSkyBlue,
			UniPopup,
			UniPopupDialog
		},
		onLoad(options) {
			this.getCustomerDetails(options.id)
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
			// 删除客户
			deleteBtn() {
				this.$refs.popup.open()
			},
			// 获取客户详情
			getCustomerDetails(id) {
				this.apiget('api/v1/store/user_list/index/' + id, {}).then(res => {
					if (res.status == 200) {
						this.infoData = res.data.member
					}
				});
			},
			// 弹窗点击取消
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			// 弹窗点击确认
			confirm(done, value) {
				done()
				return false
				this.apidelte('api/v1/store/coupon/del/' + this.id, {}).then(res => {
					if (res.status == 200) {
						this.$store.commit('upDeleteCustomer', true)
						uni.showToast({
							title: "客户删除成功",
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					}
					done()
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

			.box-content-user {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-user-info {
					height: 116rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.box-content-user-info-top {
						flex: 1;
						display: flex;
						align-items: center;

						.box-content-user-info-top-name {
							font-size: 40rpx;
							color: #000;
						}

						.box-content-user-info-top-leval {
							display: flex;
							align-items: center;
							margin-left: 20rpx;

							image {
								width: 34rpx;
								height: 34rpx;
							}

							text {
								margin-left: 10rpx;
								font-size: 26rpx;
								color: #FF967D;
							}
						}
					}

					.box-content-user-info-bottom {
						font-size: 26rpx;
						color: #999;
					}
				}

				.box-content-user-image {
					image {
						width: 116rpx;
						height: 116rpx;
						border-radius: 50%;
					}
				}
			}

			.box-content-wrap {
				margin: 20rpx 0;
				display: flex;
				height: 142rpx;
				background: #fff;

				.box-content-wrap-item {
					flex: 1;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					text:nth-child(1) {
						font-size: 36rpx;
						font-weight: 500;
						color: #000;
					}

					text:nth-child(2) {
						margin-top: 10rpx;
						font-size: 26rpx;
						color: #999;
					}
				}

				.box-content-wrap-item::after {
					position: absolute;
					top: 0;
					bottom: 0;
					right: 0;
					margin: auto;
					width: 1rpx;
					height: 82rpx;
					content: "";
					background: #ededed;
				}
			}

			.box-content-man {
				padding: 0 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-man-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 100rpx;
					font-size: 28rpx;
					color: #000;
					border-bottom: 1rpx solid #ededed;

					.box-content-man-item-title {}

					.box-content-man-item-text {}
				}

				.box-content-man-item:last-child {
					border-bottom: 0;
				}
			}

		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
		}
	}
</style>
