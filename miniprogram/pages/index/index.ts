import publicAPI from "../../api/system/publicAPI";
import { requestAnimationFrame } from "../../miniprogram_npm/@vant/weapp/common/utils";
import { TimeData } from "../../miniprogram_npm/@vant/weapp/count-down/utils";
import { chooseFile } from "../../miniprogram_npm/@vant/weapp/uploader/utils";
const dayjs = require('../../utils/day.min.js');
interface oneProblem{
  pid:number,
  title:string,
  goods:number,
  // authorID:number,
  // Author:{
  //   isAdmination:string,
  //   name:string,
  //   Photo:
  // },
  cover_img:string[],
  tag:string[]
  picture:string,
  created_at:TimeData,
  updated_at:TimeData,
}

var listAll: oneProblem[][] =  []
var app = getApp()
Page({
  data: {
    show: false,
    Paging:{
      size:10,
      page:1
    },
    listAll
},


  
getAllProblem(){
 const Page: Paging = this.data.Paging 
  publicAPI.getProblemList(Page).then((res:any)=>{
    if(res.code===200){
        const listAll = this.data.listAll
        if (res.data.length != 0)  {
          const list:oneProblem[] = res.data
          this.formatTime(list)
          // this.coverimg(list)
          listAll.push(list)
        }else{
          return
        }
        let page = this.data.Paging.page
        page++
        this.setData({
          listAll:listAll,
          Paging:{
            size:10,
            page:page
          }
        })
    }else if (res.code==-1){
      wx.showToast({
        title:"已无更多数据",
        icon:"error",
        // errMsg:"已无更多数据"
      })  
    }
  })
  },

  // 问题详细页面
  goProblemDetail(e:any){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../question/index?id='+id,
      success(){
          wx.showToast()
      },
      fail(){
        wx.showToast({
          icon:"error",
          title:"失败"
        })
        wx.navigateBack
      }
    })
  },

showPopup() {
  this.setData({ show: true });
},

onClose() {
  this.setData({ show: false });
},
gotoUplode(){
  wx.navigateTo({
    url:'/pages/uplode/index'
  })
},
//格式化时间
formatTime(arr:oneProblem[] ){
  for (var i=0;i<arr.length;i++){
      arr[i].updated_at = dayjs(arr[i].updated_at).format('YYYY-MM-DD HH:mm')
    }
  },
  //取第一个为封面
  coverimg(arr:oneProblem[]){
    if (arr.length == 0){
      return
    }
    for (var i=0;i<arr.length;i++){
      arr[i].picture=arr[i].picture.split(';')[0]
    }
  },

//下拉刷新
onPullDownRefresh: function () {
  this.onRefresh()
},
onReachBottom(){
  this.getAllProblem()
},
onRefresh:function(){
  //导航条加载动画
  wx.showNavigationBarLoading();
  //重置分页加载页面 //成功加载再+1
  // this.data.Paging.page=2
  //网络请求数据
    const page:Paging = {
      page:1,
      size:10
    }
  listAll=[]
  this.setData({
    listAll:listAll,
    Paging:page
  })
  this.getAllProblem()
  //超时隐藏
  setTimeout(function () {
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
  }, 2000);
},

onLoad(){
  // this.getAllProblem
  if (app.globalData.token==""){
    wx.showToast({
      title:'请先登录',
      icon:'none'
    })
    setTimeout(() => {
      wx.navigateTo({
        url:'../login/login'
      })
    }, 2000);
  }
},

onShow(){
  // this.getAllProblem
  this.setData({
    page:{
      page:1,
      size:10
    }
  })
  this.getAllProblem()
},

onReady(){

},
});