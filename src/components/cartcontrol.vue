<template>
	<!--这是点击按钮的组件-->
	<div class="cartcontrol1">
		<!--v-if="food.count >0"-->
		<span class="add icon-remove_circle_outline" @click="plus" v-if="food.count >0"></span>
		
		<span class="num" v-if="food.count >0">{{food.count}}</span>
		
		<span  class="add icon-add_circle" @click="add"></span>
		<!--{{food.count}}-->
	</div>
	
	
</template>

<script>
	import Vue from 'vue';
	export default{
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			add:function(){
				if(this.food.count){
					this.food.count ++;
				}else{
					Vue.set(this.food,'count',1);
				}		
			},
			plus:function(){
//				console.log("-1");
				this.food.count --;
			}
		}
	}
</script>

<style scoped="scoped">
	.cartcontrol{
		border: 1px solid red;
	}
	.num{
		display: inline-block;
		line-height: 24px;
		font-size: 14px;
		margin: 0 5px;
	}
	.add{
		color: dodgerblue;
		/*font-size: 50px;*/
	}
	
</style>