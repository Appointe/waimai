<template>
	<div id="app">
		<!--头部-->
		
		<!--导航-->



		
		<!--<div class="nav-item" v-for="(item,index) in route">
				<router-link :to='item.path'>{{item.name}}</router-link>
			
		</div>-->
		<div class="Zhanwei">
			<router-view/>
						
		</div>

		
	</div>

</template>

<script>
	import HelloWorld from "./components/HelloWorld.vue"
	export default {
		name: 'App',
//		data(){
//			return{
//				route:[
//					{
//						path:'/goods',
//						name:'商品'
//					},
//					{
//						path:'/rating',
//						name:'评价'
//					},
//					{
//						path:'/seller',
//						name:'商家'
//					}
//				
//				]
//			}
//		}
	}
</script>

<style scoped="scoped">
	/*.Zhanwei{
		width: 100%;
		height: 50px;
		background-color: rosybrown;
	}*/
</style>