<template>
	<view class="u-demo">
		<view class="u-demo-wrap" style="background-color: #FFFFFF;">
			<view class="u-demo-title">放入日期</view>
			<view class="u-demo-area">
				<u-calendar v-model="show" ref="calendar" @change="change" :mode="mode"
					:start-text="startText" :end-text="endText" :range-color="rangeColor"
					:range-bg-color="rangeBgColor" :active-bg-color="activeBgColor" :btn-type="btnType"
				>
				</u-calendar>
				<view class="u-demo-result-line">
					<view class="u-config-item">
						<view class="u-item-title">状态</view>
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
		<view class="wrap">
			<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="姓名" prop="name">
					<u-input :border="border" placeholder="请输入姓名" v-model="model.name" type="text"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="性别" prop="sex">
					<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.sex" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="简介" prop="intro">
					<u-input type="textarea" :border="border" placeholder="请填写简介" v-model="model.intro" />
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="密码" prop="password">
					<u-input :password-icon="true" :border="border" type="password" v-model="model.password" placeholder="请输入密码"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="确认密码" label-width="150" prop="rePassword">
					<u-input :border="border" type="password" v-model="model.rePassword" placeholder="请确认密码"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="水果品种" label-width="150" prop="likeFruit">
					<u-checkbox-group @change="checkboxGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">{{ item.name }}</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="结算方式" prop="payType" label-width="150">
					<u-radio-group v-model="radio" @change="radioGroupChange" :width="radioCheckWidth" :wrap="radioCheckWrap">
						<u-radio shape="circle" v-for="(item, index) in radioList" :key="index" :name="item.name">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="所在地区" prop="region" label-width="150">
					<u-input :border="border" type="select" :select-open="pickerShow" v-model="model.region" placeholder="请选择地区" @click="pickerShow = true"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="商品类型" prop="goodsType" label-width="150">
					<u-input :border="border" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="请选择商品类型" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai" :label-position="labelPosition" label="手机号码" prop="phone" label-width="150">
					<u-input :border="border" placeholder="请输入手机号" v-model="model.phone" type="number"></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="验证码" prop="code" label-width="150">
					<u-input :border="border" placeholder="请输入验证码" v-model="model.code" type="text"></u-input>
					<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
				</u-form-item>
				<!-- 此处switch的slot为right，如果不填写slot名，也即<u-switch v-model="model.remember"></u-switch>，将会左对齐 -->
				<u-form-item :label-position="labelPosition" label="记住密码" prop="remember" label-width="150">
					<u-switch v-model="model.remember" slot="right"></u-switch>
				</u-form-item>
				<u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150">
					<u-upload width="160" height="160"></u-upload>
				</u-form-item>
			</u-form>
			<view class="agreement">
				<u-checkbox v-model="check" @change="checkboxChange"></u-checkbox>
				<view class="agreement-text">
					勾选代表同意uView的版权协议
				</view>
			</view>
			<u-button @click="submit">提交</u-button>
			<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
			<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>
			<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
			<view class="u-config-wrap">
				<view class="u-config-title u-border-bottom">
					参数配置
				</view>
				<view class="u-config-item">
					<view class="u-item-title">label对齐方式</view>
					<u-subsection :list="['左边', '上方']" @change="labelPositionChange"></u-subsection>
				</view>
				<view class="u-config-item">
					<view class="u-item-title">边框</view>
					<u-subsection :current="borderCurrent" :list="['显示', '隐藏']" @change="borderChange"></u-subsection>
				</view>
				<view class="u-config-item">
					<view class="u-item-title">radio、checkbox样式</view>
					<u-subsection :list="['自适应', '换行', '50%宽度']" @change="radioCheckboxChange"></u-subsection>
				</view>
				<view class="u-config-item">
					<view class="u-item-title">错误提示方式</view>
					<u-subsection :list="['message', 'toast', '下划线', '输入框']" @change="errorChange"></u-subsection>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				show: false,
				mode: 'date', // when chose day it is the one date mode
				result: "请选择日期",
				startText: '开始',
				endText: '结束',
				rangeColor: '#2979ff',
				rangeBgColor: 'rgba(41,121,255,0.13)',
				activeBgColor: '#2979ff',
				btnType: 'primary',
			}
		},
		computed: {
			showBtnStatus() {
				return this.show ? 0 : 1;
			}
		},
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
			change(e) {
				if (this.mode == 'range') {
					this.result = e.startDate + " - " + e.endDate;
				} else {
					this.result = e.result;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {
		
	}
</style>