<template>
	<view>
		<page-head title="form">身份信息</page-head>
		
		
		<view class="user-form">
			<form @submit="formSubmit" @reset="formReset">

				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="姓名" prop="name">
					<input :border="border" placeholder="请输入姓名" v-model="model.name" type="text" name="adm_name"></input>
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
			
				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="120" :label-position="labelPosition" label="工号" prop="name">
					<input :border="border" placeholder="请输入工号" v-model="model.number" type="text" name="adm_number"></input>
				</u-form-item>

				

			
				
				<!-- 这里考虑是否可以用手机号输入，还是用邮箱可以验证是否是本校学生？
				(但不是不能access 学校database， 是否手机号足够？) -->
				
			
				<view class="uni-btn-v">
					<button form-type="submit">绑定Submit</button>
<!-- 

					<button type="default" form-type="reset">重置Reset</button>
 -->
				</view>
			</form>
		</view>
		<canvas type="2d" id="myCanvas"></canvas>
	</view>
</template>
<script>
	
	var  graceChecker = require("../../common/graceChecker.js");

	// var  background = require("../../common/animation/background.js");

	var  background = require("../../common/animation/background.js");
	var  wechatInfo = require("../../common/userinfo/userinfo.js");

	export default {
		data() {
			return {
				model:{
					name:'',
					number:'',
					
				}
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                //定义表单规则
                var rule = [
					{name:"college", checkType : "in", checkRule:"逸夫,学勤,思廷,祥波",  errorMsg:"请选择书院"},
					{name:"adm_name", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"},
					{name:"adm_number", checkType : "notnull", checkRule:"",  errorMsg:"请输入工号"}
                ];
                //进行表单检查
                var formData = e.detail.value;
                var checkRes = graceChecker.check(formData, rule);
                if(checkRes){
                    uni.showToast({title:"信息审核通过!请耐心等待跳转", icon:"none"});
					this.uploadInfo();
                }else{
                    uni.showToast({ title: graceChecker.error, icon: "none" });
                }
				
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			onReady: function (e) {
				// background.draw_background()
			
			},
			uploadInfo: function(e){
				const register_url = "https://e86e7196-faff-4749-b1d1-6e4902441374.mock.pstmn.io/register2"
				const page = this
				uni.request({
					url: register_url,
					method: 'PUT',
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					data: {
					  message: JSON.stringify(page.openid) 
					},
					success: (res) => {
						console.log(res.data.userid)
						page.$store.commit('SET_USERID',res.data.userid)
						// //使用这个方法只需要this.$store.commit('方法名',要传入的变量)
						page.$store.commit('SET_ISLOGIN',true)
						console.log("new page")
						uni.reLaunch({
							url: '/pages/home/home'
						})
						console.log("new page")
					} ,
					fail: (res) => {
					    console.log("fail");
					  
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	#myCanvas {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.user-form {
		padding: 30rpx;
	}
	
	.uni-btn-v{
		padding: 0 30rpx;
		margin-top: 80rpx;
		
		
		button {

			line-height: 15rpx;
			font-size:12pt;
			color: #AADA9E;
			margin: auto;
			margin-top: 20px;
			border-radius: 5px;
			border: 2px solid #8AC007;
			padding: 20px 20px; 
			width: 150px;
			height: 50px; 
        }
	}
</style>
