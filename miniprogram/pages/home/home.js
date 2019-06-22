// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    recommendMovie:{}, // 推荐电影
    movieTitle:'',
    movieImg:'' ,
    headshort:'',
    name:''
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
    let commentId  = this.data.recommendMovie._id
    wx.navigateTo({
      url: '../commentDetail/commentDetail?commentId=' + commentId,
    })
  },
  //跳转电影详情
  skipToDetail(){
    let movieId = this.data.recommendMovie.movieId
    wx.navigateTo({
      url: '../movieDetail/movieDetail?movieId=' + movieId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'movieComments',
      success: res => {
        let recommendMovie = this.getRandomMovie(res.result.data);
        this.setData({
          recommendMovie,
          movieTitle: recommendMovie.title,
          movieImg: recommendMovie.image,
          headshort: recommendMovie.headshort,
          name: recommendMovie.name
        })
      },
      fail:console.errorerror
    })
  },
  //获取随机电影
  getRandomMovie(movieComments){
    let movie = movieComments[Math.floor(Math.random() * movieComments.length)]
    return movie
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

  }
})