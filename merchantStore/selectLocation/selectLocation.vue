<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck navTitle="选择地址"></nav-title-balck>
		</view>
		<view class="map">
			<map @tap="clickHandle" id="map" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
		</view>
	</view>
</template>

<script>
	import navTitleBalck from "../../components/nav-title-balck/nav-title-balck.vue"
	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				latitude: 24.613838,
				longitude: 118.037733,
				markers: [{
					latitude: '',
					longitude: '',
					iconPath: '../../static/images/address-icon.png'
				}],
				infoData: [],
				isType: ''
			}
		},
		components: {
			navTitleBalck,
		},
		onReady() {
			// 获取顶部电量状态栏高度
			uni.getSystemInfo({
				success: (res) => {
					this.barHeight = res.statusBarHeight
				}
			});
		},
		onLoad(options) {
			var arr = Object.keys(options.data);
			var map = JSON.parse(options.data)
			this.infoData = JSON.parse(options.data)
			this.isType = map.isType
			
			if (map.longitude != '' && map.latitude != '') {
				this.getAddress(map)
			} else {
				this.onLoadHadnle();
			}

		},
		methods: {
			getAddress(res) {
				this.longitude = res.longitude;
				this.latitude = res.latitude;
				this.markers[0].latitude = res.latitude;
				this.markers[0].longitude = res.longitude;
				this.markers[0].iconPath = '../../static/imgs/map.png';
			},

			// 获取位置
			onLoadHadnle() {
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						this.longitude = res.longitude;
						this.latitude = res.latitude;
						this.markers[0].latitude = res.latitude;
						this.markers[0].longitude = res.longitude;
						this.markers[0].iconPath = '../../static/imgs/map.png';
					}
				});
			},
			clickHandle(e) {
				console.log(this.isType)
				if (this.isType == 'edit') {
					this.editFrame(this.infoData)
				} else if (this.isType == 'add') {
					this.frame();
				}
			},

			frame() {
				uni.chooseLocation({
					success: res => {
						this.latitude = res.latitude;
						this.longitude = res.longitude;
						this.value = res.address;
						this.markers[0].latitude = res.latitude;
						this.markers[0].longitude = res.longitude;
						this.markers[0].iconPath = '../../static/imgs/map.png';

						this.$store.commit("upMapObj", res)


						uni.navigateBack({
							delta: 1
						})

					}
				});
			},
			editFrame(data) {
				uni.chooseLocation({
					success: res => {
						this.latitude = data.latitude;
						this.longitude = data.longitude;
						this.markers[0].latitude = data.latitude;
						this.markers[0].longitude = data.longitude;
						this.markers[0].iconPath = '../../static/imgs/map.png';


						uni.navigateBack({
							delta: 1
						})

					}
				});
			},
		},

	}
</script>

<style lang="scss" scoped>
	.box {
		height: 100vh;

		.map {
			width: 100%;
			height: 100%;

			map {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
