const api = require('../../utils/api.js')
const app = getApp()

Page({
  data: {
    cafeName: '남산학사 cafe',
    cafeLocation : '신공학관 1층', 
    favorite : 0,
    menuList: [
      {
        index: 0,
        name: '아메리카노',
        price: '1,000원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 1,
        name: '카페라떼',
        price: '1,500원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      }, 
      {
        index: 2,
        name: '아메리카노',
        price: '1,000원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 3,
        name: '카페라떼',
        price: '1,500원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 4,
        name: '아메리카노',
        price: '1000원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 5,
        name: '카페라떼',
        price: '1500원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 6,
        name: '아메리카노',
        price: '1000원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 7,
        name: '카페라떼',
        price: '1500원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      }, {
        index: 8,
        name: '아메리카노',
        price: '1000원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 9,
        name: '카페라떼',
        price: '1500원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 10,
        name: '아메리카노',
        price: '1000원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 11,
        name: '카페라떼',
        price: '1500원',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      }
    ]
  },
  onLoad: function (options) {
    console.log('cafemenu load')
    
    this.getCafeMenu(options.cafeIndex)
  },
  getCafeMenu : function(cafeIndex){
    wx.showLoading({
      title: '불러오는 중..',
    })
    var that = this

    var url = api.url + 'cafe/' + cafeIndex;
    wx.request({
      method : 'GET',
      url: url,
      header: { 
        'content-type' : 'application/json'
      },
      success: function(res){
        console.log(res.data);
        if(res.statusCode == 200){
          console.log(res.data)

          let data = res.data.data

          that.setData({
            cafeName : data.cafeName
          })
        } else {
          that.setData({
            
          })
        }

        wx.hideLoading();
      },
      fail: function(err){
        console.log('getCafeList error : ' + err.errMsg)
        wx.hideLoading();
      }
      
    })
  },
  bindCart :function() {
    console.log('cafeMenu-bindCart function');
    wx.navigateTo({
      url: '../cart/cart'
    })
  },
  clickMenu : function(){
    wx.navigateTo({
      url: '../menuDetail/menuDetail',
    })
  },
  like : function(){
    console.log('hiroo')
    this.setData({
      favorite: 1
    })
  },
  unlike : function(){
    console.log('unlike')
    this.setData({
      favorite: 0
    })
  },
  back : function(){
    wx.navigateBack({
      delta: 0,
    })
  },
})
