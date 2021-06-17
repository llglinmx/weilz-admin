<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="title"></nav-title-balck>
		</view>
		<view class="box-content">

			<view class="box-content-list">
				<view class="box-content-list-li" @click="storeOpen">
					<view class="box-content-list-li-title">门店</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{storeName==''?'请选择门店':storeName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">优惠券名称</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.name" placeholder="请输入优惠券名称" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">优惠券起用金额</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.least_cost" placeholder="请输入金额" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">优惠券减免金额</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.reduce_cost" placeholder="请输入金额" />
							<text>元</text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">库存</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.quantity" placeholder="请输入优惠券库存" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="codeOpen">
					<view class="box-content-list-li-title">码型</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{codeName==''?'请选择码型':codeName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title" style="width: 120rpx;">使用时间</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-check">
							<view class="box-content-list-li-info-check-box" @click="currency(true)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="isCurr"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>固定日期</text>
							</view>
							<view class="box-content-list-li-info-check-box" @click="currency(false)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="!isCurr"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>固定时长</text>
							</view>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" v-if="!isCurr">
					<view class="box-content-list-li-title" style="width: 120rpx;">有效期</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.fixed_term" placeholder="有效天数(自领取后按天计算)" />
							<text>天</text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" v-if="isCurr" @click="dateStartOpen">
					<view class="box-content-list-li-title">活动开始时间</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{startTime==''?'请设置日期':startTime}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="dateEndOpen" v-if="isCurr">
					<view class="box-content-list-li-title">活动结束时间</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{endTime==''?'请设置日期':endTime}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="accessOpen">
					<view class="box-content-list-li-title">适用分类</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{accessName==''?'请选择分类':accessName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">发放状态</view>
					<view class="box-content-list-li-info">
						<switch :checked="isState" style="transform: scale(0.7);" @change="switch1Change" color="#07C160" />
					</view>
				</view>

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">排序</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.sort" placeholder="请输入排序" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li-item">
					<view class="box-content-list-li-item-title">优惠券使用说明</view>
					<view class="box-content-list-li-item-textarea">
						<textarea value="" v-model.trim="from.description" placeholder="例如：不可与其他优惠同享" />
					</view>
				</view>
			</view>

		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="确认添加" @btnClick="confirmAdd" v-if="type =='add'" />
			<btn-sky-blue btnName="确认修改" @btnClick="confirmEdit" v-if="type =='edit'" />
		</view>
		<popup-list-select :skid='from.store' @cancel="storeCancel" @confirm="storeConfirm" :visible='isStore' :dataList="storeList">
		</popup-list-select>
		
		<popup-list-select :skid='from.code_type' @cancel="codeCancel" @confirm="codeConfirm" :visible='isCode' :dataList="codeList">
		</popup-list-select>
		
		<popup-list-select :skid='from.access' @cancel="accessCancel" @confirm="accessConfirm" :visible='isAccess' :dataList="accessList">
		</popup-list-select>

		<select-date @cancel="dateStartCancel" @confirm="dateStartConfirm" :visible='isStartDate' />
		<select-date @cancel="dateEndCancel" @confirm="dateEndConfirm" :visible='isEndDate' />
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import popupListSelect from '../../components/popup-list-select/popup-list-select.vue'
	import selectDate from '../../components/select-date/select-date.vue'

	export default {
		data() {
			return {
				title: '',
				type: '',
				id: '',
				isStartDate: false,
				isEndDate: false,
				barHeight: 0, //顶部电量导航栏高度
				isCurr: true, //使用时间类型
				isState: false, //发放状态
				isStore: false,
				isAccess: false,
				isCode: false,
				storeList: [],
				codeList: [],
				codeName: '',
				storeName: '',
				startTime: '',
				endTime: '',
				accessName: '',
				from: {
					store: '', //门店id
					name: '', //优惠券名称
					least_cost: '', //优惠券启用金额
					reduce_cost: '', //减免金额
					quantity: '', //库存
					code_type: '', //码型
					date_type: 1, //使用时间类型 1固定日期区间，2固定时长
					begin_time: '', //开始时间
					end_time: '', //结束时间
					fixed_term: '', //固定时长
					access: 1, //分类
					status: this.isState ? 1 : -1, //发放状态
					sort: '', //排序
					description: '', //优惠券说明
				},
				accessList: [{
						name: '通用',
						id: 1
					},
					{
						name: '会员专享',
						id: 2
					},
					{
						name: '评论奖励',
						id: 3
					},
					{
						name: '抽奖奖品',
						id: 4
					},
					{
						name: '礼包',
						id: 5
					},
				]
			};
		},
		components: {
			navTitleBalck,
			btnSkyBlue,
			popupListSelect,
			selectDate,
		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onLoad(options) {
			this.getStore()
			this.getCodeType()

			var data = JSON.parse(options.data)
			if (data.type == 'add') {
				this.title = '新增优惠券'
				this.type = 'add'
			} else if (data.type == 'edit') {
				this.title = '编辑优惠券'
				this.type = 'edit'
				this.id = data.id
				this.getDetails(data.id)
			}

		},
		methods: {

			// 选择门店
			storeOpen() {
				this.isStore = true
			},
			// 门店关闭弹窗
			storeCancel(e) {
				this.isStore = e
			},
			// 门店弹窗选择确认
			storeConfirm(e) {
				this.from.store = e.id
				this.storeName = e.name
			},
			// 选择码型
			codeOpen() {
				this.isCode = true
			},
			// 码型关闭弹窗
			codeCancel(e) {
				this.isCode = e
			},
			// 码型弹窗选择确认
			codeConfirm(e) {
				this.from.code_type = e.id
				this.codeName = e.name
			},

			// 选择开始日期
			dateStartOpen() {
				this.isStartDate = true
			},
			// 开始日期关闭弹窗
			dateStartCancel(e) {
				this.isStartDate = e
			},
			// 选择开始日期弹窗选择确认
			dateStartConfirm(e) {
				console.log(e)
				this.startTime = e.year + '-' + e.month + '-' + e.day+' '+e.hour+':'+e.minute+':'+e.second
			},

			// 选择结束日期
			dateEndOpen() {
				if (this.startTime != '') {
					this.isEndDate = true
					return false;
				}
				uni.showToast({
					title: "请先设置活动开始时间",
					icon: "none"
				})

			},
			// 结束日期关闭弹窗
			dateEndCancel(e) {
				this.isEndDate = e
			},
			// 选择结束日期弹窗选择确认
			dateEndConfirm(e) {
				this.endTime = e.year + '-' + e.month + '-' + e.day+' '+e.hour+':'+e.minute+':'+e.second
			},


			// 选择分类
			accessOpen() {
				this.isAccess = true
			},
			//分类关闭弹窗
			accessCancel(e) {
				this.isAccess = e
			},
			// 分类弹窗选择确认
			accessConfirm(e) {
				this.from.access = e.id
				this.accessName = e.name
			},


			// switch 开关
			switch1Change: function(e) {
				this.isState = e.target.value
			},

			// 使用时间类型单选点击
			currency(bool) {
				this.startTime = ''
				this.endTime = ''
				this.from.fixed_term = ''
				this.isCurr = bool ? true : false
				this.from.date_type = this.isCurr ? 1 : 2
			},



			// 确认提交按钮
			confirmAdd() {
				var vuedata = {
					store: this.from.store, //门店id
					name: this.from.name, //优惠券名称
					least_cost: this.from.least_cost, //优惠券启用金额
					reduce_cost: this.from.reduce_cost, //减免金额
					quantity: this.from.quantity, //库存
					code_type: this.from.code_type, //码型
					date_type: this.isCurr ? 1 : 2, //使用时间类型 1固定日期区间，2固定时长
					begin_time: this.startTime, //开始时间
					end_time: this.endTime, //结束时间
					fixed_term: this.from.fixed_term, //固定时长
					access: this.from.access, //分类
					status: this.isState ? 1 : -1, //发放状态
					sort: this.from.sort, //排序
					description: this.from.description, //优惠券说明
				}
				console.log(vuedata)
				// return false;
				this.apipost('api/v1/store/coupon/add', vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddCoupon', true)
						uni.showToast({
							title: "优惠券添加成功",
							icon: 'none'
						})
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					} else if (res.status == 400) {
						uni.showToast({
							title: res.massage,
							icon: 'none'
						})
					}
				})
			},

			// 确认修改
			confirmEdit() {
				var vuedata = {
					store: this.from.store, //门店id
					name: this.from.name, //优惠券名称
					least_cost: this.from.least_cost, //优惠券启用金额
					reduce_cost: this.from.reduce_cost, //减免金额
					quantity: this.from.quantity, //库存
					code_type: this.from.code_type, //码型
					date_type: this.isCurr ? 1 : 2, //使用时间类型 1固定日期区间，2固定时长
					begin_time: this.startTime, //开始时间
					end_time: this.endTime, //结束时间
					fixed_term: this.from.fixed_term, //固定时长
					access: this.from.access, //分类
					status: this.isState ? 1 : -1, //发放状态
					sort: this.from.sort, //排序
					description: this.from.description, //优惠券说明
				}
				this.apiput('api/v1/store/coupon/edit/' + this.id, vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddCoupon', true)
						uni.showToast({
							title: "优惠券修改成功",
							icon: 'none'
						})
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					} else if (res.status == 400) {
						uni.showToast({
							title: res.massage,
							icon: 'none'
						})
					}
				})
			},

			getDetails(id) {
				this.apiget('api/v1/store/coupon/index/' + id, {}).then(res => {
					if (res.status == 200) {
						var data = res.data

						this.from.store = data.store
						this.from.name = data.name
						this.from.least_cost = data.least_cost
						this.from.reduce_cost = data.reduce_cost
						this.from.quantity = data.quantity
						this.from.code_type = data.code_type
						this.from.date_type = data.date_type
						this.startTime = data.begin_time
						this.endTime = data.end_time
						this.from.fixed_term = data.fixed_term
						this.from.access = data.access
						this.from.status = data.status
						this.from.sort = data.sort
						this.from.description = data.description
						this.storeList.forEach(item => {
							if (item.id == data.store) {
								this.storeName = item.name
							}
						})

						this.codeList.forEach(item => {
							if (item.id == data.code_type) {
								this.codeName = item.name
							}
						})

						this.isCurr = data.date_type == 1 ? true : false

						this.accessList.forEach(item => {
							if (item.id == data.access) {
								this.accessName = item.name
							}
						})
						this.isState = data.status == 1 ? true : false
					}
				});
			},

			// 获取门店列表
			getStore() {
				this.apiget('api/v1/store/store_information', {}).then(res => {
					if (res.status == 200) {
						this.storeList = res.data.member
						this.from.store = res.data.member[0].id
					}
				});
			},
			// 获取码型
			getCodeType() {
				this.apiget('api/v1/store/coupon/card_list', {}).then(res => {
					if (res.status == 200) {
						this.codeList = res.data
						this.from.date_type = res.data[0].id
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
		background: #F7F7F7;

		.box-head {
			background-color: #fff;
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-list {
				margin-top: 20rpx;
				padding-left: 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-list-li:last-child {
					border-bottom: 0;
				}

				.box-content-list-li {
					display: flex;
					align-items: center;
					height: 100rpx;
					padding-right: 40rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ededed;

					.box-content-list-li-title {
						width: 200rpx;
						font-size: 28rpx;
						color: #333;
					}

					.box-content-list-li-info {
						margin-left: 80rpx;
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

						.box-content-list-li-info-check {
							display: flex;
							align-items: center;

							.box-content-list-li-info-check-box:first-child {
								margin-left: 0;
							}

							.box-content-list-li-info-check-box {
								margin-left: 40rpx;
								display: flex;
								align-items: center;
								color: #000;
								font-size: 28rpx;

								.icon-font {
									margin-right: 20rpx;
								}

								text {}
							}
						}
					}
				}

				.box-content-list-li-item {
					padding-bottom: 40rpx;
					padding-right: 40rpx;
					box-sizing: border-box;

					.box-content-list-li-item-title {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #333;
						height: 94rpx;
					}

					.box-content-list-li-item-textarea {
						height: 156rpx;
						border: 1rpx dashed #E0E0E0;
						padding: 20rpx;
						box-sizing: border-box;

						textarea {
							width: 100%;
							height: 100%;
							font-size: 28rpx;
						}
					}
				}
			}
		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
		}
	}
</style>
