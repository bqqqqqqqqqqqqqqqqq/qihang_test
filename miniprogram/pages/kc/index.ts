// pages/kc/index.ts

import userApi from "../../api/system/userAPI";

interface kcInfo {
  cover_img:string
  teacherName:string
  className:string
  complete:string
  completeTotal:string
}
 
var app = getApp()
var kcInfo:any[]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_name:'李刚',
    list:<any>[],
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
  onLoad() {
    this.detailKC()
  },
  detailKC(){
    var that = this
    const id = that.options.id||""
    if (id ==""){
      wx.showToast({
        title:"请重试"
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 500);
      return
    }
     userApi.StuDetailClass({
           needToken:true,
           header:{
          Authorization: app.globalData.token
        }
      },id).then((res:any)=>{
        if(res.code==200){
          console.log(res.data)
          const list :kcInfo[]=res.data
          const listAll = this.data.list
          listAll.push(...list)
          that.setData({
            list:listAll
          })

      }
    })
  },







})