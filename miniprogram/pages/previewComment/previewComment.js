// miniprogram/pages/previewComment/previewComment.js
const db = wx.cloud.database();
let timer = null;
const innerAudioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    image: '',
    title: '',
    headshort: '',
    name: '',
    content: '',
    voice: '',
    startPlay: false,
    radioTimer: '',
    isText: true
  },
  startPlay() {
    let that = this
    this.setData({
      startPlay: true,
    })
    clearInterval(timer)
    let n = parseInt(that.data.radioTimer)
    timer = setInterval(function() {
      n--
      let s = parseInt(n % 60)
      if (n == 0) {
        clearInterval(timer)
        that.setData({
          startPlay: false
        })
      }
    }, 1000)
    this.playRecord()
  },
  // 播放录音
  playRecord() {
    innerAudioContext.autoplay = true;
    innerAudioContext.src = this.data.voice;
    innerAudioContext.onPlay(() => {
      console.log('start play')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
    })
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
        image: this.data.image,
        voice: this.data.voice,
        voiceTime: this.data.radioTimer
      },
      success: (res) => {
        console.log(res)
      },
      fail: console.error
    })
    wx.navigateTo({
      url: '../commentList/commentList',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.selectTxt == 'true') {
      this.setData({
        isText: true,
        content: options.content
      })
    } else {
      this.setData({
        isText: false,
        voice: options.voice,
        radioTimer: options.radioTimer
      })
    }
    let that = this
    let movieDetail = wx.getStorageSync('movieDetail')
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          headshort: res.userInfo.avatarUrl,
          name: res.userInfo.nickName,
          image: movieDetail.image,
          title: movieDetail.title
        })
        wx.setStorage({
          key: 'currentUser',
          data: {
            name: res.userInfo.nickName,
            headshort: res.userInfo.avatarUrl
          }
        })
      }
    })

  }
})