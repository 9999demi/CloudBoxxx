<template>
	<view class="container">
		<view class="brand">
			<image class="w-100" src="../../static/logo_cloud.jpeg" mode="widthFix"></image>
		</view>
		
		<view class="user-form">
			<u-form-item :label-position="labelPosition" label="用户名">
				<text :border="border" name="nickname">{{userid.nickName}}</text>  
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="姓名">
				<text :border="border" name="nickname">{{userid.username}}</text>  
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="书院">
				<text :border="border" name="nickname">{{userid.college}}</text>  
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="学院">
				<text :border="border" name="nickname">{{userid.school}}</text>  
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="邮箱">
				<text :border="border" name="nickname">{{userid.email}}</text>  
			</u-form-item>
		</view>
		<view class="save-btn">
			<button size="mini" type="primary" @click="changeInfo">编辑</button>
		</view>
<!-- 			<list-cell line-right padding="30rpx">
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
			</list-cell> -->
			
<!-- 			<view class="save-btn">
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
			
		</view>
		 -->
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
			changeInfo(){
				var that = this
				console.log("hc")
				uni.navigateTo({
					url: '../user/change_info',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
  background:linear-gradient(to right, #FFF0F5,#DDA0DD);
}

.container{
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
	height: 70%;
	
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
	padding: 0 30rpx;
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
	// padding: 0 30rpx;
	margin-top: 60rpx;
	margin-left: 60rpx;
	// margin-left: 50%;
	// transform: translate(-50%,0);
	
	// button {

	// 	// width: 100%;
	// 	font-size: 13;
	// 	// background: #800080;
		
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