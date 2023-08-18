
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
  delete(e:any){
    let p = e.currentTarget.dataset.kid;
   
    
  },

  AllKC(){
    var that = this
    // const id = that.options.id||""
    // if (id ==""){
    //   wx.showToast({
    //     title:"请重试"
    //   })
    //   setTimeout(() => {
    //     wx.navigateBack()
    //   }, 500);
    //   return
    // }
     userApi.AllClass({
           needToken:true,
           header:{
          Authorization: app.globalData.token
        }
      },"").then((res:any)=>{
        if(res.code==200&&res.data!=null){
      
          const list :kcInfo[]=res.data
          const listAll = this.data.list
          listAll.push(...list)
          that.setData({
            list:listAll
          })
      }else if (res.data==null){
        wx.showToast({
          title:"已无更多数据",
          icon:"none"
        })
      }else{
        wx.showToast({
          title:"已无更多数据",
          icon:"none"
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
        return
      }
    })},
onLoad(){
  this.AllKC()
}

})