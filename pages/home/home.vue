<template>
	<view>
<!-- 		<view class="container">
		  <view class="userinfo">
		    <view v-if="!hasUserInfo">
		      <button v-if="canIUseGetUserProfile" @tap="getUserProfile"> 获取头像昵称 </button>
		   </view> 
		    <view v-else>
		     <image bindtap="bindViewTap" class="userinfo-avatar" src="userInfo.avatarUrl" mode="cover"></image>
		      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
		    </view>
		  </view>
		</view> -->
		<Father>
		    <view
		      class="content"
		      slot="content"
		    >
		    <!-- 业务代码模块 -->
		    </view>
		</Father>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import {mapActions} from "vuex"
	import bg from './component/background.vue'
	import infoPopup from './component/get_user_info_popup.vue'
	
	export default {
		components: {
			bg,
			infoPopup	
		},
		data() {
			return {
	          userInfo: {},
	          hasUserInfo: false,
	          canIUseGetUserProfile: false,
			}
		},
		// 实时更新
		computed: {
			// ...mapState(['userid'])
		},
		

		onLoad: function(e) {
			wx.login({
				success: res => {
					if (res.code) {
						//微信登录成功 已拿到code
						this.jsCode = res.code; //保存获取到的code
						uni.request({//这步可以直接调取后端接口
							url: 'https://api.weixin.qq.com/sns/jscode2session',
							method: 'GET',
							data: {
								appid: '***', //你的小程序的APPID
								secret: '***', //你的小程序的secret,
								js_code: res.code //wx.login 登录成功后的code
							},
							success: cts => {
								// 换取成功后 暂存这些数据 留作后续操作
								this.openid = cts.data.openid; //openid 用户唯一标识
								uni.setStorageSync("openid",this.openid);
								this.session_key = cts.data.session_key; //session_key  会话密钥
								console.log(this.openid)
							}
						});
					} else {
						console.log('登录失败！' + res.errMsg);
					}
				}
			});
			// let op=uni.getStorageSync("openid");
			// console.log(op)
			uniCloud.callFunction({
				name:"user_info",
				data:{
					id:uni.getStorageSync("openid"),
					method:'check',
				},
				
			}).then((res)=>{
				if(res.result.flag){
					this.canIUseGetUserProfile = true
					console.log("already exist")
					console.log(res.result.flag)
				}else{
					
					console.log("Navigating to the register page")
					uni.navigateTo({
						url: '/pages/user/modechoose'
						})
				}
				
			})
			
			
			// if (uni.getUserProfile) {
			//   this.canIUseGetUserProfile = true
			// }
			// if (!this.isLogin){
	  //       console.log("Navigating to the register page")
	  //       uni.navigateTo({
	  //       	url: '/pages/user/modechoose'
			// 	})
			// }
	
		},
		onShow() {
			this.init()
			console.log("here")
			uni.setNavigationBarTitle({
			title:'CloudBox'
			})
		},
		methods: {
			...mapActions(['login']),
			init(){
				this.login();
			},
			openLogin() {
			   console.log("opening")
			   if (!this.isLogin){
				 console.log(this.isLogin)
			     uni.navigateTo({
			     	url: '/pages/my/register'
			     })
			   }
			},
			getUserInfo(){
			    console.log("aaaa")
			    wx.getUserProfile({
			        desc:'Wexin',     // 这个参数是必须的
			        success:res=>{
			            console.log("用户信息",res.rawData)
			        },
					fail(res) {
						console.log("用户信息",res)
					}
			    })
			},
			
			info() {
				uni.navigateTo({
					url: '/pages/my/info'
				})
			},
		}
	}
</script>

<style>
</style>
