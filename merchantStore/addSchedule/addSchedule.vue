<template>
	<view class="box">
		<view class="box-head" :style="{paddingTop:barHeight+'px'}">
			<nav-title-balck :navTitle="titleType=='add'?'添加排班表':'编辑排班表'"></nav-title-balck>
		</view>
		<view class="box-content">
			<view class="box-content-list">
				<view class="box-content-list-li" @click="titleType=='add' && selectOpen()">
					<view class="box-content-list-li-title">技师</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-text"
							style="margin-right: 20rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
							{{engineerName==''?'请选择技师':engineerName}}
						</view>

						<view class="box-content-list-li-info-more">
							<text class="iconfont icongengduo icon-font"
								style="color: #999;font-size: 28rpx;margin-top: 4rpx;"></text>
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">排班名称</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.name" placeholder="请输入排班名称" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">休息日期</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="text" v-model.trim="from.rest" placeholder="1970-01-01 多个日期用/隔开" />
						</view>
					</view>
				</view>
				<view class="box-content-list-li">
					<view class="box-content-list-li-title">预约时间间隔</view>
					<view class="box-content-list-li-info">
						<view class="box-content-list-li-info-input">
							<input type="number" v-model.trim="from.interval" @blur='timeBlur' placeholder="示例:30" />
							<text>分钟</text>
						</view>
					</view>
				</view>

				<view class="box-content-list-li">
					<view class="box-content-list-li-title">状态</view>
					<view class="box-content-list-li-info">
						<switch :checked='isState' style="transform: scale(0.7);" color="#26BF81"
							@change="switchState" />
					</view>
				</view>
			</view>

			<view class="box-content-main">
				<view class="box-content-main-calendar">
					<scheduling-calendar :extraData='extraData' />
				</view>
				<view class="box-content-main-schedule-list">
					<view class="box-content-main-schedule-list-li" v-for="(item,index) in dataList" :key="index">
						<view class="box-content-main-schedule-list-li-title">
							<view class="box-content-main-schedule-list-li-title-left">
								<text>{{item.title}}</text>
								<text>{{item.number | basic}}</text>
							</view>
							<view class="box-content-main-schedule-list-li-title-right">
								<switch :checked='item.isCheck' color="#26BF81" style="transform:scale(0.7)"
									@change="switch1Change($event,index)" />
							</view>

						</view>
						<view class="box-content-main-schedule-list-li-wrap">
							<view class="schedule-list-li-wrap-item" v-for="(i,j) in item.data" :key="j">
								<view class="schedule-list-li-wrap-item-add flex-center" @click="addTime(index,j)">
									<text class="iconfont iconjia icon-font"
										style="color: #ccc;font-size: 28rpx"></text>
								</view>
								<view class="schedule-list-li-wrap-item-text flex-center"
									@click="timeOpen(index,j,'start')">
									<text v-if="i.start!=''">{{i.start}}</text>
									<text v-if="i.start==''" style="color: #999;">开始时间</text>
								</view>
								<view class="schedule-list-li-wrap-item-connect flex-center">
									<text class="iconfont iconjian icon-font"
										style="color: #ccc;font-size: 24rpx"></text>
								</view>
								<view class="schedule-list-li-wrap-item-text flex-center"
									@click="timeOpen(index,j,'end')">
									<text v-if="i.end!=''">{{i.end}}</text>
									<text v-if="i.end==''" style="color: #999;">结束时间</text>
									<!-- <text>{{i.random}}</text> -->
								</view>
								<view class="schedule-list-li-wrap-item-connect flex-center">
									<text class="iconfont iconjian icon-font"
										style="color: #ccc;font-size: 24rpx"></text>
								</view>
								<view class="schedule-list-li-wrap-item-text flex-center">
									<input class="schedule-list-li-wrap-item-text-number" type="number"
										v-model.trim="i.member" @input="changeNum(index,j)" @blur="changeBlur(index,j)"
										placeholder="数量" />
								</view>
								<view class="schedule-list-li-wrap-item-del flex-center">
									<text class="iconfont iconcuowu icon-font" style="color: #ccc;font-size: 52rpx"
										@click="deleteTime(index,j)" :style="{display:j==0?'none':'block'}"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-footer">
			<btn-sky-blue :btnName="titleType=='add'?'确认提交':'确认修改'" @btnClick="confirm" />
		</view>

		<popup-list-select :skid='from.engineer_id' @cancel="engineerCancel" @confirm="engineerConfirm"
			:visible='visible' :dataList="engineerList" />

		<select-time :checkStart='timesArr.start' :checkEnd='timesArr.end' @cancel='cancelTime' :visible='isTime'
			@confirm='timeConfirm'/>
	</view>
