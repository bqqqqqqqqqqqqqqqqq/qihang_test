
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
  need:boolean;
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


Page({
  data: {
    value: '',
    Paging:{
      size:10,
      page:1
    },

    listAll,
    searchList:[
      // {
      //   type: 'radio',
      //   screenKey: '课程',
      //   screenValue: ['独立课程','共享课程'].map((m) => ({
      //     checked: false,
      //     value: m,
      //     remark:"grade"
      //   })),
      // },
      {
        type: 'radio',
        screenKey: '教师',
        screenValue: [].map((m:string) => ({
          checked: false,
          value: m,
          remark:"teacher"
        })),
      },
    ],
    activeNames: ['1'],
    search:0
    
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
getAllProblem(teacher:string){
  // const Page: Paging = this.data.Paging 
  publicAPI.searchProblemList(teacher).then((res:any)=>{
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
        this.setData({
          listAll:listAll,
          Paging:{
            size:10,
            page:1
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
    this.setData({
      listAll:[]
    })
    let selected:any = []
    // 获取所有选中
    this.data.searchList.map(n => {
      n.screenValue.map(m => {
        if (m.checked == true) {
          selected.push(m)
        }
      })
    })
    var type = ""
    var teacher = ""
    selected.forEach((ele: { remark: string; value: string; remkae: string; }) => {
      if (ele.remark=="grade"){
        type = ele.value
        // if(type=="独立课程"){
        //   type = "basic"
        // }else if (type == "共享课程"){
        //   type = "shared"
        // }
      }else if (ele.remark=="teacher"){
        teacher = ele.value
      }
    });
    this.getAllProblem(teacher)
    this.setData({
      activeNames: [],
      search:1,
    });

  },
  reTry(){
    this.setData({
      activeNames: ['1'],
      search:0,
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
          searchItem[0].screenValue=tea.map((m) => ({
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
