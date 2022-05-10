<template>
<!-- 封装歌曲组件 -->
      
          <van-cell
            center
            :title='name'
            :key="id"
            :label="author +'-'+name"
            @click="toComment()"
          >
        
          <template #right-icon>
            <van-icon name="play-circle-o" class="search-icon" @touchstart="playFn"/>
          </template>
        </van-cell>
      
</template>

<script>
export default {
    props:{
        name:String,
        author:String,
        id:Number
    },
    methods:{
        playFn(){
            this.$router.push({
                path:"/play",
                query:{id:this.id}
            })
        },
        toComment(){
          this.$router.push({path:"/comment",query:{id:this.id}})
        }
    }
}
</script>

<style scoped>
.search-icon {
  font-size: 20px;
  line-height: inherit;
}
</style>