<template>
  <div>
        <van-search v-model="searchValue" placeholder="搜索歌曲、歌手、专辑" />
        <div class="search_wrap" v-if="songList.length === 0">
          <p class="title">热门搜索</p>
          <ul class="hot_name_wrap" >
            <li class="hot_item" v-for="item,i in hotList" :key="i" @click="btn(item.first)">{{item.first}}</li>
          </ul>
        </div>
        
        <!-- 搜索结果 -->
      <div class="search_wrap" v-if="songList.length !== 0">
        <!-- 标题 -->
        <p class="title">最佳匹配</p>
        <SongItem v-for="item in songList" :key="item.id" 
        :name="item.name"
        :author="item.ar[0].name"
        :id="item.id"
        ></SongItem>

        <!-- <van-cell
          center
          :title='item.name'
          v-for="item in songList"
          :key="item.id"
          :label="item.ar[0].name +'-'+item.name"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.6rem"/>
          </template>
        </van-cell> -->
      </div>
  </div>
</template>

<script>
import {hotSearchAPI,searchResultAPI} from "@/api"
import SongItem from "@/components/SongItem.vue"
export default {
  components:{SongItem},
  data(){
    return{
      searchValue:"",
      hotList:[],
      songList:[],
      timer:null
    }
  },
  async created() {
    const res = await hotSearchAPI();
    this.hotList = res.data.result.hots
    console.log(res);
  },
  methods:{
    async btn(str){
      this.searchValue = str
      const res = await searchResultAPI({
          type:1,
          keywords:this.searchValue
        })
        this.songList = res.data.result.songs
        setTimeout(()=>{
          clearTimeout(this.timer)
        })
    }
  },
  watch:{
    async searchValue(val){
      clearTimeout(this.timer);
      if(val.length === 0) return this.songList = [];
      this.timer = setTimeout(async()=>{
        const res = await searchResultAPI({
          type:1,
          keywords:val
        })
        this.songList = res.data.result.songs

      },500)
    }
  }
}
</script>

<style scoped>
.search_wrap{
  padding:0 0.266667rem;}
.title{
  font-size: 0.32rem;
  color: #666;
}
/deep/.van-field__control{
  font-size: 12px;
}
.hot_name_wrap {
  margin: 0.266667rem 0;
}
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>