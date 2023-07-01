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

    ],
    Aimg:[

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
  },
  
preview1(e:any) {
  let idx= e.currentTarget.dataset.idx;
  let pics =this.data.Qimg;
  wx.previewImage({
    current: pics[idx],
    urls:pics
  })
},
preview2(e:any) {
  let idx= e.currentTarget.dataset.idx;
  let pics =this.data.Aimg;
  wx.previewImage({
    current: pics[idx],
    urls:pics
  })
},


  
  
})