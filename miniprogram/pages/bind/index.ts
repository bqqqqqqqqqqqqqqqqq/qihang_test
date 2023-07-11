import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

// pages/bind/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
  },
  //保存按钮
  submit(){
    let name = this.data.phone;
    if(name==''){
      Dialog.alert({
        title: '提示',
        message: '手机号不能为空',
      }).then(() => {
        // on close
      });
    }else{
      wx.showToast({
        title:"绑定成功",
      })
      wx.navigateBack()
    }
  
  }
})