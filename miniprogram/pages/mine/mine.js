const userLoginApi = require('../../apis/userLoginApi')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const app = getApp()

const levelDict = {
    '200': '环保萌新',
    '500': '环保志士',
    '1000': '环保卫士',
    '2000': '环保督察官',
    '-1': '环保大使'
}

Page({
    data: {
        isUserLogin: true,
        listItems: [
            {"title": '排行榜', "imgSrc": '/static/img/ranking.png', textNum: 0},
            {"title": '我的投诉', "imgSrc": '/static/img/myComplaint.png', textNum: 0},
            {"title": '通知', "imgSrc": '/static/img/notice.png', textNum: 0},
            // {"title": '勋章墙', "imgSrc": '/static/img/display.png', textNum: 0}
        ],
        isShowPhoneModal: false,
        phoneNum: ''
    },
    onLoad: function (options) {
    },

    pageNavigate: function(event){
        // console.log(event.currentTarget.dataset.checknum)
        let index = event.currentTarget.dataset.checknum
        if(this.data.isUserLogin){
            // console.log(index)
            switch(index){
                case 0:
                    wx.navigateTo({
                        url: '/pages/mine/rankingList/rankingList',
                      })
                    break;
                case 1:
                    wx.navigateTo({
                        url: '/pages/mine/myComplaint/myComplaint',
                      })
                    break;
                case 2:
                    wx.navigateTo({
                        url: '/pages/mine/notification/notification',
                      })
                    break;
            }
        }else{
            Dialog.alert({
                message: '请先登录~~~'
              }).then(() => {
                //close
              })
        }
    },

    /* 刷新用户信息 */
    Refresh(){
        let that = this
        
        let userInfo = app.globalData.userInfo
        let isUserLogin = app.globalData.isUserLogin
        if (userInfo != null) {
            let levelMaxExp = that.GetLevelMaxExp(userInfo.exp)
            if (levelMaxExp == -1) {
                userInfo['expRatio'] = 100
                userInfo['expText'] = userInfo.exp
            } else{
                userInfo['expRatio'] = Math.floor(userInfo.exp / levelMaxExp * 100)
                userInfo['expText'] = userInfo.exp + '/' + levelMaxExp
            }
            userInfo['level'] = levelDict[levelMaxExp]
        }
        that.setData({ 
            userInfo: userInfo,
            isUserLogin: isUserLogin
        })

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {

    },
    onPullDownRefresh: function () {

    },
    EditPhone(){
        let that = this
        console.log(that.data.phoneNum)
        
    }
})

