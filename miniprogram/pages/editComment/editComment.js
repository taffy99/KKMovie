// miniprogram/pages/editComment/editComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '',
    title: '',
    inputValue: ''
  },
  skipToPreview() {
    wx.navigateTo({
      url: '../previewComment/previewComment',
    })
  },
  startRecord() {
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }

    recorderManager.start(options)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movieDetail = wx.getStorageSync('movieDetail')
    this.setData({
      image: movieDetail.image,
      title: movieDetail.title
    })
  },
  onblur(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})