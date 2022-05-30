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
      <div v-if="uid" class="content">
          <!-- 头像 -->
          <div class="userCard">
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
          <p class="likedBox">喜欢的音乐</p>
      </div>

  </div>
</template>

<script>
import {loginPhoneAPI,verifySentAPI,getuserInfoAPI,likedMusicAPI} from "@/api"
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
            likedList:[]
        }
    },
    methods:{
        getCode(){
            // 局部验证
            this.$refs.loginForm.validate('phone').then(()=>{
                // 发验证码请求
                verifySentAPI({phone:this.phone}).then(res=>{
                    console.log('验证码发送成功')
                }).catch(err=>{
                    console.log('验证码获取失败')
                })
                
            }).catch(()=>{
                // 提示电话号码出错
                console.log("电话号码错误")
            })
        },
        onSubmit(values){
            console.log("开始提交啦");
            console.log('submit',values);
            // 全局验证
            this.$refs.loginForm.validate().then(()=>{
                // 验证通过
                loginPhoneAPI(values).then(res=>{
                    console.log("成功登录",res);
                    this.uid = res.data.account.id

                    localStorage.setItem("token",res.data.token)
                    localStorage.setItem("uid",this.uid)

                    // 获取用户信息
                    getuserInfoAPI({uid:this.uid}).then(res=>{
                        console.log("获取用户信息成功",res);
                        this.userInfo = res.data.profile
                    }).catch(err=>{
                        console.log("获取用户信息失败",err);
                    })

                    likedMusicAPI({uid:this.uid}).then(res=>{
                        console.log("获取喜欢的音乐成功",res);
                        this.userInfo = res.data.profile
                    }).catch(err=>{
                        console.log("获取喜欢的音乐失败",err);
                    })

                    this.isLogined = true
                }).catch(err=>{
                    console.log("登陆失败",err);
                })
            }).catch(()=>{
            //验证失败
            })
        }
    },
    created(){
        // 获取用户信息
        if(localStorage.getItem('uid')){
            this.uid = localStorage.getItem('uid')
            getuserInfoAPI({uid:this.uid}).then(res=>{
                console.log("获取用户信息成功",res);
                this.userInfo = res.data.profile
            }).catch(err=>{
                console.log("获取用户信息失败",err);
            })

            likedMusicAPI({uid:this.uid}).then(res=>{
                console.log("获取喜欢的音乐成功",res);
                this.userInfo = res.data.profile
            }).catch(err=>{
                console.log("获取喜欢的音乐失败",err);
            })

            
        }
        
    }
}
</script>

<style scoped>
.changeBtn{
    float: right;
    margin: 0.5rem;
}
.content{
    /* background: chocolate; */
    border: 1px solid #ccc;
    height: 3rem;
    margin: 3rem 0.5rem;
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
.likedBox{
    margin-top: 4rem;
}

</style>