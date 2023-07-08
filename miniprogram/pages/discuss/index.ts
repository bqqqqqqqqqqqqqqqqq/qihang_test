import publicAPI from "../../api/system/publicAPI";
import { requestAnimationFrame } from "../../miniprogram_npm/@vant/weapp/common/utils";
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
    screenValue: [].map((m) => ({
      checked: false,
      value: m,
    })),
  },
  {
    type: 'radio',
    screenKey: '教师',
    screenValue: [].map((m) => ({
      checked: false,
      value: m,
    })),
  },
  {
    type: 'radio',
    screenKey: '知识点',
    screenValue: [].map((m) => ({
      checked: false,
      value: m,
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
      {
        pid: 1,
        cover_img:'https://zhimg.oss-cn-guangzhou.aliyuncs.com/wx/021f828776fa53d3dba775fdcff0426b_902397dda144ad340c66a469d2a20cf430ad8506.jpg',
        tag:['11','22'],
        time: '2023.6.1',
      },
      // listAll
    ],
    listAll,
    searchList
},
//设置筛选项
test(){
  const searchItem = this.data.searchList;
  searchItem[0].screenValue=['11'].map((m) => ({
    checked: false,
    value: m,
  }))
  searchItem[1].screenValue=['22'].map((m) => ({
    checked: false,
    value: m,
  }))
  searchItem[2].screenValue=['33'].map((m) => ({
    checked: false,
    value: m,
  }))
  this.setData({
    searchList: searchItem
  })
},
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
getAllProblem(Page: Paging){
  publicAPI.getProblemList(Page).then((res:any)=>{
    
    if(res.code===200){
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
    }else if (res.code==-1){
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
          selected.push(m.value)
        }
      })
    })
    console.log(selected)
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

})
