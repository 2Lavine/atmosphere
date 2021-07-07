/**
 * 获取排名信息
 */
function GetRankList(userid){
  return new Promise(function(resolve,reject){
    wx.request({
      url: "http://49.235.115.35:18080/Front/ExpMark/" + userid,
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
      url: 'http://49.235.115.35:18080/Front/GetComplaints/' + userid,
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
 * 获取我的通知
 */


function GetMineNotification(userid){
  return new Promise(function(resolve, reject){
    wx.request({
      url: 'http://49.235.115.35:18080/Front/NoticesNum/' + userid,
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
  GetMineNotification
}
