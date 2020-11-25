const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    cafeName: '남산학사 cafe',
    cartList: [
      {
        index: 0,
        name: '아메리카노',
        temperature : 'ICED',
        size : 'Regular',
        taketype : 'HERE',
        count: '1',
        price: '1,000'
      }
    ],
    totalprice : '4,000'
  },
  onLoad: function () {
    this.getCart()
  },
  getCart : function(){
    wx.showLoading({
      title: '불러오는 중..',
    })
    var that = this

    var url = api.url + 'users/cart';
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
            cafeName : data.cafeName,
            cartList : data.cartInfo
          })
        } else {
          that.setData({
            
          })
        }

        wx.hideLoading();
      },
      fail: function(err){
        console.log('getCart error : ' + err.errMsg)
        wx.hideLoading();
      }
      
    })
  },
  clickOrder: function(){
    wx.navigateTo({
      url: '../orderComplete/orderComplete',
    })
  },
  deleteMenu(e) {
    let deleteItem = e.currentTarget.dataset.item;
    const idx = this.data.cartList.findIndex(function(item) {return item.index === deleteItem.index})
    this.data.cartList.splice(idx, 1)
    console.log(this.data.cartList)
    this.setData({
      cartList: this.data.cartList
    })
  },
  deleteAll : function() {
    var emptyList = [];
    this.setData({
      cartList: emptyList
    })
  },
  back : function(){
    wx.navigateBack({
      delta: 0,
    })
  },
})
