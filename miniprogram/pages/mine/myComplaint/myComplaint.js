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
        pollutionType: null,
        // state: [],
        openId: null,
        myComplaints: [],
        activeName: 1,
        steps: [
          {desc: state[0],},
          {desc: state[1],},
          {desc: state[2],},
          {desc: state[3],}
        ],
    },
    
    onShow: function (options) {
       this.getDate()
       this.getMyComplaintList()
    },

    getMyComplaintList(){
      mineApi.GetMineComplaint(this.data.openId).then(res => {
        console.log(res.data)
        let result = res.data
        let myComplaints = res.data
        for(let i = 0; i < result.length; i++){
          myComplaints[i].time = result[i].time.substring(0, 10)
          let index = myComplaints[i].type
          myComplaints[i].type = this.data.pollutionType[index]
        }
        // console.log(myComplaints)
        this.setData({
          myComplaints: myComplaints
        })
      })
    },

    goToComplaint(event){
      // console.log(event.currentTarget.dataset.index)
      let index = event.currentTarget.dataset.index
      wx.navigateTo({
        url: '/pages/complaint/detail/detail?complaintId=' + this.data.myComplaints[index].id,
      })
    },

    getDate() {
      // console.log(app.globalData.pollutionType)
      this.setData({
        pollutionType: app.globalData.pollutionType,
        // state: app.globalData.state,
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