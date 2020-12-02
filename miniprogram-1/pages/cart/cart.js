const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    cafeIndex : 0,
    cafeName: '남산학사 cafe',
    cartIndex : 0,
    cartList: [
      {
        cartMenuIndex : 0,
        menuIndex: 0,
        menuName: '아메리카노',
        menuTemperature : 'ICED',
        menuSize : 'Regular',
        menuTakeType : 'HERE',
        menuCount: '1',
        menuOrderPrice: '1,000'
      }
    ],
    totalPrice : '4,000'
  },
  onLoad: function () {
    this.getCart()
  },
  /* 통신 */
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
            cartIndex : data.cartIndex,
            cafeIndex : data.cafeIndex,
            cafeName : data.cafeName,
            cartList : data.cartMenuInfo,
            totalPrice : data.totalPrice
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
  checkSessionBeforeOrder : function(){
    wx.checkSession({
      success: (res) => {
        this.order();
      },
      fail: (err) => {
        this.login();
      }
    })
  },
  order : function(){

    var that = this
    var url = api.url + 'orders/pay';

    wx.showLoading({
      title: '불러오는 중..',
    })

    wx.request({
      method : 'GET',
      url: url,
      header: { 
        'content-type' : 'application/json',
        'userIndex' : app.globalData.userIndex
      },
      success: function(res){
        if(res.statusCode == 200){
          // 결제 성공했다고 가정.
          that.pay()

          var data = res.data.data;
          wx.requestPayment({
            nonceStr: data.nonceStr,
            package: data.package_,
            paySign: data.paySign,
            timeStamp: data.timeStamp,
            signType : data.signType,
            success (res) {
              console.log('결제 성공!')
              wx.hideLoading();
            },
            fail (res) { 
              console.log('결제 실패ㅜ')
              wx.hideLoading();
              wx.navigateTo({
                url: '../orderComplete/orderComplete',
              })
            }
          })
        }
      },
      fail: function(err){
        console.log('order error : ' + err.errMsg)
      }
    })
  },
  pay : function(){

    let today = new Date();
    
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let orderDate = `${year}-${month < 10 ? `0${month }`: month }-${date < 10 ? `0${date}` : date}`;

    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let orderTime = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes }`: minutes }:${seconds < 10 ? `0${seconds}` : seconds}`;

    let orderDateTime = orderDate + ' ' + orderTime;
    console.log(orderDateTime)

    var url = api.url + 'orders';

    wx.request({
      method : 'POST',
      url: url,
      header: { 
        'content-type' : 'application/json'
      },
      data : {
        'userIndex' : app.globalData.userIndex,
        'cafeIndex' : this.data.cafeIndex,
        'orderDateTime' : orderDateTime
      },
  
      success: function(res){
        if(res.statusCode == 200){
          console.log(res)
        }
      },
      fail: function(err){
        console.log('order error : ' + err.errMsg)
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
    console.log(deleteItem);

    var that = this;
    var emptyList = [];
    var url = api.url + 'users/cartMenu';

    wx.request({
      method : 'DELETE',
      url: url,
      header: { 
        'content-type' : 'application/json',
        'userIndex' : app.globalData.userIndex,
        'cartMenuIndex' : deleteItem.cartMenuIndex
      },
      success: function(res){
        if(res.statusCode == 200){
         that.getCart();
        }
      },
      fail: function(err){
        console.log('order error : ' + err.errMsg)
      }
    })

  },
  deleteAll : function() {
    var that = this;
    var emptyList = [];
    var url = api.url + 'users/cart';

    wx.request({
      method : 'DELETE',
      url: url,
      header: { 
        'content-type' : 'application/json',
        'userIndex' : app.globalData.userIndex,
        'cartIndex' : this.data.cartIndex
      },
      success: function(res){
        if(res.statusCode == 200){
         that.setData({
           cartList : emptyList
         })
        }
      },
      fail: function(err){
        console.log('order error : ' + err.errMsg)
      }
    })

  },
  back : function(){
    wx.navigateBack({
      delta: 0,
    })
  },
  login : function(){
    var that = this;
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res.code);

          var url = api.url + 'users/login';
          wx.request({
            method : 'POST',
            url: url,
            header: { 
              'content-type' : 'application/json'
            },
            data : {
              'userIndex' : app.globalData.userIndex,
              'userName' : app.globalData.userName,
              'js_code' : res.code
            },
            success: function(res){
              if(res.statusCode == 200){
                console.log(res.data)
                app.globalData.userIndex = res.data.data.userIndex
                wx.setStorageSync('userIndex', res.data.data.userIndex)
                that.checkSessionBeforeOrder();
              } else {
                console.log(res)
              }
            },
            fail: function(err){
              console.log('login at cart error : ' + err.errMsg)
            }
          })

          
        } else {
          console.log('Login failed' + res.errMsg)
        }
      },
      fail: function(err){
        console.log('error : ' + err.errMsg)
        wx.hideLoading();
      }
    })
  },
})
