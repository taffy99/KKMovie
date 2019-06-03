// miniprogram/pages/commentDetail/commentDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {
      image: 'https://7468-thinking-bcedc9-1257745530.tcb.qcloud.la/p2517753454.jpg?sign=62e0d38d24597b557a04b400ba4e7cea&t=1559121186',
      title:'复仇者联盟3：无限战争',
      headshort: '../../images/juide.jpg',
      name: '小变态',
      content: '我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评'
    },
    actionSheetHidden: true,
    actionSheetItems: ['文字', '音频']
  },
  // 底部弹出框
  actionSheetTap() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
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