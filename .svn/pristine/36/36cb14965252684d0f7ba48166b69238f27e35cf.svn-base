<template>
	<view class="btn-box" hover-class="hover-class" @click="btnClick">{{btnName}}</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			btnName: {
				type: String,
				default: "按钮"
			}
		},
		methods: {
			btnClick() {
				this.$emit("btnClick")
			},
		}
	}
</script>

<style scoped lang="scss">
	.btn-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 88rpx;
		background: #5DBDFE;
		border-radius: 15rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	.hover-class{
		background: #eee;
	}
</style>
