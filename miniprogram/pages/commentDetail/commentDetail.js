// miniprogram/pages/commentDetail/commentDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {},
    actionSheetHidden: true,
    actionSheetItems: ['文字', '音频']
  },
  // 底部弹出框
  actionSheetTap() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bind(){
    wx.navigateTo({
      url: '../editComment/editComment?comment='+this.data.comment,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getComment(options.commentId)
    wx.showLoading({
      title: '',
    })
  },
  getComment(id){
    wx.cloud.callFunction({
      name:'getCommentById',
      data:{
        id:id
      }
    }).then(res=>{
     this.setData({
       comment:res.result.data[0]
     })
     wx.hideLoading()
    }).catch(error=>{
      console.log(error)
      wx.hideLoading()
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }

})