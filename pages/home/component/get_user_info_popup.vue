<template>
	 <view
	    v-if="!hasNickName"
	    @click="getUserProfile"
	    class='get-info'
	  >
	 </view>
</template>

<script>
	export default {
		computed: {
		    hasNickName() {
		      return this.$store.state.userInfo["nickName"] || "";
		    },
		 },
		  
		 getUserProfile() {
		    let that = this;
		    wx.getUserProfile({
		        desc: "业务需要", // desc 字段必填
		        success: (res) => {
		          console.log(res, "wx.getUserProfile信息");
		          that.$store.dispatch("userInfo", res);
		        },
		        fail: (res) => {
		          console.log(res);
		        },
		    });
		 },

    }
</script>

<style>
	.get-info {
	  position: fixed;
	  left: 0;
	  bottom: 0;
	  top: 0;
	  right: 0;
	  opacity: 0;
	  z-index: 9999;
	}
</style>
