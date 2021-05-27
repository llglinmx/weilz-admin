import baseconfig from "./baseconfig.js"

const httpClient = {
	request: function(method, url, data) {
		var headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": uni.getStorageSync("UToken"),
			'Content-Language':95
		};

		return new Promise((resolve, reject) => {
				uni.showLoading({
					title: "加载中",
					mask: true
				});
			
			uni.request({
				url: url,
				header: headers,
				data: data,
				method: method,
				dataType: 'json',
				success: function(res) {
					uni.hideLoading()
					if (res.statusCode == 402) {
						uni.showToast({
							icon: 'none',
							duration: 1000,
							title: '登录过期,请重新登录'
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/signUp/signUp'
							});
						}, 500);
					} else if( res.statusCode == 400) {
						uni.showToast({
							icon: 'none',
							duration: 1000,
							title: '请求错误,状态码为：'+res.statusCode
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/signUp/signUp'
							});
						}, 500);
					}else{
						if (res.data.error != null) {
							uni.showToast({
								icon: 'none',
								duration: 1000,
								title: res.data.error.message
							});
							return;
						} else {
							resolve(res.data);
						}
					}
				},
				fail: function(err) {
					uni.hideLoading()
					reject(err)
				}
			})
		})
	},
	Get: function(url, data) {
		let allurl = this.geturl(url);
		return this.request('GET', allurl, data)
	},
	Post: function(url, data) {
		let allurl = this.geturl(url);
		return this.request('POST', allurl, data)
	},
	Put: function(url, data) {
		let allurl = this.geturl(url);
		return this.request('PUT', allurl, data)
	},

	Delete: function(url, data) {
		let allurl = this.geturl(url);
		return this.request('DELETE', allurl, data)
	},
	geturl: function(url) {
		return baseconfig.server + url
	}
};

module.exports = httpClient
