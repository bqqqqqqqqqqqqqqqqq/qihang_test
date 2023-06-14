// app.ts
interface UserInfo{
  phone:string
  name:string
  uid:string
}
interface Paging{
    size:number,
    page:number
}

App({
  globalData: {
    active:null,

    UserInfo:{
      phone:null,
      name:"默認用戶",
      uid:"000000"
    },

  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

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