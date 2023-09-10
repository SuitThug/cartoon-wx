// pages/bookcase/bookcase.js
var api = require('../../network/api.js')
import Dialog from '@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        collect: [],
        historyList: []
    },

    // onChange(event) {
    //     wx.showToast({
    //         title: `切换到标签 ${event.detail.name}`,
    //         icon: 'none',
    //     });
    // },

    async getBoook() {
        let id = wx.getStorageSync('userInfo')._id
        let res = await api.reqQueryBooksheIf({
            userId: id
        })
        if (res.code == 200) {
            this.setData({
                collect: [...res.data]
            })
        }
    
    },

    toDetail(e) {
        const id = e.currentTarget.dataset.id
        console.log(e)
        wx.navigateTo({
            url: `/pages/cartoonDetail/index?cartoon_Id=${id}`,
        })
    },

    onClose(event) {
        const {
            position,
            instance
        } = event.detail;
        switch (position) {
            case 'left':
            case 'cell':
                instance.close();
                break;
            case 'right':
                Dialog.confirm({
                    message: '确定删除吗？',
                }).then(() => {
                    instance.close();
                });
                break;
        }
    },

    async getHistory() {
        console.log('getHistory')
        let id = wx.getStorageSync('userInfo')._id
        let res = await api.reqQueryHistory({
            userId:id
        })
        console.log(res)
        if (res.code == 200) {
            this.setData({
                historyList: res.data
            })
        }


    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     
        this.getBoook()
        this.getHistory()
    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const user = wx.getStorageSync('userInfo')
        console.log('show!!!!!')
        console.log(user)
        this.setData({
            user: user
        })
        this.getBoook()
        this.getHistory()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})