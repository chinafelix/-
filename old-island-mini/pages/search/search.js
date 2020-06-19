// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [
      {id: 1, name: 'Python'},
      {id: 1, name: '灾厄纪元'},
      {id: 1, name: 'Javascript'},
      {id: 1, name: '雪中悍刀行'},
      {id: 1, name: 'NodeJS'},
      {id: 1, name: '全球进化'},
    ],
    hots: [
      {id: 1, name: 'Python'},
      {id: 1, name: '哈利波特'},
      {id: 1, name: '村上春树'},
      {id: 1, name: '雪中悍刀行'},
      {id: 1, name: '倚天屠龙i'},
      {id: 1, name: '全球进化'},
      {id: 1, name: '灾厄纪元'},
    ]
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

  },
  handleCancel(){
    wx.navigateBack()
  }
})