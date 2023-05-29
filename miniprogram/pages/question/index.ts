// pages/question/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1200,
    Qimg:[
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/20230503232503.png',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/Screenshot_20230425_104728.jpg',
      '../../static/images/a3.jpg',
      '../../static/images/a4.jpg',
    ],
    Aimg:[
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/Screenshot_2023_0425_104616.png',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/docusaurus-social-card.jpg',
      '../../static/images/a3.jpg',
      '../../static/images/a4.jpg',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this; 
    var data = {
      "datas1": [
        {
          "id": 1,
          "imgurl": "../../static/images/a4.jpg"
        },
        {
          "id": 2,
          "imgurl": "../../static/images/a4.jpg"
        },
        {
          "id": 3,
          "imgurl": "../../static/images/a4.jpg"
        },
        {
          "id": 4,
          "imgurl": "../../static/images/a4.jpg"
        }
      ],
      "datas2": [
        {
          "id": 1,
          "imgurl": "../../static/images/a1.jpg"
        },
        {
          "id": 2,
          "imgurl": "../../static/images/a1.jpg"
        },
        {
          "id": 3,
          "imgurl": "../../static/images/a1.jpg"
        },
        {
          "id": 4,
          "imgurl": "../../static/images/a1.jpg"
        }
      ]
    }; 
    that.setData({
      lunboData1: data.datas1,
      lunboData2: data.datas2
    });
    
  },
  
preview1(e:any) {
  console.log(e);
  let item = e.currentTarget.dataset.item;
  console.log(item,11)
  wx.previewImage({
    current: item, // 当前显示图片的http链接
    urls: this.data.Qimg // 需要预览的图片http链接列表
  })
},
preview2(e:any) {
  console.log(e);
  let item = e.currentTarget.dataset.item;
  console.log(item,11)
  wx.previewImage({
    current: item, // 当前显示图片的http链接
    urls: this.data.Aimg // 需要预览的图片http链接列表
  })
},


  
  
})