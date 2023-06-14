import publicAPI from "../../api/system/publicAPI";
import { requestAnimationFrame } from "../../miniprogram_npm/@vant/weapp/common/utils";

interface oneProblem{
  pid:number,
  cover_img:string,
  tag:string[]
}

var listAll: oneProblem[]=  []

Page({
  data: {
    show: false,
    Paging:{
      size:10,
      page:1.
    },
    list:[
      {
        pid: 1,
        cover_img:'../../static/images/a1.jpg',
        tag:['11','22']
      },
      listAll
    ],
},

getAllProblem(){
  publicAPI.getProblemList(this.data.Paging).then((res:any)=>{
    if(res.code===200){
        console.log(res)
        console.log(res.data)
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
  console.log("tt")
  wx.navigateTo({
    url:'/pages/uplode/index'
  })
}
});