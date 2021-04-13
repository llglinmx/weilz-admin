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
						<text @click="getSmCode" v-if="!isSemsText">发送验证码</text>
						<text v-if="isSemsText">{{countdown}}s 后可重新发送</text>
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
								<input type="text" v-model="from.store_name" placeholder="请输入门店名称" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li" @click="selectRegion">
						<view class="box-content-list-li-title">区域</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-text">{{regionName==''?'请选择区域':regionName}}</view>
							<view class="box-content-list-li-info-more">
								<text class="iconfont icongengduo icon-font"
									style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
							</view>
						</view>
					</view>
					<view class="box-content-list-li" @click="categoryOpen">
						<view class="box-content-list-li-title">分类</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-text">
								{{categoryName==''?'请选择分类':categoryName}}
							</view>
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
							<view class="box-content-list-item-info-icon flex-center" v-if="from.simg==''"
								@click="upIcon('logo')">
								<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
							</view>
							<image v-if="from.simg !=''" class="box-content-list-item-info-image" :src="from.simg"
								mode="aspectFill"></image>
						</view>
					</view>
					<view class="box-content-list-item">
						<view class="box-content-list-item-title">
							<text>门店封面</text>
							<text>(110*80)</text>
						</view>
						<view class="box-content-list-item-info">
							<view class="box-content-list-item-info-icon flex-center" v-if="from.bimg ==''"
								@click="upIcon('cover')">
								<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
							</view>
							<image v-if="from.bimg !=''" class="box-content-list-item-info-image" :src="from.bimg"
								mode="aspectFill"></image>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">门店电话</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" v-model.trim="from.store_phone" placeholder="请输入门店电话" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">营业时间</view>
						<view class="box-content-list-li-info" @click="businessHours">
							<view class="box-content-list-li-info-text">{{from.plan_date==''?'请选择营业时间':from.plan_date}}
							</view>
							<view class="box-content-list-li-info-more">
								<text class="iconfont icongengduo icon-font"
									style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
							</view>
						</view>
					</view>

					<view class="box-content-list-li">
						<view class="box-content-list-li-title">门店地址</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-text">点击定位</view>
							<view class="box-content-list-li-info-more">
								<text class="iconfont icongengduo icon-font"
									style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">姓名</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="text" v-model.trim="from.name" placeholder="请输入名称" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">联系方式</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" v-model="from.mobile" placeholder="请输入手机号码" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">地址</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="text" v-model.trim="from.address" placeholder="请输入地址" />
							</view>
						</view>
					</view>
					<view class="box-content-list-item">
						<view class="box-content-list-item-title">
							<text>上传执照</text>
						</view>
						<view class="box-content-list-item-info">
							<view class="box-content-list-item-info-icon flex-center" v-if="from.license_image ==''"
								@click="upIcon('license')">
								<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
							</view>
							<image v-if="from.license_image !=''" class="box-content-list-item-info-image"
								:src="from.license_image" mode="aspectFill"></image>
						</view>
					</view>
					<view class="box-content-list-item">
						<view class="box-content-list-item-title">
							<text>门店图片</text>
						</view>
						<view class="box-content-list-item-info">
							<view class="box-content-list-item-info-icon flex-center" v-if="from.photo ==''"
								@click="upIcon('photo')">
								<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
							</view>
							<image v-if="from.photo !=''" class="box-content-list-item-info-image" :src="from.photo"
								mode="aspectFill"></image>
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
								<input type="number" v-model.trim="bank.cardNumber" placeholder="请输入银行卡号" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">预留手机</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="number" v-model.trim="bank.mobile" placeholder="请输入银行预留手机号" />
							</view>
						</view>
					</view>
					<view class="box-content-list-li">
						<view class="box-content-list-li-title">开户行</view>
						<view class="box-content-list-li-info">
							<view class="box-content-list-li-info-input">
								<input type="text" v-model.trim="bank.bankOfDeposit" placeholder="请输入银行卡开户行" />
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

		<select-address :visible="visible" @cancel='regionCancel' @confirm='regionConfirm' />
		<popup-list-select @cancel="categoryCancel" @confirm="categoryConfirm" :visible='isCategory'
			:dataList="categoryList">
		</popup-list-select>
		<business-hours @cancel="hoursCancel" @confirm="hoursConfirm" :visible='isShow'></business-hours>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import uniSteps from "../../uni_modules/uni-steps/components/uni-steps/uni-steps.vue"
	import selectAddress from '../../components/select-address/select-address.vue'
	import businessHours from "../../components/business-hours/business-hours.vue"
	import popupListSelect from '../../components/popup-list-select/popup-list-select.vue'
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import UniPopup from "../../components/uni-popup/uni-popup.vue"
	import UniPopupDialog from "../../components/uni-popup/uni-popup-dialog.vue"
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js'
	import uploadImage from "../../js_sdk/oss/uploadOSS.js";
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				isAll: false, //是否输入完整
				activeIndex: 1, //当前进度下标
				content: '确定要退出吗？退出将导致之前填写的信息全部重置',
				options: [{
					title: '注册信息'
				}, {
					title: '门店信息'
				}, {
					title: '银行卡信息'
				}],
				isSemsText: false,
				countdown: '',
				phone: "", //手机号
				password: "", //密码
				confirmPasswordVal: "", //确认密码
				email: "", //邮箱
				code: '', //验证码
				codeId: '',
				smsCode: '',
				smsCodeId: '', //验证码id
				visible: false, //区域
				regionName: '',
				isShow: false, //营业时间弹出层
				isCategory: false, //分类
				categoryName: '',
				categoryList: [],
				
				from: {
					store_name: '', //门店名称
					pid: '', //分类id
					simg: '', //logo
					bimg: '', //封面
					store_phone: '', //门店电话
					plan_date: '', //营业时间
					address: '', //门店地址
					longitude: '', //经度
					latitude: '', //纬度
					name: '', //联系人姓名
					mobile: '', //手机号码
					license_image: '', //执照图片
					photo: '', //门店照片

					country: '',
					province: '',
					city: '',
					district: '',
				},
				bank: {
					bankName: '', //银行名称
					cardNumber: '', //卡号
					mobile: '', //手机号码
					bankOfDeposit: '', //开户行
				}
			};
		},
		components: {
			navTitleBalck,
			uniSteps,
			btnSkyBlue,
			UniPopup,
			UniPopupDialog,
			selectAddress,
			businessHours
		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onLoad() {
			this.getCategory()
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


			// 选择区域
			selectRegion() {
				this.visible = true
			},
			// 选择区域取消按钮
			regionCancel(e) {
				this.visible = e
			},
			// 区域确定按钮
			regionConfirm(e) {
				console.log(e)
				this.from.country = e.country_id
				this.from.province = e.province_id
				this.from.city = e.city_id
				this.from.district = e.area_id

				this.regionName = e.country_name + e.province_name + e.city_name + e.area_name

			},

			// 选择分类点击
			categoryOpen() {
				this.isCategory = true
			},
			// 类别取消按钮
			categoryCancel(e) {
				this.isCategory = e
			},
			// 类别确定按钮
			categoryConfirm(e) {
				this.from.pid = e.id
				this.categoryName = e.name
			},

			// 营业时间
			businessHours() {
				this.isShow = true
			},
			// 营业时间取消按钮
			hoursCancel(e) {
				this.isShow = e
			},
			// 营业时间确定按钮
			hoursConfirm(e) {
				this.from.plan_date = e
				console.log(this.from.plan_date)
			},

			// 门店图标
			upIcon(type) {
				uni.chooseImage({
					count: 1, //默认100
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						pathToBase64(res.tempFilePaths[0]).then((data) => {
							switch (type) {
								case "logo":
									this.from.simg = data

									break;
								case "cover":
									this.from.bimg = data
									break;
								case "license":
									this.from.license_image = data
									break;
								case "photo":
									this.from.photo = data
									break;
							}

							const path = 'avatar/';
							// #ifdef H5
							let file = res.tempFilePaths[0];
							let suffix = res.tempFiles[0].name.split('.').pop();
							// #endif

							// #ifdef APP-PLUS
							let file = res.tempFilePaths[0];
							let suffix = res.tempFiles[0].path.split('.').pop();
							// #endif

							// 获取阿里云oss 信息
							this.apiget('app/oss/url', {}).then(ress => {
								if (ress.status == 200) {
									var obj = {
										accessid: ress.data.accessid,
										policy: ress.data.policy,
										signature: ress.data.signature,
									}
									// 上传图片
									uploadImage(obj, file, path, suffix, result => {
										switch (type) {
											case "logo":
												this.from.simg = result
												break;
											case "cover":
												this.from.bimg = result
												break;
											case "license":
												this.from.license_image = result
												break;
											case "photo":
												this.from.photo = result
												break;
										}
									});
								}
							});
						})
					}
				});
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
							this.merchantRegister1()
						}
						break;
					case "1":
						this.merchantRegister2()
						break;
					case "2":

						break;
				}
			},
			// 商家注册 第一步
			merchantRegister1() {
				var vuedata = {
					email: this.email, //邮箱
					mobile: this.phone, //手机号
					password: this.password, //密码
					confirm_password: this.confirmPasswordVal, //确认密码
					sms_code: this.smsCode, //验证码
					sms_code_id: this.smsCodeId,
				}
				if (this.password == this.confirmPasswordVal) { //判断两次输入的密码是否一样
					this.apipost('storeregister', vuedata).then(res => {
						if (res.status == 200) {
							this.activeIndex = 1
						} else {
							uni.showToast({
								title: res.message,
								icon: "none"
							})
						}
					});
					return false;
				}
				uni.showToast({
					title: "两次密码输入不一致，请重新输入",
					icon: 'none'
				})


			},

			// 商家注册 第二步
			merchantRegister2() {
				var vuedata = {
					store_name: this.from.store_name, //门店名称
					pid: this.from.pid, //分类id
					simg: this.from.simg, //logo
					bimg: this.from.bimg, //封面
					store_phone: this.from.store_phone, //门店电话
					plan_date: this.from.plan_date, //营业时间
					address: this.from.address, //门店地址
					longitude: this.from.longitude, //经度
					latitude: this.from.latitude, //纬度
					name: this.from.name, //联系人姓名
					mobile: this.from.mobile, //手机号码
					license_image: this.from.license_image, //执照图片
					photo: this.from.photo, //门店照片

					country: this.from.country, //国家id
					province: this.from.province, //省份id
					city: this.from.city, //市id
					district: this.from.district, //区县id
				}
				console.log(vuedata)

				this.apipost('api/v1/store/apply', vuedata).then(res => {
					if (res.status == 200) {
						this.activeIndex = 2
					} else {
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				});

			},

			// 商家注册 第三步
			merchantRegister3() {
				var vuedata = {}
			},

			// 获取分类
			getCategory() {
				this.apiget('pc/category/category_type', {
					type: 11
				}).then(res => {
					if (res.status == 200) {
						this.categoryList = res.data
					}
				});
			},

			// 获取验证码
			getCode() {
				var data = {}
				this.apiget('code/index', data).then(res => {
					if (res.status == 200) {
						this.code = res.data.code
						this.codeId = res.data.code_id
					}
				});
			},

			// 获取短信验证码
			getSmCode() {
				var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
				var vuedata = {
					mobile: this.phone,
					code: this.code,
					code_id: this.codeId,
					type: 'register'
				}

				if (this.phone != '') {
					if (reg.test(this.phone)) {
						this.apipost('send_sms', vuedata).then(res => {
							if (res.status == 200) {
								this.smsCodeId = res.data.sms_code_id
								uni.showToast({
									title: "验证码发送成功",
									icon: "none"
								})
								this.countDown();
							} else {
								uni.showToast({
									title: res.message,
									icon: "none"
								})
							}
						});
						return false
					}
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					})
					return false
				}
				uni.showToast({
					title: "请输入手机号",
					icon: "none"
				})

			},
			// 倒计时
			countDown() {
				this.isSemsText = true
				clearInterval(this.setCountdown);
				var num = 60
				this.countdown = num
				this.setCountdown = setInterval(() => {
					num--;
					this.countdown = num < 10 ? '0' + num : num; //小于 10 则前面拼接一个0
					if (num <= 0) {
						clearInterval(this.setCountdown);
						this.isSemsText = true;
					}
				}, 1000);
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
			background: #fff;

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
								border-radius: 10rpx;
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
