<script>
	export default {
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
	page{
		height: 100%;
		font-family: Source Han Sans CN;
		font-weight: 400;
	}
	.flex-center{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-font{
		display: flex;
		align-items: center;
		font-weight: 500;
	}
	/*每个页面公共css */
</style>
