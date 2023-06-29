import publicAPI from "../../api/system/publicAPI";
import { requestAnimationFrame } from "../../miniprogram_npm/@vant/weapp/common/utils";
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
  cover_img:string,
  tag:string[]
  Picture:string,
}

var listAll: oneProblem[][] =  []

Page({
  data: {
    show: false,
    Paging:{
      size:10,
      page:1
    },
    list:[
      {
        pid: 1,
        cover_img:'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/021f828776fa53d3dba775fdcff0426b_902397dda144ad340c66a469d2a20cf430ad8506.jpg',
        tag:['11','22'],
        time: '2023.6.1',
      },
      // listAll
    ],
    listAll
},


  
getAllProblem(Page: Paging){
  publicAPI.getProblemList(Page).then((res:any)=>{
    
    if(res.code===200){
        // console.log(res)
        // console.log(res.data)
        const listAll = this.data.listAll
        if (res.data.length != 0)  {
          listAll.push(res.data)
        }else{
          return
        }
        let page = this.data.Paging.page
        page++
        // page-1 [page-1][0-9]  1 10 [0][0-9]
        

        this.setData({
          listAll:listAll,
          Paging:{
            size:10,
            page:page
          }
        })
        console.log(listAll);
    }else if (res.code==-1){
      wx.showToast({
        title:"已无更多数据",
        icon:"error",
        // errMsg:"已无更多数据"
      })  
    }
  })
  },
  goProblemDetail(e:any){
    // console.log(e);
    // console.log(e.currentTarget.dataset.id);
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
  // console.log("tt")
  wx.navigateTo({
    url:'/pages/uplode/index'
  })
},
//格式化时间
formatTime(){
  let myArr = this.data.listAll;
  console.log(myArr[0][3].created_at,11);
  console.log(dayjs(myArr[0][3].created_at).format('YYYY-MM-DD'));
 
  for(var i=0;i<myArr.length;i++){
    for (var j=0;j<myArr[i].length;j++){
      let newDate = dayjs(myArr[i][j].created_at).format('YYYY-MM-DD');
      myArr[i][j].created_at = newDate;
    }
  }
 this.setData({
  listAll: myArr
 })

  
  
},
//下拉刷新
onPullDownRefresh: function () {
  this.onRefresh()
},
onReachBottom(){
  this.getAllProblem(this.data.Paging)
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
    listAll:listAll
  })
  this.getAllProblem(page)
  //超时隐藏
  setTimeout(function () {
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
  }, 2000);
},

onLoad(){
  
  // this.getAllProblem
},

onShow(){
  
  // this.getAllProblem
},

onReady(){
this.getAllProblem(this.data.Paging)
},
});