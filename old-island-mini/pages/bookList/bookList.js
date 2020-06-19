// pages/bookList/bookList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {id: 288, url: '../../imgs/1.jpg'},
      {id: 32, url: '../../imgs/2.jpg'},
      {id: 145, url: '../../imgs/3.jpg'},
      {id: 1323, url: '../../imgs/4.jpg'},
      {id: 502, url: '../../imgs/5.png'},
      {id: 234, url: '../../imgs/6.jpg'},
      {id: 60, url: '../../imgs/7.jpg'},
    ]
  },

  handleSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  handleDetail(){
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})