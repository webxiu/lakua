import Request from '@/utils/request'

let request = new Request().http

export default {
  // 获取组织机构列表
  getOrgList: function(data) {
    return request({
      url: "/api/sys/config/org/getorglisttoqrcode",
      method: "GET",
      data,
    })
  },
  // 下载图片
  downLoadImg: function(data) {
    return request({
      url: "/api/sys/config/org/down",
      method: "GET",
      data,
    })
  },
  // 获取劳务公司
  getLabors: function(data) {
    return request({
      url: "/api/sys/sys/optionlist/selectoptionlistbycodebyorgId",
      method: "POST",
      data,
      header: {
        'content-type': "application/json",
      }
    })
  },
  // 获取学历枚举值
  getEducationEnum: function(data) {
    return request({
      url: "/api/sys/sys/optioninfo/getOptionInfoList",
      method: "GET",
      params: data,
      header: {
        'content-type': "application/json",
      }
    })
  },
  //获取openid
  getOpenId: function(data) {
    return request({
      url: '/api/app/wxapp/getopenid',
      method: "GET",
      data
    })
  },
  //识别身份证信息
  getIdCardInfo: function(data) {
    return request({
      url: '/api/app/wxapp/uploadFile',
      method: "POST",
      data
    })
  },
  // 提交入职登记
  submitSignAction: function(data) {
    return request({
      header: {
        'Content-Type': 'application/json'
      },
      url: '/api/app/qywx/workspace/inductioncheckin/insert',
      method: 'POST',
      // dataType: 'json',
      data,
    })
  }
}