// app.ts
interface UserInfo{
  name:string
  isAdmin:string
  id:string
}
interface Paging{
    size:number,
    page:number
}
var token:string
var app = getApp();
App({
  globalData: {
    active:null,
    token:token! || "",
    UserInfo:{
      name:"请先登录",
      isAdmin:"0",
      id:""
    },

  },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    this.globalData.token=wx.getStorageSync('token') || ""
    this.globalData.UserInfo=wx.getStorageSync('UserInfo') || {name:"请先登录",isAdmin:"0",};
    }



})