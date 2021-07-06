<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="type=='add'?lan.AddBank:lan.EditBankCard"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li" @click="isBank = true">
					<view class="box-content-list-li-title">{{lan.BankTypez}}<!-- 银行卡类型 --></view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">
							{{bankName==''?lan.selectBankZ:bankName}}
						</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">{{lan.BankName}}<!-- 银行名称 --></view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input v-model.trim="from.bank_name" type="text" :placeholder="lan.enterBankName" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">{{lan.BankCardNumbers}}<!-- 银行卡号 --></view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.bank_card_no" :placeholder="lan.enterCardNumber" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">{{lan.CardholderNames}}<!-- 持卡人姓名 --></view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.name" :placeholder="lan.enterCardholdersName" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">{{lan.identityNumber}}<!-- 身份证号 --></view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.member_no" :placeholder="lan.IDnumbersa" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">{{lan.reservedPhone}}<!-- 银行预留手机号 --></view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-code flex-center" style="margin-right: 20rpx;"
							@click="isAreaCode=true">
							<text>+{{from.mobile_code}}</text>
							<text class="iconfont iconxiangxiajiantou"
								:style="{transform: isAreaCode?'rotate(180deg)':'rotate(0deg)'}"
								style="transition: 0.3s;font-size: 24rpx;"></text>
						</view>
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.mobile" :placeholder="lan.enterReserved" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">{{lan.AccountBank}}<!-- 开户行 --></view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.open_address" :placeholder="lan.openingBank" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">{{lan.statusa}}<!-- 状态 --></view>
					<view class="box-content-list-li-info">
						<switch :checked='isState' @change="switch1Change" style="transform: scale(0.7);" />
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="box-footer-btn flex-center" @click="btnChange">{{type=='add'?lan.SureAdd:lan.confirmChangesb}}</view>
		</view>
		<popup-list-select  :skid='cardId' @cancel="bankCancel" @confirm="bankConfirm" :visible='isBank'
			:dataList="bankList" />
		<popup-list-select :skid='from.mobile_code_id' @cancel="areaCancel" @confirm="areaConfirm" :visible='isAreaCode'
			:dataList="areaCodeList" />
	</view>
</template>

