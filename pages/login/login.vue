<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-nav-back" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #333;font-size: 36rpx;"></text>
					<!-- <image src="../../static/images/back.png" mode="aspectFill"></image> -->
				</view>
				<view class="box-head-nav-text" @click="register">注册</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-title">欢迎登录</view>
			<view class="box-content-list">
				<view class="box-content-list-li">
					<input type="number" @input="accountChange" v-model.trim="accountNumber" placeholder="手机号/邮箱"
						confirm-type="done" />
				</view>
				<view class="box-content-list-li">
					<input type="text" @input="passwordChange" password="true" v-model.trim="password"
						placeholder="请输入密码" confirm-type="done" />
					<text class="iconfont iconxianshimima icon-font" style="color: #ccc;"></text>
				</view>
				<view class="box-content-list-msg">忘记密码</view>
			</view>
			<view class="box-content-btn flex-center" @click="confirmLogin" :class="isAll?'btn-active':''">同意协议并登录
			</view>
			<view class="box-content-text">
				登录代表你已同意
				<text>《用户协议》</text>
				<text>《隐私保护政策》</text>
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
				accountNumber: "", //账号
				password: "", //密码
				isAll: false, //用于判断是否都有输入
				isType: 0, //0为技师登录 1为商家登录
			};
		},
		components: {

		},
		watch: {

		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},

		onShow() {
			this.accountNumber = ''
		},

		onLoad() {
			uni.setStorageSync('token',
				'weiizeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY4MTYxNjIyMDMzMDM4MTIifQ.As6qwI8ig2_FgqUKft2CmD6DF-Lz-LW6_GnYEUt7z0Q'
			);
		},

		methods: {
			// 监听输入账号
			accountChange() {
				console.log(this.accountNumber != '' && this.password != '')
				if (this.accountNumber != '' && this.password != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},

			//监听输入密码
			passwordChange() {
				console.log(this.accountNumber != '' && this.password != '')
				if (this.accountNumber != '' && this.password != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},

			// 确认登录
			confirmLogin() {
				this.isType = this.accountNumber
				if (this.isType == 0) {
					uni.navigateTo({
						url: "../technicianHome/technicianHome"
					})
				} else if (this.isType == 1) {
					uni.navigateTo({
						url: "../merchantHome/merchantHome"
					})
				}

				// if (!this.isAll) {
				// 	uni.showToast({
				// 		title: "请检查输入是否完整",
				// 		icon: "none"
				// 	})
				// } else {

				// }
			},
			// 登录
			login() {
				var data={
					code: "8421"
					code_id: "code_68872"
					username: this.accountNumber
					password: this.password
				}
				this.apiget('login', {}).then(res => {
					if (res.status == 200) {
						console.log(res.data.member)
						
						
					}
				});
			},


			// 点击注册 跳转到 注册页面
			register() {
				uni.navigateTo({
					url: "../registerRoles/registerRoles"
				})
			},
			//返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.box-head {
			background-color: #fff;

			.box-head-nav {
				padding: 0 40rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 88rpx;

				.box-head-nav-back {}

				.box-head-nav-text {
					color: #333;
					font-size: 34rpx;
				}
			}

		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;
			padding: 0 60rpx;
			box-sizing: border-box;
			font-family: Source Han Sans CN;
			font-weight: 400;

			.box-content-title {
				padding: 60rpx 0;
				box-sizing: border-box;
				font-size: 52rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				text-align: center;
				color: #1B1B1B;
			}

			.box-content-list {
				position: relative;
				margin-top: 30rpx;

				.box-content-list-msg {
					position: absolute;
					bottom: -60rpx;
					right: 0rpx;
					color: #333;
					font-size: 28rpx;
				}

				.box-content-list-li {
					position: relative;
					display: flex;
					justify-content: space-between;
					padding: 28rpx 0;
					border-bottom: 1rpx solid #ededed;

					input {
						font-size: 32rpx;
					}


				}
			}

			.box-content-btn {
				width: 630rpx;
				height: 88rpx;
				margin-top: 118rpx;
				background: #CEEBFF;
				box-shadow: 0rpx 10rpx 20rpx rgba(93, 189, 254, 0.15);
				border-radius: 15rpx;
				color: #fff;
				font-size: 32rpx;
				transition: 0.3s;
			}

			.btn-active {
				background: #5DBDFE;
			}

			.box-content-text {
				text-align: center;
				font-size: 24rpx;
				padding: 40rpx 0;
				box-sizing: border-box;
				color: #999;

				text {
					color: #5DBDFE;
				}
			}

		}

		.box-footer {}
	}
</style>
