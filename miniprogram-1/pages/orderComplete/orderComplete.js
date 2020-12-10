const app = getApp()

Page({
  data: {
    cafeName: '',
    orderNumber : 0,
    orderCompleteText : '',
    acceptText : '',
    returnHomeText : ''
  },
  onLoad: function(options) {
    console.log(options)

    this.setData({
      cafeName : options.cafeName,
      orderNumber : options.orderIndex,
      orderCompleteText : options.orderCompleteText,
      acceptText : options.acceptText,
      returnHomeText : options.returnHomeText
    })
  },
  gohome : function(){
    console.log('gohome');
    wx.reLaunch({
      url: '../main/main',
    })
  }
})
