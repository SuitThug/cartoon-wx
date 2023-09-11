import {
    BASE_URL,
    TIMEOUT
} from '../config'
import {
    delay
} from '../assets/js/utils'
class JXRequset {
    // 请求发送前拦截函数
    // interceptorRequest(){

    // }
    // 请求响应后拦截拦截函数
    // interceptorResponse(){

    // }
    request(url, method, data) {
        let header = {}
        switch (method) {
            case 'GET':
                header = {
                    'content-type': 'application/json'
                }
                break
            case 'POST':
                header = {
                    'content-type': 'application/x-www-form-urlencoded'
                }
                break
        }
        const ACCESS_TOKEN = wx.getStorageSync('ACCESS_TOKEN')
        // console.log("token信息:"+ ACCESS_TOKEN);
        if (ACCESS_TOKEN) {
            header.token =ACCESS_TOKEN;
        }

        return new Promise((resolve, reject) => {
            wx.request({
                url: `${BASE_URL}${url}`,
                method,
                data,
                header,
                timeout: TIMEOUT,
                success: res => {
                    console.log(res, '获取响应数据');
                    const {
                        data,
                        statusCode
                    } = res
                    if (statusCode == 201) {
                        // showToast(data.msg)
                        return resolve(data)
                    } else if (res.data.code == 401 ||res.data.code == 402 || statusCode == 500) {
                        // wx.removeStorageSync('userInfo')
                        wx.clearStorageSync()
                        wx.showLoading({
                            title: '未登录',
                            duration: 2000,
                            success: async () => {
                                await delay(2000)
                                wx.switchTab({
                                    url: '/pages/user/index',
                                })
                            }
                        })

                    } else if (statusCode == 404) {
                        showToast('接口不存在')
                        return resolve({
                            data: '接口不存在'
                        })
                    }
                    resolve(data)
                },
                fail: err => {
                    console.log(err)
                    showToast(err.errMsg)
                    reject(err)
                }
            })
        })
    }
    get(url, data) {
        return this.request(url, 'GET', data)
    }
    post(url, data) {
        return this.request(url, 'POST', data)
    }
}
// 封装toast函数
function showToast(title, icon = 'none', duration = 2500, mask = false) {
    wx.showToast({
        title: title || '',
        icon,
        duration,
        mask
    });
}
const jxRequset = new JXRequset()
export default jxRequset