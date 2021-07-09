import {baseURL, jsonHeaders} from '../config/requestConfig'

/* 尝试登录
  描述：1. 调用微信接口获取code
      2. 携带code调用后端接口，判断用户是否已经注册，若已注册则返回用户信息，若没有注册则仅返回openid */
function TryToLogin(){
  return new Promise(function(resolve,reject){
    wx.login({
      success(res){

        wx.request({
          url: baseURL + '/Login/' + res.code,
          method: 'POST',
          success (res) {
            resolve(res)
          },
          fail(){ reject() }
        })
      },
      fail(){ reject() }
    })
  })
}

/* 注册用户 */
function Register(openId, userInfo){
  return new Promise(function(resolve,reject){
    userInfo['userid'] = openId
    wx.request({
      url: baseURL + '/Login/Register',
      method: 'POST',
      header: jsonHeaders,
      data: userInfo,
      success(res){
        resolve(res)
      },
      fail(){ reject() }
    })
  })
}



module.exports = {
  TryToLogin,
  Register
}