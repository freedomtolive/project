<template>
	<div class="header">
      	<div class="head-content">
	      	<div class="avatar">
	      		<img class="avatar_img" :src="seller.avatar" />
	      	</div>
	      	<div class="header-content">
	      		<div class="title">
	      			<span class="brand"></span>
	      			<span class="name">{{seller.name}}</span>
	      		</div>
	      		<div class="discribution">
	      			{{seller.description}}/{{seller.deliveryTime}}分钟送达
	      		</div>
	      		<div class="head-bulletin">
			      	<span class="bulletin-ico"></span>
			      	<span class="bulletin-text">{{seller.bulletin}}</span>
			    </div>
	      		<i class="icon-keyboard_arrow_right" @click="showFn"></i>
    	  	</div>
      	</div>
    	<div class="support" v-if="seller.supports" >
	    	<div class="supportLi" v-for="item in seller.supports">
	    		<span class="ico" :class="classMap[item.type]"></span>
		  		<span class="support-text">{{item.description}}</span>
	  		</div>
	  		<div class="support-num" v-if="seller.supports" @click="showAll">
	      		<span class="support-count">{{seller.supports.length}}个</span>
	      		<i class="icon-keyboard_arrow_right"></i>	
	      	</div>
		</div>
	    <div class="bg">
	      	<img class="bg-img" :src="seller.avatar" />
	    </div>
    </div>
</template>

<script>
	export default {
		props:{
			seller: {
				type: Object,
			},
			sellerShow:false
		},
		data(){
			return {
				classMap:[],
				showA:false
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		},
		methods:{
			showFn(){
				this.$emit("show-click");
			},
			showAll(){
				var support = document.querySelector('.support')
				var goods = document.querySelector('.goods')
				var ratings = document.querySelector('.ratings')
				if(!this.showA){
					var high = this.seller.supports.length * 28
					support.style.height = high + 'px'
					if(goods){
						goods.style.top = 190 - 28 + high + 'px'
					}
					if(ratings){
						ratings.style.top = 190 - 28 + high + 'px'
					}
				}else{
					support.style.height = null
					if(goods){
						goods.style.top = null
					}
					if(ratings){
						ratings.style.top = null
					}
				}
				this.showA = !this.showA
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.header
		color:#fff
		position:relative
		overflow:hidden
		background:rgba(7,17,27,.5)
		.head-content
			position:relative;
			height:64px
			padding:40px 12px 18px 24px
		.avatar
			float:left
			margin-right:16px
			.avatar_img
				width:64px
				height:64px
		.header-content
			float:left
			.title
				height:18px
				margin:2px 0 8px 0
				.brand
					float:left
					width:30px
					height:18px
					margin-right:6px
					bg-image('brand')
					background-size:100% 100%
					background-repeat:no-repeat
				.name
					float:left
					height:18px
					font-size:16px
					font-weight:bold
					line-height:18px
			.discribution
				height:12px
				font-size:12px
				line-height:12px
				margin-bottom:10px
			.head-bulletin
				width:220px
				height:12px
				position:relative
				.bulletin-ico
					float:left
					width:22px
					height:12px
					margin-right:4px
					bg-image('bulletin')
					background-size:100% 100%
					background-repeat:no-repeat
				.bulletin-text
					float:left
					white-space:nowrap
					overflow:hidden
					text-overflow:ellipsis
					width:180px
					font-size:10px
					margin:0 4px
			.icon-keyboard_arrow_right
				position:absolute
				top:44px
				right:37px
				width:13px
				height:24px
				font-size:40px
		.support
			padding:0 12px 0 24px
			height:28px
			overflow:hidden
			position:relative
			transition:1s
			.supportLi
				height:28px
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
			.support-num
				position:absolute
				top:0
				right:24px
				height:24px
				line-height:24px
				.support-count
					vertical-align:top
					font-size:10px
				.icon-keyboard_arrow_right
					font-size:10px
					line-height:24px
	.bg
		position:absolute
		top:0
		left:0
		width:100%
		height:100%
		z-index:-1
		filter:blur(10px)
		.bg-img
			width:100%
			height:100%	
</style>