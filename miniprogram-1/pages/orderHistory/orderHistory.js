const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    readOrderText : '',
    yearText : '',
    monthText : '',
    dayText : '',
    morningText : '',
    afternoonText : '',
    totalPriceText : '',
    wonText : '',
    orderDateText : '',
    andText : '',
    numberText : '',
    orderHistoryList : [
      {
        orderIndex : 0,
        cafeName : '',
        orderDate : '2020-11-19 18-02-33',
        menuInfo : [
          {
            menuIndex : 0,
            menuName : '', 
            orderCount : 1,
            orderPrice : 0
          }
        ],
        totalPrice : 0
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
            readOrderText : data.readOrderText,
            yearText : data.yearText,
            monthText : data.monthText,
            dayText : data.dayText,
            morningText : data.morningText,
            afternoonText : data.afternoonText,
            totalPriceText : data.totalPriceText,
            wonText : data.wonText,
            orderDateText : data.orderDateText,
            andText : data.andText,
            numberText : data.numberText,
            orderHistoryList : data.orderInfo
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