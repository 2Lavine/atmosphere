// miniprogram/pages/mine/rankingList/rankingList.js
const mineApi = require('../../../apis/mineApi')
const reward = require('../../../utils/reward')

Page({
    data: {
        scroll_y: null,
        userexp: null,
        userorder: null,
        exps: null,
        rewardTittle: []
    },
    onLoad: function (options) {
        this.setScrollHeght()
        this.getExpsRank()
    },
    getExpsRank: function(){
        mineApi.GetRankList('100023').then(res => {
            console.log(res.data)
            let expData = res.data
            let exps = []
            // console.log(reward.setReward(5000))
            for(let  i = 0; i < expData.exps.length; i++){
                let index = reward.setReward(expData.exps[i].exp)
                exps[i] = expData.exps[i]
                exps[i].title = index[0]
                exps[i].pencent = index[1]
            }
            this.setData({
                userexp: expData.userexp,
                userorder: expData.userorder,
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