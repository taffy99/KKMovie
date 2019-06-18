// miniprogram/pages/previewComment/previewComment.js
const db = wx.cloud.database();
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
  backToComment() {
    wx.navigateBack()
  },
  saveToComment() {
    db.collection('movieComments').add({
      data: {
        name: this.data.name,
        title: this.data.title,
        headshort: this.data.headshort,
        content: this.data.content,
        image:this.data.image
      },
      success:(res)=>{
        console.log(res)
      },
      fail:console.error
    }) 
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
      success: function (res) {
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