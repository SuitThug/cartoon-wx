// pages/cartoonDetail/index.js
const api = require('../../network/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        comics: [],
        chapter: [],
        isBook: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        this.init(options)
        this.isCollect(options)
        wx.showLoading({
            title: '加载中...',
        })
    },

    async init(options) {
        let res = await api.reqCartoonDetails(options)
        if (res.code == 200) {
            this.setData({
                comics: res.data
            })
            let res2 = await api.reqCartoonChapter(options)
            if (res2.code == 200) {
                this.setData({
                    chapter: res2.data
                })
            }
            wx.hideLoading()
            //    添加阅读量
            await api.reqAddRead({
                comicsId: this.data.comics._id
            })
        }
    },

    async isCollect(option) {
        const {
            cartoon_Id
        } = option
        const userid = wx.getStorageSync('userInfo')._id
        let res = await api.reqIsCollect({
            userId: userid,
            comicsId: cartoon_Id
        })
        console.log(res)
        if (res.code == 200) {
            this.setData({
                isBook: res.isCollect
            })
        }
    },



    onChapterBtn(e) {
        const {
            chapterId,
            comicsId,
            chapterName
        } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/cartoon-page/index?chapterId=${chapterId}&comicsId=${comicsId}&chapterName=${chapterName}`,
        })
    },

    async addBooksheIf(e) {
        console.log(e)
        const {
            iscollect
        } = e.currentTarget.dataset
        let id = wx.getStorageSync('userInfo')._id
        const option = {
            userId: id,
            comicsId: this.data.comics._id
        }
        if (this.data.isBook) {
            console.log('移除')
            let res = await api.reqDelCollect(option)
            if (res.code == 200) {
                wx.showToast({
                    title: res.msg,
                    icon:"none"
                })
                this.setData({
                    isBook: false
                })
            }
        } else {
            this.setData({
                isBook: true
            })
            console.log('添加')
            let reslut = await api.reqAddBooksheIf(option)
            // console.log(reslut)
            if (reslut.code == 200) {
                wx.showToast({
                    title: reslut.msg,
                    icon:"none"
                })
                this.setData({
                    isBook: true
                    
                })
            }
        }


    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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