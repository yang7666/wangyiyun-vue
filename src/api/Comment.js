import request from "@/utils/request"

export const musicComment = (params)=>request({
    url:"/comment/music",
    params
})