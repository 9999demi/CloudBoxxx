<template>
	<section class="aui-flexView">
		<header class="aui-navBar aui-navBar-fixed">
			<!-- <a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-return"></i>
			</a> -->
			<div class="aui-center">
				<!-- <span class="aui-center-title">物品</span> -->
				<span class="aui-center-title"><button class='btn_add' @tap="add">add</button></span>
				<span class="aui-center-title"><button class='btn_remove' @tap="remove">remove</button></span>
			</div>
			<!-- 对话标识 -->
			<!-- <a href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</a> -->
		</header>
		<!-- index 这里后期要进行分类处理 -->
		<!-- 这里的信息后期要进行后端数据调取处理，现在是fake data -->
		<section class="aui-scrollView">
			<div class="aui-tab" data-ydui-tab>
				<ul class="tab-nav">
					<block v-for="(menuTab,index) in menuTabs" :key="index">
						<li v-bind:id="'tabNum'+index" @click="swichMenu(index)" :class="[currentTab==index ? 'tab-nav-item tab-active' : 'tab-nav-item']">
							{{menuTab.name}}
						</li>
					</block>
				</ul>
				<div class="divHeight"></div>
				<div class="tab-panel">
					<block v-for="(menuList,index2) in menuLists" :key="index2">
						<div :class="[currentTab==index2 ? 'tab-panel-item tab-active' : 'tab-panel-item']">
							<block v-for="(menuList2,index3) in menuList" :key="index3">
								<div class="tab-item">
									<a href="javascript:void(0);" class="aui-well-item aui-well-item-clear">
										<div class="aui-well-item-hd">
											<img :src="menuList2.logoimg" alt="">
										</div>
										<div class="aui-well-item-bd">
											<h3>{{menuList2.dname}}</h3>
										</div>
										<span class="aui-well-item-fr">{{menuList2.zt}}</span>
									</a>
									<div class="aui-mail-product">
										<a href="javascript:;" class="aui-mail-product-item">
											<div class="aui-mail-product-item-hd">
												<img :src="menuList2.img" alt="">
											</div>
											<div class="aui-mail-product-item-bd">
												<p>{{menuList2.name}}</p>
											</div>
										</a>
									</div>
									<a href="javascript:;" class="aui-mail-payment">
										<p>
											共{{menuList2.sum}}件相同物品 
										</p>
									</a>
									
								</div>
								<div :class="[index3+1==menuList.length ? 'hd':'divHeight']"></div>
							</block>
						</div>
					</block>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				menuTabs: [
					{
						name: '全部'
					}, {
						name: '待取出'
					}, {
						name: '已取出'
					}, {
						name: '已清理'
					}, {
						name: '问题物品'
					},
				],
				menuLists: [
					[
						{
							"logoimg": '../../static/icon-logo.png',
							"dname":"CloudBox",
							"zt":"已取出",
							"img": '../../static/pd.png',
							"name":"苹果",
							"sum":"1",
							
						},
						{
							"logoimg": '../../static/icon-logo.png',
							"dname":"CloudBox",
							"zt":"已取出",
							"img": '../../static/pd.png',
							"name":"香蕉",
							"sum":"1",
							
						},
						{
							"logoimg": '../../static/icon-logo.png',
							"dname":"CloudBox",
							"zt":"已取出",
							"img": '../../static/pd.png',
							"name":"李子",
							"sum":"2",
							
						},
					],
					[
						{
							"logoimg": '../../static/icon-logo.png',
							"dname":"CloudBox",
							"zt":"待取出",
							"img": '../../static/pd.png',
							"name":"香槟",
							"sum":"1",
							
						}
					],
					[
						{
							"logoimg": '../../static/icon-logo.png',
							"dname":"CloudBox",
							"zt":"待取出",
							"img": '../../static/pd.png',
							"name":"牛奶",
							"sum":"3",
							
						}
					],
					[
						{
							"logoimg": '../../static/icon-logo.png',
							"dname":"CloudBox",
							"zt":"已清理",
							"img": '../../static/pd.png',
							"name":"酸梅汤",
							"sum":"1",
							
						}
					],
					[
						{
							"logoimg": '../../static/icon-logo.png',
							"dname":"CloudBox",
							"zt":"已取消",
							"img": '../../static/pd.png',
							"name":"锅",
							"sum":"1",
							
						}
					],
				]
			}
		},
		onLoad() {
			// for (var i = 0; i < this.menuLists.length; i++) {
			// 	this.getDateList(i);
			// }
		},
		methods: {
			swichMenu: async function(current) { //点击其中一个选项
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.setScrollLeft(current);
				}
			},
			swiperChange: async function(e) {
				let index = e.target.current;
				this.setScrollLeft(index);
				this.currentTab = index;
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					leftWidthSum = leftWidthSum + nowElement.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
			},
			getWidth: function(id) { //得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			getDateList: function(tabIndex) {
				// var entity = this.menuTabs[tabIndex].name;
				// this.menuLists[tabIndex].push(entity);
			},
			add(){
				uni.navigateTo({
					url: './in',
				})	
			},
			remove(){
				uni.navigateTo({
					url: './out',
				})	
			},
		}
	}
</script>

<style>
	@import '../../css/style.css';
</style>
