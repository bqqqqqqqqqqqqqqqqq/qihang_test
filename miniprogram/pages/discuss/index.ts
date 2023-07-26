
import publicAPI from "../../api/system/publicAPI";

import { chooseFile } from "../../miniprogram_npm/@vant/weapp/uploader/utils";

const dayjs = require('../../utils/day.min.js');
interface SearchItem {
  type: string;
  screenKey: string;
  screenValue: ScreenValue[];
}

interface ScreenValue {
  checked: boolean;
  value: string;
}
interface oneProblem{
  updated_at: any;
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
var searchList: SearchItem[]=[
  {
    type: 'radio',
    screenKey: '年级',
    screenValue: ["高一","高二","高三"].map((m) => ({
      checked: false,
      value: m,
      remark:"grade"
    })),
  },
  {
    type: 'radio',
    screenKey: '教师',
    screenValue: [].map((m) => ({
      checked: false,
      value: m,
      remark:"teacher"
    })),
  },
  {
    type: 'radio',
    screenKey: '知识点',
    screenValue: ["语文","数学","英语","物理","历史","化学","生物","地理","思政","其他"].map((m) => ({
      checked: false,
      value: m,
       remark:"subject"
    })),
  },
]

Page({
  data: {
    value: '',
    Paging:{
      size:10,
      page:1
    },
    list:[
      listAll
    ],
    listAll,
    searchList,
    activeNames: ['1']
    
},

clickTop(event:any){
  this.setData({
    activeNames: event.detail,
  });
},

//设置筛选项

onChange(e:any) {
  const { parentIndex, item, index } = e.detail;

  if (item.screenValue[index].checked) {
    item.screenValue[index].checked = false;
  } else {
    if (item.type != 'checkbox') {
      item.screenValue.map((n:any) => (n.checked = false));
    }
    item.screenValue[index].checked = true;
  }

  this.setData({ [`searchList[${parentIndex}]`]: item }, () => {
    let selected: any[] = [];
    this.data.searchList.map((n) => {
      n.screenValue.map((m) => {
        if (m.checked == true) {
          selected.push(m.value);
        }
      });
    });
    wx.setStorageSync('query', selected);
  });
},
getAllProblem(grade:string,teacher:string,subject:string){
  const Page: Paging = this.data.Paging 
  publicAPI.searchProblemList(Page,grade,teacher,subject).then((res:any)=>{
    if(res.code===200){
        const listAll = this.data.listAll
        if (res.data  != null)  {
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
    }else if (res.data==null){
      wx.showToast({
        title:"已无更多数据",
        icon:"error",
        // errMsg:"已无更多数据"
      })  
    }
  })
  },
  doSubmit() {
    let selected:any = []
    // 获取所有选中
    this.data.searchList.map(n => {
      n.screenValue.map(m => {
        if (m.checked == true) {
          selected.push(m)
        }
      })
    })
    var grade = ""
    var teacher = ""
    var subject = ""
    selected.forEach((ele: { remark: string; value: string; remkae: string; }) => {
      if (ele.remark=="grade"){
        grade = ele.value
      }else if (ele.remark=="teacher"){
        teacher = ele.value
      }else if (ele.remark=="subject"){
        subject = ele.value
      }
    });
    console.log(grade,teacher,subject);
    
    this.getAllProblem(grade,teacher,subject)
    this.setData({
      activeNames: [],
    });

  },
  reTry(){
    this.setData({
      activeNames: ['1'],
    });
  },
  onPullDownRefresh: function () {
    //下拉加载更多
  },
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
  
  onSearch() {
  },
  onClick() {
  },
  onLoad(){
    publicAPI.getTeacher().then((res:any)=>{
      if (res.code==200){
         var tea:string[] = []
         res.data.forEach((ele: { name: string; }) => {
           tea.push(ele.name)
         });
       
        if (res.data!=null){
          const searchItem = this.data.searchList;
          searchItem[1].screenValue=tea.map((m) => ({
            checked: false,
            value: m,
            remark:"teacher"
          }))
          this.setData({
            searchList: searchItem
          })
        }

      }
    })
  
  },
  formatTime(arr:oneProblem[] ){
    for (var i=0;i<arr.length;i++){
        arr[i].updated_at = dayjs(arr[i].updated_at).format('YYYY-MM-DD HH:mm')
      }
    },
})
