<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<view class="box-head-nav">
				<view class="box-head-nav-back" @click="Gback">
					<text class="iconfont iconfanhui" style="color: #000;font-size: 36rpx;margin-top: 8rpx;"></text>
				</view>
				<view class="box-head-nav-title">详情</view>
				<view class="box-head-nav-ico">
					<text class="iconfont iconshoucang"
						style="color: #000;font-size: 52rpx;margin-right: 20rpx;"></text>
					<text class="iconfont iconfenxiang"
						style="color: #000;font-size: 52rpx;margin-right: 20rpx;"></text>
				</view>
			</view>
		</view>
		<view class="box-content">
			<view class="box-content-video">
				<view class="box-content-video-main">
					<view class="box-content-video-main-src">
						<video :src="videoSrc" id="myVideo" @pause="pauseFun"
							:style="{display:isShow?'block':'none'}"></video>
						<image :src="dataInfo.simg" mode="aspectFill"
							:style="{display:!isPlay&&!isShow?'block':'none'}"></image>
					</view>
					<view class="box-content-video-main-cover flex-center" v-if="!isPlay">
						<text class="iconfont iconbofang icon-font" style="color: #fff;font-size: 110rpx;"
							@click="play"></text>
					</view>
				</view>
				<view class="box-content-video-text">
					<view class="box-content-video-text-title">推拿培训 肩部疼痛</view>
					<view class="box-content-video-text-list">
						<view class="box-content-video-text-list-li">8372次播放</view>
						<view class="box-content-video-text-list-li">观看人数 405人</view>
						<view class="box-content-video-text-list-li">发布时间：2021年1月9日</view>
					</view>
				</view>
			</view>


			<view class="box-content-text-wrap">
				<view class="box-content-text-wrap-title">教学介绍</view>
				<view class="box-content-text-wrap-li">肩膀按摩手法</view>
				<view class="box-content-text-wrap-li">1、肩膀按摩可以用旋摩肩周法
					坐着不动,然后用左手手掌放到右肩上,然后旋摩肩周50～100次,直到手与肩产生温热感,换另一只手,同样做50-100次,每次必做。</view>
				<view class="box-content-text-wrap-li">2、肩膀按摩可以用头压手掌法
					此种方法,适宜晚上睡前和早上起床前去做,仰睡在床,然把双腿放开,手掌放在头下面,掌心是向上的,手背朝下,接下来就开始用头压手掌中心,你感觉到哪边的手掌痛就压哪边,每次做20分钟左右。</view>
				<view class="box-content-text-wrap-li">3、肩膀按摩可以用捏拿手臂法
					也是坐着,用左手捏拿右手手臂,一直从肩捏到手腕处,再从手腕捏到肩,反复捏拿5一10遍,再另一只手。</view>
				<view class="box-content-text-wrap-li">4、肩膀按摩可以用单手压肩法
					以右肩为例。两脚放置如弓步,右脚在前面,离桌有一尺多;左脚在后伸直。右手收于桌上,左手掌按右肩,利用身体向下向后摆动。</view>
				<view class="box-content-text-wrap-li">5、肩膀按摩可以用扩胸分肩法
					两脚站立,与肩同宽,把两手放到胸前,注意,要让两肘与肩平直,手背是向上的,掌心是朝下。扩开胸怀,分开双肩、吸气;回复时呼气。</view>
				<view class="box-content-text-wrap-li">怎么给肩膀按摩</view>
				<view class="box-content-text-wrap-li">1、身心放松
					按摩时除思想应集中外,还要心平气和,全身也不要紧张,要求做到身心都放松。</view>
				<view class="box-content-text-wrap-li">2、取穴准确
					掌握常用穴位的取穴方法和操作手法,以求取穴准确,手法正确。</view>
				<view class="box-content-text-wrap-li">3、用力恰当
					因为过小起不到应有的刺激作用,过大易产生疲劳,且易损伤皮肤。</view>
				<view class="box-content-text-wrap-li">4、循序渐进
					推拿手法的次数要由少到多,推拿力量由轻逐渐加重,推拿穴位可逐渐增加。</view>
				<view class="box-content-text-wrap-li">5、持之以恒
					无论用按摩来保健或者治疗慢性病,都不是一两天就有效的,常须积以时日,才逐渐显出效果来,所以应有信心、耐心和恒心。</view>
			</view>

			<view class="box-content-main">
				<view class="box-content-main-title">推荐课程</view>
				<view class="box-content-main-list">
					<view class="box-content-main-list-li" v-for="(item,index) in 20" :key="index">
						<view class="box-content-main-list-li-image">
							<image src="../../static/images/am-ico1.png" mode="aspectFill"></image>
						</view>
						<view class="box-content-main-list-li-text">面部护理手法指导教...</view>
						<view class="box-content-main-list-li-msg">面部护理手法指导教学视频</view>
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
				isPlay: false, //是否播放
				isShow: false, //第一次加载
				videoplay: {},
				dataInfo: {
					name: '',
					createtime: '',
					simg: '',
				},
				videoSrc: 'https://apd-fe51a49b31e9f4791de3aba0ff95cffc.v.smtcdns.com/mv.music.tc.qq.com/AxT5QoAujYLHOC1WH3hU_xXc45YtxPaUmykltbJmjd4o/B77963B571B681CFB421F6B863E38CCB77EA5F62A793301E47FA920536D48C17A85A80B335FAFD41239B574F68585EA3ZZqqmusic_default/qmmv_0b6btyaaaaaacqamncymgjpfjhqaacpaaaca.f9844.mp4?fname=qmmv_0b6btyaaaaaacqamncymgjpfjhqaacpaaaca.f9844.mp4'
			};
		},
		components: {
			navTitleBalck
		},
		onShow() {
			this.videoplay = wx.createVideoContext('myVideo')
			console.log(this.videoplay)
		},
		onLoad(options) {
			this.getDataDetails(options.id)
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
			// 播放
			play() {
				setTimeout(() => {
					this.isPlay = true
					this.isShow = true
					this.videoplay.play() // 播放视频
				}, 200)
			},
			// 暂停视频
			pauseFun(e) {
				this.isPlay = false
			},

			// 获取详情
			getDataDetails(id) {
				this.apiget('api/v1/store/Video_tutorial/video_info/' + id, {}).then(res => {
					if (res.status == 200) {
						this.dataInfo = res.data.data
					}
				});
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
				height: 88rpx;
				padding: 0 20rpx;
				box-sizing: border-box;

				.box-head-nav-back {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 50rpx;
				}

				.box-head-nav-title {
					display: flex;
					align-items: center;
					justify-content: center;
					flex: 1;
					margin-left: 40rpx;
					font-size: 34rpx;
					font-weight: 500;
					color: #000;
				}

				.box-head-nav-ico {
					display: flex;
					align-items: center;
				}
			}
		}

		.box-content {
			flex: 1;
			overflow-y: scroll;

			.box-content-video {
				.box-content-video-main {
					position: relative;
					height: 470rpx;

					.box-content-video-main-src {
						width: 100%;
						height: 100%;

						video,
						image {
							width: 100%;
							height: 100%;
						}
					}

					.box-content-video-main-cover {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background: rgba(0, 0, 0, 0.4);

					}
				}

				.box-content-video-text {
					padding: 30rpx 40rpx 40rpx;
					box-sizing: border-box;
					background: #fff;

					.box-content-video-text-title {
						font-size: 36rpx;
						color: #000;
					}

					.box-content-video-text-list {
						display: flex;
						flex-wrap: wrap;
						margin-top: 20rpx;

						.box-content-video-text-list-li:first-child {
							padding-left: 0;
						}

						.box-content-video-text-list-li {
							display: flex;
							align-items: center;
							padding: 0 20rpx;
							height: 24rpx;
							border-right: 1rpx solid #ccc;
							font-size: 24rpx;
							color: #999;
						}

						.box-content-video-text-list-li:last-child {
							border-right: 0;
						}
					}
				}
			}

			.box-content-text-wrap {
				margin-top: 20rpx;
				padding: 0 40rpx 40rpx;
				box-sizing: border-box;
				background: #fff;

				.box-content-text-wrap-title {
					padding: 30rpx 0;
					font-size: 32rpx;
					color: #000;
					line-height: 32rpx;
				}

				.box-content-text-wrap-li {
					margin-bottom: 10rpx;
					font-size: 28rpx;
					color: #333;
				}
			}


			.box-content-main {
				display: flex;
				flex-direction: column;
				flex: 1;
				overflow-y: scroll;
				padding: 0 40rpx;
				box-sizing: border-box;

				.box-content-main-title {
					padding: 30rpx 0;
					font-size: 36rpx;
					font-weight: 500;
					color: #000;
				}

				.box-content-main-list {
					width: 100%;
					flex: 1;
					overflow-y: scroll;
					display: flex;
					flex-wrap: wrap;

					.box-content-main-list-li {
						width: 320rpx;
						margin-right: 30rpx;
						margin-bottom: 30rpx;

						.box-content-main-list-li-image {
							image {
								width: 320rpx;
								height: 200rpx;
							}
						}

						.box-content-main-list-li-text {
							margin: 10rpx 0;
							line-height: 32rpx;
							font-size: 30rpx;
							color: #000;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.box-content-main-list-li-msg {
							font-size: 26rpx;
							color: #B3B3B3;
						}
					}

					.box-content-main-list-li:nth-child(2n) {
						margin-right: 0;
					}
				}
			}
		}

		.box-footer {}
	}
</style>
