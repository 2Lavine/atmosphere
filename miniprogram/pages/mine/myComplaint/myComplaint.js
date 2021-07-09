// miniprogram/pages/mine/myComplaint/myComplaint.js
const state = [ // 投诉状态
    '已提交',
    '已受理',
    '处理中',
    '整改完成'
  ]

var app = getApp()
const mineApi = require('../../../apis/mineApi')

Page({
    data: {
        polluteType: [],
        state: [],
        openId: null,
        myComplaints: [
            {'type': 2, 'state': 1, 'description': 'testtesttest', 'time': '2021-11-05'},
            {'type': 1, 'state': 0, 'description': 'testtesttest', 'time': '2021-11-05'},
            {'type': 3, 'state': 2, 'description': 'testtesttest', 'time': '2021-11-05'},
        ],
        activeName: null,
        steps: [
          {desc: state[0],},
          {desc: state[1],},
          {desc: state[2],},
          {desc: state[3],}
        ],
    },
    
    onLoad: function (options) {
       this.getDate()
       this.getMyComplaintList()
    },

    getMyComplaintList(){
      mineApi.GetMineComplaint(this.data.openId).then(res => {
        console.log(res.data)
      })
    },

    goToComplaint(event){
      // console.log(event.currentTarget.dataset.index)
      let index = event.currentTarget.dataset.index
      wx.navigateTo({
        url: '/pages/complaint/detail/detail?complaintId=' + 8,
      })
    },

    getDate() {
      this.setData({
        polluteType: app.globalData.polluteType,
        state: app.globalData.state,
        openId: app.globalData.openId
      })
    },

    onChange(event) {
      // console.log(event)
      this.setData({
        activeName: event.detail,
      });
    },
})