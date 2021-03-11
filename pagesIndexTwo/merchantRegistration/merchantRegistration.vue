<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title navTitle="商家注册"></nav-title>
		</view>
		<view class="box-content">
			<view class="box-content-step">
				<uni-steps :options="options" :active="activeIndex"></uni-steps>
			</view>
			<view class="box-content-main">
				<view class="box-content-list">
					<view class="box-content-list-li">
						<input type="number" @input="emailChange" v-model.trim="email" placeholder="请输入邮箱" confirm-type="done" />
					</view>
					<view class="box-content-list-li box-content-item">
						<view class="box-content-list-li-text">
							<text class="tel-text">+86</text>
							<text class="iconfont icongengduo icon-font" style="color: #333;"></text>
						</view>
						<view class="box-content-list-li-input">
							<input type="number" @input="phoneChange" v-model.trim="phone" placeholder="请输入手机号" confirm-type="done" />
						</view>
					</view>
					<view class="box-content-list-li">
						<input type="number" v-model.trim="code" @input="codeChange" placeholder="请输入验证码" confirm-type="done" />
						<text>发送验证码</text>
					</view>
					<view class="box-content-list-li">
						<input type="text" v-model.trim="password" @input="passwordChange" password="true" placeholder="密码长度8-20位"
						 confirm-type="done" />
						<text class="iconfont iconyincangmima" style="color: #ccc;"></text>
					</view>
					<view class="box-content-list-li">
						<input type="text" v-model.trim="confirmPassword" @input="confirmPassword" password="true" placeholder="再次输入密码"
						 confirm-type="done" />
						<text class="iconfont iconyincangmima" style="color: #ccc;"></text>
					</view>
				</view>
			</view>
			<view class="box-content-btn">
				<view class="box-content-btn-auto flex-center" :class="isAll?'box-content-btn-auto-active':''">下一步</view>
			</view>
		</view>

	</view>
</template>

<script>
	import navTitle from "../../components/nav-title/nav-title.vue"
	import uniSteps from "../../uni_modules/uni-steps/components/uni-steps/uni-steps.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				activeIndex: 1, //当前进度下标
				isAll:false,//是否输入完整
				options: [{
					title: '事件一'
				}, {
					title: '事件二'
				}, {
					title: '事件三'
				}],
				phone: "", //手机号
				password: "", //密码
				confirmPassword: "", //确认密码
				email: "", //邮箱
				code: '', //验证码
			};
		},
		components: {
			navTitle,
			uniSteps
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
			// 监听输入邮箱
			emailChange() {
				if (this.phone != '' && this.password != '' && this.email != '' && this.code != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},
			// 监听输入手机号
			phoneChange() {
				if (this.phone != '' && this.password != '' && this.email != '' && this.code != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},
			// 监听输入验证码
			codeChange() {
				if (this.phone != '' && this.password != '' && this.email != '' && this.code != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},

			//监听输入密码
			passwordChange() {
				if (this.phone != '' && this.password != '' && this.email != '' && this.code != '') {
					this.isAll = true
				} else {
					this.isAll = false
				}
			},
			// 确认密码
			confirmPassword() {},

			// 确认注册
			confirmRegister() {
				console.log(11)
				if (!this.isAll) {
					uni.showToast({
						title: "请检查输入是否完整",
						icon: "none"
					})
				}
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
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-main {
				padding: 0 60rpx;
				box-sizing: border-box;

				.box-content-list {
					margin-top: 30rpx;

					.box-content-item {
						display: flex;

						.box-content-list-li-text {
							width: 120rpx;
							height: 100%;
							display: flex;
							align-items: center;

							.tel-text {
								position: static;
								color: #333;
								font-size: 32rpx;
							}

							.icon-font {
								position: static;
								width: 32rpx;
								height: 32rpx;
								transform: rotate(90deg);
							}


							.icon {
								transform: rotate(90deg);
							}
						}

						.box-content-list-li-input {
							margin-left: 20rpx;
							font-size: 32rpx;
						}
					}

					.box-content-list-li {
						position: relative;
						padding: 28rpx 0;
						position: relative;
						margin-bottom: 30rpx;
						border-bottom: 1rpx solid #ededed;

						input {
							font-size: 32rpx;
						}



						text {
							position: absolute;
							right: 10rpx;
							top: 0rpx;
							bottom: 0;
							margin: auto;
							height: 48rpx;
							color: #333;
							font-size: 32rpx;
						}
					}
				}
			}

			.box-content-btn {
				margin-top: 50rpx;
				padding: 0 60rpx;

				.box-content-btn-auto {
					height: 88rpx;
					background: #CEEBFF;
					box-shadow: 0rpx 10rpx 20rpx rgba(93, 189, 254, 0.2);
					border-radius: 15rpx;
					transition: 0.3s;
					color: #fff;
					font-size: 32rpx;
				}
				.box-content-btn-auto-active{
					background: #5DBDFE;
				}
			}
		}

		.box-footer {}
	}
</style>
