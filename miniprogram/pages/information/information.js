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
        bgSrc: '',
        cityId: null,
        cityName: null,
        airNow: null,
        ec: {
            onInit: initChart
        },
        lifeIndices: {}, // 生活指数（1：运动指数；5：紫外线指数；6：旅游指数；空气污染扩散条件指数：10）
        isShowUpdateTime: false,
        activeName: 0,
        newsArr: [
            {
                title: '9日至10日强降雨来袭',
                content: '7月4日以来，我国主雨带位于四川盆地至沿淮地区，四川、重庆、湖北、河南、江苏、安徽等地持续出现较强降雨，目前淮河流域降雨已减弱。预计9日至10日，将有新一轮降雨过程开始发展，四川、甘肃、陕西、青海等地将有强降雨，这次的降雨具有一定极端性，部分地区发生山洪、地质灾害的气象风险高，需加强灾害防御工作。11日至12日，强降雨区会东移北抬。'
            },
            {
                title: '二十四节气之小暑：伏日来临 暑热袭人',
                content: '小暑，二十四节气的第十一个节气，太阳到达黄经105°时为小暑。《月令七十二候集解》中记载：“六月节……暑，热也，就热之中分为大小，月初为小，月中为大，今则热气犹小也。”暑，是炎热的意思，小暑为小热，此时天气开始炎热，却没有达到极致。小暑的标志是出梅，入伏，到7月22日或23日结束。此时正值初伏前后。小暑期间，全国大部分地区进入盛夏。'
            },
            {
                title: '中国气象局部署盛夏期间气象防灾减灾工作',
                content: '7月8日，在全国天气会商后，中国气象局召开视频会议，结合当前汛期形势和盛夏气候预测情况，对气象服务工作进行再部署、再强化、再落实。今年以来，天气气候特征异常，预测显示盛夏期间旱涝灾害较重，防灾减灾形势日趋严峻。会前，中国气象局党组书记、局长庄国泰，党组成员、副局长余勇对盛夏期间气象服务工作进行了部署、提出明确要求，总工程师黎健在会上作工作安排。'
            },
            
        ],
        showShare: false,
        options: [
            {
                name: '微信',
                icon: 'wechat',
                openType: 'share'
            },
            {
                name: '二维码',
                icon: 'qrcode'
            }
        ],
    },

    onLoad (options) {
        let that = this

        // 根据时间显示背景图
        let hours = new Date().getHours()
        if (hours >= 6 && hours <=18)
            that.setData({bgSrc: '../../static/img/bg_daytime.png'})
        else 
            that.setData({bgSrc: '../../static/img/bg_night.png'})

        // 获取用户位置信息
        that.GetLocation().then( res => {
            that.Refresh(res)
        })
    },
    /* 根据经纬度信息获取城市Id，并调用GetAirInfo查询大气信息 */
    Refresh(location){
        let that = this
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        weatherApi.GetCityId(location).then( res => {
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
                airNow.updateTime = airNow.pubTime.split('T')[0]
                
                app.globalData.weatherInfo.airNow = airNow
                that.setData({
                    airNow: airNow,
                    isShowUpdateTime: true
                })     

                setTimeout(()=> {
                    that.setData({ isShowUpdateTime: false })   
                }, 3000)           
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
    },
    /* 手动选择位置 */
    SelectLocation() {
        let that = this
        wx.chooseLocation({
            success: res => {
                let location = res.longitude + ',' + res.latitude
                that.Refresh(location)
            }
        })
    },
    /* 分享按钮点击事件 */
    ShowSharePanel(){
        this.setData({
            showShare: true
        });
    },
    ShareSelected(){
        this.setData({
            showShare: false
        });
    },
    onShareShowClose() {
        this.setData({
            showShare: false
        });
    },
    onShareAppMessage: function (res) {
        return {
            title: '守护大气 可以在微信小程序中使用啦！',
            path: '/pages/information/information',
            success: function () {},
            fail: function () {}
        }
    },
    /* 切换折叠面板展开项 */
    CollapseChange(e){
        this.setData({
            activeName: e.detail,
        })
    }

})