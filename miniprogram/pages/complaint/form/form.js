// miniprogram/pages/complaint/form/form.js
import {
    createNewComplaint
} from '../../../apis/complaintApi'
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
let pic64 = ''
let map = new Map();
map.set('餐厅直排油烟', {
    quickCategoryText: '餐厅直排油烟',
    categoryText: '居民生活',
    categoryNumber: '3',
    complaintDescription: "餐厅直接排放了油烟"
})
map.set('柴油车排放黑烟', {
    quickCategoryText: '柴油车排放黑烟',
    categoryText: '交通运输',
    categoryNumber: '1',
    complaintDescription: "柴油车直接排放了油烟"
})
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        loadingshow: false,
        columns: ['工业生产', '交通运输', '农业活动', '居民生活', '其他'],
        quickColumns: ['柴油车排放黑烟', '餐厅直排油烟', '工地排放烟尘', '居民燃放烟花爆竹'],
        index: 1,
        categoryText: "点击选择",
        quickCategoryText: "点击选择",
        message: "",
        complaintType: '普通选择',
        checked: false,
        mapMessage: '点击选择地图',
        complaintPlaceHolderDescription: '简单描述一下',
        tempFilePaths: '',
        categoryNumber: -1,
        sharePopUpShow: true,
        showShare: false,
        options: [{
                name: '微信',
                icon: 'wechat',
                openType: 'share'
            },
            {
                name: '二维码',
                icon: 'qrcode'
            },
            {
                name: '复制链接',
                icon: 'link'
            },
            {
                name: '分享海报',
                icon: 'poster'
            },
        ],
    },
    onSelect(event) {
        const {
            name
        } = event.detail
        console.log(event);
        if (name === '二维码') {
            this.setData({
                QRCodeShow: true
            })
        }
        this.setData({
            showShare: false
        });
    },
    onComplaintTypeChange() {
        this.setData({
            checked: !this.data.checked,
            complaintType: !this.data.checked ? '快速选择' : '普通选择'
        })
    },
    onChange(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        let dataObj = {};
        dataObj.categoryText = value
        dataObj.categoryNumber = index
        if (value === '交通运输') {
            dataObj.complaintPlaceHolderDescription = "若有车牌号，请标注"
        }
        this.setData(dataObj)
    },
    onQuickSelectChange(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        let dataObj = map.get(value);
        this.setData(dataObj)
    },
    showPopup() {
        this.setData({
            show: true
        });
    },
    showQuickTypePopup() {
        this.setData({
            quickTypeShow: true
        });
    },
    getLocationName() {
        wx.chooseLocation({
            success: ({
                name
            }) => {
                this.setData({
                    mapMessage: name || '选择失败请重试'
                })
            }
        })
    },
    onClose() {
        this.setData({
            show: false
        });
    },
    onQuickTypeClose() {
        this.setData({
            quickTypeShow: false
        });
    },
    getPhoto() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success: (res) => {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths[0]
                wx.getFileSystemManager().readFile({
                    filePath: tempFilePaths,
                    encoding: 'base64',
                    success: (res) => {
                        console.log(res)
                        pic64 = res.data;
                        this.setData({
                            tempFilePaths
                        })
                    }
                });
            }
        })
    },
    submit() {
        let {
            categoryNumber,
            unit,
            mapMessage,
            complaintDescription,
        } = this.data;
        let formObj = {
            type: +categoryNumber,
            object: unit,
            position: mapMessage,
            description: complaintDescription,
            userId: app.globalData.openId,
            image: pic64
        };
        this.setData({
            loadingshow: true
        })
        if (categoryNumber < 0 || !mapMessage.length > 0 || !complaintDescription.length > 0 || pic64.length == 0) {
            Dialog.alert({
                message: '有信息尚未填完',
            })
        } else {
            createNewComplaint(formObj).then(res => {
                console.log(res);
                this.setData({
                    loadingshow: false
                })
                if (res.data.status === 'success') {
                    Dialog.confirm({
                            title: '提交成功',
                            message: '点击和小伙伴分享哦',
                            confirmButtonText: '分享',
                        })
                        .then(() => {
                            this.setData({
                                showShare: true
                            });
                        })
                        .catch(() => {
                            // on cancel
                        });
                }
            });
        }
    },
    onShareShowClose() {
        this.setData({
            showShare: false
        });
    },
    onQRCodeClose() {
        this.setData({
            QRCodeShow: false
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    onShareAppMessage: function (event) {
        return {}
    },
    onLoadingClickHide() {
        this.setData({
            show: false
        });
    },
})