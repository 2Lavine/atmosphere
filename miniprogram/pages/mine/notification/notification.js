// miniprogram/pages/mine/notification/notification.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const mineApi = require('../../../apis/mineApi')
    
Page({
    data: {
        noticeList: [
          {
            'title': '投诉反馈',
            'time': '2020-01-01',
            'content': '你的投诉已完成'
          },
          {
            'title': '投诉反馈',
            'time': '2020-01-02',
            'content': '你的投诉已受理'
          },
          {
            'title': '投诉反馈',
            'time': '2020-01-03',
            'content': '你的投诉已成功提交'
          },
          {
            'title': '投诉反馈',
            'time': '2020-01-04',
            'content': '你的投诉已完成'
          },
        ]
    },
    onLoad: function (options) {
      this.getMyNotification()
    },

    getMyNotification(){
      mineApi.GetMineNotification('100023').then(res => {
        console.log(res.data)
      })
    },

    onClose(event){
      const { position, instance } = event.detail;
      const index = event.currentTarget.dataset.index
      switch (position) {
        case 'cell':
          instance.close();
          break;
        case 'right':
          let noticeList = this.data.noticeList
          noticeList.splice(index, 1)
          this.setData({
            noticeList: noticeList
          })
          instance.close()
          break;
      }
    },

    showMessage(event){
      // console.log(event.currentTarget.dataset.index)
      const index = event.currentTarget.dataset.index
      let noticeList = this.data.noticeList
      Dialog.alert({
        title: noticeList[index].title,
        message: noticeList[index].content
      }).then(() => {
        //close
      })
    },
})