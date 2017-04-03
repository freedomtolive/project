<template>
  <div id="app">
    <div class="box">
      <div class="left">
        <v-header :seller="seller" 
        @show-click="showFn" ></v-header>
        <el-row class="border-1px">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <router-link to="/goods">
                 <span>商品</span>
              </router-link>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <router-link to="/ratings">
                <span>评价<strong class="ratings-count">(4.4分)</strong></span>
              </router-link>
            </div>
          </el-col>
        </el-row>
        <router-view :seller="seller"></router-view>
      </div>
      <v-seller :seller="seller" :ratings="ratings" class="right" 
      :sellerShow="sellerShow" 
      @disappear-click="disappearFn"></v-seller>
    </div>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  import sellers from './components/sellers/sellers.vue'
  const err_ok = 0

  export default {
    data (){
      return {
        seller:{},
        sellerShow:false,
        ratings:[]
      }
    },
    created() {
      this.$http.get('/api/seller').then((response)=>{
        response = response.body
        if(response.errno === err_ok){
          this.seller = response.data
        }
      });
      this.$http.get('/api/ratings').then((response)=>{
        response = response.body;
        if (response.errno === err_ok) {
          this.ratings = response.data;
        }
      })
    },
    components: {
      'v-header': header,
      'v-seller':sellers
    },
    methods:{
      showFn(){
        this.sellerShow = true
      },
      disappearFn(){
        this.sellerShow = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  html,body,#app
    height:100%;
    width:100%;
    overflow:hidden
    .box
      height:100%;
      width:100%;
      .left
        float:left
        width:100%
        height:100%
        .el-row 
          background:#fff
          height:40px
          &:last-child 
            margin-bottom: 0
          border-1px(rgba(7,17,27,0.1))  
        .bg-purple-dark 
          background: #99a9bf
        .bg-purple-light 
          background: #e5e9f2
        .grid-content 
          border-radius: 4px
          min-height: 36px
        .row-bg 
          padding: 10px 0
          background-color: #f9fafc
        .grid-content
          height:40px
          & > a
            display:block
            height:40px;
            color:rgb(77,85,93)
            text-align:center
            font-size:14px
            line-height:40px
            .ratings-count
              color:#ea6d33
            &.active
              color:#0896f8
              .ratings-count
                 color:#0896f8
 

</style>
