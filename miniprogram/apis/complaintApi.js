/**
 * 当月投诉统计
 */
function getMonthData() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: "http://49.235.115.35:18080/Front/DataCount",
      method: 'GET',
      success(res) {
        resolve(res)
      },
      fail() {
        reject("服务错误")
      }
    })
  })
}

/**
 * 获取当月热门评论
 */

function getMonthHotComment() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://49.235.115.35:18080/Front/PopComplaints' ,
      method: 'GET',
      success(res) {
        resolve(res)
      },
      fail() {
        reject("服务错误")
      }
    })
  })
}

/**
 * 获取搜索结果
 */


function getSearchResult(keyword) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://49.235.115.35:18080/Front/NoticesNum/' + userid,
      method: 'GET',
      success(res) {
        resolve(res)
      },
      fail() {
        reject("服务错误")
      }
    })
  })
}

/**
 * 新建一个投诉
 */


function createNewComplaint(formData) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://49.235.115.35:18080/Front/NewComplaint',
      data: {
        ...formData
      },
      method: 'POST',
      success(res) {
        resolve(res)
      },
      fail() {
        reject("服务错误")
      }
    })
  })
}

/**
 * 删除一个投诉
 */


function deleteComplaint(complaintId) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://49.235.115.35:18080/Front/NoticesNum/',
      method: 'GET',
      success(res) {
        resolve(res)
      },
      fail() {
        reject("服务错误")
      }
    })
  })
}

/**
 * 获得投诉的详情
 */

function getComplaintDetail(complaintId) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://49.235.115.35:18080/Front/NoticesNum/',
      method: 'GET',
      success(res) {
        resolve(res)
      },
      fail() {
        reject("服务错误")
      }
    })
  })
}

export {
  getMonthData,
  getMonthHotComment,
  getSearchResult,
  createNewComplaint,
  deleteComplaint,
  getComplaintDetail
}