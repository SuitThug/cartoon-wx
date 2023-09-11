// pages/cartoon-page/index.js
const api = require('../../network/api')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        chapterImg: [],
        chapter_id: '',
        comics_id: '',
        chapterLsit: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        const {
            chapterId,
            comicsId,
            chapterName
        } = options


        this.setData({
            chapter_id: chapterId,
            comics_id: comicsId
        })
        this.init(options)
        this.getChapter(comicsId, chapterId)
    },

    async init(options) {
        let result = await api.reqChapterImg(options)
        if (result.code == 200) {
            this.setData({
                chapterImg: result.data
            })
        }

    },
    // 获取章节列表
    async getChapter(comicsid, chapter_id) {
        // 详情
        // let res = await api.reqCartoonDetails({
        //     cartoon_Id: comicsid
        // })
        // console.log(res)
        // if (res.code == 200) {
        //     this.setData({
        //         comics: res.data
        //     })

        // }
        console.log(comicsid)
        // 获取章节
        let res2 = await api.reqCartoonChapter({
            cartoon_Id: comicsid
        })
       
        if (res2.code == 200) {
            const item = res2.data.find(item => item._id == chapter_id);
            wx.setNavigationBarTitle({
                title: `第${item.chapterName}话`,
            })
            this.setData({
                chapterLsit: res2.data
            })
            // 历史记录
            this.getHistory()
        }

    },
    // 历史记录
    async getHistory() {
        let id = wx.getStorageSync('userInfo')._id
        let res = await api.reqHistory({userId:id,comicsId:this.data.comics_id})
        console.log(res)
    }, 


    //   切换章节
    tabChapter(e) {
        //   console.log(e)
        const {
            id,
            type
        } = e.currentTarget.dataset
        //  判断上一话按钮
        let length = this.data.chapterLsit.length
        let index = this.data.chapterLsit.findIndex(item => item._id === id)
        let num = 0
        if (type == 1 && index != -1) {
            // 点击上一话按钮，index- 1,
            num = index - 1
            //  console.log(num)
            if (num < 0) {
                wx.showToast({
                    title: '当前是第一话',
                    icon: 'none'
                })
                return
            }
        } else {
            num = index + 1
            console.log(num)
            console.log(index)
            if (num >= length) {
                wx.showToast({
                    title: '当前是最后一话',
                    icon: 'none'
                })
                return
            }
        }
        const item = this.data.chapterLsit[num]
        const obj = {
            comicsId: this.data.comics_id,
            chapterId: item._id,
        }
        this.init(obj)
        this.getChapter(item.comicsId, item._id)
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