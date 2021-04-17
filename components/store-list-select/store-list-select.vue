<template>
	<view class="popup-box" :class="visible?'popup-box-open':''" @click="cancel">
		<view class="popup-box-main" :class="visible?'popup-box-main-open':''" @click.stop="prevent">
			<view class="popup-box-head">
				<text class="cancel" @click="cancel">取消</text>
				<text class="confirm" @click="confirm">确定</text>
			</view>
			<view class="popup-box-content">
				<view class="popup-box-content-list">
					<view class="popup-box-content-list-li" v-for="(item,index) in dataList" :key='item.id'
						@click="changeList(index)">
						<view class="popup-box-content-list-li-title">{{item.name||item}}</view>
						<view class="popup-box-content-list-li-check">
							<text class="iconfont icon-font iconweixuanzhong1" style="font-size: 42rpx;color: #999;"
								v-if="!item.isCheck"></text>
							<text class="iconfont icon-font iconxuanzhong" style="font-size: 42rpx;color:#07C160;"
								v-if="item.isCheck"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "store-list-select",
		data() {
			return {

			};
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			dataList: {},
			skid: {
				type: [String, Number],
				default: ''
			}
		},
		mounted() {

		},
		methods: {

			// 选中列表
			changeList(index) {
				this.dataList[index].isCheck = !this.dataList[index].isCheck
				this.$forceUpdate();
			},


			// 取消
			cancel() {
				this.$emit("cancel", false)
			},
			// 确定
			confirm() {
				var arr = []
				var data = []
				this.dataList.forEach(item => {
					if (item.isCheck) {
						var str = {
							id: item.id,
							name: item.name
						}
						arr.push(str)
					}
				})
				if (arr.length != 0) {
					data = arr
				} else {
					data = [{
						name: '请选择门店',
						id: -1
					}]
				}

				this.$emit('confirm', data)
				this.cancel()
			},

			prevent() {},
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
			height: 1000rpx !important;
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
			border-radius: 20rpx 20rpx 0 0;

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

				.popup-box-content-list {
					padding: 20rpx 40rpx 0;
					box-sizing: border-box;

					.popup-box-content-list-li {
						padding: 20rpx 0;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.popup-box-content-list-li-title {
							font-size: 28rpx;
							color: #333;
						}

						.popup-box-content-list-li-check {
							.icon-font {}
						}
					}
				}

			}
		}
	}
</style>
