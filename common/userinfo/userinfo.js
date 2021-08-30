module.exports = {
	getUserProfile() {
		wx.getUserProfile({
			desc: '获取你的昵称、头像、地区及性别',
			success: res => {
				console.log(res.rawData);
				return res.rawData
			},
			fail: res => {
				console.log(res)
				//拒绝授权
				wx.showToast({
					title: '不能正常使用小程序',
					icon: 'error',
					duration: 2000
				});
				return {"message": "no info"}
			},
	   });
	}
}