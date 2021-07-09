// miniprogram/pages/mine/rankingList/rankingList.js
const mineApi = require('../../../apis/mineApi')
const reward = require('../../../utils/reward')
const app = getApp()

Page({
    data: {
        scroll_y: null,
        // userexp: null,
        userorder: null,
        exps: null,
        userInfo: null
    },
    onLoad: function (options) {
        this.getMineInfo()
        this.getExpsRank()
        this.setScrollHeght()
    },
    getMineInfo:function(){
        console.log(app.globalData.userInfo)
        let res= app.globalData.userInfo
        let userinfo = {}
        userinfo.avatar = res.avatar
        userinfo.name = res.name
        userinfo.title = reward.setReward(res.exp)[0]
        userinfo.pencent = reward.setReward(res.exp)[1]
        userinfo.flag = reward.setReward(res.exp)[2]
        this.setData({
            userInfo: userinfo
        })
    },

    getExpsRank: function(){
        mineApi.GetRankList(app.globalData.openId).then(res => {
            console.log(res.data)
            let expData = res.data
            let exps = []
            let userorder = expData.userorder
            // console.log(reward.setReward(5000))
            for(let  i = 0; i < expData.exps.length; i++){
                let index = reward.setReward(expData.exps[i].exp)
                exps[i] = expData.exps[i]
                exps[i].title = index[0]
                exps[i].pencent = index[1]
                exps[i].flag = index[2]
            }
            if(expData.userorder == -1){
                userorder = "100+"
            }
            this.setData({
                // userexp: expData.userexp,
                userorder: userorder,
                exps: exps
            })
        })
    },
    setScrollHeght: function(){
        let windowHeight = wx.getSystemInfoSync().windowHeight
        let windowWidth = wx.getSystemInfoSync().windowWidth
        this.setData({
          scroll_y: windowHeight * 750 / windowWidth - 225
        })
    },
})