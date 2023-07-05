import publicAPI from "../../api/system/publicAPI";
import userApi from "../../api/system/userAPI";

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin:app.globalData.UserInfo.isAdmin,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    current: 0,
    AllQimg:<string[]>[

    ],
    AllAimg:<string[]>[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  //   var id:string = this.options.id
  //  this.getProblemDetail(id) 
  this.setData({
    isAdmin:app.globalData.UserInfo.isAdmin
  })
  this.getProblemDetail((this.options.id as any) as string)
  },
  
getProblemDetail(id:string){
  publicAPI.getAnswerDetail(id).then((res:any)=>{
    if (res.code===200){
      res.picture.answer.forEach((ele: { answer_picture: string | null; }) => {
        if (ele.answer_picture !=null){
          this.data.AllAimg.push(ele.answer_picture)
        }
      });
      res.picture.problem.forEach((ele: { problem_picture: string | null; }) => {
        if (ele.problem_picture !=null){
          this.data.AllQimg.push(ele.problem_picture)
        }
      });
        this.setData({
            AllQimg: this.data.AllQimg,
            AllAimg:this.data.AllAimg
        })
    
    } else {
        wx.showToast({
          title:"出现错误，请重试"
        })
    }
  })
},

preview1(e:any) {
  let idx= e.currentTarget.dataset.idx;
  let pics =this.data.AllQimg;
  wx.previewImage({
    current: pics[idx],
    urls:pics
  })
},
preview2(e:any) {
  let idx= e.currentTarget.dataset.idx;
  let pics =this.data.AllAimg;
  wx.previewImage({
    current: pics[idx],
    urls:pics
  })
},
  //跳转
  go(url:string,params?:string){
    let gourl = '';
    if (params) {
      gourl = '/pages/'+url+'/index?' + params ;
    }else{
      gourl = '/pages/'+url+'/index';
    }
    wx.navigateTo({
      url:gourl
  });
},
goUploadeTeacher(){
  let id = (this.options.id as any) as string;
  var dataList =JSON.stringify(this.data.AllQimg)
  wx.navigateTo({
    url:'../uplode-teacher/index'+'?id='+id+'&AllQimg='+dataList+'&delete=true',
  })
},
editAnswer(){
  // this.goUploadeTeacher()
  wx.showToast({
    title:'请删除后重新上传即可',
    icon:'none'

  })
},
deleteAnswer(){
  var that = this
  const id = that.options.id||""
  if (id ==""){
    wx.showToast({
      title:"请重试"
    })
    wx.setTimeout(() => {
      wx.navigateBack()
    }, 500);
  }
 wx.showModal({
	  title: '提示',
	  content: '是否删除该答案',
	  success (res: { confirm: any; cancel: any; code:number;}) {
      // console.log(app.globalData.token);
	    if (res.confirm) {
       userApi.TeacherDeleteAnswer({
         needToken:true,
         header:{
        Authorization: app.globalData.token
      }
    },id).then((res)=>{
      if(res.code==200){
        console.log(1);
        that.setData({
          AllAimg:[]
        })
      }
    })
	    } else if (res.cancel) {
	      
	    }
	  }
	})
},

  
})