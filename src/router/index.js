import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "@/views/Layout"
import Home from "@/views/Home"
import Search from "@/views/Search"
import Play from "@/views/Play"
import Comment from "@/views/Comment"
import  Playlist from "@/views/Playlist"
import  Personal from "@/views/Personal"


Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        redirect:"/layout"
    },
    {
        path:"/layout",
        component:Layout,
        redirect:"/layout/home",
        children:[
            {
                path:"home",
                component:Home,
                meta:{//元信息--给当前路由对象绑定值
                    title:"首页"
                }
            },
            {
                path:"search",
                component:Search,
                meta:{
                    title:"搜索"
                }
            },
            {
                path:"personal",
                component:Personal,
                meta:{
                    title:"个人中心"
                }

            }
        ]
    },
    {
        path:"/play",
        component:Play
    },
    {
        path:"/comment",
        component:Comment
    },
    {
        path:"/playlist",
        component:Playlist
    }
]

const router = new VueRouter({
    routes
})

export default router