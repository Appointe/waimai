<template>
	<div class="app">
<!--这是主界面的头部-->
		<div class="header" v-if="seller">
			<!--头部-->
			<div class="header1">
				<img class="img1" src="../assets/seller_bg.jpg" />
				<div class="header11">
					<img class="header111" src="../assets/brand.png" width="35px" />
					<span class="header112">{{seller.name}}</span>
				</div><br />
				<div class="header12">{{seller.description}}/38分钟到达</div>
				<br />
				<div class="header13">
					<img class="header131" src="../assets/jian.png" />
					<span class="header132">{{seller.supports[0].description}}</span>
					<button @click="showMask">{{seller.supports.length}}个 ></button>

				</div>
			</div>
			<!--按钮-->
			<div class="header2">
				<img src="../assets/公告.png" width="20px" />
				<div>
					{{seller.bulletin}}
				</div>
				<span class="span2">&rsaquo;</span>		
			</div>
			
			<!--路由-->
			<div class="nav">
				<div class="nav-item">
					<router-link to="/goods">商品</router-link>
				</div>
				<div class="nav-item">
					<router-link to="/rating">评价</router-link>
				</div>
				<div class="nav-item">
					<router-link to="/seller">商家</router-link>
				</div>

			</div>
			<!--占位符-->
			<div class="Zhanwei2" >
				<!--占位符-->
				<router-view/>
			</div>
			
			
			<!--遮罩层-->
			<transition name="fade">
				<div class="mask" v-show="isShow" @click="hideMask">
					<div class="masktitle">
						{{seller.name}}
					</div>
					<star  class="score" :score="seller.score" :size="20"></star>
					<div class="Youhui">
						 <h4><span class="mask-soild"></span>
              			<span class="solid">优惠信息</span>
               			<span class="mask-soild"></span></h4>
						<div class="Youhui1">
							<img class="header131" src="../assets/jian.png" />
							<span class="header132">{{seller.supports[0].description}}</span>
						</div>
						<br />
						<div class="Youhui1">
							<img class="header131" src="../assets/zhe.png" />
							<span class="header132">{{seller.supports[1].description}}</span>
						</div>
						<br />
						<div class="Youhui1">
							<img class="header131" src="../assets/te.png" />
							<span class="header132">{{seller.supports[2].description}}</span>
						</div>
						<br />
						<div class="Youhui1">
							<img class="header131" src="../assets/piao.png" />
							<span class="header132">{{seller.supports[3].description}}</span>
						</div>
						<br />
						<div class="Youhui1">
							<img class="header131" src="../assets/bao.png" />
							<span class="header132">{{seller.supports[4].description}}</span>
						</div>

					</div>
					<div class="Gonggao">
						<h4> <span class="mask-soild"></span>
              			<span class="solid">商家公告</span>
               			<span class="mask-soild"></span></h4>
						<div>
							{{seller.bulletin}}
						</div>
					</div>
				</div>
			</transition>

			<!--导航-->

		</div>
	</div>

</template>

<script>
	import star from "./star";
	
	export default {
		data() {
			return {
				seller: null,
				isShow: false,
			}
		},
		components:{
			'star':star
		},

		created() {
			var vm = this;
			this.$http.get('/api/seller').then(function(resp) {
				console.log(resp.body.data)
				vm.seller = resp.body.data
			})
		},
		methods: {
			showMask: function() {
				this.isShow = true;
				//				alert();
			},
			hideMask: function() {
				this.isShow = false;
			}
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
	/*占位符*/
	.Zhanwei2{
		width: 100%;
		color: black;
	}
	/*nav*/
	.mask-soild{
    display:inline-block;
    width:30%;
    border:1px solid rgba(255, 255, 255, 0.2);
    vertical-align:5px;
}
	.nav {
		width: 100%;
		height: 40px;
		/*background-color: red;*/
		display: flex;
		border-bottom: 1px solid #ccc;
	}
	
	.nav-item {
		flex: 1;
		text-align: center;
		line-height: 40px;
	}
	
	a {
		display: block;
		text-decoration: none;
		color: black;
	}
	
	.current {
		color: red;
	}
	
	.header {
		width: 100%;
		height: 150px;
		/*background-color: red;*/
		/*background: rgba(0,0,0,.2);*/
		background-image: url(../assets/shaizibeijing.png);
		background-repeat: no-repeat;
		color: white;
		background-size: 100%;
	}
	
	.header12 {
		font-size: 13px;
		/*line-height: 40px;*/
		float: left;
		margin-top: 10px;
	}
	
	.header131 {
		width: 12px;
		float: left;
		margin-right: 5px;
		margin-top: 3px;
	}
	
	.header132 {
		font-size: 12px;
		float: left;
	}
	
	.header13 {
		margin-top: 20px;
	}
	
	.header111 {
		/*margin-top: 2px;*/
		float: left;
		margin-right: 5px;
	}
	
	.header112 {
		float: left;
		line-height: ;
	}
	
	.header .img1 {
		width: 85px;
		height: 85px;
		float: left;
		margin-right: 15px;
	}
	
	.header1 {
		margin-top: 20px;
		margin-left: 20px;
		width: 90%;
		height: 85px;
		float: left;
		/*background-color: burlywood;*/
	}
	
	.header2 {
		width: 100%;
		height: 25px;
		float: left;
		margin-top: 20px;
		background: rgba(0, 0, 0, .3);
		/*font-size: 5px;*/
		/*height: 10px;
			line-height: 10px;*/
	}
	
	.header2 img {
		margin-left: 10px;
		margin-top: 8px;
		margin-right: 5px;
		float: left;
	}
	
	.header13 button {
		float: right;
		outline: none;
		background: none;
		border: none;
		color: white;
		padding: 2px 5px;
		background: rgba(0, 0, 0, .2);
		border-radius: 5px;
		margin-right: 10px;
		margin-top: -15px;
	}
	
	.header2 marquee {
		font-size: 8px;
		/*float: left;*/
		margin-top: 5px;
		width: 90%;
	}
	.header2 div{
		 line-height: 25px;
    width: 80%;
    overflow: hidden;
    font-size: 12px;
    text-overflow:ellipsis;
    white-space: nowrap;
    /* 使元素变为行内块元素：既有行内元素的特点，又有块级元素的特点 */
    display: inline-block;
	}
	.header2 .span2{
		 display: inline-block;
  float: right;
  line-height: 25px;
  margin-right: 20px;
	}
	/*遮罩层*/
	
	.mask {
		position: fixed;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		width: 100%;
		height: 100%;
		color: white;
		background-color: rgba(0, 0, 0, .5);
	}
	
	.masktitle {
		font-weight: 700;
		text-align: center;
		margin-top: 50px;
	}
	
	.score {
		text-align: center;
		line-height: 100px;
	}
	
	.score .star {
		margin: 10px 10px;
		display: inline-block;
		width: 20px;
		height: 20px;
		background-size: 100%;
		background-image: url(../assets/star.png);
	}
	
	.score .nostar {
		margin: 10px 10px;
		display: inline-block;
		width: 20px;
		height: 20px;
		background-size: 100%;
		background-image: url(../assets/star1.png);
	}
	
	.Youhui h4 {
		text-align: center;
	}
	
	.Youhui1 {
		margin-left: 50px;
		margin-top: 10px;
	}
	
	.Gonggao h4 {
		margin-top: 50px;
		margin-bottom: 30px;
		text-align: center;
	}
	
	
	.Gonggao div {
		width: 80%;
		margin: 0 auto;
		font-size: 13px;
		line-height: 25px;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
	/*a{
		display: block;
		border: 1px solid red;
	}*/
</style>