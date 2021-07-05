//app.js
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

  }
})
