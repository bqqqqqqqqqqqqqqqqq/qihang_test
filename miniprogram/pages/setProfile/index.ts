import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
  },

  //保存按钮
  submit(){
    let name = this.data.name;
    if(name==''){
      Dialog.alert({
        title: '提示',
        message: '姓名不能为空',
      }).then(() => {
        // on close
      });
    }else{
      wx.showToast({
        title:"保存成功",
      })
      wx.navigateBack()
    }
  
  }
})