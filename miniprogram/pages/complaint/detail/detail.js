// miniprogram/pages/complaint/detail/detail.js
import {
    getComplaintDetail,
    createNewComment,
    getAllComments,
    deleteComplaint
} from '../../../apis/complaintApi'
import {baseURL} from '../../../config/requestConfig'

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        steps: [{
                text: '步骤一',
                desc: '已提交',
            },
            {
                text: '步骤二',
                desc: '已受理',
            },
            {
                text: '步骤三',
                desc: '处理中',
            },
            {
                text: '步骤四',
                desc: '整改完成',
            },
        ],
        activeStep: 1,
        likeName: 'like-o',
        collectName: 'delete-o',
        likeNumber: '20',
        commentlikeNumber: '20',
        imageURL: '../../../../../../../../../pages/complaint/pic.webp',
        categoryText: '类别',
        mapMessage: "地址是",
        tempFilePaths: '../../../../../../../../../pages/complaint/pic.webp',
        complaintDescription: "车牌号为",
        unit: "2132",
        otherMessage: '其他的话',
        comment: '',
        comments: [{
            title: '123',
            avatar: '../../../../pages/complaint/pic.webp',
            desc: '1231231',
            likeNumber: 20
        }, {
            title: '123',
            avatar: '../../../../pages/complaint/pic.webp',
            desc: '3231312',
            likeNumber: 20
        }],
    },
    likeHandler() {
        // this.updateBackEnd
        if (this.data.likeName === 'like-o')
            this.setData({
                likeNumber: +this.data.likeNumber + 1,
                likeName: 'like'
            })
        else {
            this.setData({
                likeNumber: +this.data.likeNumber - 1,
                likeName: 'like-o'
            })
        }
    },
    collectHandler() {
        // this.updateBackEnd
        if (this.data.collectName === 'delete-o')
            this.setData({
                collectName: 'delete'
            })
        else {
            this.setData({
                collectName: 'delete-o'
            })
        }
    },
    commentHandler(event) {
        let {
            comment
        } = this.data
        comments.unshift(comment)
        createNewComment()
        this.setData({
            comments
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let {
            complaintId
        } = options
        getComplaintDetail(+complaintId).then(res => {
            console.log(res);
            let {
                description,
                image,
                object,
                position,
                reason,
                remark,
                state,
                type,
                userid
            } = res.data
            this.setData({
                categoryText: app.globalData.pollutionType[type],
                mapMessage: position,
                tempFilePaths: baseURL+image+'',
                complaintDescription: description,
                unit: object,
                otherMessage: remark,
                ownId: userid,
                activeStep: state,
                // likeNumber,
            })
        });
        // getAllComments(+complaintId).then(res => {})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})