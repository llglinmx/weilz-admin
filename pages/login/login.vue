<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-nav-back" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #333;font-size: 36rpx;"></text>
					<!-- <image src="../../static/images/back.png" mode="aspectFill"></image> -->
				</view>
				<!-- <view class="box-head-nav-text" @click="register">注册</view> -->
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-title">{{title}}</view>
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-area-code" @click="isState = true">
						<text>+{{stateName}}</text>
						<text :class="isState?'icon-font-active':''" class="iconfont icon-font iconxiangxiajiantou"
							style="font-size: 32rpx;margin-left: 10rpx;"></text>
					</view>
					<view class="box-content-list-li-input">
						<input type="number" @input="accountChange" :focus="isFocus" v-model.trim="accountNumber"
							placeholder="请输入账号" confirm-type="done" />
					</view>

				</view>
				<view class="box-content-list-li" style="padding:20rpx 0;">
					<input type="number" @input="verificationCode" v-model.trim="SMSCodeVal" placeholder="请输入验证码"
						confirm-type="done" />
					<view class="code-box" hover-class="hover-class">
						<text v-if="!codeShow" @click="showCodePopup">发送验证码</text>
						<text v-if="codeShow">{{count}}s</text>
					</view>
				</view>
			</view>
			<view class="box-content-btn box-content-btn-blue flex-center" @click="confirmLogin"
				:class="isAll?'btn-active':''" v-if="this.isType==1">同意协议并登录</view>
			<view class="box-content-btn box-content-btn-green flex-center" @click="confirmLogin"
				:class="isAll?'btn-active-green':''" v-if="this.isType==0">同意协议并登录</view>
			<view class="box-content-text">
				登录代表你已同意
				<text>《用户协议》</text>
				<text>《隐私保护政策》</text>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<view class="popup-box-code">
				<view class="popup-box-code-header">
					<text class="iconfont iconcuowu" style="font-size: 48rpx;" @click="closePopup"></text>
				</view>
				<view class="popup-box-code-center">
					<view class="popup-box-code-center-input">
						<input type="number" :focus="showPopupBottom" v-model.trim="codeVal" placeholder="请输入右侧验证码"
							confirm-type="done" />
					</view>
					<view class="popup-box-code-center-image">
						<image :src="codeImage" mode="aspectFill" @click="getCode"></image>
					</view>
				</view>
				<view class="popup-box-code-footer flex-center" @click="sendCodeVal">发送验证码</view>
			</view>
		</uni-popup>
		<popup-list-select @cancel="statePopup" @confirm="stateConfirm" :visible='isState' :dataList="areaCodeList" />
	</view>
</template>

