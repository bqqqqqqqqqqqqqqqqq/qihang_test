
import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
// pages/order/index.ts
const stuList = [];
const dayjs = require('../../utils/day.min.js');
var app = getApp()
Page({
  data: {
    goodTitle:"测试商品",
    goodDesc:"",
    price:20,
    total:0,
    value:'',
    fieldValue: '',
    stuList:[],
    showKid:false,
    detailShow:false,
    count:1,
  },
  //输入框
  onChange(e:any){
    let v = e.detail
    this.setData({
      value: v,
    });
  },
  getCount(event:any) {
    this.setData({
      count: event.detail
    })
  },
  //选择孩子
  clickCell() {
    this.setData({
      showKid: true,
    });
  },
  closePop() {
    this.setData({
      showKid: false,
    });
  },
  chose(e:any){
    console.log(e.currentTarget.dataset.name);
    this.setData({
      value: e.currentTarget.dataset.name,
      showKid: false
    })
    
  },
 
  // onClick() {
  //   this.setData({
  //     show: true,
  //   });
  // },
  // onClose() {
  //   this.setData({
  //     show: false,
  //   });
  // },
  // onFinish(e:any) {
  //   const { selectedOptions, value } = e.detail;
  //   const fieldValue = selectedOptions
  //       .map((option:any) => option.text || option.name)
  //       .join('/');
  //   this.setData({
  //     fieldValue,
  //     cascaderValue: value,
  //   })
  // },
  //
//提交订单
  onSubmit(){
    this.setData({
      detailShow: true,
    });
  },
  closeDetail() {
    this.setData({
      detailShow: false,
    });
  },

  onLoad() {
    const problemID = (this.options.id) as string
  

    this.setData({
      total:this.data.count*this.data.price
    })
  },

//----------------------------------------
// 微信支付
DoWXPay(){
  const id = app.globalData.UserInfo.id

  userApi.wechatPAY({
    needToken:true,
    header:{
  Authorization: app.globalData.token
}
},{"Description":this.data.goodTitle,"Number":this.data.count},id).then((res:any)=>{
  if (res.code!=200){
    wx.showToast({
      "msg":"发生错误请重试",
      "icon":"error"
    })
    return
  }else{
    var timeStamp = res.data.applet.timeStamp
    var nonceStr = res.data.applet.nonceStr
    var WXpackage = res.data.applet.package
    var signType = res.data.applet.signType
    var paySign = res.data.applet.paySign
    wx.requestPayment({
      "timeStamp": timeStamp,
      "nonceStr": nonceStr,
      "package": WXpackage,
      "signType": signType,
      "paySign": paySign,
      "fail":function(){
        Dialog.alert({
          message:"已取消支付"
        })
      },
    })
  }
})
  // 设置32位数的订单号


}





})