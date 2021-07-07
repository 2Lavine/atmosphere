// miniprogram/pages/mine/mine.js]
Page({
    data: {
        isUserLogin: true,
        listItems: [
            {"title": '排行榜', "imgSrc": '/static/img/ranking.png', textNum: 0},
            {"title": '我的投诉', "imgSrc": '/static/img/myComplaint.png', textNum: 0},
            {"title": '通知', "imgSrc": '/static/img/notice.png', textNum: 0},
            {"title": '勋章墙', "imgSrc": '/static/img/display.png', textNum: 0}
        ]
    },
    onLoad: function (options) {
    },
    test: function(params) {
        console.log(params.target.dataset)
    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    }
})