Component({

  data: {

    startdate: '开始日期', //默认起始时间  
    enddate: '结束日期', //默认结束时间 

  },


  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      startdate: e.detail.value,
    })
  },
  bindDateChange2(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      enddate: e.detail.value,
    })
  },

})