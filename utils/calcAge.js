export function calcAge(birthday){
  if(birthday){
    var str = birthday
    birthday=birthday.split('-');
    // 新建日期对象
    let date = new Date()
    // 今天日期，数组，同 birthday
    let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    // 分别计算年月日差值
    let age = today.map((val, index) => {
        return val - birthday[index]
    })
    // 当天数为负数时，月减 1，天数加本月总天数
    if (age[2] < 0) {
        // 获取当月总天数的方法
        let curMonth = new Date(today[0], today[1], 0)
        age[1]--
        age[2] += curMonth.getDate()
    }
    // 当月数为负数时，年减 1，月数加上 12
    if (age[1] < 0) {
        age[0]--
        age[1] += 12
    }
    return age[0]
  }
}
