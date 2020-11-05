const app = getApp()

Page({
  data: {
    userIntro: '안녕하세요 시연님!',
    intro : '오늘은 어떤 음료를 주문하시겠어요?',
    nearStore : '가까운 매장',
    favoriteStore : '즐겨찾는 매장',
    cafeList : [
      {
        index: 0,
        name: '남산학사 cafe',
        location: '신공학관 1층',
        distance: '53m',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 1,
        name: '그루터기 cafe',
        location: '사회과학관 2층 입구',
        distance: '102m',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 2,
        name: '그루터기 cafe',
        location: '사회과학관 2층 입구',
        distance: '102m',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
      },
      {
        index: 3,
        name: '그루터기 cafe',
        location: '사회과학관 2층 입구',
        distance: '102m',
        image: 'http://www.designtwoply.com/wp-content/uploads/2018/01/designtwoply0000-1.jpg'
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
    ]
  },
  onLoad: function () {
    console.log('main load')
    // 통신 필요 (사용자 이름)
  }
})
  