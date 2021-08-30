import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//为了方便测试，此处用vuex做全局数据
const store = new Vuex.Store({
	state: {
		userid: 0,
		userInfo: {},
		isLogin: false,
		userWechatInfo: {},
		wechatInfo: false,
		avatarUrl: ""
	},
	mutations: {
		SET_ISLOGIN(state, isLogin) {
			state.isLogin = isLogin
		},
		SET_USERID(state,userid){
			state.userid = userid
		},
		SET_TYPE(state,type){
			state.type = type
		},
		SET_USERWECHATINFO(state,userWechatInfo){
			state.userWechatInfo = userWechatInfo
		},
		SET_WECHATINFO(state,wechatInfo){
			state.wechatInfo = wechatInfo
		},
		SET_AVATARURL(state,avatarUrl){
			state.avatarUrl = avatarUrl
		}
	},
	actions: {
		//异步必须放在这里，而不能放在 mutation 里面
		
	}
})

export default store
