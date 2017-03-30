<template>
  <div class="goods">
  	<div class="menu-wrapper" ref="menuWrapper">
  		<ul>
  			<li class="menu-item"
  			:class="currentIndex === index?'current':''" 
  			@click="selectMenu(index,$event)"
  			v-for="item,index in goods">
  				<div class="text">
	  				<span class="icon" :class="classMap[item.type]" v-show="item.type>0"></span>
	  				{{item.name}}
  				</div>
  			</li>
  		</ul>
  	</div>
  	<div class="foods-wrapper" ref="foodsWrapper">
  		<ul>
  			<li  v-for="item in goods" class="food-list food-list-hook">
  				<h1 class="title">{{item.name}}</h1>
  				<ul>
  					<li v-for="food in item.foods" class="food-item border-1px">
  						<div class="icon">
			                <img width="57" height="57" :src="food.icon">
			            </div>
			            <div class="content">
			                <h2 class="name">{{food.name}}</h2>
			                <p class="desc">{{food.description}}</p>
			                <div class="extra">
			                  	<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
			                </div>
			                <div class="price">
			                  	<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
			                </div>
			                <div class="cartcontrol-wrapper">
			                	<cartcontrol @add="addFood" :food="food"></cartcontrol>
			                </div>
						</div>
  					</li>
  				</ul>
  			</li>
  		</ul>
  	</div>
  	<shopcart :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"
              :select-foods = "selectFoods"
              ref="shopcart"
              ></shopcart>
  </div>
</template>

<script>
	import Bscroll from 'better-scroll';
	import shopcart from '../shopcart/shopcart';
	import cartcontrol from '../cartcontrol/cartcontrol'

	const err_ok = 0

	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				goods:[],
				listHeight:[],
				scrollY:0
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];

			//通过路由匹配数据
			this.$http.get('/api/goods').then((res)=>{
				res = res.body
				if(res.errno === err_ok){
		          this.goods = res.data;
		          //执行滚动条的初始化
		          this.$nextTick(()=>{
		          	//里面的代码会在dom更新后再执行
		          	//初始化滚动条
		          	this.initScroll();
		          	//计算滚动条滚动的高度
		          	this.calaulateHeight();
		          })
		          
		        }
			})
		},
		computed:{
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
		        let foods = [];
		        this.goods.forEach((good) => {
		          good.foods.forEach((food) => {
		            if (food.count) {
		              foods.push(food);
		            }
		          });
		        });
		        return foods;
		    }
		},
		methods:{
			addFood(target){
				//此时可以获取到元素target
				this._drop(target);
			},
			_drop(target) {
		        // 体验优化,异步执行下落动画
		        this.$nextTick(() => {
		        	//用this.ref.shopcart可以调用子组件的方法
		          this.$refs.shopcart.drop(target);
		        });
		    },
			initScroll() {
				//利用new Bscroll新建一个对象(类似于滚动条)
				//第一个参数为dom节点，第二个参数为一个对象
				//better-scroll会自动去寻找节点和它的父级去判断高度并添加滚动效果
				this.menuScroll = new Bscroll(this.$refs.menuWrapper,{
					//better-scroll会阻止掉移动端点击事件，如果想在元素内部添加事件，要在第二个参数中使用click:true，即利用better-scroll派发一个点击事件
					click:true
				})
				//probeType:3为实时监控滚动的位置,类似于探针；
				this.foodsScroll = new Bscroll(this.$refs.foodsWrapper,{
					probeType:3,
					click:true
				})
				//上面的会监听scroll这个事件
				this.foodsScroll.on('scroll',(pos)=>{
					//用scrollY去实时的存此时的滚动距离
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			calaulateHeight(){
				//获取所有的food-list-hook元素
				let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")

				//定义一个listHeight数组用来存food-list-hook的值，利用其值来判断此刻右边是什么区域
				let height = 0;
				//将最初始的值push到数组中
				this.listHeight.push(height);

				for(var i=0;i<foodList.length;i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height)
				}
			},
			selectMenu(index,event){
				//better-scroll会派发一个event对象，浏览器会派发一个event对象，因此在pc端会触发两个点击事件绑定函数
				//如果是原生的event对象，没有event._constructed
				//如果是better-scroll指定的event，拥有event._constructed
				if(!event._constructed){
					return;
				};
				let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
				let el = foodList[index];
				//用300ms的时间移动到元素上
				this.foodsScroll.scrollToElement(el,300);
			}
		},
		components:{
			shopcart,
			cartcontrol
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.goods
	    display: flex
	    position: absolute
	    top: 190px
	    bottom: 46px
	    width: 100%
	    transition:1s
	    overflow: hidden
	    .menu-wrapper
	      flex: 0 0 80px
	      width: 80px
	      background: #f3f5f7
	      .menu-item
	        display: table
	        height: 54px
	        width: 56px
	        padding: 0 12px
	        line-height: 14px
	        &.current
	          position: relative
	          z-index: 10
	          margin-top: -1px
	          background: #fff
	          font-weight: 700
	          .text
	            border-none()
	        .icon
	          display: inline-block
	          vertical-align: top
	          width: 12px
	          height: 12px
	          margin-right: 2px
	          background-size: 12px 12px
	          background-repeat: no-repeat
	          &.decrease
	            bg-image('decrease_3')
	          &.discount
	            bg-image('discount_3')
	          &.guarantee
	            bg-image('guarantee_3')
	          &.invoice
	            bg-image('invoice_3')
	          &.special
	            bg-image('special_3')
	        .text
	          display: table-cell
	          width: 56px
	          vertical-align: middle
	          border-1px(rgba(7, 17, 27, 0.1))
	          font-size: 12px
		.foods-wrapper
	      flex: 1
	      .title
	        padding-left: 14px
	        height: 26px
	        line-height: 26px
	        border-left: 2px solid #d9dde1
	        font-size: 12px
	        color: rgb(147, 153, 159)
	        background: #f3f5f7
	      .food-item
	        display: flex
	        margin: 18px
	        padding-bottom: 18px
	        border-1px(rgba(7, 17, 27, 0.1))
	        &:last-child
	          border-none()
	          margin-bottom: 0
	        .icon
	          flex: 0 0 57px
	          margin-right: 10px
	        .content
	          flex: 1
	          .name
	            margin: 2px 0 8px 0
	            height: 14px
	            line-height: 14px
	            font-size: 14px
	            color: rgb(7, 17, 27)
	          .desc, .extra
	            line-height: 10px
	            font-size: 10px
	            color: rgb(147, 153, 159)
	          .desc
	            line-height: 12px
	            margin-bottom: 8px
	          .extra
	            .count
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
	            right: 0
	            bottom: 12px
			
</style>