<template>
	<view class="wrap">
<!-- 	    <button class="button-circle" hover-class="bg-click" @tap="getUserProfile1" >Student</button>
	    <button class="button-circle" hover-class="bg-click" @tap="getUserProfile2" >Admini</button>
		 -->
		<u-button shape="circle" size="medium" :custom-style="customStyle" @click="getUserProfile1">Student</u-button>
		<u-button shape="circle" size="medium" :custom-style="customStyle" @click="getUserProfile2">Admini</u-button>
		
	</view>
	
</template>

<script>
	// var  background = require("../../common/animation/background.js");
	import { mapState } from 'vuex'
	export default {
	
	  data() {
	  	return {
	       userInfo: {"nickname": "emptyForTest"}
	  	}
	  },
	  onShow() {
	  	uni.setNavigationBarTitle({
	  	title:'CloudBox'
	  	})
	  },
	  // onReady: function (e) {
	  // 	background.draw_background()
	  // },
	  computed: {
	  	...mapState(['wechatInfo'])
	  },
	  methods:{
		  customStyle: {
		  		marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
				color:'#DDA0DD'
		  	},
		getUserProfile1() {
			if (this.wechatInfo != true){
				const page = this
				wx.getUserProfile({
					desc: '获取你的昵称、头像、地区及性别',
					success: res => {
						console.log("data",res.userInfo);
						page.$store.commit('SET_WECHATINFO',true)
						page.$store.commit('SET_USERWECHATINFO',res.userInfo)
						
						uni.navigateTo({
							url: './stu_register',
						})	
					
					},
					fail: res => {
						console.log(res)
						this.navigate = false
						//拒绝授权
						wx.showToast({
							title: '请授权',
							icon: 'error',
							duration: 2000
						});
					},
				});		   		
			}
			else{
				uni.navigateTo({
					url: './stu_register',
				})	
									
			}
			 			            
	    },	
		getUserProfile2() {
			if (this.wechatInfo != true){
				const page = this
				wx.getUserProfile({
					desc: '获取你的昵称、头像、地区及性别',
					success: res => {
						console.log("data",res.userInfo);
						page.$store.commit('SET_WECHATINFO',true)
						page.$store.commit('SET_USERWECHATINFO',res.userInfo)
						
						uni.navigateTo({
							url: './adm_register',
						})	
					
					},
					fail: res => {
						console.log(res)
						this.navigate = false
						//拒绝授权
						wx.showToast({
							title: '请授权',
							icon: 'error',
							duration: 2000
						});
					},
				});		   		
			}
			else{
				uni.navigateTo({
					url: './adm_register',
				})	
									
			}
			 			            
		},				   		          
	  }
	}
	
</script>

<style>
/* 	#myCanvas {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	} */
	.wrap {
		height: 400px;
		display:flex;
		justify-content: space-evenly;
		align-content: space-around;
		align-items: center;
		flex-direction: column;
	}


/* 	.button-circle {
			width: 300rpx;
			height: 100rpx;
			display: flex;
			margin-top: 300rpx;
			line-height: 100rpx;
			justify-content: center;
			border-radius: 25px;
			background:linear-gradient(to right, #DDA0DD, #800080);
			font-size: 38rpx;
			opacity:0.7; 
		} */


</style>


