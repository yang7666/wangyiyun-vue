<template>
  <div>
      <van-nav-bar title='评论' fixed left-arrow @click-left="$router.back()"/>
          <div class="main">
              <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                  <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    
                <div v-for="item in commentlis" :key="item.commentId">
                  <div class="wrap" >
                      <div class="img_wrap">
                          <van-image 
                          round
                          width="100%" 
                          height="100%" 
                          :src="item.user.avatarUrl" 
                          fit="cover" 
                          />
                      </div>
                      <div class="content_wrap">
                          <div class="header_wrap">
                              <div class="info_wrap">
                                  <p class="title_name">{{item.user.nickname}}</p>
                                  <p class="title_time">{{item.timeStr}}</p>
                              </div>
                              <div class="likes">{{item.likedCount}}点赞</div>
                          </div>
                          <div class="footer_wrap">{{item.content}}</div>
                      </div>
                  </div>
              </div>
              </van-list>
              </van-pull-refresh>
              
          </div>
  </div>
</template>

<script>
import {musicCommentAPI} from "@/api"
export default {
    props:{},
    data(){
        return{
            commentlis:[],
            isLoading: false,
            loading: false,
            finished: false,
            page:1
        }
    },
    methods: {
        onRefresh() {
            this.getList()
        },
        async getList(){
            const res = await musicCommentAPI({
                id:c,
                limit:20,
                offset:(this.page-1)*20
            })
            res.data.comments.forEach((obj)=>{this.commentlis.push(obj)});
            console.log(res);
            this.commentlis = res.data.comments
            this.isLoading = false;
            this.loading = false;
        },
        onLoad() {
            // 网页一打开就已经执行了一次了
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            console.log("onload");
            this.getList();
            this.page++;
            this.loading = false
        },
    }
}
</script>

<style scoped>
.main{
    margin: 46px  10px 50px;
}
.wrap{
    height: 130px;
    width: 100%;
    display: flex;
}
.img_wrap{
    display: inline-block;
    height: 30px;
    width: 30px;
}
.content_wrap{
    display: inline-block;
    font-size: 12px;
    flex:1;
}
.info_wrap{
    display: inline-block;
}
.title_time{
    color:rgb(109, 108, 108);
}
.likes{
    float: right;
}
.footer_wrap{
    margin-top: 5px;
}
</style>