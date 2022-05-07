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
      <van-cell-group>
        <van-cell center title="刚发的广泛地给对方" label="描述信息" >
          <template #right-icon>
            <van-icon name="play-circle-o" class="search-icon" />
          </template>
        </van-cell>
      </van-cell-group>

      </van-row>
  </div>
</template>

<script>
import {recommendMusicAPI} from "@/api"
export default {
  data(){
    return{
      recommendList:[] //推荐歌单
    }
  },
  async created(){
    const res = await recommendMusicAPI({limit:6})
    this.recommendList = res.data.result;
    console.log(this.recommendList);
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