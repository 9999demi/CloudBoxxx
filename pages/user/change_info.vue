<template>
	<view class="container">
		<view class="brand">
<!-- 			<image src="https://wx.qlogo.cn/mmopen/vi_32/vM0qx5z4BQUQU4icZNct8Oib0Q0ypMW6hdhejkBxrTzibvYHtdyaQI85hsWvL6PoA3ic3Jjwn99YdfxEj1ib7gvaJeQ/132" class="avatar"></image>
			<view class="username">CloudBox</view> -->
			<image class="w-100" src="../../static/logo_cloud.jpeg" mode="widthFix"></image>
		</view>
		
		
		<!-- <view class="user-form" v-if="type">
			<u-form-item :label-position="labelPosition" label="用户名">
				<text :border="border" name="nickname">{{this.userid.nickName}}</text>  
			</u-form-item>
			
			<list-cell line-right padding="30rpx">
					<view class="form-item">
						<view class="label">姓名</view>
						<input type="text" v-model="userInfo.name"/>
					</view>
			</list-cell>
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">书院</view>
					<input type="text" v-model="userInfo.college" />
				</view>
			</list-cell>
			
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">学院</view>
					<input type="text" v-model="userInfo.school" />
				</view>
			</list-cell>
			
			<view class="save-btn">
				<button type="info">保存</button>
			</view>
			
		</view>
			
		<view class="user-form" v-if="!type">
			
			<list-cell line-right padding="30rpx">
					<view class="form-item">
						<view class="label">姓名</view>
						<input type="text" v-model="userInfo.name"/>
					</view>
			</list-cell>
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">书院</view>
					<input type="text" v-model="userInfo.college" />
				</view>
			</list-cell>
			
			<list-cell line-right padding="30rpx">
				<view class="form-item">
					<view class="label">管理者账号</view>
					<input type="text" v-model="userInfo.adm_number" />
				</view>
			</list-cell>
			
			<view class="save-btn">
				<button type="info">保存</button>
			</view>
			
		</view> -->
		<form @submit="uploadInfo" @reset="formReset">
					<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="姓名" prop="name">
						<input :border="border" placeholder="请输入姓名" v-model="model.name" type="text" name="stu_name"></input>
					</u-form-item>
					<u-form-item label="房间号" prop="room">
						<input :border="border" placeholder="请输入房间号" v-model="model.room" type="text" name="room"></input>
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
					<button class="formSub" size="medium" type="success" form-type="submit">绑定Submit</button>
					
		</form>
		
	</view>

	
		
		

	
</template>

<script>
	import { mapState } from 'vuex'
	import listCell from '../../components/list-cell/list-cell.vue'
	
	
	
	export default {
		components: {
			listCell
		},
		data() {
			return {
				model:{
					name:'',
					room:'',
					
				}
               
			}
		},
		// 实时更新
		computed: {
			...mapState(['isLogin', 'userInfo','userid','type','userWechatInfo'])
		},


		onShow() {
			uni.setNavigationBarTitle({
			title:'CloudBox'
			})
			console.log("My page")
			console.log(this.userid)
			console.log(this.userid.college)
			console.log(this.userWechatInfo.avatarURL)
			

		},
		methods: {
			uploadInfo: function(e){
				console.log('开始修改')
				uniCloud.callFunction({
					name:"user_info",
					
					data:{
						method:'change',
						username:e.detail.value.stu_name,
						school:e.detail.value.school,
						avatarUrl: this.userid.avatarUrl,
						city: this.userid.city,
						country: this.userid.country,
						gender: this.userid.gender,
						language: this.userid.language,
						nickName: this.userid.nickName,
						province: this.userid.province,
						college:e.detail.value.college,
						idno:this.userid._id,
						wx_openid_mp: this.userid.wx_openid_mp,
						email:this.userid.email,
						role:this.userid.role,
						room:e.detail.value.room
						
					},
					
					
				}).then((res)=>{
					console.log(res)
					uni.hideLoading();
					if(res.result.updated){
						uni.showToast({title:"信息修改成功！", icon:"none"});
						console.log("Navigating back")
						uni.reLaunch({
							url: '/pages/user/user'
						})
						// uni.preloadPage({
						// 	url:'pages/user/user_info'
						// })
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
		}
	}
</script>

<style lang="scss" scoped>
page {
  background:linear-gradient(to right, #FFF0F5,#DDA0DD);
}

.container{
	padding: 30rpx;
	//background:linear-gradient(to right, #FFF0F5,#DDA0DD);
	opacity:0.7; 
}
.brand {
	background-color: linear-gradient(to right, #f7b733, #fc4a1a);;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40rpx 0;
	margin-bottom: 20rpx;
	
	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 100%;
		margin-bottom: 30rpx;
	}
	
	.username {
		color: linear-gradient(to right, #f7b733, #fc4a1a);
		font-weight: bold;
	}
}

.user-form {
	.form-item {
		width: 100%;
		display: flex;
		align-items: center;
		// background:linear-gradient(to right, #FFF0F5,#DDA0DD);
		opacity:0.7; 
		
		
		.label {
			width: 160rpx;
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

.save-btn {
	padding: 0 30rpx;
	margin-top: 60rpx;
	
	// button {
	// 	width: 100%;
	// 	font-size: 13;
	// 	background: #800080;
		
	// }
}

.telphone-modal {
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		font-size: 13;
		font-weight: bold;
		margin-bottom: 30rpx;
		
		.close-icon {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 0;
		}
	}
	
	.tips {
		color: linear-gradient(to right, #f7b733, #fc4a1a);
		line-height: 1.2rem;
		margin-bottom: 50rpx;
	}
	
	.telphone-form {
		font-size: 13;
		
		.telphone-input {
			width: 100%;
			display: flex;
			align-items: center;
			
			.prefix {
				color: linear-gradient(to right, #f7b733, #fc4a1a);
				display: flex;
				align-items: center;
				padding-right: 20rpx;
				position: relative;
				margin-right: 10rpx;
				
				&::after {
					content: " ";
					position: absolute;
					width: 4rpx;
					background-color: linear-gradient(to right, #f7b733, #fc4a1a);
				}
			}
			
			input {
				flex: 1;
			}
		}
		
		.verfiycode-input {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.countdown {
				font-size: 13;
			}
		}
	}
	
	.footer {
		margin-top: 30rpx;
		button {
			font-size: 13;
		}
	}
}
</style>