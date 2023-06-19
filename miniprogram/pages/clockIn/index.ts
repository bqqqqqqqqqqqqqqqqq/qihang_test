// pages/clockIn/index.ts
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneList:[
      {
        sname:"dfg",
        kid:"1",
        sub:"english",
        done: 4,
        all: 8,
        todayDone:false,
      },
      {
        sname:"shjk",
        kid:"2",
        sub:"english",
        done: 1,
        all: 8,
        todayDone:true,
      }
    ],
    smallClass:[
      {
        bid:123,
        bname:"数学"
      },
      {
        bid:124,
        bname:"论语"
      },
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
  gocloSmall(e:any){
    let p = e.currentTarget.dataset.bid;
    console.log(p);
    this.go("cloSmall",p);
  },
  //
  replaceList(oneList:any, newElement:any,id:string) {
    // 遍历List数组，找到要替换的对象元素索引
    console.log(newElement);
    
    for (let i = 0; i < oneList.length; i++) {
      if (oneList[i].kid === id) { 
        // 通过splice()方法将该元素替换为新对象元素
        oneList.splice(i, 1, newElement);
        // 若替换成功，返回更新后的oneList数组
        this.setData({
          oneList: oneList
        })
      }
    }
  },
  //签到、撤销
  clickBtn(e:any){
    let o = e.currentTarget.dataset.oneitem;
    const id = e.currentTarget.dataset.oneitem.kid;
    const oneList = this.data.oneList;
    if(o.todayDone){
      Dialog.confirm({
        title: '提示',
        message: '是否撤销最近一次签到',
      })
        .then(() => {
          // on confirm
          o.todayDone=false;
          o.done--;
          console.log(o);
          this.replaceList(oneList,o,id)
        })
        .catch(() => {
          // on cancel
        });
    }else{
      o.todayDone=true;
      o.done++;
      this.replaceList(oneList,o,id)
    }
    console.log(11);
    
    
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