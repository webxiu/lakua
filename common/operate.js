export default {
  //接口
  api: function() {
    let version = wx.getAccountInfoSync().miniProgram.envVersion;
    console.log(version, 'version')
    switch (version) {
      case "develop": //开发预览版
        return "https://dev.hailen.com"
        // return "http://192.168.2.26:7799"
        break;
      case 'test': //体验版
        return "https://test.hailen.com"
        break;
      case 'release': //正式版
        return "https://www.hailen.com"
        break;
      default: //未知,默认调用测试版
        return "https://debugger.hailen.com"
        break;
    }
  },
}