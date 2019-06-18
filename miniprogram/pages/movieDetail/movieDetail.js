// miniprogram/pages/movieDetail/movieDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    actionSheetHidden:true,
    actionSheetItems:['文字','音频']
  }, 
  // 底部弹出框
  actionSheetTap(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },
  actionSheetChange(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bind(){
    wx.navigateTo({
      url: '../editComment/editComment',
    })
  },
  // 跳转影评列表页
  skipToComment(){
    wx.navigateTo({
      url: '../commentList/commentList',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '',
    })
    this.getMovieById(options.movieId)
  },
  
  // 根据ID获取电影详情
  getMovieById(id){
    wx.cloud.callFunction({
      name:'getMovieById',
      data:{
        id:id
      }
    }).then(res=>{
      let movie = res.result.data[0]
      this.setData({
        movie
      })
      wx.hideLoading()
    }).catch(console.error)
  }
})