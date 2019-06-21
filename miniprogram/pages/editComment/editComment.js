// miniprogram/pages/editComment/editComment.js
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
let timer = null; // 计时器
Page({
  /**
   * 页面的初始数据
   */
  data: {
    image: '',
    title: '',
    inputValue: '',
    tempFilePath: '',
    selectTxt: false,
    startRecord: false,
    recordTimer: '00:00',
    radioTimer: '',
    startPlay: false,
    hasRadio: false
  },
  // 跳转预览页
  skipToPreview() {
    if (this.data.selectTxt) { // 文字
      wx.navigateTo({
        url: '../previewComment/previewComment?content=' + this.data.inputValue,
      })
    } else {
      wx.navigateTo({ // 语音
        url: '../previewComment/previewComment?voice=' + this.data.tempFilePath,
      })
    }
  },
  // 开始录音
  startRecord() {
    const options = {
      duration: 60000, // 指定录音的时长，单位 ms
      sampleRate: 44100, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 192000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50 //指定帧大小，单位 KB
    }
    recorderManager.start(options)
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    // 错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
    clearInterval(timer)
    let n = 0
    let recordTimer = ''
    let that = this
    this.setData({
      startRecord: true
    })
    timer = setInterval(function() {
      n++;
      let m = parseInt(n / 60) < 10 ? '0' + parseInt(n / 60) : parseInt(n / 60);
      let s = parseInt(n % 60) < 10 ? '0' + parseInt(n % 60) : parseInt(n % 60);
      recordTimer = m + ':' + s;
      that.setData({
        recordTimer: recordTimer,
        radioTimer: parseInt(n % 60)
      })
    }, 1000)
  },
  // 停止录音
  stopRecord() {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      clearInterval(timer);
      this.setData({
        tempFilePath: res.tempFilePath,
        hasRadio: true
      })
      console.log('停止录音', res.tempFilePath);
    })
    clearInterval(timer);
    this.setData({
      startRecord: false,
      recordTimer: '00:00'
    })
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
    innerAudioContext.src = this.data.tempFilePath;
    innerAudioContext.onPlay(() => {
      console.log('start play')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.selectType && options.selectType == '文字') {
      this.setData({
        selectTxt: true
      })
    } else if (options.selectType && options.selectType == '音频') {
      this.setData({
        selectTxt: false
      })
    }
    let movieDetail = wx.getStorageSync('movieDetail');
    this.setData({
      image: movieDetail.image,
      title: movieDetail.title
    })
  },
  onblur(e) {
    this.setData({
      inputValue: e.detail.value
    })
  }
})