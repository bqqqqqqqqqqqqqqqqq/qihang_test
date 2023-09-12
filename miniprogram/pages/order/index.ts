
import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
// pages/order/index.ts
const stuList = [];
const dayjs = require('../../utils/day.min.js');
var app = getApp()
Page({
  data: {
    goodTitle:<any>"",
    goodDesc:<any>"",
    price:<number>0,
    total:0,
    classID:<any>0,
    teacherID:<any>0,
    value:<any>"",
    fieldValue: '',
    stuList:<any>[],
    showKid:false,
    detailShow:false,
    count:<number>1,
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
    const total = this.data.count*this.data.price
    this.setData({
      total:total*100
    })
  },
  //选择孩子
  clickKid() {
    // 调用接口查询孩子信息,并添加上自己.
    const id = app.globalData.UserInfo.id
    userApi.GetChild({
      needToken:true,
      header:{
    Authorization: app.globalData.token
  }
  },id).then((res:any)=>{
    if (res.code==200){
      res.data.push(app.globalData.UserInfo)
      this.setData({
        stuList:res.data
      })
    }else  {
      wx.showToast({
        title:"发生错误",
        icon:"error"
      })
    }
  })

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
    this.setData({
      value: e.currentTarget.dataset.name,
      showKid: false
    })
    
  },
 

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
    const classID = (this.options.id) as string
    const teacherID = this.options.teacherID 
    userApi.BuyClassDetail({
      needToken:true,
      header:{
    Authorization: app.globalData.token
  }
  },classID).then((res:any)=>{
    if (res.code !=200){
      wx.showToast({
        icon:"error",
        title:"出现错误请重试"
      })
      return
    }else if (res.code == 200){

      this.setData({
        classID:classID,
        teacherID:teacherID,
        goodDesc:res.data.content,
        goodTitle:res.data.className,
        price:Number(res.data.price)
      })
      const total = this.data.count*this.data.price
      this.setData({
        total:total*100
      })
    }
  })
  },
  AddStudent(){
    
    userApi.AddBuyClassStu({
      needToken:true,
      header:{
    Authorization: app.globalData.token
    }
    },{"classID":this.data.classID as number,"studentID":this.data.value.id as number,"teacherID":this.data.teacherID as number,"completeTotal":this.data.count}).then((res:any)=>{
        if (res.code==-1){
          wx.showToast({
            icon:"error",
            title:"失败,请重试"
          })
          return
          }else if(res.code==200) {
            wx.showToast({
              title:"成功"
            })
        }
    })
  },
//----------------------------------------
// 微信支付
DoWXPay(){
  const name = this.data.value.name

  if (name== ""||name==undefined){
    wx.showToast({
      "title":"请选择购买对象",
      "icon":"error",
 
    })
    return
  }

  const id = app.globalData.UserInfo.id
  const Description = this.data.goodTitle
  const Number = this.data.count
  userApi.wechatPAY({
    needToken:true,
    header:{
  Authorization: app.globalData.token
}
},{"Description":Description,"Number":Number},id).then((res:any)=>{
  if (res.code!=200){
    wx.showToast({
      title:"发生错误请重试",
      icon:"error"
    })
    return
  }else{
    var timeStamp = res.data.applet.timeStamp
    var nonceStr = res.data.applet.nonceStr
    var WXpackage = res.data.applet.package
    var signType = res.data.applet.signType
    var paySign = res.data.applet.paySign
    //下订单之后锁库存,成功支付后确认库存,否则添加库存
    // 不锁了
    


    wx.requestPayment({
      "timeStamp": timeStamp,
      "nonceStr": nonceStr,
      "package": WXpackage,
      "signType": signType,
      "paySign": paySign,
      "success":()=>{
          wx.showToast({
            title:"支付成功",
          }),
          // setTimeout(()=>{
          //   wx.switchTab({
          //     url: '../index/index'
          //   })
          // },2000)
          this.AddStudent()
      },
      "fail":()=>{
        wx.showToast({
          icon:"error",
          title:"已取消"
        })
          setTimeout(()=>{
              wx.navigateBack()
          },2000)
      },
    })
  }
})
  // 设置32位数的订单号


},


})
