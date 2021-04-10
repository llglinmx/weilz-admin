import httpClient from '../static/js/ajax.js'

export function get(url, params) {
	return httpClient.Get(url, params)
};
export function post(url, params) {
	return httpClient.Post(url, params)
};
export function put(url, params) {
	return httpClient.Put(url, params)
};
export function del(url, params) {
	console.log(url)
	return httpClient.Delete(url, params)
};

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		isAdd: false, //用于判断是否发布技师招聘
		mapObj: {}, //选择的定位具体地址信息
		isAddStore: false, //是否有添加门店
		isAddTechhnician: false, //是否有添加技师
		isAddProject: false, //是否有添加项目
		isAddCoupon:false,//是否有添加优惠券
		isAddPackageCard:false,//是否有添加套餐卡
	},
	mutations: {
		//用于判断是否添加地址 等同于发送监听
		upAdd(state, bool) {
			state.isAdd = bool
		},
		// 更新地址信息
		upMapObj(state, obj) {
			state.mapObj = obj
		},

		upAddStore(state, bool) {
			state.isAddStore = bool
		},

		upAddTechhnician(state, bool) {
			state.isAddTechhnician = bool
		},

		upAddProject(state, bool) {
			state.isAddProject = bool
		},
		upAddCoupon(state, bool) {
			state.isAddCoupon = bool
		},
		upAddPackageCard(state, bool) {
			state.isAddPackageCard = bool
		},
	},
	actions: {}
})
export default store
