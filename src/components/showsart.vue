<template>
	<!--这是购物车组件-->
	<div class="foot">
		
		<div class="left">
			<div class="shopsart">
				<!--购物车图标-->
				<span class="icon-shopping_cart">
					
				</span>
				<div class="shopsart1"  :class="{active:totalPrice>0}">
					{{totalNum}}
				</div>
				
			</div>
			<div class="totalPrice" :class="{active:totalPrice>0}">
				￥{{totalPrice}}
			</div>
			<div class="PeiPrice">
				另需要配送费{{peisong}}元	
			</div>
			
			
		</div>
		
		
		<div class="right" :class="{active:totalPrice>=qisPrice}">
			<span>{{showtext}}</span>	
		</div>
	
	</div>
</template>

<script>
	export default{
		props:{
			selectData:{
				type:Array
			},
			qisPrice:{
				type:Number
			},
			peisong:{
				type:Number
			}
		},
		computed:{
			showtext:function(){
				if(this.totalPrice==0){
					return "￥"+this.qisPrice+"元起送"
				}else if(this.totalPrice>=20){
					return "去结算"
					
				}else{
					return "还差"+(this.qisPrice - this.totalPrice)+"元起送"
				}
			},
			totalPrice:function(){
				var totalp =0;
				this.selectData.forEach(function(item){
					console.log(item.count,item.price);
					totalp = totalp + item.count * item.price;
					
				})
				return totalp;
			},
			totalNum:function(){
				var totalp =null;
				this.selectData.forEach(function(item){
					console.log(item.count,item.price);
					totalp = totalp + item.count;
					
				})
				return totalp;
			}
		}
	}
	
</script>

<style scoped="scoped">
	.right{
		flex: 0 0 100px;
		line-height: 48px;
		font-weight: bolder;
		text-align: center;	
	}
	.right.active{
		background-color:green ;
		color: white;
	}
	
	
	
	
	.left{
		flex: 1;
		background-color: black;
		color: rgb(255, 255,255, 0.4);
		
	}
	
	.shopsart{
		width: 56px ;
		height: 56px ;
		position: absolute;
		left: 0;
		bottom: 10px;
		margin-left: 20px;
		background-color: black;
		border-radius: 50%;
		display: inline-block;
		
	}
	.foot .icon-shopping_cart{
		font-size: 24px;
		/*color: gainsboro;*/
		color: rgb(255, 255,255, 0.4);
		display: inline-block;
		margin-left: 15px;
		margin-top: 15px;
		text-align: center;
		line-height: 24px;
	}
	.totalPrice{
		display: inline-block;
		position: absolute;
		left: 80px;
		line-height: 48px;
		font-weight: 700;
		padding-right: 15px;
		border-right: 1px solid rgb(255, 255,255, 0.4);
	}
	.PeiPrice{
		position: absolute;
		left: 145px;
		font-size: 10px;
		line-height: 48px;
	}
	.totalPrice.active{
		color: white;
	}
	.shopsart1.active{
		position: absolute;
		left: 40px;
		top: 0px;
		width: 20px;
		height: 20px;
		border-radius: 5px;
		text-align: center;
		background-color: red;	
		font-size: 12px;
		line-height: 20px;	
	}
	.shopsart1{
		position: absolute;
		left: 40px;
		top: 0px;
		width: 20px;
		height: 20px;
		border-radius: 5px;
		text-align: center;
	}
</style>