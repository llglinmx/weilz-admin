<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="新增技师"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li" @click="selectStore">
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
					<view class="box-content-list-li-title">技师名字</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.name" placeholder="请输入技师名字" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="platformOpen">
					<view class="box-content-list-li-title">平台分类</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{platformName==''?'请选择平台分类':platformName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">手机号</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.mobile" placeholder="请输入手机号码" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">电子邮箱</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.email="from.email" placeholder="请输入电子邮箱" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="projectOpen">
					<view class="box-content-list-li-title">服务项目</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{projectName==''?'请选择服务项目':projectName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">语言</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.Language_skills" placeholder="多种语言使用“；”间隔" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">是否会开车</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-check">
							<view class="box-content-list-li-info-check-box" @click="currency(true)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="isCurr"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>是</text>
							</view>
							<view class="box-content-list-li-info-check-box" @click="currency(false)">
								<text class="iconfont iconxuanzhong icon-font" style="color: #07C160;font-size: 48rpx;"
									v-if="!isCurr"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 48rpx;"
									v-else></text>
								<text>否</text>
							</view>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="gradeOpen">
					<view class="box-content-list-li-title">技师等级</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{gradeName==''?'请选择技师等级':gradeName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">工龄</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.service_times" placeholder="请输入工龄" />
							<text>年</text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">执照ID</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.license_id" placeholder="请输入执照ID" />
						</view>
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-text">
						执照<text>(100*100)</text>
					</view>
					<view class="box-content-list-item-info" @click="licenseImg">
						<view class="box-content-list-item-info-icon flex-center" v-if="from.license_img==''">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 50rpx;"></text>
						</view>
						<image :src="from.license_img" v-if="from.license_img!=''"
							class="box-content-list-item-info-image" mode="aspectFill"></image>
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-text">
						工作照片<text>(110*80)</text>
					</view>
					<view class="box-content-list-item-info" @click="upImage">
						<view class="box-content-list-item-info-icon flex-center" v-if="from.simg==''">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 50rpx;"></text>
						</view>
						<image :src="from.simg" v-if="from.simg!=''" class="box-content-list-item-info-image"
							mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">项目服务费</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text" style="color: #999;">项目金额的</view>
						<view class="box-content-list-li-info-input input-border">
							<input type="number" v-model.trim="from.service_fee" value="" />
						</view>
						<view class="box-content-list-li-info-msg">%</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">技师提成</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text" style="color: #999;">消费金额的</view>
						<view class="box-content-list-li-info-input input-border">
							<input type="number" v-model.trim="from.fee" value="" />
						</view>
						<view class="box-content-list-li-info-msg">%</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="timeOpen">
					<view class="box-content-list-li-title">工作时间表</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{timeName==''?'请选择工作时间表':timeName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" v-if="type=='add'" @click="userOpen">
					<view class="box-content-list-li-title">用户绑定</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{userName==''?'请选择用户':userName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="stateOpen">
					<view class="box-content-list-li-title">状态</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{stateName==''?'请选择状态':stateName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">排序</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.ordersort" placeholder="请输入排序" />
						</view>
					</view>
				</view>

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">详情</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.content" placeholder="请输入详情" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="确认提交" @btnClick="confirmAdd" v-if="type=='add'" />
			<btn-sky-blue btnName="确认修改" @btnClick="confirmEdit" v-if="type=='edit'" />
		</view>
		<popup-list-select @cancel="storePopup" @confirm="storeConfirm" :visible='visible' :dataList="storeList">
		</popup-list-select>

		<popup-list-select @cancel="storeCategoryPopup" @confirm="storeCategoryConfirm" :visible='isStore'
			:dataList="storeCategoryList">
		</popup-list-select>
		<popup-list-select @cancel="platformPopup" @confirm="platformConfirm" :visible='isPlatform'
			:dataList="platformList">
		</popup-list-select>

		<popup-list-select @cancel="projectPopup" @confirm="projectConfirm" :visible='isProject'
			:dataList="projectList">
		</popup-list-select>

		<popup-list-select @cancel="gradePopup" @confirm="gradeConfirm" :visible='isGrade' :dataList="gradeList">
		</popup-list-select>


		<popup-list-select @cancel="timePopup" @confirm="timeConfirm" :visible='isTime' :dataList="timeList">
		</popup-list-select>

		<popup-list-select @cancel="userPopup" @confirm="userConfirm" :visible='isUser' :dataList="userList">
		</popup-list-select>

		<popup-list-select @cancel="statePopup" @confirm="stateConfirm" :visible='isState' :dataList="stateList">
		</popup-list-select>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import popupListSelect from '../../components/popup-list-select/popup-list-select.vue'
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js'
	import uploadImage from "../../js_sdk/oss/uploadOSS.js";

	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				id: '',
				type: '',
				isCurr: false, //是否会开车
				visible: false,
				isStore: false,
				isPlatform: false,
				isProject: false,
				isGrade: false,
				isTime: false,
				isUser: false,
				isState: false,
				storeList: [],
				storeCategoryList: [],
				platformList: [],
				projectList: [],
				gradeList: [],
				timeList: [],
				userList: [],
				stateList: [{
						name: '启用',
						state: 1
					},
					{
						name: '关闭',
						state: 0
					},
				],
				storeCategoryName: '',
				storeName: '',
				platformName: '',
				projectName: '',
				gradeName: '',
				timeName: '',
				userName: '',
				stateName: '',
				from: {
					name: '',
					store: '', //门店id
					store_cid: '', //门店分类ID
					storeCategory: '',
					platform: '', //技师分类ID
					grade: '', //技师等级
					simg: '', //工作招聘
					mobile: '',
					email: '',
					status: '',
					service: '', //服务项目
					service_fee: '', //项目服务费
					fee: '', //技师提成
					ordersort: '', //排序
					content: '', //详情
					service_times: '', //工龄
					Language_skills: '', //语言
					drive_card: -1, //是否会开车
					license_id: '', //执照id
					license_img: '', //执照图片
					status: -1, //状态
					schedule: '', //时间表·
					uid: '', //用户id
				}
			};
		},
		components: {
			navTitleBalck,
			btnSkyBlue,
			popupListSelect
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
			this.getProject()
			this.getGrad()
			this.getTimeTable()
			this.getUser();

			var data = JSON.parse(options.data)
			if (data.type == 'add') {
				this.id = data.storeId
				this.type = 'add'
			} else if (data.type == 'edit') {
				this.type = 'edit'
				this.id = data.id
				this.getDetails(data.id)
			}
		},


		methods: {
			// 选择门店
			selectStore() {
				this.visible = true
			},
			// 门店关闭弹窗
			storePopup(e) {
				this.visible = e
			},
			// 门店弹窗选择确认
			storeConfirm(e) {
				this.from.store = e.id
				this.storeName = e.name
			},

			// 选择门店分类
			storeCategoryOpen() {
				this.isStore = true
			},
			// 门店分类关闭弹窗
			storeCategoryPopup(e) {
				this.isStore = e
			},
			// 门店分类弹窗选择确认
			storeCategoryConfirm(e) {
				this.from.storeCategory = e.id
				this.storeCategoryName = e.name
			},

			// 选择平台分类
			platformOpen() {
				this.isPlatform = true
			},
			// 平台分类关闭弹窗
			platformPopup(e) {
				this.isPlatform = e
			},
			// 平台分类弹窗选择确认
			platformConfirm(e) {
				this.from.platform = e.id
				this.platformName = e.name
			},

			// 选择服务项目
			projectOpen() {
				this.isProject = true
			},
			// 服务项目关闭弹窗
			projectPopup(e) {
				this.isProject = e
			},
			// 服务项目弹窗选择确认
			projectConfirm(e) {
				this.from.service = e.id
				this.projectName = e.name
			},

			// 选择技师等级
			gradeOpen() {
				this.isGrade = true
			},
			// 技师等级关闭弹窗
			gradePopup(e) {
				this.isGrade = e
			},
			// 技师等级弹窗选择确认
			gradeConfirm(e) {
				this.from.grade = e.id
				this.gradeName = e.name
			},

			// 选择工作时间表
			timeOpen() {
				this.isTime = true
			},
			// 工作时间表关闭弹窗
			timePopup(e) {
				this.isTime = e
			},
			// 工作时间表弹窗选择确认
			timeConfirm(e) {
				this.from.schedule = e.id
				this.timeName = e.name
			},


			// 选择用户
			userOpen() {
				this.isUser = true
			},
			// 用户关闭弹窗
			userPopup(e) {
				this.isUser = e
			},
			// 用户弹窗选择确认
			userConfirm(e) {
				this.from.uid = e.id
				this.userName = e.name
			},

			// 状态
			stateOpen() {
				this.isState = true
			},
			// 状态关闭弹窗
			statePopup(e) {
				this.isState = e
			},
			// 状态弹窗选择确认
			stateConfirm(e) {
				this.from.status = e.state
				this.stateName = e.name
			},


			// 是否会开车点击
			currency(bool) {
				this.isCurr = bool ? true : false
				this.from.drive_card = this.isCurr ? 1 : -1
			},
			// 确认提交按钮
			confirmAdd() {
				var vuedata = {
					store: this.from.store, //门店id
					store_cid: this.from.storeCategory, //门店分类id
					name: this.from.name, //技师名称
					cid: this.from.platform, //技师分类ID
					mobile: this.from.mobile, //手机号
					email: this.from.email, //邮箱
					service: this.from.service, //服务项目
					Language_skills: this.from.Language_skills, //语言
					drive_card: this.from.drive_card, //是否会开车
					level: this.from.grade, //技师等级id
					service_times: this.from.service_times, //工龄
					license_id: this.from.license_id, //执照id
					license_img: this.from.license_img, //执照图片
					simg: this.from.simg, //工作照片
					service_fee: this.from.service_fee, //项目服务费
					fee: this.from.fee, //技师提成
					schedule: this.from.schedule, // 工作时间表
					uid: this.from.uid, // 选择用户
					status: this.from.status, //状态
					ordersort: this.from.ordersort, //排序
					content: this.from.content, //详情
				}
				console.log(vuedata)

				// return false;
				this.apipost('api/v1/store/engineer/add', vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddTechhnician', true)
						uni.showToast({
							title: "技师添加成功",
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
					store_cid: this.from.storeCategory, //门店分类id
					name: this.from.name, //技师名称
					cid: this.from.platform, //技师分类ID
					mobile: this.from.mobile, //手机号
					email: this.from.email, //邮箱
					service: this.from.service, //服务项目
					Language_skills: this.from.Language_skills, //语言
					drive_card: this.from.drive_card, //是否会开车
					level: this.from.grade, //技师等级id
					service_times: this.from.service_times, //工龄
					license_id: this.from.license_id, //执照id
					license_img: this.from.license_img, //执照图片
					simg: this.from.simg, //工作照片
					service_fee: this.from.service_fee, //项目服务费
					fee: this.from.fee, //技师提成
					schedule: this.from.schedule, // 工作时间表
					status: this.from.status, //状态
					ordersort: this.from.ordersort, //排序
					content: this.from.content, //详情
				}
				this.apiput('api/v1/store/engineer/edit/' + this.id, vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddTechhnician', true)
						uni.showToast({
							title: "技师修改成功",
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

			// 上传工作照片
			upImage() {
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

			// 上传执照照片
			licenseImg() {
				uni.chooseImage({
					count: 1, //默认100
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						pathToBase64(res.tempFilePaths[0]).then((data) => {
							this.from.license_img = data
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
										this.from.license_img = result
									});
								}
							});
						})
					}
				});
			},

			// 获取详情
			getDetails(id) {
				this.apiget('api/v1/store/engineer/' + id, {}).then(res => {
					if (res.status == 200) {
						var data = res.data.member
						this.from.store = data.store
						this.from.storeCategory = data.store_cid
						this.from.platform = data.cid
						this.from.name = data.name
						this.from.mobile = data.mobile
						this.from.email = data.mail
						this.from.service = data.service
						this.from.Language_skills = data.Language_skills
						this.from.drive_card = data.drive_card
						this.from.grade = data.level
						this.from.service_times = data.service_times
						this.from.license_id = data.license_id
						this.from.license_img = data.license_img
						this.from.simg = data.simg
						this.from.service_fee = data.service_fee
						this.from.fee = data.fee
						this.from.schedule = data.schedule
						this.from.status = data.status
						this.from.ordersort = data.sort
						this.from.content = data.content

						this.storeList.forEach(item => {
							if (item.id == data.store) {
								this.storeName = item.name
							}
						})

						this.storeCategoryList.forEach(item => {
							if (item.id == data.store_cid) {
								this.storeCategoryName = item.name
							}
						})
						this.platformList.forEach(item => {
							if (item.id == data.cid) {
								this.platformName = item.name
							}
						})

						this.projectList.forEach(item => {
							if (item.id == data.service) {
								this.projectName = item.name
							}
						})
						this.gradeList.forEach(item => {
							if (item.id == data.level) {
								this.gradeName = item.name
							}
						})

						this.isCurr = data.drive_card == 1 ? true : false

						this.timeList.forEach(item => {
							if (item.id == data.schedule) {
								this.timeName = item.name
							}
						})


						this.stateList.forEach(item => {
							if (item.state == data.status) {
								this.stateName = item.name
							}
						})

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
			// 获取门店类别
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
					type: 12
				}).then(res => {
					if (res.status == 200) {
						this.platformList = res.data
					}
				});
			},
			// 获取服务项目
			getProject() {
				this.apiget('pc/reserve', {}).then(res => {
					if (res.status == 200) {
						this.projectList = res.data.reserveList
					}
				});
			},
			// 获取技师等级
			getGrad() {
				this.apiget('pc/category/category_type', {
					type: 6
				}).then(res => {
					if (res.status == 200) {
						this.gradeList = res.data
					}
				});
			},
			// 获取时间表
			getTimeTable() {
				this.apiget('api/v1/store/engineer/schedule', {}).then(res => {
					if (res.status == 200) {
						this.timeList = res.data
					}
				});
			},
			// 获取用户
			getUser() {
				this.apiget('api/v1/store/engineer/member_info', {}).then(res => {
					if (res.status == 200) {
						this.userList = res.data
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
						width: 140rpx;
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

						.input-border {
							height: 60rpx;
							margin: 0 20rpx;
							border: 1rpx solid #EDEDED;

							input {
								text-align: center;
							}
						}


						.box-content-list-li-info-msg {
							font-size: 28rpx;
							color: #333;
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

				.box-content-list-item {
					padding: 30rpx 0;
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid #ededed;

					.box-content-list-item-text {
						width: 140rpx;
						font-size: 28rpx;
						color: #333;

						text {
							font-size: 24rpx;
							color: #999;
						}
					}

					.box-content-list-item-info {
						flex: 1;
						margin-left: 80rpx;

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

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
		}
	}
</style>
