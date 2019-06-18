// miniprogram/pages/myFavorites/myFavorities.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: []
  },
  skipToHome(){
    wx.redirectTo({
      url: '../home/home'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyFavorites()
    wx.showLoading({
      title: '',
    })
  },
  getMyFavorites(callback){
    wx.cloud.callFunction({
      name:'myFavorites'
    }).then(res=>{
      this.setData({
        movieList:res.result.data
      })
      wx.hideLoading()
      callback && callback()
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getMyFavorites(res=>{
      wx.stopPullDownRefresh()
    })
  }
})