<template>
  <div>
      <!-- 标题 -->
      <p class="title">推荐歌单</p>
      <van-row gutter="10">
        <van-col span="8" v-for="item in recommendList" :key="item.id">
          <van-image
            width="100%"
            height="3rem"
            fit="contain"
            :src="item.picUrl"
          />
          <p class="song_name">{{item.name}}</p>
        </van-col>
      <p class="title">最新音乐</p>
      <SongItem v-for="item in latestMusic" :key="item.id" 
      :name="item.name"
      :author="item.song.artists[0].name"
      :id="item.id"
       ></SongItem>

      </van-row>
  </div>
</template>

<script>
import {recommendMusicAPI,recommendLatestMusicAPI} from "@/api"
import SongItem from "@/components/SongItem.vue"
export default {
  components:{SongItem},
  data(){
    return{
      recommendList:[], //推荐歌单
      latestMusic:[]
    }
  },
  async created(){
    const res = await recommendMusicAPI({limit:6})
    this.recommendList = res.data.result;
    console.log(this.recommendList);
    const res2 = await recommendLatestMusicAPI({limit:17})
    this.latestMusic = res2.data.result;
    console.log(this.latestMusic);
  }

}
</script>

<style scoped>
.title{
    padding: 0.266667rem 0.24rem;
    margin: 0 0 0.24rem 0;
    background-color: #eee;
    color: #333;
    font-size: 15px;
}
.song_name{
  font-size: .346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.search-icon {
  font-size: 20px;
  line-height: inherit;
}
</style>