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
      		<div class="support" v-if="seller.supports">
      			<span class="ico" :class="this.classMap[seller.supports[0].type]"></span>
      			<span class="support-text">{{seller.supports[0].description}}</span>
      		</div>
      		<div class="support-num" v-if="seller.supports">
	      		<span class="support-count">{{seller.supports.length}}个</span>
	      		<i class="icon-keyboard_arrow_right"></i>	
	      	</div>
      	</div>
      </div>
      <div class="head-bulletin">
      	<span class="bulletin-ico"></span>
      	<span class="bulletin-text">{{seller.bulletin}}</span>
      	<i class="icon-keyboard_arrow_right"></i>	
      </div>
      <div class="bg">
      	<img class="bg-img" :src="seller.avatar" />
      </div>
    </div>
</template>

<script>
	import sellers from '@/components/sellers/sellers.vue'

	export default {
		props:{
			seller: {
				type: Object
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.header
		color:#fff
		position: relative
		overflow:hidden
		background:rgba(7,17,27,.5)
		.head-content
			position:relative;
			height:64px
			padding:24px 12px 18px 24px
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
			.support
				height:12px
				.ico
					float:left
					width:12px
					height:12px
					background-size:100% 100%
					background-repeat:no-repeat
					margin-right:4px
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
					line-height:12px
			.support-num
				float:left
				position:absolute
				right:12px
				bottom:18px
				padding:0 8px
				height:24px
				line-height:24px
				border-radius:16px 14px
				background:rgba(0,0,0,.2)
				.support-count
					vertical-align:top
					font-size:10px
				.icon-keyboard_arrow_right
					font-size:10px
					line-height:24px
		.head-bulletin
			position:relative
			padding:0 24px 0 12px
			white-space:nowrap
			overflow:hidden
			text-overflow:ellipsis
			background:rgba(7,17,27,.2)
			.bulletin-ico
				float:left
				width:22px
				height:12px
				margin-top:8px
				margin-right:4px
				bg-image('bulletin')
				background-size:100% 100%
				background-repeat:no-repeat
			.bulletin-text
				font-size:10px
				margin:0 4px
				line-height:28px
			.icon-keyboard_arrow_right
				position:absolute
				right:12px
				top:8px
				font-size:10px
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