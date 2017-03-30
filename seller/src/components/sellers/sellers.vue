<template>
	<div>
		<div class="right-content">
			<div class="sellers-header">
				<span @click="disappear" class="icon-arrow_lift"></span>
				商家详情
			</div>
			<div class="sellers-body">
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
									  	v-model="value5"
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
					<div class="ratings">
						<div class="ratings-top">
							<div class="ratings-count">{{seller.foodScore}}分</div>
							<div class="ratings-rankRate">高于周边商家{{seller.rankRate}}%</div>
							<div class="ratings-right">
								{{ratings.length}}条评价
								<span class="icon-keyboard_arrow_right"></span>
							</div>
						</div>
						<div class="ratings-content">
							<ratingselect 
							:select-type="selectType" :only-content="onlyContent"
							:ratings="ratings"
							></ratingselect>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import split from '../split/split';
	import ratingselect from '../ratingselect/ratingselect';

	const All = 2;
	const err_ok = 0;
	export default {
		props:{
			seller: {
				type: Object,
			}
		},
		created(){
			this.$http.get('/api/ratings').then((response)=>{
				response = response.body;
				if (response.errno === err_ok) {
		          this.ratings = response.data;
		        }
			})
		},
		data(){
	     	return {
	     		ratings:[],
	       		value5:this.seller.score,
	       		showFlag: false,
	       		selectType: All,
	       		onlyContent: true
	     	}
	    },
	    components:{
	    	ratingselect,
	    	split
	    },
	    methods:{
	    	disappear(){
				this.$emit("disappear-click");
			}
	    }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.right
	    position:absolute
	    left:100%;
	    top:0 
	    width:100%;
	    height:100%;
	    transition:1s;
	    color:#fff;
	    &.rightShow
	      	left:0
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
		    	background:#f5f5f5
		    	.sellers-body-top
		    		height:150px
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
									height:18px
									font-size:16px
									font-weight:bold
									line-height:18px
							.sellers-root
								margin-top:6px
								.sellers-star
									float:left
									margin-right:6px
								.sellers-arrive
									float:left
									font-size:16px
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
					height:230px
					background:#fff
					.ratings
						height:40px
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
						.ratings-content
							height:180px

</style>