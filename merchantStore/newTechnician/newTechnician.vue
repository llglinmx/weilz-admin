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
							<input type="text" placeholder="多种语言使用“；”间隔" />
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
							<input type="number" placeholder="请输入工龄" />
							<text>年</text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">执照ID</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入执照ID" />
						</view>
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-text">
						执照<text>(100*100)</text>
					</view>
					<view class="box-content-list-item-info">
						<view class="box-content-list-item-info-icon flex-center">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 50rpx;"></text>
						</view>
						<!-- <image src="box-content-list-item-info-image" mode=""></image> -->
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-text">
						工作照片<text>(110*80)</text>
					</view>
					<view class="box-content-list-item-info">
						<view class="box-content-list-item-info-icon flex-center">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 50rpx;"></text>
						</view>
						<!-- <image src="box-content-list-item-info-image" mode=""></image> -->
					</view>
				</view>
			</view>
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">项目服务费</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text" style="color: #999;">项目金额的</view>
						<view class="box-content-list-li-info-input input-border">
							<input type="number" value="" />
						</view>
						<view class="box-content-list-li-info-msg">%</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">技师提成</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text" style="color: #999;">消费金额的</view>
						<view class="box-content-list-li-info-input input-border">
							<input type="number" value="" />
						</view>
						<view class="box-content-list-li-info-msg">%</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">工作时间表</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择工作时间表</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">用户绑定</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择用户</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">状态</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择状态</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">排序</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择排序</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">详情</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入详情" />
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

	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	import popupListSelect from '../../components/popup-list-select/popup-list-select.vue'
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
				storeList: [],
				storeCategoryList: [],
				platformList: [],
				projectList: [],
				gradeList: [],
				storeCategoryName: '',
				storeName: '',
				platformName: '',
				projectName: '',
				gradeName: '',
				from: {
					name: '',
					store: '',
					storeCategory: '',
					platform: '',
					project: '',
					grade: '',
					simg: '',
					mobile: '',
					email: '',
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

			var data = JSON.parse(options.data)
			if (data.type == 'add') {
				this.id = data.storeId
				this.type = 'add'
			} else if (data.type == 'edit') {
				this.type = 'edit'
				this.getDetails(data.id)
			}


			this.getStore()
			this.getStoreCategory()
			this.getPlatform()
			this.getProject()
			this.getGrad()
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
				this.from.project = e.id
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

			// 是否会开车点击
			currency(bool) {
				this.isCurr = bool ? true : false
			},
			// 确认提交按钮
			confirmAdd() {
				var vuedata = {
					store: this.id,
					name: this.from.name,
					simg: this.from.simg,
					cid: this.from.platform,
					store_cid: this.from.store,
					level: this.from.grade,
					mobile: this.from.mobile,
					email: this.from.email,
					service: this.from.projectName,
				}
				console.log(vuedata)

				return false;
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
				return false;
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



			// 获取详情
			getDetails(id) {

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
					type: 11
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