<script>
	import {
		bankList,
		areaCodeList
	} from '../../static/js/publicFile.js'

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				isState: false,
				cardId: '',
				bankList: [],
				bankName: '',
				isBank: false,
				type: 'add',
				from: {
					bank_name: '', //银行名称
					bank: 3, //支付类型(1支付宝2微信支付3银联支付)
					bank_card_no: '', //银行卡号
					type: '', //银行卡类型
					name: '', //持卡人姓名
					member_no: '', //身份证号
					mobile_code: '86', //区号
					mobile_code_id: '', //区号id
					mobile: '', //银行预留手机号
					open_address: '', //开户地
					status: '', //状态
				},
				id: '',
				areaCodeList: [],
				isAreaCode: false,
				lan:{},
			};
		},

		onLoad(options) {
			this.areaCodeList = areaCodeList
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
			this.bankList = bankList
			let data = JSON.parse(options.data)
			if (data.type == 'edit') {
				this.type = data.type
				this.id = data.item.id

				this.cardId = data.item.type
				this.from.type = data.item.type
				this.from.bank_name = data.item.bank_name
				this.from.name = data.item.name
				this.from.bank_card_no = data.item.bank_card_no
				this.from.member_no = data.item.member_no
				this.from.mobile = data.item.mobile
				this.from.open_address = data.item.open_address
				this.isState = data.item.status == 1 ? true : false

				this.bankList.forEach(item => {
					if (item.id == data.item.type) {
						this.bankName = item.name
					}
				})

			}
			this.getLanguage()

		},
		methods: {

			// 区号取消按钮
			areaCancel(e) {
				this.isAreaCode = e
			},
			// 区号确定按钮
			areaConfirm(e) {
				this.from.mobile_code = e.name
			},

			bankCancel(e) {
				this.isBank = e
			},
			bankConfirm(e) {
				this.from.type = e.id
				this.bankName = e.name
			},
			// 状态
			switch1Change(e) {
				this.isState = e.target.value
			},

			// 按钮
			btnChange() {
				let vuedata = {
					bank: 3, //支付类型(1支付宝2微信支付3银联支付)
					type: this.from.type, //银行卡类型
					name: this.from.name, //持卡人姓名
					bank_name: this.from.bank_name, //银行名称
					bank_card_no: this.from.bank_card_no, //银行卡号
					member_no: this.from.member_no, //身份证号
					mobile: this.from.mobile, //银行预留手机号
					open_address: this.from.open_address, //开户地
					status: this.isState ? 1 : -1, //状态
				}
				if (this.from.type == '') {
					uni.showToast({
						title: this.lan.selectBankZ,//'请选择银行卡类型',
						icon: 'none'
					})
					return false
				}
				if (this.from.bank_name == '') {
					uni.showToast({
						title: this.lan.enterBankName,//'请输入银行名称',
						icon: 'none'
					})
					return false
				}
				if (this.from.bank_card_no == '') {
					uni.showToast({
						title: this.lan.enterCardNumber,//'请输入银行卡号',
						icon: 'none'
					})
					return false
				}
				if (this.from.name == '') {
					uni.showToast({
						title: this.lan.enterCardholdersName,//'请输入持卡人姓名',
						icon: 'none'
					})
					return false
				}
				if (this.from.member_no == '') {
					uni.showToast({
						title: this.lan.IDnumbersa,//'请输入身份证号',
						icon: 'none'
					})
					return false
				}
				if (this.from.mobile == '') {
					uni.showToast({
						title: this.lan.enterReserved,//'请输入银行预留手机号',
						icon: 'none'
					})
					return false
				}
				if (this.from.open_address == '') {
					uni.showToast({
						title: this.lan.openingBank,//'请输入开户行',
						icon: 'none'
					})
					return false
				}

				if (this.type == 'add') {
					this.addChange(vuedata)
				} else {
					this.editChange(vuedata)
				}
			},

			// 添加
			addChange(vuedata) {
				this.apipost('api/v1/engineer/info/bankadd', vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddBank', true)
						uni.showToast({
							title: this.lan.BankAddSuccessfully,//'银行卡添加成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					}
				});
			},
			// 编辑
			editChange(vuedata) {
				this.apiput('api/v1/engineer/info/bankedit/' + this.id, vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddBank', true)
						uni.showToast({
							title: this.lan.SuccessModified,//'银行卡信息修改成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					}
				});
			},
			// 请求语言包
			getLanguage() {
				this.apiget('language/info', {
					name: 'BankCardManagement'
				}).then(res => {
					if (res.status == 200) {
						let language = res.data.language
						this.lan = res.data.language
						
						
					}
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
		background: #f7f7f7;

		.box-head {
			background-color: #fff;
		}

		.box-content {
			padding-top: 20rpx;
			flex: 1;
			overflow-y: scroll;
			box-sizing: border-box;

			.box-content-list {
				height: 100%;
				padding-left: 40rpx;
				box-sizing: border-box;
				background: #fff;

				// .box-content-list-li:last-child {
				// 	border-bottom: 0;
				// }

				.box-content-list-li {
					display: flex;
					align-items: center;
					min-height: 100rpx;
					padding: 20rpx 40rpx 20rpx 0;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ededed;

					.box-content-list-li-title {
						width: 140rpx;
						font-size: 28rpx;
						color: #333;
					}

					.box-content-list-li-info {
						margin-left: 40rpx;
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
							flex: 1;
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

						.box-content-list-li-info-code {
							display: flex;
							align-items: center;
							width: 120rpx;
							height: 45rpx;
							border: 1rpx solid #ededed;
							border-radius: 30rpx;
							font-size: 28rpx;
						}
					}
				}


			}

		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;

			.box-footer-btn {
				height: 88rpx;
				background: #26BF82;
				box-shadow: 0rpx 10rpx 20rpx rgba(38, 191, 130, 0.2);
				border-radius: 15rpx;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
</style>
