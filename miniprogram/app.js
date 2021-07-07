//app.js
const pollutetype = [ //污染类别
  '黑烟柴油',
  '油烟排放',
  '尘土飞扬',
  '油气泄露',
  '烟尘排放',
  '其他'
]

const state = [ // 投诉状态
  '已提交',
  '已受理',
  '处理中',
  '整改完成'
]

const rewardTitle = [
  '环保萌新',
  '环保志士',
  '环保达人',
  '环保督察官',
  '环保大使',
]

App({
  onLaunch: function () {
    var that = this

    wx.getSystemInfo({
      success: e => {
        
      }
    })
  },


  
  globalData: {
    authSetting: null,
    openId: null,
    isUserLogin: false,
    userInfo: null,
    userLocation: null,
    polluteType: pollutetype,
    state: state,
    rewardTitle: rewardTitle
  }
})
