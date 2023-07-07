// pages/cloSmall/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneList:[
      {
        sname:"dfg",
        sub:"english",
        rate:"4/8",
        todayDone:true,
      },
      {
        sname:"shjk",
        sub:"english",
        rate:"4/8",
        todayDone:true,
      }
    ],
  },
  //跳转
  go(url:string,params?:string){
    let gourl = '';
    if (params) {
      gourl = '/pages/'+url+'/index?' + params ;
    }else{
      gourl = '/pages/'+url+'/index';
    }
    wx.navigateTo({
      url:gourl
  });
},
goHistory(){
  this.go("seeHistory")
},

//签到、撤销
clickBtn(e:any){
  let i = e.currentTarget.dataset.oneitem;
  i.todayDone===true?i.todayDone=false:i.todayDone=true;
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