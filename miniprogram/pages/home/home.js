// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    recommendMovie:{}, // 推荐电影
    movieTitle:'',
    movieImg:''  
    },
    
  // 跳转热门电影
  skipToHot(){
    wx.navigateTo({
      url: '../hotMovie/hotMovie',
    })
  },
  // 跳转我的电影
  skipToMy() {
    wx.navigateTo({
      url: '../myFavorites/myFavorities',
    })
  },
  // 跳转影评详情
  skipToComment() {
    wx.navigateTo({
      url: '../commentDetail/commentDetail',
    })
  },
  //跳转电影详情
  skipToDetail(){
    wx.navigateTo({
      url: '../movieDetail/movieDetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'movieList',
      success: res => {
        let recommendMovie = JSON.parse(JSON.stringify(res.result.data[0]));
        this.setData({
          recommendMovie,
          movieTitle: recommendMovie.title,
          movieImg: recommendMovie.image
        })
      },
      fail:console.error
    })
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