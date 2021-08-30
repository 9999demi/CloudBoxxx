<script>
	const config = require('./key')
	export default {
		globalData: {
		  userid: uni.getStorageSync("userid"),
		  openid: uni.getStorageSync("openid")
		},
	
		onLaunch: function() {
            
			const page = this
			console.log('App Launch')
			
			// uni.getSystemInfo({//获取手机的状态栏高度单位px
			// 				success: function(e) {
			// 					Vue.prototype.statusHeight = e.statusBarHeight;
			// 					let menu = wx.getMenuButtonBoundingClientRect();//获取获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。（top表示上边框到手机顶部的距离 bottom是下边框到手机顶部的距离）
			// 					Vue.prototype.menu = menu;
			// 					Vue.prototype.barHeight = menu.bottom + menu.top - e.statusBarHeight;	
			// 			})
						
			
			
			
			const login_url = "https://e86e7196-faff-4749-b1d1-6e4902441374.mock.pstmn.io/api/login"
			
			
			if (this.userid && this.openid) {
				// already logged in 
				// waiting for other process
				console.log("already logged in ")
			}
			else {
				console.log(" not logged in, waitting to find info in the database")		
                //setTimeout(function(){ console.log("waiting"); }, 3000);
				
				uni.login({
							provider: 'weixin',
							success: function(res) {
								let appid = config.appId
								let secret = config.appSecret
								let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +
											res.code + '&grant_type=authorization_code';
							
								uni.request({
									url: url, // 请求路径
									success: result => {
										  
											// uni.setStorageSync('openid', result.data.openid);
	                                        uni.request({
	                                        	url: login_url,
	                                        	method: 'POST',
	                                        	header: {
	                                        	 
													'content-type': 'application/x-www-form-urlencoded' 
	                                        	},
	                                        	data: {
	                                        	  message: JSON.stringify(page.openid) 
	                                        	},
	                                        	success: (res) => {
													// 如果存在用户 返回userid
													// 如果不存在用户 返回none
													//console.log("userid",id)
													// for mock test
													//page.$store.commit('SET_USERID',0)
													page.$store.commit('SET_USERID',res.data.userid)
													//使用这个方法只需要this.$store.commit('方法名',要传入的变量)
													page.$store.commit('SET_ISLOGIN',false)
													//page.$store.commit('SET_ISLOGIN',res.data.userid != 0)
											
	                                        	} ,
												fail: (res) => {
												    console.log("fail");
												  
												}
	                                        });
										},
									});
								}
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			
			
		}
	}
</script>


<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import '~@/static/styles/app.scss';
</style>
