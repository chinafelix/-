// pages/attention/attention.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        id: 1,
        title: '人生不能像做菜，把所有的材料都准备好才下锅',
        path: '../../imgs/4.jpg',
        likeNum: 299,
        type: '电影'
      },
      {
        id: 2,
        title: '心上无垢，林间有风',
        path: '../../imgs/1.jpg',
        likeNum: 144,
        type: '句子'
      },
      {
        id: 3,
        title: '捉妖记啊恢复服务',
        path: '../../imgs/2.jpg',
        likeNum: 299,
        type: '电影'
      },
      {
        id: 4,
        title: '天将降大任于斯人也',
        path: '../../imgs/3.jpg',
        likeNum: 999,
        type: '音乐'
      },
      {
        id: 5,
        title: '问女何所思，问女何所忆',
        path: '../../imgs/5.png',
        likeNum: 9999,
        type: '诗句'
      },
      {
        id: 6,
        title: '人生得意须经欢',
        path: '../../imgs/6.jpg',
        likeNum: 1287,
        type: '诗句'
      },
      {
        id: 7,
        title: '天生我材必有用',
        path: '../../imgs/7.jpg',
        likeNum: 299,
        type: '电影'
      },
      
    ]
  },

  handleTabItem(){
    wx.navigateTo({
      url: '/pages/attentionDetail/attentionDetail',
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