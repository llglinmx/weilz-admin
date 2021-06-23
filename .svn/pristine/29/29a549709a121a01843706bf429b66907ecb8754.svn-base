<template>
	<view class="box-tabbar">
		<view class="box-tabbar-item" v-for="(item,index) in options" :key="index" @click="tabbarClick(index,item.id)">
			<view class="box-tabbar-item-ico" :class="index == activeIndex?'ico-active':''">
				<text :class="item.style" class="iconfont icon-font" :style="{'font-size':item.size+'rpx'}"></text>
			</view>
			<view class="box-tabbar-item-text" :class="index==activeIndex?'box-tabbar-item-text-active':''">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
						title: "首页",
						style: 'iconshouye',
						size: "58",
						id: 0
					},
					{
						title: "订单",
						style: 'icondingdan', //阿里图标库样式名
						size: "52", //字体大小
						id: 1
					},
					{
						title: "门店",
						style: 'iconmendian1', //阿里图标库样式名
						size: "52", //字体大小
						id: 2
					},
					// {
					// 	title: "商城",
					// 	style: 'iconshangcheng', //阿里图标库样式名
					// 	size: "52", //字体大小
					// 	id: 3
					// },
					{
						title: "我的",
						style: 'iconwode3',
						size: "52",
						id: 4
					}
				],
			}
		},
		props: {
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		methods: {
			// tabbar点击
			tabbarClick(index, id) {
				let obj = {
					index: index,
					id: id
				}
				this.$emit("tabbarClick", obj)
			},
			// 语言接口
			languageChange() {
				// 请求语言写这里
				console.log("切换语言")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box-tabbar {
		height: 102rpx;
		display: flex;
		align-content: center;
		background: #FFFFFF;
		box-shadow: 0rpx -1rpx 10rpx rgba(0, 0, 0, 0.1);

		.box-tabbar-item {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex: 1;

			.box-tabbar-item-ico {
				color: #C4C7CC;
			}

			.ico-active {
				color: #5DBDFE !important;
			}

			.box-tabbar-item-text {
				font-size: 20rpx;
				color: #626366;
				transition: 0.2s;
			}

			.box-tabbar-item-text-active {
				color: #5DBDFE !important;
			}
		}
	}
</style>
