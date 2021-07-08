var app = getApp()
const rewardTitle = app.globalData.rewardTitle
module.exports = {
  setReward (exp){
    let title = null
    let pencent = null
    let flag = null
    if(exp <= 200){
      title = rewardTitle[0]
      pencent = parseInt(exp*100/200)
      flag = exp + '/' +'200'
    }else if(200 < exp && exp <= 500){
      title = rewardTitle[1]
      pencent = parseInt((exp-200)*100/500)
      flag = (exp - 200) + '/' +'500'
    }else if(500 < exp && exp <= 1000){
      title = rewardTitle[3]
      pencent = parseInt((exp-500)*100/1000)
      flag = (exp - 500) + '/' +'1000'
    }else if(1000 < exp && exp <= 2000){
      title = rewardTitle[4]
      pencent = parseInt((exp-1000)*100/2000)
      flag = (exp - 1000) + '/' +'2000'
    }else{
      title = rewardTitle[0]
      pencent = 100
      flag = '2000+'
    }
    // switch (exp) {
    //   case exp <= 200:
    //     index = 0
    //     break;
    //   case 200 < exp && exp <= 500:
    //     index = 1
    //     break;
    //   case 500 < exp && exp <= 1000:
    //     index = 2
    //     console.log("yes")
    //     break;
    //   case 1000 < exp && exp <= 2000:
    //     index = 3
    //     break;
    //   case exp > 2000:
    //     index = 4
    //     break;
    // }
    return [title, pencent, flag]
  }
}