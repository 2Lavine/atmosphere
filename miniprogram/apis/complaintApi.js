/**
 * 当月投诉统计
 */
function getMonthData() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: "https://napoleonxzy.cn/Front/DataCount",
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

function getMonthHotComplaint() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://napoleonxzy.cn/Front/PopComplaints',
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
      url: 'https://napoleonxzy.cn/Front/NoticesNum/' + userid,
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
      url: 'https://napoleonxzy.cn/Front/NewComplaint',
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
 * 获得某个投诉的所有评论
 */


function getAllComments(complaintId) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://napoleonxzy.cn/Front/Comment/?complaintId=' + complaintId,
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


function createNewComment(commentData) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://napoleonxzy.cn/Front/Comment/1',
      data: {
        ...commentData
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
      url: 'https://napoleonxzy.cn/Front/NoticesNum/',
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
 * 关注评论
 */

function followComplaint(follow, complaintId, userid) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://napoleonxzy.cn/Front/Star/' + follow,
      method: 'POST',
      data: {
        id: +complaintId,
        userid,
      },
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
      url: 'https://napoleonxzy.cn/Front/ComplaintContent/' + complaintId,
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
  getMonthHotComplaint,
  getSearchResult,
  createNewComplaint,
  createNewComment,
  deleteComplaint,
  getComplaintDetail,
  followComplaint
}