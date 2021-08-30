<template>

	<view class="container">
		<!-- <image class="w-100" src="https://cn.bing.com/th?id=OHR.MontChoisy_ZH-CN5381…&rf=LaDigue_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4" mode="widthFix"></image> -->
		<view class="brand">
			<image class="w-100" src="../../static/logo_cloud.jpeg" mode="widthFix"></image>
		</view>
		<view class="content">
<!-- 			<view class="welcome" @tap="openLogin">
				<view>你好 {{ userid.role + " " + userid.nickName}}</view>
				
			</view> -->
		<!-- 	<view class="welcome">你好 {{ userid.role + " " + userid.nickName}}</view> -->
			<!-- member card begin -->
			<view class="member-card">
				<view class="info">
					<view class="title">
						<view class="welcome">你好 {{ userid.role + " " + userid.nickName}}</view>
						<!-- member card begin -->
						
						<view class="badage">
							{{ userid.college + " " + userid.room}}
						</view>
			<!-- 			
						<view class="tips">
							<view></view>
							<view class="badage">
								User Info
							</view>
							
						</view>
						 -->
					</view>

					<!-- <image @tap="info" src="https://wx.qlogo.cn/mmopen/vi_32/Hx7MFkCEmZVHziaTTiaHSiaCs4ApnH5CD0nYOhOg1nYUUMYtxMXkL6L4VL5icRfO5w4LGzW5ib0FZicwj2MficyYfZgCw/132" class="avatar"></image> -->
					<image :src="userid.avatarUrl" class="avatar"></image>
					<!-- <image src="https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132" class="avatar"></image> -->
<!-- 					<view class="badage">
						CloudBox User 
					</view>
					 
					
 -->
<!-- 					<view class="Popup">
						<u-form-item :label-position="labelPosition" label="真实姓名">
							<text :border="border" name="nickname">{{userid.username}}</text>  
						</u-form-item>
						<u-form-item :label-position="labelPosition" label="书院">
							<text :border="border" name="nickname">{{userWechatInfo.college}}</text>  
						</u-form-item>
						<u-form-item :label-position="labelPosition" label="学院">
							<text :border="border" name="nickname">{{userWechatInfo.school}}</text>  
						</u-form-item>
						<u-form-item :label-position="labelPosition" label="邮箱">
							<text :border="border" name="nickname">{{userWechatInfo.email}}</text>  
						</u-form-item>
						
					</view>
					
					 -->
