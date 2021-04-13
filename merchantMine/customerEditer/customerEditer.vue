<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">客户编辑</view>
				<view class="box-head-ico flex-center">
					确定
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">用户ID</view>
					<view class="box-content-list-li-input">
						<input type="text" placeholder="用户ID" />
					</view>
					<view class="box-content-list-li-more">
						<text class="iconfont icongengduo icon-font" style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">用户名称</view>
					<view class="box-content-list-li-input">
						<input type="text" placeholder="请输入名称" />
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">手机号码</view>
					<view class="box-content-list-li-input">
						<input type="number" placeholder="请输入电话" />
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">用户信息</view>
					<view class="box-content-list-li-input">
						<input type="text" placeholder="用户信息" />
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">用户标签</view>
					<view class="box-content-list-li-input">
						<input type="text" placeholder="多个标签用“；”隔开" />
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">健康状态</view>
					<view class="box-content-list-li-input">
						<input type="text" placeholder="良好" />
					</view>
				</view>
			</view>
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">紧急联系人</view>
					<view class="box-content-list-li-input">
						<input type="text" placeholder="请输入联系人姓名" />
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">联系方式</view>
					<view class="box-content-list-li-input">
						<input type="text" placeholder="请输入联系方式" />
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">联系人关系</view>
					<view class="box-content-list-li-input">
						<input type="number" placeholder="与联系人关系（如：父亲）" />
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">

		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
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
			// 返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
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
			.box-head-nav {
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				box-sizing: border-box;
				height: 88rpx;
				.box-head-back {
					width: 50rpx;
				}
				.box-head-title {
					flex: 1;
					text-align: center;
					font-size: 34rpx;
					font-weight: 500;
					color: #000;
				}
				.box-head-ico {
					text-align: left;
					font-size: 30rpx;
					width: 70rpx;
					color: #5DBDFE;
				}
			}
		}
		.box-content {
			flex: 1;
			overflow-y: scroll;
			.box-content-list {
				margin-top: 20rpx;
				padding-left: 40rpx;
				background: #fff;
				box-sizing: border-box;
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
					font-size: 28rpx;
					.box-content-list-li-title {
						color: #333;
					}
					.box-content-list-li-input {
						height: 100%;
						margin-left: 50rpx;
						flex: 1;
						input {
							font-size: 28rpx;
							width: 100%;
							height: 100%;
						}
					}
					.box-content-list-li-more {}
				}
			}
		}
		.box-footer {}
	}
</style>