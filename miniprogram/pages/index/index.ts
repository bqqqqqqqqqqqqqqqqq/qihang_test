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
        cover_img:'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/021f828776fa53d3dba775fdcff0426b_902397dda144ad340c66a469d2a20cf430ad8506.jpg',
        tag:['11','22'],
        time: '2023.6.1',
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