const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    orderHistoryList : [
      {
        orderIndex : 0,
        cafeName : '신공카페',
        orderDate : '2020년 11월 19일 오후 6:02',
        menuInfo : [
          {
            menuName : '아메리카노', 
            orderCount : 1,
            orderPrice : 1200
          }
        ],
        totalPrice : 4200
      }
    ]
  },
  onLoad: function () {
    this.getOrderHistory();

  },
  getOrderHistory : function(){
    var that = this
    var url = api.url + 'orders';
    wx.request({
      method : 'GET',
      url: url,
      header: { 
        'content-type' : 'application/json',
        'userIndex' : app.globalData.userIndex
      },
      success: function(res){
        if(res.statusCode == 200){
          console.log(res.data)
          let data = res.data.data
          that.setData({
            orderHistoryList : data
          })
        } else {
          console.log(res)
        }
      },
      fail: function(err){
        console.log('getOrderHistory error : ' + err.errMsg)
      }
    })
  },
  clickBack : function(){
    wx.navigateBack({
      delta: 0,
    })
  }
})