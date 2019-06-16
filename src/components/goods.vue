<template>
	<div>
		<!--这个是商品界面-->
		<div class="goods">
			<div class="goods_left" ref="navContiner">
				<ul>
					<li v-for="(item,index) in goods" :class="{current:index==currentInent}" @click="clickMenu(index)" class="goods_name">
						<div class="goods_name_text">

							<img v-show="index==1" src="../assets/te.png" width="12px" />
							<img v-show="index==2" src="../assets/zhe.png" width="12px" />

							<span>{{item.name}}</span>
						</div>
						

						
					</li>
				</ul>
			</div>
			<div class="goods_right" ref="foodsContainer">
				<ul>
					<!--分类进行遍历-->
				<li v-for="(item,index) in goods" ref="foodList">
					<div class="type_name">{{item.name}}</div>
					<!--商品进行遍历-->
					<div class="type_fen" v-for="itemt in item.foods">
						<img :src="itemt.image" width="57"/>
						<div class="ty	pe">
							<!--标题-->
							{{itemt.name}}
						</div>
						<div class="desc">{{itemt.description}}</div>
						<div class="count">月售{{itemt.sellCount}}
						好评率{{itemt.rating}}%
						</div>
						<div class="price">
							￥{{itemt.price}}
						</div>
						<div class="control">
							<cartcontrol :food="itemt">			
							</cartcontrol>
						</div>			
					</div>
				</li>
					
				</ul>
			</div>

		</div>
	
		<showsart class="showsart" :selectData="selectData" :qisPrice="qisPrice" :peisong="peisong"></showsart>
	</div>
</template>

<script>
	import showsart from "./showsart"
	
	import BScrool from 'better-scroll';
	import cartcontrol from "./cartcontrol"
	export default {
		name: "goods",
		components:{
			'cartcontrol':cartcontrol,
			'showsart':showsart
		},
		data() {
			return {
				currentInent: 0,
				goods: null,
				qisPrice:20,
				peisong:4
			}
		},
		computed:{
			selectData:function(){
				let arr =[];
				if(this.goods){
//					获取已经被选取的商品
					this.goods.forEach( function(item,index){
					item.foods.forEach(function(itemx){
						if(itemx.count){
							arr.push(itemx);
						}
					})
				})
				}
				console.log(arr);
				return arr;
			}
		},
		created(){
			var vm = this;
			this.$http.get("/api/goods").then(function(resp) {
//				console.log(resp);
				vm.goods = resp.body.data;
				vm.initScroll();
			})
		},
		methods: {
			clickMenu: function(index) {
//				console.log(index);
				this.currentInent = index;
//				console.log(this.$refs.foodsContainer.children[index])
//				获取左边的DOM
				var domli = this.$refs.foodList[index];
				this.foodsContainer.scrollToElement(domli,1000);
//				console.log(domli);
				
			},
			//初始化better-scroll插件
			initScroll:function(){
				//插件初始化左侧导航
				this.navContiner = new BScrool(this.$refs.navContiner,{
					click:true
				})
				//插件初始化右侧数据
				this.foodsContainer = new BScrool(this.$refs.foodsContainer,{
					click:true,
					probeType:3 
				})
 			}
	
		}
	}
</script>

<style scoped="scoped">
	* {
		list-style-type: none;
		margin: 0px;
		padding: 0px;
	}
	
	.showsart{
		position: fixed;
		color: rgb(255, 255,255, 0.4);
		width: 100%;
		height: 48px;
		background-color: black;
		display: flex;
		left:0;
		bottom:0;
	}
	
	/*anniu*/ 
	.control{
		/*position: absolute;*/
		/*right:0px*/
		float: right;
		margin-top: -60px;
		margin-right: 50px;
	}
	/*bujv*/
	.type_fen{
		width: 100%;
		/* float: /*left*/
		height: 70px;
		/*padding: 20px;*/
		margin-top: 30px;
		padding-left: 30px;
		margin-bottom: 20px;
		
	}
	.type{
		font-size: 14px;
		line-height: 14px;
		color: #07111b;
		font-weight: 700;
	}
	.type_fen img{
		margin-right: 10px;
		float: left;
		width: 70px;
		/*margin: 10px;*/
		border-radius: 5px;
	}
	.desc{
		color: #93999f;
		font-size: 10px;
		line-height: 18px;
		margin: 8px 0;
	}
	.count{
		color: #93999f;
		
		font-size: 10px;
		line-height: 12px;
	}
	.price{
		color: red;
	}
	.goods {
		width: 100%;
		margin: 0 8px;
		position: fixed;
		/*top: 518px;*/
		top: 199px;
		left: 0px;
		bottom: 48px;
		/*background-color: yellow;*/
		display: flex;
	}
	
	.goods_left {
		width: 80px;
		overflow-y: auto;
		flex: 0 0 80px;
		background-color: rgb(243, 245, 247);
	}
	/*页面导航栏*/
	
	.goods_name {
		height: 54px;
		width: 80px;
		font-size: 12px;
		display: table;
	}
	
	.goods_name_text {
		width: 56px;
		padding: 0 12px;
		border-radius: 3px;
		border-bottom: 1px solid gainsboro;
		display: table-cell;
		vertical-align: middle;
	}
	
	.current {
		background-color: white;
	}
	
	.goods_right {
		flex: 1;
		overflow-y: auto;
	}
	
	.type_name {
		height: 26px;
		background-color: #f3f5f7;
		border-left: 2px solid #d9dde1;
		line-height: 26px;
		color: #93999f;
		font-size: 12px;
		padding-left: 14px;
	}
</style>