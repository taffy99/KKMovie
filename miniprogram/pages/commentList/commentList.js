// miniprogram/pages/commentList/commentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentlist:[]
  },
  skipToHome(){
    wx.redirectTo({
      url: '../home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCommentList()
  },
  getCommentList(callback){
    wx.cloud.callFunction({
      name:'movieComments'
    }).then(res=>{
      this.setData({
        commentlist:res.result.data
      })
      callback && callback()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getCommentList(res=>{
      wx.stopPullDownRefresh()
    })
  }
})