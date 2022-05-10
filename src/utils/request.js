// 网络请求的方法
import axios from 'axios'
const ajax = axios.create({
    baseURL:'https://netease-cloud-music-api-kohl-zeta.vercel.app/',
    withCredentials: true
})

export default ajax;