import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css"
import store from "@/store";
const request = axios.create({
    //基础路径
    baseURL: "/api",
    //代表请求5秒后超时
    timeout: 5000,
})

//请求拦截器：在发送请求之前，请求拦截器可以检测到，可以再请求发出去之前做一些事情
request.interceptors.request.use((config) => {
    //config:配置对象，一个重要的熟悉hearders请求头
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if (store.state.User.token) {
        config.headers.token = store.state.User.token
    }
    nprogress.start();
    return config;
})
//相应拦截器
request.interceptors.response.use((res) => {
    //成功的回调函数：服务器相应诗句回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done()
    return res.data;
}, (err) => {
    return Promise.reject(new Error('faile'));
})

export default request