<template>
	<view class="u-demo">
		<view class="u-demo-wrap" style="background-color: #FFFFFF;">
			<view class="u-demo-title">放入</view>
			<view class="u-demo-area">
				<!-- <u-field
					v-model="mobile"
					label="日期"
					:error-message="errorMessage"
					placeholder="请填写手机号"
					:required="required"
					:icon="icon1"
					:type="type"
				>
				</u-field> -->
				<view class="u-demo">
					<view class="u-demo-wrap" style="background-color: #FFFFFF;">
						<view class="u-demo-title">放入日期</view>
						<view class="u-demo-area">
							<u-calendar v-model="show" ref="calendar" @change="change1" :mode="mode"
								:start-text="startText" :end-text="endText" :range-color="rangeColor"
								:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
							>
							</u-calendar>
							<view class="u-demo-result-line">
								<view class="u-config-item">
									<view class="u-item-title"></view>
									<u-subsection :current="showBtnStatus" :list="['选择日期', '已确定日期']" @change="showChange"></u-subsection>
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="u-config-wrap">
						<view class="u-config-title u-border-bottom">
							参数配置
						</view>
						<view class="u-config-item">
							<view class="u-item-title">状态</view>
							<u-subsection :current="showBtnStatus" :list="['显示', '隐藏']" @change="showChange"></u-subsection>
						</view>
						<view class="u-config-item">
							<view class="u-item-title">模式</view>
							<u-subsection current="1" :list="['单个日期', '日期范围']" @change="modeChange"></u-subsection>
						</view>
						<view class="u-config-item">
							<view class="u-item-title">自定义样式</view>
							<u-subsection current="1" :list="['是', '否']" @change="styleChange"></u-subsection>
						</view>
					</view> -->
				</view>
				<u-field
					v-model="code"
					label="放入天数"
					placeholder="请填写放入天数"
					:required="required"
					:icon="icon2"
				>
				</u-field>
			</view>
			
		</view>
		<view class="u-demo-wrap" style="background-color: #ffffff;">
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-collapse v-if="key" :item-style="itemStyle" event-type="close" :arrow="arrow" :accordion="accordion" @change="change">
					<u-collapse-item :index="index" @change="itemChange" :title="item.head" v-for="(item, index) in itemList" :key="index">
						{{item.body}}
						<view class="wrap">
							<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
								<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="物品名称" prop="name">
									<u-input :border="border" placeholder="请输入物品名称" v-model="model.name" type="text"></u-input>
								</u-form-item>
								
								<u-form-item :label-position="labelPosition" label="上传物品图片" prop="photo" label-width="150">
									<u-upload width="160" height="160"></u-upload>
								</u-form-item>
								
								<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="保质日期" prop="name">
									<u-input :border="border" placeholder="请输保质日期" v-model="model.startTime" type="text"></u-input>
								</u-form-item>
								
								<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="延长存放时长" prop="name">
									<u-input :border="border" placeholder="请输入延长存放时长" v-model="model.duration" type="text"></u-input>
								</u-form-item>
							</u-form>	
						</view>
					</u-collapse-item>
				</u-collapse>
			</view>
		</view>
		<view class="save-btn">
			<!-- 需要延长存放时间,点<u-button @click="extend">这里</u-button>展开 -->
			<u-button @click="submit">打印</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				mobile: '',
				startTime: '',
				errorMessage: '',
				duration: '',
				required: false,
				placeholderColor: this.$u.color['tipsColor'],
				arrow: false,
				showBtn: false,
				icon1: '',
				icon2: '',
				type: 'text',
				show: false,
				mode: 'date', // when chose day it is the one date mode
				result: "请选择日期",
				startText: '开始',
				endText: '结束',
				rangeColor: '#2979ff',
				rangeBgColor: 'rgba(41,121,255,0.13)',
				activeBgColor: '#2979ff',
				btnType: 'primary',
				model: {
					name: '',
					sex: '',
					likeFruit: '',
					intro: '',
					payType: '支付宝',
					agreement: false,
					region: '',
					goodsType: '',
					phone: '',
					code: '',
					password: '',
					rePassword: '',
					remember: false,
					photo: ''
				},
				border: false,
				check: false,
				selectStatus: 'close',
				actionSheetShow: false,
				pickerShow: false,
				selectShow: false,
				radioCheckWidth: 'auto',
				radioCheckWrap: false,
				labelPosition: 'left',
				codeTips: '',
				errorType: ['message'],
				itemList: [{
					head: "需要延长存放时间,点这里展开",
					body: "延长存放时间",
					show: false,
				}],
				accordion: true,
				arrow: true,
				hoverClass: 'hover2',
				itemStyle: {},
				key: true
			}
		},
		computed: {
			showBtnStatus() {
				return this.show ? 0 : 1;
			}
		},
		// onReady() {
		// 	this.$refs.uForm.setRules(this.rules);
		// },
		methods: {
			showChange(index) {
				this.show = !index;
			},
			modeChange(index) {
				this.mode = index == 0 ? 'date' : 'range';
				console.log(this.mode)
				this.show = true;
			},
			styleChange(index) {
				if(index == 0) {
					this.startText = '住店';
					this.endText = '离店';
					this.activeBgColor = '#19be6b';
					this.rangeColor = '#19be6b';
					this.rangeBgColor = 'rgba(25,190,107, 0.13)';
					this.btnType = 'success';
				} else {
					this.startText = '开始';
					this.endText = '结束';
					this.activeBgColor = '#2979ff';
					this.rangeColor = '#2979ff';
					this.rangeBgColor = 'rgba(41,121,255,0.13)';
					this.btnType = 'primary';
				}
				this.show = true;
			},
			customChange(index) {
				if(index == 0) {
					this.icon1 = 'map';
					this.icon2 = 'photo';
					this.arrow = true;
				} else {
					this.icon1 = '';
					this.icon2 = '';
					this.arrow = false;
				}
			},
			textareaChange(index) {
				this.type = index == 0 ? 'textarea' : 'text';
			},
			change1(e) {
				if (this.mode == 'range') {
					this.result = e.startDate + " - " + e.endDate;
				} else {
					this.result = e.result;
				}
			},
			submit() {
				
			},			
			change(index) {
				let str = '';
				if(Array.isArray(index)) {
					let arr = index.map(val => {
						return Number(val) + 1;
					})
					index = arr.join(',');
				} else {
					index = Number(index) + 1;
				}
				this.$refs.uToast.show({
					title: '延长存放时间',
					type: 'warning'
				})
			},
			itemChange(e) {
				console.log(e);
			},
			changeStatus() {
				this.key = false;
				this.$nextTick(function(){
					this.key = true;
				})
			}
			
		
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {
		
	}
	.wrap {
		padding: 30rpx;
	}
	
	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;
	
		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>
