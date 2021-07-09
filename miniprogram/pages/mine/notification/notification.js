// miniprogram/pages/mine/notification/notification.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const mineApi = require('../../../apis/mineApi')
    
Page({
    data: {
        noticeList: [],
        ifOpen: false,
        showDialog: false,
        message: null,
        messageFlag: null
    },
    onShow: function (options) {
      this.getMyNotificationContent()
      this.setData({
        showDialog: false,
        messageFlag: null,
        message: null,
      })
    },

    goToComplaint(){
      wx.navigateTo({
        url: '/pages/complaint/detail/detail?complaintId=' + this.data.noticeList[this.data.messageFlag].id,
      })
    },

    getMyNotificationContent(){
      // mineApi.GetMineNotification('100023').then(res => {
      //   console.log(res.data)
      // })
      mineApi.GetNotificationContent('ofMdQ5DGjTa7Qb2yZCecP5duEQzs').then(res => {
        console.log(res.data)
        let noticeList = res.data
        for(let i = 0 ; i< noticeList.length; i++){
          noticeList[i].time = noticeList[i].time.substring(0, 10)
        }
        this.setData({
          noticeList: noticeList
        })
      })
    },

    onClose(event){
      const { position, instance } = event.detail;
      const index = event.currentTarget.dataset.index
      switch (position) {
        case 'cell':
          this.setData({
            ifOpen: !this.data.ifOpen
          })
          instance.close();
          break;
        case 'right':
          let noticeList = this.data.noticeList
          noticeList.splice(index, 1)
          this.setData({
            noticeList: noticeList,
            ifOpen: !this.data.ifOpen
          })
          instance.close()
          break;
      }
    },

    onOpen(){
      console.log("this")
      if(this.data.ifOpen == false){
        this.setData({
          ifOpen: !this.data.ifOpen
        })
      }
    },

    showMessage(event){ 
      // console.log(event.currentTarget.dataset.index)
      const index = event.currentTarget.dataset.index
      let noticeList = this.data.noticeList
      if(this.data.ifOpen == false){
        // Dialog.alert({
        //   title: noticeList[index].title,
        //   message: noticeList[index].content
        // }).then(() => {
        //   //close
        // })
        this.setData({
          showDialog: true,
          message: noticeList[index].content,
          messageFlag: index
        })
      }
    },

    dialogConfirm(){
      this.setData({
        showDialog: false,
        message: null,
        messageFlag: null
      })
    }
})