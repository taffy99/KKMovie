// miniprogram/pages/previewComment/previewComment.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  image: '',
  title: '',
  headshort: '',
  name: '',
  content: ''
  },
  backToComment(){
    wx.navigateBack()
  },
  saveToComment(){
    wx.navigateTo({
      url: '../commentList/commentList',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let movieDetail = wx.getStorageSync('movieDetail')
    wx.getUserInfo({
      success: function(res) {
        console.log(res.userInfo)
        that.setData({
          headshort: res.userInfo.avatarUrl,
          name: res.userInfo.nickName,
          content: options.content,
          image: movieDetail.image,
          title: movieDetail.title
        })
      }
    })
  }
})