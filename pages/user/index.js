// pages/classification/classification.js
// import {reqLogin} from '../../network/api/common.js'
const api = require('../../network/api.js')
import {
    delay
} from '../../assets/js/utils'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        isLogin: true,
        phone: '15078457610',
        password: '123456',
        user: {}
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const user = wx.getStorageSync('userInfo')
        console.log(user, 'user');
        this.setData({
            user: user
        })
    },



    login() {
        this.setData({
            show: true,
            isLogin:true
        })
    },
    register() {
        this.setData({
            show: true,
            isLogin:false
        })
    },

    async doneLogin() {
        //  console.log(this.data.phone)
        //  console.log(this.data.password)
        if (!this.data.password.trim() && !this.data.password.trim()) {
            return wx.showToast({
                title: '账号密码不能为空！',
                duration: 2000,
                icon: 'none'
            })
        }
        const user = {
            phone: this.data.phone,
            password: this.data.password,
        }
        let result = await api.reqLogin(user)
        console.log(result)
        if (result.code == 200) {
            wx.showToast({
                title: result.msg,
                duration: 2000,
                icon: 'success'
            })
            await delay(1000);
            wx.redirectTo({
                url: '/pages/home/index',
            })

            wx.setStorageSync('ACCESS_TOKEN', result.data)
            this.userInfo(result.data)

        }

    },

    async userInfo(token) {
        let res = await api.reqUserInfo(token)
        if (res.code == 200) {
            console.log(res)
            wx.setStorageSync('userInfo', res.data)
            this.setData({
                show: false,
                user: res.data
            })
        }

    },
    // 退出登录
    exitOut() {
        wx.removeStorageSync('userInfo')
        wx.removeStorageSync('ACCESS_TOKEN')
       
        this.setData({
            user: {}
        })
        wx.showToast({
            title: '退出登录成功',
        })
        wx.switchTab({
            url: '/pages/user/index',
          })
    },


    isLoginOrReg() {
        this.setData({
            isLogin: !this.data.isLogin,
        })
        console.log(this.data.isLogin)
    },



    onClose() {
        this.setData({
            show: false
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },



    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})