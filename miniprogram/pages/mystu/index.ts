import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
interface kcInfo {
  bid:number
  bname:string
}
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'w',
    unadd:'',
    notice:'',
    bList:<any>[],
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
    let className = e.currentTarget.dataset.bname;
    let classID = e.currentTarget.dataset.bid;

    wx.navigateTo({
      url:"../setClass/index?className="+className+"&classID="+classID
  });
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

  AllKC(){
    var that = this
     userApi.AllClass({
           needToken:true,
           header:{
          Authorization: app.globalData.token
        }
      },"").then((res:any)=>{
        if(res.code==200&&res.data!=null){
          const list :kcInfo[]=res.data
          const listAll = this.data.bList
          listAll.push(...list)
          that.setData({
            bList:listAll
          })
      }else if (res.data==null){
        wx.showToast({
          title:"已无更多数据",
          icon:"none"
        })
      }else{
        wx.showToast({
          title:"已无更多数据",
          icon:"none"
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
        return
      }
    })},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.AllKC()
    //通知
    this.ifUnadd()
    //接受type=admin
    let t = options.type;
    this.setData({
      type: t
    })
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