</template>

<script>
	const getYearMonthDay = (date) => {
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();

		return {
			year,
			month,
			day
		}
	}
	const getDate = (year, month, day) => {
		return new Date(year, month, day)
	}


	export default {
		data() {
			return {
				barHeight: 0, //顶部电量导航栏高度
				titleType: 'add',
				id: '',
				isState: false,
				visible: false, //控制员工显示
				engineerList: [],
				engineerName: '',
				isTime: false, //控制时间弹出层显示
				indexOne: -1,
				indexTwo: -1,
				timeType: '',
				arrTime: [],
				from: {
					engineer_id: '', //技师id
					name: '', //排班名称
					rest: '', //休息日期
					interval: '', //分钟数
					status: -1, //状态
				},
				dataList: [{
						title: "周一",
						number: "",
						statusName: 'mon_status',
						isCheck: false,
						data: [{
							start: '',
							end: '',
							member: '10'
						}, ],
					},
					{
						title: "周二",
						number: "",
						statusName: 'tues_status',
						isCheck: false,
						data: [{
							start: '',
							end: '',
							member: '10'
						}, ],
					},
					{
						title: "周三",
						number: "",
						statusName: 'wed_status',
						isCheck: false,
						data: [{
							start: '',
							end: '',
							member: '10'
						}, ],
					},
					{
						title: "周四",
						number: "",
						statusName: 'thur_status',
						isCheck: false,
						data: [{
							start: '',
							end: '',
							member: '10'
						}, ],
					},
					{
						title: "周五",
						number: "",
						statusName: 'fri_status',
						isCheck: false,
						data: [{
							start: '',
							end: '',
							member: '10'
						}, ],
					},
					{
						title: "周六",
						number: "",
						statusName: 'sat_status',
						isCheck: false,
						data: [{
							start: '',
							end: '',
							member: '10'
						}, ],
					}, {
						title: "周日",
						number: "",
						statusName: 'sun_status',
						isCheck: false,
						data: [{
							start: '',
							end: '',
							member: '10'
						}, ],
					},
				],
				extraData: [],
				engineer_id: '',
				scheduleId: '',
				timesArr: {
					start: '',
					end: ''
				},
				timeKey: 0
			};
		},
		filters: {
			basic(val) { //去除最后一个字符
				return val.substring(0, val.length - 1);
			},
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
			var data = JSON.parse(options.data)

			if (data.type == 'add') {
				this.titleType = 'add'
				this.id = data.id
				this.getTechniciany()
			} else {
				this.titleType = 'edit'
				this.engineer_id = data.engineer_id
				this.scheduleId = data.scheduleId
				this.getDetails(data.engineer_id)
			}
			this.getYear()
		},
		methods: {
			// 选择技师
			selectOpen() {
				if (this.engineerList.length != 0) {
					this.visible = true
					return false
				}
				uni.showToast({
					title: "暂无技师需要排班",
					icon: 'none'
				})
			},
			// 选择技师取消按钮
			engineerCancel(e) {
				this.visible = e
			},
			// 选择技师确定按钮
			engineerConfirm(e) {
				this.engineerName = e.name
				this.from.engineer_id = e.id
			},


			// 时间弹出层打开
			timeOpen(index, idx, type) {
				this.indexOne = index
				this.indexTwo = idx
				this.timeType = type

				switch (type) {
					case 'start':
						this.timesArr.start = this.dataList[index].data[idx].start
						break;
					case 'end':
						this.timesArr.end = this.dataList[index].data[idx].end
						break;
				}


				if (this.dataList[index].isCheck) {
					this.isTime = true
					return false
				}
				uni.showToast({
					title: "该时间未开启,不能选择时间",
					icon: "none"
				})
			},
			// 时间弹出层取消事件
			cancelTime(e) {
				this.isTime = e
			},

			//赋值预约人数
			changeNum(index, idx) {
				// this.dataList[index].data[idx].member = this.dataList[index].data[idx].member
			},
			// 预约人数失去焦点事件
			changeBlur(index, idx) {
				if (!this.dataList[index].isCheck) {
					uni.showToast({
						title: "该时间未开启,不能输入数量",
						icon: "none"
					})
					this.dataList[index].data[idx].member = ''
				}
			},

			// 时间弹出层确认事件
			timeConfirm(e) {
				if (this.timeType == 'start') { //开始时间
					this.dataList[this.indexOne].data[this.indexTwo].start = e.hour + ':' + e.minute
				} else { //结束时间
					this.dataList[this.indexOne].data[this.indexTwo].end = e.hour + ':' + e.minute
				}
			},

			// switch 开关
			switch1Change(e, index) {
				var bool = e.detail.value
				this.dataList[index].isCheck = bool ? true : false

				this.extraData.map(item => {
					var w = new Date(item.day).getDay() //获取星期 0（周日） 到 6（周六） 之间的一个整数。
					switch (index) {
						case 0:
							if (w == 1) {
								item.data.value = this.dataList[index].isCheck ? '上班' : '未排班'
							}
							break;
						case 1:
							if (w == 2) {
								item.data.value = this.dataList[index].isCheck ? '上班' : '未排班'
							}
							break;
						case 2:
							if (w == 3) {
								item.data.value = this.dataList[index].isCheck ? '上班' : '未排班'
							}
							break;
						case 3:
							if (w == 4) {
								item.data.value = this.dataList[index].isCheck ? '上班' : '未排班'
							}
							break;
						case 4:
							if (w == 5) {
								item.data.value = this.dataList[index].isCheck ? '上班' : '未排班'
							}
							break;
						case 5:
							if (w == 6) {
								item.data.value = this.dataList[index].isCheck ? '上班' : '未排班'
							}
							break;
						case 6:
							if (w == 0) {
								item.data.value = this.dataList[index].isCheck ? '上班' : '未排班'
							}
							break;
					}
				})

			},
			// 状态
			switchState(e) {
				this.isState = e.detail.value
			},


			// 输入间隔时间数失去焦点事件
			timeBlur() {
				if (this.from.minute > 30) {
					uni.showToast({
						title: "间隔的最大时间不能超过30分钟",
						icon: "none"
					})
					setTimeout(() => {
						this.from.minute = 30
					}, 500)
				}
			},


			// 添加日程安排时间
			addTime(index, idx) {
				// index 第一级下标 idx 第二级下标
				let str = {
					start: '',
					end: '',
					member: '10'
				}

				if (this.dataList[index].isCheck) {
					this.dataList[index].data.splice(idx + 1, 0, str) // 当前点击的后一位添加
				}

			},

			// 删除添加的日程时间
			deleteTime(index, idx) {
				if (this.dataList[index].data.length <= 1) {
					uni.showToast({
						title: "不能再删了，至少保留一个",
						icon: "none"
					})
					return false;
				}
				this.dataList[index].data.splice(idx, 1) // 当前点击位置删除
			},

			// 确认按钮
			confirm() {
				var monday = [] //星期一
				var tuesday = [] //星期二
				var wednesday = [] //星期三
				var thursday = [] //星期四
				var friday = [] //星期五
				var saturday = [] //星期六
				var sunday = [] //星期日

				this.dataList[0].data.forEach(item => {
					var str = {
						start: item.start,
						end: item.end,
						member: item.member
					}
					monday.push(str)
				})
				this.dataList[1].data.forEach(item => {
					var str = {
						start: item.start,
						end: item.end,
						member: item.member
					}
					tuesday.push(str)
				})
				this.dataList[2].data.forEach(item => {
					var str = {
						start: item.start,
						end: item.end,
						member: item.member
					}
					wednesday.push(str)
				})
				this.dataList[3].data.forEach(item => {
					var str = {
						start: item.start,
						end: item.end,
						member: item.member
					}
					thursday.push(str)
				})
				this.dataList[4].data.forEach(item => {
					var str = {
						start: item.start,
						end: item.end,
						member: item.member
					}
					friday.push(str)
				})
				this.dataList[5].data.forEach(item => {
					var str = {
						start: item.start,
						end: item.end,
						member: item.member
					}
					saturday.push(str)
				})
				this.dataList[6].data.forEach(item => {
					var str = {
						start: item.start,
						end: item.end,
						member: item.member
					}
					sunday.push(str)
				})



				var vuedata = {
					engineer_id: this.from.engineer_id, //技师id
					name: this.from.name, //排班名称
					interval: this.from.interval, //分钟数
					rest: this.from.rest, //休息日期
					status: this.isState ? 1 : -1, //状态,//状态
					mon_status: this.dataList[0].isCheck ? 1 : -1, //周一是否开启
					tues_status: this.dataList[1].isCheck ? 1 : -1, //周二是否开启
					wed_status: this.dataList[2].isCheck ? 1 : -1, //周三是否开启
					thur_status: this.dataList[3].isCheck ? 1 : -1, //周四是否开启
					fri_status: this.dataList[4].isCheck ? 1 : -1, //周五是否开启
					sat_status: this.dataList[5].isCheck ? 1 : -1, //周六是否开启
					sun_status: this.dataList[6].isCheck ? 1 : -1, //周日是否开启
					mon_times: this.dataList[0].isCheck ? JSON.stringify(monday) : '', //周一
					tues_times: this.dataList[1].isCheck ? JSON.stringify(tuesday) : '', //周二
					wed_times: this.dataList[2].isCheck ? JSON.stringify(wednesday) : '', //周三
					thur_times: this.dataList[3].isCheck ? JSON.stringify(thursday) : '', //周四
					fri_times: this.dataList[4].isCheck ? JSON.stringify(friday) : '', //周五
					sat_times: this.dataList[5].isCheck ? JSON.stringify(saturday) : '', //周六
					sun_times: this.dataList[6].isCheck ? JSON.stringify(sunday) : '', //周日
				}
				if (this.titleType == 'add') {
					this.addScheduling(vuedata)
				} else {
					this.editScheduling(vuedata)
				}
			},
			// 添加排班
			addScheduling(data) {
				this.apipost('api/v1/store/schedule/add', data).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddSchedule', true)
						uni.showToast({
							title: '排班表添加成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 13)
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				});
			},
			// 修改排班
			editScheduling(data) {
				this.apiput('api/v1/store/schedule/edit/' + this.scheduleId, data).then(res => {
					if (res.status == 200) {
						this.$store.commit('upAddSchedule', true)
						uni.showToast({
							title: '排班表修改成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 13)
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				});
			},

			// 获取技师
			getTechniciany() {
				this.apiget('api/v1/store/engineer', {
					store: this.id,
					schedule: 1
				}).then(res => {
					if (res.status == 200) {
						if (res.data.length != 0) {
							this.engineerList = res.data.member
						}
					}
				});
			},
			// 获取年月日
			getYear() {
				var year = getYearMonthDay(new Date()).year
				var month = getYearMonthDay(new Date()).month

				let currentFirstDay = getDate(year, month, 1);

				let week = currentFirstDay.getDay();
				let startDay = currentFirstDay - week * 60 * 60 * 1000 * 24;
				let arr = [];
				for (let i = 0; i < 35; i++) {
					let day = new Date(startDay + i * 60 * 60 * 1000 * 24);
					let {
						year: dayY,
						month: dayM,
						day: dayD
					} = getYearMonthDay(day);
					var date = new Date(day); // 初始化日期
					var str = {
						data: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
						value: '未排班',
						dot: true,
						active: true
					}
					let obj = {
						day: day,
						data: str
					}
					arr.push(obj)
					this.extraData = arr
				}

				// 此处是获取到 为 周日-周六 各自对应的时间
				var sTime = ''
				arr.forEach(item => {
					var w = new Date(item.day).getDay() //获取星期 0（周日） 到 6（周六） 之间的一个整数。
					// 周一 至 周日 对应显示
					switch (w) {
						case 0:
							sTime = new Date(item.day).getDate()
							this.dataList[6].number += sTime + '/'
							break;
						case 1:
							sTime = new Date(item.day).getDate()
							this.dataList[0].number += sTime + '/'
							break;
						case 2:
							sTime = new Date(item.day).getDate()
							this.dataList[1].number += sTime + '/'
							break;
						case 3:
							sTime = new Date(item.day).getDate()
							this.dataList[2].number += sTime + '/'
							break;
						case 4:
							sTime = new Date(item.day).getDate()
							this.dataList[3].number += sTime + '/'
							break;
						case 5:
							sTime = new Date(item.day).getDate()
							this.dataList[4].number += sTime + '/'
							break;
						case 6:
							sTime = new Date(item.day).getDate()
							this.dataList[5].number += sTime + '/'
							break;
					}

					// console.log(w)
				})

				return arr
			},
			// 获取排班详情
			getDetails(id) {
				this.apiget('api/v1/store/schedule/' + id, {}).then(res => {
					if (res.status == 200) {
						this.from.engineer_id = res.data.schedule.engineer_id
						this.from.name = res.data.schedule.name
						this.from.rest = res.data.schedule.rest
						this.from.interval = res.data.schedule.interval
						this.from.status = res.data.schedule.status

						this.engineerName = res.data.schedule.engineer_name
						this.isState = res.data.schedule.status == 1 ? true : false

						let dataObj = res.data.schedule

						this.dataList.map(item => {
							switch (item.statusName) {
								case "mon_status": //周一
									item.isCheck = dataObj.mon_status == 1 ? true : false
									if (dataObj.mon_times) {
										item.data = dataObj.mon_times
									}
									break;
								case "tues_status": //周二
									item.isCheck = dataObj.tues_status == 1 ? true : false
									if (dataObj.tues_times) {
										item.data = dataObj.tues_times
									}
									break;
								case "wed_status": //周三
									item.isCheck = dataObj.wed_status == 1 ? true : false
									if (dataObj.wed_times) {
										item.data = dataObj.wed_times
									}
									break;
								case "thur_status": //周四
									item.isCheck = dataObj.thur_status == 1 ? true : false
									if (dataObj.thur_times) {
										item.data = dataObj.thur_times
									}
									break;
								case "fri_status": //周五
									item.isCheck = dataObj.fri_status == 1 ? true : false
									if (dataObj.fri_times) {
										item.data = dataObj.fri_times
									}
									break;
								case "sat_status": //周六
									item.isCheck = dataObj.sat_status == 1 ? true : false
									if (dataObj.sat_times) {
										item.data = dataObj.sat_times
									}
									break;
								case "sun_status": //周日
									item.isCheck = dataObj.sun_status == 1 ? true : false
									if (dataObj.sun_times) {
										item.data = dataObj.sun_times
									}
									break;
							}
						})


						this.extraData.map(ele => {
							var w = new Date(ele.day).getDay() //获取星期 0（周日） 到 6（周六） 之间的一个整数。
							this.dataList.map(item => {
								switch (item.statusName) {
									case "mon_status": //周一
										if (w == 1) {
											ele.data.value = item.isCheck ? '上班' : '未排班'
										}
										break;
									case "tues_status": //周二
										if (w == 2) {
											ele.data.value = item.isCheck ? '上班' : '未排班'
										}
										break;
									case "wed_status": //周三
										if (w == 3) {
											ele.data.value = item.isCheck ? '上班' : '未排班'
										}
										break;
									case "thur_status": //周四
										if (w == 4) {
											ele.data.value = item.isCheck ? '上班' : '未排班'
										}
										break;
									case "fri_status": //周五
										if (w == 5) {
											ele.data.value = item.isCheck ? '上班' : '未排班'
										}
										break;
									case "sat_status": //周六
										if (w == 6) {
											ele.data.value = item.isCheck ? '上班' : '未排班'
										}
										break;
									case "sun_status": //周日
										if (w == 0) {
											ele.data.value = item.isCheck ? '上班' : '未排班'
										}
										break;
								}
							})
						})


					}

				})
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
						width: 180rpx;
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
							flex: 1;
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
						}
					}
				}
			}

			.box-content-main {
				padding: 0 40rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
				background: #fff;

				.box-content-main-calendar {
					// height: 700rpx;
				}

				.box-content-main-schedule-list {
					padding-bottom: 30rpx;

					.box-content-main-schedule-list-li {
						.box-content-main-schedule-list-li-title {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 30rpx 0;
							color: #333;

							.box-content-main-schedule-list-li-title-left {
								display: flex;
								align-items: center;
								font-size: 32rpx;

								text {
									margin-right: 20rpx;
									font-size: 30rpx;
								}
							}

							.box-content-main-schedule-list-li-title-left {}


						}

						.box-content-main-schedule-list-li-wrap {
							.schedule-list-li-wrap-item:first-child {
								margin-top: 0;
							}

							.schedule-list-li-wrap-item {
								display: flex;
								align-items: center;
								margin-top: 20rpx;

								.schedule-list-li-wrap-item-add {
									width: 40rpx;
									height: 40rpx;
									border: 1rpx solid #CCCCCC;
									border-radius: 10rpx;
									margin-right: 10rpx;
								}

								.schedule-list-li-wrap-item-text {
									display: flex;
									align-items: center;
									width: 140rpx;
									height: 80rpx;
									margin: 0 10rpx;
									border: 2rpx solid #EDEDED;
									border-radius: 10rpx;
									font-size: 28rpx;

									.icon-font {
										margin-right: 10rpx;
									}

									.schedule-list-li-wrap-item-text-number {
										font-size: 28rpx;
										text-align: center;
									}
								}

								.schedule-list-li-wrap-item-connect {}

								.schedule-list-li-wrap-item-del {
									margin-left: 20rpx;
									width: 40rpx;
									height: 40rpx;
								}

							}
						}
					}
				}
			}
		}

		.box-footer {
			padding: 30rpx 40rpx;
			box-sizing: border-box;
		}
	}
</style>
