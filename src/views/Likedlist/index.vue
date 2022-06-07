<template>
  <div>
      <van-nav-bar title='喜欢的音乐' fixed left-arrow @click-left="$router.back()"/>
      <van-loading type="spinner" v-if="likedDtail.length" />
      <div class="main">
        <SongItem v-for="item in likedDtail" :key="item.id" 
        :name="item.name"
        :author="item.ar[0].name"
        :id="item.id"
        ></SongItem>
      </div>
  </div>
</template>

<script>
import {likedMusicAPI,getSongByIdAPI} from "@/api"
import SongItem from "@/components/SongItem.vue"
export default {
    components:{SongItem},
    data(){
        return{
            likedList:[],
            likedDtail:[]
        }
    },
    created(){
        // 获取喜欢的音乐
        let uid=this.$route.query.uid
        this.getLikedlis(uid)
    },
    methods:{
        getLikedlis(id){
            likedMusicAPI({uid:this.uid}).then(res=>{
                console.log("获取喜欢的音乐成功",res);
                this.likedList = res.data.ids
                this.getDetail()
            }).catch(err=>{
                console.log("获取喜欢的音乐失败",err);
            })
        },
        getDetail(){
            getSongByIdAPI(this.likedList.join(',')).then(res=>{
                console.log("获取详细音乐：",res);
                this.likedDtail = res.data.songs
            }).catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.main{
    margin-top: 1rem;
}
</style>