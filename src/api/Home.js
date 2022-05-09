// home的请求方法
import request from "@/utils/request"

export const recommendMusic = (params)=>request({
    url:"/personalized",
    params
})

export const recommendLatestMusic = (params)=>request({
    url:"/personalized/newsong",
    params
})