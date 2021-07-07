const weatherApi = require('../../apis/weatherApi')
let aqiChartConfig = require('../../config/aqiChartConfig')
import * as echarts from '../../components/ec-canvas/echarts';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp()
let chart = null

const lifeIndicesDic = {
    '1': {name: '运动', src: '../../static/img/sport.png'},
    '5': {name: '紫外线', src: '../../static/img/umbrella.png'},
    '6': {name: '户外', src: '../../static/img/trip.png'},
    '10': {name: '污染扩散', src: '../../static/img/spread.png'}
}
const tagTypeDict = {
    1: 'success',
    2: 'success',
    3: 'warning',
    4: 'warning',
    5: 'danger',
    6: 'danger',
}

function initChart(canvas, width, height, dpr) {
    chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr,
    });
    canvas.setChart(chart)
    chart.setOption(aqiChartConfig.option)
    return chart
}

Page({
    data: {
        cityId: null,
        cityName: null,
        airNow: null,
        ec: {
            onInit: initChart
        },
        lifeIndices: {}, // 生活指数（1：运动指数；5：紫外线指数；6：旅游指数；空气污染扩散条件指数：10）
        
    },

    onLoad (options) {
        let that = this

        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        // 获取用户位置信息，用于查询天气信息与生活指数
        that.GetLocation().then( res => {
            console.log(res)
            weatherApi.GetCityId(res).then( res => {
                console.log(res)
                if (res.data.code == 200) {
                    let cityId = res.data.location[0].id
                    let cityName = res.data.location[0].adm2 + ' ' + res.data.location[0].name
                    
                    that.GetAirInfo(cityId)

                    that.setData({
                        cityId: cityId,
                        cityName: cityName
                    })
                    app.globalData.weatherInfo.cityId = cityId
                    app.globalData.weatherInfo.cityName = cityName

                    Toast.clear()
                } else {
                    Toast.clear()
                    wx.showToast({
                        title: '服务出错，请稍后重试',
                    })
                }
            })
        })
        
    },
    /* 根据城市id获取大气信息并储存 */
    GetAirInfo(cityId) {
        let that = this
        // 获取今日大气信息
        weatherApi.GetNowAirInfo(cityId).then(res => {
            if (res.data.code == 200) {
                let airNow = res.data.now
                let detail = []

                detail.push({name: 'PM10', value: airNow.pm10})
                detail.push({name: 'PM2.5', value: airNow.pm2p5})
                detail.push({name: 'NO2', value: airNow.no2})
                detail.push({name: 'SO2', value: airNow.so2})
                detail.push({name: 'CO', value: airNow.co})
                detail.push({name: 'O3', value: airNow.o3})

                airNow['detail'] = detail

                airNow.tagType = tagTypeDict[airNow.level]

                app.globalData.weatherInfo.airNow = airNow
                that.setData({
                    airNow: airNow
                })                
            } else {
                wx.showToast({
                    title: '服务出错，请稍后重试',
                })
            }
        })
        // 获取大气信息预报（5日）
        weatherApi.GetAfterAirInfo(cityId).then(res => {
            if (res.data.code == 200) {
                let tempArr = res.data.daily
                let dateArr = []
                let aqiArr = []
                tempArr.forEach(item => {
                    let date = item.fxDate.split('-')[1] + '/' +  item.fxDate.split('-')[2]
                    dateArr.push(date)
                    aqiArr.push(item.aqi)
                })
                chart.setOption({
                    xAxis: {
                        data: dateArr
                    },
                    series: [{
                        name: '空气指数',
                        data: aqiArr
                    }]
                })
                app.globalData.weatherInfo.airAfter = res.data.daily
                that.setData({
                    airAfter: res.data.daily
                })                
            } else {
                wx.showToast({
                    title: '服务出错，请稍后重试',
                })
            }
        })
        // 获取生活指数
        weatherApi.GetLifeIndices(cityId).then(res => {
            if (res.data.code == 200) {
                let tempArr = res.data.daily
                let resList = {}
                tempArr.forEach(item => {
                    resList[item.type] = item
                    resList[item.type]['iconSrc'] = lifeIndicesDic[item.type].src
                    resList[item.type]['name'] = lifeIndicesDic[item.type].name
                })
                app.globalData.weatherInfo.lifeIndices = resList
                that.setData({
                    lifeIndices: resList
                })                
            } else {
                wx.showToast({
                    title: '服务出错，请稍后重试',
                })
            }
        })
    },
    /* 获取用户位置信息 */
    GetLocation() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                withSubscriptions: true,
                success(res) {
                    app.globalData.authSetting = res.authSetting
                    if (!res.authSetting["scope.userLocation"]) {
                        wx.authorize({
                            scope: 'scope.userLocation',
                            success() {
                                wx.getLocation({
                                    success(res) {
                                        let location = res.longitude + ',' + res.latitude
                                        app.globalData.userLocation = location
                                        resolve(location)
                                    },
                                    fail() {
                                        reject()
                                        wx.showToast({
                                            title: '定位失败，请在设置中手动开启定位',
                                        })
                                    }
                                })
                            },
                            fail() {
                                reject()
                                wx.showToast({
                                    title: '定位失败，请在设置中手动开启定位',
                                })
                            }
                        })
                        
                    } else {
                        wx.getLocation({
                            success(res) {
                                let location = res.longitude + ',' + res.latitude
                                app.globalData.userLocation = location
                                resolve(location)
                            },
                            fail() {
                                reject()
                                wx.showToast({
                                    title: '定位失败，请在设置中手动开启定位',
                                })
                            }
                        })
                    }
                },
                fail() {
                    reject()
                    wx.showToast({
                        title: '定位失败，请在设置中手动开启定位',
                    })
                }
            })
          })
    },
    /* 生活指数点击事件 */
    LifeIndiceTap(e) {
        let that = this
        let type = e.currentTarget.dataset.type
        wx.showModal({
            showCancel: false,
            content: that.data.lifeIndices[type].text
        })

        // 弹窗组件会被chart覆盖

        /* Dialog.alert({
            zIndex: 1000000000,
            customStyle:'',
            closeOnClickOverlay: true,
            showConfirmButton: false,
            message: that.data.lifeIndices[type].text,
        }).then(() => {
        }); */
    },
    /* 分享按钮点击事件 */
    Share(){
        wx.showShareMenu({
            menus: ['shareAppMessage', 'shareTimeline']
        })
    }

})