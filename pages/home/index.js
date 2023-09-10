// pages/home/home.js
var api = require('../../network/api.js')
Page({
    data: {
        background: ['../public/images/background1.jpg', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
        carousel: [],
        hotAndRecommend: []

    },

    oncarousel(e) {
        const id = e.currentTarget.dataset.cartoonid
        wx.navigateTo({
            url: `/pages/cartoonDetail/index?cartoon_Id=${id}`,
        })
    },

    async gethome() {
        let res = await api.reqHomeData()
        // console.log(res)
        if (res.code == 200) {
            const {
                carousel,
                hotAndRecommend
            } = res.data
            this.setData({
                carousel,
                hotAndRecommend
            })
        }
    },

    onDetails(e) {
        const id = e.currentTarget.dataset.cartoonid
        wx.navigateTo({
            url: `/pages/cartoonDetail/index?cartoon_Id=${id}`,
        })
    },

    onRead() {
        wx.navigateTo({
            url: `/pages/read/index`,
        })
    },

    toBooksheif() {
        wx.switchTab({
            url: '/pages/bookcase/bookcase',
        })
    },
    onLoad() {
        this.gethome()
    },
    onShow() {
        console.log('show')
        let user = wx.getStorageSync('userInfo')
        if (!user) {
            this.gethome()
        }
    },

    changeIndicatorDots() {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },

    changeAutoplay() {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },

    intervalChange(e) {
        this.setData({
            interval: e.detail.value
        })
    },

    durationChange(e) {
        this.setData({
            duration: e.detail.value
        })
    }











})