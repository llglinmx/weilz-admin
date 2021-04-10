<template>
	<view class="content">
		<!-- 这里设置了z-paging加载时禁止自动调用reload方法，自行控制何时reload（懒加载），同时允许touchmove事件冒泡，否则无法横向滚动切换tab -->
		<z-paging ref="paging" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
			:mounted-auto-call-reload="false" :refresher-angle-enable-change-continued="false"
			:touchmove-propagation-enabled="true" :use-custom-refresher="true" style="height: 100%;">
			<!-- 自定义下拉刷新view，若不设置，则使用z-paging自带的下拉刷新view -->
			<!-- <custom-refresher slot="refresher"></custom-refresher> -->
			<loading-merchant v-if="isLoad"></loading-merchant>
			<no-data v-if="dataList.length<=0&&!isLoad"></no-data>
			<!-- <empty-view slot="empty"></empty-view> -->
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
			<view class="box-content-main" v-if="dataList.length>0">
				<view class="box-content-main-list" :style="{marginBottom:isChoice?'40rpx':'0'}">
					<view class="box-content-main-list-li" :class="!item.isOpen?'box-content-main-list-li-active':''"
						v-for="(item,index) in dataList" @longtap="longtap" @click=" isChoice && checkClick(index)"
						:key="index">
						<view class="box-content-main-list-li-top"
							:class="item.isOpen?'box-content-main-list-li-top-active':''">
							<view class="box-content-main-list-li-top-check flex-center"
								:style="{width:isChoice?'50rpx':'0'}">
								<text class="iconfont iconxuanzhong icon-font" style="color: #5DBDFE;font-size: 40rpx;"
									v-if="item.isCheck"></text>
								<text class="iconfont iconweixuanzhong1 icon-font" style="color: #ccc;font-size: 40rpx;"
									v-else></text>
							</view>
							<view class="box-content-main-list-li-top-image">
								<image :src="item.simg" mode="aspectFill"></image>
							</view>
							<view class="box-content-main-list-li-top-info">
								<view class="box-content-main-list-li-top-info-title">{{item.name}}</view>
								<view class="box-content-main-list-li-top-info-wrap">
									<view class="list-li-top-info-wrap-item">{{item.service_time}}分钟</view>
									<view class="list-li-top-info-wrap-item" v-for="(j,i) in item.format" :key='j.id'>
										{{j.name}}</view>
								</view>
								<view class="box-content-main-list-li-top-info-stock">已售：{{item.sold}}</view>
								<view class="box-content-main-list-li-top-info-price">
									<view class="list-li-top-info-present-price">￥{{item.price}}</view>
									<view class="list-li-top-info-switch flex-center" v-if="!isChoice">
										<text class="iconfont iconzhankai icon-font open"
											:class="item.isOpen?'open-active':''"
											style="color:#5DBDFE;font-size: 48rpx;"
											@click.stop="switchClick(index,true)"></text>
										<text class="iconfont iconshouqi icon-font close"
											:class="item.isOpen?'close-active':''" style="color: #ccc;font-size: 48rpx;"
											@click.stop="switchClick(index,false)"></text>
									</view>
								</view>
							</view>
						</view>
						<view class="box-content-main-list-li-bottom"
							:class="item.isOpen?'box-content-main-list-li-bottom-active':''">
							<view class="box-content-main-list-li-bottom-item" @click="projectDelete(index,item.id)">
								<text class="iconfont iconshanchu-shangjia icon-font"
									style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
								<text>删除</text>
							</view>
							<view class="box-content-main-list-li-bottom-item">
								<text class="iconfont iconxiajia-shangjia icon-font"
									style="color: #4EC494;font-size: 36rpx;margin-top: 4rpx;"></text>
								<text>下架</text>
							</view>
							<view class="box-content-main-list-li-bottom-item" @click="projectEdit(item)">
								<text class="iconfont iconbianji-shangjia icon-font"
									style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
								<text>编辑</text>
							</view>
						</view>
					</view>
				</view>
			</view>


		</z-paging>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" mode='base' title="警告" content="你确定要删除此项目吗？" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import zPaging from "../z-paging/components/z-paging/z-paging.vue"
	import UniPopup from "../../components/uni-popup/uni-popup.vue"
	import UniPopupDialog from "../../components/uni-popup/uni-popup-dialog.vue"
	export default {
		data() {
			return {
				dataList: [],
				firstLoaded: false,
				isLoad: true,
				deleteIndex: -1,
				id: ''
			}
		},
		model: {
			prop: 'isChoice',
			event: 'lonIsChoice'
		},
		components: {
			zPaging,
			UniPopup,
			UniPopupDialog
		},
		props: {
			tabIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			currentIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			store:{},
			isChoice: {
				type: Boolean
			},
			isSelectAll: {
				type: Boolean
			},
			isSearch: {
				type: Boolean
			},
			orderType: {
				type: String,
				default: ''
			},
			search: {
				type: String,
				default: ''
			}
		},
		watch: {
			currentIndex: {
				handler(newVal) {
					if (newVal === this.tabIndex) {
						//懒加载，当滑动到当前的item时，才去加载
						if (!this.firstLoaded) {
							this.$nextTick(() => {
								this.$refs.paging.reload();
							})
						}
					}
				},
				immediate: true
			},
		},
		methods: {
			queryList(pageNo, pageSize) {
				//组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//模拟请求服务器获取分页数据，请替换成自己的网络请求
				// this.$request.queryList(pageNo, pageSize, this.tabIndex + 1, (data) => {
				// 	this.$refs.paging.complete(data);
				// 	this.firstLoaded = true;
				// })

				this.getDataList(pageNo, pageSize)
			},


			// 获取数据
			getDataList(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
					store_id:this.store,
				}
				this.apiget('api/v1/store/service_reservation/index', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.data.length != 0) {
							let list = res.data.data

							list.map(item => {
								item.isOpen = false
								item.isCheck = false
							})

							let totalSize = res.data.total_rows
							this.$refs.paging.addData(list);
							this.firstLoaded = true;
						}
						this.isLoad = false
					}
				});
			},
			// 列表长按事件
			longtap() {
				// this.isChoice = true;

				if (this.isSearch) { //如果有显示搜索框则隐藏搜索
					// this.isSearch = false
					this.$emit('closeSearch', false)

				}
				this.$emit("lonIsChoice", true)
			},



			// 选中 未选中
			checkClick(index) {
				this.dataList[index].isCheck = !this.dataList[index].isCheck;
				var bool = this.dataList.filter(item => item.isCheck).length == this.dataList.length && this.dataList
					.length > 0 ? true : false
				this.$emit('selectAll', bool)
			},

			// 展开 收起
			switchClick(index, bool) {

				if (this.isSearch) { //如果有显示搜索框 点击则隐藏搜索
					this.$emit('closeSearch', false)
				}

				this.dataList[index].isOpen = bool ? true : false;
			},

			changeList() {
				// 循环列表 修改属性
				this.dataList.forEach(item => {
					item.isCheck = this.isSelectAll ? false : true
				})
			},

			// 删除单个项目
			projectDelete(index, id) {
				this.deleteIndex = index
				this.id = id
				this.$refs.popup.open()
			},

			// 弹窗点击取消
			close(done) {
				done()
			},
			// 弹窗点击确认
			confirm(done, value) {
				this.apidelte('api/v1/store/Service_reservation/del/' + this.id, {}).then(res => {
					if (res.status == 200) {
						uni.showToast({
							title: "删除成功",
							icon: 'none'
						})
						this.dataList.splice(this.deleteIndex, 1)
					} else if (res.status == 400) {
						uni.showToast({
							title: res.massage,
							icon: 'none'
						})
					}
					done()
				})
			},
			// 批量删除
			batchDelete() {
				var str = ''
				this.dataList.forEach(item => {
					if (item.isCheck) {
						str += item.id + ','
					}
				})
				var id = str.slice(0, str.length - 1) //去掉最后一个字符

				this.apidelte('api/v1/store/Service_reservation/del', {
					id: id
				}).then(res => {
					if (res.status == 200) {
						uni.showToast({
							title: "删除成功",
							icon: 'none'
						})
						this.getDataList(1, 10)
					} else if (res.status == 400) {
						uni.showToast({
							title: res.massage,
							icon: 'none'
						})
					}
					done()
				})
			},

			// 编辑
			projectEdit(item) {
				this.$store.commit('upAddProject', false)
				var str = {
					id: item.id,
					type: 'edit'
				}
				uni.navigateTo({
					url: "../addProject/addProject?data=" + JSON.stringify(str)
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.box-content-main {
		padding: 0 20rpx;
		box-sizing: border-box;

		.box-content-main-list {
			margin-bottom: 40rpx;

			.box-content-main-list-li-active {
				padding-bottom: 0 !important;
			}

			.box-content-main-list-li {
				padding: 30rpx 20rpx 0;
				box-sizing: border-box;
				background: #fff;
				border-radius: 20rpx;
				margin-top: 20rpx;
				transition: 0.3s;

				.box-content-main-list-li-top-active {
					border-bottom: 1rpx solid #ededed;
					// padding-bottom: 0 !important;
				}

				.box-content-main-list-li-top {
					display: flex;
					align-items: center;
					padding-bottom: 30rpx;
					transition: 0.3s;

					.box-content-main-list-li-top-check {
						transition: 0.3s;
						overflow: hidden;
					}

					.box-content-main-list-li-top-image {
						display: flex;
						align-items: center;
						margin-left: 10rpx;

						image {
							width: 178rpx;
							height: 178rpx;
							border-radius: 10rpx;
						}
					}

					.box-content-main-list-li-top-info {
						height: 178rpx;
						margin-left: 20rpx;
						flex: 1;

						.box-content-main-list-li-top-info-title {
							line-height: 34rpx;
							font-size: 34rpx;
							font-weight: 500;
							color: #000;
						}

						.box-content-main-list-li-top-info-wrap {
							margin-top: 10rpx;
							display: flex;
							align-items: center;
							flex-wrap: wrap;

							.list-li-top-info-wrap-item {
								padding: 6rpx 10rpx;
								margin-right: 10rpx;
								margin-bottom: 10rpx;
								background: #F5F5F5;
								font-size: 22rpx;
								color: #666;
								border-radius: 3rpx;
							}
						}

						.box-content-main-list-li-top-info-stock {
							font-size: 24rpx;
							color: #999;
						}

						.box-content-main-list-li-top-info-price {
							display: flex;
							align-items: baseline;
							justify-content: space-between;

							.list-li-top-info-present-price {
								font-size: 34rpx;
								font-weight: 500;
								color: #FF4D4D;
							}

							.list-li-top-info-switch {
								position: relative;
								width: 50rpx;
								height: 50rpx;
								overflow: hidden;

								.open {
									position: absolute;
									top: 0;
									left: 0;
									transition: 0.3s;
								}

								.open-active {
									top: -50rpx !important;
								}

								.close {
									position: absolute;
									top: -50rpx;
									left: 0;
									transform: 0.3s;
								}

								.close-active {
									top: 0 !important;
								}
							}
						}

					}
				}

				.box-content-main-list-li-bottom-active {
					height: 88rpx !important;
				}

				.box-content-main-list-li-bottom {
					height: 0;
					display: flex;
					align-items: center;
					overflow: hidden;
					transition: 0.3s;

					.box-content-main-list-li-bottom-item {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28rpx;
						color: #333;

						text {}

						.icon-font {
							margin-right: 10rpx;
						}
					}
				}

			}
		}
	}
</style>
