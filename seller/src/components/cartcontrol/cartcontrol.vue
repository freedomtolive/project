<template>
	<div class="cartcontrol">
		<transition name="fade">
		 	<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart">
	    	</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart($event)"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		props:{
			food: {
		        type: Object
		    }
		},
	    methods:{
	    	addCart(event){
	    		if(!event._constructed){
					return;
				};
	    		if(!this.food.count){
	    			//通过vue的接口去写入值才能使dom检测到值得改变
	    			//(问题：子组件可以去修改父组件的键值吗？)
	    			Vue.set(this.food, 'count', 1);
	    		}else{
	    			this.food.count++
	    		}
	    	},
    		decreaseCart(event) {
		        if (!event._constructed) {
		          return;
		        }
		        if (this.food.count) {
		          this.food.count--;
		        }
		    }
	    }
	};

</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
	    font-size: 0
	    .cart-decrease
	      display: inline-block
	      padding: 6px
	      transition: all 0.4s linear
	      line-height: 24px
	      font-size: 24px
	      color: rgb(0, 160, 220)
	    .cart-count
	      display: inline-block
	      vertical-align: top
	      width: 12px
	      padding-top: 6px
	      line-height: 24px
	      text-align: center
	      font-size: 10px
	      color: rgb(147, 153, 159)
	    .cart-add
	      display: inline-block
	      padding: 6px
	      line-height: 24px
	      font-size: 24px
	      color: rgb(0, 160, 220)
	.fade-enter-active, .fade-leave-active {
	  transition: all .5s,
	}
	.fade-enter, .fade-leave-active {
	   transform: translate3d(24px, 0, 0) rotate(180deg)
	   opacity:0;
	}
</style>