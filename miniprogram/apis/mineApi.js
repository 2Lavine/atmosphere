import {baseURL} from '../config/requestConfig'

/**
 * 获取排名信息
 */
function GetRankList(userid){
  return new Promise(function(resolve,reject){
    wx.request({
      url: baseURL + "/Front/ExpMark/" + userid,
      method:'GET',
      success(res){
        resolve(res)
      },fail(){
        reject("服务错误")
      }
    })
  })
}

/**
 * 获取我的投诉
 */

function GetMineComplaint(userid){
  return new Promise(function(resolve, reject){
    wx.request({
      url: baseURL + '/Front/GetComplaints/' + userid,
      method: 'GET',
      success(res){
        resolve(res)
      },fail(){
        reject("服务错误")
      }
    })
  })
}

/**
 * 获取我的通知数量
 */


function GetMineNotification(userid){
  return new Promise(function(resolve, reject){
    wx.request({
      url: baseURL + '/Front/NoticesNum/' + userid,
      method: 'GET',
      success(res){
        resolve(res)
      },fail(){
        reject("服务错误")
      }
    })
  })
}

/**
 * 获取我的通知内容
 */
function GetNotificationContent(userid){
  return new Promise(function(resolve, reject){
    wx.request({
      url: baseURL + '/Front/NoitcesContent/' + userid,
      method: 'GET',
      success(res){
        resolve(res)
      },fail(){
        reject("服务错误")
      }
    })
  })
}

module.exports = {
  GetRankList,
  GetMineComplaint,
  GetMineNotification,
  GetNotificationContent
}

