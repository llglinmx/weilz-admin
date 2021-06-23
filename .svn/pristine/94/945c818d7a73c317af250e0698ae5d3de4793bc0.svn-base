<template>
	<view class="popup-box" :class="visible?'popup-box-open':''" @click="cancel">
		<view class="popup-box-main" :class="visible?'popup-box-main-open':''" @click.stop="prevent">
			<view class="popup-box-head">
				<text class="cancel" @click="cancel">取消</text>
				<text class="confirm" @click="confirm">确定</text>
			</view>
			<view class="popup-box-content">
				<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
					<picker-view-column v-for="(i,j) in dataList">
						<view class="item" v-for="(item,index) in i.data" :key="index">{{item.name||item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "popup-list-select",
		data() {
			return {
				indicatorStyle: `height: 80rpx;`,
				value: [0, 1],
				dataList: [],
				startTime: '',
				endTime: ''
			};
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			// dataList: {
			// 	type: Array,
			// 	default: []
			// }
		},
		mounted() {
			this.time()
		},
		methods: {
			bindChange(e) {
				var val = e.detail.value
				this.startTime = this.dataList[0].data[val[0]]
				this.endTime = this.dataList[1].data[val[1]]
			},
			// 取消
			cancel() {
				this.$emit("cancel", false)
			},
			// 确定
			confirm() {
				var time1 = this.startTime.split(':');
				var start = 60 * parseInt(time1[0]) + parseInt(time1[1])
				var time2 = this.endTime.split(':');
				var end = 60 * parseInt(time2[0]) + parseInt(time2[1])

				console.log(start, end)

				if (start != end) {
					if (start < end) {
						this.$emit('confirm', this.startTime + ' - ' + this.endTime)
						this.cancel()
						return false;
					}
					uni.showToast({
						title: "开始营业时间不能大于结束营业时间",
						icon: 'none'
					})
					return false;
				}

				uni.showToast({
					title: "开始营业时间不能与结束营业时间相同",
					icon: 'none'
				})

			},

			prevent() {},

			// 获取营业时间
			getBusinessHours() {
				var vuedata = {}
				this.apiget('region/regions', vuedata).then(res => {
					if (res.status == 200) {
						// this.dataList = res.data

					}
				});
			},
			time() {
				var arr = [{
						data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
							'18:00', '19:00', '20:00'
						]
					},
					{
						data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
							'18:00', '19:00', '20:00'
						]
					},
				]
				this.dataList = arr

				this.startTime = this.dataList[0].data[0]
				this.endTime = this.dataList[1].data[1]
			},

		}
	}
</script>

<style lang="scss" scoped>
	.popup-box-open {
		background: rgba(0, 0, 0, 0.5) !important;
		z-index: 999 !important;
	}

	.popup-box {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		transition: 0.4s;
		z-index: -999;

		.popup-box-main-open {
			height: 700rpx !important;
		}

		.popup-box-main {
			display: flex;
			flex-direction: column;
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 0;
			transition: 0.4s;
			background: #fff;

			.popup-box-head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 40rpx;
				box-sizing: border-box;
				height: 100rpx;
				border-bottom: 1rpx solid #ededed;
				font-size: 28rpx;

				.cancel {
					color: #999;
				}

				.confirm {
					color: #1676ec;
				}
			}

			.popup-box-content {
				flex: 1;

				.picker-view {
					width: 100%;
					height: 100%;

					.item {
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>
