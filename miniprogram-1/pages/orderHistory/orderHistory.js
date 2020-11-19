const app = getApp()


Page({
  data: {
    orderHistoryList : [
      {
        orderHistroyIndex : 0,
        cafeName : '신공카페',
        orderTime : '2020년 11월 19일 오후 6:02',
        orderItems : [
          {
            name : '아메리카노', 
            count : 1,
            totalPrice : 1200
          },
          {
            name : '카페라떼', 
            count : 2,
            totalPrice : 3000
          }
        ],
        totalPrice : 4200
      },
      {
        orderHistroyIndex : 1,
        cafeName : '신공카페',
        orderTime : '2020년 11월 19일 오후 6:02',
        orderItems : [
          {
            name : '아메리카노', 
            count : 1,
            totalPrice : 1200
          }
        ],
        totalPrice : 1200
      },
      {
        orderHistroyIndex : 1,
        cafeName : '신공카페',
        orderTime : '2020년 11월 19일 오후 6:02',
        orderItems : [
          {
            name : '아메리카노', 
            count : 1,
            totalPrice : 1200
          }
        ],
        totalPrice : 1200
      }
    ]
  },
  onLoad: function () {
    console.log('main load')
    this.setData({
      listSelected : true
    })
    // 통신 필요 (사용자 이름)

  },
  clickBack : function(){
    wx.navigateBack({
      delta: 0,
    })
  }
})