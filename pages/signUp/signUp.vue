<template>
	<view class="box">
		<view class="box-content">
			<view class="box-content-title">
				<text class="logo-title">weiiz</text>
				<text class="logo-msg">商家服务平台</text>
			</view>
			<view class="box-content-wrap">
				<view class="box-content-login box-btn flex-center" @click="login">登录</view>
				<view class="box-content-register box-btn flex-center" @click="register">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			// 登录
			login() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			// 点击注册 跳转到 注册页面
			register() {
				uni.navigateTo({
					url: "../registerRoles/registerRoles"
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		position: relative;
		height: 100%;
		background: url(../../static/images/login-ico.png) no-repeat;
		background-size: cover;

		.box-content {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.3);

			.box-content-title {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				flex: 1;
				color: #fff;

				.logo-title {
					font-size: 160rpx;
				}

				.logo-msg {
					font-size: 48rpx;
				}
			}

			.box-content-wrap {
				flex: 1;
				padding: 0 60rpx 120rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;

				.box-btn {
					width: 630rpx;
					height: 88rpx;
					border-radius: 15rpx;
					font-size: 32rpx;
					color: #fff;
				}

				.box-content-login {
					background: #5DBDFE;
					margin-bottom: 30rpx;
				}

				.box-content-register {
					background: rgba(255, 255, 255, .5);
				}


			}

		}
	}
</style>
