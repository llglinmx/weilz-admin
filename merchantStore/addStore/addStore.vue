<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="title"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">门店名称</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.name" placeholder="请输入门店名称" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="selectRegion">
					<view class="box-content-list-li-title">区域</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{from.regionName==''?'请选择区域':from.regionName}}
						</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="categoryOpen">
					<view class="box-content-list-li-title">分类</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{from.categoryName==''?'请选择分类':from.categoryName}}
						</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-item" @click="upStoreIcon">
					<view class="box-content-list-item-title">
						<text>门店图标</text>
						<text>(100*100)</text>
					</view>
					<view class="box-content-list-item-info">
						<view class="box-content-list-item-info-icon flex-center" v-if="from.simg==''">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
						</view>
						<image v-if="from.simg!=''" :src="from.simg" class="box-content-list-item-info-image"
							mode="aspectFill"></image>
					</view>
				</view>

			</view>

			<view class="box-content-main">
				<view class="box-content-main-top">
					<view>门店图片<text style="font-size: 24rpx;color: #999;margin-left: 10rpx;">(990*556)</text></view>
				</view>
				<view class="box-content-main-image-list">
					<view class="box-content-main-image-list-li" :class="index==0?'list-li-affter':''"
						v-for="(item,index) in imageList" :key="index">
						<image :src="item" mode="aspectFill"></image>
						<text class="close flex-center" @click="delImage(index)">
							<text class="iconfont iconcuowu icon-font" style="color: #fff;font-size: 36rpx"></text>
						</text>
					</view>
					<view class="box-content-main-image-list-up flex-center" v-if="imageList.length<3"
						@click="upCoverPhoto">
						<text class="iconfont iconcuowu icon-font" style="color: #ddd;font-size: 90rpx"></text>
					</view>
				</view>
			</view>

			<view class="box-content-main-schedule-list">
				<view class="box-content-main-schedule-list-title">营业时间</view>
				<view class="box-content-main-schedule-list-li" v-for="(item,index) in dataList" :key="index">
					<view class="box-content-main-schedule-list-li-title">
						<view class="box-content-main-schedule-list-li-title-left">
							<text>{{item.title}}</text>
						</view>
						<view class="box-content-main-schedule-list-li-title-right">
							<switch :checked='item.isCheck' color="#26BF81" style="transform:scale(0.7)"
								@change="switch1Change($event,index)" />
						</view>

					</view>
					<view class="box-content-main-schedule-list-li-wrap">
						<view class="schedule-list-li-wrap-item" v-for="(i,j) in item.data" :key="j">
							<view class="schedule-list-li-wrap-item-add flex-center" @click="addTime(index,j)">
								<text class="iconfont iconjia icon-font" style="color: #ccc;font-size: 28rpx"></text>
							</view>
							<view class="schedule-list-li-wrap-item-text flex-center"
								@click="timeOpen(index,j,'start')">
								<text v-if="i.start!=''">{{i.start}}</text>
								<text v-if="i.start==''" style="color: #999;">开始时间</text>
							</view>
							<view class="schedule-list-li-wrap-item-connect flex-center">
								<text class="iconfont iconjian icon-font" style="color: #ccc;font-size: 24rpx"></text>
							</view>
							<view class="schedule-list-li-wrap-item-text flex-center" @click="timeOpen(index,j,'end')">
								<text v-if="i.end!=''">{{i.end}}</text>
								<text v-if="i.end==''" style="color: #999;">结束时间</text>
								<!-- <text>{{i.random}}</text> -->
							</view>

							<view class="schedule-list-li-wrap-item-del flex-center">
								<text class="iconfont iconcuowu icon-font" style="color: #ccc;font-size: 52rpx"
									@click="deleteTime(index,j)" :style="{display:j==0?'none':'block'}"></text>
							</view>

						</view>
					</view>
				</view>
			</view>

			<view class="box-content-list">
				<view class="box-content-list-li" @click="isAreaCode=true">
					<view class="box-content-list-li-title">区号</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{from.mobile_code==''?'请选择区号':from.mobile_code}}
						</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="location">
					<view class="box-content-list-li-title">地址</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text ">
							<view class="box-content-list-li-info-text-address">
								{{from.address==''?'请定位具体地址':from.address}}
							</view>
						</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="isLanguageShow =true">
					<view class="box-content-list-li-title">语言</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{from.languageName==''?'请选择语言':from.languageName}}
						</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">门店电话</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.mobile" placeholder="请输入门店电话" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">邮箱</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.email" placeholder="请输入邮箱" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">邮编</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.postcode" placeholder="请输入邮编" />
						</view>
					</view>
				</view>

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">税号</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.duty_paragraph" placeholder="请输入税号" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li" style="padding:30rpx 0;height: auto;align-items: flex-start;">
					<view class="box-content-list-li-title">预约方式</view>
					<view class="box-content-list-li-info" style="flex-direction: column;">
						<view class="box-content-list-li-info-check">
							<view class="box-content-list-li-info-check-box" v-for="(item,index) in timeList"
								:key="index" @click="currency(index)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="item.isCurr"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>{{item.text}}</text>
							</view>

						</view>
						<view class="box-content-list-li-info-msg">
							注：时间是指时间排列选择，例如9:00 9:30 10:00; 时间段是指按时间段排列选择，例如9:00-10:00 10:00-11:00
						</view>
					</view>
				</view>

				<view class="box-content-list-li" style="padding:30rpx 0;height: auto;align-items: flex-start;">
					<view class="box-content-list-li-title">会员折扣</view>
					<view class="box-content-list-li-info" style="flex-direction: column;">
						<view class="box-content-list-li-info-check">
							<view class="box-content-list-li-info-check-box" @click="discount(true)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="isDiscount"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>开启</text>
							</view>
							<view class="box-content-list-li-info-check-box" @click="discount(false)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="!isDiscount"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>关闭</text>
							</view>
						</view>
						<view class="box-content-list-li-info-msg">
							注：开启会员折扣后,门店下的支付会员能享受对应的等级折扣,不开启就没有
						</view>
					</view>
				</view>

				<!-- <view class="box-content-list-li">
					<view class="box-content-list-li-title">客服功能</view>
					<view class="box-content-list-li-info">
						<switch checked @change="switch1Change1" color="#07C160" />
					</view>
				</view> -->
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">会员数据共通</view>
					<view class="box-content-list-li-info">
						<switch style="transform: scale(0.7);" :checked='isCommon' @change="switch1Change2"
							color="#07C160" />
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">门店提成</view>
					<view class="box-content-list-li-info">
						<switch style="transform: scale(0.7);" :checked='isCommission' @change="switch1Change3"
							color="#07C160" />
					</view>
				</view>

				<view class="box-content-list-item">
					<view class="box-content-list-item-title">
						<text>营业执照</text>
						<text>(100*100)</text>
					</view>
					<view class="box-content-list-item-info" @click="upBusinessLicense">
						<view class="box-content-list-item-info-icon flex-center" v-if="from.business_license==''">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
						</view>
						<image v-if="from.business_license!=''" :src="from.business_license"
							class="box-content-list-item-info-image" mode="aspectFill"></image>
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-title">
						<text>其他执照</text>
						<text>(110*80)</text>
					</view>
					<view class="box-content-list-item-info" @click="upOtherLicense">
						<view class="box-content-list-item-info-icon flex-center" v-if="from.other_licenses==''">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 48rpx"></text>
						</view>
						<image v-if="from.other_licenses!=''" :src="from.other_licenses"
							class="box-content-list-item-info-image" mode="aspectFill"></image>
					</view>
				</view>

				<view class="box-content-list-li" style="padding:30rpx 0;height: auto;align-items: flex-start;">
					<view class="box-content-list-li-title">详情</view>
					<view class="box-content-list-li-info" style="margin-left: 0;">
						<textarea class="box-content-list-li-info-textarea" v-model.trim="from.content"
							placeholder="请输入详情" />
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="确认添加" @btnClick="confirmAdd" v-if="isType=='add'" />
			<btn-sky-blue btnName="确认修改" @btnClick="confirmEdit" v-if="isType=='edit'" />
		</view>

		<select-address :visible="visible" @cancel='regionCancel' @confirm='regionConfirm' />

		<popup-list-select :skid='from.pid' @cancel="categoryCancel" @confirm="categoryConfirm" :visible='isCategory'
			:dataList="categoryList" />
		<select-time @cancel='cancelTime' :visible='isShow' @confirm='timeConfirm' />

		<popup-list-select :skid='from.mobile_code_id' @cancel="areaCancel" @confirm="areaConfirm" :visible='isAreaCode'
			:dataList="areaCodeList" />

		<popup-list-select :skid='from.language' @cancel="languageCancel" @confirm="languageConfirm"
			:visible='isLanguageShow' :dataList="languageList" />
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import selectAddress from '../../components/select-address/select-address.vue'
	import popupListSelect from '../../components/popup-list-select/popup-list-select.vue'
	
	import {
		areaCodeList
	} from '../../static/js/publicFile.js'


	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js'
	import uploadImage from "../../js_sdk/oss/uploadOSS.js";


	export default {
		data() {
			return {
				title: '', //标题
				isType: '', //判断当前处于编辑还是添加
				barHeight: 0, //顶部电量导航栏高度
				isDiscount: false, //是否开启会员折扣
				visible: false,
				addressList: [],
				categoryList: [],
				languageList: [],
				isCategory: false,
				id: '',
				timeList: [{
						text: '时间',
						id: 1,
						isCurr: true
					},
					{
						text: '时间段',
						id: 2,
						isCurr: false
					},
				],
				stateList: [{
						name: '启用',
						state: 1
					},
					{
						name: '关闭',
						state: 0
					},
				],
				areaCodeList: [],
				isState: false,
				isCommon: false,
				isCommission: false,
				isAreaCode: false,
				isLanguageShow: false,
				from: {
					name: '', //门店名称
					regionName: '', //区域名称
					categoryName: '',
					pid: '', //分类类别id
					stateName: '',
					simg: '', //门店图标
					bimg: '', //门店封面
					email: '', //邮箱
					postcode: '', //邮编
					language: '', //语言
					languageName: '', //语言名称
					mobile_code: '', //区号
					mobile_code_id: '', //区号id
					mobile: '', //门店电话
					plan_date: '', //营业时间
					country: '', //国家id
					province: '', //省份id
					city: '', //城市id
					district: '', //区域id
					common: -1, //会员数据共通
					commission: -1, //门店提成
					schedule: 1, //预约方式
					status: '', //状态
					card_sale: -1, //会员折扣 -1为关闭 1为开启
					duty_paragraph: '', //税号
					content: '', //详情
					address: '凤岐西路软件园三期B区03栋三层', //门店地址
					longitude: '118.04705', //经度
					latitude: '24.610855', //纬度
					business_license: '', //营业执照
					other_licenses: '', //其他执照
				},
				imageList: [],
				isShow: false,
				codeKey: 0,
				dataList: [{
						title: "周一",
						type: "mon_times",
						isCheck: false,
						data: [{
							start: '',
							end: '',
						}, ],
					},
					{
						title: "周二",
						type: "tues_times",
						isCheck: false,
						data: [{
							start: '',
							end: '',
						}, ],
					},
					{
						title: "周三",
						type: "wed_times",
						isCheck: false,
						data: [{
							start: '',
							end: '',
						}, ],
					},
					{
						title: "周四",
						type: "thur_times",
						isCheck: false,
						data: [{
							start: '',
							end: '',
						}, ],
					},
					{
						title: "周五",
						type: "fri_times",
						isCheck: false,
						data: [{
							start: '',
							end: '',
						}, ],
					},
					{
						title: "周六",
						type: "sat_times",
						isCheck: false,
						data: [{
							start: '',
							end: '',
						}, ],
					}, {
						title: "周日",
						type: "sun_times",
						isCheck: false,
						data: [{
							start: '',
							end: '',
						}, ],
					},
				],
			};
		},
		filters: {
			basic(val) { //去除最后一个字符
				return val.substring(0, val.length - 1);
			},
		},
		components: {
			navTitleBalck,
			btnSkyBlue,
			selectAddress,
			popupListSelect,
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
			this.getCategory()
			this.getLanguageList()
			let data = JSON.parse(options.data)
			this.isType = data.type
			if (data.type == "edit") {
				this.getInfo(data.id)
				this.title = "编辑门店"
				this.id = data.id
			} else if (data.type == "add") {
				this.title = "添加门店"
			}
			this.areaCodeList = areaCodeList
		},
		onShow() {
			var arr = Object.keys(this.$store.state.mapObj);
			if (arr.length != 0) {
				this.from.address = this.$store.state.mapObj.address
				this.from.longitude = this.$store.state.mapObj.longitude
				this.from.latitude = this.$store.state.mapObj.latitude
				this.longitude = this.$store.state.mapObj.longitude
				this.latitude = this.$store.state.mapObj.latitude
			}
		},

		methods: {

			// switch 开关
			switch1Change(e, index) {
				var bool = e.detail.value
				this.dataList[index].isCheck = bool ? true : false
			},
			// 添加时间
			addTime(index, idx) {
				// index 第一级下标 idx 第二级下标
				let str = {
					start: '',
					end: '',
				}

				if (this.dataList[index].isCheck) {
					this.dataList[index].data.splice(idx + 1, 0, str) // 当前点击的后一位添加
					return false;
				}
				uni.showToast({
					title: "该时间未开启,不能选择时间",
					icon: "none"
				})
			},

			// 删除添加的日程时间
			deleteTime(index, idx) {
				if (this.dataList[index].data.length <= 1) {
					uni.showToast({
						title: "不能再删了，至少保留一个",
						icon: "none"
					})
					return false;
				}
				this.dataList[index].data.splice(idx, 1) // 当前点击位置删除
			},

			// 时间弹出层打开
			timeOpen(index, idx, type) {
				this.indexOne = index
				this.indexTwo = idx
				this.timeType = type
				if (this.dataList[index].isCheck) {
					this.isShow = true
					return false
				}
				uni.showToast({
					title: "该时间未开启,不能选择时间",
					icon: "none"
				})
			},
			// 时间弹出层取消事件
			cancelTime(e) {
				this.isShow = e
			},
			// 时间弹出层确认事件
			timeConfirm(e) {
				if (this.timeType == 'start') { //开始时间
					this.dataList[this.indexOne].data[this.indexTwo].start = e.hour + ':' + e.minute
				} else { //结束时间
					this.dataList[this.indexOne].data[this.indexTwo].end = e.hour + ':' + e.minute
				}
			},

			// 语言 取消事件
			languageCancel(e) {
				this.isLanguageShow = e
			},
			// 语言确定事件
			languageConfirm(e) {
				this.from.language = e.id
				this.from.languageName = e.name
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
				this.from.country = e.country_id
				this.from.province = e.province_id
				this.from.city = e.city_id
				this.from.district = e.area_id
				this.from.regionName = e.country_name + e.province_name + e.city_name + e.area_name
			},

			// 选择类别点击
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
				this.from.categoryName = e.name
			},


			// 区号取消按钮
			areaCancel(e) {
				this.isAreaCode = e
			},

			areaConfirm(e) {
				this.from.mobile_code = e.name
			},


			// 预约方式
			currency(index) {
				this.timeList.forEach(item => {
					item.isCurr = false
				})
				this.timeList[index].isCurr = true

				this.timeList.forEach(item => {
					if (item.isCurr) {
						this.from.schedule = item.id
						console.log(this.from.schedule)
					}

				})

			},
			// 是否开启会员折扣
			discount(bool) {
				this.isDiscount = bool ? true : false
				this.from.card_sale = bool ? 1 : -1
			},

			// 定位地址
			location() {
				var map = {
					longitude: this.$store.state.mapObj.longitude ? this.$store.state.mapObj.longitude : this.from
						.longitude,
					latitude: this.$store.state.mapObj.latitude ? this.$store.state.mapObj.latitude : this.from
						.latitude,
					isType: this.isType
				}
				uni.navigateTo({
					url: "../selectLocation/selectLocation?data=" + JSON.stringify(map)
				})
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
			},

			// 客服功能
			switch1Change1(e) {
				console.log(e.target.value)
			},
			//会员数据共通
			switch1Change2(e) {
				this.from.common = e.target.value ? 1 : -1
				this.isCommon = e.target.value
			},
			// 门店提成
			switch1Change3(e) {
				this.from.commission = e.target.value ? 1 : -1
				this.isCommission = e.target.value
			},


			// 确认添加按钮
			confirmAdd() {
				var arr = []
				this.dataList.forEach(item => {
					switch (item.type) {
						case 'mon_times': //周一
							if (item.isCheck) {
								let str = {
									mon_times: JSON.stringify(item.data),
									mon_status: 1
								}
								arr.push(str)
							}

							break;
						case 'tues_times': //周二
							if (item.isCheck) {
								let str = {
									tues_times: JSON.stringify(item.data),
									tues_status: 1
								}
								arr.push(str)
							}
							break;
						case 'wed_times': //周三
							if (item.isCheck) {
								let str = {
									wed_times: JSON.stringify(item.data),
									wed_status: 1
								}
								arr.push(str)
							}
							break;
						case 'thur_times': //周四
							if (item.isCheck) {
								let str = {
									thur_times: JSON.stringify(item.data),
									thur_status: 1
								}
								arr.push(str)
							}
							break;
						case 'fri_times': //周五
							if (item.isCheck) {
								let str = {
									fri_times: JSON.stringify(item.data),
									fri_status: 1
								}
								arr.push(str)
							}
							break;
						case 'sat_times': //周六
							if (item.isCheck) {
								let str = {
									sat_times: JSON.stringify(item.data),
									sat_status: 1
								}
								arr.push(str)
							}
							break;
						case 'sun_times': //周日
							if (item.isCheck) {
								let str = {
									sun_times: JSON.stringify(item.data),
									sun_status: 1
								}
								arr.push(str)
							}
							break;
					}
				})

				var vuedata = {
					name: this.from.name,
					pid: this.from.pid,
					simg: this.from.simg,
					bimg: this.imageList.join(','),
					mobile: this.from.mobile,
					mobile_code: this.from.mobile_code, //区号
					plan_date: JSON.stringify(arr),
					email: this.from.email, //邮箱
					postcode: this.from.postcode, //邮编
					language: this.from.language, //语言
					schedule: this.from.schedule,
					status: this.from.status,
					store_member: this.from.common,
					fee_status: this.from.commission,
					duty_paragraph: this.from.duty_paragraph,
					card_sale: this.from.card_sale,
					content: this.from.content,
					address: this.from.address,
					longitude_baidu: this.from.longitude,
					latitude_baidu: this.from.latitude,
					business_license: this.from.business_license,
					other_licenses: this.from.other_licenses,
				}

				this.apipost('api/v1/store/store_information/add', vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddStore', true)
						uni.showToast({
							title: "门店添加成功",
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
				var arr = []
				this.dataList.forEach(item => {
					switch (item.type) {
						case 'mon_times': //周一
							if (item.isCheck) {
								let str = {
									mon_times: JSON.stringify(item.data),
									mon_status: 1
								}
								arr.push(str)
							}

							break;
						case 'tues_times': //周二
							if (item.isCheck) {
								let str = {
									tues_times: JSON.stringify(item.data),
									tues_status: 1
								}
								arr.push(str)
							}
							break;
						case 'wed_times': //周三
							if (item.isCheck) {
								let str = {
									wed_times: JSON.stringify(item.data),
									wed_status: 1
								}
								arr.push(str)
							}
							break;
						case 'thur_times': //周四
							if (item.isCheck) {
								let str = {
									thur_times: JSON.stringify(item.data),
									thur_status: 1
								}
								arr.push(str)
							}
							break;
						case 'fri_times': //周五
							if (item.isCheck) {
								let str = {
									fri_times: JSON.stringify(item.data),
									fri_status: 1
								}
								arr.push(str)
							}
							break;
						case 'sat_times': //周六
							if (item.isCheck) {
								let str = {
									sat_times: JSON.stringify(item.data),
									sat_status: 1
								}
								arr.push(str)
							}
							break;
						case 'sun_times': //周日
							if (item.isCheck) {
								let str = {
									sun_times: JSON.stringify(item.data),
									sun_status: 1
								}
								arr.push(str)
							}
							break;
					}
				})

				var vuedata = {
					name: this.from.name,
					pid: this.from.pid,
					simg: this.from.simg,
					bimg: this.imageList.join(','),
					mobile: this.from.mobile,
					mobile_code: this.from.mobile_code, //区号
					plan_date: JSON.stringify(arr),
					email: this.from.email, //邮箱
					postcode: this.from.postcode, //邮编
					language: this.from.language, //语言
					schedule: this.from.schedule,
					status: this.from.status,
					store_member: this.from.common,
					fee_status: this.from.commission,
					duty_paragraph: this.from.duty_paragraph,
					card_sale: this.from.card_sale,
					content: this.from.content,
					address: this.from.address,
					longitude: this.from.longitude,
					latitude: this.from.latitude,
					business_license: this.from.business_license,
					other_licenses: this.from.other_licenses,
				}


				this.apiput('api/v1/store/store_information/edit/' + this.id, vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddStore', true)
						uni.showToast({
							title: "门店修改成功",
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

			// 门店图标
			upStoreIcon() {
				uni.chooseImage({
					count: 1, //默认100
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						pathToBase64(res.tempFilePaths[0]).then((data) => {
							this.from.simg = data
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
										this.from.simg = result
									});
								}
							});
						})
					}
				});
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


			// 营业执照
			upBusinessLicense() {
				uni.chooseImage({
					count: 1, //默认100
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						pathToBase64(res.tempFilePaths[0]).then((data) => {
							this.from.business_license = data
							const path = 'images/';
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
										this.from.business_license = result
									});
								}
							});
						})
					}
				});
			},
			// 其他执照
			upOtherLicense() {
				uni.chooseImage({
					count: 1, //默认100
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						pathToBase64(res.tempFilePaths[0]).then((data) => {
							this.from.other_licenses = data
							const path = 'images/';
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
										this.from.other_licenses = result
									});
								}
							});
						})
					}
				});
			},


			// 获取详情
			getInfo(id) {
				this.apiget('api/v1/store/store_information/' + id, {}).then(res => {
					if (res.status == 200) {
						this.from.name = res.data.member.name
						this.from.pid = res.data.member.pid
						this.from.categoryName = res.data.member.class_name
						this.from.longitude = res.data.member.longitude
						this.from.latitude = res.data.member.latitude
						this.from.address = res.data.member.address
						this.from.content = res.data.member.content
						this.from.simg = res.data.member.simg
						this.from.mobile = res.data.member.mobile
						this.from.mobile_code = res.data.member.mobile_code
						this.from.postcode = res.data.member.postcode
						this.from.email = res.data.member.email
						this.from.language = res.data.member.language

						this.from.plan_date = res.data.member.plan_date
						this.from.card_sale = res.data.member.card_sale
						this.from.schedule = res.data.member.schedule
						this.from.status = res.data.member.status
						this.from.duty_paragraph = res.data.member.duty_paragraph
						this.from.business_license = res.data.member.business_license
						this.from.other_licenses = res.data.member.other_licenses

						this.imageList = res.data.member.bimg
						this.from.bimg = res.data.member.bimg.join(',')


						// 时间段
						this.timeList.forEach(item => {
							item.isCurr = false
						})

						if (res.data.member.schedule == 1) {
							this.timeList[0].isCurr = true
						} else {
							this.timeList[1].isCurr = true
						}

						this.from.common = res.data.member.store_member
						this.isCommon = res.data.member.store_member == 1 ? true : false

						this.from.commission = res.data.member.fee_status
						this.isCommission = res.data.member.fee_status == 1 ? true : false


						this.isDiscount = res.data.member.card_sale == 1 ? true : false

						this.languageList.forEach(item => {
							if (item.id == res.data.member.language) {
								this.from.languageName = item.name
							}
						})

						var arrs = this.areaCodeList
						this.areaCodeList = []
						this.codeKey++
						this.$nextTick(() => {
							this.areaCodeList = arrs
							arrs.forEach(item => {
								if (item.name == res.data.member.mobile_code) {
									this.from.mobile_code_id = item.id
									this.areaCodeList = arrs
								}
							})
						})
						
						
						var date = JSON.parse(res.data.member.plan_date)
						for (var k in date) {
							if (date[k].mon_status == 1) {
								this.dataList[0].data = JSON.parse(date[k].mon_times)
								this.dataList[0].isCheck = true
							}
							if (date[k].tues_status == 1) {
								this.dataList[1].data = JSON.parse(date[k].tues_times)
								this.dataList[1].isCheck = true
							}
							if (date[k].wed_status == 1) {
								this.dataList[2].data = JSON.parse(date[k].wed_times)
								this.dataList[2].isCheck = true
							}
							if (date[k].thur_status == 1) {
								this.dataList[3].data = JSON.parse(date[k].thur_times)
								this.dataList[3].isCheck = true
							}
							if (date[k].fri_status == 1) {
								this.dataList[4].data = JSON.parse(date[k].fri_times)
								this.dataList[4].isCheck = true
							}
							if (date[k].sat_status == 1) {
								this.dataList[5].data = JSON.parse(date[k].sat_times)
								this.dataList[5].isCheck = true
							}
							if (date[k].sun_status == 1) {
								this.dataList[6].data = JSON.parse(date[k].sun_times)
								this.dataList[6].isCheck = true
							}
						}
					}
				});
			},


			// 获取地址
			getAddress() {
				var vuedata = {}
				this.apiget('region/regions', vuedata).then(res => {
					if (res.status == 200) {
						this.addressList = res.data
						console.log(res.data)
					}
				});
			},

			// 获取类别
			getCategory() {
				this.apiget('pc/category/category_type', {
					type: 11
				}).then(res => {
					if (res.status == 200) {
						this.categoryList = res.data
					}
				});
			},

			// 请求语言列表
			getLanguageList() {
				this.apiget('language', {}).then(res => {
					if (res.status == 200) {
						this.languageList = res.data.lng.reverse()
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

			.box-content-main-schedule-list {
				margin-top: 20rpx;
				padding: 0 40rpx 30rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-main-schedule-list-title {
					padding-top: 30rpx;
					font-size: 28rpx;
				}

				.box-content-main-schedule-list-li {
					.box-content-main-schedule-list-li-title {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 20rpx 0;
						color: #333;

						.box-content-main-schedule-list-li-title-left {
							display: flex;
							align-items: center;
							font-size: 28rpx;

							text {
								margin-right: 20rpx;
								font-size: 30rpx;
							}
						}

						.box-content-main-schedule-list-li-title-left {}


					}

					.box-content-main-schedule-list-li-wrap {
						.schedule-list-li-wrap-item:first-child {
							margin-top: 0;
						}

						.schedule-list-li-wrap-item {
							display: flex;
							align-items: center;
							margin-top: 20rpx;

							.schedule-list-li-wrap-item-add {
								width: 40rpx;
								height: 40rpx;
								border: 1rpx solid #CCCCCC;
								border-radius: 10rpx;
								margin-right: 10rpx;
							}

							.schedule-list-li-wrap-item-text {
								display: flex;
								align-items: center;
								width: 220rpx;
								height: 60rpx;
								margin: 0 10rpx;
								border: 2rpx solid #EDEDED;
								border-radius: 10rpx;
								font-size: 28rpx;

								.icon-font {
									margin-right: 10rpx;
								}

							}

							.schedule-list-li-wrap-item-connect {}

							.schedule-list-li-wrap-item-del {
								margin-left: 20rpx;
								width: 40rpx;
								height: 40rpx;
							}

						}
					}
				}
			}

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

							.box-content-list-li-info-text-address {
								width: 380rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
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
							width: 100%;


							.box-content-list-li-info-check-box {
								display: flex;
								align-items: center;
								color: #000;
								font-size: 28rpx;

								.icon-font {
									margin-right: 20rpx;
								}

								text {}
							}

							.box-content-list-li-info-check-box:nth-child(2) {
								margin-left: 40rpx;
							}
						}

						.box-content-list-li-info-msg {
							margin-top: 20rpx;
							font-size: 24rpx;
							color: #999;
						}

						.box-content-list-li-info-textarea {
							width: 100%;
							max-height: 180rpx;
							padding: 0 20rpx 0 0;
							box-sizing: border-box;
							font-size: 28rpx;
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
					height: 80rpx;
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
					display: flex;
					flex-wrap: wrap;

					.list-li-affter {
						position: relative;
					}

					.list-li-affter::after {
						position: absolute;
						bottom: -44rpx;
						left: 0;
						right: 0;
						margin: auto;
						content: "门店封面";
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


			}

		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
		}
	}
</style>
