// pages/stuClassDetail/index.ts

import userApi from "../../api/system/userAPI";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

interface kcInfo {
  cover_img:string
  teacherName:string
  className:string
  complete:string
  completeTotal:string
}
interface updateData{
  teacherID:string
  studentID:number
  classID:string
  number:number
}
 
var app = getApp()
var kcInfo:any[]
var myCount:number
var upData:updateData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid:"",
    count:0,
    show: false,
    list:<any>[
    ],
  },
  //签到
  checkIn(e:any){
    const cid = e.currentTarget.dataset.id;
    const sid = this.data.sid;
    userApi.LastCheck({
      needToken:true,
      header:{
        Authorization: app.globalData.token
      }
    },sid,cid).then((res:any)=>{
      if (res.code==-1){
        wx.showToast({
          "icon":"error",
          "msg":"失败,请重试"
        })
        return
      }else if((res.code==200)){
        if(res.data.check==true){
          userApi.Checkin({
            needToken:true,
            header:{
              Authorization: app.globalData.token
            }
          },sid,cid).then((res:any)=>{
            if (res.code==-1){
              wx.showToast({
                "icon":"error",
                "msg":"失败,请重试"
              })
              return
            }else if((res.code==200)){
              wx.showToast({
                "msg":"签到成功"
              })
            }
          })
        }else if(res.data.check==false){
         Dialog.confirm({
          message: '5分钟内只能签到一次！',
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });

        }
      }
    })
  },
  onChange(event:any) {
    this.setData({
      activeNames: event.detail,
    });
  },
  //跳转
  go(url:string,params?:string){
    let gourl = '';
    if (params) {
      gourl = '/pages/'+url+'/index?' + params;
    }else{
      gourl = '/pages/'+url+'/index';
    }
    wx.navigateTo({
      url:gourl
  });
},
gokcChild(e:any){
  let p = e.currentTarget.dataset.kid;
  this.go('kcChild','kid='+p);
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    const sid = option.id as string;
    this.setData({
      sid:sid
    })
    this.stuClass(sid)//获取页面数据
  },
  stuClass(sid:string){
    var that = this
    userApi.SelcetStudentClass({
      needToken:true,
      header:{
    Authorization: app.globalData.token
  }},sid).then((res:any)=>{
    let data = res.data;
    console.log(data);
    if(res.code==200){
      const list :kcInfo[]=res.data
        const listAll = this.data.list
        if (list!=null){
          listAll.push(...list)
        }
        that.setData({
          list:listAll
        })
    }
    
  })
  },
  //修改
  edit(e:any){
    const c =  e.currentTarget.dataset.classcount
    let cid = e.currentTarget.dataset.id;
    this.setData({ count: c});//
    this.setData({ show: true });
  },
  numChange(event:any) {
    myCount = event.detail
  },
  //确定按钮，提交数据
  confirm(){
    upData.studentID = parseInt(this.data.sid)
    console.log(myCount);
    //updata的api
    
  },
  onClose() {
    this.setData({ show: false });
  },

   //下拉刷新
   onPullDownRefresh: function () {
    
  },

})