<template>
  <div class="ratings" ref="ratings">
  	<div class="ratings-content">
  		<div class="overview" >
  			<div class="overview-left">
  				<div class="score">{{seller.score}}</div>
  				<div class="title">综合评分</div>
  				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
  			</div>
  			<div class="overview-right">
  				<div class="score-wrapper">
  					<span class="title">服务态度</span>
  					<el-rate class="star"
					  v-model="seller.serviceScore"
					  disabled
					  show-text
					  text-color="#ff9900"
					  text-template="{value}">
					</el-rate>
  				</div>
  				<div class="score-wrapper">
  					<span class="title">商品评价</span>
  					<el-rate class="star"
					  v-model="seller.foodScore"
					  disabled
					  show-text
					  text-color="#ff9900"
					  text-template="{value}">
					</el-rate>
  				</div>
  				<div class="delivery-wrapper">
  					<span class="title">送达时间</span>
  					<span class="delivery">{{seller.deliveryTime}}分钟</span>
  				</div>
  			</div>
  		</div>
  		<split></split>
  		<ratingselect  @toggle="toggleContent"
					@select="selectRating"
					:selectType="selectType"
					:onlyContent="onlyContent"
					:ratings="ratings">
					</ratingselect>
  		<div class="rating-wrapper">
  			<ul>
  				<li class="rating-item" v-for="item in ratings" v-show="needShow(item.rateType, item.text)">
  					<div class="avatar">
		              	<img width="28" height="28" :src="item.avatar">
		            </div>
		            <div class="content">
		            	<h1 class="name">{{item.username}}</h1>
		            	<div class="star-wrapper">
		            		<el-rate class="star"
							  v-model="item.score"
							  disabled
							  text-color="#ff9900"
							  text-template="{value}">
							</el-rate>
							<span class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
		            	</div>
		            	<p class="text">{{item.text}}</p>
			            <div class="recommend" v-show="item.recommend && item.recommend.length">
			                <span class="icon-thumb_up"></span>
			                <span class="item" v-for="value in item.recommend">{{value}}</span>
			            </div>
			            <div class="time">
			                {{item.rateTime | formatDate}}
			            </div>
		            </div>
  				</li>
  			</ul>
  		</div>
  	</div>
  </div>
</template>

<script>
	import split from '../split/split'
	import ratingselect from '../ratingselect/ratingselect'
	import BScroll from 'better-scroll'
	import {formatDate} from '../../common/js/date';

	const err_ok = 0
	const ALL = 2
	const NEGITIVE = 0
	const POSITIVE = 1


	export default {
		props:{
			seller:{
				type: Object
			}
		},
		data(){
			return {
				ratings:[],
				selectType:ALL,
				onlyContent:false
			}
		},
		created(){
			this.$http.get('/api/ratings').then((response)=>{
				response = response.body
				if(response.errno === err_ok){
					this.ratings = response.data
				}
				//获取到数据主动刷新dom
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.ratings,{
							click:true
						})
					}else{
						this.scroll.refresh()
					}
				})
			})
		},
		methods:{
			toggleContent(){
		    	//选择是否只查看有内容的评论
		    	this.onlyContent = !this.onlyContent
		    	this.$nextTick(() => {
		          	this.scroll.refresh();
		        });
		    },
		    selectRating(type){
		    	//选择选中的类型
		    	this.selectType = type;
		        this.$nextTick(() => {
		          	this.scroll.refresh();
		        });
		    },
		    needShow(type,text){
		    	//如果要显示内容，并且此条text没有内容，此条不展示，返回false
		    	if(this.onlyContent && !text){
		    		return false
		    	}
		    	//上述不成立表示要么全展示，要么有内容
		    	//如果选择展示全部，就全部展示，返回true
		    	if(this.selectType === ALL){
		    		return true
		    	}else{
		    		return type === this.selectType
		    	}
		    }
		},
		filters: {
	      	formatDate(time) {
	        	let date = new Date(time);
	        	return formatDate(date, 'yyyy-MM-dd hh:mm');
	      	}
	    },
		components:{
			split,
			ratingselect
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	 @import "../../common/stylus/mixin.styl"

	.ratings
		position:absolute
		top:190px
		left:0
		bottom:0
		width:100%
		overflow:hidden
		transition: 1s;
		.overview
			display:flex
			padding:18px 0
			.overview-left
				flex:0 0 137px
				text-align:center
				border-right:1px solid rgba(7,17,27,0.1)
				.score
					font-size:24px
					color:rgb(255,153,0)
					line-height:28px
				.title
					font-size:12px
					coloc:rgb(7,17,27)
					line-height:12px
					margin-bottom:8px
				.rank
					font-size:10px
					color:rgb(7,17,27)
					line-height:10px
			.overview-right
				flex:1
				padding-left:24px
				.score-wrapper
					margin-bottom:8px
					font-size:0
					.title
						vertical-align:top
						display:inline-block
						text-align:center
						font-size:12px
						color:rgb(7,17,27)
						line-height:18px
						margin-right:12px
					.star
						display:inline-block
						vertical-align:top
						.el-rate__icon
							font-size:10px
						.el-rate__text
							font-size:12px
							color:rgb(255,153,0)
							line-height:18px
				.delivery-wrapper
					font-size:0
					.title
						font-size:12px
						line-height:18px
						color:rgb(7,17,27)
						margin-right:12px
					.delivery
						font-size:12px
						line-height:18px
						color:rgb(147,153,159)
		.rating-wrapper
			padding: 0 18px
			.rating-item
				display: flex
				padding:18px 0
				border-1px(rgba(7, 17, 27, 0.1))
				.avatar
					flex:0 0 28px
					width: 28px
					margin-right: 12px
					img
						border-radius:50%
				.content
					position:relative
					flex:1
					.name
						font-size:10px
						color:rgb(7,17,27)
						line-height:12px
						margin-bottom:4px
					.star-wrapper
						font-size:0px
						margin-bottom:6px
						.star
							display:inline-block
							vertical-align:top
							margin-right:6px
							.el-rate__icon
								font-size:10px
							.el-rate__text
								font-size:12px
								color:rgb(255,153,0)
								line-height:18px
						.delivery
							display:inline-block
							vertical-align:top
							font-size:10px
							font-weight:200
							color:rgb(147,153,159)
							line-height:12px
					.text
						font-size:12px
						color:rgb(7,17,27)
						line-height:18px
						margin-bottom: 8px
					.recommend
						font-size:0
						.icon-thumb_up
							display:inline-block
							margin-right:8px
							font-size:12px
							color:rgb(0,160,260)
							line-height:16px
						.item
							display:inline-block
							margin-right:8px
							padding:0 6px
							margin-bottom:4px
							font-size:9px
							line-height:16px
							border:1px solid rgba(7,17,27,.1)
							color:rgb(147,153,159)
					.time
						position:absolute
						right:0
						top:0
						font-size:10px
						font-weight:200
						color:rgb(147,153,159)
						line-height:12px

</style>