const key = '024c3d3ee5db4c8eb04c1b4796dd6efa'

/* 通过经纬度信息获取城市Id */
function GetCityId(location) {
    return new Promise(function(resolve,reject){
        wx.request({
            url: 'https://geoapi.qweather.com/v2/city/lookup?location=' + location + '&key=' + key,
            method: 'GET',
            success(res){
                resolve(res)
            },
            fail(err){
                console.log(err)
                reject("服务出错")
            }
        })
    })
}

/* 获取今日空气质量信息 */
function GetNowAirInfo(cityId) {
    return new Promise(function(resolve,reject){
        wx.request({
            url: 'https://devapi.qweather.com/v7/air/now?' + 'location=' + cityId + '&key=' + key,
            method:"GET",
            success(res){
                resolve(res)
            },
            fail(err){
                console.log(err)
                reject("服务出错")
            }
        })
    })
}

/* 获取空气质量信息预报 */
function GetAfterAirInfo(cityId) {
    return new Promise(function(resolve,reject){
        wx.request({
            url: 'https://devapi.qweather.com/v7/air/5d?' + 'location=' + cityId + '&key=' + key,
            method:"GET",
            success(res){
                resolve(res)
            },
            fail(err){
                console.log(err)
                reject("服务出错")
            }
        })
    })
}

/* 获取生活指数 */
function GetLifeIndices(cityId) {
    return new Promise(function(resolve,reject){
        wx.request({
            url: 'https://devapi.qweather.com/v7/indices/1d?' + 'location=' + cityId + '&key=' + key + '&type=1,5,6,10',
            method:"GET",
            success(res){
                resolve(res)
            },
            fail(err){
                console.log(err)
                reject("服务出错")
            }
        })    
    })
}




module.exports = {
    GetCityId,
    GetNowAirInfo,
    GetAfterAirInfo,
    GetLifeIndices
}