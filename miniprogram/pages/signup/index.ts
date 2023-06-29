// pages/signUp/index.ts
import Dialog from '@vant/weapp/dialog/dialog';
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
    show:false
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

  
})