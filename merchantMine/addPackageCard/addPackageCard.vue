<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="添加套餐卡"></nav-title-balck>
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
				<view class="box-content-list-li" @click="storeCategoryOpen">
					<view class="box-content-list-li-title">门店分类</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">
							{{storeCategoryName==''?'请选择门店分类':storeCategoryName}}
						</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">套餐卡名称</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.name" placeholder="请输入套餐卡名称" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="planformOpen">
					<view class="box-content-list-li-title">平台分类</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{platformName==''?'请选择平台分类':platformName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
			</view>

			<view class="box-content-main">
				<view class="box-content-main-top">
					<view>添加图片<text style="font-size: 24rpx;color: #999;margin-left: 10rpx;">(990*556)</text></view>
				</view>
				<view class="box-content-main-image-list">
					<view class="box-content-main-image-list-li" :class="index==0?'list-li-affter':''"
						v-for="(item,index) in imageList" :key="index">
						<image :src="item" mode="aspectFill"></image>
						<text class="close flex-center" @click="delImage">
							<text class="iconfont iconcuowu icon-font" style="color: #fff;font-size: 36rpx"></text>
						</text>
					</view>
					<view class="box-content-main-image-list-up flex-center" @click="upCoverPhoto"
						v-if="imageList.length<3">
						<text class="iconfont iconcuowu icon-font" style="color: #ddd;font-size: 90rpx"></text>
					</view>
				</view>
			</view>
			<view class="box-content-main">
				<view class="box-content-main-top" :style="{borderBottom:dataList.length!=0?'1rpx solid #ededed':0}">
					<view class="box-content-main-top-title">套餐项目</view>
					<view class="box-content-main-top-add flex-center" @click="packageCardOpen">
						<text class="iconfont iconcuowu icon-font" style="color: #ccc;font-size: 36rpx"></text>
					</view>
				</view>
				<view class="box-content-main-list"
					:style="{height:dataList.length!=0?'auto':0,paddingBottom:dataList.length!=0?'30rpx':0}">
					<view class="box-content-main-list-li" v-for="(item,index) in dataList" :key="item.id">
						<view class="box-content-main-list-li-image">
							<image :src="item.simg" mode="aspectFill"></image>
						</view>
						<view class="box-content-main-list-li-info">
							<view class="box-content-main-list-li-info-text">
								<view class="list-li-info-text-title">{{item.name}}</view>
								<view class="list-li-info-text-price">￥{{item.price}}</view>
							</view>
							<view class="box-content-main-list-li-info-bottom">
								<view class="list-li-info-bottom-stepper">
									<view class="list-li-info-bottom-stepper-reduce flex-center"
										@click="stepper(index,'reduce')">
										<text class="iconfont iconjian icon-font"
											:style="{color:item.num>1?'#666':'#ccc'}"></text>
									</view>
									<view class="list-li-info-bottom-stepper-num flex-center">{{item.num}}</view>
									<view class="list-li-info-bottom-stepper-add flex-center"
										@click="stepper(index,'add')">
										<text class="iconfont iconjia icon-font" style="color:#666"></text>
									</view>
								</view>
								<view class="list-li-info-bottom-delete" @click="deleteClick(index)">
									<text class="iconfont iconshanchu-shangjia icon-font"
										style="color: #ccc;font-size: 52rpx;"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">价格</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.price" placeholder="请输入价格" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">库存</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" maxlength="10000" v-model.trim="from.quantity"
								placeholder="最高为10000" />
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
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">状态</view>
					<view class="box-content-list-li-info">
						<switch :checked="isState" @change="switch1Change" color="#07C160" />
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
					<view class="box-content-list-li-item-title">套餐卡使用说明</view>
					<view class="box-content-list-li-item-textarea">
						<textarea value="" placeholder="请输入使用说明" />
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="确认添加" @btnClick="confirmAdd" v-if="type =='add'" />
			<btn-sky-blue btnName="确认修改" @btnClick="confirmEdit" v-if="type =='edit'" />
		</view>
		<popup-list-select @cancel="storeCancel" @confirm="storeConfirm" :visible='isStore' :dataList="storeList">
		</popup-list-select>

		<popup-list-select @cancel="storeCategoryCancel" @confirm="storeCategoryConfirm" :visible='isStoreCategory'
			:dataList="storeCategoryList">
		</popup-list-select>
		<popup-list-select @cancel="planformCancel" @confirm="planformConfirm" :visible='isPlanform'
			:dataList="planformList">
		</popup-list-select>

		<select-date @cancel="dateStartCancel" @confirm="dateStartConfirm" :visible='isStartDate' />
		<select-date @cancel="dateEndCancel" @confirm="dateEndConfirm" :visible='isEndDate' />

		<select-list-popup @cancel="packageCardCancel" :dataList="list" @confirm="packageCardConfirm"
			:visible='isPackageCard' />
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import popupListSelect from '../../components/popup-list-select/popup-list-select.vue'
	import selectDate from '../../components/select-date/select-date.vue'
	import selectListPopup from '../../components/select-list-popup/select-list-popup.vue'
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js'
	import uploadImage from "../../js_sdk/oss/uploadOSS.js";
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				isCurr: true, //是否通用
				isState: false, //发放状态
				type: '',
				id: '',
				list: [],
				dataList: [],
				imageList: [],
				storeList: [],
				storeName: '',
				isStore: false,
				isStoreCategory: false,
				storeCategoryList: [],
				storeCategoryName: '',
				isPlanform: false,
				planformList: [],
				platformName: '',
				startTime: '',
				endTime: '',
				isStartDate: false,
				isEndDate: false,
				from: {
					store: '', //门店id
					store_cid: '', //门店分类
					name: '', //套餐卡名称
					cid: '', //平台分类
					simg: '', //封面图
					bimg: '', //轮播图
					service: '', //项目
					price: '', //价格
					quantity: '', //库存
					date_type: 1, //使用时间类型 1固定日期区间，2固定时长
					begin_time: '', //开始时间
					end_time: '', //结束时间
					fixed_term: '', //固定时长
					status: this.isState ? 1 : -1, //发放状态
					sort: '', //排序
					description: '', //优惠券说明
				},
				isPackageCard: false
			};
		},
		components: {
			navTitleBalck,
			btnSkyBlue,
			popupListSelect,
			selectDate,
			selectListPopup
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
			this.getStoreCategory()
			this.getPlatform()

			this.getDataList()

			var data = JSON.parse(options.data)
			if (data.type == 'add') {
				this.type = 'add'
			} else if (data.type == 'edit') {
				this.type = 'edit'
				this.id = data.id
				this.getCardDetails(data.id)
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


			// 选择门店分类
			storeCategoryOpen() {
				this.isStoreCategory = true
			},
			// 门店分类关闭弹窗
			storeCategoryCancel(e) {
				this.isStoreCategory = e
			},
			// 门店分类弹窗选择确认
			storeCategoryConfirm(e) {
				this.from.store_cid = e.id
				this.storeCategoryName = e.name
			},

			// 选择平台分类
			planformOpen() {
				this.isPlanform = true
			},
			// 平台分类关闭弹窗
			planformCancel(e) {
				this.isPlanform = e
			},
			// 平台分类弹窗选择确认
			planformConfirm(e) {
				this.from.cid = e.id
				this.platformName = e.name
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


			// 打开添加套餐类型
			packageCardOpen() {
				this.isPackageCard = true
				this.getDataList()
			},
			// 套餐类型关闭弹窗
			packageCardCancel(e) {
				this.isPackageCard = e
			},
			// 选择套餐类型弹窗选择确认
			packageCardConfirm(e) {
				this.dataList = e
			},



			// 上传封面图片
			upCoverPhoto() {
				uni.chooseImage({
					count: 3, //默认100
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {

						res.tempFilePaths.forEach((item, index) => {
							const path = 'images/';
							// #ifdef H5
							let file = item;
							let suffix = res.tempFiles[index].name.split('.').pop();
							// #endif

							// #ifdef APP-PLUS
							let file = item;
							let suffix = res.tempFiles[index].path.split('.').pop();
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
										this.imageList.push(result)
									});
								}
							});
						})
					}
				});
			},
			// 删除图片
			delImage(index) {
				this.imageList.splice(index, 1)
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
			// 步进器点击
			stepper(index, type) {
				switch (type) {
					case 'reduce':
						if (this.dataList[index].num <= 1) {
							uni.showToast({
								title: "已经减到最低了，不能再减少了",
								icon: "none"
							})
							return;
						}
						this.dataList[index].num--
						break;
					case 'add':
						this.dataList[index].num++
						break;
				}
			},
			// 删除按钮点击
			deleteClick(index) {
				this.dataList.splice(index, 1)
			},


			// 确认提交按钮
			confirmAdd() {

				var str = {}
				var arr = []
				this.dataList.forEach(item => {
					str = {
						id: item.id,
						name: item.name,
						times: item.num
					}
					arr.push(str)
				})
				this.from.service = arr

				var vuedata = {
					store: this.from.store, //门店id
					store_cid: this.from.store_cid, //门店分类
					cid: this.from.cid, //平台分类
					name: this.from.name, //优惠券名称
					simg: this.imageList.length != 0 ? this.imageList[0] : '', //封面图
					bimg: this.imageList.length != 0 ? this.imageList.join(',') : '', //轮播图
					service: JSON.stringify(this.from.service), //项目
					price: this.from.price, //价格
					quantity: this.from.quantity, //库存
					date_type: this.isCurr ? 1 : 2, //使用时间类型 1固定日期区间，2固定时长
					begin_time: this.startTime, //开始时间
					end_time: this.endTime, //结束时间
					fixed_term: this.from.fixed_term, //固定时长
					status: this.isState ? 1 : -1, //发放状态
					sort: this.from.sort, //排序
					description: this.from.description, //优惠券说明
				}
				console.log(vuedata)
				// return false;
				this.apipost('api/v1/store/card/add', vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddPackageCard', true)
						uni.showToast({
							title: "套餐卡添加成功",
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
				var str = {}
				var arr = []
				this.dataList.forEach(item => {
					str = {
						id: item.id,
						name: item.name,
						times: item.num
					}
					arr.push(str)
				})
				this.from.service = arr

				var vuedata = {
					store: this.from.store, //门店id
					store_cid: this.from.store_cid, //门店分类
					cid: this.from.cid, //平台分类
					name: this.from.name, //优惠券名称
					simg: this.imageList.length != 0 ? this.imageList[0] : '', //封面图
					bimg: this.imageList.length != 0 ? this.imageList.join(',') : '', //轮播图
					service: JSON.stringify(this.from.service), //项目
					price: this.from.price, //价格
					quantity: this.from.quantity, //库存
					date_type: this.isCurr ? 1 : 2, //使用时间类型 1固定日期区间，2固定时长
					begin_time: this.startTime, //开始时间
					end_time: this.endTime, //结束时间
					fixed_term: this.from.fixed_term, //固定时长
					status: this.isState ? 1 : -1, //发放状态
					sort: this.from.sort, //排序
					description: this.from.description, //优惠券说明
				}
				return false;
				this.apiput('api/v1/store/card/edit/' + this.id, vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddPackageCard', true)
						uni.showToast({
							title: "套餐卡修改成功",
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

			// 获取平台分类
			getDataList() {
				var vuedata = {
					page_index: 1, // 请求页数，
					each_page: 50, // 请求条数
					store_id: 54,
				}
				this.apiget('api/v1/store/service_reservation/index', vuedata).then(res => {
					if (res.status == 200) {
						var list = res.data.data

						list.map(item => {
							item.isCheck = false
							item.num = 1
						})

						if (this.dataList.length != 0) {
							list.forEach(item => {
								this.dataList.forEach(res => {
									if (item.id == res.id) {
										console.log(res.num)
										item.isCheck = res.isCheck
										item.num = res.num
									}
								})
							})
						}
						this.list = list
					}
				});
			},
			
			// 获取套餐卡详情
			getCardDetails(id) {
				this.apiget('api/v1/store/card/index/' + id, {}).then(res => {
					if (res.status == 200) {

					}
				});
			},

			// 获取门店列表
			getStore() {
				this.apiget('api/v1/store/store_information', {}).then(res => {
					if (res.status == 200) {
						this.storeList = res.data.member
					}
				});
			},
			// 获取门店分类
			getStoreCategory() {
				this.apiget('pc/category/category_type', {
					type: 11,
					level: 1
				}).then(res => {
					if (res.status == 200) {
						this.storeCategoryList = res.data
					}
				});
			},
			// 获取平台分类
			getPlatform() {
				this.apiget('pc/category/category_type', {
					type: 15
				}).then(res => {
					if (res.status == 200) {
						this.planformList = res.data
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

			.box-content-main {
				margin-top: 20rpx;
				padding-left: 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-main-top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-right: 40rpx;
					box-sizing: border-box;
					height: 100rpx;
					border-bottom: 1rpx solid #ededed;
					color: #333;
					font-size: 28rpx;

					.box-content-main-top-title {}

					.box-content-main-top-add {
						width: 40rpx;
						height: 40rpx;
						border: 2rpx solid #CCCCCC;
						border-radius: 10rpx;

						.icon-font {
							transform: rotate(135deg);
						}
					}
				}

				.box-content-main-image-list {
					display: flex;
					align-items: center;
					padding: 40rpx 0 70rpx;
					box-sizing: border-box;

					.list-li-affter {
						position: relative;
					}

					.list-li-affter::after {
						position: absolute;
						bottom: -44rpx;
						left: 0;
						right: 0;
						margin: auto;
						content: "封面";
						font-size: 24rpx;
						text-align: center;
						color: #333;
					}

					.box-content-main-image-list-li {
						position: relative;
						width: 160rpx;
						height: 160rpx;
						margin-right: 30rpx;

						image {
							width: 160rpx;
							height: 160rpx;
							border-radius: 10rpx;
						}

						.close {
							position: absolute;
							right: -20rpx;
							top: -20rpx;
							width: 40rpx;
							height: 40rpx;
							background: rgba(0, 0, 0, 0.4);
							border-radius: 50%;
						}
					}

					.box-content-main-image-list-up {
						width: 156rpx;
						height: 156rpx;
						border: 2rpx dashed #DDDDDD;
						border-radius: 10rpx;

						.icon-font {
							transform: rotate(45deg);
						}
					}
				}

				.box-content-main-list {
					overflow: hidden;
					transition: 0.3s;


					.box-content-main-list-li {
						display: flex;
						align-items: center;
						padding-right: 40rpx;
						box-sizing: border-box;
						margin-top: 30rpx;

						.box-content-main-list-li-image {
							display: flex;
							align-items: center;

							image {
								width: 132rpx;
								height: 132rpx;
							}
						}

						.box-content-main-list-li-info {
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							height: 132rpx;
							margin-left: 20rpx;
							flex: 1;

							.box-content-main-list-li-info-text {
								display: flex;
								align-items: center;
								justify-content: space-between;

								.list-li-info-text-title {
									font-size: 30rpx;
									font-weight: 500;
									line-height: 30rpx;
								}

								.list-li-info-text-price {
									font-size: 28rpx;
								}
							}

							.box-content-main-list-li-info-bottom {
								display: flex;
								align-items: center;
								justify-content: space-between;

								.list-li-info-bottom-stepper {
									display: flex;
									width: 220rpx;
									height: 60rpx;
									border: 1rpx solid #E0E0E0;
									border-radius: 10rpx;

									.list-li-info-bottom-stepper-reduce {
										width: 80rpx;
										height: 6;

										.icon-font {
											font-size: 32rpx;
											transition: 0.3s;
										}
									}

									.list-li-info-bottom-stepper-num {
										flex: 1;
										font-size: 28rpx;
										color: #000;
									}

									.list-li-info-bottom-stepper-add {
										width: 80rpx;
										height: 60rpx;

										.icon-font {
											font-size: 32rpx;
											transition: 0.3s;
										}
									}
								}

								.list-li-info-bottom-delete {}
							}
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
