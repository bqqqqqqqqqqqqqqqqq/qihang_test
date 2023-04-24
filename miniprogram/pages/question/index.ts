// pages/question/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1200,
    img:[
      '../../static/images/a1.jpg',
      '../../static/images/a2.jpg',
      '../../static/images/a3.jpg',
      '../../static/images/a4.jpg',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this; 
    var data = {
      "datas": [
        {
          "id": 1,
          "imgurl": "../../static/images/a1.jpg"
        },
        {
          "id": 2,
          "imgurl": "../../static/images/a2.jpg"
        },
        {
          "id": 3,
          "imgurl": "../../static/images/a3.jpg"
        },
        {
          "id": 4,
          "imgurl": "../../static/images/a4.jpg"
        }
      ]
    }; 
    that.setData({
      lunboData: data.datas
    });
    
  },
  
preview(e:any) {
  console.log(e);
  let item = e.currentTarget.dataset.item
  wx.previewImage({
    current: item, // 当前显示图片的http链接
    urls: this.data.img // 需要预览的图片http链接列表
  })
},


  
  
})