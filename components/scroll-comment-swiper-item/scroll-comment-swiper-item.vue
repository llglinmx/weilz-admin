<template>
	<view class="content">
		<!-- 这里设置了z-paging加载时禁止自动调用reload方法，自行控制何时reload（懒加载），同时允许touchmove事件冒泡，否则无法横向滚动切换tab -->
		<z-paging ref="paging" @query="queryList" :list.sync="dataList" loading-more-no-more-text="已经到底了"
			:mounted-auto-call-reload="false" :refresher-angle-enable-change-continued="false"
			:touchmove-propagation-enabled="true" :use-custom-refresher="true" style="height: 100%;">
			<!-- 自定义下拉刷新view，若不设置，则使用z-paging自带的下拉刷新view -->
			<!-- <custom-refresher slot="refresher"></custom-refresher> -->
			<loading v-if="isLoad"></loading>
			<no-data v-if="dataList.length<=0&&!isLoad"></no-data>
			<!-- <empty-view slot="empty"></empty-view> -->
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<!-- list数据，建议像下方这样在item外层套一个view，而非直接for循环item，因为slot插入有数量限制 -->
			<view class="box-content-item-comment-wrap" v-if="dataList.length>0">
				<view class="box-content-item-type">
					<view class="box-content-item-type-li flex-center" @click="typeClick(index)"
						:class="typeIndex==index?'box-content-item-type-li-active':''" v-for="(item,index) in typeList"
						:key="index">{{item}}({{index+10}})</view>
				</view>
				<view class="box-content-item-comment">
					<view class="box-content-item-comment-list">
						<view class="box-content-item-comment-list-li" v-for="(item,index) in 10" :key="index">
							<view class="comment-list-li-top">
								<view class="comment-list-li-top-image">
									<image src="../../static/images/userImage.png" mode="aspectFill">
									</image>
								</view>
								<view class="comment-list-li-top-info">
									<view class="comment-list-li-top-info-title">SKB露娜可可</view>
									<view class="comment-list-li-top-info-score">
										<text class="iconfont iconwujiaoxing icon-font"
											style="color: #FFCD4D;font-size: 28rpx;" v-for="item in 5"></text>
										<text>5分</text>
									</view>
								</view>
							</view>
							<view class="comment-list-li-msg-content">
								经常累的时候过来按摩，技师服务很好，按摩还会询问力度，很会聊天，这里地理位置也很好找，环境也挺好的，服务员也很热情，来这里整体给我的感觉都是不错的，推荐大家来这家店体验一下。
							</view>
							<view class="comment-list-li-msg-time">
								2020年10月20日 16:25:01
							</view>
							<view class="comment-list-li-msg-image-arr">
								<image src="../../static/images/2.png" mode="aspectFill" v-for="(i,j) in 4" :key="j">
								</image>
							</view>
							<view class="comment-list-li-msg-reply" v-if="index!=1">
								<view class="comment-list-li-msg-reply-text">我的回复：</view>
								<view class="comment-list-li-msg-reply-content">
									感谢您的支持与认可！我们会继续努力提供更优质的服务与项目感谢您的支持与认可！我们会继续努力提供更优质的服务与项目
								</view>
							</view>
							<view class="comment-list-li-msg-wrap">
								<view class="comment-list-li-msg-wrap-text">查看订单</view>
								<view class="comment-list-li-msg-wrap-btn flex-center" v-if="index!=1">追加回复
								</view>
								<view class="comment-list-li-msg-wrap-btn flex-center" v-else>回复顾客</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</z-paging>
	</view>
</template>

