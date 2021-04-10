<template>
	<view class="popup-box" :class="visible?'popup-box-open':''" @click="cancel">
		<view class="popup-box-main" :class="visible?'popup-box-main-open':''" @click.stop="prevent">
			<view class="popup-box-head">
				<text class="cancel" @click="cancel">取消</text>
				<text class="confirm" @click="confirm">确定</text>
			</view>
			<view class="popup-box-content">
				<picker-view class="picker-view" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column>
						<view class="picker item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker item" v-for="(item,index) in days" :key="index">{{item}}日</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker item" v-for="(item,index) in hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker item" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker item" v-for="(item,index) in seconds" :key="index">{{item}}秒</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "popup-list-select",
		data() {
			return {
				years: [],
				months: [],
				days: [],
				hours: [],
				minutes: [],
				seconds: [],
				dayLength: 30,
				value: [0, 0, 0, 0, 0, 0],
				month: '',
				year: '',
				hour: '',
				minute: '',
				second: '',
				flag: false,
				indicatorStyle: `height: 80rpx;`
			};
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			startTime: {
				type: Array,
				default: () => [2020, 6, 5, 12, 25, 25]
			},
			endTime: {
				type: Number,
				default: 2099
			}
		},
		mounted() {
			const time = new Date()
			const year = time.getFullYear()
			const month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
			this.month = month
			this.year = year

			const hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
			const minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
			const second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()

			this.hour = hour.toString()
			this.minute = minute.toString()
			this.second = second.toString()

			this.getDaysInOneMonth(year, month)
			this.getYears()
			this.getMonth()
			this.getDays()
			this.getHour()
			this.getMinute()
			this.getSecond()

			// 获取初始位置

			this.value = [this.years.indexOf(this.year), this.months.indexOf(this.month), this.days.indexOf(time
					.getDate()), this.hours.indexOf(this.hour), this.minutes.indexOf(this.minute), this.seconds
				.indexOf(this.second)
			]

		},
		methods: {
			bindChange(e) {
				this.getDaysInOneMonth(this.years[e.target.value[0]], this.months[e.target.value[1]])
				this.flag = true
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
				this.hour = this.hours[val[3]]
				this.minute = this.minutes[val[4]]
				this.second = this.seconds[val[5]]


				this.getDays()

			},
			// 获得年份
			getYears() {
				for (let i = this.startTime[0]; i <= this.endTime; i++) {
					this.years.push(i)
				}
			},
			// 获取月份
			getMonth() {
				// const time = new Date()
				for (let i = 1; i <= 12; i++) {
					if (i < 10) {
						this.months.push('0' + i)
					} else {
						this.months.push(i)

					}
				}
			},
			getDays() {
				this.days = []
				for (let i = 1; i <= this.dayLength; i++) {
					if (i < 10) {
						this.days.push('0' + i)
					} else {
						this.days.push(i)
					}
				}
			},
			// 获取某年某月多少天
			getDaysInOneMonth(year, month) {
				month = parseInt(month, 10)
				var d = new Date(year, month, 0)
				this.dayLength = d.getDate()
				this.getDays()
				return d.getDate()
			},
			//获取小时
			getHour() {
				for (let i = 0; i < 24; i++) {
					let str = i;
					if (i < 10) {
						str = '0' + str;
					} else {
						str = '' + str;
					}
					this.hours.push(str);
				}
			},

			//获取分钟
			getMinute() {
				for (let i = 0; i < 60; i++) {
					let str = i;
					if (i < 10) {
						str = '0' + str;
					} else {
						str = '' + str;
					}
					this.minutes.push(str);
				}
			},
			//获取秒
			getSecond() {
				for (let i = 0; i < 60; i++) {
					let str = i;
					if (i < 10) {
						str = '0' + str;
					} else {
						str = '' + str;
					}
					this.seconds.push(str);
				}
			},


			// 取消
			cancel() {
				this.$emit("cancel", false)
			},
			// 确定
			confirm() {
				for (const [index, val] of this.months.entries()) {
					if (val < 10) {
						this.months[index] = val
					}
				}
				for (const [index, val] of this.days.entries()) {
					if (val < 10) {
						this.days[index] = val
					}
				}
				if (!this.flag) {
					this.$emit('confirm', {
						year: this.years[this.value[0]],
						month: this.months[this.value[1]],
						day: this.days[this.value[2]],
						hour: this.hours[this.value[3]],
						minute: this.minutes[this.value[4]],
						second: this.seconds[this.value[5]],
					})
					this.cancel()
					return
				}

				this.$emit('confirm', {
					year: this.year,
					month: this.month,
					day: this.day,
					hour: this.hour,
					minute: this.minute,
					second: this.second
				})
				this.cancel()
			},

			prevent() {},
		}
	}
</script>

<style lang="scss" scoped>
	.popup-box-open {
		background: rgba(0, 0, 0, 0.5) !important;
		z-index: 999 !important;
	}

	.popup-box {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		transition: 0.4s;
		z-index: -999;

		.popup-box-main-open {
			height: 700rpx !important;
		}

		.popup-box-main {
			display: flex;
			flex-direction: column;
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 0;
			transition: 0.4s;
			background: #fff;

			.popup-box-head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 40rpx;
				box-sizing: border-box;
				height: 100rpx;
				border-bottom: 1rpx solid #ededed;
				font-size: 28rpx;

				.cancel {
					color: #999;
				}

				.confirm {
					color: #1676ec;
				}
			}

			.popup-box-content {
				flex: 1;

				.picker-view {
					width: 100%;
					height: 100%;

					.picker {
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>
