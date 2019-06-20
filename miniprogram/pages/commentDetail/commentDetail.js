// miniprogram/pages/commentDetail/commentDetail.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {},
    actionSheetHidden: true,
    actionSheetItems: ['文字', '音频'],
    addToFavorite: false
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
  bindItemTap(e){
    let selectType = e.currentTarget.dataset.name
    let movieDetail = {
      image:this.data.comment.image,
      title:this.data.comment.title
    }
    wx.setStorageSync('movieDetail', movieDetail)
    wx.navigateTo({
      url: '../editComment/editComment?selectType=' + selectType
    })
  },
  // 收藏影评
  skipToComment(){
    if(!this.data.addToFavorite){ // 未收藏
      this.setData({
        addToFavorite: true
      })
      db.collection('myFavorite').add({
        data: {
          content: this.data.comment.content,
          headshort: this.data.comment.headshort,
          title: this.data.comment.title,
          image: this.data.comment.image,
          name: this.data.comment.name
        },
        success: (res) => {
          console.log(res)
        },
        fail: console.error
      })
    }
    wx.navigateTo({
      url: '../myFavorites/myFavorities',
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
  }
})