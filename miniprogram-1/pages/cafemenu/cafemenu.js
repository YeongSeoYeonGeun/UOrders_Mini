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
  onLoad: function () {
    console.log('cafemenu load')
    // 통신 필요 (사용자 이름)
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
