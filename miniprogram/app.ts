// app.ts
interface UserInfo{
  name:string
  isAdmin:string 
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
    },

  },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    
    
    token=wx.getStorageSync('token') || ""
    // this.globalData.setData({
      
    // })
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res.code)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //    wx.request({
    //      url:'http://localhost:8888/WXLogin',
    //      data:{code:res.code},
    //      method:'POST',
    //     header:{
    //       "Content-type":"application/x-www-form-urlencoded"
    //     },
    //     success(res){
    //       console.log(res)
    //     }
    //     })
    //   },  
    // })
  },
})