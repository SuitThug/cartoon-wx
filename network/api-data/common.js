// import request from '../request'
import jxRequest from '../request'
// const API = {
//     LOGIN_URL:'/admin/login', //登录
//     REGISTER_URL : '/admin/register', //注册
//     USERINFO_URL : '/admin/userInfo', //详细信息
// }
// export const reqLogin = () => request.post(API.LOGIN_URL)
// export const reqUserInfo = (data) => request.post(USERINFO_URL,data)

export default {
    reqLogin: data => jxRequest.post('/admin/login', data), //登录
    reqUserInfo: data => jxRequest.get('/admin/userInfo', data),//用户详情
    reqHomeData: data => jxRequest.get('/api/homeData', data) //首页数据
}