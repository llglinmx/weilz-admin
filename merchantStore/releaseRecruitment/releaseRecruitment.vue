<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="发布新招聘"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">门店</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">请选择门店</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">职位名称</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入职位名称" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">职位类别</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入职位类别" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">招聘人数</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入招聘人数" />
							<text>人</text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">薪资</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" class="input-box" placeholder="底薪/元" />
							<text class="iconfont iconjia icon-font"
								style="color: #999;font-size: 28rpx;margin: 0 10rpx;"></text>
							<input type="text" class="input-box" placeholder="抽成/项目%" />
							<text>%</text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">工龄</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text">不限</view>
						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">工作地点</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="州、市" />
						</view>
					</view>
				</view>

				<view class="box-content-list-menu" v-for="(item,index) in menuList" :key="index">
					<view class="box-content-list-menu-title">{{item.title}}</view>
					<view class="box-content-list-menu-info">
						<view class="box-content-list-menu-info-item" v-for="(i,j) in item.data">
							<text class="iconfont iconxuanzhong2 icon-font"
								style="color: #07C160;font-size: 40rpx;margin-top: 4rpx;" v-if="i.isCheck"></text>
							<text class="iconfont iconweixuanzhong icon-font"
								style="color: #B2B2B2;font-size: 40rpx;margin-top: 4rpx;" v-if="!i.isCheck"></text>
							<text>{{i.text}}</text>
						</view>
					</view>
				</view>

				<view class="box-content-list-li-item">
					<view class="box-content-list-li-item-title">职位描述</view>
					<view class="box-content-list-li-item-textarea">
						<textarea value="" placeholder="请输入描述" />
					</view>
				</view>
			</view>
			<view class="box-content-list">

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">联系人</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入联系人" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">联系电话</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" placeholder="请输入联系电话" />
							<view style="display: flex;align-items: center;">
								<!-- <text class="iconfont iconxuanzhong2 icon-font"
									style="color: #07C160;font-size: 40rpx;margin-top: 4rpx;"></text> -->
								<text class="iconfont iconweixuanzhong icon-font"
									style="color: #B2B2B2;font-size: 40rpx;margin-top: 4rpx;"></text>
								<text>公开</text>
							</view>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">邮箱</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" placeholder="请输入邮箱" />
						</view>
					</view>
				</view>
			</view>
			<view class="box-content-text">
				注：格式参考 username@mail.com，应聘简历将会同时被投递到您在此处填写的邮箱
			</view>
		</view>
		<view class="box-footer">
			<view class="box-footer-btn-del flex-center">取消</view>
			<view class="box-footer-btn-edit flex-center">发布</view>
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				menuList: [{
						title: '职位福利',
						isAllCheck: false,
						data: [{
								text: '五险一金',
								isCheck: true
							},
							{
								text: '包住',
								isCheck: false
							},
							{
								text: '包吃',
								isCheck: false
							},
							{
								text: '年底双薪',
								isCheck: false
							},
							{
								text: '周末双休',
								isCheck: false
							},
							{
								text: '交通补助',
								isCheck: false
							},
							{
								text: '加班补助',
								isCheck: false
							},
							{
								text: '饭补',
								isCheck: false
							},
							{
								text: '话补',
								isCheck: false
							},
							{
								text: '房补',
								isCheck: false
							}
						]
					},
					{
						title: '学历要求',
						isAllCheck: false,
						data: [{
								text: '不限',
								isCheck: true
							},
							{
								text: '高中',
								isCheck: false
							},
							{
								text: '技校',
								isCheck: false
							},
							{
								text: '中专',
								isCheck: false
							},
							{
								text: '大专',
								isCheck: false
							},
							{
								text: '本科',
								isCheck: false
							},
							{
								text: '可接受应届生',
								isCheck: false
							}
						]
					},
				]
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
				margin-top: 20rpx;
				padding-left: 40rpx;
				box-sizing: border-box;
				background: #fff;

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

					.box-content-list-li-title {
						width: 140rpx;
						font-size: 28rpx;
						color: #333;
					}

					.box-content-list-li-info {
						margin-left: 80rpx;
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.box-content-list-li-info-text {
							font-size: 28rpx;
							color: #000;
						}

						.box-content-list-li-info-more {}

						.box-content-list-li-info-input {
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;

							input {
								flex: 1;
								height: 100%;
								font-size: 28rpx;
							}

							text {
								margin-left: 10rpx;
								font-size: 28rpx;
								color: #333;
							}

							.input-box {
								width: 188rpx;
								height: 58rpx;
								border: 1rpx solid #EDEDED;
								text-align: center;
							}
						}

						.box-content-list-li-info-check {
							display: flex;
							align-items: center;

							.box-content-list-li-info-check-box:first-child {
								margin-left: 0;
							}

							.box-content-list-li-info-check-box {
								margin-left: 40rpx;
								display: flex;
								align-items: center;
								color: #000;
								font-size: 28rpx;

								.icon-font {
									margin-right: 20rpx;
								}

								text {}
							}
						}
					}

				}

				.box-content-list-li-item {
					padding-bottom: 40rpx;
					padding-right: 40rpx;
					box-sizing: border-box;

					.box-content-list-li-item-title {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #333;
						height: 94rpx;
					}

					.box-content-list-li-item-textarea {
						height: 300rpx;
						border: 1rpx dashed #E0E0E0;
						padding: 20rpx;
						box-sizing: border-box;

						textarea {
							width: 100%;
							height: 100%;
							font-size: 28rpx;
						}
					}
				}

				.box-content-list-menu {
					display: flex;
					padding: 30rpx 0 0;
					border-bottom: 1rpx solid #ededed;

					.box-content-list-menu-title {
						width: 140rpx;
						font-size: 28rpx;
						color: #333;
					}

					.box-content-list-menu-info {
						margin-left: 80rpx;
						flex: 1;
						display: flex;
						flex-wrap: wrap;

						.box-content-list-menu-info-item {
							margin-right: 40rpx;
							margin-bottom: 30rpx;
							display: flex;
							align-items: center;
							font-size: 28rpx;
							color: #000;

							.icon-font {
								margin-right: 10rpx;
							}
						}
					}
				}

			}

			.box-content-text {
				padding: 20rpx 40rpx 0;
				box-sizing: border-box;
				font-size: 24rpx;
				color: #999;
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
