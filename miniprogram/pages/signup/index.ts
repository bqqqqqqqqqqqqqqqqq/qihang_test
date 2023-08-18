// pages/signUp/index.ts
import userApi from '../../api/system/userAPI';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

let reg = /^(?=\S*[a-z])(?=\S*\d)\S{8,}$/;

interface UserInfo{
  name:string
  password:string
  code:string
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPassword:true,
    eye:"closed-eye",
    username:'',
    password:'',
    password2:'',
    show:true
    
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
  //显示密码检验框
  confirmPsw(){
    this.setData({
      show:true
    })
  },

  clickBtn(){
    let name = this.data.username;
    let psw = this.data.password;
    let psw2 = this.data.password2;
    if(name===''){
      Dialog.alert({
        message: '请输入姓名',
      }).then(() => {
        // on close
      });
      return false;
    };
    if(psw === ''){
      Dialog.alert({
        message: '请输入密码',
      }).then(() => {
        // on close
      });
      return false;
    };
    if(!reg.test(psw)){
      Dialog.alert({
      message: '请包括字母，数字，8位以上',
    }).then(() => {
      // on close
    });
    return false;
  }
    if(psw!=psw2){
      Dialog.alert({
        message: '两次输入的密码不相同',
      }).then(() => {
        // on close
      });
      return false;
    };
    //通过
    return true
  },
  onChange(){},

  getPhoneNumber (e: { detail: any }) {
    // var valid = this.clickBtn()
    // if (!valid){
    //   return
    // }    
    let name = this.data.username;
    let psw = this.data.password;
    let psw2 = this.data.password2;
    if(name===''){
      Dialog.alert({
        message: '请输入姓名',
      }).then(() => {
        // on close
      });
      return false;
    };
    if(psw === ''){
      Dialog.alert({
        message: '请输入密码',
      }).then(() => {
        // on close
      });
      return false;
    };
    if(!reg.test(psw)){
      Dialog.alert({
      message: '请包括字母，数字，8位以上',
    }).then(() => {
      // on close
    });
    return false;
  }
    if(psw!=psw2){
      Dialog.alert({
        message: '两次输入的密码不相同',
      }).then(() => {
        // on close
      });
      return false;
    };
    //通过
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户点击拒绝
      wx.showToast({
         title:'请授权手机号',
        icon:"error"
      })
      return
    } 
    

     // 允许授权
    this.Register(e.detail.code)
    return true
   
  },

  Register(code:string){
    const userInfo:UserInfo={
        name:this.data.username,
        password:this.data.password,
        code:code
    }
    wx.showLoading({
      title:"加载中",
      mask:"true"
    })
    userApi.UserwxPhoneRegister(userInfo,{needToken:false}).then((res:any)=>{
      wx.hideLoading()
        if(res.code===200){
            wx.showToast({
              title:"注册成功重新登录",
              icon:"success",
            })
            setTimeout(() => {
                wx.navigateTo({
                  url:'../user/index'
                })
                wx.navigateBack({
                  delta:2
                })
            }, 1000);
            
        }else if(res.code===0){
          wx.showToast({
            title:"已注册",
            icon:"error",
            duration:"2000"
          })
          wx.navigateBack()
          wx.navigateTo({
            url:'../user/index'
          })
        }else if(res.code===-1  ){
          wx.showToast({
            title:"服务器繁忙",
            icon:"error"
          })}else if(res.code===0  ){
            wx.showToast({
              title:"已注册直接登录",
              icon:"error"
            })
          }
    })
  }

  
})