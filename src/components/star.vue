<template>
	<!--这是星星组件-->
	<div class="score">
		
		<span class="star" :style="{width:size+'px',height:size+'px'}" v-for="(item in parseInt(score)"></span>
		<span class="nostar"  :style="{width:size+'px',height:size+'px'}" v-for="(item in 5-parseInt(score)"></span>
	</div>
</template>

<script>
//	子组件接收参数
	export default{
		props:{
			score:{
				type:Number
			},
			size:{
				type:Number
			}
		}
	}
</script>

<style scoped="scoped">
	.score .star {
		display: inline-block;
		width: 15px;
		/*float: left;*/
		height: 15px;
		margin-left: 4px;
		background-size: 100%;
		background-image: url(../assets/star.png);
	}
	
	.score .nostar {
		display: inline-block;
		width: 15px;
		height: 15px;
				/*float: left;*/

		background-size: 100%;
		background-image: url(../assets/star1.png);
	}
</style>