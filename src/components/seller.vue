<template>
	<div class="seller" v-if="seller">
		<div class="seller_up">
			<div class="title">
				<div class="rest">
					<div>{{seller.name}}</div>
					<div>
						<star :score="seller.score" :size="14"></star>
						<span>({{seller.ratingCount}})</span>
						<span>月售{{seller.sellCount}}单</span>
					</div>
				</div>
				<div class="shoucang" @click="hanlder_shoucang">
					<div class="img">
						<span class="icon-favorite" :class="{active:favorite}"></span>
					</div>
					<div class="shou" >{{shoucang}}</div>
				</div>
			</div>
			<div class="class_info">
				<div>
					<div class="text">起送价</div>
					<div class="price">
						<span class="num">{{seller.minPrice}}</span>
						<span class="unit">元</span>
					</div>
				</div>
				<div>
					<div class="text">商家配送</div>
					<div class="price">
						<span class="num">{{seller.deliveryPrice}}</span>
						<span class="unit">元</span>
					</div>
				</div>
				<div>
					<div class="text">平均配送时间</div>
					<div class="price">
						<span class="num">{{seller.deliveryTime}}</span>
						<span class="unit">分钟</span>
					</div>
				</div>
			</div>
		</div>
		
		<!--分隔线-->
		<div class="split"></div>
		
		<!--公告与活动-->
		<div class="bulletin">
			<h1 class="title">公告与活动</h1>
			<p class="text">{{seller.bulletin}}</p>
			<ul >
				<li v-if="seller.supports" v-for="(item,index) in seller.supports" class="supports_list">
					<div class="supports">
						<img :src="imgurl[index]">
						<span class="texts">{{item.description}}</span>
					</div>
				</li>
			</ul>
		</div>
		
		<!--商家实景-->
		<div class="pics">
			<h1 class="title">商家实景</h1>
			<div class="pics_container" ref="picsContainer">
				<ul class="pic_list" ref="ulList">
					<li v-for="pic in seller.pics" class="pic_item">
						<img width="120" height="90" :src="pic"/>
					</li>
				</ul>
			</div>
		</div>
		
		
		<!--商家信息-->
		<div class="info">
			<h1 class="title">商家信息</h1>
			<ul>
				<li v-for="item in seller.infos" class="info_item">
					{{item}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import star from "../components/star";
	export default{
		name:"seller",
		data(){
			return {
				seller:null,
				favorite:false,
				shoucang:"收藏",
				imgurl:["../assets/jian2.png","../assets/zhe.png","../assets/te.png",
        "../assets/piao.png","../assets/bao.png"]
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.initScroll();
				this.initPics();
			});	
		},
		components:{
			star:star
		},
		mounted:function(){
			var vm = this;
			this.$http.get("/api/seller").then(function(resp){
				vm.seller = resp.body.data;
			})
		},
		methods:{
			hanlder_shoucang:function(){
				this.favorite = !this.favorite;
				this.shoucang=="收藏"?this.shoucang="已收藏":this.shoucang="收藏"
			},
			initScroll(){
				this.$nextTick(()=>{
					if(!this.scroll){
					this.scroll=new BScroll(this.$refs.seller,{
						click:true
					});
					}else{
						this.scroll.refresh();
					}
				});
			},
			initPics(){
				//需要计算ul宽度
				if(this.seller.pics){
					let width=120;
					let margin=6;
					//计算n张图片的宽度
					let ulWidth=(width+margin)*this.seller.pics.length-margin;
					//使用原生方法设置宽度
					this.$refs.ulList.style.width=ulWidth+"px";
					this.$nextTick(()=>{
						if(!this.scrollPics){
							this.scrollPics=new BScroll(this.$refs.picsContainer,{
								scrollX:true,
								eventPassthrough:'vertical'
							});
						}else{
							this.scrollPics.refresh();
						}
					});
				}
			},
		}
	}
</script>

<style scoped="scoped">
	.seller_up{
		width:100%;
		height: 160px;
	}
	.seller_up .title{
		display: flex;
		margin:20px;
		border-bottom: 1px solid #ccc;
		padding-bottom: 15px;;
	}
	.seller_up .title .rest{
		flex:3;
	}
	.seller_up .title .rest span{
		font-size: 10px;
	}
	.seller_up .title .shoucang{
		flex:1;
		text-align: center;
	}
	.img{
		display: inline-block;
		color:#ddd;
		font-size:24px;;
	}
	.shoucang .shou{
		color:#a1a7ac;
		font-size:12px;
	}
	.icon-favorite.active{
		color:#f01414;
	}
	.class_info{
		display: flex;
		margin:20px;
	}
	.class_info>div{
		flex:1;
		text-align: center;
		border-right: 1px solid #ccc;
	}
	.class_info>div:last-child{
		border:none
	}
	.class_info .text{
    line-height: 10px;
    margin-bottom: 4px;
    font-size: 10px;
    color: #93999f;
	}
	.class_info .num{
		font-size: 24px;
	}
	.class_info .unit{
		font-size: 10px;
	}
	.split{
		width: 100%;
    height: 16px;
    background-color: #F3F5F7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    border-top: 1px solid rgba(7, 17, 27, 0.1);
	}
	/*活动与商家*/
	.bulletin{
		padding: 0 18px;
		border-bottom:2px solid rgba(7,17,27,0.1);
	}
	.bulletin .title{
		line-height: 14px;
		margin-bottom: 8px;
		margin-top: 18px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.bulletin .text{
		padding: 0 12px 16px 12px;
		line-height: 24px;
		font-size: 12px;
		font-weight: 200;
		color: rgb(240,20,20);
	}
	.bulletin .supports_list{
		padding: 16px 12px;
		width: 100%;
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.bulletin .supports_list:last-child{
		border:none;
	}
	
	/*图片滚动*/
	.pics_container{
		overflow: scroll;
	}
	.pics{
		padding: 18px 0 18px 18px;
	}
	.pics .title{
		line-height: 14px;
		margin-bottom: 12px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.pic_list{
		white-space: nowrap;
	}
	.pic_item{
		display: inline-block;
		width: 120px;
		height: 90px;
		margin-right: 6px;
	}
	.pic_item:last-child{
		margin-right: 0;
	}
	/*商家实景*/
	.info{
		padding: 0 18px;
	}
	.title{
		line-height: 14px;
		padding-bottom: 12px;
		margin-top: 18px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.info_item{
		padding: 16px 12px;
		border:rgba(7,17,27,0.1);
		line-height: 16px;
		font-size: 12px;
		font-weight: 200;
		color: rgb(7,17,27);
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.info_item:first-child{
		border-top:1px solid rgba(7,17,27,0.1);
	}
	.info_item:last-child{
		border:none;
	}
</style>