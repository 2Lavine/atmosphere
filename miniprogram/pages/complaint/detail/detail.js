// miniprogram/pages/complaint/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        steps: [{
                text: '步骤一',
                desc: '描述信息',
            },
            {
                text: '步骤二',
                desc: '描述信息',
            },
            {
                text: '步骤三',
                desc: '描述信息',
            },
            {
                text: '步骤四',
                desc: '描述信息',
            },
        ],
        active: 1,
        likeName: 'like-o',
        likeNumber: '20',
        commentlikeNumber: '20',
        imageURL: '../../../../../../../../../pages/complaint/pic.webp',
        categoryText:'类别',
        mapMessage:"地址是",
        tempFilePaths:'../../../../../../../../../pages/complaint/pic.webp',
        complaintDescription:"车牌号为",
        unit:"2132",
        otherMessage:'其他的话'
    },
    likeHandler() {
        // this.updateBackEnd
        if (this.data.likeName === 'like-o')
            this.setData({
                likeNumber: +this.data.likeNumber + 1,
                likeName: 'like'
            })
        else {
            this.setData({
                likeNumber: +this.data.likeNumber - 1,
                likeName: 'like-o'
            })
        }
    },
    commentHandler(event) {
        // let {
        //     comments
        // } = this.data
        // comments.unshift(this.data.xxx)
        // this.setData({
        //     comments
        // })
        this.postComment()
    },
    postComment() {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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