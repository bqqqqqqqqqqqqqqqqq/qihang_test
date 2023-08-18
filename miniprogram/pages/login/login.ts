import  userApi  from '../../api/system/userAPI'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';


var app = getApp()


// pages/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    password:"",
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
  clickLogin(){
    let phone = this.data.phone;
    let psw = this.data.password;
    if(phone===null){
      Dialog.alert({
        message: '请输入手机号',
      }).then(() => {
        // on close
      });
      return 
    };
    if(psw === null){
      Dialog.alert({
        message: '请输入密码',
      }).then(() => {
        // on close
      });
      return 
    };
    //通过
    userApi.getUserInfo({phone:phone,password:psw},{needToken:false}).then((res)=>{
      if (res.code ==200&&res.msg=="未注册"){
        wx.showToast({
          title:"帐号不存在,请先注册",
          icon:"none"
        })
        return
      }else if(res.code===200){
        wx.showToast({
          title:"登录成功",
          icon:"none"
        })
        app.globalData.token = res.data.token
        app.globalData.UserInfo.code = "1"
        app.globalData.UserInfo = res.data.userInfo
        wx.setStorageSync('UserInfo',res.data.userInfo)
        wx.setStorageSync('token',res.data.token)
        wx.navigateBack()
      }else{
        wx.showToast({
          title:"登录失败,请重试",
          icon:"none"
        })
      }
    })


    
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
      // if(res.code===200){
      //   wx.showToast({
      //     title:"登录成功",
      //     icon:"none"
      //   })
      //   app.globalData.token = res.data.token
      //   app.globalData.UserInfo = res.data.userInfo
      //   wx.setStorageSync('UserInfo',res.data.userInfo)
      //   wx.setStorageSync('token',res.data.token)
      //   setTimeout(()=>{
      //     wx.navigateBack({
      //     },1000)
      //   })
      // }

      
      if (res.msg=="未注册"){
   
        //路由去注册页面
        wx.showToast({
          title:"未注册请先注册",
          icon:"none"
        })
        setTimeout(() => {
          wx.navigateTo({
            url:'../signup/index'
          })
        }, 500);
        return
      }else if(res.code===200){
        wx.showToast({
          title:"登录成功",
          icon:"none"
        })
        app.globalData.token = res.data.token
        app.globalData.UserInfo.code = "1"
        app.globalData.UserInfo = res.data.userInfo
        wx.setStorageSync('UserInfo',res.data.userInfo)
        wx.setStorageSync('token',res.data.token)
        this.onShow()
        wx.navigateBack()
      }
    })
  },

  goToSignUp(){
    wx.navigateTo({
      url:'../signup/index'
    })
  }

  //帐号密码登录 




})
