<template>
	<div class="rating" v-if="seller">
		<div class="rating_up">
			<div class="left">
				<div class="score">{{seller.score}}</div>
				<div class="text">综合评分</div>
				<div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="right">
				<div>
					<span class="firsttext">服务态度</span>
					<star :score="seller.serviceScore" :size="14"></star>
					<span class="lasttext">{{seller.serviceScore}}</span>
				</div>
				<div>
					<span class="firsttext">商品评分</span>
					<star :score="seller.foodScore" :size="14"></star>
					<span class="lasttext">{{seller.foodScore}}</span>
				</div>
				<div>
					<span class="firsttext">送达时间</span>
					<span class="time">{{seller.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
		<div class="split"></div>
		<div class="rating_list">
			<div class="select_type">
				<span class="good"  @click="select(0,onlyContent)" :class="{active:current==0}">
					全部
					<span class="count">{{seller.ratingCount}}</span>
				</span>
				<span class="good"  @click="select(1,onlyContent)" :class="{active:current==1}">
					满意
					<span class="count">{{times.good}}</span>
				</span>
				<span class="good bad"  @click="select(2,onlyContent)" :class="{active:current==2}">
					不满意
					<span class="count">{{times.bad}}</span>
				</span>
			</div>
			<div class="condition" @click="switchCondition">
				<span class="icon icon-check_circle" :class="{active:onlyContent}"></span>
				<span class="text">只看有内容的评价</span>
			</div>
			<div class="rating_content">
				<ul>
					<li class="ratinglist" v-for="item in listData">
						<img width="28" height="28" :src="item.avatar" alt="" />
						<div class="itemContent">
							<div class="line1">
								<h1 class="user">{{item.username}}</h1>
								<div class="time">{{rateTime(item.rateTime)}}</div>
							</div>
							<star :score="item.score" :size="10"></star>
							<span class="delivery" v-if="item.deliveryTime">{{item.deliveryTime}}分钟后到达</span>
							<div class="text">{{item.text}}</div>
							<div class="tag">
								<span class="icon icon-thumb_up" v-show="item.rateType==0"></span>
								<span class="icon icon-thumb_down" v-show="item.rateType==1"></span>
								<span  class="tag-item" v-for="tag in item.recommend">
									{{tag}}
								</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from "./star"
	export default{
		name:"rating",
		components:{
			"star":star
		},
		computed:{
			times:function(){
				let goodcount = 0;
				let badcount = 0;
				if(this.ratings){
					this.ratings.forEach((item,index)=>{
						if(item.rateType == 0){
							goodcount ++;
						}else if(item.rateType == 1){
							badcount ++;
						}
					})
					return {
						good:goodcount,
						bad:badcount
					};
				}else{
					return {
						good:0,
						bad:0
					}
				}
			}
		},
		data(){
			return {
				seller:null,
				ratings:null,
				current:0,
				onlyContent:false,
				listData:null,
				filterData:null
			}
		},
		created(){
			var vm = this;
			this.$http.get("/api/seller").then(function(resp){
				vm.seller = resp.body.data;
			})
			this.$http.get('/api/ratings').then(function(resp){
				vm.ratings = resp.body.data;
				vm.listData = vm.ratings;
			})
		},
		methods:{
			needShow:function(index,onlyContent){
				this.listData = null;
				if(index == 0){
					if(onlyContent){
						this.listData = this.ratings;
						this.listData = this.listData.filter(function(item){
							return item.text!="";
						})
					}else{
						this.listData = this.ratings;
					}
				}else if(index == 1){
					if(onlyContent){
						this.listData = this.ratings.filter((item)=>{
							return item.rateType == 0;
						})
						this.listData = this.listData.filter(function(item){
							return item.text!="";
						})
					}else{
						this.listData = this.ratings.filter((item)=>{
							return item.rateType == 0;
						})
					}
				}else{
					if(onlyContent){
						this.listData = this.ratings.filter((item)=>{
							return item.rateType == 1;
						})
						this.listData = this.listData.filter(function(item){
							return item.text!="";
						})
					}else{
						this.listData = this.ratings.filter((item)=>{
							return item.rateType == 1;
						})
					}
				}
			},
			select:function(index,onlyContent){
				this.current = index;
				this.needShow(index,this.onlyContent)
			},
			switchCondition:function(){
				this.onlyContent = !this.onlyContent;
				this.needShow(this.current,this.onlyContent);
			},
			//时间戳格式化函数
			rateTime:function(time){
				var date=new Date(time);
				var year=date.getFullYear();
				var month=date.getMonth()+1;
				var day=date.getDate();
				var hour=date.getHours();
				var minute=date.getMinutes();
				
				month<10?month="0"+month:month;
				day<10?day="0"+day:day;
				hour<10?hour="0"+hour:hour;
				minute<10?minute="0"+minute:minute;
				return year+"-"+month+"-"+day+" "+hour+":"+minute;
			}
		}
	}
</script>

<style scoped="scoped">
	/*上*/
	.rating_up{
		display: flex;
	}
	.rating_up .left{
		flex:0 0 137;
		text-align: center;
		border-right: 1px solid rgba(7, 17, 27, 0.1);
		margin: 20px;
		padding:0 10px;
	}
	.rating_up .left .score{
		display: block;
    line-height: 28px;
    font-size: 24px;
    color: #ff9900;
    margin-bottom: 6px;
	}
	.rating_up .left .text{
    display: block;
    line-height: 12px;
    font-size: 12px;
    color: #07111b;
    margin-bottom: 8px;
	}
	.rating_up .left .rankRate{
		display: block;
    line-height: 10px;
    font-size: 10px;
    color: #93999f;
    margin-bottom: 6px;
	}
	.rating_up .right{
		flex:2.5;
		margin:20px 8px;
	}
	.rating_up .right .firsttext{
    line-height: 18px;
    font-size: 12px;
    color: #07111b;
    margin-right: 12px;
	}
	.rating_up .right .lasttext{
    line-height: 18px;
    font-size: 12px;
    color: #ff9900;
    vertical-align: top;
	}
	.rating_up .right .time{
    line-height: 18px;
    font-size: 12px;
    color: #93999f;
	}
	.split{
		width: 100%;
    height: 16px;
    background-color: #F3F5F7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    border-top: 1px solid rgba(7, 17, 27, 0.1);
	}
	/*列表中筛选条件*/
	.rating_list .select_type{
    padding: 12px 18px 18px 0px;
    position: relative;
    font-size: 0;
    margin: 0 18px;
    border-bottom: 1px solid #ddd;
	}
	.rating_list .select_type span.good{
		display: inline-block;
    line-height: 32px;
    padding:0px 12px;
    margin-right: 8px;
    font-size: 12px;
    color: #4d555d;
    border-radius: 2px;
	}
	.rating_list .all{
		background-color: rgba(0, 160, 220, 0.2);
	}
	.rating_list .good{
		background-color: rgba(0, 160, 220, 0.2);
	}
	.rating_list .bad{
		background-color: rgba(77, 85, 93, 0.2);
	}
	.rating_list .good.active{
		background-color: #00a0dc;
		color:white !important;
	}
	.rating_list .bad.active{
		background-color:#4d555d !important;
	}
	.condition{
		padding:12px 18px;
		border-bottom:1px solid #ddd;
	}
	.condition .icon {
    vertical-align: top;
    line-height: 24px;
    font-size: 24px;
    color: #93999f;
	}
	.condition .text{
    vertical-align: top;
    line-height: 24px;
    font-size: 12px;
    color: #93999f;
	}
	.condition .active{
		color:#00c850;
	}
	.ratinglist{
		display: flex;
    padding: 18px 20px;
    border-bottom:1px solid #ccc;
	}
	.ratinglist img{
		vertical-align: top;
		border-radius: 50%;
		width: 28px;
		height: 28px;
    margin-right: 20px;
		
	}
	.itemContent{
		width: 100%;;
	}
	.itemContent div.line1{
		display: flex;
		margin-bottom:2px;
	}
	.itemContent .user{
    line-height: 12px;
    font-size: 14px;
    color: #07111b;
	}
	.itemContent .time{
		line-height: 12px;
    font-size: 10px;
    font-weight: 200;
    color: #93999f;
    position: absolute;
    right: 40px;
	}
	.itemContent .delivery{
    line-height: 12px;
    font-size: 10px;
    font-weight: 200;
    color: #93999f;
	}
	.itemContent .text{
		line-height: 18px;
    font-size: 12px;
    color: #07111b;
    margin-top: 6px;
	}
	.tag span{
		display: inline-block;
		margin-top: 4px;
	}
	.tag .tag-item{
    line-height: 16px;
    padding: 0 6px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    border-radius: 2px;
    font-size: 9px;
    color: #93999f;
    margin-right: 8px;
    margin-bottom: 2px;
	}
	.tag .icon{
		font-size: 12px;
		line-height: 16px;
		color:#00a0dc;
		margin-right: 8px;
	}
	.tag .icon.icon-thumb_down{
		color:#b7bbbf;
	}
</style>