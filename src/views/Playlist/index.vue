<template>
  <div>
    <van-nav-bar title='歌单详情' fixed left-arrow @click-left="$router.back()"/>
    <div class="main">
      <div class="content_wrap">
        <div class="img_wrap">
          <img :src="playlist.coverImgUrl" alt="">
        </div>
        <span class="descrption">{{playlist.description}}</span>
    </div>
    <div class="name">{{playlist.name}}</div>
    
      
  </div>
      <SongItem v-for="item in songlist" :key="item.id" 
      :name="item.name"
      :author="item.ar[0].name"
      :id="item.id"
       ></SongItem>
    </div>
</template>

<script>
import SongItem from "@/components/SongItem.vue"
import {getPlaylistByIdAPI,getPlaylistSongByIdAPI} from "@/api"
export default {
  components:{SongItem},
  data(){
    return{
      playlist:{},
      songlist:[]
    }
  },
  async created(){
    const res  = await getPlaylistByIdAPI({id:this.$route.query.id})
    this.playlist = res.data.playlist
    console.log(this.playlist);

    const songRes = await getPlaylistSongByIdAPI({id:this.$route.query.id})
    this.songlist = songRes.data.songs
    console.log(songRes);
  }

}
</script>

<style scoped>
.main{
  padding: 0 10px;
}
.content_wrap{
  margin-top: 1.3rem;
  height: 4rem;
  display: flex;
}
.img_wrap{
  width: 4rem;
  height: 4rem;
}
.img_wrap img{
  width: 100%;
  height: 100%;
}
.name{
  font-size: 14px;
  font-weight: 700;
  margin: 10px 0;
}
.descrption{
  font-size: 14px;
  line-height: 20px;
  flex: 1;
  margin: auto 10px;
  overflow: hidden;            
  text-overflow: ellipsis;     
  display:-webkit-box;         
  -webkit-box-orient:vertical; 
  -webkit-line-clamp:5; 
}
</style>