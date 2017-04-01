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
				</div>
				<div class="cartcontrol-wrapper">
					<cartcontrol @add="addFood" :food="food"></cartcontrol>
				</div>
				<transition name="fade3">
					<div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
				</transition>
			</div>
			<split></split>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll'
	import cartcontrol from '../cartcontrol/cartcontrol'
	import Vue from 'vue';
	import split from '../split/split'
	import ratingselect from '../ratingselect/ratingselect'

	export default {
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				showFlag:false
			}
		},
		methods:{
			show(){
				this.showFlag = true
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
</style>