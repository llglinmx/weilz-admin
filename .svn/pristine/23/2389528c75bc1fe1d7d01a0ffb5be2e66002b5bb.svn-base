<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-back flex-center" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-title">营销管理</view>
				<view class="box-head-ico flex-center">
					<text class="iconfont iconsousuo1 icon-font"
						style="color: #5DBDFE;font-size: 52rpx;margin-top: 4rpx;"></text>
				</view>
			</view>
			<view class="box-head-tabs">
				<merchant-tabs ref="boxTabs" :tabData="tabsList" :activeIndex="defaultIndex" @tabClick='tabClick' />
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-check" v-if="defaultId==0 && couponList.length!=0">
				<view class="box-content-check-wrap flex-center" @click="visible = true">
					<text>{{couponStoreName}}</text>
					<text class="iconfont iconxiangxiajiantou icon-font"
					:style="{transform: visible?'rotate(180deg)':'rotate(0deg)'}"
						style="color: #999;font-size: 32rpx;margin-top: 4rpx;transition: 0.3s;"></text>
				</view>
			</view>
			<view class="box-content-check" v-if="defaultId==2 && cardList.length!=0">
				<view class="box-content-check-wrap flex-center">
					<text>选择门店</text>
					<text class="iconfont iconxiangxiajiantou icon-font"
						style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
				</view>
			</view>
			<view class="box-content-wrap">
				<view class="box-content-wrap-item">
					<swiper class="swiper-box" :current="defaultIndex" @change="tabChange">
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-main" :style="{display:isCouponData?'block':'none'}">
								<z-paging ref="paging1" @query="couponQueryList" :list.sync="couponList"
									loading-more-no-more-text="已经到底了" :refresher-angle-enable-change-continued="false"
									:touchmove-propagation-enabled="true" :use-custom-refresher="true"
									style="height: 100%;">
									<view class="box-content-main-list">
										<view class="box-content-main-list-li" v-for="(item,index) in couponList">
											<view class="box-content-main-list-li-top">
												<view class="box-content-main-list-li-top-left">
													<text class="iconfont iconshangjia"
														style="font-size: 28rpx;color: #5DBDFE;"></text>
													<text>{{item.store_info.name}}</text>
												</view>
												<view class="box-content-main-list-li-top-right">
													<view class="main-list-li-top-left-msg flex-center"
														v-if='item.pass_check=="-1"'>审核中</view>
													<view class="main-list-li-top-left-msg flex-center"
														v-if='item.pass_check=="1"'>已审核</view>
													<view class="main-list-li-top-left-msg flex-center"
														v-if='item.pass_check=="2"'>未通过</view>
												</view>
											</view>
											<view class="box-content-main-list-li-center">
												<view class="box-content-main-list-li-center-top">
													<view class="main-list-li-center-top-title">{{item.name}}</view>
													<view class="main-list-li-center-top-price">￥{{item.reduce_cost}}
													</view>
												</view>
												<view class="box-content-main-list-li-center-text">
													满{{item.least_cost}}元可用</view>
												<view class="box-content-main-list-li-center-list">
													<view class="main-list-li-center-list-li">
														<text class="title">发放数量</text>
														<text
															class="text">{{Number(item.received_num)+Number(item.quantity)}}</text>
													</view>
													<view class="main-list-li-center-list-li">
														<text class="title">已领取</text>
														<text class="text">{{item.received_num}}</text>
													</view>
													<view class="main-list-li-center-list-li">
														<text class="title">剩余</text>
														<text class="text">{{item.quantity}}</text>
													</view>
												</view>
												<view class="box-content-main-list-li-center-msg">
													发放时间：{{releaseTime(item.createtime)}}</view>
												<view class="box-content-main-list-li-center-msg">
													活动时间：{{item.createtime}}-{{item.end_time}}</view>
											</view>
											<view class="box-content-main-list-li-bottom">
												<view class="box-content-main-list-li-bottom-item"
													@click="deleteClick(item.id,index)">
													<text class="iconfont iconshanchu-shangjia icon-font"
														style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
													<text>删除</text>
												</view>

												<view class="box-content-main-list-li-bottom-item"
													@click="couponEdit(item.id)">
													<text class="iconfont iconbianji-shangjia icon-font"
														style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
													<text>编辑</text>
												</view>
											</view>
										</view>
									</view>
								</z-paging>
							</view>
							<view class="box-content-main" :style="{display:!isCouponData?'block':'none'}">
								<loading-merchant v-if="isCouponLoad" />
								<no-data v-if="!isCouponLoad" />
							</view>

						</swiper-item>
						<swiper-item class="swiper-box-item-list" v-if="false"></swiper-item>
						<swiper-item class="swiper-box-item-list">
							<view class="box-content-main" :style="{display:isCardData?'block':'none'}">
								<z-paging ref="paging3" @query="cardQueryList" :list.sync="cardList"
									loading-more-no-more-text="已经到底了" :refresher-angle-enable-change-continued="false"
									:touchmove-propagation-enabled="true" :use-custom-refresher="true"
									:mounted-auto-call-reload="false" style="height: 100%;">
									<view class="box-content-main-list">
										<view class="box-content-main-list-li" v-for="(item,index) in cardList">
											<view class="box-content-main-list-li-top">
												<view class="box-content-main-list-li-top-left">
													<text class="iconfont iconshangjia"
														style="font-size: 28rpx;color: #5DBDFE;margin-top: 4rpx;"></text>
													<text>{{item.store_name}}</text>
												</view>
												<view class="box-content-main-list-li-top-right">出售中</view>
											</view>
											<view class="box-content-main-list-li-center">
												<view class="list-li-center-wrap">
													<view class="list-li-center-wrap-image">
														<image :src="item.simg" mode="aspectFill"></image>
													</view>
													<view class="list-li-center-wrrap-info">
														<view class="list-li-center-wrrap-info-title">{{item.name}}
														</view>
														<view class="list-li-center-wrrap-info-price">￥{{item.price}}
														</view>
														<view class="list-li-center-wrrap-info-text">
															库存：{{item.quantity}}</view>
													</view>
												</view>
												<view class="list-li-center-text" v-for="(i,j) in item.service">
													<text>{{i.name}}</text>
													<text>x{{i.times}}</text>
												</view>
											</view>
											<view class="box-content-main-list-li-bottom">
												<view class="box-content-main-list-li-bottom-item">
													<text class="iconfont iconxiajia-shangjia icon-font"
														style="color: #4EC494;font-size: 36rpx;margin-top: 4rpx;"></text>
													<text>下架</text>
												</view>
												<view class="box-content-main-list-li-bottom-item"
													@click="deleteClick(item.id,index)">
													<text class="iconfont iconshanchu-shangjia icon-font"
														style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
													<text>删除</text>
												</view>

												<view class="box-content-main-list-li-bottom-item"
													@click="cardEdit(item.id)">
													<text class="iconfont iconbianji-shangjia icon-font"
														style="color: #5DBDFE;font-size: 36rpx;margin-top: 4rpx;"></text>
													<text>编辑</text>
												</view>
											</view>
										</view>
									</view>
								</z-paging>
							</view>
							<view class="box-content-main" :style="{display:!isCardData?'block':'none'}">
								<loading-merchant v-if="isCardLoad" />
								<no-data v-if="!isCardLoad" />
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list" v-if="false">
							<view class="box-content-main" :style="{display:isGiftData?'block':'none'}">
								<z-paging ref="paging4" @query="giftQueryList" :list.sync="giftList"
									loading-more-no-more-text="已经到底了" :refresher-angle-enable-change-continued="false"
									:touchmove-propagation-enabled="true" :use-custom-refresher="true"
									:mounted-auto-call-reload="false" style="height: 100%;">
									<view class="box-content-main-list">
										<view class="box-content-main-list-li" v-for="(item,index) in giftList">
											<view class="box-content-main-list-li-top">
												<view class="box-content-main-list-li-top-left">
													<text class="iconfont iconshangjia"
														style="font-size: 28rpx;color: #5DBDFE;margin-top: 4rpx;"></text>
													<text>罗约蓝池·温泉SPA</text>
												</view>
												<view class="box-content-main-list-li-top-right">出售中</view>
											</view>
											<view class="box-content-main-list-li-center">
												<view class="list-li-center-wrap">
													<view class="list-li-center-wrap-image">
														<image :src="item.simg" mode="aspectFill">
														</image>
													</view>
													<view class="list-li-center-wrrap-info">
														<view class="list-li-center-wrrap-info-title">{{item.name}}
														</view>
														<view class="list-li-center-wrrap-info-price">￥{{item.price}}
														</view>
														<view class="list-li-center-wrrap-info-box">
															<view class="list-li-center-wrrap-info-box-text">
																库存：{{item.kucun}}</view>
															<view class="list-li-center-wrrap-info-box-open"
																@click="openClose(index)">
																<text>{{item.isOpen?'收起':'展开'}}</text>
																<text :class="item.isOpen?'icon-font-open':''"
																	class="iconfont iconxiangxiajiantou icon-font"
																	style="color: #ccc;font-size: 28rpx;margin-top: 4rpx;"></text>
															</view>
														</view>
													</view>
												</view>

												<view class="list-li-center-list"
													:class="item.isOpen?'list-li-center-list-active':''">
													<view class="list-li-center-list-item" v-for="(j,k) in 5">
														<view class="list-li-center-list-item-left">
															<text class="iconfont iconshangjia"
																style="font-size: 28rpx;color: #5DBDFE;margin-top: 4rpx;"></text>
															<text>罗约蓝池·温泉SPA</text>
														</view>
														<view class="list-li-center-list-item-right">
															<text>背部按摩</text>
															<text>x1</text>
														</view>
													</view>
												</view>

											</view>
											<view class="box-content-main-list-li-bottom">
												<view class="box-content-main-list-li-bottom-item">
													<text class="iconfont iconxiajia-shangjia icon-font"
														style="color: #4EC494;font-size: 36rpx;margin-top: 4rpx;"></text>
													<text>下架</text>
												</view>
												<view class="box-content-main-list-li-bottom-item"
													@click="deleteClick(item.id,index)">
													<text class="iconfont iconshanchu-shangjia icon-font"
														style="color: #FF6666;font-size: 36rpx;margin-top: 4rpx;"></text>
													<text>删除</text>
												</view>

												<view class="box-content-main-list-li-bottom-item"
													@click="packageEdit(item.id)">
													<text class="iconfont iconbianji-shangjia icon-font"
														style="color: #5DBDFE;font-size: 36rpx;"></text>
													<text>编辑</text>
												</view>
											</view>
										</view>
									</view>
								</z-paging>
							</view>
							<view class="box-content-main" :style="{display:!isGiftData?'block':'none'}">
								<loading-merchant v-if="isGiftLoad" />
								<no-data v-if="!isGiftLoad" />
							</view>
						</swiper-item>
						<swiper-item class="swiper-box-item-list" v-if=""></swiper-item>

					</swiper>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<view class="btn-1" v-if="defaultId==0">
				<btn-sky-blue btnName="新增优惠券" @btnClick="addBtn('coupon')" />
			</view>
			<view class="btn-2" v-if="defaultId==1">
				<btn-sky-blue btnName="新增兑换券" />
			</view>
			<view class="btn-2" v-if="defaultId==2">
				<btn-sky-blue btnName="添加套餐卡" @btnClick="addBtn('set-meal')" />
			</view>
			<view class="btn-2" v-if="defaultId==3">
				<btn-sky-blue btnName="添加礼品卡" @btnClick="addBtn('gift')" />
			</view>
		</view>
		<popup-list-select @cancel="storeCancel" @confirm="storeConfirm" :visible='visible' :dataList="storeList" />

		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" mode='base' title="警告" :content="content" :duration="2000" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				defaultIndex: 0, //当前滑动的页面
				content: '你确定要删除此项吗?',
				tabsList: [{
						name: '优惠券',
						id: 0
					},
					// {
					// 	name: '兑换券',
					// 	id: 1
					// },
					{
						name: '套餐卡',
						id: 2
					},
					// {
					// 	name: '礼品卡',
					// 	id: 3
					// },
					// {
					// 	name: '储值卡',
					// 	id: 4
					// },
				],
				defaultId: 0,
				couponList: [],
				cardList: [],
				giftList: [],
				storeList: [],
				PageNumber: 1, // 请求页数，
				PageLimt: 10, // 请求条数

				isCouponData: false,
				isCouponLoad: true,
				isCardData: false,
				isCardLoad: true,
				isGiftData: false,
				isGiftLoad: true,
				id: '',
				deleteIndex: -1,
				visible: false,
				couponStoreId:'',
				couponStoreName:'全部门店',
			};
		},

		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onLoad() {
			this.getStoreList()
		},
		onShow() {
			if (this.$store.state.isAddCoupon) {
				this.getCoupon(1, 10)
			}
			if (this.$store.state.isAddPackageCard) {
				this.getCard(1, 10)
			}
			if (this.$store.state.isAddGift) {
				this.getGift(1, 10)
			}
		},


		methods: {

			// 优惠券选择门店取消事件
			storeCancel(e) {
				this.visible = e
			},
			// 优惠券选择门店确认事件
			storeConfirm(e) {
				this.couponStoreId = e.id
				this.couponStoreName = e.name
				this.getCoupon(1,20)
			},


			// 优惠券上拉 下拉
			couponQueryList(pageNo, pageSize) {
				this.getCoupon(pageNo, pageSize)
			},

			// 优惠券列表
			getCoupon(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
					store_id:this.couponStoreId,
				}
				this.apiget('api/v1/store/coupon/index', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.data.length != 0) {
							this.isCouponData = true
							let list = res.data.data
							this.$refs.paging1.complete(list);
							return false;
						}
						this.isCouponData = false
						this.isCouponLoad = false
					}
				});
			},
			// 优惠券编辑
			couponEdit(id) {
				let str = {
					type: 'edit',
					id: id
				}
				this.$store.commit('upAddCoupon', false)
				uni.navigateTo({
					url: "../newCoupons/newCoupons?data=" + JSON.stringify(str)
				})
			},

			// 套餐卡上拉 下拉
			cardQueryList(pageNo, pageSize) {
				this.getCard(pageNo, pageSize)
			},

			// 套餐卡列表
			getCard(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
				}
				this.apiget('api/v1/store/card/index', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.data.length != 0) {
							this.isCardData = true
							let list = res.data.data
							this.$refs.paging3.complete(list);
							return false;
						}
						this.isCardData = false
						this.isCardLoad = false
					}
				});
			},
			// 套餐卡编辑
			cardEdit(id) {
				var str = {
					type: 'edit',
					id: id,
				}
				this.$store.commit('upAddPackageCard', false)
				uni.navigateTo({
					url: '../addPackageCard/addPackageCard?data=' + JSON.stringify(str)
				})
			},

			// 礼品卡上拉 下拉
			giftQueryList(pageNo, pageSize) {
				this.getGift(pageNo, pageSize)
			},

			// 礼品卡列表
			getGift(num, size) {
				var vuedata = {
					page_index: num, // 请求页数，
					each_page: size, // 请求条数
				}
				this.apiget('api/v1/store/gift/index', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.data.length != 0) {
							this.isGiftData = true
							let list = res.data.data

							list.map(item => {
								item.isOpen = false
							})

							this.$refs.paging4.complete(list);
							return false;
						}
						this.isGiftData = false
						this.isGiftLoad = false


					}
				});
			},

			// 获取门店列表
			getStoreList() {
				var vuedata = {
					page_index: 1, // 请求页数，
					each_page: 50, // 请求条数
				}
				this.apiget('api/v1/store/store_information', vuedata).then(res => {
					if (res.status == 200) {
						if (res.data.length != 0) {
							this.storeList = res.data.member
							this.storeList.unshift({
								name:'全部门店',
								id:''
							})
						}
					}
				});
			},

			// 礼品卡展开 收起
			openClose(index) {
				this.giftList[index].isOpen = !this.giftList[index].isOpen
			},

			//礼品卡编辑
			packageEdit(id) {
				var str = {
					id: id,
					type: 'edit',
				}
				uni.navigateTo({
					url: '../addGiftCard/addGiftCard?data=' + JSON.stringify(str)
				})
			},

			//点击打开删除确认弹窗
			deleteClick(id, index) {
				this.id = id
				this.deleteIndex = index
				this.$refs.popup.open()

				switch (this.defaultIndex) {
					case 0:
						this.content = '你确定要删除此优惠券吗?'
						break;
					case 1:
						break;
					case 2:
						this.content = '你确定要删除此套餐卡吗?'
						break;
					case 3:
						this.content = '你确定要删除此礼品卡吗?'
						break;
					case 4:
						break;
				}


			},


			// 弹窗点击确认
			confirm() {
				switch (this.defaultIndex) {
					case 0:
						this.deleteCoupon()
						break;
					case 1:
						break;
					case 2:
						this.deleteCard()
						break;
					case 3:
						this.deleteGift()
						break;
					case 4:
						break;
				}


			},

			// 优惠券删除
			deleteCoupon() {
				this.apidelte('api/v1/store/coupon/del/' + this.id, {}).then(res => {
					if (res.status == 200) {
						this.getCoupon(1, 10)
						this.couponList.splice(this.deleteIndex, 1)
						uni.showToast({
							title: "优惠券删除成功",
							icon: "none"
						})
					}
					this.$refs.popup.close()
				});
			},

			// 套餐卡删除
			deleteCard() {
				this.apidelte('api/v1/store/card/del/' + this.id, {}).then(res => {
					if (res.status == 200) {
						this.getCard(1, 20)
						this.cardList.splice(this.deleteIndex, 1)
						uni.showToast({
							title: "套餐卡删除成功",
							icon: "none"
						})
						this.$refs.popup.close()
					}
				});
			},

			// 礼品卡删除
			deleteGift() {
				this.apidelte('api/v1/store/gift/del/' + this.id, {}).then(res => {
					if (res.status == 200) {
						this.giftList(1, 10)
						this.giftList.splice(this.deleteIndex, 1)
						uni.showToast({
							title: "礼品卡删除成功",
							icon: "none"
						})
						this.$refs.popup.close()
					}
				});
			},




			// tabs 点击
			tabClick(e) {
				this.defaultIndex = e
			},
			// 滑动切换列表
			tabChange(e) {
				this.$refs.boxTabs.tabToIndex(e.detail.current)

				this.defaultIndex = e.detail.current
				this.changeIndex(this.defaultIndex)
			},

			changeIndex(index) {
				this.defaultId = this.tabsList[index].id
				switch (this.defaultId) {
					case 0:
						this.getCoupon(1, 20)
						break;
					case 1:

						break;
					case 2:
						this.getCard(1, 20)
						break;
					case 3:
						this.getGift(1, 20)
						break;
					case 4:

						break;
				}
			},


			//返回
			Gback() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 底部新增按钮
			addBtn(type) {
				let str = {
					type: 'add',
				}
				switch (type) {
					case 'coupon': //新增优惠券
						this.$store.commit('upAddCoupon', false)
						uni.navigateTo({
							url: "../newCoupons/newCoupons?data=" + JSON.stringify(str)
						})
						break;
					case 'set-meal': //新增套餐卡
						this.$store.commit('upAddPackageCard', false)
						uni.navigateTo({
							url: '../addPackageCard/addPackageCard?data=' + JSON.stringify(str)
						})
						break;
					case 'gift': //添加礼品卡
						this.$store.commit('upAddGift', false)
						uni.navigateTo({
							url: '../addGiftCard/addGiftCard?data=' + JSON.stringify(str)
						})
						break;
				}
			},
			// 判断优惠券是否开启
			releaseTime(time) {
				var date = new Date();
				var date1 = new Date(time);
				var dateTime = date1.toISOString().slice(0, 10)
				return date < date1 ? '待发放' : dateTime
			},

			dateTime(time) {
				return time.toISOString().slice(0, 10)
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
					width: 50rpx;
				}
			}
		}

		.box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.box-content-check {
				padding: 20rpx;
				box-sizing: border-box;

				.box-content-check-wrap {
					height: 72rpx;
					background: #FFFFFF;
					border-radius: 36rpx;
					font-size: 28rpx;
					color: #666;

					.icon-font {
						margin-left: 10rpx;
					}

					text {}
				}
			}

			.box-content-wrap {
				flex: 1;
				overflow-y: scroll;

				.box-content-wrap-item {
					height: 100%;

					.swiper-box {
						height: 100%;
						overflow-y: scroll;

						.swiper-box-item-list {
							height: 100%;
							overflow-y: scroll;

							.box-content-main {
								height: 100%;


								.box-content-main-list {
									padding: 0 20rpx;
									box-sizing: border-box;

									.box-content-main-list-li-active {
										padding-bottom: 0 !important;
									}

									.box-content-main-list-li:last-child {
										margin-bottom: 0;
									}

									.box-content-main-list-li {
										padding: 0 20rpx;
										box-sizing: border-box;
										background: #fff;
										border-radius: 20rpx;
										margin-bottom: 20rpx;
										transition: 0.3s;

										.box-content-main-list-li-top {
											height: 76rpx;
											display: flex;
											align-items: center;
											justify-content: space-between;

											.box-content-main-list-li-top-left {
												display: flex;
												align-items: center;

												text {
													margin-right: 10rpx;
													font-size: 28rpx;
													color: #000;
												}
											}

											.box-content-main-list-li-top-right {
												font-size: 28rpx;
												color: #5DBDFE;

												.main-list-li-top-left-msg {
													width: 86rpx;
													height: 36rpx;
													background: #4EC494;
													border-radius: 5rpx;
													color: #fff;
													font-size: 22rpx;
												}
											}

										}

										.box-content-main-list-li-center {
											padding: 20rpx 0 30rpx;
											box-sizing: border-box;
											border-top: 1rpx solid #ededed;
											border-bottom: 1rpx solid #ededed;

											.box-content-main-list-li-center-top {
												display: flex;
												align-items: center;
												justify-content: space-between;
												font-weight: 500;

												.main-list-li-center-top-title {
													font-size: 34rpx;
													color: #000;
												}

												.main-list-li-center-top-price {
													font-size: 40rpx;
													color: #FF4D4D;
												}
											}

											.box-content-main-list-li-center-text {
												font-size: 24rpx;
												color: #333;
											}

											.box-content-main-list-li-center-list {
												display: flex;
												margin: 30rpx 0 40rpx;

												.main-list-li-center-list-li {
													flex: 1;
													font-size: 26rpx;

													.title {
														color: #999;
													}

													.text {
														margin-left: 10rpx;
														color: #000;
													}
												}
											}

											.box-content-main-list-li-center-msg {
												font-size: 24rpx;
												color: #999;
											}


											.list-li-center-wrap {
												display: flex;
												align-items: center;

												.list-li-center-wrap-image {
													display: flex;
													align-items: center;

													image {
														width: 210rpx;
														height: 140rpx;
														border-radius: 10rpx;
													}
												}

												.list-li-center-wrrap-info {
													display: flex;
													flex-direction: column;
													justify-content: space-around;
													margin-left: 20rpx;
													flex: 1;
													height: 140rpx;

													.list-li-center-wrrap-info-title {
														line-height: 32rpx;
														font-size: 34rpx;
														font-weight: 500;
														color: #000;
													}

													.list-li-center-wrrap-info-price {
														font-size: 34rpx;
														font-weight: 500;
														color: #FF4D4D;
													}

													.list-li-center-wrrap-info-text {
														font-size: 24rpx;
														color: #999;
													}

													.list-li-center-wrrap-info-box {
														display: flex;
														align-items: center;
														justify-content: space-between;
														font-size: 24rpx;
														color: #999;

														.list-li-center-wrrap-info-box-text {}

														.list-li-center-wrrap-info-box-open {
															display: flex;
															align-items: center;
															color: #ccc;
															transition: 0.3s;

															.icon-font {
																margin-top: 4rpx;
																margin-left: 10rpx;
																transition: 0.3s;
															}

															.icon-font-open {
																margin-top: 0;
																transform: rotate(180deg);
															}
														}
													}

												}
											}

											.list-li-center-text {
												margin-top: 20rpx;
												display: flex;
												justify-content: space-between;
												align-items: center;
												font-size: 26rpx;
												color: #333;
												line-height: 26rpx;
											}

											.list-li-center-list {
												height: 0;
												overflow: hidden;
												transition: 0.3s;

												.list-li-center-list-item {
													display: flex;
													align-items: center;
													margin-bottom: 10rpx;

													.list-li-center-list-item-left {
														display: flex;
														align-items: center;
														flex: 1;

														image {
															width: 28rpx;
															height: 28rpx;
														}

														text {
															margin-left: 10rpx;
															font-size: 26rpx;
															color: #333;
														}
													}

													.list-li-center-list-item-right {
														display: flex;
														align-items: center;
														justify-content: space-between;
														flex: 1;
														font-size: 26rpx;
														color: #333;

														text {}
													}
												}

												.list-li-center-list-item:last-child {
													margin-bottom: 0;
												}
											}

											.list-li-center-list-active {
												margin-top: 30rpx;
												height: auto !important;
											}

										}

										.box-content-main-list-li-bottom {
											height: 88rpx;
											display: flex;
											align-items: center;
											overflow: hidden;
											transition: 0.3s;

											.box-content-main-list-li-bottom-item {
												flex: 1;
												display: flex;
												align-items: center;
												justify-content: center;
												font-size: 28rpx;
												color: #333;

												text {}

												.icon-font {
													margin-right: 10rpx;
												}
											}
										}

									}
								}
							}

						}
					}
				}
			}
		}

		.box-footer {
			position: relative;
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			overflow: hidden;
		}

	}
</style>
