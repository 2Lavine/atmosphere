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
    
    /* 大气信息 */
    weatherInfo: {
      isGet: false, // 大气信息是否已查询
      cityId: null, // 城市Id
      cityName: null, // 城市名称
      airNow: null, // 今日空气信息
      airAfter: null,  // 空气信息预报（近5日）
      lifeIndices: null // 生活指数
    },

    openId: null,
    isUserLogin: false,
    userInfo: null,
    userLocation: null,
    polluteType: pollutetype,
    state: state
  }
})
