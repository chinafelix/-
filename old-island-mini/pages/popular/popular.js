const request = require('../../utils/request')
Page({
  data: {
    isHome: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGetLastest()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onGetLastest(){
    request('/classic/latest').then(res => {
      console.log(res)
    })
  },

})