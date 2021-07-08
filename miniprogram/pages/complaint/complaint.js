// miniprogram/pages/complaint/complaint.js
import * as echarts from '../../components/ec-canvas/echarts';
import {
    getMonthData,
    getMonthHotComplaint,
    getSearchResult
} from '../../apis/complaintApi'
const app = getApp();
let chartData = [{
        value: 60,
        name: '当月受理'
    },
    {
        value: 50,
        name: '当月处理'
    },
    {
        value: 30,
        name: '当月整改'
    },
];


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
            data: chartData
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
        hotComplaint: [{
            desc: 'descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc',
            title: '123',
            imageURL: '../../../../pages/complaint/pic.webp',
            id: '0329',
            status: '处理中',
            date: '2021-2-2',
        }, {
            desc: 'descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc',
            title: '123',
            imageURL: '../../../../pages/complaint/pic.webp',
            id: '0329',
            status: '处理中',
            date: '2021-2-2'
        }],
        ec: {
            onInit: initChart
        },
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
    onLoad: function (options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        getMonthData().then(res => {
            let monthDataArray = []
            chartData[0].value = res.data.a;
            chartData[1].value = res.data.c;
            chartData[2].value = res.data.e;
            res.data.b = res.data.b >= 0 ? "+" + res.data.b : res.data.b;
            res.data.d = res.data.d >= 0 ? "+" + res.data.d : res.data.d;
            res.data.f = res.data.f >= 0 ? "+" + res.data.f : res.data.f;
            this.setData(res.data)
        });
        getMonthHotComplaint().then(res => {
            console.log(res, 'hello');
            let hotComplaint = res.data.map(item => {
                let {
                    creater,
                    id,
                    stars,
                    state,
                } = item;
                return {
                    desc: item.description,
                    imageURL: "https://napoleonxzy.cn" + item.image,
                    id,
                    date: item.time.slice(0, 10),
                    title: item.type || "title",
                }
            })
            this.setData({
                hotComplaint
            })
        });
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
    onGotoDetail(event) {
        let {
            complaintid
        } = event.target.dataset;
        wx.navigateTo({
            url: './detail/detail?complaintId=' + complaintid,
        })
    },
    onSearch(event) {
        const {
            detail
        } = event;
        if (detail === '') {

        } else {
            getSearchResult(event)
                .then(res => {
                    this.setData({
                        showSearch: true
                    })
                })
        }
    },
    closeSearch() {
        this.setData({
            showSearch: false
        })
    }
})