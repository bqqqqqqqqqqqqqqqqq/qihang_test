// pages/kc/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_name:'李刚',
    list:[
      {
        kid: 1,
        cover_img:'https://zhimg.oss-cn-guangzhou.aliyuncs.com/img1pa2o2w225fb.jpeg',
        t_name:'艾建国',
        type: '数学',
        rate:'8/10'
      },
      {
        kid: 2,
        cover_img:'https://zhimg.oss-cn-guangzhou.aliyuncs.com/img1pa2o2w225fb.jpeg',
        type: '数学',
        rate:'8/10'
      },
      {
        kid: 3,
        cover_img:'https://zhimg.oss-cn-guangzhou.aliyuncs.com/img1pa2o2w225fb.jpeg',
        rate:'8/10'
      }
    ]
  },
  //跳转
  go(url:string,params?:string){
    let gourl = '';
    if (params) {
      gourl = '/pages/'+url+'/index?' + params;
    }else{
      gourl = '/pages/'+url+'/index';
    }
    wx.navigateTo({
      url:gourl
  });
},
gokcChild(e:any){
  let p = e.currentTarget.dataset.kid;
  this.go('kcChild','kid='+p);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})