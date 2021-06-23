<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="type=='add'?'添加房间':'编辑房间'"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">房间号</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.room_num" placeholder="请输入房间号" />
						</view>
					</view>
				</view>

				<view class="box-content-list-li" @click="roomOpen">
					<view class="box-content-list-li-title">房间类型</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">{{roomName==''?'请选择房间类型':roomName}}</view>
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
							<input type="number" v-model.trim="from.sort" placeholder="请输入排序" />
						</view>
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-text">
						使用图标<text>(100*100)</text>
					</view>
					<view class="box-content-list-item-info">
						<view class="box-content-list-item-info-icon flex-center" v-if="from.icon==''"
							@click="upImg('use')">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 50rpx;"></text>
						</view>
						<image :src="from.useIco" v-if="from.icon!=''" class="box-content-list-item-info-image"
							mode="aspectFill"></image>
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-text">
						故障图标<text>(100*100)</text>
					</view>
					<view class="box-content-list-item-info">
						<view class="box-content-list-item-info-icon flex-center" v-if="from.icon==''"
							@click="upImg('fault')">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 50rpx;"></text>
						</view>
						<image :src="from.faultIco" v-if="from.icon!=''" class="box-content-list-item-info-image"
							mode="aspectFill"></image>
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-text">
						预约图标<text>(100*100)</text>
					</view>
					<view class="box-content-list-item-info">
						<view class="box-content-list-item-info-icon flex-center" v-if="from.icon==''"
							@click="upImg('reserve')">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 50rpx;"></text>
						</view>
						<image :src="from.reserveIco" v-if="from.icon!=''" class="box-content-list-item-info-image"
							mode="aspectFill"></image>
					</view>
				</view>
				<view class="box-content-list-item">
					<view class="box-content-list-item-text">
						空闲图标<text>(100*100)</text>
					</view>
					<view class="box-content-list-item-info">
						<view class="box-content-list-item-info-icon flex-center" v-if="from.icon==''"
							@click="upImg('free')">
							<text class="iconfont icontupian icon-font" style="color: #fff;font-size: 50rpx;"></text>
						</view>
						<image :src="from.freeIco" v-if="from.icon!=''" class="box-content-list-item-info-image"
							mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="box-footer-btn-cancel flex-center">取消</view>
			<view class="box-footer-btn-confirm flex-center" @click="addRoom">确定</view>
		</view>
		<popup-list-select :skid='from.type_id' @cancel="roomCancel" @confirm="roomConfirm" :visible='visible'
			:dataList="roomList">
		</popup-list-select>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
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
				visible: false,
				roomList: [],
				roomName: '',
				from: {
					icon: '', //图标
					type_id: '', //房间类型id
					room_num: '', //房间号
					sort: '', //排序
					useIco: '', //使用图标
					faultIco: '', //故障图标
					reserveIco: '', //预约图标
					freeIco: '', //空闲图标
				}
			};
		},
		components: {
			navTitleBalck,
			popupListSelect
		},
		onLoad(options) {
			var data = JSON.parse(options.data)
			this.id = data.id

			this.getType()

			if (data.type == 'add') {
				this.type = 'add'
			} else {
				this.type = 'edit'
				this.getDetails(data.id)
			}

		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		methods: {

			// 选择房间类型
			roomOpen() {
				this.visible = true
			},
			// 房间类型关闭弹窗
			roomCancel(e) {
				this.visible = e
			},
			// 房间类型弹窗选择确认
			roomConfirm(e) {
				this.from.type_id = e.id
				this.roomName = e.name
			},



			// 上传房间照片
			upImg(type) {
				uni.chooseImage({
					count: 1, //默认100
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						pathToBase64(res.tempFilePaths[0]).then((data) => {
							switch (type) {
								case 'use':
									this.from.useIco = data
									break;
								case 'fault':
									this.from.faultIco = data
									break;
								case 'reserve':
									this.from.reserveIco = data
									break;
								case 'free':
									this.from.freeIco = data
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
											case 'use':
												this.from.useIco = result
												break;
											case 'fault':
												this.from.faultIco = result
												break;
											case 'reserve':
												this.from.reserveIco = result
												break;
											case 'free':
												this.from.freeIco = result
												break;
										}
									});
								}
							});
						})
					}
				});
			},

			// 添加房间
			addRoom() {
				var arr = [{
						color: '#26BF82',
						roomType: 'use',
						ico: this.from.useIco
					},
					{
						color: '#5DBDFE',
						roomType: 'fault',
						ico: this.from.faultIco
					},
					{
						color: '#FF7167',
						roomType: 'reserve',
						ico: this.from.reserveIco
					},
					{
						color: '#B3B3B3',
						roomType: 'free',
						ico: this.from.freeIco
					},
				]
				var vuedata = {
					room_num: this.from.room_num, //房间号
					type_id: this.from.type_id, //房间类型id
					sort: this.from.sort, //排序
					status_icon: JSON.stringify(arr)
				}
				this.apipost('api/v1/store/room_management/add?store_id=' + this.id, vuedata).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddRoom', true)
						uni.showToast({
							title: "房间添加成功",
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
			// 获取房间类型
			getType() {
				let vuedata = {
					page_index: 1, // 请求页数，
					each_page: 50, // 请求条数
					store_id: this.id,
				}
				this.apiget('api/v1/store/room_category', vuedata).then(res => {
					if (res.status == 200) {
						this.roomList = res.data.room_cate
					}
				});
			},
			// 获取房间详情
			getDetails(id) {
				let vuedata = {
					
				}
				this.apiget('api/v1/store/room_management/'+id, vuedata).then(res => {
					if (res.status == 200) {
						
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
						width: 120rpx;
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

						.box-content-list-li-info-input {
							input {
								font-size: 28rpx;
							}
						}

						.box-content-list-li-info-more {}
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
			display: flex;
			align-items: center;
			justify-content: space-between;

			.box-footer-btn-cancel {
				width: 318rpx;
				height: 78rpx;
				background: #F7F7F7;
				border: 1rpx solid #666666;
				border-radius: 10rpx;
				font-size: 32rpx;
				color: #666;
			}

			.box-footer-btn-confirm {
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
