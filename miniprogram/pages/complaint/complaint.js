// miniprogram/pages/complaint/complaint.js
import * as echarts from '../../components/ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);

    var option = {
        backgroundColor: "#ffffff",
        tooltip: {
            trigger: 'item',
            formatter: "{a}\n{b} : {c}条"
        },
        calculable: true,
        series: [{
            name: '金字塔',
            label: false,
            labelLine: false,
            type: 'funnel',
            width: '70%',
            height: '90%',
            left: '15%',
            top: '5%',
            sort: 'ascending',
            data: [{
                    value: 60,
                    name: '访问'
                },
                {
                    value: 50,
                    name: '订单'
                },
                {
                    value: 30,
                    name: '咨询'
                },
            ]
        }, ]
    };


    chart.setOption(option);
    return chart;
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageURL: '../../../../pages/complaint/pic.webp',
        ec: {
            onInit: initChart
        },
        option1: [{
                text: '全部商品',
                value: 0
            },
            {
                text: '新款商品',
                value: 1
            },
            {
                text: '活动商品',
                value: 2
            },
        ],
        option2: [{
                text: '默认排序',
                value: 'a'
            },
            {
                text: '好评排序',
                value: 'b'
            },
            {
                text: '销量排序',
                value: 'c'
            },
        ],
        value1: 0,
        value2: 'a',
        showSearch: false
    },
    onGoDetail() {
        console.log(233);
        wx.navigateTo({
            url: './detail/detail',
        })
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
    onShareAppMessage: function (res) {
        return {
            title: '守护大气 可以在微信小程序中使用啦！',
            path: '/pages/index/index',
            success: function () {},
            fail: function () {}
        }
    },
    onGotoForm() {
        wx.navigateTo({
            url: './form/form',
        })
    },
    onGotoDetail() {
        wx.navigateTo({
            url: './detail/detail',
        })
    },
    onSearch(event) {
        const {
            detail
        } = event;
        if (detail === '') {

        } else {
            this.setData({
                showSearch: true
            })
        }
    },
    closeSearch(){
      this.setData({
        showSearch: false
      })  
    }
})