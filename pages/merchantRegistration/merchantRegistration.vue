<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-nav-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 4rpx;"></text>
				</view>
				<view class="box-head-nav-title">
					商家注册
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-step">
				<uni-steps :options="options" :active="activeIndex"></uni-steps>
			</view>
			<view class="box-content-main" :class="activeIndex==1?'box-content-main-scorll':''">
				<view class="box-content-wrap" v-if="activeIndex==0">
					<view class="box-content-wrap-li">
						<input type="number" @input="emailChange" v-model.trim="email" placeholder="请输入邮箱"
							confirm-type="done" />
					</view>
					<view class="box-content-wrap-li box-content-item">
						<view class="box-content-wrap-li-text">
							<text class="tel-text">+86</text>
							<text class="iconfont icongengduo icon-font" style="color: #333;"></text>
						</view>
						<view class="box-content-wrap-li-input">
							<input type="number" @input="phoneChange" v-model.trim="phone" placeholder="请输入手机号"
								confirm-type="done" />
						</view>
					</view>
					<view class="box-content-wrap-li">
						<input type="number" v-model.trim="code" @input="codeChange" placeholder="请输入验证码"
							confirm-type="done" />
						<text>发送验证码</text>
					</view>
					<view class="box-content-wrap-li">
						<input type="text" v-model.trim="password" @input="passwordChange" password="true"
							placeholder="密码长度8-20位" confirm-type="done" />
						<text class="iconfont iconyincangmima" style="color: #ccc;margin-left: 10rpx;"></text>
					</view>
					<view class="box-content-wrap-li">
						<input type="text" v-model.trim="confirmPasswordVal" @input="confirmPass" password="true"
							placeholder="再次输入密码" confirm-type="done" />
						<text class="iconfont iconyincangmima" style="color: #ccc;margin-left: 10rpx;"></text>
					</view>
				</view>



				<view class="box-content-list" v-if="activeIndex==1">
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">门店名称</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="text" placeholder="请输入门店名称" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">区域</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-text">请选择区域</view>
							<view class="box-content-list-li-info-more">
								<text class="iconfont icongengduo icon-font"
									style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">分类</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-text">请选择分类</view>
							<view class="box-content-list-li-info-more">
								<text class="iconfont icongengduo icon-font"
									style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
							</view>
						</view>
					</view>
					<view class="box-content-list-item">
						<view class="box-content-list-item-title">
							<text>门店图标</text>
							<text>(100*100)</text>
						</view>
						<view class="box-content-list-item-info">
							<view class="box-content-list-item-info-icon flex-center">
								<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
							</view>
						</view>
					</view>
					<view class="box-content-list-item">
						<view class="box-content-list-item-title">
							<text>门店封面</text>
							<text>(110*80)</text>
						</view>
						<view class="box-content-list-item-info">
							<view class="box-content-list-item-info-icon flex-center">
								<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">门店电话</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" placeholder="请输入门店电话" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">营业时间</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" placeholder="请输入营业时间" />
							</view>
						</view>
					</view>

					<view class="box-content-list-li">
						<view class="box-content-list-li-title">门店地址</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" placeholder="点击定位" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">姓名</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" placeholder="请输入名称" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">联系方式</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" placeholder="请输入手机号码" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">地址</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" placeholder="请输入地址" />
							</view>
						</view>
					</view>
					<view class="box-content-list-item">
						<view class="box-content-list-item-title">
							<text>上传执照</text>
						</view>
						<view class="box-content-list-item-info">
							<view class="box-content-list-item-info-icon flex-center">
								<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
							</view>
						</view>
					</view>
					<view class="box-content-list-item">
						<view class="box-content-list-item-title">
							<text>门店图片</text>
						</view>
						<view class="box-content-list-item-info">
							<view class="box-content-list-item-info-icon flex-center">
								<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
							</view>
						</view>
					</view>
				</view>
				<view class="box-content-list" v-if="activeIndex==2">
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">选择银行</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-text">请选择</view>
							<view class="box-content-list-li-info-more">
								<text class="iconfont icongengduo icon-font"
									style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">银行卡号</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" placeholder="请输入银行卡号" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">预留手机</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" placeholder="请输入银行预留手机号" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">开户行</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="text" placeholder="请输入银行卡开户行" />
							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="box-content-btn">
				<view class="box-content-btn-auto flex-center" :class="isAll?'box-content-btn-auto-active':''"
					v-if="activeIndex==0" @click="nextStep('0')">下一步</view>
				<btn-sky-blue btnName="下一步" @btnClick="nextStep('1')" v-if="activeIndex==1" />
				<btn-sky-blue btnName="完成" @btnClick="nextStep('2')" v-if="activeIndex==2" />
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" mode='base' title="警告" :content="content" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import uniSteps from "../../uni_modules/uni-steps/components/uni-steps/uni-steps.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import UniPopup from "../../components/uni-popup/uni-popup.vue"
	import UniPopupDialog from "../../components/uni-popup/uni-popup-dialog.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				isAll: false, //是否输入完整
				activeIndex: 0, //当前进度下标
				content: '确定要退出吗？退出将导致之前填写的信息全部重置',
				options: [{
					title: '注册信息'
				}, {
					title: '门店信息'
				}, {
					title: '银行卡信息'
				}],
				phone: "", //手机号
				password: "", //密码
				confirmPasswordVal: "", //确认密码
				email: "", //邮箱
				code: '', //验证码
			};
		},
		components: {
			navTitleBalck,
			uniSteps,
			btnSkyBlue,
			UniPopup,
			UniPopupDialog
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
				this.isAll = this.phone != '' && this.password != '' && this.email != '' && this.code != '' && this
					.confirmPasswordVal != '' ? true : false
			},
			// 监听输入手机号
			phoneChange() {
				this.isAll = this.phone != '' && this.password != '' && this.email != '' && this.code != '' && this
					.confirmPasswordVal != '' ? true : false
			},
			// 监听输入验证码
			codeChange() {
				this.isAll = this.phone != '' && this.password != '' && this.email != '' && this.code != '' && this
					.confirmPasswordVal != '' ? true : false
			},

			//监听输入密码
			passwordChange() {
				this.isAll = this.phone != '' && this.password != '' && this.email != '' && this.code != '' && this
					.confirmPasswordVal != '' ? true : false
			},
			// 确认密码
			confirmPass() {
				this.isAll = this.phone != '' && this.password != '' && this.email != '' && this.code != '' && this
					.confirmPasswordVal != '' ? true : false
			},

			//返回
			Gback() {
				if (this.activeIndex == 0) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.$refs.popup.open()
				}
			},
			// 弹窗点击取消
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			// 弹窗点击确认
			confirm(done, value) {
				uni.navigateBack({
					delta: 1
				})
				done()
			},


			// 下一步
			nextStep(idx) {
				switch (idx) {
					case "0":
						if (!this.isAll) {
							uni.showToast({
								title: "请检查输入是否完整",
								icon: "none"
							})
						} else {
							this.activeIndex = 1
						}
						break;
					case "1":
						this.activeIndex = 2
						break;
					case "2":

						break;
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

			.box-head-nav {
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				height: 88rpx;

				.box-head-nav-back {
					display: flex;
					align-items: center;
					width: 50rpx;
				}

				.box-head-nav-title {
					margin-right: 50rpx;
					flex: 1;
					font-size: 34rpx;
					color: #000;
					text-align: center;
				}
			}
		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.box-content-step {
				padding-bottom: 20rpx;
				display: flex;
				align-items: center;
				height: 120rpx;
			}

			.box-content-main-scorll {
				flex: 1;
				overflow-y: scroll;
			}

			.box-content-main {

				padding: 0 60rpx;
				box-sizing: border-box;

				.box-content-wrap {

					.box-content-item {
						display: flex;

						.box-content-wrap-li-text {
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

						.box-content-wrap-li-input {
							margin-left: 20rpx;
							font-size: 32rpx;
						}
					}

					.box-content-wrap-li {
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


				.box-content-list {
					box-sizing: border-box;
					background: #fff;

					// .box-content-list-li:last-child {
					// 	border-bottom: 0;
					// }

					.box-content-list-li {
						display: flex;
						align-items: center;
						height: 100rpx;
						padding-right: 40rpx;
						box-sizing: border-box;
						border-bottom: 1rpx solid #ededed;

						.box-content-list-li-title {
							width: 180rpx;
							font-size: 28rpx;
							color: #333;
						}

						.box-content-list-li-info {
							margin-left: 60rpx;
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.box-content-list-li-info-text {
								font-size: 28rpx;
								color: #000;
							}

							.box-content-list-li-info-more {}

							.box-content-list-li-info-input {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;

								input {
									flex: 1;
									height: 100%;
									font-size: 28rpx;
								}

								text {
									margin-left: 10rpx;
									font-size: 28rpx;
									color: #333;
								}
							}

						}
					}

					.box-content-list-item {
						display: flex;
						align-items: center;
						padding: 30rpx 0;
						border-bottom: 1rpx solid #ededed;

						.box-content-list-item-title {
							display: flex;
							flex-direction: column;
							width: 180rpx;

							text:nth-child(1) {
								font-size: 28rpx;
								color: #333;
							}

							text:nth-child(2) {
								font-size: 24rpx;
								color: #999;
							}
						}

						.box-content-list-item-info {
							margin-left: 60rpx;

							.box-content-list-item-info-icon {
								width: 120rpx;
								height: 120rpx;
								background: #EDEDED;
								border-radius: 10rpx;
							}

							.box-content-list-item-info-image {
								width: 120rpx;
								height: 120rpx;
							}
						}
					}

					.box-content-list-item:last-child {
						border-bottom: 0;
					}

				}
			}

			.box-content-btn {
				padding: 50rpx 60rpx;
				box-sizing: border-box;

				.box-content-btn-auto {
					height: 88rpx;
					background: #CEEBFF;
					box-shadow: 0rpx 10rpx 20rpx rgba(93, 189, 254, 0.2);
					border-radius: 15rpx;
					transition: 0.3s;
					color: #fff;
					font-size: 32rpx;
				}

				.box-content-btn-auto-active {
					background: #5DBDFE;
				}
			}
		}

		.box-footer {}
	}
</style>