<script>
	import zPaging from "../z-paging/components/z-paging/z-paging.vue"
	export default {
		data() {
			return {
				dataList: [],
				firstLoaded: false,
				isLoad: true,
				typeList: ["全部", "未回复", "已回复"],
				typeIndex: 0, //当前选择的评论类型
			}
		},
		components: {
			zPaging
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
				var page = {
					num: pageNo,
					size: pageSize,

				}
				this.getDataList(page)
			},


			// 获取数据
			getDataList(page) {
				var vuedata = {
					page_index: page.num, // 请求页数，
					each_page: page.size, // 请求条数
					com_type: this.tabIndex != 1 ? '' : 2
				}
				this.apiget('pc/comment', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.comment.length != 0) {
							let list = res.data.comment
							this.$refs.paging.addData(list);
							this.firstLoaded = true;
						}
						this.isLoad = false
					}
				});
			},
			// 评论类型点击
			typeClick(index) {
				this.typeIndex = index
			},

		}
	}
</script>

<style scoped lang="scss">
	.box-content-item-comment-wrap {
		height: 100%;
		display: flex;
		flex-direction: column;

		.box-content-item-type {
			display: flex;
			align-items: center;
			padding: 30rpx 40rpx;
			box-sizing: border-box;

			.box-content-item-type-li {
				width: 182rpx;
				height: 60rpx;
				margin-right: 20rpx;
				border: 1rpx solid #CCCCCC;
				border-radius: 30rpx;
				color: #ccc;
				font-size: 28rpx;
				transition: 0.3s;
			}

			.box-content-item-type-li:last-child {
				margin-right: 0;
			}

			.box-content-item-type-li-active {
				border: 1rpx solid #26BF82;
				color: #26BF82;
			}
		}

		.box-content-item-comment {
			flex: 1;
			overflow-y: scroll;
			box-sizing: border-box;

			.box-content-item-comment-list {
				padding-left: 40rpx;
				box-sizing: border-box;
				// margin-bottom: 40rpx;

				.box-content-item-comment-list-li:last-child {
					margin-bottom: 0;
				}

				.box-content-item-comment-list-li {
					padding-right: 40rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #ededed;
					padding-bottom: 20rpx;
					margin-top: 40rpx;

					.comment-list-li-top {
						display: flex;
						align-items: center;

						.comment-list-li-top-image {
							display: flex;
							align-items: center;

							image {
								width: 88rpx;
								height: 88rpx;
							}
						}

						.comment-list-li-top-info {
							margin-left: 20rpx;
							flex: 1;
							height: 100%;

							.comment-list-li-top-info-title {
								font-size: 32rpx;
								color: #000;
							}

							.comment-list-li-top-info-score {
								display: flex;
								align-items: center;

								text {
									margin-right: 6rpx;
									font-size: 24rpx;
									color: #999;
								}
							}
						}
					}

					.comment-list-li-msg-content {
						margin: 20rpx 0;
						font-size: 28rpx;
						color: #333;
					}

					.comment-list-li-msg-time {
						font-size: 24rpx;
						color: #999;
					}

					.comment-list-li-msg-image-arr {
						display: flex;
						align-items: center;
						margin-top: 20rpx;

						image {
							width: 160rpx;
							height: 160rpx;
							margin-right: 10rpx;
							margin-bottom: 10rpx;
						}

						image:nth-child(4n) {
							margin-right: 0;
						}
					}

					.comment-list-li-msg-reply {
						margin-top: 20rpx;
						padding: 20rpx;
						box-sizing: border-box;
						min-height: 152rpx;
						background: #F7F7F7;
						border-radius: 10rpx;
						font-size: 28rpx;

						.comment-list-li-msg-reply-text {
							color: #999;
						}

						.comment-list-li-msg-reply-content {
							color: #333;
						}
					}

					.comment-list-li-msg-wrap {
						padding: 20rpx 0;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28rpx;

						.comment-list-li-msg-wrap-text {
							color: #999;
						}

						.comment-list-li-msg-wrap-btn {
							width: 176rpx;
							height: 60rpx;
							background: #26BF82;
							border-radius: 32rpx;
							color: #fff;
						}
					}
				}
			}

		}
	}
</style>
