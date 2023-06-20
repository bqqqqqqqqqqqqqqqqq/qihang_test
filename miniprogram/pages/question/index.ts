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
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/021f828776fa53d3dba775fdcff0426b_902397dda144ad340c66a469d2a20cf430ad8506.jpg',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/20230416165951.png',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/f5a9287f989835f8730a667ce2a4695.jpg',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/021f828776fa53d3dba775fdcff0426b_902397dda144ad340c66a469d2a20cf430ad8506.jpg',
    ],
    Aimg:[
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/021f828776fa53d3dba775fdcff0426b_902397dda144ad340c66a469d2a20cf430ad8506.jpg',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/20230416165951.png',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/f5a9287f989835f8730a667ce2a4695.jpg',
      'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/021f828776fa53d3dba775fdcff0426b_902397dda144ad340c66a469d2a20cf430ad8506.jpg',
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