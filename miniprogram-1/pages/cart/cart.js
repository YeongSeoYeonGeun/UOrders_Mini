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
      },
      {
        index: 1,
        name: '카페라떼',
        temperature: 'ICED',
        size: 'Regular',
        taketype: 'HERE',
        count: '1',
        price: '2,500'
      }
    ],
    totalprice : '4,000'
  },
  onLoad: function () {
    console.log('cafemenu load')
    // 통신 필요 (사용자 이름)
  }
})
