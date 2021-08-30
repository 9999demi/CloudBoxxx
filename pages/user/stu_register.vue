<template>
	<view class="wrap">
		<form @submit="formSubmit" @reset="formReset">
			<u-form-item :label-position="labelPosition" label="用户名">
				<text :border="border" name="nickname">{{userWechatInfo.nickName}}</text>  
			</u-form-item>
			
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="姓名" prop="name">
				<input :border="border" placeholder="请输入姓名" v-model="model.name" type="text" name="stu_name"></input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性别" prop="sex">
				<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="model.sex" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item label="书院">
				<radio-group v-model="college" name="college" :width="radioCheckWidth" :wrap="radioCheckWrap">
					<label>
						<radio shape="circle" value="逸夫" /><text>逸夫</text>
					</label>
					<label>
						<radio value="学勤" /><text>学勤</text>
					</label>
					<label>
						<radio value="思廷" /><text>思廷</text>
					</label>
					<label>
						<radio value="祥波" /><text>祥波</text>
					</label>
				</radio-group>
			</u-form-item>
			<u-form-item label="学院">
				<radio-group v-model="school" name="school">
					<label>
						<radio value="SDS" /><text>SDS</text>
					</label>
					<label>
						<radio value="SSE" /><text>SSE</text>
					</label>
					<label>
						<radio value="LHS" /><text>LHS</text>
					</label>
					<label>
						<radio value="HSS" /><text>HSS</text>
					</label>
				</radio-group>
			</u-form-item>

			
			<form @submit="testSend">
			<u-form-item label="邮箱">
				<input class="uni-input" v-model="model.mail" name="email" placeholder="请输入邮箱" />
				<button type="success" size="mini" slot="right" form-type="submit"> 发送</button>
			
				
			</u-form-item>
			
			<u-form-item label="验证码">
				<input v-model="code" class="uni-input" placeholder="请输入验证码"/>
				<button size="mini" slot="right" type="primary" @tap="testValidate">提交验证码</button>
			</u-form-item>
			</form>
			
			<button class="formSub" size="medium" type="success" form-type="submit">绑定Submit</button>
				
		</form>
		
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
	</view>

<!-- 			<u-form-item label="邮箱" prop="mail">
				<u-input v-model="form.mail" />
				<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
			</u-form-item>
			 -->

<!-- 	<view class="container">	
		<page-head title="form">身份信息</page-head>
		<view class="user-form">
			<form @submit="formSubmit" @reset="formReset">
				
				<view class="form-item">
					<view class="label"> 用户名</view>
					<text class="uni-input" name="nickname">{{userWechatInfo.nickName}}</text>  
				</view>
				
				<view class="form-item">
					<view class="label"> 真实姓名</view>
					<input class="uni-input" v-model="stu_name" name="stu_name" placeholder="请输入姓名" />
				</view>
				
				<view class="form-item">
					<view class="label"> 手机号</view>
					<input class="uni-input" v-model="tel" name="tel" placeholder="请输入手机号" />
				</view>
				
				<view class="form-item">
					<view class="label">书院</view>
					<radio-group v-model="college" name="college">
						<label>
							<radio value="逸夫" /><text>逸夫</text>
						</label>
						<label>
							<radio value="学勤" /><text>学勤</text>
						</label>
						<label>
							<radio value="思廷" /><text>思廷</text>
						</label>
						<label>
							<radio value="祥波" /><text>祥波</text>
						</label>
					</radio-group>
				</view>
				
				<view class="form-item">
					<view class="label">学院</view>
					<radio-group v-model="school" name="school">
						<label>
							<radio value="SDS" /><text>SDS</text>
						</label>
						<label>
							<radio value="SSE" /><text>SSE</text>
						</label>
						<label>
							<radio value="LHS" /><text>LHS</text>
						</label>
						<label>
							<radio value="HSS" /><text>HSS</text>
						</label>
					</radio-group>
				</view>

				<form @submit="testSend">
				<view class="form-item">
					<view class="label"> 邮箱</view>
					
					<input class="uni-input" v-model="email" name="email" placeholder="请输入邮箱" />
					<button form-type="submit"> 发送</button>

					
				</view>
				
				<view class="form-item">
					<view class="label"> 验证码 </view>
					<input v-model="code" class="uni-input" placeholder="请输入验证码"/>
					<button type="primary" @tap="testValidate">提交验证码</button>
				</view>
				</form>
				
				
				<view class="save-btn">
					<button form-type="submit">绑定Submit</button>
					<button form-type="reset">重置Reset</button>
				</view>
			</form>
			
			
		</view>
		<canvas type="2d" id="myCanvas"></canvas>
	</view> -->
