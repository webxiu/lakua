<script>
export default {
  onLaunch: function ({ query }) {
    console.log('App Launch'); 

    // api;
    let version = wx.getAccountInfoSync().miniProgram.envVersion; 
    console.log('当前环境: ' + version); 
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  },
  onLoad: function () {
    console.log('App onLoad ');
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
// @import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';

// 设置整个项目的背景色
page {
  // background-color: #f5f5f5;
  background-color: #fff;
}
</style>
