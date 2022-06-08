<template>
  <div>
      <!-- 未登录 -->
      <div v-if="!uid">
          <van-form ref="loginForm" @submit="onSubmit">
            <van-field
                v-model="phone"
                name="phone"
                label="电话号码"
                placeholder="电话号码"
                :rules = telRule
            />
            <van-field
                v-if="!passwordShow"
                v-model="captcha"
                type="password"
                name="captcha"
                label="验证码"
                placeholder="验证码"
                :rules= captchaRule
            >
            <template #button>
                <van-button size="small" type="primary" @click="getCode">发送验证码</van-button>
            </template>
            </van-field>
            <van-field
                v-if="passwordShow"
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-button type="primary" class="changeBtn" size="mini" @click="passwordShow=false" v-if="passwordShow">验证码登录</van-button>
            <van-button type="primary" class="changeBtn" size="mini" @click="passwordShow=true" v-if="!passwordShow">密码登录</van-button>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
            </van-form>
      </div>
      <!-- 已经登录 -->
      <div v-if="uid" class="userCard">
          <!-- 头像 -->
            <div class="imgBox">
                <van-image
                    round
                    width="2rem"
                    height="2rem"
                    :src="userInfo.avatarUrl"
                    />
            </div>
            <p class="nikname">{{userInfo.nickname}}</p>
      </div>
      <!-- 喜欢的音乐 -->
      <div v-if="uid" class="likedContent" @click="toLikedList">
            <div class="img_box">
                <van-image
                fit="fill"
                width="2rem"
                height="2rem"
                :src="firstImg"
                />
                <van-icon name="like-o" class="likedicon" />
            </div>
            <div class="txt">
                <p class="likedtxt1">我喜欢的音乐</p>
                <p class="likedtxt2">{{likedList.length}}首</p>
            </div>
      </div>

  </div>
</template>

<script>
import {loginPhoneAPI,verifySentAPI,getuserInfoAPI,likedMusicAPI,getSongByIdAPI} from "@/api"
export default {
    data(){
        return {
            phone:"",
            password:"",
            captcha:"",
            passwordShow:true,
            telRule:[{ required: true, message: '请填写电话号码' ,trigger: 'onBlur'},
                 {
                	// 自定义校验规则
                    validator: value => {
                        return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
                            .test(value)
                    },
                    message: '请输入正确格式的手机号码',
                    trigger: 'onBlur'
                }],
            captchaRule:[{ required: true, message: '请填写验证码' ,trigger: 'onBlur'}],
            isLogined:false,
            uid:"",
            userInfo:{},
            likedList:[],
            firstImg:""
        }
    },
    methods:{
        getCode(){
            // 局部验证
            this.$refs.loginForm.validate('phone').then(()=>{
                verifySentAPI({phone:this.phone}).then(res=>{
                    console.log('验证码发送成功')
                }).catch(err=>{
                    console.log('验证码获取失败')
                })
                
            }).catch(()=>{
                console.log("电话号码错误")
            })
        },
        onSubmit(values){
            this.$refs.loginForm.validate().then(()=>{
                loginPhoneAPI(values).then(res=>{
                    console.log("成功登录",res);
                    this.uid = res.data.account.id

                    localStorage.setItem("token",res.data.token)
                    localStorage.setItem("uid",this.uid)

                    // 获取用户信息
                    this.getInfo();
                    this.isLogined = true

                }).catch(err=>{
                    console.log("登陆失败",err);
                })
            }).catch(()=>{
            console.log("验证失败")
            })
        },
        // 获取用户信息
        getInfo(){
            getuserInfoAPI({uid:this.uid}).then(res=>{
                console.log("获取用户信息成功",res);
                this.userInfo = res.data.profile
            }).catch(err=>{
                console.log("获取用户信息失败",err);
            })

            likedMusicAPI({uid:this.uid}).then(res=>{
                console.log("获取喜欢的音乐成功",res);
                this.likedList = res.data.ids

                // 获取第一证照片url
                let firstImgId = this.likedList[0]
                console.log(firstImgId);
                getSongByIdAPI(firstImgId).then(res=>{
                    console.log("获取第一个成功",res);
                    this.firstImg = res.data.songs[0].al.picUrl
                    console.log(this.firstImg);
                }).catch(err=>{
                    console.log("获取第一个失败",err);
                })

            }).catch(err=>{
                console.log("获取喜欢的音乐失败",err);
            })
        },
        toLikedList(){
            this.$router.push({
                path:"/likedlist",
                query:{uid:this.uid}
            })
        }
    },
    created(){
        // 获取用户信息
        if(localStorage.getItem('uid')){
            this.uid = localStorage.getItem('uid')
            this.getInfo();
        }
        
    }
}
</script>

<style scoped>
.changeBtn{
    float: right;
    margin: 0.5rem;
}
.userCard{
    /* background: chocolate; */
    border: 1px solid #ccc;
    height: 3rem;
    margin: 3rem 0.5rem 0.5rem;
    border-radius:1.5rem;
    position: relative;
}
.imgBox{
    position: absolute;
    top: -1rem;
    left: 3.3rem;
}
.nikname{
    position: absolute;
    top: 1rem;
    left: 3.3rem;
    font-size: 20px;
}
.likedContent{
    padding: 0.5rem 0.5rem;
    height: 2rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin: 0 0.5rem;
    display: flex;
    align-items: center;
}
.img_box{
    display: inline-block;
    position: relative;
}
.likedicon{
    position: absolute;
    top: 0.8rem;
    left: 0.8rem;
    z-index: 99;
    color: #fff;
}
.txt{
    display: inline-block;
    margin: 0 auto;
}
.likedtxt1,.likedtxt2{
    font-size: 14px;
}
.likedtxt1{
    margin-bottom: 10px;
}

</style>