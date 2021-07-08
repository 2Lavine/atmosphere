const userLoginApi = require('./apis/userLoginApi')

const pollutetype = [ //污染类别
  '黑烟柴油',
  '油烟排放',
  '尘土飞扬',
  '油气泄露',
  '烟尘排放',
  '其他'
]
const pollutionType = ['工业生产', '交通运输', '农业活动', '居民生活', '其他']
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

    // 若用户已注册则保存用户信息，若未注册则保存openid在我的页进行登录注册
    userLoginApi.TryToLogin().then((res) => {
      console.log(res)
      if (res.data.status == 'failure') {

        if (res.data.userid) {
          that.globalData.openId = res.data.userid
        } else {
          wx.showToast({
            title: '获取信息错误',
          })
        }

      } else if (res.data.status == 'success') {

        let userInfo = {
          'name': res.data.name,
          'avatar': res.data.avatar,
          'email': res.data.email,
          'exp': res.data.exp,
          'phone': res.data.phone
        }
        that.globalData.openId = res.data.userid,
          that.globalData.userInfo = userInfo
        that.globalData.isUserLogin = true

      } else {
        console.log(res)
      }
    }, (err) => {
      console.log(err)
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
      airAfter: null, // 空气信息预报（近5日）
      lifeIndices: null // 生活指数
    },

    openId: null,
    isUserLogin: false,
    userInfo: null,

    userLocation: null,
    polluteType: pollutetype,
    state: state,
    rewardTitle: rewardTitle,
    pollutionType
  }
})