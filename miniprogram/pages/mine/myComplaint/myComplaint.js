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
      mineApi.GetMineComplaint('100023').then(res => {
        console.log(res.data)
      })
    },

    getDate() {
      this.setData({
        polluteType: app.globalData.polluteType,
        state: app.globalData.state
      })
    },

    onChange(event) {
      console.log(event)
      this.setData({
        activeName: event.detail,
      });
    },
})