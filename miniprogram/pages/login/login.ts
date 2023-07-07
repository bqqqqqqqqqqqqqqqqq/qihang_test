import  userApi  from '../../api/system/userAPI'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';


var app = getApp()


// pages/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:null,
    password:null,
    isPassword:true,
    eye:"closed-eye",
  },
  onClickEye(){
    let boo = this.data.isPassword;
    if(boo){
      this.setData({
        isPassword:false,
        eye: "eye-o"
      })
    }else{
      this.setData({
        isPassword:true,
        eye: "closed-eye"
      })
    };
  },
  clickBtn(){
    let phone = this.data.phone;
    let psw = this.data.password;
    if(phone===null){
      Dialog.alert({
        message: '请输入手机号',
      }).then(() => {
        // on close
      });
      return false;
    };
    if(psw === null){
      Dialog.alert({
        message: '请输入密码',
      }).then(() => {
        // on close
      });
      return false;
    };
    //通过
    return true
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  login(e:any){
    // this.getUserinfo(e.detail.value.phone,e.detail.value.password)
    
  },

  getPhoneNumber (e: { detail: any }) {
    this.WXLogin(e.detail.code)
  },

  WXLogin(code:string,){
    userApi.UserwxPhoneLogin({code},{needToken:true}).then((res)=>{
      if(res.code===200){
        wx.showToast({
          title:"登录成功",
          icon:"none"
        })
        app.globalData.token = res.data.token
        app.globalData.UserInfo = res.data.userInfo
        wx.setStorageSync('UserInfo',res.data.userInfo)
        wx.setStorageSync('token',res.data.token)
        setTimeout(()=>{
          wx.navigateBack({
          },1000)
        })
      }else if (res.code===-1){
        //路由去注册页面
        wx.showToast({
          title:"未注册请先注册",
          icon:"none"
        })
        setTimeout(() => {
          wx.navigateTo({
            url:'../signup/index'
          })
        }, 1000);
      }
    })
  },

  // getUserinfo(phone:string,password:string){
  //   userApi.getUserInfo({password:password},{needToken:true}).then((res)=>{
  //     console.log(res)
  //     if(res.code===200){
        
  //     }
  //   })
  // },

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