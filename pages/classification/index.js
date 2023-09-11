// pages/classification/classification.js
const api = require('../../network/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [],
        active: 0,
        query: {
            limit: 15,
            pageNo: 1,
            category_id: ''
        },
        cartoon: []

    },


    clickNavbar(e) {
        this.data.query.category_id = e.currentTarget.dataset.id
        if (e.currentTarget.dataset.id == 0) {
            this.data.query.category_id = ''
        }
        this.setData({
            active: e.currentTarget.dataset.active,
            cartoons: []
        })
        this.cartoonData()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.cartoonData()
    },
    // 漫画
    async cartoonData() {
        let result = await api.reqCartoon(this.data.query)
        // const list = []
        // list.push(...result.data)
        this.setData({
            cartoon:result.data
        })
       
    },
    async onShow() {
        console.log('onshow')
        const data = {
            pageNo: 1,
            limit: 15
        }
        let result = await api.reqCartoonSort(data)
        if (result.code == 200) {
            const list = [{
                _id:'0',
                name: '全部'
            }]
            list.push(...result.data)
            this.setData({
                navList: list
            })
            
        }
        this.cartoonData()
    },

    clickCartoon(e){
        // console.log(e.currentTarget.dataset.cartoonid)
         const id = e.currentTarget.dataset.cartoonid
         wx.navigateTo({
           url: `/pages/cartoonDetail/index?cartoon_Id=${id}`,
         })
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