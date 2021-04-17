<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="账号详情"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li" v-for="(item,index) in arrList" :key="index"
					@click="index==1&&showStore()">
					<view class="box-content-list-li-title">{{item.title}}</view>
					<view class="box-content-list-li-text" :style="{color:index==arrList.length-1?'#5DBDFE':'#000'}">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="box-footer-btn-del flex-center" @click="deleteAccount">删除</view>
			<view class="box-footer-btn-edit flex-center" @click="editAccount">修改</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" mode='base' title="警告" content="你确定要删除该账号吗" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	import UniPopup from "../../components/uni-popup/uni-popup.vue"
	import UniPopupDialog from "../../components/uni-popup/uni-popup-dialog.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				id: '',
				storeList: [],
				arrList: [{
						title: '用户名',
						text: 'w40052'
					},
					{
						title: '管理门店',
						text: '0'
					},
					{
						title: '姓名',
						text: '郑小小'
					},
					{
						title: '手机号',
						text: '13859682589'
					},
					{
						title: '公司名称',
						text: '厦门SPA服务有限公司'
					},

					{
						title: '权限',
						text: '管理员'
					},
					{
						title: '状态',
						text: '正常'
					},
				],
			};
		},
		components: {
			navTitleBalck,
			UniPopup,
			UniPopupDialog
		},
		onLoad(options) {
			this.getDetails(options.id)
			this.id = options.id
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
			//修改
			editAccount() {
				this.$store.commit('upAddAccount', false)
				var str = {
					type: 'edit',
					id: this.id
				}
				uni.navigateTo({
					url: "../addSubAccount/addSubAccount?data=" + JSON.stringify(str)
				})
			},
			// 删除
			deleteAccount() {
				this.$refs.popup.open()
			},
			// 弹窗点击取消
			close(done) {
				done()
			},

			// 点击管理门店显示
			showStore() {
				var str = ''
				this.storeList.forEach(item => {
					str += item.name + ','
				})
				
				str = str.substring(0, str.length - 1);//去掉最后一个字符
				
				uni.showModal({
					title: '管理门店',
					content: str,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				});
			},


			// 弹窗点击确认
			confirm(done, value) {
				this.apidelte('api/v1/store/admin/del/' + this.id, {}).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddAccount', true)
						uni.showToast({
							title: "账号删除成功",
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 500)
					}
					done()
				});
			},

			// 获取账号详情
			getDetails(id) {
				this.apiget('api/v1/store/admin/' + id, {}).then(res => {
					this.arrList[0].text = res.data.member.username
					this.arrList[1].text = res.data.member.store_array.length + '家'
					this.arrList[2].text = res.data.member.name
					this.arrList[3].text = res.data.member.mobile
					this.arrList[4].text = res.data.member.company
					this.arrList[5].text = res.data.member.type
					this.arrList[6].text = res.data.member.status == 1 ? '正常' : '停用'

					this.storeList = res.data.member.store_array
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
				padding-left: 40rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
				background: #fff;

				.box-content-list-li:last-child {
					border-bottom: 0;
				}

				.box-content-list-li {
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-right: 40rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					border-bottom: 1rpx solid #ededed;

					.box-content-list-li-title {
						color: #B3B3B3;
					}

					.box-content-list-li-text {
						color: #000;
					}
				}
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