</template>
<script>
	var  graceChecker = require("../../common/graceChecker.js");
	var  background = require("../../common/animation/background.js");
	import { mapState } from 'vuex';
	import WXBizDataCrypt from "@/common/WXBizDataCrypt.js";       
	export default {

		onLoad() {
		//通过wx.login 获取用户code
				wx.login({
					success: res => {
						if (res.code) {
							//微信登录成功 已拿到code
							this.jsCode = res.code; //保存获取到的code
							uni.request({//这步可以直接调取后端接口
								url: 'https://api.weixin.qq.com/sns/jscode2session',
								method: 'GET',
								data: {
									appid: 'wx90c0981a7d075908', //你的小程序的APPID
									secret: 'd6f38285c98639f218a5b0f25491fd51', //你的小程序的secret,
									js_code: res.code //wx.login 登录成功后的code
								},
								success: cts => {
									// 换取成功后 暂存这些数据 留作后续操作
									this.openid = cts.data.openid; //openid 用户唯一标识
									this.session_key = cts.data.session_key; //session_key  会话密钥
								}
							});
						} else {
							console.log('登录失败！' + res.errMsg);
						}
					}
				});
			},
		


		data() {
			return {
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
				form: {
					name: '',
					intro: '',
					sex: ''
				},
				// checkboxList: [
				// 	{
				// 		name: '苹果',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '雪梨',
				// 		checked: false,
				// 		disabled: false
				// 	},
				// 	{
				// 		name: '柠檬',
				// 		checked: false,
				// 		disabled: false
				// 	}
				// ],
				radioListCollege: [
					{
						name: '思廷',
						disabled: false
					},
					{
						name: '逸夫',
						disabled: false
					},
					{
						name: '祥波',
						disabled: false
					},
					{
						name: '学勤',
						disabled: false
					}
				],radioListCollege: [
					{
						name: '思廷',
						disabled: false
					},
					{
						name: '逸夫',
						disabled: false
					},
					{
						name: '祥波',
						disabled: false
					},
					{
						name: '学勤',
						disabled: false
					}
				],
				radioListSchool: [
					{
						name: 'SDS',
						disabled: false
					},
					{
						name: 'SME',
						disabled: false
					},
					{
						name: 'SSE',
						disabled: false
					},
					{
						name: 'HSS',
						disabled: false
					}
				],
				actionSheetList: [
					{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
				radioCollege: '',
				radioSchool: '',
				switchVal: false,
				actionSheetShow: false,
				
				codeTips: '',
				
				userInfo: {},
				textMsg: "hi",
				code: '',
				codeId: '',
				email: '',
				effectiveTime: 300,
				statusJson: {
					'-5':'验证失败',
					'-4': '验证码已使用',
					'-3': '验证码已失效',
					'-2': '当前邮箱未发送验证码',
					'-1': '还未发送验证码',
					'0': '验证码不正确',
					'1': '验证成功'
				},
				codeValidate: -6
			}
		},
		computed: {
			...mapState(['wechatInfo','userWechatInfo'])
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			},
			checkboxChange(e) {
				this.model.agreement = e.value;
			},
			codeChange(text) {
				this.codeTips = text;
			},
			
			onShow() {
				console.log("registe",this.userWechatInfo)
				uni.setNavigationBarTitle({
				title:'CloudBox'
				})
			},

			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                //定义表单规则
                var rule = [
					// no rule for the name
                    //{name:"nickname", checkType : false, checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"},
     //                {name:"college", checkType : "in", checkRule:"逸夫,学勤,思廷,祥波",  errorMsg:"请选择书院"},
					// {name:"school", checkType : "in", checkRule:"SDS,SSE,LHS,HSS",  errorMsg:"请选择学院"},
					{name:"stu_name", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"}
                    //{name:"loves", checkType : "notnull", checkRule:"",  errorMsg:"请选择爱好"}
                ];
				
                //进行表单检查
                var formData = e.detail.value;
				console.log(formData)
                var checkRes = graceChecker.check(formData, rule);
				
				if (this.codeValidate != "1"){
					uni.showToast({title:"请先验证邮箱", icon:"none"});
					
				}
				else{
                    if(checkRes){
                        uni.showToast({title:"信息审核通过!请耐心等待跳转", icon:"none"});
                    	this.uploadInfo(e);
                    }else{
                    	uni.showToast({ title: graceChecker.error, icon: "none" });
                    }
					// uni.showToast({ title: graceChecker.error, icon: "none" });
				}
				
			},
			onReady: function (e) {
				// background.draw_background()
			
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			uploadInfo: function(e){
				uniCloud.callFunction({
					name:"user_info",
					
					data:{
						method:'register',
						username:e.detail.value.stu_name,
						school:e.detail.value.school,
						avatarUrl: this.userWechatInfo.avatarUrl,
						city: this.userWechatInfo.city,
						country: this.userWechatInfo.country,
						gender: this.userWechatInfo.gender,
						language: this.userWechatInfo.language,
						nickName: this.userWechatInfo.nickName,
						province: this.userWechatInfo.province,
						college:e.detail.value.college,
						wx_openid_mp: this.openid,
						email:this.model.mail,
						role:'Student'
						
					},
					
					
				}).then((res)=>{
					console.log(res)
					uni.hideLoading();
					if(res.result.status){
						console.log("Navigating to the home page")
						uni.reLaunch({
							url: '/pages/home/home'
						})
					}else{
						console.log('failed')
					}
				})
				// const register_url = "https://e86e7196-faff-4749-b1d1-6e4902441374.mock.pstmn.io/register"
				// const page = this
				// uni.request({
				// 	url: register_url,
				// 	method: 'PUT',
				// 	header: {
				// 		'content-type': 'application/x-www-form-urlencoded' 
				// 	},
				// 	data: {
				// 	  message: JSON.stringify(page.openid) 
				// 	},
				// 	success: (res) => {
						
				// 		page.$store.commit('SET_USERID',res.data.userid)
				// 		// //使用这个方法只需要this.$store.commit('方法名',要传入的变量)
				// 		page.$store.commit('SET_ISLOGIN',true)
				// 		console.log("new page")
				// 		uni.reLaunch({
				// 			url: '/pages/home/home'
				// 		})
				// 		console.log("new page")
				// 	} ,
				// 	fail: (res) => {
				// 	    console.log("fail");
					  
				// 	}
				// });
			},
			getUserProfile() {
				wx.getUserProfile({
					desc: '获取你的昵称、头像、地区及性别',
					success: res => {
						console.log(res.rawData);
						this.$store.commit('SET_WECHATINFO',true)
						this.$store.commit('SET_USERWECHATINFO',res.rawData)
					},
					fail: res => {
						console.log(res)
						this.navigate = false
						//拒绝授权
						wx.showToast({
							title: '不能正常使用小程序',
							icon: 'error',
							duration: 2000
						});
					},
			   });			            
			},
			testSend: function(e) {
				console.log(this.model.mail)
				console.log('email发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [
					// no rule for the name
				    //{name:"nickname", checkType : false, checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"},
				    {name:"email", checkType : "schoolemail", checkRule:"",  errorMsg:"请输入学校邮箱"},
					// {name:"nickname", checkType : "string", checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"},
				    //{name:"loves", checkType : "notnull", checkRule:"",  errorMsg:"请选择爱好"}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				console.log(checkRes)
				if(checkRes){
				    uni.showToast({title:"email 验证通过", icon:"none"});
					if(!this.model.mail){
			
						uni.showToast({
							duration: 1500,
							title: '请输入邮箱',
							mask: true,
							icon: 'none'
						})
						return;
					}
					uni.showLoading({
						mask: true
					})
					uniCloud.callFunction({
						name: "emailCode",
						data: {
							serviceType: 'qq',
							method: 'sendCode',
							html: '您注册的验证码是#code#',
							email: this.model.mail,
							subject: 'CloudBox 冰箱使用注册验证码'
						}
					}).then((res) => {
						console.log(res)
						uni.hideLoading();
						if (res.result.status) {
							this.codeId = res.result.id;
							uni.showToast({
								duration: 1500,
								icon: 'none',
								title: '发送成功',
								mask: true
							})
						} else {
							uni.showToast({
								duration: 1500,
								title: '发送失败',
								mask: true,
								icon: 'none'
							})
						}
					});
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			testValidate() {
				if(!this.code){
					uni.showToast({
						duration: 1500,
						title: '请输入验证码',
						mask: true,
						icon: 'none'
					})
					return;
				}
				if(!this.model.mail){
					uni.showToast({
						duration: 1500,
						title: '请输入邮箱',
						mask: true,
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					mask: true
				})
				uniCloud.callFunction({
					name: "emailCode",
					data: {
						code: this.code,
						method: 'validateCode',
						email: this.model.mail,
						codeId: this.codeId,
						effectiveTime: 300
					}
				}).then((res) => {
					uni.hideLoading();
					console.log("right code",this.codeValidate)
					this.codeValidate = res.result.status
					uni.showToast({
						duration: 1500,
						title: this.statusJson[res.result.status],
						mask: true,
						icon: 'none'
					})
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 30rpx;
	}
	
	#myCanvas {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}


	.uni-form-item .title {
		padding: 20rpx 0;
	}
	
	.user-form {
		.form-item {
			width: 100%;
			display: flex;
			align-items: center;
			
			.label {
				width: 160rpx;

				font-size: 10pt;

			}
			
			input {
				flex: 1;
			}
			
			.radio {
				display: flex;
				margin-right: 50rpx;
				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
	// .save-btn {
	// 	padding: 0 30rpx;
	// 	margin-top: 60rpx;
		
		
	// 	button {

	// 		// width: 50%;
	// 		// font-size: 10;
	// 		// background: linear-gradient(to right, #DDA0DD, #800080);
	// 		line-height: 15rpx;
	// 		font-size:12pt;
	// 		color: #AADA9E;
	// 		margin: auto;
	// 		margin-top: 20px;
	// 		border-radius: 5px;
	// 		border: 2px solid #8AC007;
	// 		padding: 20px 20px; 
	// 		width: 150px;
	// 		height: 50px; 

	// 	}
	// }
	.formSub{
		width: 150px;
		height: 40px;
		color: #AADA9E;
		border: 2px solid #8AC007;
		font-size: 15px;
		border-radius: 5px;
		left: 50%;
		// margin: 0 -75px;
		transform: translate(-50%,25%);
	}
	
	.Popup {
		width: 500rpx;
		background-color: #fff;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-left: -250rpx;
		transform: translateY(-50%);
		z-index: 320;
	}
	
	.Popup {
		.logo-auth {
			z-index: -1;
			position: absolute;
			left: 50%;
			top: 0%;
			transform: translate(-50%, -50%);
			width: 150rpx;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 8rpx solid #fff;
			border-radius: 50%;
			background: #fff;
		}
	
		image {
			height: 42rpx;
			margin-top: -54rpx;
		}
	}
	
	.Popup .title {
		font-size: 28rpx;
		color: #000;
		text-align: center;
		margin-top: 30rpx
	}
	
	.Popup .tip {
		font-size: 22rpx;
		color: #555;
		padding: 0 24rpx;
		margin-top: 25rpx;
	}
	
	.Popup .bottom .item {
		width: 50%;
		height: 80rpx;
		background-color: #eeeeee;
		text-align: center;
		line-height: 80rpx;
		font-size: 24rpx;
		color: #666;
		margin-top: 54rpx;
	}
	
	.Popup .bottom .item.on {
		width: 100%
	}
	
	.flex {
		display: flex;
	}
	
	.Popup .bottom .item.grant {
		font-size: 28rpx;
		color: #fff;
		font-weight: bold;
		background-color: #e93323;
		border-radius: 0;
		padding: 0;
	}
	
	.mask {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.65);
		z-index: 310;
	}

	
</style>