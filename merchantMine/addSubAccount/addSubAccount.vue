<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="添加子账号"></nav-title-balck>
		</view>
		<view class="box-content">

			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">用户名</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入用户名" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">密码</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" password="true" placeholder="请输入密码" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">重复密码</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" password="true" placeholder="请再次输入密码" />
						</view>
					</view>
				</view>
			</view>

			<view class="box-content-main">
				<view class="box-content-main-top">
					<view class="box-content-main-top-title">管理门店</view>
					<view class="box-content-main-top-add flex-center" @click="addStoreMenu">
						<text class="iconfont iconcuowu icon-font" style="color: #ccc;font-size: 36rpx"></text>
					</view>
				</view>
				<view class="box-content-store-list">
					<view class="box-content-store-list-li" v-for="(item,index) in dataList" :key="index">
						<view class="box-content-store-list-li-info">
							<view class="store-list-li-info-text">请选择门店</view>
							<view class="store-list-li-info-more">
								<text class="iconfont icongengduo icon-font"
									style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
							</view>
						</view>
						<view class="box-content-store-list-li-delete" @click="storeDeleteClick(index)">
							<text class="iconfont iconshanchu-shangjia icon-font"
								style="color: #ccc;font-size: 48rpx"></text>
						</view>
					</view>
				</view>
			</view>

			<view class="box-content-main-jurisdiction">
				<view class="box-content-main-jurisdiction-top">
					<view class="box-content-main-jurisdiction-top-title">权限</view>
					<view class="box-content-main-jurisdiction-top-check" @click="selectAll">
						<text class="iconfont iconweixuanzhong icon-font"
							style="color:#B2B2B2;font-size: 40rpx;margin-top: 4rpx;" v-if="!isAll"></text>
						<text class="iconfont iconxuanzhong2 icon-font"
							style="color:#07C160;font-size: 40rpx;margin-top: 4rpx;" v-if="isAll"></text>
						<text>全选</text>
					</view>
				</view>
				<view class="box-content-main-jurisdiction-list">
					<view class="box-content-main-jurisdiction-list-li" v-for="(item,index) in arrList" :key="index">
						<view class="jurisdiction-list-li-box">
							<view class="jurisdiction-list-li-box-title">{{item.title}}</view>
							<view class="jurisdiction-list-li-box-wrap">
								<!-- <view class="jurisdiction-list-li-box-wrap-item">
									<text class="iconfont iconweixuanzhong icon-font"
										style="color:#B2B2B2;font-size: 40rpx;margin-top: 4rpx;"
										v-if="!item.isAllCheck"></text>
									<text class="iconfont iconxuanzhong2 icon-font"
										style="color:#07C160;font-size: 40rpx;margin-top: 4rpx;"
										v-if="item.isAllCheck"></text>
									<text>全选</text>
								</view> -->
								<view class="jurisdiction-list-li-box-wrap-item" v-for="(i,j) in item.data" :key="j"
									@click="permissionSelection(index,j)">
									<text class="iconfont iconweixuanzhong icon-font"
										style="color:#B2B2B2;font-size: 40rpx;margin-top: 4rpx;"
										v-if="!i.isCheck"></text>
									<text class="iconfont iconxuanzhong2 icon-font"
										style="color:#07C160;font-size: 40rpx;margin-top: 4rpx;"
										v-if="i.isCheck"></text>
									<text>{{i.text}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>


			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">有效时间</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择时间</view>
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
							<input type="text" placeholder="请输入姓名" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">身份证</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入身份证号" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">手机号</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入手机号" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">公司名</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入公司名称" />
						</view>
					</view>
				</view>

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">工卡ID</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入工卡ID" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">状态</view>
					<view class="box-content-list-li-info">
						<switch :checked="isState" @change="switch1Change" color="#07C160" />
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue btnName="确认添加" @btnClick="confirm" />
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import btnSkyBlue from "../../components/btn-sky-blue/btn-sky-blue.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				isState: false, //状态		
				isAll: false, //是否全选
				dataList: [{
					title: "请选择门店"
				}],
				checkList: [],
				arrList: []
			};
		},
		components: {
			navTitleBalck,
			btnSkyBlue
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
			this.getPermission()
		},
		methods: {
			// switch 开关
			switch1Change: function(e) {
				this.isState = e.target.value
				console.log('发生 change 事件，携带值为', e.target.value)
			},

			// 添加选择门店
			addStoreMenu() {
				let str = {
					title: "请输入门店"
				}
				// Object.assign(title:"请输入门店")
				if (this.dataList.length >= 5) {
					uni.showToast({
						title: "最大只能添加5个门店",
						icon: "none"
					})
					return;
				}
				this.dataList.splice(this.dataList.length, 1, str)
			},
			// 选择门店删除
			storeDeleteClick(index) {
				if (this.dataList.length != 1) {
					this.dataList.splice(index, 1)
				} else {
					uni.showToast({
						title: "不能再删了，最少一个",
						icon: "none"
					})
				}
			},

			// 全选
			selectAll() {

				this.isAll = !this.isAll

				if (this.isAll) {
					this.arrList.forEach(item => {
						item.isAllCheck = true
						item.data.forEach(res => {
							res.isCheck = true
							res.value = 1
						})
					})
				} else {
					this.arrList.forEach(item => {
						item.isAllCheck = false
						item.data.forEach(res => {
							res.isCheck = false
							res.value = -1
						})
					})
				}

			},
			// 权限选择
			permissionSelection(index, idx) {
				if (this.arrList[index].data[idx].text == "全选") {
					this.arrList[index].isAllCheck = !this.arrList[index].isAllCheck
					this.arrList[index].data.forEach(item => {
						item.isCheck = this.arrList[index].isAllCheck ? true : false
					})
				} else {
					this.arrList[index].data[idx].isCheck = !this.arrList[index].data[idx].isCheck;
					this.arrList[index].data[idx].value = this.arrList[index].data[idx].isCheck ? 1 : -1


					this.arrList[index].data[0].isCheck = true //判断单行是否全选 
					this.arrList[index].data.forEach(item => {
						this.arrList[index].data[0].isCheck = item.isCheck && this.arrList[index].data[0].isCheck
					})
				}
				this.isAll = true //判断全部是否全选
				this.arrList.forEach(item => {
					item.data.forEach(res => {
						this.isAll = res.isCheck && this.isAll
					})
				})
			},


			// 确认按钮
			confirm() {
				uni.showToast({
					title: "确认添加",
					icon: "none"
				})
			},

			// 获取权限列表
			getPermission(num, size) {
				this.apiget('api/v1/store/admin/limit', {}).then(res => {
					if (res.status == 200) {
						let permissionsList = res.data.limit;
						this.checkList = permissionsList.map((item) => {
							let obj = {
								value: -1,
								isAllCheck: false,
								title: item.name
							};
							let arr = Object.entries(item.list);
							obj.data = arr.map((val) => {
								return {
									value: -1,
									isCheck: false,
									field: val[0],
									text: val[1]
								};
							});
							var str = {
								value: -1,
								isCheck: false,
								field: 'all',
								text: '全选'
							}
							obj.data.splice(0, 0, str)
							// console.log("obj",obj);
							return obj;
						});
						this.arrList = this.checkList
						console.log(this.checkList)
					}
				})
			}
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
			}

			.box-content-main-jurisdiction {
				margin-top: 20rpx;
				background: #fff;

				.box-content-main-jurisdiction-top {
					height: 100rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 40rpx;
					box-sizing: border-box;
					font-size: 28rpx;

					.box-content-main-jurisdiction-top-title {
						color: #333;
					}

					.box-content-main-jurisdiction-top-check {
						display: flex;
						align-items: center;
						color: #000;

						.icon-font {
							margin-right: 10rpx;
						}
					}
				}

				.box-content-main-jurisdiction-list {
					padding-left: 40rpx;
					box-sizing: border-box;

					.box-content-main-jurisdiction-list-li:first-child {
						border-top: 1rpx solid #ededed;
					}

					.box-content-main-jurisdiction-list-li:last-child {
						border-bottom: 0;
					}

					.box-content-main-jurisdiction-list-li {
						padding: 30rpx 0;
						padding-right: 30rpx;
						box-sizing: border-box;
						border-bottom: 1rpx solid #ededed;

						.jurisdiction-list-li-box {
							.jurisdiction-list-li-box-title {
								margin-bottom: 30rpx;
								font-size: 28rpx;
								color: #333;
							}

							.jurisdiction-list-li-box-wrap {
								display: flex;
								flex-wrap: wrap;

								.jurisdiction-list-li-box-wrap-item {
									display: flex;
									align-items: center;
									margin-bottom: 20rpx;
									margin-right: 20rpx;
									font-size: 28rpx;
									color: #000;

									.icon-font {
										margin-right: 10rpx;
									}
								}
							}
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

				.box-content-store-list {
					padding-bottom: 40rpx;

					.box-content-store-list-li {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 40rpx;
						padding-right: 40rpx;
						box-sizing: border-box;

						.box-content-store-list-li-info {
							display: flex;
							align-items: center;

							.store-list-li-info-text {
								font-size: 28rpx;
								color: #000;
							}

							.store-list-li-info-more {
								margin-left: 20rpx;
							}
						}

						.box-content-store-list-li-delete {}
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
