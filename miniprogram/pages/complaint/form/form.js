// miniprogram/pages/complaint/form/form.js

let map = new Map();
map.set('餐厅直排油烟', {
    quickCategoryText: '餐厅直排油烟',
    categoryText: '大气污染',
    categoryNumber: '0',
    complaintDescription: "餐厅直接排放了油烟"
})
map.set('柴油车排放黑烟', {
    quickCategoryText: '柴油车排放黑烟',
    categoryText: '大气污染',
    categoryNumber: '0',
    complaintDescription: "柴油车直接排放了油烟"
})
Page({
    /**
     * 页面的初始数据
     */
    data: {
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
                QRCodeShow:true
            })
        }
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
                this.setData({
                    tempFilePaths
                })
            }
        })
    },
    submit() {
        wx.request({
            url: `/Front/NewComplaint/`,
            // url: `/Front/NewComplaint/${userId}`,
            data: {
                type: this.data.categoryNumber,
                img: this.data.tempFilePaths,
                position: this.data.mapMessage,
                description: this.data.complaintPlaceHolderDescription,
                object: this.data.unit
            },
            complete: (res) => {
                this.setData({
                    showShare: true
                });
            }
        })
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
})