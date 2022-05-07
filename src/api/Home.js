// home的请求方法
import request from "@/utils/request"

export const recommendMusic = (params)=>request({
    url:"/personalized",
    params
})
// fdc