<!-- 					<view class="info_item">
						{{userid.username}}
					</view>
					
				 -->	
				</view>
			</view>
	</view>
		<button class='btn_change_info' size="mini" type="primary" @tap="changeInfo">查看个人信息</button>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	
	
	export default {
		components: {

		},
		data() {
			return {
			}
		},
		// 实时更新
		computed: {
			...mapState(['wechatInfo','userWechatInfo','userInfo','userid'])
		},
		onLoad: function(e) {

   //        if (this.isLogin){
   //          	this.updateInfo(this.userid)
   //        }
		 //  else{
			// uni.navigateTo({
			// 	url: '/pages/user/modechoose'
			// })
		 //  }
		uniCloud.callFunction({
			name:"user_info",
			data:{
				id:uni.getStorageSync("openid"),
				method:'check'
			},
			
		}).then((res)=>{
			if(res.result.flag){
				// this.canIUseGetUserProfile = true
				console.log("already exist")
				console.log(res.result.flag)
				this.isLogin=res.result.flag
				uniCloud.callFunction({
					name:'user_info',
					data:{
						method:'get_info',
						id:uni.getStorageSync("openid"),
					}
				}).then((res)=>{
					this.$store.commit('SET_USERID',res.result[0])
					console.log(this.userid)
				})
			}else{
				console.log("not login")
				this.isLogin=res.result.flag
				// uni.navigateTo({
				// 	url: '/pages/user/modechoose'
				// 	})
			}
			
		})
		  
		},

		onShow() {
            uni.setNavigationBarTitle({
			title:'CloudBox'
			})
			console.log("My page")
			// this.userWechat = this.userWechatInfo
			console.log(this.userWechatInfo)
			console.log(typeof this.userWechatInfo)
			// console.log(this.userWechat)
			console.log(this.userWechatInfo.avatarUrl)

		},
		methods: {
			
			openLogin() {
			   console.log("opening",!this.isLogin)
			   if (!this.isLogin){
				 console.log(this.isLogin)
			     uni.navigateTo({
			     	url: '/pages/user/modechoose'
			     })
			   }
			},
			info() {
				uni.navigateTo({
					url: '/pages/my/info'
				})
			},
			// updateInfo(userid) {
			// 	console.log(userid)
				
				// only for fake test
				//http://139.198.183.185:1001/login?userid=787
				// const update_url = `http://139.198.183.185:1001/login?userid=${userid}`
				// uni.request({
				// 	url: update_url,
				// 	method: 'POST',
				// 	header: {
				// 	    'content-type': 'application/x-www-form-urlencoded' 
				// 	},
				// 	data: {
				// 	  message: JSON.stringify(this.openid) 
				// 	},
				// 	success: (res) => {
				// 		// 如果存在用户 返回userid
				// 		// 如果不存在用户 返回none			 
				// 		console.log("info",res.data.type == "学生Student")
			        
					    
				// 		this.$store.commit('SET_USERINFO',res.data)
				// 		// this.$store.commit('SET_TYPE',res.data.type == "学生Student")
				// 		//使用这个方法只需要this.$store.commit('方法名',要传入的变量)
				// 	} ,
				// 	fail: (res) => {
				// 	    console.log("fail");
				// 	}
				// });
			// },
			changeInfo(){
				var that = this
				console.log("hc")
				uni.navigateTo({
					url: '../user/user_info',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

// .Popup{
// 	position: absolute;
// 	left: 50%;
// 	transform: translate(-50%,0);
// 	top:50%;
// 	width: 300px;
// }
.info_item{
	display: block;
}
.btn_change_info {
  //  /* 渐变色 */
  // background: linear-gradient(to right, #DDA0DD, #800080);
  left: 50%;
  transform: translate(-50%,0);
}

/* #ifdef H5 */
page {
	height: auto;
	min-height: 100%;
}
/* #endif */

.content {
	padding: 30rpx 30rpx;
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


.member-card {
	background-color: $bg-color-white;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	border-radius: $border-radius-base;
	margin-bottom: 40rpx;
	
	.info {
		position: relative;
		margin-top: -50rpx;
		display: flex;
		align-items: center;
		position: relative;
		padding: 20rpx 0;
		border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.3);
		
		.title {
			flex: 1;
			font-size: 40rpx;
			color: $text-color-base;
			display: flex;
			align-items: center;
		
			.tips {
				margin-left: 10rpx;
				font-size: $font-size-sm;
				color: $text-color-assist;
				background-color: #e9e9e9;
				padding: 10rpx 30rpx;
				border-radius: 50rem !important;
				display: flex;
				align-items: center;
				
				image {
					width: 20rpx;
					height: 20rpx;
				}
			}
		}
		
		.avatar {
			width: 150rpx;
			height: 150rpx;
			border-radius: 100%;
			display: block;
		}
		.welcome {
			// position: relative;
			// margin-top: 136rpx;
			// display: flex;
			// flex-direction: column;
			// font-size: $font-size-lg;
			// color: $text-color-warning;
			font-size: 15pt;
			
		}
		
		.badage {
			font-family: 'neutra';
			position: absolute;
			bottom: 20rpx;
			left: 0;
			border: 2rpx solid $text-color-base;
			padding: 2rpx 20rpx;
			border-radius: $border-radius-lg;
			font-size: $font-size-base;
		}
	}
	
	.row {
		margin-top: $spacing-row-base;
		width: 100%;
		display: flex;
		align-items: center;

		.grid {
			flex: 1;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			image {
				width: 100rpx;
				height: 100rpx;
			}
			
			.value {
				font-family: 'neutra';
				margin-bottom: $spacing-col-sm;
				font-size: $font-size-lg;
			}
			
			.title {
				font-size: $font-size-sm;
				color: $text-color-grey;
			}
		}
	}
}



</style>
