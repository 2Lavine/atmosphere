const FormatDate = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(FormatNumber).join('')
}

const FormatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/* 获取往日的具体日期 num：前几天，返回数组 */
function GetPreDate(num) {
    let curDate = new Date()
    let delta = 24 * 60 * 60 * 1000
    let resArr = []
    for (let i = 1; i <= num; i++) {
        let preDate = new Date(curDate.getTime() - i * delta)
        resArr.push(FormatDate(preDate))
    }
    return resArr
}


module.exports = {
    FormatDate: FormatDate,
    GetPreDate: GetPreDate
}
  