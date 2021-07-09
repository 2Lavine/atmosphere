const userLoginApi = require('../../apis/userLoginApi')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const mineApi = require('../../apis/mineApi')

const app = getApp()
const regex = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$"

const levelDict = {
    '200': '环保萌新',
    '500': '环保志士',
    '1000': '环保卫士',
    '2000': '环保督察官',
    '-1': '环保大使'
}

Page({
    data: {
        userInfo: null,
        isUserLogin: false,
        listItems: [
            {"title": '排行榜', "imgSrc": '/static/img/ranking.png', "isNotify": false},
            {"title": '我的投诉', "imgSrc": '/static/img/myComplaint.png', "isNotify": false},
            {"title": '通知', "imgSrc": '/static/img/notice.png', "isNotify": false},
            // {"title": '勋章墙', "imgSrc": '/static/img/display.png', textNum: 0}
        ],
        isShowPhoneModal: false,
        phoneNum: '',
        openId: null
    },
    onLoad: function (options) {
        let that = this
        that.Refresh()
        that.getMyNotification()
    },

    //获取我的通知的数量
    getMyNotification(){
        mineApi.GetMineNotification(this.data.openId).then(res => {
        //   console.log(res.data)
        if(res.data.number != 0){
            let listItems = this.data.listItems
            listItems[2].isNotify = true
            this.setData({
                listItems: listItems
            })
        }
        })
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
        let openId = app.globalData.openId
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
            isUserLogin: isUserLogin,
            openId: openId
        })

    },
    /* 计算用户当前等级最大的经验值 */
    GetLevelMaxExp(exp){
        let tempArr = Object.keys(levelDict)
        for (let i = 0; i < tempArr.length; i++) {
            if (exp <= tempArr[i]) {
                return tempArr[i]
            }
        }
        return -1
    },
    /* 用户登录按钮点击事件 */
    UserLogin(){
        let that = this
        wx.getUserProfile({
            desc: '我们需要获取您头像和昵称的权限',
            success(res) {
                let userInfo = {
                    avatar: res.userInfo.avatarUrl,
                    name: res.userInfo.nickName,
                    exp: 0,
                    phone: ''
                }
                that.setData({
                    userInfo: userInfo,
                    isUserLogin: true
                })
                app.globalData.userInfo = userInfo
                that.Refresh()
                
                let tempUserInfo = {
                    avatar: res.userInfo.avatarUrl,
                    name: res.userInfo.nickName
                }
                console.log(app.globalData.openId)
                userLoginApi.Register(app.globalData.openId, tempUserInfo).then(res => {
                    console.log(res)
                    wx.showToast({
                        title: '登陆成功',
                    })
                }, err => {
                    wx.showToast({
                      title: '登陆失败...',
                    })
                })
            },
            fail(err) { console.log(err) }
        })
    },
    /* 修改联系方式按钮点击事件 */
    ShowPhoneModal(){
        this.setData({ 
            isShowPhoneModal: true,
            phoneNum: ''
        })
    },
    PhoneInputChange(e){
        this.setData({phoneNum: e.detail})
    },
    EditPhone(){
        // let that = this
        // console.log(this.data.phoneNum)
        let phoneNum = this.data.phoneNum
        if(phoneNum.length == 0){
            Dialog.alert({
                message: '您输入的手机号为空'
            })
        }else{
            if(!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(phoneNum))){
                Dialog.alert({
                    message: '您输入的手机号格式错误'
                })
            }else{
                let userInfo = this.data.userInfo
                userInfo.phone = phoneNum
                this.setData({
                    userInfo: userInfo
                })
            }
        }
    }
})

