<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="设置"></nav-title-balck>
		</view>
		<view class="box-content">

		</view>
		<view class="box-footer">
			<view class="box-footer-btn flex-center" @click="logOut">退出登录</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" mode='base' title="警告" content="你确定要退出登录吗？" :duration="2000" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
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
		methods: {
			// 退出登录按钮
			logOut() {
				this.$refs.popup.open()
			},

			// 弹窗点击确认
			confirm() {
				var data = {}
				this.apiput('api/v1/logout', data).then(res => {
					if (res.status == 200) {
						uni.removeStorageSync('UToken');
						uni.showToast({
							icon: 'none',
							duration: 1000,
							title: "退出成功"
						});
						uni.reLaunch({
							url: "../../pages/login/login?type=business"
						})
					}
					this.$refs.popup.close()
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
		background: #fff;

		.box-head {
			background-color: #fff;
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;
		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;

			.box-footer-btn {
				height: 88rpx;
				background: #5DBDFE;
				box-shadow: 0rpx 10rpx 20rpx rgba(38, 191, 130, 0.2);
				border-radius: 15rpx;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
</style>
