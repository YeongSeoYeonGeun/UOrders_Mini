const app = getApp()

const normalCallout = {
  id: 1,
  latitude: 37.33295,
  longitude: 127.00005,
  iconPath: '/image/location.png',
  callout: {
    content: '文本内容',
    color: '#ff0000',
    fontSize: 12,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000000',
    bgColor: '#fff',
    padding: 5,
    display: 'ALWAYS',
    textAlign: 'center'
  },
  // label: {
  //   content: 'label 文本',
  //   fontSize: 24,
  //   textAlign: 'center',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   bgColor: '#fff',
  //   padding: 5
  // }
}


Page({
  data: {
    userIntro: '안녕하세요 시연님!',
    intro : '오늘은 어떤 음료를 주문하시겠어요?',
    nearStore : '가까운 매장',
    favoriteStore : '즐겨찾는 매장',
    nearCafeSelected : true,
    listSelected : true,
    cafeList : [
      {
        index: 0,
        name: '남산학사 cafe',
        location: '신공학관 1층',
        distance: '53m',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/19/15/a7/68/gazzi-cafe.jpg'
      },
      {
        index: 1,
        name: '그루터기 cafe',
        location: '사회과학관 2층 입구',
        distance: '102m',
        image: 'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg'
      },
      {
        index: 2,
        name: '그루터기 cafe2',
        location: '사회과학관 2층 입구',
        distance: '102m',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 3,
        name: '그루터기 cafe3',
        location: '사회과학관 2층 입구',
        distance: '102m',
        image: 'https://i.pinimg.com/originals/e5/c3/6a/e5c36ae8da0e4a92c3318e12f4a2db34.jpg'
      },
      {
        index: 4,
        name: '그루터기 cafe',
        location: '사회과학관 2층 입구',
        distance: '102m',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 5,
        name: '그루터기 cafe',
        location: '사회과학관 2층 입구',
        distance: '102m',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      }
    ],
    latitude: 37.558183,
    longitude: 127.000132,
    markers: [],
    customCalloutMarkerIds: [],
    num: 1
  },
  onLoad: function () {
    console.log('main load')
    this.setData({
      listSelected : true
    })
    // 통신 필요 (사용자 이름)
  },
  bindCafeTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    console.log("hiroo")
  },
  getNear : function() {
    console.log('getNear 클릭')
    this.setData({
      nearCafeSelected: true
    })
  },
  getFavorite : function() {
    console.log('getFavorite 클릭')
    this.setData({
      nearCafeSelected: false
    })
  },
  showMap : function() {
    console.log('showMap 클릭')
    this.setData({
      listSelected: false
    })
  },
  showList : function(){
    console.log('showList 클릭')
    this.setData({
      listSelected: true
    })
  }

})
  