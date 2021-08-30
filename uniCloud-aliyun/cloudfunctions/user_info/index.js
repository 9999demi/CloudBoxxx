'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// const db = uniCloud.database();
	// const collection = db.collection('student');
	const myCloud = uniCloud.init({
	provider: 'aliyun',
	spaceId: '2fa0bd7b-7fdd-4448-8348-f931a3c6b0e9',
	clientSecret: 'CF1TkzmFUCBYE1hNjJDmNA=='
	});
	const db = myCloud.database();
	const collection = db.collection('student');
	switch(event.method){
		case 'register':
			console.log('event : ', event)
			var result = {
				status: 0,
			}
			
			event.timestamp = new Date().getTime();

			result = await collection.add(event)
			result.status = 1
			
			// const collection2 = db.collection('uni-id-roles');
			
			
			// collection2.add({
			// 	username:event.name,
			// 	role_id:'student',
			// 	role_name:'学生用户',
			// 	comment:'学生用户拥有普通权限',
			// 	create_date:event.timestamp,
			// })
			return result
			break;
		case 'check':
			console.log('event : ', event)
			
			// var result = await collection.where({
			//   // username: 'xxx',
			  
			// 	wx_openid_mp:event.id,
				
			// }).get();
			var res = await collection.where({
				
				wx_openid_mp:event.id
				
			}).get();
			var result = {};
			if(res.affectedDocs>=1){
				result.flag = 1;
			}else{
				result.flag = 0;
			}
			
			
			// let result =1;
			return result;
			
			//返回数据给客户端
			break;
		case 'get_info':

			var res = await collection.where({
				
				wx_openid_mp:event.id
				
			}).get();
			var result = {};
			if(res.affectedDocs >= 1){
				result = res.data;
			}
			return result;
			
	}
	//返回数据给客户端
	return event
};
