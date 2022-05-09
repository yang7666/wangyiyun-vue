import request from "@/utils/request"

export const hotSearch = ()=>request({
    url:"/search/hot"
})

// 关键字搜索
export const searchResult = (params)=>request({
    url:"/cloudsearch",
    params
})