// miniprogram/pages/commentList/commentList.js
let timer = null;
const innerAudioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    commentlist: [],
    startPlay: false
  },
  startPlay(e) {
    let that = this
    this.setData({
      startPlay: true,
    })
    clearInterval(timer)
    let n = parseInt(e.target.dataset.item.voiceTime)
    timer = setInterval(function () {
      n--
      let s = parseInt(n % 60)
      if (n == 0) {
        clearInterval(timer)
        that.setData({
          startPlay: false
        })
      }
    }, 1000)
    let voice = e.target.dataset.item.voice
    this.playRecord(voice)
  },
  // 播放录音
  playRecord(voice) {
    innerAudioContext.autoplay = true;
    innerAudioContext.src = voice;
    innerAudioContext.onPlay(() => {
      console.log('start play')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
    })
  },
  skipToHome() {
    wx.redirectTo({
      url: '../home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCommentList()
    wx.showLoading({
      title: '',
    })
  },
  getCommentList(callback) {
    wx.cloud.callFunction({
      name: 'movieComments'
    }).then(res => {
      wx.hideLoading()
      this.setData({
        commentlist: res.result.data
      })
      callback && callback()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getCommentList(res => {
      wx.stopPullDownRefresh()
    })
  }
})