// 网络请求的方法
import axios from 'axios'
const ajax = axios.create({
    baseURL:'https://netease-cloud-music-api-kohl-zeta.vercel.app/',
    withCredentials: true
})

// 配置请求和响应拦截器
// ajax.interceptors.request.use((config)=>{
    
//     if (localStorage.getItem('token')) { //判断token是否存在
//         config.headers.Authorization = "Bearer "+ localStorage.getItem('sf_token').replace(/\"/g, "");  //将token设置成请求头
//     }
//     return config;//包含headers请求头
//  }, (error)=>{
//     console.log("请求拦截器 失败");
//     return Promise.reject(error);
//  });

//  ajax.interceptors.response.use(response=>{
//     //具体看token过期状态码
//     if (response.code === "token_not_valid") {
//         console.log("token过期");
//         //去游客界面
//         router.replace('/');
//         //删除token
//         localStorage.removeItem("sf_token")
//     }
//     return response;
// },error=>{
//     Message.error(error); 
//     return Promise.reject(new Error("faile"));
// })

export default ajax;