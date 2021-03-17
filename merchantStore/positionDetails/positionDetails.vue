<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white navTitle="职位详情" />
		</view>
		<view class="box-content">

		</view>
		<view class="box-footer">
			<view class="box-footer-btn-del flex-center">删除</view>
			<view class="box-footer-btn-edit flex-center" @click="modify">修改</view>
		</view>
	</view>
</template>

<script>
	import navTitleWhite from "../../components/nav-title-white/nav-title-white.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度

			};
		},
		components: {
			navTitleWhite
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
			// 修改资料
			modify() {

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
			background-color:#5DBDFE;
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;



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
