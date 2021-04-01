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
			<view class="box-content-title">{{title}}</view>
			<view class="box-content-list">
				<view class="box-content-list-li">
					<input type="number" @input="accountChange" :focus="isFocus" v-model.trim="accountNumber"
						placeholder="手机号/邮箱" confirm-type="done" />
				</view>
				<view class="box-content-list-li">
					<input type="number" @input="passwordChange" :password="!isShowPassword" v-model.trim="password"
						placeholder="请输入密码" confirm-type="done" />
					<text class="iconfont iconxianshimima icon-font" style="color: #ccc;" @click="showPass"
						v-if="!isShowPassword"></text>
					<text class="iconfont iconyincangmima icon-font" style="color: #ccc;" @click="showPass"
						v-if="isShowPassword"></text>
				</view>
				<view class="box-content-list-li" style="padding:20rpx 0;">
					<input type="number" @input="verificationCode" v-model.trim="codeVal" placeholder="请输入右侧验证码"
						confirm-type="done" />
					<view class="code-box" @click="getCode">
						<image :src="codeImage" mode="aspectFill"></image>
					</view>
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
				code: '', //用于验证码比较
				codeId: '', //验证码id
				codeImage: '', //验证码图片
				codeVal: '', // 验证码
				isShowPassword: false, //是否显示密码
				isFocus: true, //自动获取焦点
				title: '商家登录'
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

		onLoad(options) {
			this.isType = options.type == 'technician' ? 0 : 1
			if (options.type == 'technician') {
				this.title = "技师登录"
			} else if (options.type == 'business') {
				this.title = "商家登录"
			}
			this.getCode()
		},

		methods: {
			// 监听输入账号
			accountChange() {
				if (this.accountNumber != '' && this.password != '' && this.codeVal != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},

			//监听输入密码
			passwordChange() {
				if (this.accountNumber != '' && this.password != '' && this.codeVal != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},

			// 验证码款
			verificationCode() {
				if (this.accountNumber != '' && this.password != '' && this.codeVal != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},

			// 确认登录
			confirmLogin() {
				var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
				this.isFocus = false
				if (!this.isAll) {
					uni.showToast({
						title: "请检查输入是否完整",
						icon: "none"
					})
				} else {
					if (!reg.test(this.accountNumber)) { // 判断手机号是否正确
						uni.showToast({
							title: "请输入正确的手机号",
							icon: "none"
						})
						this.$nextTick(function() {
							this.isFocus = true
						});
					} else {
						if (this.codeVal == this.code) { //判断输入的验证码是否一致
							if (this.isType == 0) {
								this.technicianLogin(); //登录
							} else {
								this.businessLogin()
							}

						} else {
							uni.showToast({
								title: "验证码错误，请重新输入",
								icon: "none"
							})
						}
						// uni.navigateTo({
						// 	url: "../../pagesIndexTwo/binDingPhone/binDingPhone"
						// })
					}

				}

			},
			// 技师登录
			technicianLogin() {
				var vuedata = {
					code: this.codeVal,
					code_id: this.codeId,
					username: this.accountNumber,
					password: this.password,
				}
				console.log(vuedata)
				this.apipost('engineerlogin', vuedata).then(res => {
					console.log(res.data.member)
					if (res.status == 200) {
						uni.setStorageSync('UToken', res.data.member.token);
						uni.showToast({
							title: "登录成功",
							icon: 'none'
						})

						setTimeout(function() {
							uni.reLaunch({
								url: "../technicianHome/technicianHome"
							})
						}, 1000)

					} else {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				});
			},

			// 商家登录
			businessLogin() {
				var vuedata = {
					code: this.codeVal,
					code_id: this.codeId,
					username: this.accountNumber,
					password: this.password,
				}
				console.log(vuedata)
				this.apipost('storelogin', vuedata).then(res => {
					if (res.status == 200) {
						uni.setStorageSync('UToken', res.data.member.token);

						uni.showToast({
							title: "登录成功",
							icon: 'none'
						})

						setTimeout(function() {
							uni.reLaunch({
								url: "../merchantHome/merchantHome"
							})
						}, 1000)

					} else {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
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
				uni.reLaunch({
					url: "../signUp/signUp"
				})
				// uni.navigateBack({
				// 	delta: 1
				// })
			},


			// 获取验证码
			getCode() {
				var data = {}
				this.apiget('code/index', data).then(res => {
					if (res.status == 200) {
						this.code = res.data.code
						this.codeId = res.data.code_id
						this.codeImage = res.data.codeimg
					}
				});
			},

			// 点击显示 隐藏密码
			showPass() {
				this.isShowPassword = !this.isShowPassword
			},

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
					display: flex;
					align-items: center;

					input {
						height: 100%;
						margin-right: 20rpx;
						flex: 1;
						font-size: 32rpx;
					}

					.code-box {
						display: flex;
						width: 200rpx;
						height: 80rpx;

						image {
							width: 100%;
							height: 100%;
						}
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
