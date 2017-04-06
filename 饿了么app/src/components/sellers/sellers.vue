<template>
	<transition name="trans" @after-enter="aftertrans">
		<div v-show="sellerShow" v-if="ratings[0]" >
			<div class="right-content" >
				<div class="sellers-header">
					<span @click="disappear" class="icon-arrow_lift"></span>
					商家详情
				</div>
				<div class="sellers-body" ref="sellers">
					<div class="sellers-body-content">
						<div class="sellers-body-top">
							<div class="sellers-shop-header">
								<div class="sellers-avatar">
						      		<img class="sellers-avatar-img" :src="seller.avatar" />
						      	</div>
						      	<div class="sellers-header-content">
						      		<div class="sellers-title">
						      			<span class="sellers-brand"></span>
						      			<span class="sellers-name">{{seller.name}}</span>
						      		</div>
						      		<div class="sellers-root">
						      			<div class="sellers-star">
							      			<el-rate
							      				class="star"
											  	v-model="seller.score"
											 	disabled
											  	show-text
											  	text-color="#ff9900"
											  	text-template="{value}">
											</el-rate>
										</div>
										<div class="sellers-arrive">月售{{seller.sellCount}}单</div>
						      		</div>
						      		<div class="sellers-sell">
						      			￥{{seller.minPrice}}起送 <span class="gang">|</span> 平均{{seller.deliveryTime}}分钟 <span class="gang">|</span> 1.93km
						      		</div>
				    	  		</div>
				    	  	</div>
				    	  	<div class="sellers-shop-content">
				    	  		<div class="sellers-shop-text">配送费：{{seller.deliveryPrice}}元</div>
				    	  		<div class="sellers-shop-text">公告：欢迎光临，用餐高峰期请提前下单，谢谢</div>
				    	  	</div>
						</div>
						<split></split>
						<div class="sellers-body-center">
							<div class="seller-ratings">
								<div class="ratings-top">
									<div class="ratings-count">{{seller.foodScore}}分</div>
									<div class="ratings-rankRate">高于周边商家{{seller.rankRate}}%</div>
									<div class="ratings-right">
										{{ratings.length}}条评价
										<span class="icon-keyboard_arrow_right"></span>
									</div>
								</div>
								<div class="ratingselect-wrapper">
									<ratingselect :onoff="onoff" :ratings="ratings"></ratingselect>
								</div>
								<div class="seller-wrapper">
									<div class="seller-item">
										<div class="avatar">
							              	<img width="28" height="28" :src="ratings[0].avatar">
							            </div>
							            <div class="content">
							            	<h1 class="name">{{ratings[0].username}}</h1>
								            <div class="star-wrapper">
							            		<el-rate class="star"
												  v-model="ratings[0].score"
												  disabled
												  text-color="#ff9900"
												  text-template="{value}">
												</el-rate>
							            		<span class="delivery" v-show="ratings[0].deliveryTime">{{ratings[0].deliveryTime}}分钟到达</span>

							            	</div>
								            	<div class="recommend" v-show="ratings[0].recommend && ratings[0].recommend.length">
								                <span class="icon-thumb_up"></span>
								                <span class="item" v-for="value in ratings[0].recommend">{{value}}</span>
								            </div>
								            <div class="time">
								                {{ratings[0].rateTime | formatDate}}
								            </div>
							            </div>
							        </div>
							        <div class="all-ratings">
							        	查看全部评价
							        	<span class="icon-keyboard_arrow_right"></span>
							        </div>
								</div>
								<split></split>
								<div class="seller-support">
									<h1 class="support-title">活动与服务</h1>
									<div class="supportLi" v-for="item in seller.supports">
							    		<span class="ico" :class="classMap[item.type]"></span>
								  		<span class="support-text">{{item.description}}</span>
							  		</div>
								</div>
								<split></split>
								<div class="pics">
									<h1 class="title">商家实景</h1>
									<div class="pic-wrapper" ref="picWrapper">
							          	<ul class="pic-list" ref="picList">
							            	<li class="pic-item" v-for="pic in seller.pics">
							              		<img :src="pic" width="120" height="90">
							            	</li>
							          	</ul>
							        </div>
								</div>
								<split></split>
								<div class="info">
							        <h1 class="title border-1px">商家信息</h1>
							        <ul>
							          	<li class="info-item" v-for="info in seller.infos">{{info}}</li>
							        </ul>
							    </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll';
	import split from '../split/split';
	import ratingselect from '../ratingselect/ratingselect';
	import {formatDate} from '../../common/js/date'; 


	const All = 2;
	const err_ok = 0;
	export default {
		props:{
			seller: {
				type: Object
			},
			sellerShow:{
				type: Boolean
			},
			ratings:{
				type:Array
			}
		},
		data(){
	     	return {
	       		showFlag: false,
	       		selectType: All,
	       		onlyContent: true,
	       		classMap:[],
	       		onoff:false
	     	}
	    },
	    created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee']
			
		},
	    methods:{
	    	disappear(){
				this.$emit("disappear-click");
			},
			aftertrans(el) {
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.sellers,{
							click:true
						})
					}else{
						this.scroll.refresh()
					}
					this. _initPics()
				})
		    },
		    _initPics() {
		        if (this.seller.pics) {
		          let picWidth = 120;
		          let margin = 6;
		          let width = (picWidth + margin) * this.seller.pics.length - margin;
		          this.$refs.picList.style.width = width + 'px';
		          this.$nextTick(() => {
		            if (!this.picScroll) {
		              this.picScroll = new BScroll(this.$refs.picWrapper, {
		                scrollX: true,
		                //横向滚动图片时忽略垂直方向的滚动
		                eventPassthrough: 'vertical'
		              });
		            } else {
		              this.picScroll.refresh();
		            }
		          });
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
	    	ratingselect,
	    	split
	    }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.right
	    position:absolute
	    left:0
	    top:0 
	    right:0
	    bottom:46px
	    color:#fff
	    overflow:hidden
	    transform:translate3d(0, 0, 0)
	    &.trans-enter-active, &.trans-leave-active
	        transition: all 0.5s
	    &.trans-enter, &.trans-leave-active
	        transform: translate3d(100%, 0, 0)
	    .right-content
	    	height:auto
		    .sellers-header
		    	height:40px
		    	text-align:center
		    	font-size:20px
		    	line-height:40px
		    	.icon-arrow_lift
		    		position:absolute
		    		top:0
		    		left:0
		    		padding:10px
		    .sellers-body
		    	position:absolute
			    left:0
			    top:40px
			    right:0
			    bottom:0
			    overflow:hidden
			    background:#fff
			    .sellers-body-content
			    	background:#f5f5f5
			    	.sellers-body-top
			    		background:#fff
			    		padding:14px 14px 9px
			    		.sellers-shop-header
			    			margin-bottom:9px
			    			height:66px
				    		.sellers-avatar
				    			float:left
				    			margin-right:16px
				    			.sellers-avatar-img
				    				width:64px
				    		.sellers-header-content
				    			float:left
				    			color:#000
				    			.sellers-title
				    				height:18px
				    				padding-top:4px
									.sellers-brand
										float:left
										width:30px
										height:18px
										margin-right:6px
										background-size:100% 100%
										background-repeat:no-repeat
										bg-image('brand')
									.sellers-name
										float:left
										font-size:16px
										font-weight:bold
										line-height:18px
								.sellers-root
									margin-top:6px
									.sellers-star
										float:left
										margin-right:6px
										.star
											.el-rate__icon
												font-size:14px
											.el-rate__text
												font-size:14px
												color:rgb(255,153,0)
												line-height:18px
									.sellers-arrive
										float:left
										font-size:14px
										line-height:20px
										color:#8b8b8b
								.sellers-sell
									float:left
									margin-top:6px
									height:12px
									font-size:12px
									color:#737373
									.gang
										font-size:10px
										position:relative
										top:-1px
						.sellers-shop-content
							height:62px
							background:#f8f8f8
							.sellers-shop-text
								height:32px
								line-height:32px
								color:#8c8c8c
								font-size:10px
								margin:0 10px 0
								&:first-of-type
									border-1px(rgba(7,17,27,0.1))
					.sellers-body-center
						background:#fff
						.seller-ratings
							.ratings-top
								height:40px
								padding:0 14px
								border-1px(rgba(7,17,27,0.1))
								.ratings-count
									float:left
									height:100%
									color:#fb5b03
									line-height:40px
									font-size:16px
									margin-right:5px
								.ratings-rankRate
									float:left
									height:100%
									color:#282828
									line-height:42px
									font-size:13px
								.ratings-right
									float:right
									height:100%
									color:#a1a1a1
									font-size:14px
									line-height:40px
									.icon-keyboard_arrow_right
										position:relative
										top:5px
										font-size:20px
						.seller-wrapper
							padding: 0 18px
							.seller-item
								display:flex
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
							.all-ratings
								color:rgb(147,153,159)
								text-align:center
								line-height:40px
								font-size:16px
								.icon-keyboard_arrow_right
									display:inline-block
									color:rgb(147,153,159)
									font-size:24px
									line-height:40px
									position:relative
									top:5px

						.seller-support
							padding:0 18px
							.support-title
								color:rgb(36,36,36)
								line-height:40px
								font-size:14px
								border-1px(rgba(7,17,27,.1))
							.supportLi
								height:28px
								margin-left:12px
								.ico
									float:left
									width:12px
									height:12px
									background-size:100% 100%
									background-repeat:no-repeat
									margin-right:4px
									margin-top:8px
									&.decrease
										bg-image('decrease_1')
									&.discount
										bg-image('discount_1')
									&.guarantee
										bg-image('guarantee_1')
									&.invoice
										bg-image('invoice_1')
									&.special
										bg-image('special_1')
								.support-text
									float:left
									height:10px
									font-size:10px
									line-height:28px
									color:rgb(147,153,159)
						.pics
							padding:18px 0 18px 18px
							.title
								color:rgb(36,36,36)
								line-height:14px
								font-size:14px
								margin-bottom:12px
							.pic-wrapper
								width: 100%
								overflow:hidden
								white-space:nowrap
								.pic-list
									font-size: 0
									.pic-item
										display:inline-block
										margin-right: 6px
										&:last-child
											margin: 0
						.info
							padding:18px
							.title
								color:rgb(36,36,36)
								line-height:14px
								font-size:14px
								padding-bottom:12px
								margin:0
								border-1px(rgba(7,17,27,.1))
							.info-item
								padding:16px 12px
								line-height:16px
								font-size:12px
								color:rgb(7,17,27)
								font-weight:200


</style>