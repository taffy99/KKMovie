// miniprogram/pages/editComment/editComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {
      image: 'https://7468-thinking-bcedc9-1257745530.tcb.qcloud.la/p2517753454.jpg?sign=62e0d38d24597b557a04b400ba4e7cea&t=1559121186',
      title: '复仇者联盟3：无限战争',
      headshort: '../../images/juide.jpg',
      name: '小变态',
      content: '我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评我是文字影评'
    }
  },
  skipToPreview(){
    wx.navigateTo({
      url: '../previewComment/previewComment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})