<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="title"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">门店</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{storeName==''?'请选择门店':storeName}}</view>

					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">职位名称</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.position" placeholder="请输入职位名称" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="categoryOpen">
					<view class="box-content-list-li-title">职位类别</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{categoryName==''?'请选择类别':categoryName}}</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">招聘人数</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.recruitsNnumber" placeholder="请输入招聘人数" />
							<text>人</text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">薪资</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.salary" class="input-box" placeholder="底薪/元" />
							<text class="iconfont iconjia icon-font"
								style="color: #999;font-size: 28rpx;margin: 0 10rpx;"></text>
							<input type="number" v-model.trim="from.fee" class="input-box" placeholder="抽成/项目" />
							<text>%</text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li" @click="workingOpen">
					<view class="box-content-list-li-title">工龄</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text" v-if="from.serviceYear==''">不限</view>
						<view class="box-content-list-li-info-text" v-if="from.serviceYear!=''">{{from.serviceYear}}
						</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">工作地点</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.placeWork" placeholder="州、市" />
						</view>
					</view>
				</view>

				<view class="box-content-list-menu">
					<view class="box-content-list-menu-title">岗位福利</view>
					<view class="box-content-list-menu-info">
						<view class="box-content-list-menu-info-item" @click="selectWelfare(index)"
							v-for="(item,index) in menuList" :key="index">
							<text class="iconfont iconxuanzhong2 icon-font"
								style="color: #07C160;font-size: 40rpx;margin-top: 4rpx;" v-if="item.isCheck"></text>
							<text class="iconfont iconweixuanzhong icon-font"
								style="color: #B2B2B2;font-size: 40rpx;margin-top: 4rpx;" v-if="!item.isCheck"></text>
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
				<view class="box-content-list-menu">
					<view class="box-content-list-menu-title">学历要求</view>
					<view class="box-content-list-menu-info">
						<view class="box-content-list-menu-info-item" v-for="(item,index) in education"
							@click="educationClick(index)">
							<text class="iconfont iconxuanzhong2 icon-font"
								style="color: #07C160;font-size: 40rpx;margin-top: 4rpx;" v-if="item.isCheck"></text>
							<text class="iconfont iconweixuanzhong icon-font"
								style="color: #B2B2B2;font-size: 40rpx;margin-top: 4rpx;" v-if="!item.isCheck"></text>
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>

				<view class="box-content-list-li-item">
					<view class="box-content-list-li-item-title">职位描述</view>
					<view class="box-content-list-li-item-textarea">
						<textarea value="" v-model="from.positionInformation" placeholder="请输入描述" />
					</view>
				</view>
			</view>
			<view class="box-content-list">

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">联系人</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model="from.contacts" placeholder="请输入联系人" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">联系电话</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model="from.contactInformation" placeholder="请输入联系电话" />
							<view style="display: flex;align-items: center;" @click="isItOpen">
								<text class="iconfont iconxuanzhong2 icon-font"
									style="color: #07C160;font-size: 40rpx;margin-top: 4rpx;" v-if="isShow"></text>
								<text class="iconfont iconweixuanzhong icon-font"
									style="color: #B2B2B2;font-size: 40rpx;margin-top: 4rpx;" v-if="!isShow"></text>
								<text>公开</text>
							</view>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">邮箱</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model="from.contactsEmail" placeholder="请输入邮箱" />
						</view>
					</view>
				</view>
			</view>
			<view class="box-content-text">
				注：格式参考 username@mail.com，应聘简历将会同时被投递到您在此处填写的邮箱
			</view>
		</view>
		<view class="box-footer">
			<!-- <view class="box-footer-btn-del flex-center">取消</view> -->
			<btn-sky-blue btnName='发布' @btnClick='release'  v-if="!isEdit"/>
			<btn-sky-blue btnName='修改' @btnClick='modify' v-if="isEdit" />
		</view>
		<popup-list-select @cancel="categoryCancel" @confirm="categoryConfirm" :visible='isCategory'
			:dataList="categoryList" />
		<popup-list-select @cancel="workingCancel" @confirm="workingConfirm" :visible='isWorking'
			:dataList="workingYearsList" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				title: '',
				isEdit: false, //是否编辑进入
				id: '',
				isShow: false, //是否公开
				storeName: '',
				menuList: [{
						text: '五险一金',
						isCheck: false
					},
					{
						text: '包住',
						isCheck: false
					},
					{
						text: '包吃',
						isCheck: false
					},
					{
						text: '年底双薪',
						isCheck: false
					},
					{
						text: '周末双休',
						isCheck: false
					},
					{
						text: '交通补助',
						isCheck: false
					},
					{
						text: '加班补助',
						isCheck: false
					},
					{
						text: '饭补',
						isCheck: false
					},
					{
						text: '话补',
						isCheck: false
					},
					{
						text: '房补',
						isCheck: false
					}
				],
				education: [{
						text: '不限',
						isCheck: false,
						id: 1,
					},
					{
						text: '高中',
						isCheck: false,
						id: 2,
					},
					{
						text: '技校',
						isCheck: false,
						id: 3,
					},
					{
						text: '中专',
						isCheck: false,
						id: 4,
					},
					{
						text: '大专',
						isCheck: false,
						id: 5,
					},
					{
						text: '本科',
						isCheck: false,
						id: 6,
					},
					{
						text: '应届生',
						isCheck: false,
						id: 7,
					}
				],
				from: {
					store: '', //门店id
					position: '', //职位
					psId: '', //职位类别
					recruitsNnumber: '', //招聘人数
					salary: '', //薪资
					fee: '', //提成
					serviceYear: '', //工龄
					placeWork: '', //工作地点
					positionBenefits: '', //岗位福利
					education: '', //学历要求
					positionInformation: '', //岗位描述
					contacts: '', //联系人
					contactInformation: '', //联系方式
					contactsEmail: '', //邮箱
				},
				storeList: [],
				visible: false,
				isCategory: false,
				categoryName: '',
				categoryList: [],
				workingYearsList: [{
						name: '不限',
						id: 0
					},
					{
						name: '1-2年',
						id: 4
					},
					{
						name: '2-4 年',
						id: 3
					},
					{
						name: '5-8年',
						id: 2
					},
					{
						name: '10年以上',
						id: 1
					}
				],
				isWorking: false,
			};
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
			var data = JSON.parse(options.data)


			if (data.type == 'edit') {
				this.getDetails(data.id)
				this.title = "编辑招聘"
				this.isEdit = true
				this.id = data.id
			} else {
				this.from.store = data.store
				this.title = "发布新招聘"
			}

			this.getStore()

		},
		methods: {


			// 发布按钮
			release() {
				var vuedata = {
					store: this.from.store,
					position: this.from.position,
					ps_id: this.from.psId,
					recruits_number: this.from.recruitsNnumber,
					salary: this.from.salary,
					fee: this.from.fee,
					service_year: this.from.serviceYear,
					place_work: this.from.placeWork,
					position_benefits: this.from.positionBenefits,
					education: this.from.education,
					position_information: this.from.positionInformation,
					contacts: this.from.contacts,
					contact_information: this.from.contactInformation,
					contacts_email: this.from.contactsEmail,
				}
				this.apipost('api/v1/store/recruitment/add', vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit("upAdd", true)
						uni.showToast({
							title: "发布成功",
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					}
				});

				// console.log(vuedata)
			},

			// 修改按钮
			modify() {
				var vuedata = {
					store: this.from.store,
					position: this.from.position,
					ps_id: this.from.psId,
					recruits_number: this.from.recruitsNnumber,
					salary: this.from.salary,
					fee: this.from.fee,
					service_year: this.from.serviceYear,
					place_work: this.from.placeWork,
					position_benefits: this.from.positionBenefits,
					education: this.from.education,
					position_information: this.from.positionInformation,
					contacts: this.from.contacts,
					contact_information: this.from.contactInformation,
					contacts_email: this.from.contactsEmail,
				}
				this.apiput('api/v1/store/recruitment/edit/' + this.id, vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit("upAdd", true)
						uni.showToast({
							title: "修改成功",
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					}
				});
			},


			// 选择福利待遇
			selectWelfare(index) {
				var arr = []
				this.menuList[index].isCheck = !this.menuList[index].isCheck

				this.menuList.map(item => {
					if (item.isCheck) {
						arr.push(item.text)
					}
				})
				this.from.positionBenefits = arr.join(',')
			},

			// 选择学历
			educationClick(index) {
				// 先把所有的都变为false  然后通过下标修改状态
				this.education.forEach(item => {
					item.isCheck = false
				})
				this.education[index].isCheck = true

				// 循环 判断选中的学历信息
				this.education.forEach(item => {
					if (item.isCheck) {
						this.from.education = item.id
					}
				})

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
				this.from.psId = e.id
				this.categoryName = e.name
			},
			// 选择工龄点击
			workingOpen() {
				this.isWorking = true
			},
			//工龄取消按钮
			workingCancel(e) {
				this.isWorking = e
			},
			// 工龄确定按钮
			workingConfirm(e) {
				this.from.serviceYear = e.name
			},

			// 是否公开
			isItOpen() {
				this.isShow = !this.isShow
			},

			// 获取门店列表
			getStore() {
				this.apiget('api/v1/store/store_information', {
					each_page: 50
				}).then(res => {
					if (res.status == 200) {
						this.storeList = res.data.member
						res.data.member.forEach(item => {
							if (item.id == this.from.store) {
								this.storeName = item.name
							}
						})
					}
				});
			},
			// 获取类别
			getCategory() {
				this.apiget('pc/category/category_type', {
					type: 12
				}).then(res => {
					if (res.status == 200) {
						this.categoryList = res.data
					}
				});
			},

			// 获取详情   编辑状态下
			getDetails(id) {
				this.apiget('api/v1/store/recruitment/' + id, {}).then(res => {
					if (res.status == 200) {
						this.from.contacts = res.data.data.contacts
						this.from.positionInformation = res.data.data.position_information
						this.from.placeWork = res.data.data.place_work
						this.from.salary = res.data.data.salary
						this.from.fee = res.data.data.fee
						this.from.recruitsNnumber = res.data.data.recruits_number
						this.from.serviceYear = res.data.data.service_year
						this.from.position = res.data.data.position
						this.from.positionBenefits = res.data.data.position_benefits
						this.from.education = res.data.data.education
						this.from.contactInformation = res.data.data.contact_information
						this.from.contactsEmail = res.data.data.contacts_email
						this.from.store = res.data.data.store
						this.from.psId = res.data.data.ps_id


						this.storeList.map(item => {
							if (item.id == res.data.data.store) {
								this.storeName = item.names
							}
						})

						// 职位类别
						this.categoryList.forEach(item => {
							if (item.id == res.data.data.ps_id) {
								this.categoryName = item.name
							}
						})

						// 福利
						var arr = res.data.data.position_benefits.split(',') //以逗号切割 循环判断选中的内容

						this.menuList.forEach(item => {
							arr.forEach(res => {
								if (item.text == res) {
									item.isCheck = true
								}
							})
						})


						// 学历
						this.education.forEach(item => {
							if (item.id == res.data.data.education) {
								item.isCheck = true
							}
						})
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

							.input-box {
								width: 188rpx;
								height: 58rpx;
								border: 1rpx solid #EDEDED;
								text-align: center;
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
						height: 300rpx;
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

				.box-content-list-menu {
					display: flex;
					padding: 30rpx 0 0;
					border-bottom: 1rpx solid #ededed;

					.box-content-list-menu-title {
						width: 140rpx;
						font-size: 28rpx;
						color: #333;
					}

					.box-content-list-menu-info {
						margin-left: 80rpx;
						flex: 1;
						display: flex;
						flex-wrap: wrap;

						.box-content-list-menu-info-item {
							margin-right: 40rpx;
							margin-bottom: 30rpx;
							display: flex;
							align-items: center;
							font-size: 28rpx;
							color: #000;

							.icon-font {
								margin-right: 10rpx;
							}
						}
					}
				}

			}

			.box-content-text {
				padding: 20rpx 40rpx 0;
				box-sizing: border-box;
				font-size: 24rpx;
				color: #999;
			}
		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.box-footer-btn-del {
				width: 318rpx;
				height: 78rpx;
				background: #F7F7F7;
				border: 1rpx solid #666666;
				border-radius: 10rpx;
				font-size: 32rpx;
				color: #666;
			}

			.box-footer-btn-edit {
				width: 320rpx;
				height: 80rpx;
				background: #5DBDFE;
				border-radius: 10rpx;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
</style>
