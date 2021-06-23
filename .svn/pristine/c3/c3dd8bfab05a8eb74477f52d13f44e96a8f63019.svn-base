<script>
	export default {
		// 过滤器
		filters: {
			// 保留两位小数
			numFilter(value) {
				let val = ''
				if (!isNaN(value) && value != '') {
					if (value % 1 == 0 && value != 0) { //整数
						val = value + ".00"
					} else if (value == 0) {
						val = ''
					} else { //小数
						val = parseFloat(value).toFixed(2)
					}
				} else {
					val = ''
				}
				return val
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("./static/css/iconfont/iconfont.css");

	page {
		height: 100%;
		font-family: Source Han Sans CN;
		font-weight: 400;
	}

	.flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-font {
		display: flex;
		align-items: center;
		font-weight: 500;
	}

	.content-box {
		height: 100%;
	}
	.content {
		height: 100%;
	}

	/*每个页面公共css */
</style>
