<template>
  <div>
    <van-nav-bar :title='activTitle' />
    <div>
        <router-view />
    </div>
     
    <van-tabbar route  @change="ChangeFn">
        <van-tabbar-item replace name="首页" to="/layout/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace name="搜索" to="/layout/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data(){
        return{
            active:0,
            activTitle:this.$route.meta.title
        }
    },
    methods:{
        ChangeFn(str){
            this.activTitle = str;
        }
    }

}
</script>

<style>

</style>