// miniprogram/pages/mine/rankingList/rankingList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scroll_y: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setScrollHeght()
    },
    setScrollHeght: function(){
        let windowHeight = wx.getSystemInfoSync().windowHeight
        let windowWidth = wx.getSystemInfoSync().windowWidth
        this.setData({
          scroll_y: windowHeight * 750 / windowWidth - 225
        })
    },
})