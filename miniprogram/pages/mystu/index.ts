import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    unadd:'',
    notice:'',
    bList:[
      {
        bid:111,
        bname:"数学"
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
  gotoallstu(){
    this.go('allstu')
  },
  gotoSetClass(e:any){
    console.log(e);
    let p = e.currentTarget.dataset.bname;
    p = 'bname='+p;
    console.log(p);
    this.go('setClass',p)
  },
  onClose(event:any) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
          // ...
          
        });
        break;
    }
  },
  // 右上角
  manage() {
    this.selectComponent(".vsc").open({position: "right"});
  },
  //判断unadd
  ifUnadd(){
    let u = parseInt(this.data.unadd);
    if(u > 0){
      this.setData({
        notice: "你还有"+u+"位学生待分配到班级。"
      })
    }else{
      this.setData({
        notice: "暂无待分配的学生。"
      })
    }
   
    // this.setData({
    //   hidden: false
    // })
  },
  //点击按钮
  click(){
    this.go('setClass')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //通知
    this.ifUnadd()
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