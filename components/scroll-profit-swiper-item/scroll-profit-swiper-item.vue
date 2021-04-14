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
			<view class="box-content-main-list" v-if="dataList.length>0">
				<view class="box-content-main-list-li" v-for="(item,index) in 100" :key="index">
					<view class="box-content-main-list-li-text">2021第{{index+1}}周</view>
					<view class="box-content-main-list-li-text">32158.41</view>
					<view class="box-content-main-list-li-text">{{index+99}}</view>
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
			

		}
	}
</script>

<style scoped lang="scss">
	.box-content-main-list {
		display: flex;
		flex-direction: column;
	
		.box-content-main-list-li {
			display: flex;
			height: 88rpx;
			background: #F7F7F7;
	
			.box-content-main-list-li-text {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
				color: #333;
				font-size: 28rpx;
			}
	
			.box-content-main-list-li-text:nth-child(2) {
				color: #26BF82;
			}
	
		}
	
		.box-content-main-list-li:nth-child(2n) {
			background: #fff;
		}
	}
</style>
