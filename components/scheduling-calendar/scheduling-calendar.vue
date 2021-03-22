<template>
	<view class="content-calendar">
		<view class="content-calendar-top">
			<view class="content-calendar-top-left">
				左
			</view>
			<view class="content-calendar-top-center">{{time.year}}年{{time.month + 1}}月</view>
			<view class="content-calendar-top-right">
				右
			</view>
		</view>
		<view class="content-calendar-week">
			<view class="content-calendar-week-item flex-center" v-for="(item,index) in weeks" :key="index">{{item}}</view>
		</view>
		<view class="content-calendar-list">
			<view class="content-calendar-list-li flex-center" @click="clickDate(item.day)" v-for="(item,index) in visibleDays"
			 :class="[{bgColor:isToday(item.day)},{bgColorCheck:isClick(item.day)}]" :key="index">
				<text class="day" :class="[{notCurrentMonth: !isCurrentMonth(item.day)}
						]">{{item.day | dayFilter}}</text>
				<text class="msg" :class="[{notCurrentMonth: !isCurrentMonth(item.day)},{msgActive:isToday(item.day)},{msgActive:isClick(item.day)}
						]">上班</text>
			</view>
		</view>
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
				iArr: [1, 2, 3, 4, 5, 6],
				jArr: [1, 2, 3, 4, 5, 6, 7],
				value: new Date(),
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				click_time: {},
				month_data: this.extraData,
				time: this.defaultTime,
				todayObj: {
					background: this.bgColor,
					color: '#ffffff'
				},
				selectedObj: {
					background: this.selColor,
					color: '#ffffff'
				}
			}
		},
		props: {
			bgColor: {
				type: String,
				default: '#4198f8'
			},
			selColor: {
				type: String,
				default: '#4198f8'
			},
			textColor: {
				type: String,
				default: '#4198f8'
			},
			defaultTime: {
				type: Object,
				default: () => {
					return {
						year: getYearMonthDay(new Date()).year,
						month: getYearMonthDay(new Date()).month
					}
				}
			},
			extraData: {
				type: Array,
				default: () => {
					return [] // {date: '2020-6-3', value: '签到', dot: true, active: true}
				}
			},
			showText: {
				type: Boolean,
				default: true
			},
			showDot: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			dayFilter(val) {
				return val.getDate();
			}
		},
		watch: {
			extraData: {
				handler(newV, oldV) {
					if (newV !== oldV) {
						this.month_data = newV
					}
				},
				deep: true
			}
		},
		computed: {
			visibleDays() { // 计算当月展示日期
				let {
					time: {
						year,
						month
					},
					month_data
				} = this;
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
					let data = {};
					for (let item of month_data) {
						let dateString = item.date;
						let dateArr = dateString.indexOf('-') !== -1 ?
							dateString.split('-') :
							dateString.indexOf('/') !== -1 ?
							dateString.split('/') : [];
						if (dateArr.length === 3 &&
							Number(dateArr[0]) === Number(dayY) &&
							Number(dateArr[1]) === (Number(dayM) + 1) &&
							Number(dateArr[2]) === Number(dayD)) {
							data = item
						}
					}
					let obj = {
						day,
						data
					}
					arr.push(obj)
				}
				console.log(arr)
				return arr
			}
		},
		mounted() {

		},
		methods: {
			isCurrentMonth(date) { // 是否当月
				let {
					year,
					month
				} = getYearMonthDay(getDate(this.time.year, this.time.month, 1));
				let {
					year: y,
					month: m
				} = getYearMonthDay(date);
				return year === y && month === m;
			},
			isToday(date) { // 是否当天
				let {
					year,
					month,
					day
				} = getYearMonthDay(new Date());
				let {
					year: y,
					month: m,
					day: d
				} = getYearMonthDay(date);
				return year === y && month === m && day === d;
			},
			isClick(date) { // 是否是点击日期
				let {
					click_time
				} = this;
				if (!click_time.day) return false;
				let {
					year,
					month,
					day
				} = getYearMonthDay(getDate(click_time.year, click_time.month, click_time.day));
				let {
					year: y,
					month: m,
					day: d
				} = getYearMonthDay(date);
				return year === y && month === m && day === d;
			},
			clickDate(date) { // 点击日期
				let {
					year,
					month,
					day
				} = getYearMonthDay(date);
				this.click_time = {
					year,
					month,
					day
				};
				this.$emit('calendarTap', {
					year,
					month,
					day
				})
			},
			prevMonth() { // 上一月
				let {
					time: {
						year,
						month
					}
				} = this;
				let d = getDate(year, month, 1);
				d.setMonth(d.getMonth() - 1);
				this.time = getYearMonthDay(d);
				// this.click_time = {};
				this.$emit('monthTap', getYearMonthDay(d))
			},
			nextMonth() { // 下一月
				// 获取当前的年月的日期
				let {
					time: {
						year,
						month
					}
				} = this;
				let d = getDate(year, month, 1);
				d.setMonth(d.getMonth() + 1);
				this.time = getYearMonthDay(d);
				// this.click_time = {};
				this.$emit('monthTap', getYearMonthDay(d))
			},
			monthChange(e) {
				let {
					value
				} = e.detail;
				let timeArr = value.split('-');
				this.time = {
					year: timeArr[0],
					month: timeArr[1] - 1,
					day: 1
				};
				this.$emit('monthTap', {
					year: timeArr[0],
					month: timeArr[1] - 1,
					day: 1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content-calendar {
		padding: 0 20rpx;
		box-sizing: border-box;

		.content-calendar-top {
			height: 93rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #ededed;

			.content-calendar-top-left {}

			.content-calendar-top-center {
				font-size: 34rpx;
				color: #333;
			}

			.content-calendar-top-right {}
		}

		.content-calendar-week {
			display: flex;
			align-items: center;

			.content-calendar-week-item {
				width: 95rpx;
				height: 95rpx;
			}
		}

		.content-calendar-list {
			display: flex;
			flex-wrap: wrap;

			.content-calendar-list-li {
				flex-direction: column;
				width: 95rpx;
				height: 95rpx;
				border-radius: 50%;
				font-size: 32rpx;
				transition: 0.3s;
				color: #45B3FE;

				.day {
					line-height: 32rpx;
				}

				.msg {
					font-size: 22rpx;
					color: #666;
				}

				.msgActive {
					color: #fff !important;
				}

				.notCurrentMonth {
					color: #ddd !important;
				}
			}

			.bgColor {
				background: #5DBDFE;
				color: #fff !important;
			}

			.bgColorCheck {
				background: #bdd7ff;
				color: #fff !important;
			}

		}
	}
</style>
