import request from "@/utils/request"

//（1） 电话号码
export const loginPhone = (params)=>request({
    url:"/login/cellphone",
    params
})

// 发验证码
export const verifySent = (params)=>request({
    url:"/captcha/sent",
    params
})

// 获取用户信息

export const getuserInfo = (params)=>request({
    url:"/user/detail",
    params
})

// 喜欢的音乐
export const likedMusic = (params)=>request({
    url:"/likelist",
    params
})


// 二维码
export const loginQR = (params)=>request({
    url:"/login/qr/key",
    params
})