<template>
	<view class="userinfo">
		hi
		
	    <!--  #ifdef MP-WEIXIN -->
	    <GetUserInfo />
	    <GetUserPhone />
	    <!-- #endif -->
	
	    <!--  #ifdef H5 -->
	    <!-- h5端做顶部返回导航栏 -->
	    <div class="banner-box">
	      <image
	        src="../../../static/logo.png"
	        alt=""
	        class="leftArrow"
	        @click="leftArrowHande"
	        v-if="showArrow"
	      >
	      </image>
	      <div class="banner-title">{{bannerTitle}}</div>
	    </div>
	    <!-- #endif -->
	    
	    <slot name="content"></slot>
	  </view>

</template>

<script>
	import infoPopup from './get_user_info_popup.vue'
	
	export default {
		components: {
			infoPopup	
		},
	}
</script>

<style>
</style>
