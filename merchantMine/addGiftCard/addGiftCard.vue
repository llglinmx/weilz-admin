<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="type=='add'?'添加礼品卡':'编辑礼品卡'"></nav-title-balck>
		</view>
		<view class="box-content">

			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">名称</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.name" placeholder="请输入礼品卡名称" />
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
						<text class="close flex-center" @click="delImage(index)">
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
				<view class="box-content-main-top"
					:style="{borderBottom:packageDataList.length!=0?'1rpx solid #ededed':0}">
					<view class="box-content-main-top-title">套餐项目</view>
					<view class="box-content-main-top-add flex-center" @click="packageCardOpen">
						<text class="iconfont iconcuowu icon-font" style="color: #ccc;font-size: 36rpx"></text>
					</view>
				</view>
				<view class="box-content-main-list" v-for="(item,index) in packageDataList" v-if="item.data.length!=0">
					<view class="box-content-main-list-top">
						<text class="iconfont iconshangjia"
							style="font-size: 28rpx;color: #5DBDFE;margin-top: 4rpx;"></text>
						<text>{{item.name}}</text>
					</view>
					<view class="box-content-main-list-li" v-for="(i,j) in item.data" :key="i.id">
						<view class="box-content-main-list-li-image">
							<image src="../../static/images/001.png" mode="aspectFill"></image>
						</view>
						<view class="box-content-main-list-li-info">
							<view class="box-content-main-list-li-info-text">
								<view class="list-li-info-text-title">{{i.name}}</view>
								<view class="list-li-info-text-price">￥{{i.price}}</view>
							</view>
							<view class="box-content-main-list-li-info-bottom">
								<view class="list-li-info-bottom-stepper">
									<view class="list-li-info-bottom-stepper-reduce flex-center"
										@click="stepper(index,j,'reduce')">
										<text class="iconfont iconjian icon-font"
											:style="{color:i.num>1?'#666':'#ccc'}"></text>
									</view>
									<view class="list-li-info-bottom-stepper-num flex-center">{{i.num}}</view>
									<view class="list-li-info-bottom-stepper-add flex-center"
										@click="stepper(index,j,'add')">
										<text class="iconfont iconjia icon-font" style="color:#666"></text>
									</view>
								</view>
								<view class="list-li-info-bottom-delete" @click="deleteClick(index,j)">
									<text class="iconfont iconshanchu-shangjia icon-font"
										style="color: #ccc;font-size: 52rpx;"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="box-content-main">
				<view class="box-content-main-top"
					:style="{borderBottom:couponDataList.length!=0?'1rpx solid #ededed':0}">
					<view class="box-content-main-top-title">优惠券</view>
					<view class="box-content-main-top-add flex-center" @click="couponOpen">
						<text class="iconfont iconcuowu icon-font" style="color: #ccc;font-size: 36rpx"></text>
					</view>
				</view>
				<view class="box-content-main-coupon"
					:style="{height:couponDataList.length!=0?'auto':0,paddingBottom:couponDataList.length!=0?'30rpx':0}">
					<view class="box-content-main-coupon-item" v-for="(item,index) in couponDataList">
						<view class="box-content-main-coupon-item-top">
							<view class="box-content-main-coupon-item-top-left flex-center">优惠券</view>
							<view class="box-content-main-coupon-item-top-right">
								<view class="coupon-item-top-right-text">
									<view class="coupon-item-top-right-text-title">{{item.name}}</view>
									<view class="coupon-item-top-right-text-price">￥{{item.reduce_cost}}</view>
								</view>
								<view class="coupon-item-top-right-msg-content">满{{item.least_cost}}元可用</view>
								<view class="coupon-item-top-right-msg">适用门店：{{item.name}}</view>
								<view class="coupon-item-top-right-msg" v-if='item.date_type==1'>有效期：{{item.end_time}}
								</view>
								<view class="coupon-item-top-right-msg" v-if='item.date_type==2'>
									有效期：{{item.fixed_term}}天</view>
							</view>
						</view>
						<view class="box-content-main-coupon-item-bottom">
							<view class="list-li-info-bottom-stepper">
								<view class="list-li-info-bottom-stepper-reduce flex-center"
									@click="couponStepper(index,'reduce')">
									<text class="iconfont iconjian icon-font"
										:style="{color:item.num>1?'#666':'#ccc'}"></text>
								</view>
								<view class="list-li-info-bottom-stepper-num flex-center">{{item.num}}</view>
								<view class="list-li-info-bottom-stepper-add flex-center"
									@click="couponStepper(index,'add')">
									<text class="iconfont iconjia icon-font" style="color:#666"></text>
								</view>
							</view>
							<view class="list-li-info-bottom-delete" @click="couponDeleteClick(index)">
								<text class="iconfont iconshanchu-shangjia icon-font"
									style="color: #ccc;font-size: 52rpx;"></text>
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
							<input type="number" v-model.trim="from.kucun" placeholder="最高为10000" />
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
					<view class="box-content-list-li-title">每次数量限制</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.buy_limit" placeholder="最低为1" />
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
					<view class="box-content-list-li-item-title">礼品卡使用说明</view>
					<view class="box-content-list-li-item-textarea">
						<textarea value="" v-model="from.gift_explain" placeholder="请输入使用说明" />
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="确认添加" @btnClick="confirmAdd" v-if="type =='add'" />
			<btn-sky-blue btnName="确认修改" @btnClick="confirmEdit" v-if="type =='edit'" />
		</view>
		<select-date @cancel="dateStartCancel" @confirm="dateStartConfirm" :visible='isStartDate' />
		<select-date @cancel="dateEndCancel" @confirm="dateEndConfirm" :visible='isEndDate' />

		<select-list-popup-package @cancel="packageCardCancel" :dataList="packageList" @confirm="packageCardConfirm"
			:visible='isPackageCard' />
		<coupon-list-popup @cancel="couponCancel" :dataList="couponList" @confirm="couponConfirm" :visible='isCoupon' />

	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import selectDate from '../../components/select-date/select-date.vue'
	import selectListPopupPackage from '../../components/select-list-popup-package/select-list-popup-package.vue'
	import couponListPopup from '../../components/coupon-list-popup/coupon-list-popup.vue'
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
				imageList: [],
				isPackageCard: false,
				isCoupon: false,
				sum: 1, //计数
				sumCoupon: 1, //计数
				from: {
					name: '', //礼品卡名称
					simg: '', //封面
					bimg: '', //图片
					pack: '', //套餐卡
					coupon: '', //礼品卡
					price: '', //价格
					kucun: '', //库存
					date_type: 1, //使用时间类型 1固定日期区间，2固定时长
					begin_time: '', //开始时间
					end_time: '', //结束时间
					fixed_term: '', //固定时长
					status: this.isState ? 1 : -1, //发放状态
					sort: '', //排序
					gift_explain: '', //优惠券说明
				},
				startTime: '',
				endTime: '',
				isStartDate: false,
				isEndDate: false,
				editDataList: [],
				packageDataList: [],
				packageList: [],

				couponList: [],
				couponDataList: [],
				couponEditDataList: [],

			};
		},
		components: {
			navTitleBalck,
			btnSkyBlue,
			selectDate,
			selectListPopupPackage,
			couponListPopup
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
			var data = JSON.parse(options.data)
			if (data.type == 'add') {
				this.type = 'add'
			} else if (data.type == 'edit') {
				this.type = 'edit'
				this.id = data.id
				this.getPackage(data.id)
			}
		},
		methods: {


			// 打开添加套餐类型
			packageCardOpen() {
				this.getDataList()
			},
			// 套餐类型关闭弹窗
			packageCardCancel(e) {
				this.isPackageCard = e
			},
			// 选择套餐类型弹窗选择确认
			packageCardConfirm(e) {
				this.packageDataList = e
			},

			// 打开优惠券弹出层
			couponOpen() {
				this.getCouponList()
			},
			// 优惠券关闭弹窗
			couponCancel(e) {
				this.isCoupon = e
			},
			// 优惠券弹窗选择确认
			couponConfirm(e) {
				this.couponDataList = e
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
				this.startTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute + ':' + e.second
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
				this.endTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute + ':' + e.second
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
				console.log('发生 change 事件，携带值为', e.target.value)
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
			stepper(index, idx, type) {
				switch (type) {
					case 'reduce':
						if (this.packageDataList[index].data[idx].num <= 1) {
							uni.showToast({
								title: "已经减到最低了，不能再减少了",
								icon: "none"
							})
							return;
						}
						this.packageDataList[index].data[idx].num--
						break;
					case 'add':
						this.packageDataList[index].data[idx].num++
						break;
				}
			},
			// 删除按钮点击
			deleteClick(index, idx) {
				if (this.packageDataList[index].data.length != 0) {
					this.packageDataList[index].data.splice(idx, 1)
				} else {
					this.packageDataList.splice(index, 1)
				}
			},


			// 优惠券步进器点击
			couponStepper(index, idx, type) {
				switch (type) {
					case 'reduce':
						this.couponDataList[index].num--
						break;
					case 'add':
						this.couponDataList[index].num++
						break;
				}
			},

			// 优惠券删除点击
			couponDeleteClick(index, idx) {
				this.couponDataList[index].data.splice(idx, 1)
			},


			// 获取套餐分类
			getDataList() {
				var vuedata = {
					page_index: 1, // 请求页数，
					each_page: 50, // 请求条数
					gift_type: 1
				}
				this.apiget('api/v1/store/service_reservation/index', vuedata).then(res => {
					if (res.status == 200) {
						var list = res.data.data
						var obj = {
							id: '',
							name: '',
							data: []
						}
						var dataArr = []

						if (list.length != 0) {

							list.map(item => {
								item.isCheck = false
								item.num = 1
							})

							let ids = list.map(item => item.store);
							let arrs = [...new Set(ids)].filter(v => v);
							arrs.map(id => {
								var obj = {
									id: '',
									name: '',
									data: []
								}
								list.map(val => {
									if (val.store == id) {
										obj.id = id;
										obj.name = val.store_name;
										obj.data.push(val);
									}
								})
								dataArr.push(obj)
							})



							if (this.type == 'add') { //添加
								if (this.packageDataList.length != 0) {
									for (var i = 0; i < dataArr.length; i++) {
										for (var k = 0; k < dataArr[i].data.length; k++) {
											for (var j = 0; j < this.packageDataList.length; j++) {
												for (var h = 0; h < this.packageDataList[j].data.length; h++) {
													if (dataArr[i].data[k].id == this.packageDataList[j].data[h]
														.id) {
														dataArr[i].data[k].isCheck = true
														dataArr[i].data[k].num = this.packageDataList[j].data[h]
															.num
													}
												}
											}

										}
									}
								}
							} else if (this.type == 'edit') { //编辑
								list.map(item => {
									this.editDataList.map(res => {
										if (item.id == res.id) {
											item.isCheck = true
											item.num = res.times
										}
									})
								})

								var arr = []
								list.forEach(item => {
									if (item.isCheck) {
										arr.push(item)
									}
								})
								console.log(arr)
								this.dataList = arr
							}

							this.packageList = dataArr
							this.isPackageCard = true

						} else {
							if (this.type == 'add') {
								uni.showToast({
									title: '该门店还没有任何套餐',
									icon: "none"
								})
							} else if (this.type == 'edit') {
								if (this.sum != 1) {
									uni.showToast({
										title: '该门店还没有任何套餐',
										icon: "none"
									})
								}
							}
						}
						this.sum++
					}
				});
			},

			// 获取优惠券分类
			getCouponList() {
				this.isCoupon = true
				var vuedata = {
					page_index: 1, // 请求页数，
					each_page: 50, // 请求条数
					gift_type: 1
				}
				this.apiget('api/v1/store/coupon/index', vuedata).then(res => {
					if (res.status == 200) {
						var list = res.data.data

						if (list.length != 0) {
							list.map(item => {
								item.isCheck = false
								item.num = 1
							})
							if (this.type == 'add') { //添加
								if (this.couponDataList.length != 0) {
									list.forEach(item => {
										this.couponDataList.forEach(res => {
											if (item.id == res.id) {
												item.isCheck = res.isCheck
												item.num = res.num
											}
										})
									})
								}
							} else if (this.type == 'edit') { //编辑
								list.map(item => {
									this.couponEditDataList.map(res => {
										if (item.id == res.id) {
											item.isCheck = true
											item.num = res.times
										}
									})
								})

								var arr = []
								list.forEach(item => {
									if (item.isCheck) {
										arr.push(item)
									}
								})
								this.couponDataList = arr
							}
							this.couponList = list

							if (this.sumCoupon != 1) {
								this.isCoupon = true
							}
						} else {
							this.isCoupon = false
							uni.showToast({
								title: '暂无任何可选优惠券',
								icon: "none"
							})
						}
						this.sumCoupon++
					}
				});
			},

			// 确定添加按钮
			confirmAdd() {
				var str = {}
				var obj = {}
				var arr = []
				var data = []
				this.couponDataList.forEach(item => {
					str = {
						id: item.id,
						name: item.name,
						times: item.num
					}
					arr.push(str)
				})
				this.packageDataList.forEach(item => {
					item.data.forEach(res => {
						obj = {
							id: res.id,
							name: res.name,
							times: res.num
						}
						data.push(obj)
					})
				})


				this.from.coupon = arr
				this.from.pack = data

				var vuedata = {
					name: this.from.name, //礼品卡名称
					simg: this.imageList.length != 0 ? this.imageList[0] : '', //封面图
					bimg: this.imageList.length != 0 ? this.imageList.join(',') : '', //图片
					pack: JSON.stringify(this.from.pack), //套餐卡列表
					coupon: JSON.stringify(this.from.coupon), //优惠券列表
					price: this.from.price, //价格
					kucun: this.from.kucun, //库存
					date_type: this.isCurr ? 1 : 2, //使用时间类型 1固定日期区间，2固定时长
					begin_time: this.startTime, //开始时间
					end_time: this.endTime, //结束时间
					fixed_term: this.from.fixed_term, //固定时长
					buy_limit: this.from.buy_limit, //固定数量限制
					status: this.isState ? 1 : -1, //发放状态
					sort: this.from.sort, //排序
					gift_explain: this.from.gift_explain, //优惠券说明
				}
				console.log(vuedata)
				// return false
				this.apipost('api/v1/store/gift/add', vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddGift', true)
						uni.showToast({
							title: "礼品卡添加成功",
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

			// 确定修改按钮
			confirmEdit() {
				var str = {}
				var obj = {}
				var arr = []
				var data = []
				this.couponDataList.forEach(item => {
					str = {
						id: item.id,
						name: item.name,
						times: item.num
					}
					arr.push(str)
				})
				this.packageDataList.forEach(item => {
					item.data.forEach(res => {
						obj = {
							id: res.id,
							name: res.name,
							times: res.num
						}
						data.push(obj)
					})
				})


				this.from.coupon = arr
				this.from.pack = data

				var vuedata = {
					name: this.from.name, //礼品卡名称
					simg: this.imageList.length != 0 ? this.imageList[0] : '', //封面图
					bimg: this.imageList.length != 0 ? this.imageList.join(',') : '', //图片
					pack: JSON.stringify(this.from.pack), //套餐卡列表
					coupon: JSON.stringify(this.from.coupon), //优惠券列表
					price: this.from.price, //价格
					kucun: this.from.kucun, //库存
					date_type: this.isCurr ? 1 : 2, //使用时间类型 1固定日期区间，2固定时长
					begin_time: this.startTime, //开始时间
					end_time: this.endTime, //结束时间
					fixed_term: this.from.fixed_term, //固定时长
					buy_limit: this.from.buy_limit, //固定数量限制
					status: this.isState ? 1 : -1, //发放状态
					sort: this.from.sort, //排序
					gift_explain: this.from.gift_explain, //优惠券说明
				}
				this.apiput('api/v1/store/gift/edit/' + this.id, vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddGift', true)
						uni.showToast({
							title: "礼品卡修改成功",
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
			// 获取礼品卡详情
			getPackage(id) {
				this.apiget('api/v1/store/gift/index/' + id, {}).then(res => {
					if (res.status == 200) {
						var data = res.data
						this.from.name = data.name
						this.imageList = data.bimg
						this.from.pack = data.pack
						this.from.coupon = data.coupon
						this.from.price = data.price
						this.from.kucun = data.kucun
						this.isCurr = data.date_type == 1 ? true : false
						this.startTime = data.begin_time
						this.endTime = data.end_time
						this.from.fixed_term = data.fixed_term
						this.from.buy_limit = data.buy_limit
						this.isState = data.status == 1 ? true : false
						this.from.sort = data.sort
						this.from.gift_explain = data.gift_explain
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
					// padding-bottom: 30rpx;

					.box-content-main-list-top {
						margin-top: 30rpx;
						display: flex;
						align-items: center;


						text {
							margin-right: 10rpx;
							font-size: 28rpx;
							color: #000;
						}
					}

					.box-content-main-list-li:last-child {
						border-bottom: 1rpx dashed #ededed;
					}

					.box-content-main-list-li {
						display: flex;
						align-items: center;
						padding-right: 40rpx;
						box-sizing: border-box;
						padding-top: 30rpx;
						padding-bottom: 30rpx;

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

				.box-content-main-coupon {
					padding-bottom: 20rpx;

					.box-content-main-coupon-item {
						margin-top: 20rpx;

						.box-content-main-coupon-item-top {
							display: flex;

							.box-content-main-coupon-item-top-left {
								width: 132rpx;
								height: 132rpx;
								background: #FFCD4D;
								border-radius: 10rpx;
								color: #fff;
								font-size: 28rpx;
							}

							.box-content-main-coupon-item-top-right {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								padding-right: 40rpx;
								box-sizing: border-box;
								margin-left: 20rpx;
								flex: 1;

								.coupon-item-top-right-text {
									display: flex;
									align-items: center;
									justify-content: space-between;
									color: #000;
									font-size: 28rpx;

									.coupon-item-top-right-text-title {
										font-weight: 500;
									}

									.coupon-item-top-right-text-price {}
								}

								.coupon-item-top-right-msg-content {
									font-size: 24rpx;
									color: #333;
								}

								.coupon-item-top-right-msg {
									font-size: 22rpx;
									color: #999;
								}
							}
						}

						.box-content-main-coupon-item-bottom {
							padding: 16rpx 40rpx 10rpx 152rpx;
							box-sizing: border-box;
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

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
		}
	}
</style>
