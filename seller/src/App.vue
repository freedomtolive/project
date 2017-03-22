<template>
  <div id="app">
    <v-header></v-header>
    <el-row>
      <el-col :span="8">
        <router-link to="/goods">
          <div class="grid-content bg-purple">
             商品
          </div>
        </router-link>
      </el-col>
      <el-col :span="8">
        <router-link to="/ratings">
          <div class="grid-content bg-purple">
            评论
          </div>
        </router-link>
      </el-col>
      <el-col :span="8">
        <router-link to="/seller">
          <div class="grid-content bg-purple">
           商家
          </div>
        </router-link>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue'

  export default {
    components: {
      'v-header':header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-row 
    margin-bottom: 20px;
    &:last-child 
      margin-bottom: 0
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
    text-align:center
    line-height:40px
</style>
