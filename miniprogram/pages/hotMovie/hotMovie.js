// miniprogram/pages/hotMovie/hotMovie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getMovieList()
      wx.showLoading({
        title: '',
      })
  },
  getMovieList(callback){
    wx.cloud.callFunction({
      name: 'movieList',
      success: res => {
        let movieList = JSON.parse(JSON.stringify(res.result.data));
        this.setData({
          movieList
        })
        wx.hideLoading()
      },
      complete:res =>{
        callback&&callback()
        wx.hideLoading()
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getMovieList(res=>{
      wx.stopPullDownRefresh()
    })
  }
})