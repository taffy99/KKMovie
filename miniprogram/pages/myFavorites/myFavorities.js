// miniprogram/pages/myFavorites/myFavorities.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [],
    selectNum: '0', // tab选中值
    userInfo:null
  },
  // tab切换
  selectTab(e) {
    let selectNum = e.target.dataset.num
    this.setData({
      selectNum
    })
    if (selectNum == 0) { // 已收藏
      this.setData({
        movieList: []
      })
      this.getMyCollection()
      wx.showLoading({
        title: '',
      })
    } else if (selectNum == 1) { // 已发布
      this.setData({
        movieList: []
      })
      this.getMyRelease()
      wx.showLoading({
        title: '',
      })
    }
  },
  // 返回首页
  skipToHome() {
    wx.redirectTo({
      url: '../home/home'
    })
  },
  onTapLogin(event){
    console.log(event)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMyCollection()
    wx.showLoading({
      title: '',
    })
  },
  getMyCollection(callback) { // 查收藏
    wx.cloud.callFunction({
      name: 'myFavorites'
    }).then(res => {
      this.setData({
        movieList: res.result.data
      })
      wx.hideLoading()
      callback && callback()
    })
  },
  getMyRelease(callback) { // 查发布
    let currentUser = wx.getStorageSync('currentUser')
    db.collection('movieComments').where({
      name: currentUser.name
    }).get({
      success: res => {
        this.setData({
          movieList: res.data
        })
        wx.hideLoading()
      },
      fail: err => {
        console.error(err)
        wx.hideLoading()
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    if (this.data.selectNum == 0) {
      this.getMyCollection(res => {
        wx.stopPullDownRefresh()
      })
    } else if (this.data.selectNum == 1) {
      this.getMyRelease(res => {
        wx.stopPullDownRefresh()
      })
    }
  }
})