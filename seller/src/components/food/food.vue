<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="food-header">
					<img :src="food.image">
					<div class="back">
						<i class="icon-arrow_lift" @click="hide"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
            			<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol @add="addFood" :food="food"></cartcontrol>
					</div>
					<transition name="fade3">
						<div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品介绍</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect  @toggle="toggleContent"
					@select="selectRating"
					:selectType="selectType"
					:onlyContent="onlyContent"
					:desc="desc"
					:ratings="food.ratings">
					</ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li class="rating-item" v-show="needShow(item.rateType,item.text)" v-for="item in food.ratings">
								<div class="user">
									<span class="name">{{item.username}}</span>
									<img class="avatar" width="12" height="12" :src="item.avatar">
								</div>
								<div class="time">{{item.rateTime | formatDate}}</div>
								<p class="text">
									<span :class="item.rateType===0?'icon-thumb_up':'icon-thumb_down'"></span>{{item.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll'
	import cartcontrol from '../cartcontrol/cartcontrol'
	import Vue from 'vue';
	import split from '../split/split'
	import ratingselect from '../ratingselect/ratingselect'
	import {formatDate} from '../../common/js/date';

	//ALL表示评价中选择全部，NEGITIVE表示推荐，POSITIVE表示吐槽
	const ALL = 2
	const NEGITIVE = 0
	const POSITIVE = 1

	export default {
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				showFlag:false,
				selectType:ALL,
				onlyContent:false,
				desc: {
		            all: '全部',
		            positive: '推荐',
		            negative: '吐槽'
		        }
			}
		},
		methods:{
			show(){
				this.showFlag = true
				//在每次这个页面展示时，将seletType和onlyContent重新设置为初始状态
				this.selectType = ALL
				this.onlyContent = false

				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.food,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide(){
				this.showFlag = false
			},
			addFirst(event){
				if (!event._constructed) {
		          	return;
		        }
		        //购物车的消失也是动画效果，避免点后就消失从而获取不到购物车的位置所导致的小球动画出现问题
		        Vue.set(this.food, 'count', 1);
		        this.$emit('add', event.target);
		    },
		    addFood(target) {
		        this.$emit('add', target);
		    },
		    toggleContent(){
		    	this.onlyContent = !this.onlyContent
		    	this.$nextTick(() => {
		          	this.scroll.refresh();
		        });
		    },
		    selectRating(type){
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
	        	//将一个时间戳转化为一个字符串
	        	return formatDate(date, 'yyyy-MM-dd hh:mm');
	      	}
	    },
		components:{
			cartcontrol,
			split,
			ratingselect
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active,&.move-leave-active
    	transition:all .5s
    &.move-enter,&.move-leave-active
    	transform:translate3d(100%,0,0)
    .food-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
      	position: absolute
      	top: 10px
      	left: 0;
      	.icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
	.cartcontrol-wrapper
	  position: absolute
	  right: 12px
	  bottom: 12px
	.buy
	  position: absolute
	  right:18px
	  bottom:18px
	  z-index:10
	  height:24px
	  line-height:24px
	  box-sizing: border-box
	  font-size:10px
	  border-radius:12px
	  padding: 0 12px
	  color: #fff
	  background:rgb(0, 160, 220)
	  opacity: 1
	  &.fade3.enter.active,&.fade3.leave.active
	  	transition:all .3s
	  &.fade3.enter,&.fade3.leave.active
	  	opacity:0
	.info
		padding: 18px
		.title
			line-height:14px
			font-size:14px
			margin-bottom:6px
			color:rgb(7,17,27)
		.text
			font-size:12px
			font-weight:200
			color:rgb(77,85,93)
			line-height:24px
	.rating
		padding-top:18px
		.title
			padding-left:18px
			line-height:14px
			font-size:14px
			margin-bottom:6px
			color:rgb(7,17,27)
		.rating-wrapper
			.no-rating
	          padding: 16px
	          font-size: 12px
	          color: rgb(147, 153, 159)
			.rating-item
				position:relative
				padding:16px 0
				margin:0 16px
				border-1px(rgba(7,17,27,0.1))
				.user
					position:absolute
					right:0
					top:16px
					color:rgb(147,153,159)
					line-height:12px
					.name
						display:inline-block
						font-size: 10px
						vertical-align: top
					.avatar
						border-radius:50%
				.time
		            margin-bottom: 6px
		            line-height: 12px
		            font-size: 10px
		            color: rgb(147, 153, 159)
		        .text
		            line-height: 16px
		            font-size: 12px
		            color: rgb(7, 17, 27)
		            .icon-thumb_up, .icon-thumb_down
		              	margin-right: 4px
		              	line-height: 16px
		              	font-size: 12px
		            .icon-thumb_up
		              	color: rgb(0, 160, 220)
		            .icon-thumb_down
		              	color: rgb(147, 153, 159)



</style>