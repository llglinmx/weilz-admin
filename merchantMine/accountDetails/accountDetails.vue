<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="账号详情"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li" v-for="(item,index) in arrList" :key="index">
					<view class="box-content-list-li-title">{{item.title}}</view>
					<view class="box-content-list-li-text" :style="{color:index==arrList.length-1?'#5DBDFE':'#000'}">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="box-footer-btn-del flex-center">删除</view>
			<view class="box-footer-btn-edit flex-center">修改</view>
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				arrList: [{
						title: '用户名',
						text: 'w40052'
					},
					{
						title: '管理门店',
						text: '集美区门店'
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
						title: '工卡ID',
						text: '5002414'
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
			navTitleBalck
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