<script>
	import {
		areaCodeList
	} from '../../static/js/publicFile.js'

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
				title: '商家登录',
				stateName: 86,
				isState: false,
				areaCodeList: [],
				SMSCodeVal: '',
				codeShow: false,
				count: '',
				showPopupBottom: false, //自动获取焦点
				sms_code_id: '12345',
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
			this.areaCodeList = areaCodeList

			if (options.type == 'technician') {
				this.title = "技师登录"
			} else if (options.type == 'business') {
				this.title = "商家登录"
			} else {
				// // 判断之前登录的为技师还是商家  便于下次进入直接进入对应得界面 如果loginType为空就表示没有登录过 则跳转到选择登录类型界面
				var loginType = uni.getStorageSync("isLoginType")
				var path = uni.getStorageSync("path")

				if (loginType != '') {
					this.title = loginType == 'technician' ? "技师登录" : "商家登录"
					uni.reLaunch({
						url: path
					})
				} else {
					uni.reLaunch({
						url: '../signUp/signUp'
					})
					return false;
				}
			}
			this.getCode() //获取验证码
		},

		methods: {

			// 区号关闭弹窗
			statePopup(e) {
				this.isState = e
			},
			// 区号弹窗选择确认
			stateConfirm(e) {
				this.stateName = e.name
			},


			// 监听输入账号
			accountChange() {
				if (this.accountNumber != '' && this.SMSCodeVal != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},

			// 验证码
			verificationCode() {
				if (this.accountNumber != '' && this.SMSCodeVal != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},

			// 发送验证码
			sendCodeVal() {
				var vuedata = {
					areaCode: this.stateName, //区号
					member_mobile: this.accountNumber, //账号
					code: this.codeVal,
					code_id: this.codeId,
				}
				if (this.code == this.codeVal) {
					//获取短信验证码
					this.apipost('login/sendsms', vuedata).then(res => {
						if (res.status == 200) {
							uni.showToast({
								title: "验证码发送成功",
								icon: "none"
							})
							this.sms_code_id = res.data.sms_code_id
							this.$refs.popup.close()
							const TIME_COUNT = 60;
							if (!this.timer) {
								this.count = TIME_COUNT;
								this.codeShow = true;
								this.timer = setInterval(() => {
									if (this.count > 0 && this.count <= TIME_COUNT) {
										this.count--;
									} else {
										this.codeShow = false;
										clearInterval(this.timer);
										this.timer = null;
									}
								}, 1000);
							}
						}
					});
					return false
				}
				uni.showToast({
					title: "验证码输入错误，请重新输入",
					icon: "none"
				})

			},


			// 确认登录
			confirmLogin() {
				this.isFocus = false
				if (!this.isAll) {
					uni.showToast({
						title: "请检查输入是否完整",
						icon: "none"
					})
				} else {
					if (this.isType == 0) {
						this.technicianLogin(); //技师登录
					} else {
						this.businessLogin() //商家登录
					}
				}

			},


			// 技师登录
			technicianLogin() {
				var vuedata = {
					areaCode: this.stateName, //区号
					username: this.accountNumber,
					sms_code: this.SMSCodeVal,
					sms_code_id: this.sms_code_id,
				}
				this.apipost('engineerlogin/mobile', vuedata).then(res => {
					if (res.status == 200) {
						uni.setStorageSync('UToken', res.data.member.token);
						uni.setStorageSync('isLoginType', 'technician');
						uni.setStorageSync('path', '../technicianHome/technicianHome');

						uni.showToast({
							title: "登录成功",
							icon: 'none'
						})
						uni.reLaunch({
							url: "../technicianHome/technicianHome"
						})

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
					areaCode: this.stateName, //区号
					username: this.accountNumber,
					sms_code: this.SMSCodeVal,
					sms_code_id: this.sms_code_id,
				}
				this.apipost('storelogin/mobile', vuedata).then(res => {
					if (res.status == 200) {
						uni.setStorageSync('UToken', res.data.member.token);
						uni.setStorageSync('isLoginType', 'business');
						uni.setStorageSync('path', '../merchantHome/merchantHome');

						uni.showToast({
							title: "登录成功",
							icon: 'none'
						})

						uni.reLaunch({
							url: "../merchantHome/merchantHome"
						})

					} else {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				});
			},

			// 显示输入验证按弹出层
			showCodePopup() {
				//获取短信验证码
				var Reg = /^[1][34578][0-9]{9}$/;
				if (this.accountNumber != '') {
					// 正则验证
					if (Reg.test(this.accountNumber)) {
						this.$refs.popup.open()
						this.showPopupBottom = true
						return false
					}
					uni.showToast({
						title: "手机号格式错误，请重新输入",
						icon: "none"
					})
					return false;
				}
				uni.showToast({
					title: '请输入账号',
					icon: "none"
				})

			},

			// 关闭弹出层
			closePopup() {
				this.$refs.popup.close()
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
			background: #fff;

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

					.box-content-list-li-area-code {
						padding: 10rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						justify-content: center;
						// width: 100rpx;
						font-size: 32rpx;
						line-height: 30rpx;

						.icon-font {
							transition: 0.3s;
						}

						.icon-font-active {
							transform: rotate(180deg);
						}
					}

					.box-content-list-li-input {
						height: 100%;
						margin-left: 20rpx;
						flex: 1;

						input {
							width: 100%;
							height: 100%;
							font-size: 32rpx;
						}
					}


					.code-box {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 200rpx;
						height: 80rpx;
						border: 1rpx solid #EEEEEE;
						font-size: 28rpx;
						color: #666;
						border-radius: 10rpx;
					}

					.hover-class {
						background: #eee;
					}
				}
			}

			.box-content-btn {
				width: 630rpx;
				height: 88rpx;
				margin-top: 118rpx;
				box-shadow: 0rpx 10rpx 20rpx rgba(93, 189, 254, 0.15);
				border-radius: 15rpx;
				color: #fff;
				font-size: 32rpx;
				transition: 0.3s;
			}

			.box-content-btn-blue {
				background: #CEEBFF;
			}

			.box-content-btn-green {
				background: #72eaba;
			}

			.btn-active {
				background: #5DBDFE;
			}

			.btn-active-green {
				background: #26bf82 !important;
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

		.popup-box-code {
			width: 550rpx;
			height: 320rpx;
			padding: 20rpx 30rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background: #fff;
			border-radius: 10rpx;

			.popup-box-code-header {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				margin-bottom: 20rpx;
			}

			.popup-box-code-center {
				display: flex;

				.popup-box-code-center-input {
					flex: 1;
					background: #F7F7F7;
					padding: 0 20rpx;
					box-sizing: border-box;

					input {
						width: 100%;
						height: 100%;
						font-size: 28rpx;
					}
				}

				.popup-box-code-center-image {
					margin-left: 20rpx;
					width: 180rpx;
					height: 80rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

			}

			.popup-box-code-footer {
				width: 100%;
				height: 80rpx;
				margin-top: 20rpx;
				background: #FF8366;
				font-size: 32rpx;
				color: #fff;
				border-radius: 10rpx;
			}
		}
	}
</style>
