<template>
  <div>
      <van-nav-bar title='评论' fixed left-arrow @click-left="$router.back()"/>
          <div class="main">
              <div>
                  <div class="wrap">
                      <div class="img_wrap">
                          <img src="https://img01.yzcdn.cn/vant/cat.jpg" alt="">
                      </div>
                      <div class="content_wrap">
                          <div class="header_wrap">
                              <div class="info_wrap">
                                  <p>昵称</p>
                                  <p>2021</p>
                              </div>
                              <div>12点赞</div>
                          </div>
                          <div class="footer_wrap"></div>
                      </div>
                  </div>
              </div>
          </div>
  </div>
</template>

<script>
export default {
    methods:{
    }

}
</script>

<style>

</style>