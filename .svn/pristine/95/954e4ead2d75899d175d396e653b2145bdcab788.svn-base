<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-white :navTitle="title" />
		</view>
		<view class="box-content">
			<view class="box-content-main">
				<view class="box-content-main-wrap"></view>
				<view class="box-content-main-list">
					<view class="box-content-main-listt-top"></view>
					<view class="box-content-main-list-data">
						<view class="box-content-main-list-data-item" v-for="(item,index) in dataList" :key="index">
							<view class="main-list-data-item-title">{{item.title}}</view>
							<view class="main-list-data-item-text">{{item.text}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				dataList: [{
						title: "订单号",
						text: 'DSH35693596738',
						id: 1
					},
					{
						title: "用户ID",
						text: '13812345689',
						id: 2
					},
					{
						title: "用户昵称",
						text: '上善若水',
						id: 3
					},
					{
						title: "邮箱",
						text: '4555@qq.com',
						id: 4
					},
					{
						title: "门店",
						text: '集美区门店',
						id: 5
					},
					{
						title: "服务项目",
						text: '足底按摩',
						id: 7
					},
					{
						title: "退款金额",
						text: '-1200',
						id: 6
					},

					{
						title: "支付方式",
						text: '银联',
						id: 8
					},
					{
						title: "时间",
						text: '2020-12-14',
						id: 9
					},
				],
				title: '退款订单详情',
				type: '1'
			};
		},
		onLoad(options) {
			let data = JSON.parse(options.data)
			this.type = data.type
			this.getDateils(data.id)
			switch (data.type) {
				case '1':
					this.title = '退款订单详情'
					break;
				case '2':
					this.title = '成交订单详情'
					break;
			}
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
			getDateils(id) {
				this.apiget('api/v1/store/order/' + id, {}).then(res => {
					if (res.status == 200) {
						this.dataList.map(item => {
							switch (item.id) {
								case 1:
									item.text = res.data.data.out_trade_no
									break;
								case 2:
									item.text = res.data.data.member_info.mobile
									break;
								case 3:
									item.text = res.data.data.member_info.nickname
									break;
								case 4:
									item.text = res.data.data.member_info.email
									break;
								case 5:
									item.text = res.data.data.store_name
									break;
								case 6:
									item.title = this.type==1?'退款金额':'支付金额'
									item.text = res.data.data.amount
									break;
								case 7:
									item.text = res.data.data.reserve_name
									break;
								case 8:
									item.text = res.data.data.pay_type == '1' ? '微信支付' : '余额支付'
									break;
								case 9:
									item.text = res.data.data.createtime
									break;
							}
						})
					}
				});
			}
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
			background-color: #5DBDFE;
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-main {
				position: relative;
				height: 232rpx;
				background: #5DBDFE;

				.box-content-main-wrap {
					position: absolute;
					width: 670rpx;
					height: 30rpx;
					top: 40rpx;
					left: 0;
					right: 0;
					margin: auto;
					background: #409FFF;
					border-radius: 17rpx;
				}

				.box-content-main-list {
					position: absolute;
					width: 630rpx;
					mine-height: 1125rpx;
					padding-bottom: 50rpx;
					top: 55rpx;
					left: 0;
					right: 0;
					margin: auto;
					background: #fff;

					.box-content-main-listt-top {
						width: 100%;
						height: 40rpx;
						background: linear-gradient(180deg, #98D5FE 0%, rgba(255, 255, 255, 0) 100%);
					}

					.box-content-main-list-data {
						margin-top: 20rpx;
						padding: 0 40rpx;
						box-sizing: border-box;

						.box-content-main-list-data-item {
							height: 88rpx;
							border-bottom: 1rpx solid #ededed;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 28rpx;

							.main-list-data-item-title {
								color: #999;
							}

							.main-list-data-item-text {
								color: #000;
							}
						}
					}
				}
			}

		}

	}
</style>
